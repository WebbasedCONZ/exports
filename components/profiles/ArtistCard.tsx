import Link from 'next/link';
import Image from 'next/image';
import GenreTagList from './GenreTagList';
import { MapPin } from 'lucide-react';
import type { Artist } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function ArtistCard({ artist }: { artist: Artist }) {
  return (
    <Link href={`/artists/${artist.slug}`} className="block group">
      <div className="bg-[#141414] border border-[#252525] rounded-md overflow-hidden transition-all duration-200 hover:border-[#3a3a3a] hover:bg-[#1a1a1a]">
        <div className="aspect-[4/3] relative overflow-hidden bg-[#1a1a1a]">
          <Image
            src={artist.profilePhoto}
            alt={artist.displayName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <GenreTagList genres={artist.genres} size="sm" />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-bold text-base tracking-wide">{artist.displayName}</h3>
            <span className="text-xs text-[#555] flex-shrink-0 mt-0.5">{artist.experienceLevel}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[#555] mb-2">
            <MapPin size={11} />
            {artist.location.city}, {artist.location.country}
          </div>
          <p className="text-xs text-[#666] line-clamp-2 leading-relaxed mb-3">{artist.bio}</p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#555]">From</span>
            <span className="text-[#c6ff00] font-medium">
              {formatCurrency(artist.fee.minimum, artist.fee.currency)}
              {artist.fee.negotiable && <span className="text-[#555] ml-1">(neg.)</span>}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
