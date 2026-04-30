'use client';
import { useState, useEffect, useCallback } from 'react';
import { getCollection, upsert, KEYS } from '@/lib/storage';
import type { Venue } from '@/types';

export function useVenues() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const refresh = useCallback(() => setVenues(getCollection<Venue>(KEYS.venues)), []);
  useEffect(() => { refresh(); }, [refresh]);
  return { venues, refresh };
}

export function useVenue(id: string) {
  const [venue, setVenue] = useState<Venue | null>(null);
  useEffect(() => {
    const all = getCollection<Venue>(KEYS.venues);
    setVenue(all.find((v) => v.id === id || v.slug === id) ?? null);
  }, [id]);
  return venue;
}
