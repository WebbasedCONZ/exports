import Link from 'next/link';
import { Zap, ArrowRight } from 'lucide-react';

const links = {
  Platform: [
    { href: '/artists', label: 'Artists' },
    { href: '/promoters', label: 'Promoters' },
    { href: '/venues', label: 'Venues' },
    { href: '/events', label: 'Open Gigs' },
    { href: '/community/djs-dj', label: "DJs' DJ" },
  ],
  Account: [
    { href: '/auth/login', label: 'Sign In' },
    { href: '/onboarding', label: 'Join Free' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/messages', label: 'Messages' },
    { href: '/settings/team', label: 'Settings' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.06]">

      {/* Top band — full-bleed photo strip with CTA */}
      <div className="relative overflow-hidden border-b border-white/[0.06]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/artists/a6.jpg"
          alt=""
          className="w-full h-40 object-cover object-center opacity-30"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div className="absolute inset-0 flex items-center px-6">
          <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-1">Ready to book?</p>
              <p className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white leading-none"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Join the underground.
              </p>
            </div>
            <Link href="/auth/login"
              className="group flex items-center gap-2 px-7 py-3.5 bg-[#3d52ff] text-white font-black text-xs uppercase tracking-widest rounded-sm hover:bg-[#5566ff] transition-colors flex-shrink-0">
              Get Started <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group">
              <Zap size={22} className="text-[#3d52ff]" fill="#3d52ff" />
              <span className="font-black text-sm tracking-[0.2em] uppercase text-white group-hover:text-[#3d52ff] transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                EXPORTS
              </span>
            </Link>
            <p className="text-xs text-white/30 leading-relaxed mb-6 max-w-xs">
              The professional booking platform built for the underground music scene in Aotearoa New Zealand and beyond. Smart matching, digital contracts, emergency standby.
            </p>

            {/* Genre tags */}
            <div className="flex flex-wrap gap-1.5">
              {['Drum & Bass','Techno','UKG','Jungle','House','140'].map(g => (
                <span key={g} className="text-[9px] font-black uppercase tracking-widest px-2 py-1 border border-white/10 text-white/20 rounded-sm">
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-5">
                {section}
              </p>
              <ul className="space-y-3">
                {items.map(({ href, label }) => (
                  <li key={href}>
                    <Link href={href}
                      className="text-sm font-bold text-white/50 hover:text-white transition-colors group flex items-center gap-2">
                      <span className="w-0 group-hover:w-3 h-px bg-[#3d52ff] transition-all duration-200 flex-shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[11px] text-white/20 uppercase tracking-widest">
            © 2026 EXPORTS — Aotearoa NZ
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-white/15 uppercase tracking-widest">Built for the underground</span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3d52ff] animate-pulse" />
              <span className="text-[10px] text-white/20 uppercase tracking-widest">Live</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
