-- Fair Play card tracker schema

create table if not exists cards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('Home','Out','Caregiving','Magic','Wild')),
  owner text not null default 'Unassigned' check (owner in ('Sean','Tarragon','Discarded','Unassigned')),
  msc text not null default '',
  cpe_conception text not null default '',
  cpe_planning text not null default '',
  cpe_execution text not null default '',
  personal_notes text not null default '',
  illustration_key text not null default 'default',
  is_custom boolean not null default false,
  is_unicorn_space boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null default '',
  updated_at timestamptz not null default now()
);

-- Enable Row Level Security but allow all operations for anonymous users
-- (this is a household app — no multi-tenant auth needed)
alter table cards enable row level security;
alter table settings enable row level security;

create policy "Allow all for cards" on cards for all using (true) with check (true);
create policy "Allow all for settings" on settings for all using (true) with check (true);
