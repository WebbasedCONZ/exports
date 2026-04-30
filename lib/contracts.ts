import type { Contract } from '@/types';

export function generateContractText(
  promoterName: string,
  artistName: string,
  eventName: string,
  date: string,
  venue: string,
  slotTime: string,
  fee: number,
  currency: string,
  advanceAmount: number,
  advanceDueDate: string
): string {
  return `This agreement is entered into between ${promoterName} ('Promoter') and ${artistName} ('Artist') for the performance described herein.

1. PERFORMANCE DETAILS
The Artist agrees to perform at ${eventName} at ${venue} on ${date}. Set time: ${slotTime}.

2. FEE
The total performance fee is ${currency} $${fee}, payable as follows: 50% advance (${currency} $${advanceAmount}) by ${advanceDueDate}; 50% balance (${currency} $${fee - advanceAmount}) on the night of performance, paid before the Artist's set.

3. CANCELLATION POLICY
If the Artist cancels with fewer than 14 days notice, the advance is forfeited and the Promoter reserves the right to seek additional compensation for costs incurred. If the Promoter cancels with fewer than 14 days notice, the full agreed fee is payable to the Artist within 7 days.

4. CONDUCT & TECHNICAL REQUIREMENTS
The Artist agrees to arrive at the venue no later than 60 minutes before their set for soundcheck. The Artist's technical rider must be submitted no later than 7 days prior to the event. Any changes to technical requirements after this point are subject to the venue's discretion.

5. NO-SHOW POLICY
Failure to appear for the performance without prior notification constitutes a breach of this agreement. The Promoter reserves the right to pursue recovery of any advance paid and costs associated with the no-show.

6. GOVERNING LAW
This agreement is governed by the laws of New Zealand.

Both parties confirm they have read, understood, and agree to the above terms.`;
}

export function isFullySigned(contract: Contract): boolean {
  return !!(contract.artistSignedAt && contract.promoterSignedAt);
}

export function contractStatusLabel(contract: Contract): string {
  if (contract.status === 'Void') return 'Void';
  if (contract.status === 'SignedByBoth') return 'Fully Signed';
  if (contract.status === 'SignedByArtist') return 'Awaiting Promoter';
  if (contract.status === 'Sent') return 'Awaiting Your Signature';
  if (contract.status === 'Draft') return 'Draft';
  return contract.status;
}
