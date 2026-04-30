'use client';
import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';

export function useConversations(profileId: string) {
  const [conversations, setConversations] = useState<any[]>([]);

  const refresh = useCallback(async () => {
    if (!profileId) return;
    const supabase = createClient();
    const { data } = await supabase
      .from('conversations')
      .select('*, participant_a_profile:profiles!conversations_participant_a_fkey(*), participant_b_profile:profiles!conversations_participant_b_fkey(*)')
      .or(`participant_a.eq.${profileId},participant_b.eq.${profileId}`)
      .order('last_message_at', { ascending: false });
    setConversations(data ?? []);
  }, [profileId]);

  useEffect(() => { refresh(); }, [refresh]);

  return { conversations, refresh };
}

export function useMessages(conversationId: string) {
  const [messages, setMessages] = useState<any[]>([]);

  const refresh = useCallback(async () => {
    if (!conversationId) return;
    const supabase = createClient();
    const { data } = await supabase
      .from('messages')
      .select('*, sender:profiles(*)')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });
    setMessages(data ?? []);
  }, [conversationId]);

  useEffect(() => {
    refresh();
    const supabase = createClient();
    // Realtime subscription
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`,
      }, () => refresh())
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [conversationId, refresh]);

  async function sendMessage(senderId: string, content: string) {
    const supabase = createClient();
    await supabase.from('messages').insert({ conversation_id: conversationId, sender_id: senderId, content });
    await supabase.from('conversations').update({ last_message_at: new Date().toISOString() }).eq('id', conversationId);
  }

  return { messages, sendMessage, refresh };
}

export async function getOrCreateConversation(participantA: string, participantB: string) {
  const supabase = createClient();
  // Try to find existing conversation (order participants consistently)
  const [a, b] = [participantA, participantB].sort();
  const { data: existing } = await supabase
    .from('conversations')
    .select('id')
    .eq('participant_a', a)
    .eq('participant_b', b)
    .single();

  if (existing) return existing.id;

  const { data: created } = await supabase
    .from('conversations')
    .insert({ participant_a: a, participant_b: b })
    .select('id')
    .single();

  return created?.id ?? null;
}

export function useUnreadCount(profileId: string) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!profileId) return;
    const supabase = createClient();

    async function fetchCount() {
      const { data: convos } = await supabase
        .from('conversations')
        .select('id')
        .or(`participant_a.eq.${profileId},participant_b.eq.${profileId}`);

      if (!convos?.length) return;
      const ids = convos.map(c => c.id);
      const { count: c } = await supabase
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .in('conversation_id', ids)
        .eq('read', false)
        .neq('sender_id', profileId);
      setCount(c ?? 0);
    }

    fetchCount();

    const channel = supabase
      .channel(`unread:${profileId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, fetchCount)
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [profileId]);

  return count;
}
