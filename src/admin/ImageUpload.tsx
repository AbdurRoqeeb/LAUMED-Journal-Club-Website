import { useRef, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button, inputClass } from './ui';

const MAX_SIDE = 1600;
const MAX_INPUT_BYTES = 15 * 1024 * 1024;

// Shrinks the picture and converts it to WebP before it leaves the browser
async function toWebp(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const w = Math.max(1, Math.round(bitmap.width * scale));
  const h = Math.max(1, Math.round(bitmap.height * scale));
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Your browser could not process the image.');
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error('Could not convert the image.'))),
      'image/webp',
      0.82
    )
  );
}

export default function ImageUpload({
  value,
  onChange,
  folder,
}: {
  value: string;
  onChange: (url: string) => void;
  folder: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const pick = async (file: File | undefined) => {
    if (!file) return;
    setError(null);
    if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
      return setError('Please choose a JPG, PNG or WebP image.');
    }
    if (file.size > MAX_INPUT_BYTES) return setError('That image is over 15 MB. Choose a smaller one.');

    setBusy(true);
    try {
      const blob = await toWebp(file);
      const path = `${folder}/${crypto.randomUUID()}.webp`;
      const { error: err } = await supabase.storage
        .from('images')
        .upload(path, blob, { contentType: 'image/webp', cacheControl: '31536000', upsert: false });
      if (err) throw err;
      onChange(supabase.storage.from('images').getPublicUrl(path).data.publicUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed. Please try again.');
    } finally {
      setBusy(false);
      if (input.current) input.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      {value && (
        <img
          src={value}
          alt="Preview"
          className="max-h-48 rounded-lg border border-line object-contain"
        />
      )}
      <div className="flex flex-wrap gap-2">
        <input
          ref={input}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => pick(e.target.files?.[0])}
        />
        <Button variant="secondary" disabled={busy} onClick={() => input.current?.click()}>
          {busy ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
        </Button>
        {value && (
          <Button variant="danger" disabled={busy} onClick={() => onChange('')}>
            Remove
          </Button>
        )}
      </div>
      <input
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste an image link"
      />
      {error && <p className="text-sm text-red-300">{error}</p>}
    </div>
  );
}