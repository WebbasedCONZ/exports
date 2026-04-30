'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useTouringWindows(artistId: string) {
  const [windows, setWindows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!artistId) return;
    const supabase = createClient();
    const { data } = await supabase
      .from('touring_windows')
      .select('*')
      .eq('artist_id', artistId)
      .gte('date_to', new Date().toISOString().split('T')[0])
      .order('date_from', { ascending: true });
    setWindows(data ?? []);
    setLoading(false);
  }, [artistId]);

  useEffect(() => { refresh(); }, [refresh]);

  async function addWindow(window: {
    city: string; country: string; lat?: number; lng?: number;
    date_from: string; date_to: string;
  }) {
    const supabase = createClient();
    await supabase.from('touring_windows').insert({ artist_id: artistId, ...window });
    refresh();
  }

  async function removeWindow(id: string) {
    const supabase = createClient();
    await supabase.from('touring_windows').delete().eq('id', id);
    refresh();
  }

  const activeNow = windows.filter(w => {
    const today = new Date().toISOString().split('T')[0];
    return w.date_from <= today && w.date_to >= today;
  });

  return { windows, activeNow, loading, addWindow, removeWindow, refresh };
}
