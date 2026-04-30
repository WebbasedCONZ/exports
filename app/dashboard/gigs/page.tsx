'use client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useApplications } from '@/hooks/useApplications';
import { useEvents } from '@/hooks/useEvents';
import { useVenues } from '@/hooks/useVenues';
import { formatDate, statusColor, formatCurrency } from '@/lib/utils';
import { Calendar, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';

export default function GigsPage() {
  const { user } = useCurrentUser();
  const { applications } = useApplications();
  const { events } = useEvents();
  const { venues } = useVenues();

  const myApps = applications.filter((a) => a.artistId === user?.profileId);

  const gigsWithDetails = myApps.map((app) => {
    const event = events.find((e) => e.id === app.eventId);
    const venue = event ? venues.find((v) => v.id === event.venueId) : null;
    const slot = event?.slots.find((s) => s.id === app.slotId);
    return { app, event, venue, slot };
  }).filter((g) => g.event).sort((a, b) => new Date(a.event!.date).getTime() - new Date(b.event!.date).getTime());

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <Link href="/dashboard" className="text-xs text-[#555] hover:text-[#888] mb-2 block">← Dashboard</Link>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>My Gigs</h1>
        <p className="text-[#555] text-sm mt-1">All applications and confirmed bookings.</p>
      </div>

      {gigsWithDetails.length === 0 ? (
        <div className="text-center py-20 text-[#444]">
          <p className="text-sm mb-3">No applications yet.</p>
          <Link href="/events" className="text-xs text-[#c6ff00] hover:underline">Browse open gigs →</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {gigsWithDetails.map(({ app, event, venue, slot }) => {
            const sColor = statusColor(app.status);
            return (
              <div key={app.id} className="bg-[#141414] border border-[#252525] rounded-md p-4 hover:border-[#3a3a3a] transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Link href={`/events/${event!.slug}`} className="font-semibold text-sm hover:text-[#c6ff00] transition-colors">
                        {event!.title}
                      </Link>
                      <span className="text-xs px-2 py-0.5 rounded-sm border flex-shrink-0"
                        style={{ color: sColor, borderColor: `${sColor}40`, backgroundColor: `${sColor}10` }}>
                        {app.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#555]">
                      <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(event!.date)}</span>
                      {venue && <span className="flex items-center gap-1"><MapPin size={11} />{venue.name}</span>}
                      {slot && <span className="flex items-center gap-1"><Clock size={11} />{slot.slotType} — {slot.startTime}–{slot.endTime}</span>}
                    </div>
                  </div>
                  <div className="text-right">
                    {slot && <p className="text-[#c6ff00] font-semibold text-sm">{formatCurrency(slot.fee, slot.currency)}</p>}
                    {app.status === 'Confirmed' && (
                      <Link href={`/settlement/${event!.id}`} className="text-xs text-[#00d4ff] hover:underline mt-1 block">
                        View settlement →
                      </Link>
                    )}
                  </div>
                </div>
                {app.coverNote && (
                  <p className="text-xs text-[#555] mt-3 pt-3 border-t border-[#1a1a1a] line-clamp-1">
                    Your note: {app.coverNote}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
