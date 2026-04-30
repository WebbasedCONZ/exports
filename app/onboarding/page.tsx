'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { upsert, KEYS } from '@/lib/storage';
import { generateId, slugify, genreColor } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Music2, Users, MapPin, ArrowRight, Check } from 'lucide-react';
import type { Artist, Promoter, UserRole, Genre, Equipment } from '@/types';

const ALL_GENRES: Genre[] = ['140', 'UKG', 'Jungle', 'Industrial', 'Techno', 'House', 'Drum & Bass', 'Grime', 'Garage', 'Afrobeats', 'Breaks', 'Footwork', 'Dubstep', 'Ambient', 'Electro'];
const ALL_EQUIPMENT: Equipment[] = ['CDJ-3000s', 'CDJ-2000NXS2', 'Vinyl', 'Controller', 'Ableton', 'Modular'];

function GenrePicker({ selected, onChange }: { selected: Genre[]; onChange: (g: Genre[]) => void }) {
  const toggle = (g: Genre) => onChange(selected.includes(g) ? selected.filter((x) => x !== g) : [...selected, g]);
  return (
    <div className="flex flex-wrap gap-2">
      {ALL_GENRES.map((g) => {
        const active = selected.includes(g);
        const color = genreColor(g);
        return (
          <button key={g} type="button" onClick={() => toggle(g)}
            className="text-xs px-3 py-1.5 rounded-sm border uppercase tracking-wide transition-all"
            style={active ? { color, borderColor: `${color}60`, backgroundColor: `${color}15` } : { color: '#555', borderColor: '#252525' }}>
            {g}
          </button>
        );
      })}
    </div>
  );
}

export default function OnboardingPage() {
  const router = useRouter();
  const { switchUser } = useCurrentUser();
  const [step, setStep] = useState<'role' | 'profile' | 'done'>('role');
  const [role, setRole] = useState<UserRole | null>(null);

  // Artist fields
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [experience, setExperience] = useState('Emerging');
  const [fee, setFee] = useState(200);
  const [gender, setGender] = useState('Prefer not to say');

  // Promoter fields
  const [promoName, setPromoName] = useState('');
  const [promoCity, setPromoCity] = useState('');
  const [promoBio, setPromoBio] = useState('');
  const [promoGenres, setPromoGenres] = useState<Genre[]>([]);

  const inputClass = "w-full bg-[#141414] border border-[#252525] rounded-sm px-3 py-2 text-sm text-[#ededed] placeholder-[#444] focus:outline-none focus:border-[#3a3a3a]";
  const labelClass = "text-xs uppercase tracking-wide text-[#555] mb-1.5 block";

  const handleSubmit = () => {
    const id = generateId(role ?? 'artist');
    const photoUrl = 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&q=80';

    if (role === 'artist') {
      const artist: Artist = {
        id,
        displayName: name,
        slug: slugify(name) + '-' + Date.now(),
        bio,
        location: { city, country: 'New Zealand' },
        profilePhoto: photoUrl,
        photoGallery: [],
        genres,
        experienceLevel: experience as Artist['experienceLevel'],
        genderIdentity: gender as Artist['genderIdentity'],
        equipment,
        embeds: [],
        fee: { minimum: fee, currency: 'NZD', negotiable: true },
        availability: [],
        socialLinks: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      upsert(KEYS.artists, artist);
      switchUser({ role: 'artist', profileId: id, displayName: name, profilePhoto: photoUrl });
    } else if (role === 'promoter') {
      const promoter: Promoter = {
        id,
        displayName: promoName,
        slug: slugify(promoName) + '-' + Date.now(),
        bio: promoBio,
        location: { city: promoCity, country: 'New Zealand' },
        profilePhoto: photoUrl,
        pastEventsGallery: [],
        preferences: { preferredGenres: promoGenres, preferredLocations: [promoCity], preferredGenderIdentities: [], preferredExperienceLevels: [] },
        trustedPartner: false,
        totalEventsHosted: 0,
        socialLinks: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      upsert(KEYS.promoters, promoter);
      switchUser({ role: 'promoter', profileId: id, displayName: promoName, profilePhoto: photoUrl });
    }
    setStep('done');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      {step === 'role' && (
        <div>
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Join EXPORTS</h1>
          <p className="text-[#555] text-sm mb-10">Choose how you use the platform.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { role: 'artist' as UserRole, icon: <Music2 size={28} />, title: 'I\'m a DJ / Artist', desc: 'Create a profile, showcase your mixes, apply for gigs, and manage bookings and contracts.' },
              { role: 'promoter' as UserRole, icon: <Users size={28} />, title: 'I\'m a Promoter', desc: 'Post gig opportunities, review and shortlist applicants, issue contracts and track payment.' },
            ].map((opt) => (
              <button
                key={opt.role}
                onClick={() => { setRole(opt.role); setStep('profile'); }}
                className={`text-left p-6 bg-[#141414] border rounded-md hover:border-[#c6ff00]/40 transition-all group ${role === opt.role ? 'border-[#c6ff00]/40' : 'border-[#252525]'}`}
              >
                <div className="text-[#c6ff00] mb-4">{opt.icon}</div>
                <h3 className="font-semibold text-base mb-2 group-hover:text-[#c6ff00] transition-colors">{opt.title}</h3>
                <p className="text-xs text-[#555] leading-relaxed">{opt.desc}</p>
                <div className="mt-4 flex items-center gap-1 text-xs text-[#555] group-hover:text-[#c6ff00] transition-colors">
                  Get started <ArrowRight size={12} />
                </div>
              </button>
            ))}
          </div>
          <div className="text-center">
            <p className="text-xs text-[#444]">Also looking for venue listings?</p>
            <button onClick={() => { setRole('venue'); setStep('done'); }} className="text-xs text-[#555] hover:text-[#888] mt-1 flex items-center gap-1 mx-auto">
              <MapPin size={11} /> Register as a venue (coming soon)
            </button>
          </div>
        </div>
      )}

      {step === 'profile' && role === 'artist' && (
        <div>
          <button onClick={() => setStep('role')} className="text-xs text-[#555] hover:text-[#888] mb-6 block">← Back</button>
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Create Artist Profile</h1>
          <p className="text-[#555] text-sm mb-8">This is what promoters and venues will see.</p>
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Artist / DJ Name *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your stage name" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>City *</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Auckland" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Bio</label>
              <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell promoters about your style, background, and sound..." className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Genres</label>
              <GenrePicker selected={genres} onChange={setGenres} />
            </div>
            <div>
              <label className={labelClass}>Equipment</label>
              <div className="flex flex-wrap gap-2">
                {ALL_EQUIPMENT.map((e) => {
                  const active = equipment.includes(e);
                  return (
                    <button key={e} type="button" onClick={() => setEquipment(active ? equipment.filter((x) => x !== e) : [...equipment, e])}
                      className={`text-xs px-3 py-1.5 rounded-sm border transition-all ${active ? 'border-[#c6ff00]/40 bg-[#c6ff00]/10 text-[#c6ff00]' : 'border-[#252525] text-[#555]'}`}>
                      {e}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Experience Level</label>
                <select value={experience} onChange={(e) => setExperience(e.target.value)} className={inputClass}>
                  {['Emerging', 'Mid-level', 'Established', 'Headliner'].map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label className={labelClass}>Minimum Fee (NZD)</label>
                <input type="number" value={fee} onChange={(e) => setFee(+e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Gender Identity</label>
              <select value={gender} onChange={(e) => setGender(e.target.value)} className={inputClass}>
                {['Man', 'Woman', 'Non-binary', 'Prefer not to say'].map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <Button size="lg" className="w-full" onClick={handleSubmit} disabled={!name || !city}>
              Create Profile
            </Button>
          </div>
        </div>
      )}

      {step === 'profile' && role === 'promoter' && (
        <div>
          <button onClick={() => setStep('role')} className="text-xs text-[#555] hover:text-[#888] mb-6 block">← Back</button>
          <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Create Promoter Profile</h1>
          <p className="text-[#555] text-sm mb-8">Artists and venues will use this to understand your brand.</p>
          <div className="space-y-5">
            <div>
              <label className={labelClass}>Collective / Brand Name *</label>
              <input type="text" value={promoName} onChange={(e) => setPromoName(e.target.value)} placeholder="Your event brand" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>City *</label>
              <input type="text" value={promoCity} onChange={(e) => setPromoCity(e.target.value)} placeholder="Auckland" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Bio</label>
              <textarea rows={3} value={promoBio} onChange={(e) => setPromoBio(e.target.value)} placeholder="Describe your events, your vibe, and what you look for in artists..." className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Preferred Genres</label>
              <GenrePicker selected={promoGenres} onChange={setPromoGenres} />
            </div>
            <Button size="lg" className="w-full" onClick={handleSubmit} disabled={!promoName || !promoCity}>
              Create Profile
            </Button>
          </div>
        </div>
      )}

      {step === 'done' && (
        <div className="text-center py-10">
          <div className="w-16 h-16 rounded-full bg-[#c6ff00]/10 border border-[#c6ff00]/30 flex items-center justify-center mx-auto mb-6">
            <Check size={28} className="text-[#c6ff00]" />
          </div>
          <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>You're on EXPORTS</h1>
          <p className="text-[#555] text-sm mb-8">Your profile is live. Start exploring the platform.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
            <Button variant="outline" onClick={() => router.push('/events')}>Browse Gigs</Button>
          </div>
        </div>
      )}
    </div>
  );
}
