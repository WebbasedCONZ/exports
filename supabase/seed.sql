-- EXPORTS Platform — Sample Seed Data
-- Run this in Supabase SQL Editor AFTER running schema.sql
-- This creates demo users, artists, promoters, venues, events and more

-- ─────────────────────────────────────────
-- AUTH USERS (fake demo accounts)
-- ─────────────────────────────────────────
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_user_meta_data)
VALUES
  ('11111111-0000-0000-0000-000000000001', 'shirin@exports.demo', crypt('demo1234', gen_salt('bf')), now(), now(), now(), '{"role":"artist","display_name":"SHIRIN","slug":"shirin"}'),
  ('11111111-0000-0000-0000-000000000002', 'pascalk@exports.demo', crypt('demo1234', gen_salt('bf')), now(), now(), now(), '{"role":"artist","display_name":"PASCAL K","slug":"pascal-k"}'),
  ('11111111-0000-0000-0000-000000000003', 'veralow@exports.demo', crypt('demo1234', gen_salt('bf')), now(), now(), now(), '{"role":"artist","display_name":"VERA LOW","slug":"vera-low"}'),
  ('11111111-0000-0000-0000-000000000004', 'mako@exports.demo', crypt('demo1234', gen_salt('bf')), now(), now(), now(), '{"role":"artist","display_name":"MAKO","slug":"mako"}'),
  ('11111111-0000-0000-0000-000000000005', 'junosun@exports.demo', crypt('demo1234', gen_salt('bf')), now(), now(), now(), '{"role":"artist","display_name":"JUNO SUN","slug":"juno-sun"}'),
  ('22222222-0000-0000-0000-000000000001', 'sub180@exports.demo', crypt('demo1234', gen_salt('bf')), now(), now(), now(), '{"role":"promoter","display_name":"Sub180","slug":"sub180"}'),
  ('22222222-0000-0000-0000-000000000002', 'nightshift@exports.demo', crypt('demo1234', gen_salt('bf')), now(), now(), now(), '{"role":"promoter","display_name":"NightShift Events","slug":"nightshift-events"}'),
  ('33333333-0000-0000-0000-000000000001', 'basementvenue@exports.demo', crypt('demo1234', gen_salt('bf')), now(), now(), now(), '{"role":"venue","display_name":"The Basement","slug":"the-basement"}'),
  ('33333333-0000-0000-0000-000000000002', 'critvenue@exports.demo', crypt('demo1234', gen_salt('bf')), now(), now(), now(), '{"role":"venue","display_name":"CRIT","slug":"crit"}')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- PROFILES
-- ─────────────────────────────────────────
INSERT INTO profiles (id, email, role, display_name, slug, bio, location_city, location_country, profile_photo, social_links)
VALUES
  ('11111111-0000-0000-0000-000000000001', 'shirin@exports.demo', 'artist', 'SHIRIN', 'shirin',
   'Auckland-based selector carving out space at the intersection of Jungle, UKG and 140. Known for deep crate digging and raw, energetic sets that move floors without sacrificing substance. Resident at Sub180 and a regular face at underground events across Tāmaki Makaurau.',
   'Auckland', 'New Zealand',
   'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800',
   '{"instagram":"https://instagram.com","soundcloud":"https://soundcloud.com"}'),

  ('11111111-0000-0000-0000-000000000002', 'pascalk@exports.demo', 'artist', 'PASCAL K', 'pascal-k',
   'Wellington-based Techno and Industrial DJ with a sound rooted in the harder end of the European club spectrum. Pascal K has been a fixture on the Wellington underground for over a decade, known for uncompromising, high-energy sets and meticulous track selection.',
   'Wellington', 'New Zealand',
   'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800',
   '{"instagram":"https://instagram.com","bandcamp":"https://bandcamp.com"}'),

  ('11111111-0000-0000-0000-000000000003', 'veralow@exports.demo', 'artist', 'VERA LOW', 'vera-low',
   'Christchurch-born, now based in Auckland. Vera Low blends UK Garage and Afrobeats into a sound that feels both timeless and distinctly now. Her ability to read a crowd and shift energy seamlessly has earned her bookings across the country.',
   'Auckland', 'New Zealand',
   'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
   '{"instagram":"https://instagram.com"}'),

  ('11111111-0000-0000-0000-000000000004', 'mako@exports.demo', 'artist', 'MAKO', 'mako',
   'D&B and Breaks specialist from Auckland with a sound that sits between the dancefloor and the record store. MAKO brings a crate-digger mentality to every set — expect the unexpected, always quality.',
   'Auckland', 'New Zealand',
   'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800',
   '{"instagram":"https://instagram.com","soundcloud":"https://soundcloud.com"}'),

  ('11111111-0000-0000-0000-000000000005', 'junosun@exports.demo', 'artist', 'JUNO SUN', 'juno-sun',
   'House and Electro DJ based in Tāmaki Makaurau. JUNO SUN''s sets move between classic Chicago House, contemporary UK sounds and hardware-driven Electro. Warm, musical and always dancefloor-focused.',
   'Auckland', 'New Zealand',
   'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800',
   '{"instagram":"https://instagram.com","bandcamp":"https://bandcamp.com"}'),

  ('22222222-0000-0000-0000-000000000001', 'sub180@exports.demo', 'promoter', 'Sub180', 'sub180',
   'Auckland''s longest-running underground club night, dedicated to sound system culture and the harder end of the spectrum. Sub180 has been running since 2014, hosting international and local acts across Jungle, D&B, Techno and everything in between.',
   'Auckland', 'New Zealand',
   'https://images.unsplash.com/photo-1574265573777-a484d1f7d3a3?w=800',
   '{"instagram":"https://instagram.com","ra":"https://ra.co"}'),

  ('22222222-0000-0000-0000-000000000002', 'nightshift@exports.demo', 'promoter', 'NightShift Events', 'nightshift-events',
   'Wellington collective bringing quality underground electronic music to the capital. NightShift focuses on intimate, curated events with an emphasis on local talent and strong sound production.',
   'Wellington', 'New Zealand',
   'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
   '{"instagram":"https://instagram.com"}'),

  ('33333333-0000-0000-0000-000000000001', 'basementvenue@exports.demo', 'venue', 'The Basement', 'the-basement',
   'Auckland''s premier underground club space. A raw, no-frills venue with world-class sound and a committed regular crowd. 250 cap, two rooms, full production.',
   'Auckland', 'New Zealand',
   'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800',
   '{"instagram":"https://instagram.com"}'),

  ('33333333-0000-0000-0000-000000000002', 'critvenue@exports.demo', 'venue', 'CRIT', 'crit',
   'Wellington''s underground bunker venue. Intimate 150-cap space known for intimate bookings and a dedicated late-night crowd. Resident sound system maintained by the collective.',
   'Wellington', 'New Zealand',
   'https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=800',
   '{"instagram":"https://instagram.com"}')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- ARTISTS
-- ─────────────────────────────────────────
INSERT INTO artists (id, profile_id, genres, experience_level, gender_identity, fee_minimum, fee_currency, fee_negotiable, equipment, hardware_requirements, embeds, photo_gallery, available_tonight)
VALUES
  ('aaaa0001-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001',
   ARRAY['Jungle','UKG','140'], 'Established', 'She/Her', 250, 'NZD', true,
   '{"cdj3000":true,"vinyl":true,"controller":false,"rekordbox":true,"serato":false,"traktor":false}',
   'Requires CDJ-3000s and DJM-900NXS2 minimum. USB only, no laptop.',
   '[{"platform":"soundcloud","url":"https://w.soundcloud.com/player/?url=https://soundcloud.com/shackleton-music/sets/shackleton-fabric-55&color=%23c6ff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"},{"platform":"mixcloud","url":"https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FMixcloud%2Fmixcloud-music%2F&light=1"}]',
   '[{"url":"https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600","caption":"NightShift Vol.12"},{"url":"https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600","caption":"Sub180 June"},{"url":"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600","caption":"Fabric London"},{"url":"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600","caption":"Boiler Room"},{"url":"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600","caption":"Studio Set"},{"url":"https://images.unsplash.com/photo-1574265573777-a484d1f7d3a3?w=600","caption":"Sub180"}]',
   true),

  ('aaaa0002-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000002',
   ARRAY['Techno','Industrial'], 'Established', 'He/Him', 300, 'NZD', false,
   '{"cdj3000":true,"vinyl":true,"controller":false,"rekordbox":true,"serato":false,"traktor":false}',
   'Requires CDJ-3000s or Technics 1210s. DJM-900NXS2 preferred.',
   '[{"platform":"soundcloud","url":"https://w.soundcloud.com/player/?url=https://soundcloud.com/shackleton-music/sets/shackleton-fabric-55&color=%23c6ff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"}]',
   '[{"url":"https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600","caption":"NightShift"},{"url":"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600","caption":"CRIT Wellington"},{"url":"https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600","caption":"The Basement"}]',
   false),

  ('aaaa0003-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000003',
   ARRAY['Garage','Afrobeats'], 'Intermediate', 'She/Her', 150, 'NZD', true,
   '{"cdj3000":false,"vinyl":false,"controller":true,"rekordbox":true,"serato":true,"traktor":false}',
   NULL,
   '[{"platform":"mixcloud","url":"https://www.mixcloud.com/widget/iframe/?hide_cover=1&feed=%2FMixcloud%2Fmixcloud-music%2F&light=1"}]',
   '[{"url":"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600","caption":"Sub180"},{"url":"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600","caption":"Garden Party"}]',
   false),

  ('aaaa0004-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000004',
   ARRAY['D&B','Breaks'], 'Established', 'He/Him', 200, 'NZD', true,
   '{"cdj3000":true,"vinyl":true,"controller":false,"rekordbox":true,"serato":false,"traktor":false}',
   'CDJ-3000s strongly preferred. Can work with CDJ-2000NXS2.',
   '[{"platform":"soundcloud","url":"https://w.soundcloud.com/player/?url=https://soundcloud.com/shackleton-music/sets/shackleton-fabric-55&color=%23c6ff00&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"}]',
   '[{"url":"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600","caption":"Sub180"},{"url":"https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=600","caption":"The Basement"}]',
   true),

  ('aaaa0005-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000005',
   ARRAY['House','Electro'], 'Emerging', 'Non-binary', 100, 'NZD', true,
   '{"cdj3000":false,"vinyl":false,"controller":true,"rekordbox":true,"serato":false,"traktor":false}',
   NULL,
   '[]',
   '[{"url":"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600","caption":"First gig"}]',
   false)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- TOURING WINDOWS
-- ─────────────────────────────────────────
INSERT INTO touring_windows (artist_id, city, country, date_from, date_to)
VALUES
  ('aaaa0001-0000-0000-0000-000000000001', 'London', 'United Kingdom', '2026-06-01', '2026-06-14'),
  ('aaaa0001-0000-0000-0000-000000000001', 'Berlin', 'Germany', '2026-06-15', '2026-06-20'),
  ('aaaa0002-0000-0000-0000-000000000001', 'Melbourne', 'Australia', '2026-07-01', '2026-07-10')
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────
-- PROMOTERS
-- ─────────────────────────────────────────
INSERT INTO promoters (id, profile_id, trusted_partner, total_events_hosted, preferred_genres, preferred_locations, preferred_gender_identities, preferred_experience_levels, past_events_gallery)
VALUES
  ('bbbb0001-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001',
   true, 47,
   ARRAY['Jungle','UKG','140','D&B','Techno'],
   ARRAY['Auckland','Wellington'],
   ARRAY['She/Her','Non-binary','They/Them'],
   ARRAY['Emerging','Intermediate','Established'],
   '[{"imageUrl":"https://images.unsplash.com/photo-1574265573777-a484d1f7d3a3?w=600","caption":"Sub180 Vol.47 — March 2026"},{"imageUrl":"https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600","caption":"Sub180 Vol.46 — Feb 2026"},{"imageUrl":"https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600","caption":"Sub180 Vol.45 — Jan 2026"},{"imageUrl":"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600","caption":"Sub180 Vol.44 — Dec 2025"},{"imageUrl":"https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600","caption":"Sub180 Vol.43 — Nov 2025"},{"imageUrl":"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600","caption":"Sub180 Special — Oct 2025"}]'),

  ('bbbb0002-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000002',
   false, 18,
   ARRAY['Techno','Industrial','House'],
   ARRAY['Wellington'],
   ARRAY['Any'],
   ARRAY['Intermediate','Established'],
   '[{"imageUrl":"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600","caption":"NightShift Vol.18"},{"imageUrl":"https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=600","caption":"NightShift Vol.17"},{"imageUrl":"https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600","caption":"NightShift Vol.16"}]')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- VENUES
-- ─────────────────────────────────────────
INSERT INTO venues (id, profile_id, capacity, venue_fee, fee_currency, tech_specs, load_in_info, operational_photos)
VALUES
  ('cccc0001-0000-0000-0000-000000000001', '33333333-0000-0000-0000-000000000001',
   250, 500, 'NZD',
   '{"soundSystem":"Funktion-One Resolution 2 (main), F-One F81 (fill)","mixer":"Pioneer DJM-900NXS2","players":"2x Pioneer CDJ-3000, 2x Technics SL-1210MK7","lighting":"Void Scaffold rig, 4x moving heads, LED strips","monitor":"Pioneer DJM-900NXS2 booth output","backline":"Full DJ booth with USB hub, power conditioning"}',
   '{"accessTime":"From 2pm on event day","instructions":"Load-in via rear laneway on Federal St. Ring buzzer marked BASEMENT. Speak to the production manager on arrival. Artist green room is on the mezzanine level.","parkingAvailable":false,"elevatorAccess":false,"additionalNotes":"No street parking available. Valet available for equipment runs. Nearest parking building is on Victoria St."}',
   '[{"url":"https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600","caption":"Main floor"},{"url":"https://images.unsplash.com/photo-1574265573777-a484d1f7d3a3?w=600","caption":"DJ booth"},{"url":"https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600","caption":"Bar area"},{"url":"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600","caption":"Green room"}]'),

  ('cccc0002-0000-0000-0000-000000000001', '33333333-0000-0000-0000-000000000002',
   150, 300, 'NZD',
   '{"soundSystem":"Funktion-One Res2 (main room)","mixer":"Pioneer DJM-900NXS2","players":"2x Pioneer CDJ-3000","lighting":"Basic LED rig, 2x moving heads","monitor":"Booth monitor via DJM","backline":"USB hub, laptop stand available on request"}',
   '{"accessTime":"From 4pm on event day","instructions":"Enter via Tory St side entrance. Knock and ask for the sound tech. Green room is through the bar on the left.","parkingAvailable":true,"elevatorAccess":false,"additionalNotes":"Free parking on Tory St after 6pm. Venue is down a flight of stairs — no elevator access."}',
   '[{"url":"https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=600","caption":"Main floor"},{"url":"https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600","caption":"DJ booth"},{"url":"https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=600","caption":"Bar"}]')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- EVENTS
-- ─────────────────────────────────────────
INSERT INTO events (id, promoter_id, venue_id, title, slug, date, genres, status, blind_applications)
VALUES
  ('dddd0001-0000-0000-0000-000000000001', 'bbbb0001-0000-0000-0000-000000000001', 'cccc0001-0000-0000-0000-000000000001',
   'Sub180 Vol.48', 'sub180-vol-48', '2026-06-07 22:00:00+12', ARRAY['Jungle','UKG','140'], 'Open', true),

  ('dddd0002-0000-0000-0000-000000000001', 'bbbb0001-0000-0000-0000-000000000001', 'cccc0001-0000-0000-0000-000000000001',
   'Sub180 New Talent Night', 'sub180-new-talent', '2026-06-21 21:00:00+12', ARRAY['Jungle','D&B','Breaks','UKG'], 'Open', false),

  ('dddd0003-0000-0000-0000-000000000001', 'bbbb0002-0000-0000-0000-000000000001', 'cccc0002-0000-0000-0000-000000000001',
   'NightShift Vol.19', 'nightshift-vol-19', '2026-06-14 21:00:00+12', ARRAY['Techno','Industrial'], 'Open', false),

  ('dddd0004-0000-0000-0000-000000000001', 'bbbb0001-0000-0000-0000-000000000001', 'cccc0001-0000-0000-0000-000000000001',
   'Sub180 Vol.47', 'sub180-vol-47', '2026-05-03 22:00:00+12', ARRAY['Jungle','UKG','140'], 'Completed', false)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- SLOTS
-- ─────────────────────────────────────────
INSERT INTO slots (id, event_id, slot_type, start_time, end_time, fee, currency, genres, status)
VALUES
  -- Sub180 Vol.48
  ('eeee0001-0000-0000-0000-000000000001', 'dddd0001-0000-0000-0000-000000000001', 'Opening', '22:00', '00:00', 150, 'NZD', ARRAY['UKG','Garage'], 'Open'),
  ('eeee0002-0000-0000-0000-000000000001', 'dddd0001-0000-0000-0000-000000000001', 'Peak Time', '00:00', '03:00', 350, 'NZD', ARRAY['Jungle','140'], 'Open'),
  ('eeee0003-0000-0000-0000-000000000001', 'dddd0001-0000-0000-0000-000000000001', 'Closing', '03:00', '05:00', 200, 'NZD', ARRAY['Jungle','UKG'], 'Open'),

  -- Sub180 New Talent Night
  ('eeee0004-0000-0000-0000-000000000001', 'dddd0002-0000-0000-0000-000000000001', 'Opening', '21:00', '23:00', 80, 'NZD', ARRAY['D&B','Breaks'], 'Open'),
  ('eeee0005-0000-0000-0000-000000000001', 'dddd0002-0000-0000-0000-000000000001', 'Peak Time', '23:00', '02:00', 150, 'NZD', ARRAY['Jungle','UKG'], 'Open'),

  -- NightShift Vol.19
  ('eeee0006-0000-0000-0000-000000000001', 'dddd0003-0000-0000-0000-000000000001', 'Opening', '21:00', '23:30', 120, 'NZD', ARRAY['Techno'], 'Open'),
  ('eeee0007-0000-0000-0000-000000000001', 'dddd0003-0000-0000-0000-000000000001', 'Peak Time', '23:30', '03:00', 280, 'NZD', ARRAY['Techno','Industrial'], 'Open'),

  -- Sub180 Vol.47 (completed)
  ('eeee0008-0000-0000-0000-000000000001', 'dddd0004-0000-0000-0000-000000000001', 'Opening', '22:00', '00:00', 150, 'NZD', ARRAY['UKG'], 'Filled'),
  ('eeee0009-0000-0000-0000-000000000001', 'dddd0004-0000-0000-0000-000000000001', 'Peak Time', '00:00', '03:00', 300, 'NZD', ARRAY['Jungle','140'], 'Filled')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- APPLICATIONS (for open events)
-- ─────────────────────────────────────────
INSERT INTO applications (id, slot_id, event_id, artist_id, cover_note, mix_url, match_score, status)
VALUES
  -- Sub180 Vol.48 Peak Time — SHIRIN applies
  ('ffff0001-0000-0000-0000-000000000001', 'eeee0002-0000-0000-0000-000000000001', 'dddd0001-0000-0000-0000-000000000001',
   'aaaa0001-0000-0000-0000-000000000001',
   'Been looking forward to this one. My recent sets have been sitting right in that Jungle/140 crossover space — think fast 8 bar edits, deep sub bass, and proper speaker pressure. Happy to share a recent recording.',
   'https://soundcloud.com', 82, 'Shortlisted'),

  -- Sub180 Vol.48 Peak Time — MAKO applies
  ('ffff0002-0000-0000-0000-000000000001', 'eeee0002-0000-0000-0000-000000000001', 'dddd0001-0000-0000-0000-000000000001',
   'aaaa0004-0000-0000-0000-000000000001',
   'Sub180 has always been a spot I want to play. My current direction sits in the heavier end of D&B and Jungle — think Metalheadz-influenced with a NZ flavour.',
   'https://soundcloud.com', 74, 'Pending'),

  -- Sub180 Vol.48 Opening — VERA LOW applies
  ('ffff0003-0000-0000-0000-000000000001', 'eeee0001-0000-0000-0000-000000000001', 'dddd0001-0000-0000-0000-000000000001',
   'aaaa0003-0000-0000-0000-000000000001',
   'I''d love to open for Sub180. My opening sets sit in the UKG and Garage space — warm, rhythmic, building energy across the first couple of hours.',
   'https://mixcloud.com', 67, 'Pending'),

  -- NightShift Vol.19 Peak Time — PASCAL K applies
  ('ffff0004-0000-0000-0000-000000000001', 'eeee0007-0000-0000-0000-000000000001', 'dddd0003-0000-0000-0000-000000000001',
   'aaaa0002-0000-0000-0000-000000000001',
   'NightShift is exactly my kind of event. Uncompromising Techno and Industrial is my home territory — been playing this style for 10+ years and the Wellington crowd always responds.',
   'https://soundcloud.com', 91, 'Confirmed'),

  -- Sub180 New Talent — JUNO SUN applies
  ('ffff0005-0000-0000-0000-000000000001', 'eeee0005-0000-0000-0000-000000000001', 'dddd0002-0000-0000-0000-000000000001',
   'aaaa0005-0000-0000-0000-000000000001',
   'First time applying for Sub180 but I''ve been building my sound for a couple of years now. House and UKG crossover — would love the opportunity to play for a proper crowd.',
   NULL, 55, 'Pending')
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────
-- CONTRACTS (for completed event)
-- ─────────────────────────────────────────
INSERT INTO contracts (id, event_id, slot_id, artist_id, promoter_id, agreed_fee, currency, contract_text, artist_signed_at, promoter_signed_at, artist_signed_name, promoter_signed_name, status)
VALUES
  ('gggg0001-0000-0000-0000-000000000001',
   'dddd0004-0000-0000-0000-000000000001', 'eeee0009-0000-0000-0000-000000000001',
   'aaaa0001-0000-0000-0000-000000000001', 'bbbb0001-0000-0000-0000-000000000001',
   300, 'NZD',
   'This agreement is between Sub180 (Promoter) and SHIRIN (Artist) for a performance at Sub180 Vol.47 on Saturday 3 May 2026 at The Basement, Auckland. The Artist agrees to perform for the duration of the Peak Time slot (00:00–03:00). The agreed fee is NZD $300. Payment is due in two instalments: 50% deposit within 7 days of signing, and the remaining 50% on the night of the event. Cancellation within 7 days incurs a 50% cancellation fee. No-show incurs the full fee. Both parties agree to these terms by signing below.',
   '2026-04-10 10:00:00+12', '2026-04-09 14:00:00+12',
   'SHIRIN', 'Sub180', 'SignedByBoth')
ON CONFLICT (id) DO NOTHING;

INSERT INTO payment_instalments (contract_id, label, amount, currency, due_date, paid, paid_at)
VALUES
  ('gggg0001-0000-0000-0000-000000000001', 'Deposit (50%)', 150, 'NZD', '2026-04-16', true, '2026-04-14 09:00:00+12'),
  ('gggg0001-0000-0000-0000-000000000001', 'Balance (50%)', 150, 'NZD', '2026-05-03', true, '2026-05-03 22:30:00+12')
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────
-- VOUCH BADGES
-- ─────────────────────────────────────────
INSERT INTO vouch_badges (artist_id, promoter_id, badge, event_id)
VALUES
  ('aaaa0001-0000-0000-0000-000000000001', 'bbbb0001-0000-0000-0000-000000000001', 'Technically Flawless', 'dddd0004-0000-0000-0000-000000000001'),
  ('aaaa0001-0000-0000-0000-000000000001', 'bbbb0001-0000-0000-0000-000000000001', 'Built the Room', 'dddd0004-0000-0000-0000-000000000001'),
  ('aaaa0001-0000-0000-0000-000000000001', 'bbbb0002-0000-0000-0000-000000000001', 'Great Communicator', 'dddd0003-0000-0000-0000-000000000001'),
  ('aaaa0002-0000-0000-0000-000000000001', 'bbbb0002-0000-0000-0000-000000000001', 'Technically Flawless', 'dddd0003-0000-0000-0000-000000000001'),
  ('aaaa0002-0000-0000-0000-000000000001', 'bbbb0002-0000-0000-0000-000000000001', 'Crowd Favourite', 'dddd0003-0000-0000-0000-000000000001'),
  ('aaaa0004-0000-0000-0000-000000000001', 'bbbb0001-0000-0000-0000-000000000001', 'Punctual & Professional', 'dddd0004-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;

-- ─────────────────────────────────────────
-- DJs DJ NOMINATIONS
-- ─────────────────────────────────────────
INSERT INTO djs_dj_nominations (nominator_id, nominee_id, month)
VALUES
  ('aaaa0002-0000-0000-0000-000000000001', 'aaaa0005-0000-0000-0000-000000000001', '2026-05'),
  ('aaaa0004-0000-0000-0000-000000000001', 'aaaa0005-0000-0000-0000-000000000001', '2026-05'),
  ('aaaa0001-0000-0000-0000-000000000001', 'aaaa0003-0000-0000-0000-000000000001', '2026-05')
ON CONFLICT DO NOTHING;
