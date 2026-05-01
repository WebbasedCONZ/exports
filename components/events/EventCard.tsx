import Link from 'next/link';
import { Calendar, MapPin, EyeOff, ArrowRight } from 'lucide-react';
import { formatDate, statusColor, daysUntil } from '@/lib/utils';

const EVENT_PHOTOS = [
  '/images/artists/a3.jpg',
  '/images/artists/a7.jpg',
  '/images/artists/a2.jpg',
  '/images/artists/a5.jpg',
  '/images/artists/a1.jpg',
  '/images/artists/a6.jpg',
  '/images/artists/a4.jpg',
  '/images/artists/a8.jpg',
];

function getFallbackPhoto(id: string): string {
  const hash = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return EVENT_PHOTOS[hash % EVENT_PHOTOS.length];
}

const GENRE_COLORS: Record<string, string> = {
  'Techno': '#1d4ed8', 'House': '#b45309', 'Jungle': '#c2410c',
  'Drum & Bass': '#065f46', 'UKG': '#0d9488', '140': '#7c3aed',
  'Grime': '#be123c', 'Garage': '#0369a1', 'Afrobeats': '#d97706',
  'Breaks': '#7e22ce', 'Industrial': '#6b21a8', 'Electro': '#1e40af',
};

export default function EventCard({ event, venueName }: { event: any; venueName?: string }) {
  const days = daysUntil(event.date);
  const sColor = statusColor(event.status);
  const genres: string[] = event.genres ?? [];
  const slots: any[] = event.slots ?? [];
  const poster = getFallbackPhoto(event.id);

  return (
    <Link href={`/events/${event.slug}`} className="brutal-card block group">
      <div className="bg-[#0a0a0a] border border-white/8 rounded-sm overflow-hidden">
        <div className="aspect-video relative overflow-hidden bg-[#111]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 absolute inset-0"
            onError={(e) => { (e.target as HTMLImageElement).src = '/images/artists/a3.jpg'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

          <div className="absolute top-3 right-3 flex items-center gap-2">
            {(event.blind_applications ?? event.blindApplications) && (
              <span className="flex items-center gap-1 text-[9px] px-2 py-0.5 bg-black/70 rounded-sm text-white/40 border border-white/10">
                <EyeOff size={8} /> Blind
              </span>
            )}
            <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm border"
              style={{ color: sColor, borderColor: `${sColor}40`, backgroundColor: `${sColor}15` }}>
              {event.status}
            </span>
          </div>

          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
            {genres.slice(0, 2).map((g: string) => (
              <span key={g} className="text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm text-white"
                style={{ background: GENRE_COLORS[g] ?? '#3d52ff' }}>
                {g}
              </span>
            ))}
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2 mb-3">
            <h3 className="font-black text-sm uppercase tracking-tight text-white leading-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {event.title}
            </h3>
            <ArrowRight size={13} className="text-white/20 group-hover:text-[#3d52ff] group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
          </div>

          <div className="flex items-center gap-4 text-[11px] text-white/30 mb-4">
            <span className="flex items-center gap-1"><Calendar size={10} />{formatDate(event.date)}</span>
            {venueName && <span className="flex items-center gap-1"><MapPin size={10} />{venueName}</span>}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/5 text-[11px]">
            <span className="text-white/25">{slots.length} slot{slots.length !== 1 ? 's' : ''}</span>
            {days > 0 ? (
              <span className={`font-bold ${days < 7 ? 'text-[#ff3333]' : days < 14 ? 'text-[#ffd700]' : 'text-white/30'}`}>
                {days}d left
              </span>
            ) : days === 0 ? (
              <span className="text-[#ff3333] font-bold">Today</span>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
}
