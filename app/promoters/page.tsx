'use client';
import { useState, useMemo } from 'react';
import { usePromoters } from '@/hooks/usePromoters';
import PromoterCard from '@/components/profiles/PromoterCard';
import SearchBar from '@/components/filters/SearchBar';
import GenreFilterBar from '@/components/filters/GenreFilterBar';
import { ShieldCheck } from 'lucide-react';
import type { Genre } from '@/types';

export default function PromotersPage() {
  const { promoters } = usePromoters();
  const [search, setSearch] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [trustedOnly, setTrustedOnly] = useState(false);

  const filtered = useMemo(() => {
    return promoters.filter((p) => {
      const matchSearch = !search || p.displayName.toLowerCase().includes(search.toLowerCase()) || p.location.city.toLowerCase().includes(search.toLowerCase());
      const matchGenre = genres.length === 0 || genres.some((g) => p.preferences.preferredGenres.includes(g));
      const matchTrusted = !trustedOnly || p.trustedPartner;
      return matchSearch && matchGenre && matchTrusted;
    });
  }, [promoters, search, genres, trustedOnly]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Promoters</h1>
        <p className="text-[#555] text-sm">Collectives and event brands looking for talent.</p>
      </div>

      <div className="space-y-3 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by name or city..." />
          </div>
          <button
            onClick={() => setTrustedOnly(!trustedOnly)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-sm text-sm transition-all ${
              trustedOnly
                ? 'border-[#ffd700]/40 bg-[#ffd700]/10 text-[#ffd700]'
                : 'border-[#252525] text-[#555] hover:border-[#333]'
            }`}
          >
            <ShieldCheck size={14} />
            Trusted Partner
          </button>
        </div>
        <GenreFilterBar selected={genres} onChange={setGenres} />
      </div>

      <p className="text-xs text-[#555] mb-6">{filtered.length} promoter{filtered.length !== 1 ? 's' : ''}</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-[#444]">
          <p className="text-sm">No promoters match your filters.</p>
          <button onClick={() => { setSearch(''); setGenres([]); setTrustedOnly(false); }} className="mt-3 text-xs text-[#c6ff00] hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => <PromoterCard key={p.id} promoter={p} />)}
        </div>
      )}
    </div>
  );
}
