'use client';
import { useState, useMemo } from 'react';
import { useVenues } from '@/hooks/useVenues';
import VenueCard from '@/components/profiles/VenueCard';
import SearchBar from '@/components/filters/SearchBar';

export default function VenuesPage() {
  const { venues } = useVenues();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => venues.filter((v) =>
    !search ||
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.location.city.toLowerCase().includes(search.toLowerCase()) ||
    v.description.toLowerCase().includes(search.toLowerCase())
  ), [venues, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Venues</h1>
        <p className="text-[#555] text-sm">Find clubs and spaces with full technical specifications.</p>
      </div>
      <div className="mb-6">
        <SearchBar value={search} onChange={setSearch} placeholder="Search by name, city..." />
      </div>
      <p className="text-xs text-[#555] mb-6">{filtered.length} venue{filtered.length !== 1 ? 's' : ''}</p>
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#444]"><p className="text-sm">No venues found.</p></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v) => <VenueCard key={v.id} venue={v} />)}
        </div>
      )}
    </div>
  );
}
