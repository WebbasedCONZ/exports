'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useUnreadCount } from '@/hooks/useMessages';
import { cn } from '@/lib/utils';
import { Menu, X, Zap, MessageSquare, Settings } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { href: '/artists', label: 'Artists' },
  { href: '/promoters', label: 'Promoters' },
  { href: '/venues', label: 'Venues' },
  { href: '/events', label: 'Gigs' },
  { href: '/community/djs-dj', label: "DJs' DJ" },
];

export default function Nav() {
  const pathname = usePathname();
  const { profile } = useAuth();
  const unread = useUnreadCount(profile?.id ?? '');
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-black/8 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 bg-[#3d52ff] rounded-sm flex items-center justify-center flex-shrink-0">
            <Zap size={14} className="text-white" fill="white" />
          </div>
          <span className="font-black text-sm tracking-[0.2em] uppercase text-black group-hover:text-[#3d52ff] transition-colors"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            EXPORTS
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-0.5">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className={cn(
                'text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-colors',
                pathname.startsWith(l.href)
                  ? 'text-[#3d52ff] bg-[#3d52ff]/8'
                  : 'text-black/50 hover:text-black'
              )}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          {profile ? (
            <>
              <Link href="/messages" className="relative p-2 text-black/40 hover:text-black transition-colors rounded-sm">
                <MessageSquare size={17} />
                {unread > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#3d52ff] text-white text-[9px] font-bold flex items-center justify-center">
                    {unread > 9 ? '9+' : unread}
                  </span>
                )}
              </Link>

              <Link href="/settings/team" className="p-2 text-black/40 hover:text-black transition-colors rounded-sm">
                <Settings size={17} />
              </Link>

              <Link href="/dashboard" className="flex items-center gap-2 group ml-1">
                <span className="hidden sm:block text-xs text-black/40 group-hover:text-black/70 transition-colors">
                  {profile.display_name}
                </span>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#eee] border border-black/10">
                  {profile.profile_photo
                    ? <Image src={profile.profile_photo} alt={profile.display_name} width={32} height={32} className="object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-xs font-black text-black/40"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        {profile.display_name?.[0]}
                      </div>
                  }
                </div>
              </Link>
            </>
          ) : (
            <Link href="/auth/login"
              className="text-xs font-black uppercase tracking-widest px-5 py-2 bg-[#3d52ff] text-white rounded-sm hover:bg-[#5566ff] transition-colors"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Sign In
            </Link>
          )}

          <button className="md:hidden text-black/50 hover:text-black transition-colors ml-1 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-black/8 bg-white">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-6 py-3.5 text-xs font-bold uppercase tracking-widest border-b border-black/5 transition-colors',
                pathname.startsWith(l.href) ? 'text-[#3d52ff]' : 'text-black/50 hover:text-black'
              )}>
              {l.label}
            </Link>
          ))}
          {profile ? (
            <>
              <Link href="/messages" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-6 py-3.5 text-xs text-black/50 font-bold uppercase tracking-widest border-b border-black/5">
                Messages
                {unread > 0 && <span className="w-5 h-5 rounded-full bg-[#3d52ff] text-white text-[10px] font-bold flex items-center justify-center">{unread}</span>}
              </Link>
              <Link href="/settings/team" onClick={() => setMobileOpen(false)}
                className="block px-6 py-3.5 text-xs text-black/50 font-bold uppercase tracking-widest border-b border-black/5">
                Settings
              </Link>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                className="block px-6 py-3.5 text-xs text-black/50 font-bold uppercase tracking-widest">
                Dashboard
              </Link>
            </>
          ) : (
            <div className="px-6 py-4">
              <Link href="/auth/login" onClick={() => setMobileOpen(false)}
                className="block text-center py-3 bg-[#3d52ff] text-white text-xs font-black uppercase tracking-widest rounded-sm">
                Sign In
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
