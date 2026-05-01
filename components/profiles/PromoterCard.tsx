import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';

const PROMOTER_PHOTOS = [
  'photo-1516450360452-9312f5e86fc7', // concert crowd
  'photo-1540575467063-178a50c2df87', // festival lights
  'photo-1571266028243-e4733b0f0bb0', // outdoor festival
  'photo-1598300042247-d088f8ab3a91', // dark club interior
  'photo-1459749411175-04bf5292ceea', // stage lights
  'photo-1524368535928-5b5e00ddc76b', // DJ crowd
];

function getFallbackPhoto(id: string): string {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const photoId = PROMOTER_PHOTOS[hash % PROMOTER_PHOTOS.length];
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=600&q=80`;
}

const GENRE_COLORS: Record<string, string> = {
  'Techno': '#1d4ed8', 'House': '#b45309', 'Jungle': '#c2410c',
  'Drum & Bass': '#065f46', 'UKG': '#0d9488', '140': '#7c3aed',
  'Grime': '#be123c', 'Garage': '#0369a1', 'Afrobeats': '#d97706',
  'Breaks': '#7e22ce', 'Industrial': '#6b21a8', 'Electro': '#1e40af',
};

export default function PromoterCard({ promoter }: { promoter: any }) {
  const name = promoter.profile?.display_name ?? 'Unknown Promoter';
  const slug = promoter.profile?.slug ?? promoter.id;
  const photo = promoter.profile?.profile_photo;
  const genres: string[] = promoter.preferred_genres ?? [];
  const city = promoter.city ?? '';

  return (
    <Link href={`/promoters/${slug}`} className="brutal-card block group">
      <div className="bg-[#0a0a0a] border border-white/8 rounded-sm overflow-hidden">
        {/* Image */}
        <div className="aspect-video relative overflow-hidden bg-[#111]">
          <Image
            src={photo ?? getFallbackPhoto(promoter.id)}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Trusted badge */}
          {promoter.trusted_partner && (
            <div className="absolute top-3 left-3">
              <span className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest px-2 py-1 bg-[#ffd700]/20 border border-[#ffd700]/40 text-[#ffd700] rounded-sm">
                <ShieldCheck size={9} />
                Trusted
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

          <div className="flex items-center gap-4 text-[11px] text-white/30 mb-3">
            {city && (
              <span className="flex items-center gap-1"><MapPin size={10} />{city}</span>
            )}
            {promoter.total_events_hosted > 0 && (
              <span className="flex items-center gap-1"><Calendar size={10} />{promoter.total_events_hosted} events</span>
            )}
          </div>

          {promoter.bio && (
            <p className="text-xs text-white/30 line-clamp-2 leading-relaxed mb-4">{promoter.bio}</p>
          )}

          {genres.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-3 border-t border-white/5">
              {genres.slice(0, 3).map((g: string) => (
                <span key={g} className="text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm text-white"
                  style={{ background: GENRE_COLORS[g] ?? '#3d52ff' }}>
                  {g}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
