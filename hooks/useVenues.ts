'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useVenues() {
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('venues')
      .select('*, profile:profiles(*)');
    setVenues(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  return { venues, loading, refresh };
}

export function useVenue(slugOrId: string) {
  const [venue, setVenue] = useState<any>(null);

  useEffect(() => {
    if (!slugOrId) return;
    const supabase = createClient();
    supabase
      .from('profiles')
      .select('*, venue:venues(*)')
      .or(`id.eq.${slugOrId},slug.eq.${slugOrId}`)
      .single()
      .then(({ data }) => {
        if (data?.venue) setVenue({ ...data.venue, ...data, venue: undefined });
      });
  }, [slugOrId]);

  return venue;
}
