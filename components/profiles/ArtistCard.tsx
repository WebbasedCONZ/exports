import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

// Curated rave/DJ/techno Unsplash photos for fallback
const ARTIST_PHOTOS = [
  'photo-1493225457124-a3eb161ffa5f', // DJ performing
  'photo-1540575467063-178a50c2df87', // rave crowd lights
  'photo-1516450360452-9312f5e86fc7', // concert strobe
  'photo-1571266028243-e4733b0f0bb0', // festival night
  'photo-1598300042247-d088f8ab3a91', // dark nightclub
  'photo-1614680376573-df3480f0c6a0', // DJ headphones
  'photo-1571019613454-1cb2f99b2d8b', // vinyl records
  'photo-1459749411175-04bf5292ceea', // concert lights
];

function getFallbackPhoto(id: string): string {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const photoId = ARTIST_PHOTOS[hash % ARTIST_PHOTOS.length];
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=600&q=80`;
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
          <Image
            src={photo ?? getFallbackPhoto(artist.id)}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
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
