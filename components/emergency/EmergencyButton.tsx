'use client';
import { useState } from 'react';
import { useEmergencyStandby } from '@/hooks/useEmergencyStandby';
import { AlertTriangle, Zap, X } from 'lucide-react';

interface Props {
  eventId: string;
  slotId: string;
  slotFee: number;
  currency: string;
  eventCity?: string;
  slotLabel: string;
}

export default function EmergencyButton({ eventId, slotId, slotFee, currency, eventCity, slotLabel }: Props) {
  const { triggerEmergency } = useEmergencyStandby();
  const [open, setOpen] = useState(false);
  const [triggered, setTriggered] = useState(false);
  const [result, setResult] = useState<{ premiumFee: number; notified: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const premiumFee = Math.round(slotFee * 1.2);

  async function handleTrigger() {
    setLoading(true);
    const res = await triggerEmergency(eventId, slotId, slotFee, currency, eventCity);
    setResult(res);
    setTriggered(true);
    setLoading(false);
  }

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#ff4444]/10 border border-[#ff4444]/40 text-[#ff4444] text-xs rounded-sm hover:bg-[#ff4444]/20 transition-colors font-medium">
        <AlertTriangle size={12} />
        DJ Cancelled — Emergency
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4">
          <div className="bg-[#141414] border border-[#ff4444]/30 rounded-md p-6 max-w-md w-full space-y-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle size={18} className="text-[#ff4444]" />
                <h2 className="text-base font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Emergency Standby</h2>
              </div>
              <button onClick={() => setOpen(false)} className="text-[#555] hover:text-[#ededed]"><X size={16} /></button>
            </div>

            {!triggered ? (
              <>
                <div className="bg-[#1a1a1a] border border-[#252525] rounded-sm p-4 space-y-2 text-sm">
                  <p className="text-[#888]">Slot: <span className="text-[#ededed]">{slotLabel}</span></p>
                  <p className="text-[#888]">Original fee: <span className="text-[#ededed]">{currency} {slotFee}</span></p>
                  <p className="text-[#888]">Short-notice premium (20%): <span className="text-[#3d52ff] font-bold">{currency} {premiumFee}</span></p>
                  {eventCity && <p className="text-[#888]">Searching within: <span className="text-[#ededed]">{eventCity} area</span></p>}
                </div>
                <p className="text-xs text-[#555] leading-relaxed">
                  This will instantly blast an alert to all verified DJs marked Available Tonight in your area. First to accept fills the slot.
                </p>
                <button onClick={handleTrigger} disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#ff4444] text-white font-semibold text-sm rounded-sm hover:bg-[#e03030] transition-colors disabled:opacity-50">
                  <Zap size={15} />
                  {loading ? 'Sending alerts...' : 'Trigger Emergency Blast'}
                </button>
              </>
            ) : (
              <div className="text-center space-y-3 py-4">
                <div className="w-12 h-12 rounded-full bg-[#3d52ff]/10 border border-[#3d52ff]/30 flex items-center justify-center mx-auto">
                  <Zap size={20} className="text-[#3d52ff]" />
                </div>
                <p className="font-semibold text-[#ededed]">Emergency blast sent!</p>
                <p className="text-sm text-[#888]">
                  <span className="text-[#3d52ff] font-bold">{result?.notified ?? 0}</span> DJs notified with a {currency} {result?.premiumFee} premium offer.
                </p>
                <p className="text-xs text-[#555]">You'll be notified the moment someone accepts.</p>
                <button onClick={() => setOpen(false)}
                  className="mt-2 px-4 py-2 border border-[#252525] text-sm text-[#555] rounded-sm hover:text-[#ededed] transition-colors">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
