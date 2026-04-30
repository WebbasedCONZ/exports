'use client';
import { useState, useEffect, useCallback } from 'react';
import { getCollection, upsert, KEYS } from '@/lib/storage';
import type { Application } from '@/types';

export function useApplications(eventId?: string) {
  const [applications, setApplications] = useState<Application[]>([]);
  const refresh = useCallback(() => {
    const all = getCollection<Application>(KEYS.applications);
    setApplications(eventId ? all.filter((a) => a.eventId === eventId) : all);
  }, [eventId]);
  useEffect(() => { refresh(); }, [refresh]);
  const saveApplication = (a: Application) => { upsert(KEYS.applications, a); refresh(); };
  return { applications, saveApplication, refresh };
}
