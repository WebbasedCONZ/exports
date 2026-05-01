'use client';
import { useState, useMemo } from 'react';
import { useVenues } from '@/hooks/useVenues';
import VenueCard from '@/components/profiles/VenueCard';
import { Search, X } from 'lucide-react';

export default function VenuesPage() {
  const { venues, loading } = useVenues();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => venues.filter((v) => {
    const name = (v.profile?.display_name ?? v.name ?? '').toLowerCase();
    const city = (v.city ?? '').toLowerCase();
    const desc = (v.description ?? '').toLowerCase();
    const q = search.toLowerCase();
    return !search || name.includes(q) || city.includes(q) || desc.includes(q);
  }), [venues, search]);

  return (
    <div className="min-h-screen bg-black">
      {/* Hero header */}
      <div className="border-b border-white/5 px-6 pt-24 pb-10 max-w-7xl mx-auto">
        <span className="pill mb-4 inline-flex">Clubs & Spaces</span>
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-[0.85] tracking-tighter text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          Venues
        </h1>
        <p className="text-white/30 text-sm mt-3">
          {loading ? 'Loading...' : `${filtered.length} venue${filtered.length !== 1 ? 's' : ''} with full tech specs`}
        </p>
      </div>

      {/* Search */}
      <div className="border-b border-white/5 px-6 py-5 max-w-7xl mx-auto">
        <div className="flex gap-3">
          <div className="relative flex-1 max-w-md">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or city..."
              className="w-full pl-8 pr-4 py-2.5 bg-[#0a0a0a] border border-white/8 rounded-sm text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#3d52ff]/50 transition-colors"
            />
          </div>
          {search && (
            <button onClick={() => setSearch('')}
              className="flex items-center gap-1.5 px-3 py-2.5 border border-white/8 rounded-sm text-xs text-white/40 hover:text-white hover:border-white/20 transition-colors">
              <X size={12} /> Clear
            </button>
          )}
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
            <p className="text-sm text-white/30">No venues found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(v => <VenueCard key={v.id} venue={v} />)}
          </div>
        )}
      </div>
    </div>
  );
}
