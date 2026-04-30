'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useEvent } from '@/hooks/useEvents';
import { useVenue } from '@/hooks/useVenues';
import { usePromoter } from '@/hooks/usePromoters';
import { useApplications } from '@/hooks/useApplications';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import GenreTagList from '@/components/profiles/GenreTagList';
import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import { Calendar, Clock, MapPin, EyeOff, DollarSign, ArrowRight } from 'lucide-react';
import { formatDate, formatCurrency, statusColor, daysUntil, generateId } from '@/lib/utils';
import { computeMatchScore } from '@/lib/matching';
import { getCollection, KEYS } from '@/lib/storage';
import type { Artist, Application } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

export default function EventDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { event, refresh } = useEvent(slug);
  const venue = useVenue(event?.venueId ?? '');
  const promoter = usePromoter(event?.promoterId ?? '');
  const { applications, saveApplication } = useApplications(event?.id);
  const { user } = useCurrentUser();
  const [applySlotId, setApplySlotId] = useState<string | null>(null);
  const [coverNote, setCoverNote] = useState('');
  const [mixUrl, setMixUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!event) return <div className="max-w-7xl mx-auto px-6 py-20 text-center text-[#444]"><p>Loading...</p></div>;

  const sColor = statusColor(event.status);
  const days = daysUntil(event.applicationDeadline);

  const handleApply = () => {
    if (!applySlotId || !user) return;
    const slot = event.slots.find((s) => s.id === applySlotId)!;
    const artists = getCollection<Artist>(KEYS.artists);
    const artist = artists.find((a) => a.id === user.profileId);
    const matchScore = artist ? computeMatchScore(artist, event, slot) : 50;

    const app: Application = {
      id: generateId('app'),
      eventId: event.id,
      slotId: applySlotId,
      artistId: user.profileId,
      status: 'Pending',
      coverNote,
      mixUrl: mixUrl || undefined,
      matchScore,
      appliedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveApplication(app);
    setSubmitted(true);
    setTimeout(() => {
      setApplySlotId(null);
      setSubmitted(false);
      setCoverNote('');
      setMixUrl('');
    }, 2000);
  };

  const hasApplied = (slotId: string) =>
    applications.some((a) => a.slotId === slotId && a.artistId === user?.profileId);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Poster */}
      <div className="relative h-64 sm:h-80 rounded-md overflow-hidden mb-8 bg-[#1a1a1a]">
        <Image src={event.posterImageUrl} alt={event.title} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span
              className="text-xs px-2.5 py-1 rounded-sm font-medium border"
              style={{ color: sColor, borderColor: `${sColor}40`, backgroundColor: `${sColor}12` }}
            >
              {event.status}
            </span>
            {event.blindApplications && (
              <span className="flex items-center gap-1 text-xs px-2.5 py-1 border border-[#333] rounded-sm text-[#888]">
                <EyeOff size={11} /> Blind Applications
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {event.title}
          </h1>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-4 text-xs text-[#555] mb-6 pb-6 border-b border-[#1a1a1a]">
        <span className="flex items-center gap-1.5"><Calendar size={12} />{formatDate(event.date)}</span>
        <span className="flex items-center gap-1.5"><Clock size={12} />Doors {event.doorsOpen}</span>
        {venue && <span className="flex items-center gap-1.5"><MapPin size={12} />{venue.name}, {venue.location.city}</span>}
        {days > 0 && <span className={`flex items-center gap-1.5 ${days < 7 ? 'text-[#ffd700]' : ''}`}>Apply by {formatDate(event.applicationDeadline)} ({days}d left)</span>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">About</h2>
            <p className="text-sm text-[#888] leading-relaxed">{event.description}</p>
          </section>

          {/* Genres */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Genres</h2>
            <GenreTagList genres={event.genres} />
          </section>

          {/* Slots */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Available Slots</h2>
            <div className="space-y-3">
              {event.slots.map((slot) => {
                const applied = hasApplied(slot.id);
                const slotApp = applications.find((a) => a.slotId === slot.id && a.artistId === user?.profileId);
                return (
                  <div key={slot.id} className="bg-[#141414] border border-[#252525] rounded-md p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-semibold text-sm">{slot.slotType}</span>
                          <span className="text-xs text-[#555]">{slot.startTime} – {slot.endTime} ({slot.setDurationMinutes} min)</span>
                        </div>
                        <GenreTagList genres={slot.genres} size="sm" />
                        {slot.notes && <p className="text-xs text-[#666] mt-2 leading-relaxed">{slot.notes}</p>}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="flex items-center gap-1 text-[#c6ff00] font-semibold text-sm mb-2 justify-end">
                          <DollarSign size={12} />
                          {formatCurrency(slot.fee, slot.currency)}
                        </div>
                        {event.status === 'Open' && user?.role === 'artist' && (
                          applied ? (
                            <span className="text-xs px-3 py-1 rounded-sm border border-[#c6ff00]/20 text-[#c6ff00] bg-[#c6ff00]/5">
                              Applied ({slotApp?.status})
                            </span>
                          ) : (
                            <Button size="sm" onClick={() => setApplySlotId(slot.id)}>
                              Apply <ArrowRight size={12} />
                            </Button>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Venue card */}
          {venue && (
            <section className="bg-[#141414] border border-[#252525] rounded-md p-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Venue</h2>
              <p className="font-semibold text-sm mb-1">{venue.name}</p>
              <p className="text-xs text-[#555] mb-2">{venue.location.address}</p>
              <p className="text-xs text-[#666] line-clamp-2 mb-3">{venue.technicalSpecs.boothSetup}</p>
              <Link href={`/venues/${venue.slug}`} className="text-xs text-[#00d4ff] hover:underline">
                View full specs →
              </Link>
            </section>
          )}

          {/* Promoter */}
          {promoter && (
            <section className="bg-[#141414] border border-[#252525] rounded-md p-4">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Promoter</h2>
              <p className="font-semibold text-sm mb-1">{promoter.displayName}</p>
              <p className="text-xs text-[#555] mb-3">{promoter.totalEventsHosted} events hosted</p>
              <Link href={`/promoters/${promoter.slug}`} className="text-xs text-[#00d4ff] hover:underline">
                View profile →
              </Link>
            </section>
          )}

          {/* Promoter view: see applicants */}
          {user?.role === 'promoter' && user.profileId === event.promoterId && (
            <Link
              href={`/events/${event.slug}/applicants`}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#c6ff00] text-black text-sm font-semibold rounded-sm hover:bg-[#b5ee00] transition-colors"
            >
              View Applicants ({applications.length})
            </Link>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      <Modal open={!!applySlotId} onClose={() => setApplySlotId(null)} title="Apply for Slot">
        {submitted ? (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">✓</div>
            <p className="font-semibold text-[#c6ff00]">Application submitted!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wide text-[#555] mb-1.5 block">Cover Note</label>
              <textarea
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Tell the promoter why you'd be a great fit for this slot..."
                rows={4}
                className="w-full bg-[#1a1a1a] border border-[#252525] rounded-sm p-3 text-sm text-[#ededed] placeholder-[#444] focus:outline-none focus:border-[#3a3a3a] resize-none"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-[#555] mb-1.5 block">Mix Link (optional)</label>
              <input
                type="url"
                value={mixUrl}
                onChange={(e) => setMixUrl(e.target.value)}
                placeholder="https://soundcloud.com/..."
                className="w-full bg-[#1a1a1a] border border-[#252525] rounded-sm px-3 py-2 text-sm text-[#ededed] placeholder-[#444] focus:outline-none focus:border-[#3a3a3a]"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setApplySlotId(null)}>Cancel</Button>
              <Button className="flex-1" onClick={handleApply} disabled={!coverNote.trim()}>Submit Application</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
