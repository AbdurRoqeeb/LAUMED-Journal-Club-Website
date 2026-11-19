-- Events keep their extras (speakers, judges, sponsor, recap, labels) in details
alter table public.events
  add column details jsonb not null default '{}'::jsonb;

-- Resources get the publisher name, and a legacy id so the seed can be re-run safely
alter table public.resources
  add column organization text,
  add column legacy_id text unique;