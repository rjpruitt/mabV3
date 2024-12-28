create table public.suppliers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  code text not null unique,
  contact jsonb,
  active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table public.suppliers enable row level security;

create policy "Suppliers are viewable by authenticated users"
  on suppliers for select
  to authenticated
  using (true);

create policy "Suppliers are insertable by authenticated users"
  on suppliers for insert
  to authenticated
  with check (true);

create policy "Suppliers are updatable by authenticated users"
  on suppliers for update
  to authenticated
  using (true); 