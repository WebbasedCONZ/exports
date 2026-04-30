'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useEmergencyStandby() {
  const [availableArtists, setAvailableArtists] = useState<any[]>([]);

  const fetchAvailable = useCallback(async (city?: string) => {
    const supabase = createClient();
    let query = supabase
      .from('artists')
      .select('*, profile:profiles(*), touring_windows(*)')
      .eq('available_tonight', true);

    const { data } = await query;
    if (!data) return;

    const now = new Date().toISOString();
    const filtered = data.filter(a => {
      // Check available_tonight_until hasn't passed
      if (a.available_tonight_until && a.available_tonight_until < now) return false;
      if (!city) return true;
      // Check if based in city or has active touring window
      if (a.profile?.location_city?.toLowerCase() === city.toLowerCase()) return true;
      const today = new Date().toISOString().split('T')[0];
      return a.touring_windows?.some((w: any) =>
        w.city.toLowerCase() === city.toLowerCase() &&
        w.date_from <= today && w.date_to >= today
      );
    });

    setAvailableArtists(filtered);
  }, []);

  async function triggerEmergency(eventId: string, slotId: string, originalFee: number, currency: string, city?: string) {
    const supabase = createClient();
    const premiumFee = Math.round(originalFee * 1.2);

    // Mark event as emergency
    await supabase.from('events').update({
      emergency: true,
      emergency_triggered_at: new Date().toISOString(),
    }).eq('id', eventId);

    // Fetch available artists in the area
    await fetchAvailable(city);

    // Create emergency response records for all matching artists
    const toNotify = availableArtists.slice(0, 20);
    if (toNotify.length > 0) {
      await supabase.from('emergency_responses').insert(
        toNotify.map(a => ({
          event_id: eventId,
          slot_id: slotId,
          artist_id: a.id,
          premium_fee: premiumFee,
          status: 'Pending',
        }))
      );
    }

    return { premiumFee, notified: toNotify.length };
  }

  async function acceptEmergency(responseId: string) {
    const supabase = createClient();
    // Accept this one
    await supabase.from('emergency_responses').update({ status: 'Accepted' }).eq('id', responseId);
    // Expire all others for the same slot
    const { data } = await supabase.from('emergency_responses').select('slot_id').eq('id', responseId).single();
    if (data) {
      await supabase.from('emergency_responses')
        .update({ status: 'Expired' })
        .eq('slot_id', data.slot_id)
        .neq('id', responseId);
    }
  }

  return { availableArtists, fetchAvailable, triggerEmergency, acceptEmergency };
}

export function useMyEmergencyAlerts(artistId: string) {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    if (!artistId) return;
    const supabase = createClient();

    async function fetch() {
      const { data } = await supabase
        .from('emergency_responses')
        .select('*, event:events(*, slots(*), promoter:promoters(*, profile:profiles(*)))')
        .eq('artist_id', artistId)
        .eq('status', 'Pending')
        .order('created_at', { ascending: false });
      setAlerts(data ?? []);
    }

    fetch();

    // Realtime: get notified when a new emergency response is created
    const channel = supabase
      .channel(`emergency:${artistId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'emergency_responses',
        filter: `artist_id=eq.${artistId}`,
      }, fetch)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [artistId]);

  return alerts;
}
