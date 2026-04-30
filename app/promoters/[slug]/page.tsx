'use client';
import { useParams } from 'next/navigation';
import { usePromoter } from '@/hooks/usePromoters';
import { useEvents } from '@/hooks/useEvents';
import { useVenues } from '@/hooks/useVenues';
import TrustedBadge from '@/components/profiles/TrustedBadge';
import GenreTagList from '@/components/profiles/GenreTagList';
import EventCard from '@/components/events/EventCard';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar, Share2, ExternalLink } from 'lucide-react';

export default function PromoterProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const promoter = usePromoter(slug);
  const { events } = useEvents();
  const { venues } = useVenues();

  if (!promoter) return <div className="max-w-7xl mx-auto px-6 py-20 text-center text-[#444]"><p>Loading...</p></div>;

  const promoterEvents = events.filter((e) => e.promoterId === promoter.id);
  const openEvents = promoterEvents.filter((e) => e.status === 'Open');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="bg-[#141414] border border-[#252525] rounded-md overflow-hidden mb-8">
        {promoter.pastEventsGallery[0] && (
          <div className="relative h-52 overflow-hidden">
            <Image src={promoter.pastEventsGallery[0].imageUrl} alt={promoter.displayName} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
          </div>
        )}
        <div className="p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{promoter.displayName}</h1>
                {promoter.trustedPartner && <TrustedBadge />}
              </div>
              <div className="flex items-center gap-3 text-xs text-[#555]">
                <span className="flex items-center gap-1"><MapPin size={11} />{promoter.location.city}, {promoter.location.country}</span>
                <span className="flex items-center gap-1"><Calendar size={11} />{promoter.totalEventsHosted} events hosted</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {promoter.socialLinks.instagram && (
                <a href={promoter.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                  className="p-2 border border-[#252525] rounded-sm text-[#555] hover:text-[#ededed] transition-colors">
                  <Share2 size={14} />
                </a>
              )}
              {promoter.socialLinks.ra && (
                <a href={promoter.socialLinks.ra} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 border border-[#252525] rounded-sm text-xs text-[#555] hover:text-[#ededed] transition-colors">
                  <ExternalLink size={12} /> RA
                </a>
              )}
            </div>
          </div>
          <p className="text-sm text-[#888] leading-relaxed mt-4 max-w-2xl">{promoter.bio}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left */}
        <div className="lg:col-span-2 space-y-8">
          {/* Open gigs */}
          {openEvents.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Open Gig Postings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {openEvents.map((e) => {
                  const venue = venues.find((v) => v.id === e.venueId);
                  return <EventCard key={e.id} event={e} venueName={venue?.name} />;
                })}
              </div>
            </section>
          )}

          {/* Past events gallery */}
          {promoter.pastEventsGallery.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Past Events</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {promoter.pastEventsGallery.map((item, i) => (
                  <div key={i} className="relative aspect-video rounded-sm overflow-hidden bg-[#1a1a1a]">
                    <Image src={item.imageUrl} alt={item.caption} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <p className="text-[10px] text-[#ccc] leading-tight truncate">{item.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preferences */}
          <section className="bg-[#141414] border border-[#252525] rounded-md p-4 space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555]">Booking Preferences</h2>

            <div>
              <p className="text-[10px] uppercase tracking-wide text-[#444] mb-2">Preferred Genres</p>
              <GenreTagList genres={promoter.preferences.preferredGenres} size="sm" />
            </div>

            {promoter.preferences.preferredLocations.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wide text-[#444] mb-2">Preferred Locations</p>
                <div className="flex flex-wrap gap-1.5">
                  {promoter.preferences.preferredLocations.map((l) => (
                    <span key={l} className="text-xs px-2 py-0.5 border border-[#252525] rounded-sm text-[#666]">{l}</span>
                  ))}
                </div>
              </div>
            )}

            {promoter.preferences.preferredGenderIdentities.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wide text-[#444] mb-2">Identity Preference</p>
                <div className="flex flex-wrap gap-1.5">
                  {promoter.preferences.preferredGenderIdentities.map((g) => (
                    <span key={g} className="text-xs px-2 py-0.5 border border-[#252525] rounded-sm text-[#666]">{g}</span>
                  ))}
                </div>
              </div>
            )}

            {promoter.preferences.preferredExperienceLevels.length > 0 && (
              <div>
                <p className="text-[10px] uppercase tracking-wide text-[#444] mb-2">Experience Level</p>
                <div className="flex flex-wrap gap-1.5">
                  {promoter.preferences.preferredExperienceLevels.map((l) => (
                    <span key={l} className="text-xs px-2 py-0.5 border border-[#252525] rounded-sm text-[#666]">{l}</span>
                  ))}
                </div>
              </div>
            )}
          </section>

          <Link href="/events/new" className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#c6ff00] text-black text-sm font-semibold rounded-sm hover:bg-[#b5ee00] transition-colors">
            Post a Gig
          </Link>
        </div>
      </div>
    </div>
  );
}
