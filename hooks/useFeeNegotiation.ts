'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useFeeNegotiation(applicationId: string) {
  const [negotiations, setNegotiations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!applicationId) return;
    const supabase = createClient();
    const { data } = await supabase
      .from('fee_negotiations')
      .select('*, proposed_by_profile:profiles(*)')
      .eq('application_id', applicationId)
      .order('created_at', { ascending: true });
    setNegotiations(data ?? []);
    setLoading(false);
  }, [applicationId]);

  useEffect(() => { refresh(); }, [refresh]);

  async function proposeOffer(proposedBy: string, amount: number, currency: string, note?: string) {
    const supabase = createClient();
    // Mark previous offers as countered
    if (negotiations.length > 0) {
      const last = negotiations[negotiations.length - 1];
      if (last.status === 'Pending') {
        await supabase.from('fee_negotiations').update({ status: 'Countered' }).eq('id', last.id);
      }
    }
    await supabase.from('fee_negotiations').insert({
      application_id: applicationId,
      proposed_by: proposedBy,
      amount,
      currency,
      note: note ?? null,
      status: 'Pending',
    });
    refresh();
  }

  async function acceptOffer(negotiationId: string) {
    const supabase = createClient();
    await supabase.from('fee_negotiations').update({ status: 'Accepted' }).eq('id', negotiationId);
    refresh();
  }

  async function rejectOffer(negotiationId: string) {
    const supabase = createClient();
    await supabase.from('fee_negotiations').update({ status: 'Rejected' }).eq('id', negotiationId);
    refresh();
  }

  const latestOffer = negotiations[negotiations.length - 1] ?? null;
  const agreedFee = negotiations.find(n => n.status === 'Accepted') ?? null;

  return { negotiations, loading, latestOffer, agreedFee, proposeOffer, acceptOffer, rejectOffer };
}
