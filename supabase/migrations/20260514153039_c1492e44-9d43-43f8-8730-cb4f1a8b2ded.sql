
-- Roles
create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);

alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  )
$$;

create policy "users can view own roles" on public.user_roles
  for select to authenticated
  using (auth.uid() = user_id);

create policy "admins can view all roles" on public.user_roles
  for select to authenticated
  using (public.has_role(auth.uid(), 'admin'));

-- Auto-asignar admin al primer usuario
create or replace function public.handle_new_user_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_assign_admin
  after insert on auth.users
  for each row execute function public.handle_new_user_admin();

-- Productos
create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price numeric(10,2) not null default 0,
  description text,
  image_url text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "anyone can view products" on public.products
  for select to anon, authenticated
  using (true);

create policy "admins can insert products" on public.products
  for insert to authenticated
  with check (public.has_role(auth.uid(), 'admin'));

create policy "admins can update products" on public.products
  for update to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "admins can delete products" on public.products
  for delete to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger products_set_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

-- Seed
insert into public.products (name, category, price, sort_order) values
  ('Corona Rosa y Blanca', 'Coronas', 350, 1),
  ('Arreglo Recuerdo', 'Arreglos', 220, 2),
  ('Arreglo Rosas Amarillas', 'Arreglos', 240, 3),
  ('Arreglo Azul Celeste', 'Arreglos', 260, 4);

-- Storage
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true);

create policy "public read product images" on storage.objects
  for select using (bucket_id = 'product-images');

create policy "admins upload product images" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));

create policy "admins update product images" on storage.objects
  for update to authenticated
  using (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));

create policy "admins delete product images" on storage.objects
  for delete to authenticated
  using (bucket_id = 'product-images' and public.has_role(auth.uid(), 'admin'));
