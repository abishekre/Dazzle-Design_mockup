-- Dazzle Design — initial schema (MVP: showcase + leads)
-- Apply with the Supabase CLI (`supabase db push`) or paste into the SQL editor.
-- Not active yet — see lib/supabase.ts (returns null until env is configured).

-- =========================================================================
-- profiles: customer vs admin role gating (mirrors auth.users)
-- =========================================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now()
);

-- =========================================================================
-- quote_requests: the core lead-capture table. `channel` splits event-decor
-- requests (the team) from My Floral shop orders (Celin) — see lib/notify.ts.
-- =========================================================================
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  channel text not null default 'event' check (channel in ('event', 'shop')),
  name text not null,
  email text not null,
  phone text,
  event_type text,
  event_date date,
  guests text,
  budget text,
  area text,
  item text,
  quantity text,
  checklist text[],
  message text,
  status text not null default 'new' check (status in ('new','sourcing','building','ready','archived')),
  internal_notes text,
  created_at timestamptz not null default now()
);
create index if not exists quote_requests_status_idx on public.quote_requests (status);
create index if not exists quote_requests_event_date_idx on public.quote_requests (event_date);

-- =========================================================================
-- subscribers: newsletter / seasonal list
-- =========================================================================
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

-- =========================================================================
-- Row Level Security
-- =========================================================================
alter table public.profiles enable row level security;
alter table public.quote_requests enable row level security;
alter table public.subscribers enable row level security;

-- helper: is the current user an admin?
create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$;

-- profiles: users read/update their own row; admins read all
drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles for select
  using (auth.uid() = id or public.is_admin());
drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles for update using (auth.uid() = id);

-- quote_requests: anyone may submit; only admins may read/update
drop policy if exists "quotes public insert" on public.quote_requests;
create policy "quotes public insert" on public.quote_requests for insert with check (true);
drop policy if exists "quotes admin read" on public.quote_requests;
create policy "quotes admin read" on public.quote_requests for select using (public.is_admin());
drop policy if exists "quotes admin update" on public.quote_requests;
create policy "quotes admin update" on public.quote_requests for update using (public.is_admin());

-- subscribers: anyone may join; only admins read
drop policy if exists "subscribers public insert" on public.subscribers;
create policy "subscribers public insert" on public.subscribers for insert with check (true);
drop policy if exists "subscribers admin read" on public.subscribers;
create policy "subscribers admin read" on public.subscribers for select using (public.is_admin());
