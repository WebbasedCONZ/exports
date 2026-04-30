'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else { setProfile(null); setLoading(false); }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const supabase = createClient();
    const { data } = await supabase
      .from('profiles')
      .select('*, artist:artists(*), promoter:promoters(*), venue:venues(*)')
      .eq('id', userId)
      .single();
    setProfile(data);
    setLoading(false);
  }

  async function signIn(email: string) {
    const supabase = createClient();
    return supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
  }

  async function signUp(email: string, password: string, meta: { role: string; display_name: string; slug: string }) {
    const supabase = createClient();
    return supabase.auth.signUp({ email, password, options: { data: meta, emailRedirectTo: `${window.location.origin}/auth/callback` } });
  }

  async function signInWithPassword(email: string, password: string) {
    const supabase = createClient();
    return supabase.auth.signInWithPassword({ email, password });
  }

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  return { user, profile, loading, signIn, signUp, signInWithPassword, signOut };
}
