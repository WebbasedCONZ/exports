'use client';
import { useDjsDjNominations } from '@/hooks/useSocialProof';
import { useAuth } from '@/hooks/useAuth';
import { useArtists } from '@/hooks/useArtists';
import { useState } from 'react';
import { Trophy, Search, Star, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

const MEDAL = ['🥇', '🥈', '🥉'];
const RANK_BG = ['bg-[#ffd700]/10 border-[#ffd700]/30', 'bg-white/[0.04] border-white/10', 'bg-white/[0.04] border-white/10'];
const RANK_NAME_COLOR = ['text-[#ffd700]', 'text-white', 'text-white'];

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

      {/* Hero — full bleed photo with strong overlay */}
      <div className="relative h-72 sm:h-80 overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/artists/a7.jpg"
          alt=""
          className="w-full h-full object-cover object-top"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Blue tint overlay */}
        <div className="absolute inset-0 bg-[#3d52ff]/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black" />

        {/* Hero text */}
        <div className="absolute inset-0 flex flex-col justify-end px-6 sm:px-10 pb-8 max-w-7xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/50 mb-2">Community Recognition · {monthLabel}</p>
          <h1
            className="font-black uppercase tracking-tighter text-white leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(3rem, 9vw, 7rem)' }}
          >
            DJs&apos; DJ
          </h1>
          <p className="text-white/60 text-sm mt-3 font-medium max-w-sm">
            Peer recognition voted by the scene, for the scene — not fans, not labels.
          </p>
        </div>

        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#ffd700]/60 via-[#ffd700]/20 to-transparent" />
      </div>

      {/* Body */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* Leaderboard */}
        <div className="lg:col-span-2 space-y-3">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/25 mb-6">
            This Month&apos;s Leaderboard
          </p>

          {leaderboard.length === 0 ? (
            <div className="border border-white/[0.08] rounded-sm p-14 text-center bg-white/[0.02]">
              <Trophy size={32} className="mx-auto mb-4 text-[#ffd700]/30" />
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest">No nominations yet</p>
              <p className="text-white/20 text-xs mt-2">Be the first to nominate an emerging artist this month</p>
            </div>
          ) : (
            leaderboard.map((entry: any, i: number) => (
              <Link
                key={entry.artist?.id}
                href={`/artists/${entry.artist?.profile?.slug}`}
                className={`group flex items-center gap-4 sm:gap-6 p-4 sm:p-5 border rounded-sm transition-all hover:brightness-110 ${
                  i < 3 ? RANK_BG[i] : 'bg-white/[0.02] border-white/[0.05]'
                }`}
              >
                {/* Medal / rank */}
                <div className="w-10 text-center flex-shrink-0">
                  {i < 3
                    ? <span className="text-2xl">{MEDAL[i]}</span>
                    : <span className="text-xs font-black text-white/20">#{i + 1}</span>
                  }
                </div>

                {/* Avatar initials */}
                <div className={`w-11 h-11 rounded-sm flex-shrink-0 flex items-center justify-center text-sm font-black ${
                  i === 0 ? 'bg-[#ffd700]/20 text-[#ffd700]' : 'bg-white/5 text-white/30'
                }`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {entry.artist?.profile?.display_name?.[0] ?? '?'}
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className={`font-black text-sm uppercase tracking-tight truncate ${
                    i < 3 ? RANK_NAME_COLOR[i] : 'text-white/70'
                  } group-hover:text-white transition-colors`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {entry.artist?.profile?.display_name}
                  </p>
                  {entry.artist?.city && (
                    <p className="text-[11px] text-white/30 mt-0.5">{entry.artist.city}</p>
                  )}
                </div>

                {/* Count */}
                <div className="text-right flex-shrink-0 flex items-center gap-4">
                  <div>
                    <p className={`text-2xl font-black leading-none ${i === 0 ? 'text-[#ffd700]' : 'text-white/60'}`}>
                      {entry.count}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest text-white/20 mt-0.5">
                      nom{entry.count !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <ArrowRight size={14} className="text-white/10 group-hover:text-white/50 transition-colors" />
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Vote CTA box */}
          <div className="bg-[#3d52ff] rounded-sm p-6">
            <div className="flex items-center gap-2 mb-3">
              <Star size={14} className="text-white" fill="white" />
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/70">Cast Your Vote</p>
            </div>

            {!profile ? (
              <>
                <p className="text-white text-sm font-bold mb-4 leading-relaxed">
                  Sign in to nominate an artist you rate from the scene.
                </p>
                <Link href="/auth/login"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-white text-[#3d52ff] text-xs font-black uppercase tracking-widest rounded-sm hover:bg-white/90 transition-colors">
                  Sign In to Vote <ArrowRight size={12} />
                </Link>
              </>
            ) : !myArtist ? (
              <p className="text-white/60 text-sm">Only registered artists can nominate.</p>
            ) : nominated ? (
              <div className="text-center py-2">
                <Star size={28} className="mx-auto mb-2 text-white" fill="white" />
                <p className="text-sm font-black uppercase tracking-widest text-white">Nomination sent!</p>
                <p className="text-xs text-white/60 mt-1">{monthLabel}</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-white/70 text-xs leading-relaxed mb-1">
                  One nomination per month. Who&apos;s killing it?
                </p>
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder="Search artists..."
                    className="w-full pl-8 pr-3 py-2.5 bg-white/10 border border-white/20 rounded-sm text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/60 transition-colors"
                  />
                </div>
                {query && (
                  <div className="border border-white/20 rounded-sm overflow-hidden max-h-52 overflow-y-auto bg-[#2a3be0]">
                    {filtered.slice(0, 8).map((a: any) => (
                      <button key={a.id} onClick={() => handleNominate(a.id)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left border-b border-white/10 last:border-0">
                        <div className="w-8 h-8 rounded-sm bg-white/10 flex-shrink-0 flex items-center justify-center text-xs font-black text-white/50">
                          {a.profile?.display_name?.[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white">{a.profile?.display_name}</p>
                          {a.city && <p className="text-xs text-white/40">{a.city}</p>}
                        </div>
                      </button>
                    ))}
                    {filtered.length === 0 && (
                      <p className="text-xs text-white/40 px-4 py-4">No artists found</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Rules */}
          <div className="border border-white/[0.08] rounded-sm p-5 bg-white/[0.02] space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/25 mb-4">How it works</p>
            {[
              ['One vote per month', 'Each artist gets one nomination per calendar month'],
              ['Artists only', 'Only registered artists with verified profiles can nominate'],
              ['Search boost', 'Winner gets elevated ranking in search results the following month'],
            ].map(([title, desc]) => (
              <div key={title} className="flex gap-3">
                <Zap size={12} className="text-[#3d52ff] flex-shrink-0 mt-0.5" fill="#3d52ff" />
                <div>
                  <p className="text-xs font-bold text-white/70">{title}</p>
                  <p className="text-[11px] text-white/30 mt-0.5 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trophy callout */}
          <div className="border border-[#ffd700]/20 rounded-sm p-5 bg-[#ffd700]/[0.04]">
            <div className="flex items-center gap-2 mb-2">
              <Trophy size={14} className="text-[#ffd700]" />
              <p className="text-[10px] font-black uppercase tracking-widest text-[#ffd700]/60">What it means</p>
            </div>
            <p className="text-xs text-white/30 leading-relaxed">
              DJs&apos; DJ is recognition from within the craft — other artists who know what it takes to build a room. It carries more weight than any review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
