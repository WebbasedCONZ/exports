import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

// Local verified rave/DJ photos — no random Unsplash surprises
const ARTIST_PHOTOS = [
  '/images/artists/a1.jpg', // DJ at decks B&W
  '/images/artists/a2.jpg', // rave crowd
  '/images/artists/a3.jpg', // concert strobe
  '/images/artists/a4.jpg', // concert stage
  '/images/artists/a5.jpg', // stage lights
  '/images/artists/a6.jpg', // crowd hands
  '/images/artists/a7.jpg', // festival crowd
  '/images/artists/a8.jpg', // dark club
];

function getFallbackPhoto(id: string): string {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return ARTIST_PHOTOS[hash % ARTIST_PHOTOS.length];
}

// Genre color map for pills
const GENRE_COLORS: Record<string, string> = {
  'Techno': '#1d4ed8', 'House': '#b45309', 'Jungle': '#c2410c',
  'Drum & Bass': '#065f46', 'UKG': '#0d9488', '140': '#7c3aed',
  'Grime': '#be123c', 'Garage': '#0369a1', 'Afrobeats': '#d97706',
  'Breaks': '#7e22ce', 'Industrial': '#6b21a8', 'Electro': '#1e40af',
};

export default function ArtistCard({ artist }: { artist: any }) {
  const name = artist.profile?.display_name ?? 'Unknown Artist';
  const slug = artist.profile?.slug ?? artist.id;
  const photo = artist.profile?.profile_photo;
  const genres: string[] = artist.genres ?? [];
  const city = artist.city ?? '';
  const country = artist.country ?? '';

  return (
    <Link href={`/artists/${slug}`} className="brutal-card block group">
      <div className="bg-[#0a0a0a] border border-white/8 rounded-sm overflow-hidden">
        {/* Image / Placeholder */}
        <div className="aspect-[4/3] relative overflow-hidden bg-[#111]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo ?? getFallbackPhoto(artist.id)}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
            onError={(e) => { (e.target as HTMLImageElement).src = '/images/artists/a1.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Genre pills on image */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-wrap gap-1">
            {genres.slice(0, 2).map((g) => (
              <span key={g} className="text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm text-white"
                style={{ background: GENRE_COLORS[g] ?? '#3d52ff' }}>
                {g}
              </span>
            ))}
            {genres.length > 2 && (
              <span className="text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm text-white/50 bg-white/10">
                +{genres.length - 2}
              </span>
            )}
          </div>

          {/* Available tonight badge */}
          {artist.available_tonight && (
            <div className="absolute top-3 right-3">
              <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-[#ff3333] text-white rounded-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                Tonight
              </span>
            </div>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-black text-base uppercase tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {name}
            </h3>
            <ArrowRight size={14} className="text-white/20 group-hover:text-[#3d52ff] group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
          </div>

          {(city || country) && (
            <div className="flex items-center gap-1 text-[11px] text-white/30 mb-3">
              <MapPin size={10} />
              {[city, country].filter(Boolean).join(', ')}
            </div>
          )}

          {artist.bio && (
            <p className="text-xs text-white/30 line-clamp-2 leading-relaxed mb-4">{artist.bio}</p>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-[10px] text-white/20 uppercase tracking-widest">
              {artist.experience_level ?? 'Artist'}
            </span>
            {artist.fee_minimum ? (
              <span className="text-sm font-black text-[#3d52ff]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {formatCurrency(artist.fee_minimum, artist.fee_currency ?? 'NZD')}
                {artist.fee_negotiable && <span className="text-white/20 text-[10px] font-normal ml-1">neg.</span>}
              </span>
            ) : (
              <span className="text-[10px] text-white/20">POA</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
