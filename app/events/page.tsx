'use client';
import { useState, useMemo } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useVenues } from '@/hooks/useVenues';
import EventCard from '@/components/events/EventCard';
import Link from 'next/link';
import { Plus, Search, X } from 'lucide-react';

const ALL_GENRES = ['140','UKG','Jungle','Industrial','Techno','House','Drum & Bass','Grime','Garage','Afrobeats','Breaks','Electro'];
const STATUSES = ['Open','Shortlisting','Confirmed','Completed'];

export default function EventsPage() {
  const { events, loading } = useEvents();
  const { venues } = useVenues();
  const [search, setSearch] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [status, setStatus] = useState('Open');

  const filtered = useMemo(() => {
    return events
      .filter((e) => {
        const matchSearch = !search || (e.title ?? '').toLowerCase().includes(search.toLowerCase());
        const eGenres: string[] = e.genres ?? [];
        const matchGenre = selectedGenres.length === 0 || selectedGenres.some(g => eGenres.includes(g));
        const matchStatus = !status || e.status === status;
        return matchSearch && matchGenre && matchStatus;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, search, selectedGenres, status]);

  const toggleGenre = (g: string) =>
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const clearAll = () => { setSearch(''); setSelectedGenres([]); setStatus('Open'); };
  const hasFilters = search || selectedGenres.length > 0 || (status && status !== 'Open');

  return (
    <div className="min-h-screen bg-black">
      {/* Header photo strip */}
      <div className="relative h-40 overflow-hidden border-b border-white/5">
        <img src="/images/artists/a3.jpg" alt="" className="w-full h-full object-cover object-[50%_25%]"
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/artists/a2.jpg'; }} />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Hero header */}
      <div className="border-b border-white/5 px-6 pt-10 pb-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="pill mb-4 inline-flex">Bookings Open</span>
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-[0.85] tracking-tighter text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Open Gigs
            </h1>
            <p className="text-white/30 text-sm mt-3">
              {loading ? 'Loading...' : `${filtered.length} event${filtered.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <Link href="/events/new"
            className="flex items-center gap-2 px-6 py-3 bg-[#3d52ff] text-white font-black text-xs uppercase tracking-widest rounded-sm hover:bg-[#5566ff] transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <Plus size={14} /> Post Gig
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-white/5 px-6 py-5 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search events..."
                className="w-full pl-8 pr-4 py-2.5 bg-[#0a0a0a] border border-white/8 rounded-sm text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#3d52ff]/50 transition-colors"
              />
            </div>
            <div className="flex gap-2">
              {STATUSES.map(s => (
                <button key={s} onClick={() => setStatus(status === s ? '' : s)}
                  className={`text-[10px] font-black uppercase tracking-widest px-3 py-2.5 rounded-sm border transition-all ${
                    status === s
                      ? 'bg-[#3d52ff] border-[#3d52ff] text-white'
                      : 'border-white/8 text-white/30 hover:border-white/20 hover:text-white/50'
                  }`}>
                  {s}
                </button>
              ))}
              {hasFilters && (
                <button onClick={clearAll}
                  className="flex items-center gap-1 px-3 border border-white/8 rounded-sm text-xs text-white/40 hover:text-white hover:border-white/20 transition-colors">
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {ALL_GENRES.map(g => (
              <button key={g} onClick={() => toggleGenre(g)}
                className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-sm border transition-all ${
                  selectedGenres.includes(g)
                    ? 'bg-[#3d52ff] border-[#3d52ff] text-white'
                    : 'bg-transparent border-white/10 text-white/30 hover:border-white/30 hover:text-white/60'
                }`}>
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="px-6 py-10 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-sm animate-pulse">
                <div className="aspect-video bg-white/[0.03]" />
                <div className="p-5 space-y-2">
                  <div className="h-4 bg-white/[0.05] rounded-sm w-3/4" />
                  <div className="h-3 bg-white/[0.03] rounded-sm w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-4xl font-black text-white/5 mb-4" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>0</p>
            <p className="text-sm text-white/30">No events match your filters.</p>
            {hasFilters && (
              <button onClick={clearAll} className="mt-4 text-xs text-[#3d52ff] hover:underline">Clear all filters</button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((e) => {
              const venue = venues.find(v => v.id === (e.venue_id ?? e.venueId));
              const venueName = venue?.profile?.display_name ?? venue?.name;
              return <EventCard key={e.id} event={e} venueName={venueName} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
