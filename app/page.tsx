'use client';
import Link from 'next/link';
import { ArrowRight, Music2, Users, MapPin, FileText, Zap, AlertTriangle } from 'lucide-react';

const genres = ['140','UKG','Jungle','Industrial','Techno','House','Drum & Bass','Grime','Garage','Afrobeats','Breaks','Electro','140','UKG','Jungle','Industrial','Techno','House','Drum & Bass','Grime','Garage','Afrobeats','Breaks','Electro'];

const features = [
  { icon: <Music2 size={18} />, label: 'Artist Profiles', desc: 'SoundCloud embeds, photo feed, equipment checklist, genre tags.' },
  { icon: <Users size={18} />, label: 'Promoter Profiles', desc: 'Past event galleries, preferences, Trusted Partner badge.' },
  { icon: <MapPin size={18} />, label: 'Venue Tech Specs', desc: 'Full rider on the platform — sound, lighting, load-in in one place.' },
  { icon: <Zap size={18} />, label: 'Smart Matching', desc: 'Post a gig, get an automated top-5 shortlist. Blind mode optional.' },
  { icon: <FileText size={18} />, label: 'Digital Contracts', desc: 'Click-to-agree contracts, auto gig sheets, full payment tracking.' },
  { icon: <AlertTriangle size={18} />, label: 'Emergency Standby', desc: 'DJ cancelled? Blast available artists instantly with a premium offer.' },
];

export default function HomePage() {
  return (
    <div className="bg-black overflow-x-hidden">

      {/* ══════════════════════════════════════
          HERO — dark, full-bleed photo, flush to ticker
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 pt-20 pb-0 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/hero.jpg" alt="Underground rave"
            className="w-full h-full object-cover object-center"
            onError={(e) => { (e.target as HTMLImageElement).src = '/images/artists/a2.jpg'; }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.9) 100%)' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full pb-16">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="pill">Aotearoa NZ</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">Underground Booking Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d52ff] animate-pulse" />
          </div>

          <h1 className="font-black leading-[0.86] tracking-tighter uppercase mb-10"
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(3.5rem,10vw,9rem)' }}>
            <span className="block">
              <span className="text-white">BOOK </span>
              <span style={{ WebkitTextStroke: '3px #3d52ff', color: 'transparent' }}>SMARTER.</span>
            </span>
            <span className="block">
              <span className="text-white">PLAY </span>
              <span className="text-[#3d52ff]">BETTER.</span>
            </span>
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-end gap-8">
            <p className="text-white/55 text-sm max-w-sm leading-relaxed">
              Smart matching, digital contracts & emergency standby — built for the underground scene.
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/events" className="group flex items-center gap-2 px-7 py-3.5 bg-[#3d52ff] text-white font-black text-xs uppercase tracking-widest rounded-sm hover:bg-[#5566ff] transition-colors">
                Browse Gigs <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/auth/login" className="flex items-center px-7 py-3.5 border border-white/30 text-white font-black text-xs uppercase tracking-widest rounded-sm hover:border-[#3d52ff] hover:text-[#3d52ff] transition-colors bg-black/20 backdrop-blur-sm">
                Join Free
              </Link>
            </div>
          </div>

          {/* Stats flush to ticker */}
          <div className="flex items-center gap-8 border-t border-white/10 mt-12 pt-5">
            {[['05','Artists'],['02','Promoters'],['02','Venues'],['04+','Live Gigs']].map(([n,l]) => (
              <div key={l}>
                <p className="text-lg font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{n}</p>
                <p className="text-[10px] text-white/25 uppercase tracking-widest">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GENRE TICKER — sits right below hero, no gap ── */}
      <div className="bg-[#3d52ff] py-2.5 overflow-hidden">
        <div className="ticker-inner">
          {genres.map((g, i) => (
            <span key={i} className="flex items-center gap-4 mx-5 text-[11px] font-black uppercase tracking-[0.25em] text-white/80 flex-shrink-0">
              {g} <span className="text-white/30">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          PLATFORM SPLIT — light, no gap from ticker
      ══════════════════════════════════════ */}
      <section className="bg-[#f0f0ee]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch min-h-[480px]">
            <div className="relative overflow-hidden rounded-sm group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/dj.jpg" alt="DJ on Pioneer CDJs"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/artists/a1.jpg'; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="pill text-[10px]">Pioneer CDJ-3000 Setup</span>
              </div>
            </div>

            <div className="bg-white rounded-sm p-8 lg:p-12 flex flex-col justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.35em] text-[#3d52ff] mb-5 flex items-center gap-2">
                  <span className="w-5 h-px bg-[#3d52ff]" /> The Platform
                </p>
                <h2 className="font-black uppercase tracking-tight text-black leading-[0.88] mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem,4.5vw,3.5rem)' }}>
                  Everything in one <span className="text-[#3d52ff]">place.</span>
                </h2>
                <p className="text-black/45 text-sm leading-relaxed max-w-xs">
                  Full booking workflow from first message to signed contract to payment — built for the underground.
                </p>
              </div>
              <div className="mt-8 space-y-2">
                {['Artist profiles with SoundCloud embeds','Smart gig matching — automated top 5','Click-to-agree digital contracts','Emergency standby with 20% premium uplift','Payment instalment tracking'].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3d52ff] flex-shrink-0" />
                    <p className="text-xs text-black/45">{item}</p>
                  </div>
                ))}
                <div className="pt-5 border-t border-black/8 flex gap-6 mt-2">
                  <Link href="/artists" className="group flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-black/35 hover:text-[#3d52ff] transition-colors">
                    Artists <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link href="/events" className="group flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-black/35 hover:text-[#3d52ff] transition-colors">
                    Gigs <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link href="/venues" className="group flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-black/35 hover:text-[#3d52ff] transition-colors">
                    Venues <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SCENE PHOTOS — 3 up, flush to browse cards below
      ══════════════════════════════════════ */}
      <section className="bg-black pt-3 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2">
          {['/images/artists/a3.jpg','/images/artists/a5.jpg','/images/artists/a7.jpg'].map((src, i) => (
            <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-sm group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/0 transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* ── BROWSE CARDS — dark, no gap above ── */}
      <section className="bg-black px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-black uppercase leading-[0.88] tracking-tighter text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2.5rem,6vw,5rem)' }}>
              Explore the scene
            </h2>
            <Link href="/events" className="pill hover:bg-[#5566ff] transition-colors flex-shrink-0">All gigs →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { href: '/artists', label: 'Artists', count: '05', desc: 'DJs & selectors ready to play' },
              { href: '/promoters', label: 'Promoters', count: '02', desc: 'Active collectives & brands' },
              { href: '/venues', label: 'Venues', count: '02', desc: 'Clubs with full tech specs listed' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="brutal-card group block">
                <div className="bg-[#0a0a0a] border border-white/8 rounded-sm p-7 relative overflow-hidden min-h-[200px]">
                  <p className="text-[8rem] font-black leading-none text-white/[0.03] absolute -bottom-4 -right-2 select-none pointer-events-none"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.count}</p>
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-auto">
                      <span className="pill">{c.label}</span>
                      <ArrowRight size={14} className="text-white/20 group-hover:text-[#3d52ff] group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="mt-10">
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
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES — light, directly below dark
      ══════════════════════════════════════ */}
      <section className="bg-[#f0f0ee] px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-black uppercase leading-[0.88] tracking-tight text-black"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(2rem,5vw,4rem)' }}>
              Built for <span className="text-[#3d52ff]">the scene.</span>
            </h2>
            <Link href="/auth/login" className="px-6 py-3 bg-[#3d52ff] text-white font-black text-xs uppercase tracking-widest rounded-sm hover:bg-[#5566ff] transition-colors flex-shrink-0">
              Get started →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-sm p-6 border border-black/5 group hover:border-[#3d52ff]/25 hover:shadow-sm transition-all">
                <div className="w-9 h-9 rounded-sm bg-[#3d52ff]/8 flex items-center justify-center text-[#3d52ff] mb-4 group-hover:bg-[#3d52ff] group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <p className="font-black text-xs uppercase tracking-widest text-black mb-1.5">{f.label}</p>
                <p className="text-xs text-black/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EMERGENCY + PHOTO — side by side, dark
      ══════════════════════════════════════ */}
      <section className="bg-black px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
          {/* Emergency card */}
          <div className="bg-[#ff3333]/8 border border-[#ff3333]/20 rounded-sm p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-sm bg-[#ff3333] flex items-center justify-center flex-shrink-0">
                  <AlertTriangle size={18} className="text-white" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-1 bg-[#ff3333] text-white rounded-sm">🚨 New Feature</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-3 leading-[0.9]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Emergency<br />Standby
              </h3>
              <p className="text-sm text-white/40 leading-relaxed max-w-sm">
                DJ cancelled 4 hours before? Hit the panic button. Blast all available artists instantly with a 20% premium offer. Slot filled in minutes.
              </p>
            </div>
            <Link href="/auth/login"
              className="mt-8 self-start flex items-center gap-2 px-6 py-3 bg-[#ff3333] text-white font-black text-xs uppercase tracking-widest rounded-sm hover:bg-[#dd2222] transition-colors">
              Get Access <ArrowRight size={12} />
            </Link>
          </div>

          {/* Photo — different image */}
          <div className="relative overflow-hidden rounded-sm min-h-[320px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/artists/a4.jpg" alt="Live music event"
              className="w-full h-full object-cover absolute inset-0" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">Aotearoa Underground</p>
              <p className="text-2xl font-black uppercase tracking-tight text-white leading-[0.9]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                No half<br /><span className="text-[#3d52ff]">measures.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA — poster-style, inspired by event flyers
      ══════════════════════════════════════ */}
      <section className="bg-black px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-sm">
            {/* Full-bleed photo background — different image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/artists/a6.jpg" alt=""
              className="w-full h-full object-cover absolute inset-0"
              onError={(e) => { (e.target as HTMLImageElement).src = '/images/artists/a2.jpg'; }} />
            <div className="absolute inset-0 bg-[#3d52ff]/80 mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 p-10 sm:p-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-4 flex items-center gap-2">
                  <span className="w-6 h-px bg-white/30" /> Free to join · No middleman fees
                </p>
                <h2 className="font-black uppercase tracking-tighter text-white leading-[0.82]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(3rem,8vw,7rem)' }}>
                  <span className="block">Ready</span>
                  <span className="block">to get</span>
                  <span className="block text-white/20">on it?</span>
                </h2>
              </div>
              <div className="flex flex-col gap-3 lg:flex-shrink-0 lg:items-end">
                <p className="text-white/50 text-sm max-w-xs lg:text-right">Professional tools built for the realities of underground bookings.</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/auth/login"
                    className="px-8 py-4 bg-white text-[#3d52ff] font-black text-sm uppercase tracking-widest rounded-sm hover:bg-white/90 transition-colors">
                    Join EXPORTS
                  </Link>
                  <Link href="/events"
                    className="px-8 py-4 border-2 border-white/30 text-white font-black text-sm uppercase tracking-widest rounded-sm hover:border-white hover:bg-white/10 transition-colors">
                    Browse Gigs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
