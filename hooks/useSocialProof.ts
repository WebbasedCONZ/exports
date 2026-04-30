'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export const VOUCH_BADGES = [
  'Technically Flawless',
  'Crowd Favourite',
  'Great Communicator',
  'Punctual & Professional',
  'Built the Room',
  'Reads a Crowd',
] as const;

export function useVouchBadges(artistId: string) {
  const [badges, setBadges] = useState<any[]>([]);

  const refresh = useCallback(async () => {
    if (!artistId) return;
    const supabase = createClient();
    const { data } = await supabase
      .from('vouch_badges')
      .select('*, promoter:promoters(*, profile:profiles(display_name, slug, profile_photo))')
      .eq('artist_id', artistId)
      .order('created_at', { ascending: false });
    setBadges(data ?? []);
  }, [artistId]);

  useEffect(() => { refresh(); }, [refresh]);

  async function addVouch(promoterId: string, badge: string, eventId: string) {
    const supabase = createClient();
    await supabase.from('vouch_badges').insert({ artist_id: artistId, promoter_id: promoterId, badge, event_id: eventId });
    refresh();
  }

  // Group badges by type with counts
  const grouped = badges.reduce((acc: Record<string, any[]>, b) => {
    if (!acc[b.badge]) acc[b.badge] = [];
    acc[b.badge].push(b);
    return acc;
  }, {});

  return { badges, grouped, addVouch, refresh };
}

export function useDjsDjNominations() {
  const [nominations, setNominations] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const currentMonth = new Date().toISOString().slice(0, 7);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('djs_dj_nominations')
      .select('*, nominee:artists!djs_dj_nominations_nominee_id_fkey(*, profile:profiles(*))')
      .eq('month', currentMonth)
      .then(({ data }) => {
        setNominations(data ?? []);
        // Build leaderboard
        const counts: Record<string, { artist: any; count: number }> = {};
        (data ?? []).forEach((n: any) => {
          if (!counts[n.nominee_id]) counts[n.nominee_id] = { artist: n.nominee, count: 0 };
          counts[n.nominee_id].count++;
        });
        setLeaderboard(Object.values(counts).sort((a, b) => b.count - a.count).slice(0, 10));
      });
  }, [currentMonth]);

  async function nominate(nominatorId: string, nomineeId: string) {
    const supabase = createClient();
    await supabase.from('djs_dj_nominations').insert({
      nominator_id: nominatorId,
      nominee_id: nomineeId,
      month: currentMonth,
    });
  }

  return { nominations, leaderboard, nominate, currentMonth };
}
