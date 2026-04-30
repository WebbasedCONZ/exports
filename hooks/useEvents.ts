'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('events')
      .select('*, slots(*), promoter:promoters(*, profile:profiles(*))')
      .order('date', { ascending: true });
    setEvents(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const saveEvent = async (event: any) => {
    const supabase = createClient();
    await supabase.from('events').upsert(event);
    refresh();
  };

  return { events, loading, saveEvent, refresh };
}

export function useEvent(slugOrId: string) {
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!slugOrId) return;
    const supabase = createClient();
    const { data } = await supabase
      .from('events')
      .select('*, slots(*), promoter:promoters(*, profile:profiles(*)), venue:venues(*, profile:profiles(*))')
      .or(`id.eq.${slugOrId},slug.eq.${slugOrId}`)
      .single();
    setEvent(data ?? null);
    setLoading(false);
  }, [slugOrId]);

  useEffect(() => { refresh(); }, [refresh]);

  return { event, loading, refresh };
}
