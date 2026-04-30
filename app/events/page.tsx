'use client';
import { useState, useMemo } from 'react';
import { useEvents } from '@/hooks/useEvents';
import { useVenues } from '@/hooks/useVenues';
import EventCard from '@/components/events/EventCard';
import GenreFilterBar from '@/components/filters/GenreFilterBar';
import SearchBar from '@/components/filters/SearchBar';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import type { Genre } from '@/types';

export default function EventsPage() {
  const { events } = useEvents();
  const { venues } = useVenues();
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [status, setStatus] = useState('Open');

  const filtered = useMemo(() => {
    return events
      .filter((e) => {
        const matchSearch = !search || e.title.toLowerCase().includes(search.toLowerCase());
        const matchGenre = genres.length === 0 || genres.some((g) => e.genres.includes(g));
        const matchStatus = !status || e.status === status;
        return matchSearch && matchGenre && matchStatus;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, search, genres, status]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Open Gigs</h1>
          <p className="text-[#555] text-sm">Find and apply for upcoming events.</p>
        </div>
        <Link
          href="/events/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#c6ff00] text-black text-sm font-semibold rounded-sm hover:bg-[#b5ee00] transition-colors"
        >
          <Plus size={15} /> Post Gig
        </Link>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Search events..." />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-[#141414] border border-[#252525] rounded-sm px-3 py-2 text-sm text-[#888] focus:outline-none"
          >
            <option value="">All statuses</option>
            {['Open', 'Shortlisting', 'Confirmed', 'Completed'].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <GenreFilterBar selected={genres} onChange={setGenres} />
      </div>

      <p className="text-xs text-[#555] mb-6">{filtered.length} event{filtered.length !== 1 ? 's' : ''}</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#444]">
          <p className="text-sm">No events match your filters.</p>
          <button onClick={() => { setSearch(''); setGenres([]); setStatus(''); }} className="mt-3 text-xs text-[#c6ff00] hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((e) => {
            const venue = venues.find((v) => v.id === e.venueId);
            return <EventCard key={e.id} event={e} venueName={venue?.name} />;
          })}
        </div>
      )}
    </div>
  );
}
