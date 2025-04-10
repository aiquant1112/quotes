-- Create users table (extends Supabase auth.users)
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  subscription_tier text default 'free' not null,
  subscription_end_date timestamp with time zone,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create quotes table
create table public.quotes (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  author text not null,
  category text not null,
  is_daily boolean default false not null,
  is_featured boolean default false not null,
  created_by uuid references public.users on delete cascade not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create subscriptions table
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users on delete cascade not null,
  tier text not null,
  status text not null,
  start_date timestamp with time zone not null,
  end_date timestamp with time zone not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null
);

-- Create indexes
create index quotes_category_idx on public.quotes(category);
create index quotes_created_by_idx on public.quotes(created_by);
create index quotes_is_daily_idx on public.quotes(is_daily);
create index quotes_is_featured_idx on public.quotes(is_featured);
create index subscriptions_user_id_idx on public.subscriptions(user_id);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.quotes enable row level security;
alter table public.subscriptions enable row level security;

-- Create policies
create policy "Users can view their own data"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update their own data"
  on public.users for update
  using (auth.uid() = id);

create policy "Anyone can view quotes"
  on public.quotes for select
  using (true);

create policy "Users can create quotes"
  on public.quotes for insert
  with check (auth.uid() = created_by);

create policy "Users can update their own quotes"
  on public.quotes for update
  using (auth.uid() = created_by);

create policy "Users can delete their own quotes"
  on public.quotes for delete
  using (auth.uid() = created_by);

create policy "Users can view their own subscriptions"
  on public.subscriptions for select
  using (auth.uid() = user_id);

-- Create function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger handle_users_updated_at
  before update on public.users
  for each row
  execute function public.handle_updated_at();

create trigger handle_quotes_updated_at
  before update on public.quotes
  for each row
  execute function public.handle_updated_at();

create trigger handle_subscriptions_updated_at
  before update on public.subscriptions
  for each row
  execute function public.handle_updated_at();

-- Create function to rotate daily quote
create or replace function public.rotate_daily_quote()
returns void as $$
begin
  -- Reset all quotes to not be daily
  update public.quotes
  set is_daily = false
  where is_daily = true;

  -- Set a random quote as daily
  update public.quotes
  set is_daily = true
  where id in (
    select id
    from public.quotes
    where is_daily = false
    order by random()
    limit 1
  );
end;
$$ language plpgsql; 