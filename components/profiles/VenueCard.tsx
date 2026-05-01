import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, ArrowRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function VenueCard({ venue }: { venue: any }) {
  const name = venue.profile?.display_name ?? venue.name ?? 'Unknown Venue';
  const slug = venue.profile?.slug ?? venue.id;
  const photo = venue.profile?.profile_photo;
  const city = venue.city ?? '';
  const capacity = venue.capacity;

  return (
    <Link href={`/venues/${slug}`} className="brutal-card block group">
      <div className="bg-[#0a0a0a] border border-white/8 rounded-sm overflow-hidden">
        {/* Image */}
        <div className="aspect-video relative overflow-hidden bg-[#111]">
          {photo ? (
            <Image src={photo} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0d0a1a 100%)' }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          {/* Capacity badge */}
          {capacity && (
            <div className="absolute top-3 left-3">
              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-black/60 border border-white/10 text-white/60 rounded-sm">
                <Users size={9} />
                {capacity.toLocaleString()} cap.
              </span>
            </div>
          )}

          <div className="absolute top-3 right-3">
            <ArrowRight size={14} className="text-white/20 group-hover:text-[#3d52ff] transition-colors" />
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-black text-base uppercase tracking-tight text-white leading-tight mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {name}
          </h3>

          {city && (
            <div className="flex items-center gap-1 text-[11px] text-white/30 mb-3">
              <MapPin size={10} />{city}
            </div>
          )}

          {venue.description && (
            <p className="text-xs text-white/30 line-clamp-2 leading-relaxed mb-4">{venue.description}</p>
          )}

          <div className="pt-3 border-t border-white/5 text-xs">
            {venue.venue_fee_type === 'negotiable' ? (
              <span className="text-[#3d52ff] font-bold">Fee negotiable</span>
            ) : venue.venue_fee_type === 'percentage' ? (
              <span className="text-white/40">{venue.venue_fee_amount}% door split</span>
            ) : venue.venue_fee_amount ? (
              <span className="text-white/40">
                {formatCurrency(venue.venue_fee_amount, venue.venue_fee_currency ?? 'NZD')} flat
              </span>
            ) : (
              <span className="text-white/20">Contact for rates</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
