'use client';
import { useState } from 'react';
import { useFeeNegotiation } from '@/hooks/useFeeNegotiation';
import { useAuth } from '@/hooks/useAuth';
import { DollarSign, Check, X, ArrowRight } from 'lucide-react';

interface Props {
  applicationId: string;
  originalFee: number;
  currency: string;
}

export default function FeeNegotiation({ applicationId, originalFee, currency }: Props) {
  const { profile } = useAuth();
  const { negotiations, latestOffer, agreedFee, proposeOffer, acceptOffer, rejectOffer } = useFeeNegotiation(applicationId);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [showing, setShowing] = useState(false);

  if (!profile) return null;

  const isMyOffer = latestOffer?.proposed_by === profile.id;
  const canRespond = latestOffer?.status === 'Pending' && !isMyOffer;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-[#555] uppercase tracking-wide">Fee Negotiation</p>
        {!agreedFee && (
          <button onClick={() => setShowing(!showing)}
            className="text-xs text-[#c6ff00] hover:underline">
            {showing ? 'Hide' : 'Make Offer'}
          </button>
        )}
      </div>

      {/* Original fee */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[#555]">Original:</span>
        <span className="text-[#ededed]">{currency} {originalFee}</span>
      </div>

      {/* Negotiation history */}
      {negotiations.length > 0 && (
        <div className="space-y-2">
          {negotiations.map((n, i) => (
            <div key={n.id} className={`flex items-center gap-2 text-xs py-2 px-3 rounded-sm border ${
              n.status === 'Accepted' ? 'border-[#c6ff00]/30 bg-[#c6ff00]/5' :
              n.status === 'Rejected' ? 'border-[#ff4444]/20 bg-[#ff4444]/5' :
              'border-[#252525] bg-[#1a1a1a]'
            }`}>
              <DollarSign size={11} className={n.status === 'Accepted' ? 'text-[#c6ff00]' : 'text-[#555]'} />
              <span className={n.status === 'Accepted' ? 'text-[#c6ff00] font-semibold' : 'text-[#ededed]'}>
                {currency} {n.amount}
              </span>
              <span className="text-[#555]">by {n.proposed_by_profile?.display_name ?? 'You'}</span>
              {n.note && <span className="text-[#444] italic">— {n.note}</span>}
              <span className={`ml-auto text-[10px] px-1.5 py-0.5 rounded-sm ${
                n.status === 'Accepted' ? 'bg-[#c6ff00]/20 text-[#c6ff00]' :
                n.status === 'Rejected' ? 'bg-[#ff4444]/20 text-[#ff4444]' :
                n.status === 'Countered' ? 'text-[#555]' :
                'bg-[#252525] text-[#888]'
              }`}>{n.status}</span>
            </div>
          ))}
        </div>
      )}

      {/* Agreed fee banner */}
      {agreedFee && (
        <div className="flex items-center gap-2 p-3 bg-[#c6ff00]/10 border border-[#c6ff00]/30 rounded-sm">
          <Check size={14} className="text-[#c6ff00]" />
          <span className="text-sm font-semibold text-[#c6ff00]">Agreed: {currency} {agreedFee.amount}</span>
        </div>
      )}

      {/* Respond to offer */}
      {canRespond && (
        <div className="flex gap-2">
          <button onClick={() => acceptOffer(latestOffer.id)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#c6ff00] text-black text-xs font-semibold rounded-sm">
            <Check size={12} /> Accept {currency} {latestOffer.amount}
          </button>
          <button onClick={() => { rejectOffer(latestOffer.id); }}
            className="px-3 py-2 border border-[#ff4444]/30 text-[#ff4444] text-xs rounded-sm hover:bg-[#ff4444]/5 transition-colors">
            <X size={12} />
          </button>
        </div>
      )}

      {/* Make/counter offer */}
      {showing && !agreedFee && !canRespond && (
        <div className="space-y-2 bg-[#1a1a1a] border border-[#252525] rounded-sm p-3">
          <p className="text-xs text-[#555]">{latestOffer ? 'Counter offer' : 'Propose a fee'}</p>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 flex-1 bg-[#0a0a0a] border border-[#252525] rounded-sm px-2">
              <span className="text-xs text-[#555]">{currency}</span>
              <input type="number" value={amount} onChange={e => setAmount(e.target.value)}
                placeholder={originalFee.toString()}
                className="flex-1 bg-transparent py-2 text-sm text-[#ededed] focus:outline-none" />
            </div>
          </div>
          <input value={note} onChange={e => setNote(e.target.value)}
            placeholder="Add a note (optional)"
            className="w-full bg-[#0a0a0a] border border-[#252525] rounded-sm px-2 py-1.5 text-xs text-[#ededed] focus:outline-none focus:border-[#c6ff00]" />
          <button onClick={() => { proposeOffer(profile.id, Number(amount), currency, note || undefined); setShowing(false); setAmount(''); setNote(''); }}
            disabled={!amount}
            className="w-full flex items-center justify-center gap-1.5 py-2 bg-[#c6ff00] text-black text-xs font-semibold rounded-sm disabled:opacity-40">
            <ArrowRight size={12} /> Send Offer
          </button>
        </div>
      )}
    </div>
  );
}
