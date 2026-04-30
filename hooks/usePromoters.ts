'use client';
import { useState, useEffect, useCallback } from 'react';
import { getCollection, upsert, KEYS } from '@/lib/storage';
import type { Promoter } from '@/types';

export function usePromoters() {
  const [promoters, setPromoters] = useState<Promoter[]>([]);
  const refresh = useCallback(() => setPromoters(getCollection<Promoter>(KEYS.promoters)), []);
  useEffect(() => { refresh(); }, [refresh]);
  const savePromoter = (p: Promoter) => { upsert(KEYS.promoters, p); refresh(); };
  return { promoters, savePromoter, refresh };
}

export function usePromoter(id: string) {
  const [promoter, setPromoter] = useState<Promoter | null>(null);
  useEffect(() => {
    const all = getCollection<Promoter>(KEYS.promoters);
    setPromoter(all.find((p) => p.id === id || p.slug === id) ?? null);
  }, [id]);
  return promoter;
}
