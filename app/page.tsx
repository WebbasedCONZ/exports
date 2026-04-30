'use client';
import Link from 'next/link';
import { ArrowRight, Zap, Music2, Users, MapPin, FileText, Star } from 'lucide-react';

const features = [
  {
    icon: <Music2 size={20} />,
    title: 'Artist Profiles',
    desc: 'SoundCloud & Mixcloud embeds, photo feed, equipment checklist, and genre tags that plug directly into the search engine.',
  },
  {
    icon: <Users size={20} />,
    title: 'Promoter Profiles',
    desc: 'Past event galleries, preference filters, and a verified Trusted Partner badge for promoters who pay on time.',
  },
  {
    icon: <MapPin size={20} />,
    title: 'Venue Specs',
    desc: 'Full technical rider in the platform — booth layout, sound system, lighting, and load-in instructions in one place.',
  },
  {
    icon: <Star size={20} />,
    title: 'Smart Matching',
    desc: 'Post a gig, get an automated top-5 shortlist. Blind applications optional — no scrambling, no public competition.',
  },
  {
    icon: <FileText size={20} />,
    title: 'Digital Contracts',
    desc: 'Click-to-agree contracts with cancellation policy, auto-generated gig sheets, and full payment tracking built in.',
  },
  {
    icon: <Zap size={20} />,
    title: 'Settlement Dashboard',
    desc: 'Track advances, balances, and invoice status for every gig. Both parties see the same picture in real time.',
  },
];

const genres = ['140', 'UKG', 'Jungle', 'Industrial', 'Techno', 'House', 'Drum & Bass', 'Grime', 'Garage', 'Afrobeats', 'Breaks', 'Electro'];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#c6ff00 1px, transparent 1px), linear-gradient(90deg, #c6ff00 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#c6ff00]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-sm border border-[#252525] text-[#555] mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#c6ff00] animate-pulse" />
            Built for Aotearoa's underground music scene
          </div>

          <h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-[0.95]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Book smarter.
            <br />
            <span className="text-gradient">Play better.</span>
          </h1>

          <p className="text-[#666] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            EXPORTS connects DJs, promoters, and venues through a professional booking platform built for the realities of the underground scene — smart matching, digital contracts, and no bullshit admin.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/events"
              className="flex items-center gap-2 px-6 py-3 bg-[#c6ff00] text-black font-semibold rounded-sm hover:bg-[#b5ee00] transition-colors text-sm"
            >
              Browse Gigs <ArrowRight size={16} />
            </Link>
            <Link
              href="/onboarding"
              className="flex items-center gap-2 px-6 py-3 border border-[#252525] text-[#ededed] font-medium rounded-sm hover:border-[#3a3a3a] transition-colors text-sm"
            >
              Create Profile
            </Link>
          </div>
        </div>

        {/* Genre scroll */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-4 border-t border-[#1a1a1a]">
          <div className="flex gap-3 animate-none overflow-x-auto justify-center pb-1 px-6">
            {genres.map((g) => (
              <Link
                key={g}
                href={`/artists?genre=${g}`}
                className="flex-shrink-0 text-[10px] px-3 py-1 rounded-sm border border-[#252525] text-[#444] hover:text-[#888] hover:border-[#333] transition-colors uppercase tracking-widest"
              >
                {g}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Browse CTAs */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { href: '/artists', label: 'Artists', count: '5+', desc: 'DJs & selectors ready to play', color: '#c6ff00', icon: <Music2 size={22} /> },
            { href: '/promoters', label: 'Promoters', count: '3+', desc: 'Active collectives & event brands', color: '#00d4ff', icon: <Users size={22} /> },
            { href: '/venues', label: 'Venues', count: '3+', desc: 'Clubs with full tech specs listed', color: '#ffd700', icon: <MapPin size={22} /> },
          ].map((c) => (
            <Link key={c.href} href={c.href} className="group">
              <div className="bg-[#141414] border border-[#252525] rounded-md p-6 hover:border-[#3a3a3a] transition-all duration-200 hover:bg-[#1a1a1a]">
                <div className="flex items-start justify-between mb-4">
                  <div style={{ color: c.color }}>{c.icon}</div>
                  <ArrowRight size={16} className="text-[#333] group-hover:text-[#555] group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-3xl font-bold mb-1" style={{ color: c.color, fontFamily: "'Space Grotesk', sans-serif" }}>{c.count}</p>
                <p className="font-semibold text-sm mb-1">{c.label}</p>
                <p className="text-xs text-[#555]">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 max-w-7xl mx-auto border-t border-[#1a1a1a]">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Everything the booking process needs.
            <br />
            <span className="text-[#555]">Nothing it doesn't.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i} className="bg-[#141414] border border-[#252525] rounded-md p-5">
              <div className="text-[#c6ff00] mb-3">{f.icon}</div>
              <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
              <p className="text-xs text-[#555] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="bg-[#141414] border border-[#252525] rounded-md p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#c6ff00]/3 to-transparent pointer-events-none" />
          <h2 className="text-2xl font-bold mb-3 relative z-10" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Ready to get on the platform?
          </h2>
          <p className="text-[#555] text-sm mb-6 relative z-10">
            Free to use. No middleman fees. Just the tools you need to run a professional booking.
          </p>
          <div className="flex items-center justify-center gap-3 relative z-10">
            <Link href="/onboarding" className="px-6 py-2.5 bg-[#c6ff00] text-black font-semibold rounded-sm hover:bg-[#b5ee00] transition-colors text-sm">
              Join EXPORTS
            </Link>
            <Link href="/events" className="px-6 py-2.5 border border-[#252525] text-[#888] rounded-sm hover:border-[#3a3a3a] hover:text-[#ededed] transition-colors text-sm">
              Browse open gigs
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
