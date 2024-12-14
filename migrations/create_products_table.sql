-- Create products table
create table products (
  id text primary key default gen_random_uuid()::text,
  source text not null check (source in ('homedepot', 'lowes')),
  external_id text not null,
  source_url text,
  name text not null,
  brand text not null,
  description text,
  model_number text,
  category text not null,
  specifications jsonb,
  images jsonb,
  price jsonb not null,
  inventory jsonb not null,
  status text not null check (status in ('pending', 'active', 'inactive', 'discontinued')),
  is_active boolean default false,
  last_updated timestamp with time zone default timezone('utc'::text, now()),
  metadata jsonb,
  
  -- Ensure unique products per source
  unique(source, external_id)
);

-- Create product_imports table to track import history
create table product_imports (
  id text primary key default gen_random_uuid()::text,
  source text not null check (source in ('homedepot', 'lowes')),
  source_data jsonb not null,
  processed_at timestamp with time zone default timezone('utc'::text, now()),
  status text not null check (status in ('pending', 'processed', 'failed')),
  error text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Add indexes
create index idx_products_source on products(source);
create index idx_products_status on products(status);
create index idx_products_category on products(category);
create index idx_products_is_active on products(is_active);
create index idx_product_imports_source on product_imports(source);
create index idx_product_imports_status on product_imports(status);

-- Add RLS policies
alter table products enable row level security;
alter table product_imports enable row level security;

-- Only authenticated users can read active products
create policy "Anyone can read active products"
  on products for select
  using (is_active = true);

-- Only authenticated staff can manage products
create policy "Staff can manage products"
  on products for all
  using (auth.jwt() ->> 'role' = 'staff')
  with check (auth.jwt() ->> 'role' = 'staff');

-- Only staff can view imports
create policy "Staff can manage product imports"
  on product_imports for all
  using (auth.jwt() ->> 'role' = 'staff')
  with check (auth.jwt() ->> 'role' = 'staff'); 