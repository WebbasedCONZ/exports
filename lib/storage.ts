'use client';

const PREFIX = 'exports:';

export function getCollection<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function setCollection<T>(key: string, items: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PREFIX + key, JSON.stringify(items));
}

export function getById<T extends { id: string }>(key: string, id: string): T | undefined {
  return getCollection<T>(key).find((item) => item.id === id);
}

export function upsert<T extends { id: string }>(key: string, item: T): void {
  const items = getCollection<T>(key);
  const idx = items.findIndex((i) => i.id === item.id);
  if (idx >= 0) {
    items[idx] = item;
  } else {
    items.push(item);
  }
  setCollection(key, items);
}

export function remove(key: string, id: string): void {
  const items = getCollection<{ id: string }>(key).filter((i) => i.id !== id);
  setCollection(key, items);
}

export const KEYS = {
  artists: 'artists',
  promoters: 'promoters',
  venues: 'venues',
  events: 'events',
  applications: 'applications',
  contracts: 'contracts',
  currentUser: 'currentUser',
  seeded: 'seeded',
};
