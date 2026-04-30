'use client';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useContracts } from '@/hooks/useContracts';
import { formatDate, formatCurrency, statusColor } from '@/lib/utils';
import { contractStatusLabel } from '@/lib/contracts';
import { FileText, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ContractsPage() {
  const { user } = useCurrentUser();
  const { contracts } = useContracts(user?.profileId);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <Link href="/dashboard" className="text-xs text-[#555] hover:text-[#888] mb-2 block">← Dashboard</Link>
        <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Contracts</h1>
        <p className="text-[#555] text-sm mt-1">Your booking agreements and digital contracts.</p>
      </div>

      {contracts.length === 0 ? (
        <div className="text-center py-20 text-[#444]">
          <FileText size={32} className="mx-auto mb-4 opacity-30" />
          <p className="text-sm">No contracts yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {contracts.map((c) => {
            const sColor = statusColor(c.status);
            const label = contractStatusLabel(c);
            const totalPaid = c.paymentInstalments.filter((p) => p.paid).reduce((sum, p) => sum + p.amount, 0);
            const totalFee = c.paymentInstalments.reduce((sum, p) => sum + p.amount, 0);

            return (
              <Link key={c.id} href={`/settlement/${c.eventId}`} className="block bg-[#141414] border border-[#252525] rounded-md p-4 hover:border-[#3a3a3a] transition-all">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <FileText size={14} className="text-[#555]" />
                      <span className="font-semibold text-sm">{c.gigSheet.eventName}</span>
                      <span className="text-xs px-2 py-0.5 rounded-sm border"
                        style={{ color: sColor, borderColor: `${sColor}40`, backgroundColor: `${sColor}10` }}>
                        {label}
                      </span>
                    </div>
                    <div className="text-xs text-[#555] space-y-0.5">
                      <p>{c.gigSheet.date} — {c.gigSheet.slotTime}</p>
                      <p>{c.gigSheet.venue}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[#c6ff00] font-semibold">{formatCurrency(totalFee, 'NZD')}</p>
                    <p className="text-xs text-[#555] mt-1">
                      Paid: {formatCurrency(totalPaid, 'NZD')}
                    </p>
                    {c.status === 'SignedByBoth' && (
                      <div className="flex items-center gap-1 text-[10px] text-[#c6ff00] mt-1 justify-end">
                        <CheckCircle size={10} /> Fully signed
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
