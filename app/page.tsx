'use client';
import Link from 'next/link';
import { ArrowRight, Zap, Music2, Users, MapPin, FileText, Star, AlertTriangle } from 'lucide-react';

const genres = ['140','UKG','Jungle','Industrial','Techno','House','Drum & Bass','Grime','Garage','Afrobeats','Breaks','Electro','140','UKG','Jungle','Industrial','Techno','House','Drum & Bass','Grime','Garage','Afrobeats','Breaks','Electro'];

const features = [
  { icon: <Music2 size={16} />, label: 'Artist Profiles', desc: 'SoundCloud embeds, photo feed, equipment checklist, genre tags.' },
  { icon: <Users size={16} />, label: 'Promoter Profiles', desc: 'Past event galleries, preferences, Trusted Partner badge.' },
  { icon: <MapPin size={16} />, label: 'Venue Tech Specs', desc: 'Full rider on the platform — sound, lighting, load-in in one place.' },
  { icon: <Star size={16} />, label: 'Smart Matching', desc: 'Post a gig, get an automated top-5 shortlist. Blind mode optional.' },
  { icon: <FileText size={16} />, label: 'Digital Contracts', desc: 'Click-to-agree contracts, auto gig sheets, full payment tracking.' },
  { icon: <AlertTriangle size={16} />, label: 'Emergency Standby', desc: 'DJ cancelled? Blast available artists instantly with a premium offer.' },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden bg-black">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-0 overflow-hidden bg-black">

        {/* Decorative blue splat top right */}
        <div className="absolute top-24 right-8 w-28 h-28 splat bg-[#3d52ff] opacity-80 pointer-events-none" />
        <div className="absolute top-40 right-20 w-14 h-14 splat bg-[#3d52ff] opacity-40 pointer-events-none" />

        {/* Horizontal rule lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[15,30,45,60,75].map(p => (
            <div key={p} className="absolute left-0 right-0 h-px bg-white/[0.03]" style={{ top: `${p}%` }} />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">

          {/* Top label row */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="pill">Aotearoa NZ</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/20">Underground Booking Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d52ff] animate-pulse ml-1" />
          </div>

          {/* MAIN HEADLINE */}
          <div className="mb-8 relative">
            {/* Splat behind text */}
            <div className="absolute -left-6 top-4 w-20 h-20 splat bg-[#3d52ff]/20 pointer-events-none" />
            <h1 className="text-[clamp(4rem,14vw,11rem)] font-black leading-[0.85] tracking-tighter uppercase relative z-10"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="block text-white">BOOK</span>
              <span className="block" style={{ WebkitTextStroke: '3px #3d52ff', color: 'transparent' }}>SMARTER.</span>
              <span className="block text-white">PLAY</span>
              <span className="block text-[#3d52ff]">BETTER.</span>
            </h1>
          </div>

          {/* Subtext + CTAs */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16">
            <p className="text-white/40 text-sm sm:text-base max-w-lg leading-relaxed lg:flex-1">
              EXPORTS connects DJs, promoters, and venues through a professional booking platform built for the realities of the underground scene — smart matching, digital contracts, emergency standby.
            </p>
            <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
              <Link href="/events"
                className="group flex items-center gap-2 px-8 py-4 bg-[#3d52ff] text-white font-black text-sm uppercase tracking-widest rounded-sm hover:bg-[#5566ff] transition-colors">
                Browse Gigs <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/auth/login"
                className="flex items-center gap-2 px-8 py-4 border border-white/20 text-white font-bold text-sm uppercase tracking-widest rounded-sm hover:border-[#3d52ff] hover:text-[#3d52ff] transition-colors">
                Join Free
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 border-t border-white/5 pt-6">
            {[['05','Artists'],['02','Promoters'],['02','Venues'],['04+','Live Gigs']].map(([n,l]) => (
              <div key={l}>
                <p className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{n}</p>
                <p className="text-[10px] text-white/25 uppercase tracking-widest">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GENRE TICKER ── */}
      <div className="border-y border-white/5 bg-[#3d52ff] py-2.5 overflow-hidden">
        <div className="ticker-inner">
          {genres.map((g, i) => (
            <span key={i} className="flex items-center gap-4 mx-5 text-[11px] font-black uppercase tracking-[0.25em] text-white/80 flex-shrink-0">
              {g} <span className="text-white/30">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── BROWSE CARDS ── */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-5xl sm:text-6xl font-black uppercase leading-[0.85] tracking-tight text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Explore<br />
            <span className="text-white/15">The Scene</span>
          </h2>
          <Link href="/events" className="pill text-white hover:bg-[#5566ff] transition-colors">
            All gigs →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { href: '/artists', label: 'Artists', count: '05', desc: 'DJs & selectors ready to play' },
            { href: '/promoters', label: 'Promoters', count: '02', desc: 'Active collectives & brands' },
            { href: '/venues', label: 'Venues', count: '02', desc: 'Clubs with full tech specs listed' },
          ].map((c, i) => (
            <Link key={c.href} href={c.href} className="brutal-card group block">
              <div className="bg-[#0a0a0a] border border-white/8 rounded-sm p-7 h-full relative overflow-hidden min-h-[200px]">
                {/* Giant number watermark */}
                <p className="text-[8rem] font-black leading-none text-white/[0.03] absolute -bottom-4 -right-2 select-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.count}</p>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-auto">
                    <span className="pill">{c.label}</span>
                    <ArrowRight size={14} className="text-white/20 group-hover:text-[#3d52ff] group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="mt-8">
                    <p className="text-4xl font-black text-white mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      {c.count}<span className="text-white/20">+</span>
                    </p>
                    <p className="text-xs text-white/30">{c.desc}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURES — newspaper grid ── */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="border border-white/8 rounded-sm overflow-hidden">
          <div className="bg-[#3d52ff] px-8 py-5 flex items-center justify-between">
            <h2 className="text-lg font-black uppercase tracking-widest text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Platform Features
            </h2>
            <div className="flex gap-2">
              {[...Array(3)].map((_,i) => <div key={i} className="w-2 h-2 rounded-full bg-white/30" />)}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={i}
                className={`p-6 border-white/5 hover:bg-white/[0.02] transition-colors group
                  ${i % 3 !== 2 ? 'lg:border-r' : ''}
                  ${i < 3 ? 'border-b' : ''}
                  border-white/5`}>
                <div className="w-8 h-8 rounded-sm bg-[#3d52ff]/10 border border-[#3d52ff]/20 flex items-center justify-center text-[#3d52ff] mb-4 group-hover:bg-[#3d52ff] group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <p className="font-bold text-xs uppercase tracking-widest text-white mb-2">{f.label}</p>
                <p className="text-xs text-white/30 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY STANDBY ── */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="relative bg-[#ff3333]/5 border border-[#ff3333]/15 rounded-sm p-8 sm:p-12 overflow-hidden">
          <div className="absolute top-4 right-4 w-16 h-16 splat bg-[#ff3333]/20" />
          <div className="absolute bottom-4 right-12 w-10 h-10 splat bg-[#ff3333]/10" />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-12 h-12 flex-shrink-0 rounded-sm bg-[#ff3333] flex items-center justify-center">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <span className="pill bg-[#ff3333] mb-3 inline-flex">🚨 New</span>
              <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Emergency Standby</h3>
              <p className="text-sm text-white/30">DJ cancelled 4 hours before? Hit the panic button. Blast all available artists with a 20% premium offer. Slot filled in minutes.</p>
            </div>
            <Link href="/auth/login"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-[#ff3333] text-white font-black text-xs uppercase tracking-widest rounded-sm hover:bg-[#dd2222] transition-colors">
              Get Access <ArrowRight size={12} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BIG CTA ── */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="bg-white rounded-sm p-10 sm:p-16 relative overflow-hidden">
          {/* Blue splats decorative */}
          <div className="absolute top-6 right-6 w-20 h-20 splat bg-[#3d52ff]" />
          <div className="absolute bottom-6 right-20 w-12 h-12 splat bg-[#3d52ff]/40" />
          <div className="absolute top-1/2 right-8 w-8 h-8 splat bg-[#3d52ff]/20" />

          {/* Giant watermark */}
          <div className="absolute -right-4 -bottom-6 text-[10rem] font-black text-black/5 leading-none uppercase select-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NZ</div>

          <div className="relative z-10">
            <span className="pill mb-6 inline-flex">Built for the underground</span>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black mb-6 leading-[0.85]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ready to<br />get on it?
            </h2>
            <p className="text-black/40 text-sm mb-8 max-w-sm">Free to join. No middleman fees. Professional tools built for the realities of underground bookings.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/login"
                className="px-8 py-3.5 bg-[#3d52ff] text-white font-black text-sm uppercase tracking-widest rounded-sm hover:bg-[#5566ff] transition-colors">
                Join EXPORTS
              </Link>
              <Link href="/events"
                className="px-8 py-3.5 border-2 border-black/15 text-black font-bold text-sm uppercase tracking-widest rounded-sm hover:border-[#3d52ff] hover:text-[#3d52ff] transition-colors">
                Browse gigs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
