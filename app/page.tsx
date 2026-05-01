'use client';
import Link from 'next/link';
import { ArrowRight, Zap, Music2, Users, MapPin, FileText, Star, AlertTriangle } from 'lucide-react';

const genres = ['140','UKG','Jungle','Industrial','Techno','House','Drum & Bass','Grime','Garage','Afrobeats','Breaks','Electro','140','UKG','Jungle','Industrial','Techno','House','Drum & Bass','Grime','Garage','Afrobeats','Breaks','Electro'];

const features = [
  { icon: <Music2 size={18} />, label: 'Artist Profiles', desc: 'SoundCloud embeds, photo feed, equipment checklist, genre tags.' },
  { icon: <Users size={18} />, label: 'Promoter Profiles', desc: 'Past event galleries, preferences, and verified Trusted Partner badge.' },
  { icon: <MapPin size={18} />, label: 'Venue Tech Specs', desc: 'Full rider on the platform — sound, lighting, load-in in one place.' },
  { icon: <Star size={18} />, label: 'Smart Matching', desc: 'Post a gig, get an automated top-5 shortlist. Blind mode optional.' },
  { icon: <FileText size={18} />, label: 'Digital Contracts', desc: 'Click-to-agree contracts, auto gig sheets, full payment tracking.' },
  { icon: <AlertTriangle size={18} />, label: 'Emergency Standby', desc: 'DJ cancelled? Blast all available artists instantly with a premium offer.' },
];

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 pt-24 pb-0 overflow-hidden">

        {/* Background texture lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'repeating-linear-gradient(0deg, #c6ff00 0px, #c6ff00 1px, transparent 1px, transparent 60px)', backgroundSize: '100% 60px' }} />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#c6ff00]/20 to-transparent" />
          <div className="absolute top-0 left-[30%] w-px h-full bg-gradient-to-b from-[#c6ff00]/10 via-transparent to-transparent" />
        </div>

        {/* Big glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#c6ff00]/4 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 -right-20 w-[400px] h-[400px] bg-[#00d4ff]/3 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          {/* Tag line */}
          <div className="flex items-center gap-3 mb-8">
            <span className="sticker text-[#c6ff00] border-[#c6ff00]/40">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c6ff00] animate-pulse mr-1.5" />
              Aotearoa NZ Underground
            </span>
            <span className="sticker text-[#555] border-[#333]" style={{ transform: 'rotate(1deg)' }}>
              Est. 2026
            </span>
          </div>

          {/* Main headline */}
          <div className="mb-6">
            <h1 className="text-[clamp(3.5rem,12vw,9rem)] font-black leading-[0.88] tracking-tighter uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              <span className="block text-[#f0f0f0]">BOOK</span>
              <span className="block text-gradient">SMARTER.</span>
              <span className="block text-[#f0f0f0]">PLAY</span>
              <span className="block" style={{ WebkitTextStroke: '2px #c6ff00', color: 'transparent' }}>BETTER.</span>
            </h1>
          </div>

          {/* Sub + CTAs side by side */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 pb-16">
            <p className="text-[#555] text-base sm:text-lg max-w-xl leading-relaxed lg:flex-1">
              The professional booking platform built for the realities of the underground scene — smart matching, digital contracts, emergency standby, and zero bullshit admin.
            </p>
            <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
              <Link href="/events"
                className="group flex items-center gap-2 px-7 py-3.5 bg-[#c6ff00] text-black font-black text-sm uppercase tracking-wide rounded-sm hover:bg-white transition-colors">
                Browse Gigs <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/auth/login"
                className="flex items-center gap-2 px-7 py-3.5 border-2 border-[#222] text-[#888] font-bold text-sm uppercase tracking-wide rounded-sm hover:border-[#c6ff00] hover:text-[#c6ff00] transition-colors">
                Join Free
              </Link>
            </div>
          </div>

          {/* Stats row */}
          <div className="border-t border-[#1a1a1a] pt-6 pb-0 grid grid-cols-3 gap-4 max-w-md">
            {[['5+','Artists'],['2+','Promoters'],['2+','Venues']].map(([n,l]) => (
              <div key={l}>
                <p className="text-2xl font-black text-[#c6ff00]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{n}</p>
                <p className="text-xs text-[#444] uppercase tracking-widest">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GENRE TICKER ── */}
      <div className="border-y border-[#1a1a1a] bg-[#0d0d0d] py-3 overflow-hidden">
        <div className="ticker-inner">
          {genres.map((g, i) => (
            <span key={i} className="flex items-center gap-4 mx-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#333] hover:text-[#c6ff00] transition-colors cursor-default flex-shrink-0">
              {g}
              <span className="text-[#222]">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── BROWSE CARDS ── */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-4xl sm:text-5xl font-black uppercase leading-none tracking-tight"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Explore<br />
            <span className="text-[#333]">The Platform</span>
          </h2>
          <Link href="/events" className="text-xs text-[#444] hover:text-[#c6ff00] uppercase tracking-widest transition-colors hidden sm:block">
            All gigs →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { href: '/artists', label: 'Artists', count: '05', desc: 'DJs & selectors ready to play', color: '#c6ff00', rotate: '-0.5deg' },
            { href: '/promoters', label: 'Promoters', count: '02', desc: 'Active collectives & brands', color: '#00d4ff', rotate: '0.5deg' },
            { href: '/venues', label: 'Venues', count: '02', desc: 'Clubs with full tech specs', color: '#ffd700', rotate: '-0.3deg' },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="brutal-card group block" style={{ transform: `rotate(${c.rotate})` }}>
              <div className="bg-[#111] border border-[#222] rounded-sm p-6 h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-5"
                  style={{ background: c.color }} />
                <p className="text-[5rem] font-black leading-none opacity-10 absolute -bottom-3 -right-2"
                  style={{ color: c.color, fontFamily: "'Space Grotesk', sans-serif" }}>{c.count}</p>
                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-[0.2em] font-bold mb-3 block"
                    style={{ color: c.color }}>{c.label}</span>
                  <p className="text-3xl font-black uppercase tracking-tight mb-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.count}<span className="text-[#333]">+</span></p>
                  <p className="text-xs text-[#444]">{c.desc}</p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-xs font-bold uppercase tracking-widest"
                  style={{ color: c.color }}>
                  Browse <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="border border-[#1a1a1a] rounded-sm overflow-hidden">
          {/* Header */}
          <div className="border-b border-[#1a1a1a] px-8 py-6 bg-[#0d0d0d]">
            <h2 className="text-2xl font-black uppercase tracking-tight"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Everything you need. <span className="text-[#333]">Nothing you don't.</span>
            </h2>
          </div>
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={i} className={`p-6 ${i % 3 !== 2 ? 'lg:border-r' : ''} ${i < 3 ? 'border-b' : ''} border-[#1a1a1a] hover:bg-[#0d0d0d] transition-colors`}>
                <div className="text-[#c6ff00] mb-4 w-8 h-8 border border-[#c6ff00]/20 rounded-sm flex items-center justify-center">
                  {f.icon}
                </div>
                <p className="font-bold text-sm uppercase tracking-wide mb-2">{f.label}</p>
                <p className="text-xs text-[#444] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EMERGENCY STANDBY CALLOUT ── */}
      <section className="px-6 pb-20 max-w-7xl mx-auto">
        <div className="relative bg-[#ff4444]/5 border border-[#ff4444]/20 rounded-sm p-8 sm:p-12 overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ff4444 0px, #ff4444 1px, transparent 1px, transparent 8px)' }} />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-12 h-12 rounded-sm bg-[#ff4444]/10 border border-[#ff4444]/30 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={22} className="text-[#ff4444]" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-[#ff4444] font-bold mb-1">New Feature</p>
              <h3 className="text-2xl font-black uppercase tracking-tight mb-1"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Emergency Standby</h3>
              <p className="text-sm text-[#555]">DJ cancelled 4 hours before the show? Hit the panic button. Instantly blast all available artists nearby with a 20% premium offer. Slot filled in minutes.</p>
            </div>
            <Link href="/auth/login"
              className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-[#ff4444] text-white font-bold text-xs uppercase tracking-wide rounded-sm hover:bg-[#e03030] transition-colors">
              Get Access <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BIG CTA BANNER ── */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="bg-[#c6ff00] rounded-sm p-10 sm:p-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, #000 1px, transparent 1px, transparent 40px)' }} />
          <div className="absolute -right-10 -bottom-10 text-[12rem] font-black text-black/5 leading-none uppercase select-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NZ</div>
          <div className="relative z-10">
            <p className="text-black/50 text-xs uppercase tracking-[0.3em] font-bold mb-4">Built for the underground</p>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-black mb-6 leading-[0.9]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Ready to<br />get on it?
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link href="/auth/login"
                className="px-8 py-3 bg-black text-[#c6ff00] font-black text-sm uppercase tracking-wide rounded-sm hover:bg-[#111] transition-colors">
                Join EXPORTS
              </Link>
              <Link href="/events"
                className="px-8 py-3 border-2 border-black/20 text-black font-bold text-sm uppercase tracking-wide rounded-sm hover:border-black hover:bg-black/10 transition-colors">
                Browse gigs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
