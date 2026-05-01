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
    <nav className="fixed top-0 left-0 right-0 z-40 border-b border-[#1a1a1a] bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-7 h-7 bg-[#c6ff00] rounded-sm flex items-center justify-center">
            <Zap size={14} className="text-black" fill="black" />
          </div>
          <span className="font-bold text-sm tracking-[0.15em] uppercase text-[#ededed] group-hover:text-[#c6ff00] transition-colors">
            EXPORTS
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href}
              className={cn(
                'text-sm px-3 py-1.5 rounded-sm transition-colors',
                pathname.startsWith(l.href)
                  ? 'text-[#c6ff00] bg-[#c6ff00]/8'
                  : 'text-[#888] hover:text-[#ededed]'
              )}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {profile ? (
            <>
              {/* Messages */}
              <Link href="/messages" className="relative p-2 text-[#555] hover:text-[#ededed] transition-colors">
                <MessageSquare size={17} />
                {unread > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#c6ff00] text-black text-[9px] font-bold flex items-center justify-center">
                    {unread > 9 ? '9+' : unread}
                  </span>
                )}
              </Link>

              {/* Settings */}
              <Link href="/settings/team" className="p-2 text-[#555] hover:text-[#ededed] transition-colors">
                <Settings size={17} />
              </Link>

              {/* Avatar → Dashboard */}
              <Link href="/dashboard" className="flex items-center gap-2 group">
                <span className="hidden sm:block text-xs text-[#555] group-hover:text-[#888] transition-colors">
                  {profile.display_name}
                </span>
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#252525] border border-[#333]">
                  {profile.profile_photo
                    ? <Image src={profile.profile_photo} alt={profile.display_name} width={32} height={32} className="object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[#555]">{profile.display_name?.[0]}</div>
                  }
                </div>
              </Link>
            </>
          ) : (
            <Link href="/auth/login"
              className="text-sm px-4 py-1.5 bg-[#c6ff00] text-black font-medium rounded-sm hover:bg-[#b5ee00] transition-colors">
              Sign In
            </Link>
          )}

          {/* Mobile toggle */}
          <button className="md:hidden text-[#888] hover:text-[#ededed] transition-colors ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#1a1a1a] bg-[#0a0a0a]">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              className={cn(
                'block px-6 py-3 text-sm border-b border-[#1a1a1a] transition-colors',
                pathname.startsWith(l.href) ? 'text-[#c6ff00]' : 'text-[#888]'
              )}>
              {l.label}
            </Link>
          ))}
          {profile && (
            <>
              <Link href="/messages" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-6 py-3 text-sm text-[#888] border-b border-[#1a1a1a]">
                Messages
                {unread > 0 && <span className="w-5 h-5 rounded-full bg-[#c6ff00] text-black text-[10px] font-bold flex items-center justify-center">{unread}</span>}
              </Link>
              <Link href="/settings/team" onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-sm text-[#888] border-b border-[#1a1a1a]">
                Settings
              </Link>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}
                className="block px-6 py-3 text-sm text-[#888]">
                Dashboard
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
