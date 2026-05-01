'use client';
import { useState } from 'react';
import { useTouringWindows } from '@/hooks/useTouringStatus';
import { MapPin, Plus, X, Plane } from 'lucide-react';

interface Props {
  artistId: string;
  editable?: boolean;
}

export default function TouringStatus({ artistId, editable = false }: Props) {
  const { windows, activeNow, addWindow, removeWindow } = useTouringWindows(artistId);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ city: '', country: '', date_from: '', date_to: '' });

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await addWindow(form);
    setForm({ city: '', country: '', date_from: '', date_to: '' });
    setAdding(false);
  }

  if (!editable && windows.length === 0) return null;

  return (
    <div className="space-y-3">
      {activeNow.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeNow.map(w => (
            <span key={w.id} className="flex items-center gap-1.5 px-2.5 py-1 bg-[#00d4ff]/10 border border-[#00d4ff]/30 rounded-sm text-xs text-[#00d4ff] font-medium">
              <Plane size={11} />
              Touring: {w.city}
            </span>
          ))}
        </div>
      )}

      {editable && (
        <div className="space-y-2">
          {windows.map(w => (
            <div key={w.id} className="flex items-center justify-between bg-[#1a1a1a] border border-[#252525] rounded-sm px-3 py-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={12} className="text-[#00d4ff]" />
                <span className="text-[#ededed]">{w.city}, {w.country}</span>
                <span className="text-[#555] text-xs">{w.date_from} → {w.date_to}</span>
              </div>
              <button onClick={() => removeWindow(w.id)} className="text-[#444] hover:text-[#ff4444] transition-colors">
                <X size={13} />
              </button>
            </div>
          ))}

          {!adding ? (
            <button onClick={() => setAdding(true)}
              className="flex items-center gap-1.5 text-xs text-[#555] hover:text-[#3d52ff] transition-colors">
              <Plus size={13} /> Add touring window
            </button>
          ) : (
            <form onSubmit={handleAdd} className="bg-[#1a1a1a] border border-[#252525] rounded-sm p-3 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <input value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} required
                  placeholder="City" className="bg-[#0a0a0a] border border-[#252525] rounded-sm px-2 py-1.5 text-sm text-[#ededed] focus:outline-none focus:border-[#00d4ff]" />
                <input value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} required
                  placeholder="Country" className="bg-[#0a0a0a] border border-[#252525] rounded-sm px-2 py-1.5 text-sm text-[#ededed] focus:outline-none focus:border-[#00d4ff]" />
                <input type="date" value={form.date_from} onChange={e => setForm(f => ({ ...f, date_from: e.target.value }))} required
                  className="bg-[#0a0a0a] border border-[#252525] rounded-sm px-2 py-1.5 text-sm text-[#ededed] focus:outline-none focus:border-[#00d4ff]" />
                <input type="date" value={form.date_to} onChange={e => setForm(f => ({ ...f, date_to: e.target.value }))} required
                  className="bg-[#0a0a0a] border border-[#252525] rounded-sm px-2 py-1.5 text-sm text-[#ededed] focus:outline-none focus:border-[#00d4ff]" />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="flex-1 py-1.5 bg-[#3d52ff] text-black text-xs font-semibold rounded-sm">Save</button>
                <button type="button" onClick={() => setAdding(false)} className="px-3 py-1.5 border border-[#252525] text-xs text-[#555] rounded-sm">Cancel</button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
