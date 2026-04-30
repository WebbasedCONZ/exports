'use client';
import { useState, useMemo } from 'react';
import { useArtists } from '@/hooks/useArtists';
import ArtistCard from '@/components/profiles/ArtistCard';
import GenreFilterBar from '@/components/filters/GenreFilterBar';
import SearchBar from '@/components/filters/SearchBar';
import Skeleton from '@/components/ui/Skeleton';
import type { Genre } from '@/types';

export default function ArtistsPage() {
  const { artists } = useArtists();
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [experience, setExperience] = useState('');

  const filtered = useMemo(() => {
    return artists.filter((a) => {
      const matchSearch = !search || a.displayName.toLowerCase().includes(search.toLowerCase()) || a.bio.toLowerCase().includes(search.toLowerCase()) || a.location.city.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genres.length === 0 || genres.some((g) => a.genres.includes(g));
      const matchExp = !experience || a.experienceLevel === experience;
      return matchSearch && matchGenre && matchExp;
    });
  }, [artists, search, genres, experience]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Artists</h1>
        <p className="text-[#555] text-sm">Find DJs and selectors across Aotearoa and beyond.</p>
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by name, city, bio..." />
          </div>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="bg-[#141414] border border-[#252525] rounded-sm px-3 py-2 text-sm text-[#888] focus:outline-none focus:border-[#3a3a3a]"
          >
            <option value="">All levels</option>
            {['Emerging', 'Mid-level', 'Established', 'Headliner'].map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <GenreFilterBar selected={genres} onChange={setGenres} />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-xs text-[#555]">{filtered.length} artist{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Grid */}
      {artists.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-[#141414] border border-[#252525] rounded-md overflow-hidden">
              <Skeleton className="aspect-[4/3] w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-[#444]">
          <p className="text-sm">No artists match your filters.</p>
          <button onClick={() => { setSearch(''); setGenres([]); setExperience(''); }} className="mt-3 text-xs text-[#c6ff00] hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
        </div>
      )}
    </div>
  );
}
