create table if not exists public.item_bland (
  id bigint generated always as identity primary key,
  bland_name text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);