-- ファイル名例: 202504121220_create_item_model_table.sql

create table if not exists public.item_model (
  id bigint generated always as identity primary key,
  bland_id bigint not null references public.item_bland(id) on delete cascade,
  bland_model_number text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
