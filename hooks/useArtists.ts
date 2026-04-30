'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useArtists() {
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('artists')
      .select('*, profile:profiles(*)');
    setArtists(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const saveArtist = async (artist: any) => {
    const supabase = createClient();
    await supabase.from('artists').upsert(artist);
    refresh();
  };

  return { artists, loading, saveArtist, refresh };
}

export function useArtist(slug: string) {
  const [artist, setArtist] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    const supabase = createClient();
    supabase
      .from('profiles')
      .select('*, artist:artists(*, touring_windows(*), vouch_badges(*))')
      .eq('slug', slug)
      .single()
      .then(({ data }) => {
        if (data?.artist) {
          setArtist({ ...data.artist, ...data, artist: undefined });
        }
      });
  }, [slug]);

  return artist;
}
