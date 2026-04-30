import Link from 'next/link';
import Image from 'next/image';
import TrustedBadge from './TrustedBadge';
import GenreTagList from './GenreTagList';
import { MapPin, Calendar } from 'lucide-react';
import type { Promoter } from '@/types';

export default function PromoterCard({ promoter }: { promoter: Promoter }) {
  return (
    <Link href={`/promoters/${promoter.slug}`} className="block group">
      <div className="bg-[#141414] border border-[#252525] rounded-md overflow-hidden transition-all duration-200 hover:border-[#3a3a3a] hover:bg-[#1a1a1a]">
        <div className="aspect-video relative overflow-hidden bg-[#1a1a1a]">
          {promoter.pastEventsGallery[0] ? (
            <Image
              src={promoter.pastEventsGallery[0].imageUrl}
              alt={promoter.displayName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-[#1a1a1a]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-3 left-3">
            {promoter.trustedPartner && <TrustedBadge />}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-base">{promoter.displayName}</h3>
          </div>
          <div className="flex items-center gap-3 text-xs text-[#555] mb-3">
            <span className="flex items-center gap-1"><MapPin size={11} />{promoter.location.city}</span>
            <span className="flex items-center gap-1"><Calendar size={11} />{promoter.totalEventsHosted} events</span>
          </div>
          <p className="text-xs text-[#666] line-clamp-2 leading-relaxed mb-3">{promoter.bio}</p>
          <GenreTagList genres={promoter.preferences.preferredGenres.slice(0, 3)} size="sm" />
        </div>
      </div>
    </Link>
  );
}
