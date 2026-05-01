'use client';
import Link from 'next/link';
import { ArrowRight, Music2, Users, MapPin, FileText, Star, AlertTriangle } from 'lucide-react';

const genres = ['140','UKG','Jungle','Industrial','Techno','House','Drum & Bass','Grime','Garage','Afrobeats','Breaks','Electro','140','UKG','Jungle','Industrial','Techno','House','Drum & Bass','Grime','Garage','Afrobeats','Breaks','Electro'];

const features = [
  { icon: <Music2 size={18} />, label: 'Artist Profiles', desc: 'SoundCloud embeds, photo feed, equipment checklist, genre tags.' },
  { icon: <Users size={18} />, label: 'Promoter Profiles', desc: 'Past event galleries, preferences, Trusted Partner badge.' },
  { icon: <MapPin size={18} />, label: 'Venue Tech Specs', desc: 'Full rider on the platform — sound, lighting, load-in in one place.' },
  { icon: <Star size={18} />, label: 'Smart Matching', desc: 'Post a gig, get an automated top-5 shortlist. Blind mode optional.' },
  { icon: <FileText size={18} />, label: 'Digital Contracts', desc: 'Click-to-agree contracts, auto gig sheets, full payment tracking.' },
  { icon: <AlertTriangle size={18} />, label: 'Emergency Standby', desc: 'DJ cancelled? Blast available artists instantly with a premium offer.' },
];

export default function HomePage() {
  return (
    <div className="bg-black">

      {/* ══════════════════════════════════════
          HERO — dark, full-bleed photo
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-end px-6 pt-20 pb-16 overflow-hidden">
        {/* Background photo */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero.jpg"
            alt="Underground rave"
            className="w-full h-full object-cover object-center"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=85'; }}
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.85) 100%)' }} />
        </div>
        <div className="absolute top-24 right-8 w-24 h-24 splat bg-[#3d52ff] opacity-60 pointer-events-none z-10" />

        <div className="relative z-20 max-w-7xl mx-auto w-full">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <span className="pill">Aotearoa NZ</span>
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Underground Booking Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3d52ff] animate-pulse ml-1" />
          </div>

          <h1 className="text-[clamp(3.5rem,10vw,9rem)] font-black leading-[0.88] tracking-tighter uppercase mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="block">
              <span className="text-white">BOOK </span>
              <span style={{ WebkitTextStroke: '3px #3d52ff', color: 'transparent' }}>SMARTER.</span>
            </span>
            <span className="block">
              <span className="text-white">PLAY </span>
              <span className="text-[#3d52ff]">BETTER.</span>
            </span>
          </h1>

          <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-12">
            <p className="text-white/60 text-sm sm:text-base max-w-md leading-relaxed lg:flex-1">
              EXPORTS connects DJs, promoters, and venues through a professional booking platform built for the realities of the underground scene — smart matching, digital contracts, emergency standby.
            </p>
            <div className="flex flex-wrap gap-3 lg:flex-shrink-0">
              <Link href="/events"
                className="group flex items-center gap-2 px-8 py-4 bg-[#3d52ff] text-white font-black text-sm uppercase tracking-widest rounded-sm hover:bg-[#5566ff] transition-colors">
                Browse Gigs <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/auth/login"
                className="flex items-center gap-2 px-8 py-4 border border-white/40 text-white font-bold text-sm uppercase tracking-widest rounded-sm hover:border-[#3d52ff] hover:text-[#3d52ff] transition-colors bg-black/20 backdrop-blur-sm">
                Join Free
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-8 border-t border-white/10 pt-6">
            {[['05','Artists'],['02','Promoters'],['02','Venues'],['04+','Live Gigs']].map(([n,l]) => (
              <div key={l}>
                <p className="text-xl font-black text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{n}</p>
                <p className="text-[10px] text-white/30 uppercase tracking-widest">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GENRE TICKER (cobalt blue) ── */}
      <div className="border-y border-white/5 bg-[#3d52ff] py-2.5 overflow-hidden">
        <div className="ticker-inner">
          {genres.map((g, i) => (
            <span key={i} className="flex items-center gap-4 mx-5 text-[11px] font-black uppercase tracking-[0.25em] text-white/80 flex-shrink-0">
              {g} <span className="text-white/30">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          SPLIT SECTION — light background
      ══════════════════════════════════════ */}
      <section className="bg-[#f2f2f0]">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-stretch">
            {/* Photo */}
            <div className="relative overflow-hidden rounded-sm min-h-[420px] group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/dj.jpg"
                alt="DJ performing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 absolute inset-0"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=85'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="pill">Pioneer CDJ-3000</span>
              </div>
            </div>

            {/* Text */}
            <div className="bg-white rounded-sm p-8 lg:p-12 flex flex-col justify-between border border-black/5">
              <div>
                <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-[#3d52ff] mb-5">
                  <span className="w-4 h-px bg-[#3d52ff]" /> The Platform
                </span>
                <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-black leading-[0.85] mb-6"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Everything<br />in one<br />
                  <span className="text-[#3d52ff]">place.</span>
                </h2>
                <p className="text-black/50 text-sm leading-relaxed mb-8 max-w-sm">
                  From first message to signed contract to payment tracking — the full booking workflow, built for the underground.
                </p>
              </div>
              <div className="space-y-2.5">
                {['Artist profiles with SoundCloud embeds','Smart gig matching — automated top 5 shortlist','Click-to-agree digital contracts','Emergency DJ standby with 20% premium uplift','Payment instalment tracking'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#3d52ff] flex-shrink-0" />
                    <p className="text-xs text-black/50">{item}</p>
                  </div>
                ))}
                <div className="pt-5 border-t border-black/8 flex gap-5 mt-3">
                  <Link href="/artists" className="group flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-black/40 hover:text-[#3d52ff] transition-colors">
                    Browse Artists <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                  <Link href="/events" className="group flex items-center gap-1.5 text-xs font-black uppercase tracking-widest text-black/40 hover:text-[#3d52ff] transition-colors">
                    Open Gigs <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BROWSE CARDS — dark
      ══════════════════════════════════════ */}
      <section className="bg-black px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="text-5xl sm:text-6xl font-black uppercase leading-[0.85] tracking-tight text-white"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Explore<br /><span className="text-white/15">The Scene</span>
            </h2>
            <Link href="/events" className="pill hover:bg-[#5566ff] transition-colors">All gigs →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { href: '/artists', label: 'Artists', count: '05', desc: 'DJs & selectors ready to play' },
              { href: '/promoters', label: 'Promoters', count: '02', desc: 'Active collectives & brands' },
              { href: '/venues', label: 'Venues', count: '02', desc: 'Clubs with full tech specs listed' },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="brutal-card group block">
                <div className="bg-[#0a0a0a] border border-white/8 rounded-sm p-7 h-full relative overflow-hidden min-h-[200px]">
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
        </div>
      </section>

      {/* ══════════════════════════════════════
          3-PHOTO GRID — dark strip between sections
      ══════════════════════════════════════ */}
      <section className="bg-black px-6 pb-3">
        <div className="max-w-7xl mx-auto grid grid-cols-3 gap-2">
          {['/images/scene-1.jpg','/images/scene-2.jpg','/images/scene-3.jpg'].map((src, i) => {
            const fallbacks = [
              'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=800&q=80',
              'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=800&q=80',
            ];
            return (
              <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-sm group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => { (e.target as HTMLImageElement).src = fallbacks[i]; }} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
              </div>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES — light background
      ══════════════════════════════════════ */}
      <section className="bg-[#f2f2f0] px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-4xl sm:text-5xl font-black uppercase leading-[0.85] tracking-tight text-black"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Built for<br /><span className="text-[#3d52ff]">the scene.</span>
            </h2>
            <Link href="/auth/login"
              className="px-6 py-3 bg-[#3d52ff] text-white font-black text-xs uppercase tracking-widest rounded-sm hover:bg-[#5566ff] transition-colors">
              Get started →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-white rounded-sm p-6 border border-black/5 group hover:border-[#3d52ff]/30 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-sm bg-[#3d52ff]/8 flex items-center justify-center text-[#3d52ff] mb-5 group-hover:bg-[#3d52ff] group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <p className="font-black text-xs uppercase tracking-widest text-black mb-2">{f.label}</p>
                <p className="text-xs text-black/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FULL-BLEED PHOTO BANNER — dark
      ══════════════════════════════════════ */}
      <section className="relative h-[55vh] min-h-[320px] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.jpg"
          alt="Underground event"
          className="w-full h-full object-cover object-[50%_60%]"
          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=85'; }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.88) 0%, rgba(61,82,255,0.35) 50%, rgba(0,0,0,0.88) 100%)' }} />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30 mb-4">Aotearoa Underground</p>
          <h2 className="text-[clamp(3rem,9vw,8rem)] font-black uppercase tracking-tighter text-white leading-[0.82]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            No Half<br /><span className="text-[#3d52ff]">Measures.</span>
          </h2>
        </div>
      </section>

      {/* ══════════════════════════════════════
          EMERGENCY STANDBY — dark
      ══════════════════════════════════════ */}
      <section className="bg-black px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-[#ff3333]/5 border border-[#ff3333]/15 rounded-sm p-8 sm:p-12 overflow-hidden">
            <div className="absolute top-4 right-4 w-16 h-16 splat bg-[#ff3333]/20" />
            <div className="absolute bottom-4 right-12 w-10 h-10 splat bg-[#ff3333]/10" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="w-12 h-12 flex-shrink-0 rounded-sm bg-[#ff3333] flex items-center justify-center">
                <AlertTriangle size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <span className="pill bg-[#ff3333] mb-3 inline-flex">🚨 New Feature</span>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Emergency Standby</h3>
                <p className="text-sm text-white/40">DJ cancelled 4 hours before? Hit the panic button. Blast all available artists with a 20% premium offer. Slot filled in minutes.</p>
              </div>
              <Link href="/auth/login"
                className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-[#ff3333] text-white font-black text-xs uppercase tracking-widest rounded-sm hover:bg-[#dd2222] transition-colors">
                Get Access <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA — light
      ══════════════════════════════════════ */}
      <section className="bg-[#f2f2f0] px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#3d52ff] rounded-sm p-10 sm:p-16 relative overflow-hidden">
            <div className="absolute top-6 right-6 w-20 h-20 splat bg-white/20" />
            <div className="absolute bottom-6 right-20 w-12 h-12 splat bg-white/10" />
            <div className="absolute -right-4 -bottom-6 text-[10rem] font-black text-white/[0.06] leading-none uppercase select-none"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>NZ</div>
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-6">
                <span className="w-4 h-px bg-white/40" /> Built for the underground
              </span>
              <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-[0.85]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Ready to<br />get on it?
              </h2>
              <p className="text-white/60 text-sm mb-8 max-w-sm">Free to join. No middleman fees. Professional tools built for the realities of underground bookings.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/auth/login"
                  className="px-8 py-3.5 bg-white text-[#3d52ff] font-black text-sm uppercase tracking-widest rounded-sm hover:bg-white/90 transition-colors">
                  Join EXPORTS
                </Link>
                <Link href="/events"
                  className="px-8 py-3.5 border-2 border-white/30 text-white font-bold text-sm uppercase tracking-widest rounded-sm hover:border-white hover:bg-white/10 transition-colors">
                  Browse gigs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
