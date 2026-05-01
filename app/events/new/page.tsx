'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useVenues } from '@/hooks/useVenues';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useEvents } from '@/hooks/useEvents';
import GenreTagList from '@/components/profiles/GenreTagList';
import Button from '@/components/ui/Button';
import { genreColor, generateId, slugify } from '@/lib/utils';
import { Plus, Trash2, EyeOff } from 'lucide-react';
import type { Event, Slot, Genre, SlotType, Currency } from '@/types';

const ALL_GENRES: Genre[] = ['140', 'UKG', 'Jungle', 'Industrial', 'Techno', 'House', 'Drum & Bass', 'Grime', 'Garage', 'Afrobeats', 'Breaks', 'Footwork', 'Dubstep', 'Ambient', 'Electro'];
const SLOT_TYPES: SlotType[] = ['Opening', 'Warm-up', 'B2B', 'Peak Time', 'Closing', 'Live Act'];

function GenreMultiSelect({ selected, onChange }: { selected: Genre[]; onChange: (g: Genre[]) => void }) {
  const toggle = (g: Genre) => onChange(selected.includes(g) ? selected.filter((x) => x !== g) : [...selected, g]);
  return (
    <div className="flex flex-wrap gap-1.5">
      {ALL_GENRES.map((g) => {
        const active = selected.includes(g);
        const color = genreColor(g);
        return (
          <button key={g} type="button" onClick={() => toggle(g)}
            className="text-[10px] px-2 py-1 rounded-sm border uppercase tracking-wide transition-all"
            style={active ? { color, borderColor: `${color}60`, backgroundColor: `${color}15` } : { color: '#555', borderColor: '#252525' }}>
            {g}
          </button>
        );
      })}
    </div>
  );
}

const emptySlot = (): Partial<Slot> & { id: string } => ({
  id: generateId('slot'),
  slotType: 'Opening',
  startTime: '21:00',
  endTime: '23:00',
  genres: [],
  setDurationMinutes: 120,
  fee: 300,
  currency: 'NZD' as Currency,
  notes: '',
});

export default function NewEventPage() {
  const router = useRouter();
  const { venues } = useVenues();
  const { saveEvent } = useEvents();
  const { user } = useCurrentUser();

  const [title, setTitle] = useState('');
  const [venueId, setVenueId] = useState('');
  const [date, setDate] = useState('');
  const [doorsOpen, setDoorsOpen] = useState('21:00');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [blind, setBlind] = useState(false);
  const [slots, setSlots] = useState([emptySlot()]);
  const [submitted, setSubmitted] = useState(false);

  const inputClass = "w-full bg-[#141414] border border-[#252525] rounded-sm px-3 py-2 text-sm text-[#ededed] placeholder-[#444] focus:outline-none focus:border-[#3a3a3a]";
  const labelClass = "text-xs uppercase tracking-wide text-[#555] mb-1.5 block";

  const updateSlot = (id: string, key: keyof Slot, value: unknown) => {
    setSlots((prev) => prev.map((s) => s.id === id ? { ...s, [key]: value } : s));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !venueId || !date) return;

    const allGenres = Array.from(new Set(slots.flatMap((s) => s.genres ?? []))) as Genre[];

    const newEvent: Event = {
      id: generateId('event'),
      title,
      slug: slugify(title) + '-' + Date.now(),
      promoterId: user?.profileId ?? 'promoter-001',
      venueId,
      date,
      doorsOpen,
      slots: slots as Slot[],
      description,
      posterImageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      genres: allGenres,
      status: 'Open',
      blindApplications: blind,
      applicationDeadline: deadline || date,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveEvent(newEvent);
    setSubmitted(true);
    setTimeout(() => router.push(`/events/${newEvent.slug}`), 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Post a Gig</h1>
      <p className="text-[#555] text-sm mb-8">Create a booking opportunity and receive applications from matched DJs.</p>

      {submitted ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">✓</div>
          <p className="font-semibold text-[#3d52ff] text-lg">Gig posted!</p>
          <p className="text-[#555] text-sm mt-2">Redirecting...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event details */}
          <section className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] pb-2 border-b border-[#1a1a1a]">Event Details</h2>
            <div>
              <label className={labelClass}>Event Name *</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. NightShift Vol. 14" className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Date *</label>
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Doors Open</label>
                <input type="time" value={doorsOpen} onChange={(e) => setDoorsOpen(e.target.value)} className={inputClass} />
              </div>
            </div>
            <div>
              <label className={labelClass}>Venue *</label>
              <select required value={venueId} onChange={(e) => setVenueId(e.target.value)} className={inputClass}>
                <option value="">Select a venue...</option>
                {venues.map((v) => <option key={v.id} value={v.id}>{v.name} — {v.location.city}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the event, vibe, and what you're looking for..." className={`${inputClass} resize-none`} />
            </div>
            <div>
              <label className={labelClass}>Application Deadline</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className={inputClass} />
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div
                onClick={() => setBlind(!blind)}
                className={`w-10 h-5 rounded-full transition-colors ${blind ? 'bg-[#3d52ff]' : 'bg-[#252525]'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white mt-0.5 transition-transform ${blind ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-sm text-[#888] flex items-center gap-1.5">
                <EyeOff size={13} /> Blind applications (hide applicant names from each other)
              </span>
            </label>
          </section>

          {/* Slots */}
          <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#1a1a1a]">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555]">Slots</h2>
              <button type="button" onClick={() => setSlots([...slots, emptySlot()])}
                className="flex items-center gap-1.5 text-xs text-[#3d52ff] hover:text-[#2a3fe0] transition-colors">
                <Plus size={12} /> Add Slot
              </button>
            </div>

            {slots.map((slot, i) => (
              <div key={slot.id} className="bg-[#141414] border border-[#252525] rounded-md p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#555]">Slot {i + 1}</span>
                  {slots.length > 1 && (
                    <button type="button" onClick={() => setSlots(slots.filter((s) => s.id !== slot.id))}
                      className="text-[#ff4444] hover:text-[#ff6666] transition-colors">
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Slot Type</label>
                    <select value={slot.slotType} onChange={(e) => updateSlot(slot.id, 'slotType', e.target.value as SlotType)} className={inputClass}>
                      {SLOT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Duration (min)</label>
                    <input type="number" value={slot.setDurationMinutes} onChange={(e) => updateSlot(slot.id, 'setDurationMinutes', +e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Start Time</label>
                    <input type="time" value={slot.startTime} onChange={(e) => updateSlot(slot.id, 'startTime', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>End Time</label>
                    <input type="time" value={slot.endTime} onChange={(e) => updateSlot(slot.id, 'endTime', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Fee (NZD)</label>
                    <input type="number" value={slot.fee} onChange={(e) => updateSlot(slot.id, 'fee', +e.target.value)} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Genre Requirements</label>
                  <GenreMultiSelect selected={(slot.genres ?? []) as Genre[]} onChange={(g) => updateSlot(slot.id, 'genres', g)} />
                </div>
                <div>
                  <label className={labelClass}>Notes for applicants</label>
                  <input type="text" value={slot.notes} onChange={(e) => updateSlot(slot.id, 'notes', e.target.value)} placeholder="e.g. 'Opening set — build the floor from scratch'" className={inputClass} />
                </div>
              </div>
            ))}
          </section>

          <Button type="submit" size="lg" className="w-full">Post Gig</Button>
        </form>
      )}
    </div>
  );
}
