'use client';
import { useVouchBadges, VOUCH_BADGES } from '@/hooks/useSocialProof';
import { Star } from 'lucide-react';

interface Props {
  artistId: string;
  promoterId?: string;
  eventId?: string;
  canVouch?: boolean;
}

export default function VouchBadges({ artistId, promoterId, eventId, canVouch = false }: Props) {
  const { grouped, addVouch } = useVouchBadges(artistId);

  const hasBadges = Object.keys(grouped).length > 0;

  return (
    <div className="space-y-3">
      {hasBadges && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(grouped).map(([badge, vouches]) => (
            <div key={badge} className="flex items-center gap-1.5 px-2.5 py-1 bg-[#ffd700]/5 border border-[#ffd700]/20 rounded-sm">
              <Star size={10} className="text-[#ffd700]" fill="#ffd700" />
              <span className="text-xs text-[#ffd700]">{badge}</span>
              {(vouches as any[]).length > 1 && (
                <span className="text-[10px] text-[#888]">×{(vouches as any[]).length}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {canVouch && promoterId && eventId && (
        <div>
          <p className="text-[10px] text-[#444] uppercase tracking-wide mb-2">Vouch for this artist</p>
          <div className="flex flex-wrap gap-1.5">
            {VOUCH_BADGES.map(badge => (
              <button key={badge} onClick={() => addVouch(promoterId, badge, eventId)}
                className="px-2 py-1 border border-[#252525] rounded-sm text-xs text-[#555] hover:border-[#ffd700] hover:text-[#ffd700] transition-colors">
                + {badge}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
