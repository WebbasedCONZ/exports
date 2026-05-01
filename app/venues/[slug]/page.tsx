'use client';
import { useParams } from 'next/navigation';
import { useVenue } from '@/hooks/useVenues';
import TechSpecsPanel from '@/components/profiles/TechSpecsPanel';
import LoadInInfo from '@/components/profiles/LoadInInfo';
import Image from 'next/image';
import { MapPin, Users, Mail } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function VenueProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const venue = useVenue(slug);

  if (!venue) return <div className="max-w-7xl mx-auto px-6 py-20 text-center text-[#444]"><p>Loading...</p></div>;

  const boothPhotos = venue.photos.filter((p) => p.category === 'booth');
  const otherPhotos = venue.photos.filter((p) => p.category !== 'booth');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero gallery */}
      {venue.photos.length > 0 && (
        <div className="grid grid-cols-4 gap-1 h-64 rounded-md overflow-hidden mb-8">
          <div className="col-span-2 relative">
            <Image src={venue.photos[0].imageUrl} alt={venue.photos[0].caption} fill className="object-cover" />
          </div>
          {venue.photos.slice(1, 4).map((photo, i) => (
            <div key={i} className="relative">
              <Image src={photo.imageUrl} alt={photo.caption} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{venue.name}</h1>
          <div className="flex items-center gap-3 text-xs text-[#555]">
            <span className="flex items-center gap-1"><MapPin size={11} />{venue.location.address}, {venue.location.city}</span>
            <span className="flex items-center gap-1"><Users size={11} />Cap. {venue.capacity}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-wide text-[#555] mb-1">Venue Fee</p>
          {venue.venueFee.feeType === 'negotiable' ? (
            <span className="text-[#00d4ff] font-semibold text-sm">Negotiable</span>
          ) : venue.venueFee.feeType === 'percentage' ? (
            <span className="text-[#3d52ff] font-semibold text-sm">{venue.venueFee.amount}% of door</span>
          ) : (
            <span className="text-[#3d52ff] font-semibold text-sm">{formatCurrency(venue.venueFee.amount, venue.venueFee.currency)}</span>
          )}
          {venue.venueFee.notes && <p className="text-[10px] text-[#444] mt-1 max-w-xs">{venue.venueFee.notes}</p>}
        </div>
      </div>

      <p className="text-sm text-[#888] leading-relaxed mb-10 max-w-3xl">{venue.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Tech Specs */}
          <section>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-4">Technical Specifications</h2>
            <div className="bg-[#141414] border border-[#252525] rounded-md p-5">
              <TechSpecsPanel specs={venue.technicalSpecs} />
            </div>
          </section>

          {/* Operational photos */}
          {otherPhotos.length > 0 && (
            <section>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-4">Operational Photos</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {venue.photos.map((photo, i) => (
                  <div key={i} className="relative aspect-video rounded-sm overflow-hidden bg-[#1a1a1a]">
                    <Image src={photo.imageUrl} alt={photo.caption} fill className="object-cover" />
                    <div className="absolute bottom-0 left-0 right-0 p-1.5 bg-gradient-to-t from-black/70 to-transparent">
                      <p className="text-[9px] text-[#aaa] capitalize">{photo.category} — {photo.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Load-In */}
          <section className="bg-[#141414] border border-[#252525] rounded-md p-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-4">Load-In & Access</h2>
            <LoadInInfo info={venue.loadInInfo} />
          </section>

          {/* Contact */}
          <section className="bg-[#141414] border border-[#252525] rounded-md p-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Contact</h2>
            <a href={`mailto:${venue.contactEmail}`} className="flex items-center gap-2 text-xs text-[#00d4ff] hover:underline">
              <Mail size={12} /> {venue.contactEmail}
            </a>
          </section>

          {/* Booth photo */}
          {boothPhotos[0] && (
            <div className="relative aspect-video rounded-md overflow-hidden">
              <Image src={boothPhotos[0].imageUrl} alt="Booth" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-2 left-3 text-[10px] text-[#ccc]">Booth Setup</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
