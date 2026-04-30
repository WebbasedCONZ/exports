import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users } from 'lucide-react';
import type { Venue } from '@/types';
import { formatCurrency } from '@/lib/utils';

export default function VenueCard({ venue }: { venue: Venue }) {
  const heroPhoto = venue.photos.find((p) => p.category === 'dancefloor') ?? venue.photos[0];
  return (
    <Link href={`/venues/${venue.slug}`} className="block group">
      <div className="bg-[#141414] border border-[#252525] rounded-md overflow-hidden transition-all duration-200 hover:border-[#3a3a3a] hover:bg-[#1a1a1a]">
        {heroPhoto && (
          <div className="aspect-video relative overflow-hidden bg-[#1a1a1a]">
            <Image src={heroPhoto.imageUrl} alt={venue.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
        )}
        <div className="p-4">
          <h3 className="font-bold text-base mb-1">{venue.name}</h3>
          <div className="flex items-center gap-3 text-xs text-[#555] mb-2">
            <span className="flex items-center gap-1"><MapPin size={11} />{venue.location.city}</span>
            <span className="flex items-center gap-1"><Users size={11} />Cap. {venue.capacity}</span>
          </div>
          <p className="text-xs text-[#666] line-clamp-2 leading-relaxed mb-3">{venue.description}</p>
          <div className="text-xs text-[#555]">
            {venue.venueFee.feeType === 'negotiable' ? (
              <span className="text-[#00d4ff]">Fee negotiable</span>
            ) : venue.venueFee.feeType === 'percentage' ? (
              <span>{venue.venueFee.amount}% door rev.</span>
            ) : (
              <span>{formatCurrency(venue.venueFee.amount, venue.venueFee.currency)} flat fee</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
