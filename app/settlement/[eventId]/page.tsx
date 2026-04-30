'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { useContract } from '@/hooks/useContracts';
import { getCollection, upsert, KEYS } from '@/lib/storage';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { formatDate, formatCurrency, statusColor } from '@/lib/utils';
import { contractStatusLabel } from '@/lib/contracts';
import { CheckCircle2, Circle, Download, FileText, DollarSign, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import type { Contract, PaymentInstalment } from '@/types';
import dynamic from 'next/dynamic';

const GigSheetPDF = dynamic(() => import('@/components/settlement/GigSheetPDF'), { ssr: false });

export default function SettlementPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const { user } = useCurrentUser();

  // Find contract by eventId
  const allContracts = getCollection<Contract>(KEYS.contracts);
  const contract = allContracts.find((c) => c.eventId === eventId) ?? null;
  const contractId = contract?.id ?? '';

  const { contract: liveContract, refresh } = useContract(contractId);
  const [signingMode, setSigningMode] = useState(false);
  const [sigName, setSigName] = useState('');
  const [showPDF, setShowPDF] = useState(false);

  const c = liveContract ?? contract;
  if (!c) return <div className="max-w-7xl mx-auto px-6 py-20 text-center text-[#444]"><p>No contract found for this event.</p></div>;

  const isArtist = user?.role === 'artist' || user?.profileId === c.artistId;
  const alreadySigned = isArtist ? !!c.artistSignedAt : !!c.promoterSignedAt;
  const sColor = statusColor(c.status);

  const sign = () => {
    if (!sigName.trim()) return;
    const updated: Contract = {
      ...c,
      ...(isArtist ? { artistSignedAt: new Date().toISOString() } : { promoterSignedAt: new Date().toISOString() }),
      status: c.promoterSignedAt && !c.artistSignedAt ? 'SignedByBoth'
        : c.artistSignedAt && !c.promoterSignedAt ? 'SignedByBoth'
        : isArtist ? 'SignedByArtist' : 'Sent',
      updatedAt: new Date().toISOString(),
    };
    // Recalculate status
    const artistSigned = isArtist ? true : !!c.artistSignedAt;
    const promoterSigned = !isArtist ? true : !!c.promoterSignedAt;
    updated.status = artistSigned && promoterSigned ? 'SignedByBoth' : isArtist ? 'SignedByArtist' : 'Sent';
    upsert(KEYS.contracts, updated);
    refresh();
    setSigningMode(false);
  };

  const togglePayment = (instalmentId: string) => {
    const updated: Contract = {
      ...c,
      paymentInstalments: c.paymentInstalments.map((p) =>
        p.id === instalmentId
          ? { ...p, paid: !p.paid, paidAt: !p.paid ? new Date().toISOString() : undefined }
          : p
      ),
    };
    upsert(KEYS.contracts, updated);
    refresh();
  };

  const totalFee = c.paymentInstalments.reduce((sum, p) => sum + p.amount, 0);
  const totalPaid = c.paymentInstalments.filter((p) => p.paid).reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-6">
        <Link href="/dashboard/contracts" className="text-xs text-[#555] hover:text-[#888] mb-2 block">← Contracts</Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.gigSheet.eventName}</h1>
            <p className="text-[#555] text-sm mt-1">{c.gigSheet.date} — {c.gigSheet.venue}</p>
          </div>
          <span className="text-sm px-3 py-1 rounded-sm border" style={{ color: sColor, borderColor: `${sColor}40`, backgroundColor: `${sColor}10` }}>
            {contractStatusLabel(c)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Gig Sheet */}
          <section className="bg-[#141414] border border-[#252525] rounded-md overflow-hidden">
            <div className="px-5 py-3 border-b border-[#252525] flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] flex items-center gap-2">
                <FileText size={13} /> Gig Sheet
              </h2>
              <button
                onClick={() => setShowPDF(!showPDF)}
                className="flex items-center gap-1.5 text-xs text-[#00d4ff] hover:text-[#00c0e8] transition-colors"
              >
                <Download size={12} /> {showPDF ? 'Hide PDF' : 'Download PDF'}
              </button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ['Artist', c.gigSheet.artistName],
                ['Event', c.gigSheet.eventName],
                ['Date', c.gigSheet.date],
                ['Venue', c.gigSheet.venue],
                ['Set Time', c.gigSheet.slotTime],
                ['Soundcheck', c.gigSheet.soundcheckTime],
                ['Load-In', c.gigSheet.loadInTime],
                ['Fee', `${c.gigSheet.currency} $${c.gigSheet.fee}`],
                ['Advance', `${c.gigSheet.currency} $${c.gigSheet.advanceAmount} (by ${c.gigSheet.advanceDueDate})`],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] uppercase tracking-wide text-[#555] mb-0.5">{k}</p>
                  <p className="text-[#ccc]">{v}</p>
                </div>
              ))}
              <div className="col-span-2">
                <p className="text-[10px] uppercase tracking-wide text-[#555] mb-0.5">Promoter Contact</p>
                <p className="text-[#ccc] text-xs">{c.gigSheet.promoterContact}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] uppercase tracking-wide text-[#555] mb-0.5">Venue Contact</p>
                <p className="text-[#ccc] text-xs">{c.gigSheet.venueContact}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] uppercase tracking-wide text-[#555] mb-0.5">Technical Rider</p>
                <p className="text-[#ccc] text-xs leading-relaxed">{c.gigSheet.technicalRider}</p>
              </div>
              <div className="col-span-2">
                <p className="text-[10px] uppercase tracking-wide text-[#555] mb-0.5">Hospitality Rider</p>
                <p className="text-[#ccc] text-xs leading-relaxed">{c.gigSheet.hospitalityRider}</p>
              </div>
            </div>
            {showPDF && (
              <div className="border-t border-[#252525] p-5">
                <GigSheetPDF contract={c} />
              </div>
            )}
          </section>

          {/* Contract Terms */}
          <section className="bg-[#141414] border border-[#252525] rounded-md overflow-hidden">
            <div className="px-5 py-3 border-b border-[#252525]">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555]">Contract Terms</h2>
            </div>
            <div className="p-5 max-h-72 overflow-y-auto">
              <pre className="text-xs text-[#777] leading-relaxed whitespace-pre-wrap font-sans">{c.termsText}</pre>
            </div>
            <div className="px-5 pb-5">
              {!alreadySigned ? (
                signingMode ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-[#555] mb-1.5 block">Type your full name to agree</label>
                      <input
                        type="text"
                        value={sigName}
                        onChange={(e) => setSigName(e.target.value)}
                        placeholder="Full name..."
                        className="w-full bg-[#1a1a1a] border border-[#252525] rounded-sm px-3 py-2 text-sm text-[#ededed] placeholder-[#444] focus:outline-none focus:border-[#c6ff00]"
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button variant="ghost" onClick={() => setSigningMode(false)}>Cancel</Button>
                      <Button onClick={sign} disabled={!sigName.trim()}>
                        <CheckCircle2 size={14} /> I Agree & Sign
                      </Button>
                    </div>
                  </div>
                ) : (
                  <Button onClick={() => setSigningMode(true)}>
                    <FileText size={14} /> Sign Contract
                  </Button>
                )
              ) : (
                <div className="flex items-center gap-2 text-sm text-[#c6ff00]">
                  <CheckCircle2 size={16} />
                  {isArtist ? `You signed on ${formatDate(c.artistSignedAt!)}` : `You signed on ${formatDate(c.promoterSignedAt!)}`}
                </div>
              )}
            </div>
          </section>

          {/* Signature status */}
          <section className="bg-[#141414] border border-[#252525] rounded-md p-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] mb-3">Signatures</h2>
            <div className="space-y-2">
              {[
                { label: 'Artist', signed: !!c.artistSignedAt, date: c.artistSignedAt },
                { label: 'Promoter', signed: !!c.promoterSignedAt, date: c.promoterSignedAt },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-[#888]">
                    {s.signed ? <CheckCircle2 size={14} className="text-[#c6ff00]" /> : <Circle size={14} className="text-[#333]" />}
                    {s.label}
                  </span>
                  <span className="text-xs text-[#555]">
                    {s.signed ? formatDate(s.date!) : 'Awaiting'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Payment sidebar */}
        <div className="space-y-6">
          <section className="bg-[#141414] border border-[#252525] rounded-md overflow-hidden">
            <div className="px-4 py-3 border-b border-[#252525]">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-[#555] flex items-center gap-2">
                <DollarSign size={13} /> Payment Tracking
              </h2>
            </div>
            <div className="p-4 space-y-4">
              {/* Progress bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#555]">Paid</span>
                  <span className="text-[#c6ff00] font-semibold">{formatCurrency(totalPaid, 'NZD')}</span>
                </div>
                <div className="h-1.5 bg-[#252525] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#c6ff00] transition-all duration-500"
                    style={{ width: totalFee > 0 ? `${(totalPaid / totalFee) * 100}%` : '0%' }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] mt-1 text-[#555]">
                  <span>{totalFee > 0 ? Math.round((totalPaid / totalFee) * 100) : 0}% settled</span>
                  <span>of {formatCurrency(totalFee, 'NZD')}</span>
                </div>
              </div>

              {/* Instalments */}
              <div className="space-y-2">
                {c.paymentInstalments.map((inst: PaymentInstalment) => (
                  <div key={inst.id} className={`p-3 rounded-sm border ${inst.paid ? 'border-[#c6ff00]/20 bg-[#c6ff00]/5' : 'border-[#252525]'}`}>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs font-medium">{inst.label}</span>
                      <span className={`text-xs font-semibold ${inst.paid ? 'text-[#c6ff00]' : 'text-[#ededed]'}`}>
                        {formatCurrency(inst.amount, inst.currency)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[10px] text-[#555]">
                        <Clock size={10} />
                        Due {formatDate(inst.dueDate, { month: 'short', day: 'numeric' })}
                      </div>
                      <button
                        onClick={() => togglePayment(inst.id)}
                        className={`flex items-center gap-1 text-[10px] transition-colors ${
                          inst.paid ? 'text-[#c6ff00]' : 'text-[#555] hover:text-[#888]'
                        }`}
                      >
                        {inst.paid ? <CheckCircle2 size={11} /> : <Circle size={11} />}
                        {inst.paid ? 'Paid' : 'Mark paid'}
                      </button>
                    </div>
                    {inst.paid && inst.paidAt && (
                      <p className="text-[10px] text-[#555] mt-1">
                        {inst.method && `${inst.method} · `}{formatDate(inst.paidAt, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
