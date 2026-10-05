create table if not exists public.articles (
  id           bigint generated always as identity primary key,
  title        text not null,
  body         text not null,
  category     text not null,
  submitted_by uuid not null default auth.uid() references auth.users (id) on delete cascade,
  created_at   timestamptz not null default now()
);

alter table public.articles enable row level security;

drop policy if exists "Articles are publicly readable" on public.articles;
create policy "Articles are publicly readable"
  on public.articles
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated users can submit articles" on public.articles;
create policy "Authenticated users can submit articles"
  on public.articles
  for insert
  to authenticated
  with check ((select auth.uid()) = submitted_by);
