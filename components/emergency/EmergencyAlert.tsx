'use client';
import { useMyEmergencyAlerts } from '@/hooks/useEmergencyStandby';
import { Zap } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Props {
  artistId: string;
}

export default function EmergencyAlert({ artistId }: Props) {
  const alerts = useMyEmergencyAlerts(artistId);

  if (!alerts.length) return null;

  async function accept(responseId: string, slotId: string) {
    const supabase = createClient();
    await supabase.from('emergency_responses').update({ status: 'Accepted' }).eq('id', responseId);
    // Expire all other responses for the same slot
    await supabase.from('emergency_responses').update({ status: 'Expired' }).eq('slot_id', slotId).neq('id', responseId);
    window.location.reload();
  }

  return (
    <div className="space-y-3 mb-6">
      {alerts.map(alert => {
        const slot = alert.event?.slots?.find((s: any) => s.id === alert.slot_id);
        const promoter = alert.event?.promoter?.profile;
        const minutesAgo = Math.floor((Date.now() - new Date(alert.created_at).getTime()) / 60000);

        return (
          <div key={alert.id} className="bg-[#ff4444]/5 border border-[#ff4444]/30 rounded-md p-4 animate-pulse-once">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ff4444]/20 flex items-center justify-center flex-shrink-0">
                <Zap size={14} className="text-[#ff4444]" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-[#ff4444]">🚨 Emergency Slot — {minutesAgo < 1 ? 'just now' : `${minutesAgo}m ago`}</p>
                <p className="text-sm text-[#ededed] mt-0.5">{alert.event?.title}</p>
                <p className="text-xs text-[#888] mt-0.5">
                  {slot?.slot_type} • {slot?.start_time}–{slot?.end_time} • by {promoter?.display_name}
                </p>
                <p className="text-lg font-bold text-[#c6ff00] mt-2">
                  {slot?.currency} {alert.premium_fee}
                  <span className="text-xs font-normal text-[#888] ml-2">incl. 20% short-notice premium</span>
                </p>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => accept(alert.id, alert.slot_id)}
                    className="flex-1 py-2 bg-[#c6ff00] text-black text-sm font-semibold rounded-sm hover:bg-[#b5ee00] transition-colors">
                    Accept Slot
                  </button>
                  <button className="px-4 py-2 border border-[#252525] text-sm text-[#555] rounded-sm hover:text-[#ededed] transition-colors">
                    Pass
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
