'use client';
import { useState, useMemo } from 'react';
import { useArtists } from '@/hooks/useArtists';
import ArtistCard from '@/components/profiles/ArtistCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const ALL_GENRES = ['140','UKG','Jungle','Industrial','Techno','House','Drum & Bass','Grime','Garage','Afrobeats','Breaks','Electro'];
const EXPERIENCE_LEVELS = ['Emerging','Mid-level','Established','Headliner'];

export default function ArtistsPage() {
  const { artists, loading } = useArtists();
  const [search, setSearch] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [experience, setExperience] = useState('');

  const filtered = useMemo(() => {
    return artists.filter((a) => {
      const name = (a.profile?.display_name ?? '').toLowerCase();
      const bio = (a.bio ?? '').toLowerCase();
      const city = (a.city ?? '').toLowerCase();
      const q = search.toLowerCase();
      const matchSearch = !search || name.includes(q) || bio.includes(q) || city.includes(q);
      const aGenres: string[] = a.genres ?? [];
      const matchGenre = selectedGenres.length === 0 || selectedGenres.some(g => aGenres.includes(g));
      const matchExp = !experience || a.experience_level === experience;
      return matchSearch && matchGenre && matchExp;
    });
  }, [artists, search, selectedGenres, experience]);

  const toggleGenre = (g: string) =>
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const clearAll = () => { setSearch(''); setSelectedGenres([]); setExperience(''); };
  const hasFilters = search || selectedGenres.length > 0 || experience;

  return (
    <div className="min-h-screen bg-black">
      {/* Header photo strip */}
      <div className="relative h-40 overflow-hidden border-b border-white/5">
        <img src="/images/hero.jpg" alt="" className="w-full h-full object-cover object-[50%_35%]"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80'; }} />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Hero header */}
      <div className="border-b border-white/5 px-6 pt-10 pb-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="pill mb-4 inline-flex">Aotearoa NZ</span>
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-[0.85] tracking-tighter text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Artists
            </h1>
            <p className="text-white/30 text-sm mt-3">
              {loading ? 'Loading...' : `${filtered.length} DJ${filtered.length !== 1 ? 's' : ''} & selectors`}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-white/5 px-6 py-5 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          {/* Search + experience */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, city, bio..."
                className="w-full pl-8 pr-4 py-2.5 bg-[#0a0a0a] border border-white/8 rounded-sm text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#3d52ff]/50 transition-colors"
              />
            </div>
            <select
              value={experience}
              onChange={e => setExperience(e.target.value)}
              className="bg-[#0a0a0a] border border-white/8 rounded-sm px-3 py-2.5 text-sm text-white/40 focus:outline-none focus:border-[#3d52ff]/50 transition-colors"
            >
              <option value="">All levels</option>
              {EXPERIENCE_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            {hasFilters && (
              <button onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-2.5 border border-white/8 rounded-sm text-xs text-white/40 hover:text-white hover:border-white/20 transition-colors">
                <X size={12} /> Clear
              </button>
            )}
          </div>

          {/* Genre pills */}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-white/5 rounded-sm animate-pulse">
                <div className="aspect-[4/3] bg-white/[0.03]" />
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
            <p className="text-sm text-white/30">No artists match your filters.</p>
            {hasFilters && (
              <button onClick={clearAll} className="mt-4 text-xs text-[#3d52ff] hover:underline">Clear all filters</button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(artist => <ArtistCard key={artist.id} artist={artist} />)}
          </div>
        )}
      </div>
    </div>
  );
}
