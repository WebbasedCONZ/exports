'use client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEvents } from '@/hooks/useEvents';
import { useApplications } from '@/hooks/useApplications';
import { useContracts } from '@/hooks/useContracts';
import { useVenues } from '@/hooks/useVenues';
import Avatar from '@/components/ui/Avatar';
import EventCard from '@/components/events/EventCard';
import Link from 'next/link';
import { FileText, Calendar, Bell, ArrowRight, UserCog } from 'lucide-react';
import { formatDate, statusColor } from '@/lib/utils';
import { contractStatusLabel } from '@/lib/contracts';

export default function DashboardPage() {
  const { user, switchUser } = useCurrentUser();
  const { events } = useEvents();
  const { applications } = useApplications();
  const { contracts } = useContracts(user?.profileId);
  const { venues } = useVenues();

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-[#555] mb-4">No profile active.</p>
        <Link href="/onboarding" className="text-[#c6ff00] hover:underline text-sm">Create a profile →</Link>
      </div>
    );
  }

  const myApplications = applications.filter((a) => a.artistId === user.profileId);
  const confirmedApps = myApplications.filter((a) => a.status === 'Confirmed');
  const pendingApps = myApplications.filter((a) => a.status === 'Pending');
  const upcomingEvents = events.filter((e) => e.status === 'Open' || e.status === 'Confirmed').slice(0, 4);
  const pendingContracts = contracts.filter((c) => c.status === 'Sent');
  const recentContracts = contracts.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div className="flex items-center gap-4">
          <Avatar src={user.profilePhoto} name={user.displayName} size={56} />
          <div>
            <p className="text-xs text-[#555] uppercase tracking-wide mb-0.5">{user.role}</p>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {user.displayName}
            </h1>
          </div>
        </div>
        {/* Demo switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#555]">Demo as:</span>
          <button
            onClick={() => switchUser({ role: 'artist', profileId: 'artist-001', displayName: 'SHIRIN', profilePhoto: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80' })}
            className={`text-xs px-3 py-1 rounded-sm border transition-all ${user.profileId === 'artist-001' ? 'border-[#c6ff00]/40 text-[#c6ff00] bg-[#c6ff00]/8' : 'border-[#252525] text-[#555] hover:border-[#333]'}`}
          >
            Artist
          </button>
          <button
            onClick={() => switchUser({ role: 'promoter', profileId: 'promoter-001', displayName: 'NightShift', profilePhoto: 'https://images.unsplash.com/photo-1571266028243-d220c6a6c88f?w=600&q=80' })}
            className={`text-xs px-3 py-1 rounded-sm border transition-all ${user.profileId === 'promoter-001' ? 'border-[#c6ff00]/40 text-[#c6ff00] bg-[#c6ff00]/8' : 'border-[#252525] text-[#555] hover:border-[#333]'}`}
          >
            Promoter
          </button>
        </div>
      </div>

      {/* Action alerts */}
      {pendingContracts.length > 0 && (
        <div className="bg-[#ffd700]/8 border border-[#ffd700]/20 rounded-md p-4 mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell size={16} className="text-[#ffd700]" />
            <span className="text-sm text-[#ffd700]">
              {pendingContracts.length} contract{pendingContracts.length > 1 ? 's' : ''} awaiting your signature
            </span>
          </div>
          <Link href="/dashboard/contracts" className="text-xs text-[#ffd700] hover:underline flex items-center gap-1">
            Review <ArrowRight size={12} />
          </Link>
        </div>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Applications', value: myApplications.length, sub: `${pendingApps.length} pending`, color: '#888' },
          { label: 'Confirmed Gigs', value: confirmedApps.length, sub: 'slots confirmed', color: '#00d4ff' },
          { label: 'Contracts', value: contracts.length, sub: `${pendingContracts.length} awaiting sign`, color: '#ffd700' },
          { label: 'Open Gigs', value: upcomingEvents.length, sub: 'available to apply', color: '#c6ff00' },
        ].map((s) => (
          <div key={s.label} className="bg-[#141414] border border-[#252525] rounded-md p-4">
            <p className="text-2xl font-bold mb-0.5" style={{ color: s.color, fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</p>
            <p className="text-xs font-medium text-[#ededed]">{s.label}</p>
            <p className="text-[10px] text-[#555] mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Open gigs */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555]">Open Gigs</h2>
              <Link href="/events" className="text-xs text-[#555] hover:text-[#888]">View all →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {upcomingEvents.map((e) => {
                const venue = venues.find((v) => v.id === e.venueId);
                return <EventCard key={e.id} event={e} venueName={venue?.name} />;
              })}
            </div>
          </section>

          {/* My applications */}
          {user.role === 'artist' && myApplications.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555]">My Applications</h2>
                <Link href="/dashboard/gigs" className="text-xs text-[#555] hover:text-[#888]">View all →</Link>
              </div>
              <div className="space-y-2">
                {myApplications.slice(0, 5).map((app) => {
                  const evt = events.find((e) => e.id === app.eventId);
                  const sColor = statusColor(app.status);
                  return (
                    <div key={app.id} className="bg-[#141414] border border-[#252525] rounded-sm p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{evt?.title ?? 'Event'}</p>
                        <p className="text-xs text-[#555]">{app.slotId.replace('slot-', 'Slot ')}</p>
                      </div>
                      <span className="text-xs px-2 py-0.5 rounded-sm border" style={{ color: sColor, borderColor: `${sColor}40`, backgroundColor: `${sColor}10` }}>
                        {app.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick links */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Quick Links</h2>
            <div className="space-y-2">
              {[
                { href: '/dashboard/contracts', icon: <FileText size={14} />, label: 'Contracts', count: contracts.length },
                { href: '/dashboard/gigs', icon: <Calendar size={14} />, label: 'My Gigs', count: confirmedApps.length },
                { href: user.role === 'promoter' ? `/promoters/${user.profileId}` : `/artists/${user.profileId}`, icon: <UserCog size={14} />, label: 'My Profile' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="flex items-center justify-between p-3 bg-[#141414] border border-[#252525] rounded-sm hover:border-[#3a3a3a] transition-all text-sm group">
                  <span className="flex items-center gap-2 text-[#888] group-hover:text-[#ededed] transition-colors">
                    {l.icon} {l.label}
                  </span>
                  <span className="flex items-center gap-2 text-[#555]">
                    {'count' in l && <span className="text-xs">{l.count}</span>}
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent contracts */}
          {recentContracts.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Recent Contracts</h2>
              <div className="space-y-2">
                {recentContracts.map((c) => {
                  const sColor = statusColor(c.status);
                  return (
                    <Link key={c.id} href={`/settlement/${c.eventId}`} className="block bg-[#141414] border border-[#252525] rounded-sm p-3 hover:border-[#3a3a3a] transition-all">
                      <p className="text-xs font-medium truncate mb-1">{c.gigSheet.eventName}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-[#555]">{formatDate(c.createdAt, { month: 'short', day: 'numeric' })}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm border" style={{ color: sColor, borderColor: `${sColor}40`, backgroundColor: `${sColor}10` }}>
                          {contractStatusLabel(c)}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
