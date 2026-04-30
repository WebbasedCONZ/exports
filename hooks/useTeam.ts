'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useTeam(ownerId: string) {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!ownerId) return;
    const supabase = createClient();
    const { data } = await supabase
      .from('team_members')
      .select('*, profile:profiles(*)')
      .eq('team_owner_id', ownerId)
      .order('created_at', { ascending: true });
    setMembers(data ?? []);
    setLoading(false);
  }, [ownerId]);

  useEffect(() => { refresh(); }, [refresh]);

  async function inviteMember(email: string, role: 'booker' | 'admin' | 'manager') {
    const supabase = createClient();
    await supabase.from('team_members').insert({
      team_owner_id: ownerId,
      invited_email: email,
      role,
      accepted: false,
    });
    refresh();
  }

  async function removeMember(memberId: string) {
    const supabase = createClient();
    await supabase.from('team_members').delete().eq('id', memberId);
    refresh();
  }

  async function updateRole(memberId: string, role: 'booker' | 'admin' | 'manager') {
    const supabase = createClient();
    await supabase.from('team_members').update({ role }).eq('id', memberId);
    refresh();
  }

  return { members, loading, inviteMember, removeMember, updateRole, refresh };
}

export function useMyManagedProfiles(profileId: string) {
  const [managed, setManaged] = useState<any[]>([]);

  useEffect(() => {
    if (!profileId) return;
    const supabase = createClient();
    supabase
      .from('team_members')
      .select('*, owner:profiles!team_members_team_owner_id_fkey(*, artist:artists(*), promoter:promoters(*))')
      .eq('profile_id', profileId)
      .eq('accepted', true)
      .then(({ data }) => setManaged(data ?? []));
  }, [profileId]);

  return managed;
}
