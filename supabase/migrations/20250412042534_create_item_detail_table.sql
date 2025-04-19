-- ファイル名例: 202504121230_create_item_detail_table.sql

create table if not exists public.item_detail (
  id bigint generated always as identity primary key,
  bland_id bigint not null references public.item_bland(id) on delete cascade,
  model_id bigint not null references public.item_model(id) on delete cascade,
  bland_model_number text not null,
  sold boolean not null default false,
  items jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
