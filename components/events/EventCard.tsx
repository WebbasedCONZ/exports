import Link from 'next/link';
import Image from 'next/image';
import GenreTagList from '@/components/profiles/GenreTagList';
import { Calendar, MapPin, EyeOff } from 'lucide-react';
import type { Event } from '@/types';
import { formatDate, statusColor, daysUntil } from '@/lib/utils';

export default function EventCard({ event, venueName }: { event: Event; venueName?: string }) {
  const days = daysUntil(event.date);
  const sColor = statusColor(event.status);

  return (
    <Link href={`/events/${event.slug}`} className="block group">
      <div className="bg-[#141414] border border-[#252525] rounded-md overflow-hidden transition-all duration-200 hover:border-[#3a3a3a] hover:bg-[#1a1a1a]">
        <div className="aspect-video relative overflow-hidden bg-[#1a1a1a]">
          <Image src={event.posterImageUrl} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute top-3 right-3 flex items-center gap-2">
            {event.blindApplications && (
              <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-black/60 rounded-sm text-[#888] border border-[#333]">
                <EyeOff size={9} /> Blind
              </span>
            )}
            <span
              className="text-[10px] px-2 py-0.5 rounded-sm font-medium border"
              style={{ color: sColor, borderColor: `${sColor}40`, backgroundColor: `${sColor}12` }}
            >
              {event.status}
            </span>
          </div>
          <div className="absolute bottom-3 left-3">
            <GenreTagList genres={event.genres.slice(0, 3)} size="sm" />
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-bold text-sm mb-2 leading-tight">{event.title}</h3>
          <div className="flex items-center gap-3 text-xs text-[#555] mb-3">
            <span className="flex items-center gap-1"><Calendar size={11} />{formatDate(event.date)}</span>
            {venueName && <span className="flex items-center gap-1"><MapPin size={11} />{venueName}</span>}
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#555]">{event.slots.length} slot{event.slots.length !== 1 ? 's' : ''}</span>
            {days > 0 && (
              <span className={days < 14 ? 'text-[#ffd700]' : 'text-[#555]'}>
                {days}d to apply
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
