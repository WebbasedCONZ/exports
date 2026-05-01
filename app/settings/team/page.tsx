'use client';
import { useAuth } from '@/hooks/useAuth';
import { useTeam } from '@/hooks/useTeam';
import { useTouringWindows } from '@/hooks/useTouringStatus';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Users, Plus, Trash2, Mail, Settings } from 'lucide-react';
import TouringStatus from '@/components/touring/TouringStatus';
import Link from 'next/link';

const ROLES = ['booker', 'admin', 'manager'] as const;

export default function TeamSettingsPage() {
  const { profile, loading } = useAuth();
  const router = useRouter();
  const { members, inviteMember, removeMember, updateRole } = useTeam(profile?.id ?? '');
  const artistId = profile?.artist?.id;

  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'booker' | 'admin' | 'manager'>('booker');
  const [inviting, setInviting] = useState(false);
  const [success, setSuccess] = useState('');

  if (loading) return null;
  if (!profile) { router.push('/auth/login'); return null; }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setInviting(true);
    await inviteMember(email, role);
    setSuccess(`Invitation sent to ${email}`);
    setEmail('');
    setInviting(false);
    setTimeout(() => setSuccess(''), 4000);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Settings size={20} className="text-[#3d52ff]" />
        <h1 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Team & Settings</h1>
      </div>

      {/* Team Members */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Users size={15} className="text-[#555]" />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555]">Team Members</h2>
        </div>

        {members.length > 0 && (
          <div className="space-y-2 mb-4">
            {members.map(m => (
              <div key={m.id} className="flex items-center gap-3 p-3 bg-[#141414] border border-[#252525] rounded-sm">
                <div className="w-8 h-8 rounded-full bg-[#252525] flex items-center justify-center text-xs text-[#555]">
                  {m.profile?.display_name?.[0] ?? m.invited_email[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#ededed] truncate">
                    {m.profile?.display_name ?? m.invited_email}
                  </p>
                  <p className="text-xs text-[#555]">
                    {m.accepted ? 'Active' : '⏳ Invite pending'} · {m.invited_email}
                  </p>
                </div>
                <select value={m.role} onChange={e => updateRole(m.id, e.target.value as any)}
                  className="bg-[#1a1a1a] border border-[#252525] rounded-sm px-2 py-1 text-xs text-[#888] focus:outline-none capitalize">
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <button onClick={() => removeMember(m.id)}
                  className="text-[#444] hover:text-[#ff4444] transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Invite form */}
        <form onSubmit={handleInvite} className="bg-[#141414] border border-[#252525] rounded-md p-4 space-y-3">
          <p className="text-xs text-[#555] uppercase tracking-wide">Invite a team member</p>
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Mail size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#444]" />
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="their@email.com"
                className="w-full pl-7 pr-3 py-2 bg-[#1a1a1a] border border-[#252525] rounded-sm text-sm text-[#ededed] focus:outline-none focus:border-[#3d52ff]" />
            </div>
            <select value={role} onChange={e => setRole(e.target.value as any)}
              className="bg-[#1a1a1a] border border-[#252525] rounded-sm px-2 py-2 text-sm text-[#888] focus:outline-none capitalize">
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div className="text-[10px] text-[#444] space-y-0.5">
            <p><span className="text-[#555]">Booker</span> — can manage gigs and applicants</p>
            <p><span className="text-[#555]">Admin</span> — full access except billing</p>
            <p><span className="text-[#555]">Manager</span> — can manage artist profile and bookings</p>
          </div>
          {success && <p className="text-xs text-[#3d52ff]">✓ {success}</p>}
          <button type="submit" disabled={inviting}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#3d52ff] text-black text-xs font-semibold rounded-sm hover:bg-[#2a3fe0] transition-colors disabled:opacity-50">
            <Plus size={12} /> {inviting ? 'Sending...' : 'Send Invite'}
          </button>
        </form>
      </section>

      {/* Touring Windows — only for artists */}
      {artistId && (
        <section className="mb-8">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-4">Touring Windows</h2>
          <div className="bg-[#141414] border border-[#252525] rounded-md p-4">
            <TouringStatus artistId={artistId} editable={true} />
          </div>
        </section>
      )}

      {/* Available Tonight toggle — only for artists */}
      {artistId && (
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-4">Emergency Standby</h2>
          <AvailableTonightToggle artistId={artistId} />
        </section>
      )}
    </div>
  );
}

function AvailableTonightToggle({ artistId }: { artistId: string }) {
  const [available, setAvailable] = useState(false);
  const [saving, setSaving] = useState(false);

  async function toggle() {
    setSaving(true);
    const { createClient } = await import('@/lib/supabase/client');
    const supabase = createClient();
    const newVal = !available;
    await supabase.from('artists').update({
      available_tonight: newVal,
      available_tonight_until: newVal ? new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() : null,
    }).eq('id', artistId);
    setAvailable(newVal);
    setSaving(false);
  }

  return (
    <div className="bg-[#141414] border border-[#252525] rounded-md p-4 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#ededed]">Available Tonight</p>
        <p className="text-xs text-[#555] mt-0.5">Let promoters find you for last-minute bookings. Auto-expires in 8 hours.</p>
      </div>
      <button onClick={toggle} disabled={saving}
        className={`relative w-11 h-6 rounded-full transition-colors ${available ? 'bg-[#3d52ff]' : 'bg-[#252525]'}`}>
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${available ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}
