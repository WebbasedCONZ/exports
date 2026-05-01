'use client';
import { useDjsDjNominations } from '@/hooks/useSocialProof';
import { useAuth } from '@/hooks/useAuth';
import { useArtists } from '@/hooks/useArtists';
import { useState } from 'react';
import { Trophy, Search, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MEDAL = ['🥇', '🥈', '🥉'];
const RANK_ACCENT = ['#ffd700', '#a0a0a0', '#c2410c'];

export default function DjsDjPage() {
  const { leaderboard, nominate, currentMonth } = useDjsDjNominations();
  const { profile } = useAuth();
  const { artists } = useArtists();
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
    <div className="min-h-screen bg-black pt-14">

      {/* Hero banner */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/artists/a5.jpg"
          alt=""
          className="w-full h-64 object-cover object-center opacity-20"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-8 max-w-7xl mx-auto">
          <div className="flex items-end gap-6">
            <Trophy size={40} className="text-[#ffd700] mb-1 flex-shrink-0" />
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2">Community Recognition</p>
              <h1
                className="font-black uppercase tracking-tighter text-white leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem,7vw,5.5rem)' }}
              >
                DJs&apos; DJ
              </h1>
              <p className="text-sm text-white/40 mt-2 font-medium">
                Voted by the scene — {monthLabel}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Leaderboard — left 2/3 */}
        <div className="lg:col-span-2">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25 mb-6 flex items-center gap-2">
            <span className="w-5 h-px bg-[#ffd700]" /> This Month&apos;s Leaderboard
          </p>

          {leaderboard.length === 0 ? (
            <div className="border border-white/[0.06] rounded-sm p-16 text-center">
              <Star size={28} className="mx-auto mb-4 text-white/10" />
              <p className="text-white/30 text-sm font-bold uppercase tracking-widest">No nominations yet</p>
              <p className="text-white/20 text-xs mt-2">Be the first to nominate an emerging artist this month</p>
            </div>
          ) : (
            <div className="space-y-2">
              {leaderboard.map((entry: any, i: number) => {
                const accent = RANK_ACCENT[i] ?? '#3d52ff';
                const initials = entry.artist?.profile?.display_name?.[0] ?? '?';
                return (
                  <Link
                    key={entry.artist?.id}
                    href={`/artists/${entry.artist?.profile?.slug}`}
                    className="group flex items-center gap-5 p-5 border rounded-sm transition-all hover:border-white/20"
                    style={{
                      borderColor: i < 3 ? `${accent}30` : 'rgba(255,255,255,0.05)',
                      backgroundColor: i < 3 ? `${accent}08` : 'transparent',
                    }}
                  >
                    {/* Rank */}
                    <div className="w-10 text-center flex-shrink-0">
                      {i < 3 ? (
                        <span className="text-2xl">{MEDAL[i]}</span>
                      ) : (
                        <span className="text-sm font-black text-white/20">#{i + 1}</span>
                      )}
                    </div>

                    {/* Avatar */}
                    <div
                      className="w-12 h-12 rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center text-sm font-black"
                      style={{ backgroundColor: `${accent}20`, color: accent }}
                    >
                      {entry.artist?.profile?.profile_photo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={entry.artist.profile.profile_photo}
                          alt=""
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      ) : initials}
                    </div>

                    {/* Name + city */}
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm uppercase tracking-tight text-white group-hover:text-[#ffd700] transition-colors truncate"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {entry.artist?.profile?.display_name}
                      </p>
                      {entry.artist?.city && (
                        <p className="text-xs text-white/25 mt-0.5">{entry.artist.city}</p>
                      )}
                    </div>

                    {/* Nomination count */}
                    <div className="text-right flex-shrink-0 flex items-center gap-3">
                      <div>
                        <p className="text-xl font-black" style={{ color: accent }}>{entry.count}</p>
                        <p className="text-[9px] font-bold uppercase tracking-widest text-white/20">
                          nom{entry.count !== 1 ? 's' : ''}
                        </p>
                      </div>
                      <ArrowRight size={14} className="text-white/10 group-hover:text-white/40 transition-colors" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Nominate panel — right 1/3 */}
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25 mb-6 flex items-center gap-2">
            <span className="w-5 h-px bg-[#3d52ff]" /> Cast Your Vote
          </p>

          <div className="border border-white/[0.06] rounded-sm p-6 bg-[#0a0a0a]">
            {/* Rules */}
            <div className="space-y-3 mb-6 pb-6 border-b border-white/[0.06]">
              {[
                'One nomination per month',
                'Only established artists can nominate',
                'Winners get boosted in search ranking',
              ].map((rule) => (
                <div key={rule} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#3d52ff] mt-1.5 flex-shrink-0" />
                  <p className="text-xs text-white/30">{rule}</p>
                </div>
              ))}
            </div>

            {!profile ? (
              <Link href="/auth/login"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#3d52ff] text-white text-xs font-black uppercase tracking-widest rounded-sm hover:bg-[#5566ff] transition-colors">
                Sign In to Vote <ArrowRight size={12} />
              </Link>
            ) : !myArtist ? (
              <p className="text-sm text-white/30 text-center py-4">Only registered artists can nominate.</p>
            ) : nominated ? (
              <div className="text-center py-4">
                <Star size={24} className="mx-auto mb-3 text-[#ffd700]" fill="#ffd700" />
                <p className="text-sm font-black uppercase tracking-widest text-white">Nomination sent!</p>
                <p className="text-xs text-white/30 mt-1">{monthLabel}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 block">
                  Search Artists
                </label>
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Artist name..."
                    className="w-full pl-8 pr-3 py-2.5 bg-black border border-white/10 rounded-sm text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#3d52ff] transition-colors"
                  />
                </div>
                {query && (
                  <div className="border border-white/[0.06] rounded-sm overflow-hidden max-h-56 overflow-y-auto bg-black">
                    {filtered.slice(0, 8).map((a: any) => (
                      <button key={a.id} onClick={() => handleNominate(a.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/[0.04] transition-colors text-left border-b border-white/[0.04] last:border-0">
                        <div className="w-8 h-8 rounded-sm bg-white/5 overflow-hidden flex-shrink-0 flex items-center justify-center text-xs font-black text-white/30">
                          {a.profile?.display_name?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{a.profile?.display_name}</p>
                          {a.city && <p className="text-xs text-white/30">{a.city}</p>}
                        </div>
                      </button>
                    ))}
                    {filtered.length === 0 && (
                      <p className="text-xs text-white/25 px-4 py-4">No artists found</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* What it means */}
          <div className="mt-6 p-5 border border-[#ffd700]/10 rounded-sm bg-[#ffd700]/[0.02]">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={13} className="text-[#ffd700]" />
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd700]/60">What it means</p>
            </div>
            <p className="text-xs text-white/25 leading-relaxed">
              The DJs&apos; DJ award is peer recognition from within the scene — not fans, not promoters, but fellow artists who know what it takes. Winners get boosted search visibility for the following month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
