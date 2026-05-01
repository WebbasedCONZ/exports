'use client';
import { useDjsDjNominations } from '@/hooks/useSocialProof';
import { useAuth } from '@/hooks/useAuth';
import { useArtists } from '@/hooks/useArtists';
import { useState } from 'react';
import { Star, Trophy, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DjsDjPage() {
  const { leaderboard, nominate, currentMonth } = useDjsDjNominations();
  const { profile } = useAuth();
  const { artists } = useArtists();
  const [search, setSearch] = useState('');
  const [nominated, setNominated] = useState(false);
  const [query, setQuery] = useState('');

  const monthLabel = new Date(currentMonth + '-01').toLocaleString('default', { month: 'long', year: 'numeric' });

  const myArtist = artists.find((a: any) => a.profile_id === profile?.id);

  const filtered = artists.filter((a: any) =>
    a.profile?.display_name?.toLowerCase().includes(query.toLowerCase()) &&
    a.profile_id !== profile?.id
  );

  async function handleNominate(nomineeId: string) {
    if (!myArtist) return;
    await nominate(myArtist.id, nomineeId);
    setNominated(true);
    setQuery('');
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center mb-3">
          <div className="w-14 h-14 rounded-full bg-[#ffd700]/10 border border-[#ffd700]/30 flex items-center justify-center">
            <Trophy size={24} className="text-[#ffd700]" />
          </div>
        </div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>DJs' DJ</h1>
        <p className="text-[#555] text-sm mt-2">Monthly peer recognition — voted by the scene, for the scene</p>
        <p className="text-xs text-[#444] mt-1">{monthLabel}</p>
      </div>

      {/* Leaderboard */}
      <section className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-4">This Month's Leaderboard</h2>
        {leaderboard.length === 0 ? (
          <div className="text-center py-12 text-[#444]">
            <Star size={24} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">No nominations yet this month</p>
            <p className="text-xs mt-1">Be the first to nominate an emerging artist</p>
          </div>
        ) : (
          <div className="space-y-3">
            {leaderboard.map((entry: any, i: number) => (
              <div key={entry.artist?.id} className={`flex items-center gap-4 p-4 rounded-md border transition-colors ${
                i === 0 ? 'bg-[#ffd700]/5 border-[#ffd700]/30' :
                i === 1 ? 'bg-[#888]/5 border-[#888]/20' :
                i === 2 ? 'bg-[#c2410c]/5 border-[#c2410c]/20' :
                'bg-[#141414] border-[#252525]'
              }`}>
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  i === 0 ? 'text-[#ffd700]' : i === 1 ? 'text-[#888]' : i === 2 ? 'text-[#c2410c]' : 'text-[#444]'
                }`}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                </div>
                <div className="w-10 h-10 rounded-full overflow-hidden bg-[#252525] flex-shrink-0">
                  {entry.artist?.profile?.profile_photo ? (
                    <Image src={entry.artist.profile.profile_photo} alt="" width={40} height={40} className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#555] font-bold">
                      {entry.artist?.profile?.display_name?.[0]}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <Link href={`/artists/${entry.artist?.profile?.slug}`}
                    className="font-semibold text-sm hover:text-[#3d52ff] transition-colors">
                    {entry.artist?.profile?.display_name}
                  </Link>
                  <p className="text-xs text-[#555]">{entry.artist?.profile?.location_city}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-[#ffd700]">{entry.count}</p>
                  <p className="text-[10px] text-[#555]">nomination{entry.count !== 1 ? 's' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Nominate */}
      <section className="bg-[#141414] border border-[#252525] rounded-md p-6">
        <h2 className="text-sm font-semibold mb-1">Nominate an Artist</h2>
        <p className="text-xs text-[#555] mb-4">You can nominate one artist per month. Only established artists (3+ gigs) can nominate.</p>

        {!profile ? (
          <Link href="/auth/login" className="text-sm text-[#3d52ff] hover:underline">Sign in to nominate →</Link>
        ) : !myArtist ? (
          <p className="text-sm text-[#555]">Only artists can submit nominations.</p>
        ) : nominated ? (
          <div className="flex items-center gap-2 text-sm text-[#3d52ff]">
            <Star size={14} fill="currentColor" /> Nomination submitted for {monthLabel}!
          </div>
        ) : (
          <div className="space-y-3">
            <div className="relative">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444]" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search artists..."
                className="w-full pl-8 pr-3 py-2 bg-[#1a1a1a] border border-[#252525] rounded-sm text-sm text-[#ededed] focus:outline-none focus:border-[#3d52ff]"
              />
            </div>
            {query && (
              <div className="bg-[#1a1a1a] border border-[#252525] rounded-sm overflow-hidden max-h-48 overflow-y-auto">
                {filtered.slice(0, 8).map((a: any) => (
                  <button key={a.id} onClick={() => handleNominate(a.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#252525] transition-colors text-left">
                    <div className="w-7 h-7 rounded-full bg-[#252525] overflow-hidden flex-shrink-0">
                      {a.profile?.profile_photo
                        ? <Image src={a.profile.profile_photo} alt="" width={28} height={28} className="object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-xs text-[#555]">{a.profile?.display_name?.[0]}</div>
                      }
                    </div>
                    <div>
                      <p className="text-sm text-[#ededed]">{a.profile?.display_name}</p>
                      <p className="text-xs text-[#555]">{a.profile?.location_city}</p>
                    </div>
                  </button>
                ))}
                {filtered.length === 0 && (
                  <p className="text-xs text-[#555] px-3 py-3">No artists found</p>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
