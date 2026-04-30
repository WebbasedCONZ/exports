import Link from 'next/link';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] mt-20 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-[#c6ff00] rounded-sm flex items-center justify-center">
              <Zap size={12} className="text-black" fill="black" />
            </div>
            <span className="font-bold text-sm tracking-[0.15em] uppercase">EXPORTS</span>
          </Link>
          <p className="text-xs text-[#555] max-w-xs leading-relaxed">
            The professional booking platform built for the underground music industry in Aotearoa New Zealand and beyond.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-xs text-[#555]">
          <Link href="/artists" className="hover:text-[#888] transition-colors">Artists</Link>
          <Link href="/events" className="hover:text-[#888] transition-colors">Gigs</Link>
          <Link href="/promoters" className="hover:text-[#888] transition-colors">Promoters</Link>
          <Link href="/dashboard" className="hover:text-[#888] transition-colors">Dashboard</Link>
          <Link href="/venues" className="hover:text-[#888] transition-colors">Venues</Link>
          <Link href="/onboarding" className="hover:text-[#888] transition-colors">Join</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#1a1a1a] flex items-center justify-between">
        <p className="text-xs text-[#333]">© 2026 EXPORTS. All rights reserved.</p>
        <p className="text-xs text-[#333]">Built for the underground.</p>
      </div>
    </footer>
  );
}
