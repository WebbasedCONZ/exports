'use client';
import { useState, useEffect, useCallback } from 'react';
import { getCollection, upsert, KEYS } from '@/lib/storage';
import type { Event } from '@/types';

export function useEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const refresh = useCallback(() => setEvents(getCollection<Event>(KEYS.events)), []);
  useEffect(() => { refresh(); }, [refresh]);
  const saveEvent = (e: Event) => { upsert(KEYS.events, e); refresh(); };
  return { events, saveEvent, refresh };
}

export function useEvent(id: string) {
  const [event, setEvent] = useState<Event | null>(null);
  const refresh = useCallback(() => {
    const all = getCollection<Event>(KEYS.events);
    setEvent(all.find((e) => e.id === id || e.slug === id) ?? null);
  }, [id]);
  useEffect(() => { refresh(); }, [refresh]);
  return { event, refresh };
}
