'use client';
import { useState, useMemo } from 'react';
import { usePromoters } from '@/hooks/usePromoters';
import PromoterCard from '@/components/profiles/PromoterCard';
import { Search, ShieldCheck, X } from 'lucide-react';

const ALL_GENRES = ['140','UKG','Jungle','Industrial','Techno','House','Drum & Bass','Grime','Garage','Afrobeats','Breaks','Electro'];

export default function PromotersPage() {
  const { promoters, loading } = usePromoters();
  const [search, setSearch] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [trustedOnly, setTrustedOnly] = useState(false);

  const filtered = useMemo(() => {
    return promoters.filter((p) => {
      const name = (p.profile?.display_name ?? '').toLowerCase();
      const city = (p.city ?? '').toLowerCase();
      const q = search.toLowerCase();
      const matchSearch = !search || name.includes(q) || city.includes(q);
      const pGenres: string[] = p.preferred_genres ?? [];
      const matchGenre = selectedGenres.length === 0 || selectedGenres.some(g => pGenres.includes(g));
      const matchTrusted = !trustedOnly || p.trusted_partner;
      return matchSearch && matchGenre && matchTrusted;
    });
  }, [promoters, search, selectedGenres, trustedOnly]);

  const toggleGenre = (g: string) =>
    setSelectedGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const clearAll = () => { setSearch(''); setSelectedGenres([]); setTrustedOnly(false); };
  const hasFilters = search || selectedGenres.length > 0 || trustedOnly;

  return (
    <div className="min-h-screen bg-black">
      {/* Header photo strip */}
      <div className="relative h-40 overflow-hidden border-b border-white/5">
        <img src="/images/dj.jpg" alt="" className="w-full h-full object-cover object-[50%_40%]"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1574068468686-94e0c68a3e35?auto=format&fit=crop&w=1400&q=80'; }} />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* Hero header */}
      <div className="border-b border-white/5 px-6 pt-10 pb-10 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="pill mb-4 inline-flex">Collectives & Brands</span>
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase leading-[0.85] tracking-tighter text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Promoters
            </h1>
            <p className="text-white/30 text-sm mt-3">
              {loading ? 'Loading...' : `${filtered.length} active collective${filtered.length !== 1 ? 's' : ''}`}
            </p>
          </div>
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
                placeholder="Search by name or city..."
                className="w-full pl-8 pr-4 py-2.5 bg-[#0a0a0a] border border-white/8 rounded-sm text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-[#3d52ff]/50 transition-colors"
              />
            </div>
            <button
              onClick={() => setTrustedOnly(!trustedOnly)}
              className={`flex items-center gap-2 px-4 py-2.5 border rounded-sm text-xs font-bold uppercase tracking-widest transition-all ${
                trustedOnly
                  ? 'border-[#ffd700]/40 bg-[#ffd700]/10 text-[#ffd700]'
                  : 'border-white/8 text-white/30 hover:border-white/20 hover:text-white/50'
              }`}
            >
              <ShieldCheck size={13} /> Trusted
            </button>
            {hasFilters && (
              <button onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-2.5 border border-white/8 rounded-sm text-xs text-white/40 hover:text-white hover:border-white/20 transition-colors">
                <X size={12} /> Clear
              </button>
            )}
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
            <p className="text-sm text-white/30">No promoters match your filters.</p>
            {hasFilters && (
              <button onClick={clearAll} className="mt-4 text-xs text-[#3d52ff] hover:underline">Clear all filters</button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(p => <PromoterCard key={p.id} promoter={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
