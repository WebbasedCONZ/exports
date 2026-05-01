'use client';
import { useParams } from 'next/navigation';
import { useArtist } from '@/hooks/useArtists';
import { useEvents } from '@/hooks/useEvents';
import { useVenues } from '@/hooks/useVenues';
import { useAuth } from '@/hooks/useAuth';
import GenreTagList from '@/components/profiles/GenreTagList';
import EquipmentChecklist from '@/components/profiles/EquipmentChecklist';
import MediaEmbeds from '@/components/profiles/MediaEmbeds';
import PhotoGrid from '@/components/profiles/PhotoGrid';
import EventCard from '@/components/events/EventCard';
import MessageButton from '@/components/messaging/MessageButton';
import TouringStatus from '@/components/touring/TouringStatus';
import VouchBadges from '@/components/social-proof/VouchBadges';
import { MapPin, Share2, ExternalLink, Music } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function ArtistProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const artist = useArtist(slug);
  const { events } = useEvents();
  const { venues } = useVenues();
  const { profile } = useAuth();

  if (!artist) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-[#444]">
        <p>Loading artist...</p>
      </div>
    );
  }

  const openEvents = events.filter(
    (e) => e.status === 'Open' && e.genres.some((g: string) => artist.genres?.includes(g))
  );

  const isOwnProfile = profile?.id === artist.profile_id;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="relative h-48 sm:h-64 rounded-md overflow-hidden mb-0 bg-[#1a1a1a]">
        {artist.profile?.profile_photo && (
          <Image src={artist.profile.profile_photo} alt={artist.profile?.display_name} fill className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
      </div>

      {/* Profile header row */}
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 relative z-10 px-2 mb-8">
        <div className="w-24 h-24 rounded-md overflow-hidden border-4 border-[#0a0a0a] flex-shrink-0 bg-[#1a1a1a]">
          {artist.profile?.profile_photo && (
            <Image src={artist.profile.profile_photo} alt={artist.profile?.display_name} width={96} height={96} className="object-cover w-full h-full" />
          )}
        </div>
        <div className="flex-1 pb-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="text-2xl font-bold tracking-wide" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {artist.profile?.display_name}
            </h1>
            <span className="text-xs text-[#555] border border-[#252525] px-2 py-0.5 rounded-sm">{artist.experience_level}</span>
            {artist.available_tonight && (
              <span className="text-xs px-2 py-0.5 rounded-sm bg-[#3d52ff]/10 border border-[#3d52ff]/30 text-[#3d52ff]">Available Tonight</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-[#555]">
            <MapPin size={11} />
            {artist.profile?.location_city}, {artist.profile?.location_country}
          </div>
          {/* Touring Status badges */}
          <div className="mt-2">
            <TouringStatus artistId={artist.id} editable={isOwnProfile} />
          </div>
        </div>
        <div className="flex items-center gap-2 pb-1">
          {artist.profile?.social_links?.instagram && (
            <a href={artist.profile.social_links.instagram} target="_blank" rel="noopener noreferrer"
              className="p-2 border border-[#252525] rounded-sm text-[#555] hover:text-[#ededed] hover:border-[#3a3a3a] transition-colors">
              <Share2 size={14} />
            </a>
          )}
          {artist.profile?.social_links?.bandcamp && (
            <a href={artist.profile.social_links.bandcamp} target="_blank" rel="noopener noreferrer"
              className="p-2 border border-[#252525] rounded-sm text-[#555] hover:text-[#ededed] hover:border-[#3a3a3a] transition-colors">
              <Music size={14} />
            </a>
          )}
          {/* Message button — only show if not own profile */}
          {!isOwnProfile && artist.profile_id && (
            <MessageButton recipientProfileId={artist.profile_id} />
          )}
          <div className="text-right">
            <p className="text-xs text-[#555]">From</p>
            <p className="text-sm font-semibold text-[#3d52ff]">
              {formatCurrency(artist.fee_minimum, artist.fee_currency)}
              {artist.fee_negotiable && <span className="text-[#555] text-xs font-normal ml-1">neg.</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Bio */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Bio</h2>
            <p className="text-sm text-[#aaa] leading-relaxed">{artist.profile?.bio}</p>
          </section>

          {/* Genres */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Genres</h2>
            <GenreTagList genres={artist.genres ?? []} />
          </section>

          {/* Vouch Badges */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Industry Recognition</h2>
            <VouchBadges artistId={artist.id} />
          </section>

          {/* Mixes */}
          {artist.embeds?.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Recent Sets</h2>
              <MediaEmbeds embeds={artist.embeds} />
            </section>
          )}

          {/* Photo feed */}
          {artist.photo_gallery?.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Photos</h2>
              <PhotoGrid photos={artist.photo_gallery} />
            </section>
          )}

          {/* Matching open gigs */}
          {openEvents.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">
                Open Gigs That Match This Artist
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {openEvents.slice(0, 4).map((e) => {
                  const venue = venues.find((v) => v.id === e.venue_id);
                  return <EventCard key={e.id} event={e} venueName={venue?.profile?.display_name} />;
                })}
              </div>
            </section>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Equipment */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Equipment Proficiency</h2>
            <EquipmentChecklist equipment={artist.equipment ?? {}} />
            {artist.hardware_requirements && (
              <div className="mt-3 bg-[#1a1a1a] border border-[#252525] rounded-sm p-3 text-xs text-[#666] leading-relaxed">
                <p className="text-[#555] font-medium mb-1 uppercase tracking-wide text-[10px]">Hardware Requirements</p>
                {artist.hardware_requirements}
              </div>
            )}
          </section>

          {/* Fee + Booking */}
          <section className="bg-[#141414] border border-[#252525] rounded-md p-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Booking</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#555]">Minimum fee</span>
                <span className="text-[#3d52ff] font-semibold">{formatCurrency(artist.fee_minimum, artist.fee_currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#555]">Negotiable</span>
                <span className={artist.fee_negotiable ? 'text-[#3d52ff]' : 'text-[#555]'}>
                  {artist.fee_negotiable ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
            {!isOwnProfile && artist.profile_id && (
              <div className="mt-3">
                <MessageButton recipientProfileId={artist.profile_id} label="Message to Book" />
              </div>
            )}
            <Link
              href={`/events/new?artist=${artist.id}`}
              className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-[#3d52ff] text-black text-sm font-semibold rounded-sm hover:bg-[#2a3fe0] transition-colors"
            >
              Post a Gig <ExternalLink size={13} />
            </Link>
          </section>

          {/* Artist info */}
          <section className="bg-[#141414] border border-[#252525] rounded-md p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[#555]">Experience</span>
              <span className="text-[#ededed]">{artist.experience_level}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#555]">Identity</span>
              <span className="text-[#ededed]">{artist.gender_identity}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#555]">Based</span>
              <span className="text-[#ededed]">{artist.profile?.location_city}</span>
            </div>
          </section>

          {/* DJs DJ link */}
          <Link href="/community/djs-dj" className="block text-center text-xs text-[#555] hover:text-[#ffd700] transition-colors py-2">
            ★ Nominate for DJs' DJ Award
          </Link>
        </div>
      </div>
    </div>
  );
}
