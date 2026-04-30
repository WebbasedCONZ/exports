'use client';
import { useState, useEffect } from 'react';
import type { CurrentUser } from '@/types';

export function useCurrentUser() {
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('exports:currentUser');
      setUser(raw ? JSON.parse(raw) : null);
    } catch {
      setUser(null);
    }
  }, []);

  const switchUser = (u: CurrentUser) => {
    localStorage.setItem('exports:currentUser', JSON.stringify(u));
    setUser(u);
  };

  return { user, switchUser };
}
