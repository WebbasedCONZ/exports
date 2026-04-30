'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { createClient } from '@/lib/supabase/client';
import { slugify } from '@/lib/utils';

type Step = 'role' | 'login' | 'signup' | 'magic';

export default function LoginPage() {
  const { signIn, signInWithPassword, signUp } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState<Step>('login');
  const [role, setRole] = useState<'artist' | 'promoter' | 'venue'>('artist');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const slug = slugify(displayName) + '-' + Math.random().toString(36).slice(2, 6);
        const { error: err } = await signUp(email, password, { role, display_name: displayName, slug });
        if (err) throw err;
        // After signup, create role-specific record
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          if (role === 'artist') {
            await supabase.from('artists').insert({ profile_id: user.id });
          } else if (role === 'promoter') {
            await supabase.from('promoters').insert({ profile_id: user.id });
          } else {
            await supabase.from('venues').insert({ profile_id: user.id });
          }
        }
        router.push('/dashboard');
      } else {
        const { error: err } = await signInWithPassword(email, password);
        if (err) throw err;
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error: err } = await signIn(email);
    if (err) setError(err.message);
    else setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            EXPORTS
          </h1>
          <p className="text-sm text-[#555]">NZ Underground DJ Platform</p>
        </div>

        <div className="bg-[#141414] border border-[#252525] rounded-md p-6 space-y-5">
          {/* Mode toggle */}
          <div className="flex border border-[#252525] rounded-sm overflow-hidden">
            {(['signin', 'signup'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === m ? 'bg-[#c6ff00] text-black' : 'text-[#555] hover:text-[#ededed]'}`}>
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          {mode === 'signup' && (
            <div>
              <p className="text-xs text-[#555] uppercase tracking-wide mb-3">I am a...</p>
              <div className="grid grid-cols-3 gap-2">
                {(['artist', 'promoter', 'venue'] as const).map(r => (
                  <button key={r} onClick={() => setRole(r)}
                    className={`py-2 text-sm rounded-sm border transition-colors capitalize ${role === r ? 'border-[#c6ff00] text-[#c6ff00] bg-[#c6ff00]/5' : 'border-[#252525] text-[#555] hover:border-[#3a3a3a]'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="text-xs text-[#555] uppercase tracking-wide block mb-1">Display Name</label>
                <input value={displayName} onChange={e => setDisplayName(e.target.value)} required
                  className="w-full bg-[#1a1a1a] border border-[#252525] rounded-sm px-3 py-2 text-sm text-[#ededed] focus:outline-none focus:border-[#c6ff00]"
                  placeholder="Your artist / brand name" />
              </div>
            )}
            <div>
              <label className="text-xs text-[#555] uppercase tracking-wide block mb-1">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-[#1a1a1a] border border-[#252525] rounded-sm px-3 py-2 text-sm text-[#ededed] focus:outline-none focus:border-[#c6ff00]"
                placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-xs text-[#555] uppercase tracking-wide block mb-1">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full bg-[#1a1a1a] border border-[#252525] rounded-sm px-3 py-2 text-sm text-[#ededed] focus:outline-none focus:border-[#c6ff00]"
                placeholder="••••••••" />
            </div>

            {error && <p className="text-xs text-[#ff4444]">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full py-2.5 bg-[#c6ff00] text-black font-semibold text-sm rounded-sm hover:bg-[#b5ee00] transition-colors disabled:opacity-50">
              {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-[#252525]" />
            <span className="text-xs text-[#444]">or</span>
            <div className="flex-1 h-px bg-[#252525]" />
          </div>

          {!sent ? (
            <form onSubmit={handleMagicLink} className="space-y-3">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full bg-[#1a1a1a] border border-[#252525] rounded-sm px-3 py-2 text-sm text-[#ededed] focus:outline-none focus:border-[#00d4ff]"
                placeholder="Magic link — enter email" />
              <button type="submit" disabled={loading}
                className="w-full py-2 border border-[#00d4ff] text-[#00d4ff] text-sm rounded-sm hover:bg-[#00d4ff]/5 transition-colors">
                Send Magic Link
              </button>
            </form>
          ) : (
            <p className="text-sm text-[#c6ff00] text-center">✓ Check your email for a sign-in link</p>
          )}
        </div>
      </div>
    </div>
  );
}
