// Handles image/PDF uploads from the admin panel and serves public files from R2.
// Everything else (the website itself) is served directly from static assets.

const MAX_IMAGE = 5 * 1024 * 1024;
const MAX_PDF = 25 * 1024 * 1024;
const FOLDERS = ['events', 'covers', 'board', 'issues', 'misc'];

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

// Decide the file type from its first bytes, never from what the browser claims
function sniff(buf) {
  const b = new Uint8Array(buf, 0, Math.min(12, buf.byteLength));
  const at = (i, s) => [...s].every((c, k) => b[i + k] === c.charCodeAt(0));
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return { type: 'image/jpeg', ext: 'jpg', image: true };
  if (b[0] === 0x89 && at(1, 'PNG')) return { type: 'image/png', ext: 'png', image: true };
  if (at(0, 'RIFF') && at(8, 'WEBP')) return { type: 'image/webp', ext: 'webp', image: true };
  if (at(0, '%PDF-')) return { type: 'application/pdf', ext: 'pdf', image: false };
  return null;
}

// The caller must be signed in to Supabase and be an editor or super admin.
// Both checks use the caller's own token, so no secret key is needed here.
async function requireEditor(request, env) {
  const auth = request.headers.get('authorization') || '';
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';
  if (!token) return null;
  const headers = { apikey: env.SUPABASE_ANON_KEY, authorization: `Bearer ${token}` };

  const userRes = await fetch(`${env.SUPABASE_URL}/auth/v1/user`, { headers });
  if (!userRes.ok) return null;
  const user = await userRes.json();
  if (!user || !user.id) return null;

  const profRes = await fetch(
    `${env.SUPABASE_URL}/rest/v1/admin_profiles?select=role&user_id=eq.${encodeURIComponent(user.id)}`,
    { headers }
  );
  if (!profRes.ok) return null;
  const rows = await profRes.json();
  const role = rows && rows[0] && rows[0].role;
  return role === 'super_admin' || role === 'editor' ? { id: user.id, role } : null;
}

async function handleUpload(request, env) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) return json({ error: 'Server is not configured' }, 500);

  const editor = await requireEditor(request, env);
  if (!editor) return json({ error: 'Not allowed' }, 403);

  const folder = new URL(request.url).searchParams.get('folder') || 'misc';
  if (!FOLDERS.includes(folder)) return json({ error: 'Unknown folder' }, 400);

  const declared = Number(request.headers.get('content-length') || 0);
  if (!declared || declared > MAX_PDF) return json({ error: 'The file is empty or too large' }, 413);

  const body = await request.arrayBuffer();
  if (body.byteLength === 0 || body.byteLength > MAX_PDF) return json({ error: 'The file is empty or too large' }, 413);

  const kind = sniff(body);
  if (!kind) return json({ error: 'Only JPG, PNG, WebP and PDF files are allowed' }, 415);
  if (kind.image && body.byteLength > MAX_IMAGE) return json({ error: 'Images must be under 5 MB' }, 413);

  const key = `${folder}/${crypto.randomUUID()}.${kind.ext}`;
  await env.PUBLIC_FILES.put(key, body, {
    httpMetadata: { contentType: kind.type, cacheControl: 'public, max-age=31536000, immutable' },
  });
  return json({ url: `/files/${key}` });
}

async function handleFile(request, env) {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', { status: 405 });
  }
  let key;
  try {
    key = decodeURIComponent(new URL(request.url).pathname.slice('/files/'.length));
  } catch {
    return new Response('Not found', { status: 404 });
  }
  if (!/^[a-z0-9-]+\/[A-Za-z0-9._-]+\.(webp|jpg|jpeg|png|pdf)$/.test(key) || key.includes('..')) {
    return new Response('Not found', { status: 404 });
  }

  const object = await env.PUBLIC_FILES.get(key, { range: request.headers, onlyIf: request.headers });
  if (!object) return new Response('Not found', { status: 404 });

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('accept-ranges', 'bytes');
  headers.set('x-content-type-options', 'nosniff');
  if (!headers.get('cache-control')) headers.set('cache-control', 'public, max-age=86400');
  if (object.range) {
    const end = object.range.end !== undefined ? object.range.end : object.size - 1;
    headers.set('content-range', `bytes ${object.range.offset || 0}-${end}/${object.size}`);
  }
  const status = object.body ? (request.headers.get('range') !== null ? 206 : 200) : 304;
  return new Response(object.body, { headers, status });
}

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/upload') return handleUpload(request, env);
    if (pathname.startsWith('/files/')) return handleFile(request, env);
    return env.ASSETS.fetch(request);
  },
};