'use client';
import { useState, useEffect, useCallback } from 'react';
import { getCollection, upsert, KEYS } from '@/lib/storage';
import type { Artist } from '@/types';

export function useArtists() {
  const [artists, setArtists] = useState<Artist[]>([]);

  const refresh = useCallback(() => {
    setArtists(getCollection<Artist>(KEYS.artists));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveArtist = (artist: Artist) => {
    upsert(KEYS.artists, artist);
    refresh();
  };

  return { artists, saveArtist, refresh };
}

export function useArtist(id: string) {
  const [artist, setArtist] = useState<Artist | null>(null);
  useEffect(() => {
    const all = getCollection<Artist>(KEYS.artists);
    setArtist(all.find((a) => a.id === id || a.slug === id) ?? null);
  }, [id]);
  return artist;
}
