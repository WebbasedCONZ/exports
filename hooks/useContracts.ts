'use client';
import { useState, useEffect, useCallback } from 'react';
import { getCollection, upsert, KEYS } from '@/lib/storage';
import type { Contract } from '@/types';

export function useContracts(artistId?: string) {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const refresh = useCallback(() => {
    const all = getCollection<Contract>(KEYS.contracts);
    setContracts(artistId ? all.filter((c) => c.artistId === artistId) : all);
  }, [artistId]);
  useEffect(() => { refresh(); }, [refresh]);
  const saveContract = (c: Contract) => { upsert(KEYS.contracts, c); refresh(); };
  return { contracts, saveContract, refresh };
}

export function useContract(id: string) {
  const [contract, setContract] = useState<Contract | null>(null);
  const refresh = useCallback(() => {
    const all = getCollection<Contract>(KEYS.contracts);
    setContract(all.find((c) => c.id === id) ?? null);
  }, [id]);
  useEffect(() => { refresh(); }, [refresh]);
  return { contract, refresh };
}
