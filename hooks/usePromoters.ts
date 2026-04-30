'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function usePromoters() {
  const [promoters, setPromoters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from('promoters')
      .select('*, profile:profiles(*)');
    setPromoters(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const savePromoter = async (promoter: any) => {
    const supabase = createClient();
    await supabase.from('promoters').upsert(promoter);
    refresh();
  };

  return { promoters, loading, savePromoter, refresh };
}

export function usePromoter(slugOrId: string) {
  const [promoter, setPromoter] = useState<any>(null);

  useEffect(() => {
    if (!slugOrId) return;
    const supabase = createClient();
    supabase
      .from('profiles')
      .select('*, promoter:promoters(*)')
      .or(`id.eq.${slugOrId},slug.eq.${slugOrId}`)
      .single()
      .then(({ data }) => {
        if (data?.promoter) setPromoter({ ...data.promoter, ...data, promoter: undefined });
      });
  }, [slugOrId]);

  return promoter;
}
