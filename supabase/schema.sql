-- EXPORTS Platform — Full Database Schema
-- Run this in your Supabase SQL Editor (supabase.com → SQL Editor → New query)

-- Enable UUID extension
create extension if not exists "uuid-ossp";
create extension if not exists "postgis"; -- for location-based queries

-- ─────────────────────────────────────────
-- PROFILES (one per auth user)
-- ─────────────────────────────────────────
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null check (role in ('artist', 'promoter', 'venue')),
  display_name text not null,
  slug text unique not null,
  bio text,
  location_city text,
  location_country text,
  profile_photo text,
  social_links jsonb default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- ─────────────────────────────────────────
-- ARTISTS
-- ─────────────────────────────────────────
create table artists (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid unique not null references profiles(id) on delete cascade,
  genres text[] default '{}',
  experience_level text default 'Intermediate',
  gender_identity text,
  fee_minimum numeric default 0,
  fee_currency text default 'NZD',
  fee_negotiable boolean default true,
  equipment jsonb default '{}',
  hardware_requirements text,
  embeds jsonb default '[]',
  photo_gallery jsonb default '[]',
  available_tonight boolean default false,
  available_tonight_until timestamptz,
  created_at timestamptz default now()
);
alter table artists enable row level security;
create policy "Artists viewable by everyone" on artists for select using (true);
create policy "Artists editable by owner" on artists for all using (profile_id = auth.uid());

-- ─────────────────────────────────────────
-- TOURING WINDOWS
-- ─────────────────────────────────────────
create table touring_windows (
  id uuid primary key default uuid_generate_v4(),
  artist_id uuid not null references artists(id) on delete cascade,
  city text not null,
  country text not null,
  lat numeric,
  lng numeric,
  date_from date not null,
  date_to date not null,
  created_at timestamptz default now()
);
alter table touring_windows enable row level security;
create policy "Touring windows viewable by everyone" on touring_windows for select using (true);
create policy "Touring windows editable by artist" on touring_windows for all
  using (artist_id in (select id from artists where profile_id = auth.uid()));

-- ─────────────────────────────────────────
-- PROMOTERS
-- ─────────────────────────────────────────
create table promoters (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid unique not null references profiles(id) on delete cascade,
  trusted_partner boolean default false,
  total_events_hosted integer default 0,
  preferred_genres text[] default '{}',
  preferred_locations text[] default '{}',
  preferred_gender_identities text[] default '{}',
  preferred_experience_levels text[] default '{}',
  past_events_gallery jsonb default '[]',
  created_at timestamptz default now()
);
alter table promoters enable row level security;
create policy "Promoters viewable by everyone" on promoters for select using (true);
create policy "Promoters editable by owner" on promoters for all using (profile_id = auth.uid());

-- ─────────────────────────────────────────
-- VENUES
-- ─────────────────────────────────────────
create table venues (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid unique not null references profiles(id) on delete cascade,
  capacity integer,
  venue_fee numeric,
  fee_currency text default 'NZD',
  tech_specs jsonb default '{}',
  load_in_info jsonb default '{}',
  operational_photos jsonb default '[]',
  created_at timestamptz default now()
);
alter table venues enable row level security;
create policy "Venues viewable by everyone" on venues for select using (true);
create policy "Venues editable by owner" on venues for all using (profile_id = auth.uid());

-- ─────────────────────────────────────────
-- EVENTS
-- ─────────────────────────────────────────
create table events (
  id uuid primary key default uuid_generate_v4(),
  promoter_id uuid not null references promoters(id) on delete cascade,
  venue_id uuid references venues(id),
  title text not null,
  slug text unique not null,
  date timestamptz not null,
  genres text[] default '{}',
  status text default 'Open' check (status in ('Open', 'Confirmed', 'Cancelled', 'Completed')),
  blind_applications boolean default false,
  emergency boolean default false,
  emergency_triggered_at timestamptz,
  created_at timestamptz default now()
);
alter table events enable row level security;
create policy "Events viewable by everyone" on events for select using (true);
create policy "Events editable by promoter" on events for all
  using (promoter_id in (select id from promoters where profile_id = auth.uid()));

-- ─────────────────────────────────────────
-- SLOTS
-- ─────────────────────────────────────────
create table slots (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references events(id) on delete cascade,
  slot_type text not null check (slot_type in ('Opening', 'Peak Time', 'Closing', 'B2B')),
  start_time text not null,
  end_time text not null,
  fee numeric default 0,
  currency text default 'NZD',
  genres text[] default '{}',
  status text default 'Open' check (status in ('Open', 'Filled', 'Cancelled')),
  created_at timestamptz default now()
);
alter table slots enable row level security;
create policy "Slots viewable by everyone" on slots for select using (true);
create policy "Slots editable by event promoter" on slots for all
  using (event_id in (
    select e.id from events e
    join promoters p on e.promoter_id = p.id
    where p.profile_id = auth.uid()
  ));

-- ─────────────────────────────────────────
-- APPLICATIONS
-- ─────────────────────────────────────────
create table applications (
  id uuid primary key default uuid_generate_v4(),
  slot_id uuid not null references slots(id) on delete cascade,
  event_id uuid not null references events(id) on delete cascade,
  artist_id uuid not null references artists(id) on delete cascade,
  cover_note text,
  mix_url text,
  match_score numeric default 0,
  status text default 'Pending' check (status in ('Pending', 'Shortlisted', 'Confirmed', 'Rejected')),
  created_at timestamptz default now(),
  unique(slot_id, artist_id)
);
alter table applications enable row level security;
create policy "Artists see own applications" on applications for select
  using (artist_id in (select id from artists where profile_id = auth.uid()));
create policy "Promoters see applications for their events" on applications for select
  using (event_id in (
    select e.id from events e
    join promoters p on e.promoter_id = p.id
    where p.profile_id = auth.uid()
  ));
create policy "Artists can insert own applications" on applications for insert
  with check (artist_id in (select id from artists where profile_id = auth.uid()));
create policy "Promoters can update application status" on applications for update
  using (event_id in (
    select e.id from events e
    join promoters p on e.promoter_id = p.id
    where p.profile_id = auth.uid()
  ));

-- ─────────────────────────────────────────
-- FEE NEGOTIATIONS
-- ─────────────────────────────────────────
create table fee_negotiations (
  id uuid primary key default uuid_generate_v4(),
  application_id uuid not null references applications(id) on delete cascade,
  proposed_by uuid not null references profiles(id),
  amount numeric not null,
  currency text default 'NZD',
  note text,
  status text default 'Pending' check (status in ('Pending', 'Accepted', 'Countered', 'Rejected')),
  created_at timestamptz default now()
);
alter table fee_negotiations enable row level security;
create policy "Negotiation parties can view" on fee_negotiations for select using (
  proposed_by = auth.uid() or
  application_id in (
    select a.id from applications a
    join artists ar on a.artist_id = ar.id where ar.profile_id = auth.uid()
  ) or
  application_id in (
    select a.id from applications a
    join events e on a.event_id = e.id
    join promoters p on e.promoter_id = p.id where p.profile_id = auth.uid()
  )
);
create policy "Negotiation parties can insert" on fee_negotiations for insert with check (proposed_by = auth.uid());
create policy "Negotiation parties can update" on fee_negotiations for update using (proposed_by = auth.uid());

-- ─────────────────────────────────────────
-- CONTRACTS
-- ─────────────────────────────────────────
create table contracts (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references events(id),
  slot_id uuid not null references slots(id),
  artist_id uuid not null references artists(id),
  promoter_id uuid not null references promoters(id),
  agreed_fee numeric not null,
  currency text default 'NZD',
  contract_text text not null,
  artist_signed_at timestamptz,
  promoter_signed_at timestamptz,
  artist_signed_name text,
  promoter_signed_name text,
  status text default 'Draft' check (status in ('Draft','Sent','SignedByArtist','SignedByBoth','Disputed','Cancelled')),
  created_at timestamptz default now()
);
alter table contracts enable row level security;
create policy "Contract parties can view" on contracts for select
  using (
    artist_id in (select id from artists where profile_id = auth.uid()) or
    promoter_id in (select id from promoters where profile_id = auth.uid())
  );
create policy "Contract parties can update" on contracts for update
  using (
    artist_id in (select id from artists where profile_id = auth.uid()) or
    promoter_id in (select id from promoters where profile_id = auth.uid())
  );

-- ─────────────────────────────────────────
-- PAYMENT INSTALMENTS
-- ─────────────────────────────────────────
create table payment_instalments (
  id uuid primary key default uuid_generate_v4(),
  contract_id uuid not null references contracts(id) on delete cascade,
  label text not null,
  amount numeric not null,
  currency text default 'NZD',
  due_date date not null,
  paid boolean default false,
  paid_at timestamptz
);
alter table payment_instalments enable row level security;
create policy "Payment parties can view" on payment_instalments for select
  using (contract_id in (
    select id from contracts where
      artist_id in (select id from artists where profile_id = auth.uid()) or
      promoter_id in (select id from promoters where profile_id = auth.uid())
  ));
create policy "Payment parties can update" on payment_instalments for update
  using (contract_id in (
    select id from contracts where
      promoter_id in (select id from promoters where profile_id = auth.uid())
  ));

-- ─────────────────────────────────────────
-- CONVERSATIONS & MESSAGES
-- ─────────────────────────────────────────
create table conversations (
  id uuid primary key default uuid_generate_v4(),
  participant_a uuid not null references profiles(id),
  participant_b uuid not null references profiles(id),
  last_message_at timestamptz,
  created_at timestamptz default now(),
  unique(participant_a, participant_b)
);
alter table conversations enable row level security;
create policy "Participants can view their conversations" on conversations for select
  using (participant_a = auth.uid() or participant_b = auth.uid());
create policy "Anyone can start a conversation" on conversations for insert
  with check (participant_a = auth.uid() or participant_b = auth.uid());

create table messages (
  id uuid primary key default uuid_generate_v4(),
  conversation_id uuid not null references conversations(id) on delete cascade,
  sender_id uuid not null references profiles(id),
  content text not null,
  read boolean default false,
  created_at timestamptz default now()
);
alter table messages enable row level security;
create policy "Conversation participants can view messages" on messages for select
  using (conversation_id in (
    select id from conversations where participant_a = auth.uid() or participant_b = auth.uid()
  ));
create policy "Sender can insert messages" on messages for insert
  with check (sender_id = auth.uid());
create policy "Recipients can mark read" on messages for update
  using (conversation_id in (
    select id from conversations where participant_a = auth.uid() or participant_b = auth.uid()
  ));

-- Enable realtime for messages
alter publication supabase_realtime add table messages;
alter publication supabase_realtime add table conversations;

-- ─────────────────────────────────────────
-- EMERGENCY STANDBY
-- ─────────────────────────────────────────
create table emergency_responses (
  id uuid primary key default uuid_generate_v4(),
  event_id uuid not null references events(id),
  slot_id uuid not null references slots(id),
  artist_id uuid not null references artists(id),
  premium_fee numeric not null,
  status text default 'Pending' check (status in ('Pending', 'Accepted', 'Expired')),
  created_at timestamptz default now()
);
alter table emergency_responses enable row level security;
create policy "Emergency responses viewable by involved parties" on emergency_responses for select
  using (
    artist_id in (select id from artists where profile_id = auth.uid()) or
    event_id in (
      select e.id from events e join promoters p on e.promoter_id = p.id where p.profile_id = auth.uid()
    )
  );
create policy "Artists can respond to emergency" on emergency_responses for update
  using (artist_id in (select id from artists where profile_id = auth.uid()));

-- ─────────────────────────────────────────
-- VOUCH BADGES
-- ─────────────────────────────────────────
create table vouch_badges (
  id uuid primary key default uuid_generate_v4(),
  artist_id uuid not null references artists(id) on delete cascade,
  promoter_id uuid not null references promoters(id) on delete cascade,
  badge text not null,
  event_id uuid not null references events(id),
  created_at timestamptz default now(),
  unique(artist_id, promoter_id, event_id, badge)
);
alter table vouch_badges enable row level security;
create policy "Vouch badges viewable by everyone" on vouch_badges for select using (true);
create policy "Promoters can vouch" on vouch_badges for insert
  with check (promoter_id in (select id from promoters where profile_id = auth.uid()));

-- ─────────────────────────────────────────
-- DJs DJ NOMINATIONS
-- ─────────────────────────────────────────
create table djs_dj_nominations (
  id uuid primary key default uuid_generate_v4(),
  nominator_id uuid not null references artists(id),
  nominee_id uuid not null references artists(id),
  month text not null, -- format: '2026-04'
  created_at timestamptz default now(),
  unique(nominator_id, month) -- one nomination per artist per month
);
alter table djs_dj_nominations enable row level security;
create policy "Nominations viewable by everyone" on djs_dj_nominations for select using (true);
create policy "Artists can nominate" on djs_dj_nominations for insert
  with check (nominator_id in (select id from artists where profile_id = auth.uid()));

-- ─────────────────────────────────────────
-- TEAM MEMBERS (agency/manager access)
-- ─────────────────────────────────────────
create table team_members (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id), -- null until accepted
  team_owner_id uuid not null references profiles(id) on delete cascade,
  role text not null check (role in ('owner', 'booker', 'admin', 'manager')),
  invited_email text not null,
  accepted boolean default false,
  created_at timestamptz default now()
);
alter table team_members enable row level security;
create policy "Team members viewable by team" on team_members for select
  using (team_owner_id = auth.uid() or profile_id = auth.uid());
create policy "Owners can manage team" on team_members for all
  using (team_owner_id = auth.uid());

-- ─────────────────────────────────────────
-- AUTO-UPDATE updated_at on profiles
-- ─────────────────────────────────────────
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at
  before update on profiles
  for each row execute procedure handle_updated_at();

-- ─────────────────────────────────────────
-- AUTO-CREATE profile on signup
-- ─────────────────────────────────────────
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, role, display_name, slug)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'artist'),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'slug', new.id::text)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
