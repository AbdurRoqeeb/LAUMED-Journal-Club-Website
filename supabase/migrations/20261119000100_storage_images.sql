-- Public bucket for flyers, covers and photos. Images only, 5 MB maximum.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('images', 'images', true, 5242880, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

-- Visitors read images through the public URL. Only editors can add, list or remove files.
create policy "editors upload images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'images' and public.can_edit());

create policy "editors read images"
  on storage.objects for select to authenticated
  using (bucket_id = 'images' and public.can_edit());

create policy "editors update images"
  on storage.objects for update to authenticated
  using (bucket_id = 'images' and public.can_edit())
  with check (bucket_id = 'images' and public.can_edit());

create policy "editors delete images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'images' and public.can_edit());