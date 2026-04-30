import { ShieldCheck } from 'lucide-react';

export default function TrustedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-sm border"
      style={{ color: '#ffd700', borderColor: '#ffd70040', backgroundColor: '#ffd70010' }}>
      <ShieldCheck size={12} />
      Trusted Partner
    </span>
  );
}
