import type { Venue } from '@/types';

export default function TechSpecsPanel({ specs }: { specs: Venue['technicalSpecs'] }) {
  const rows = [
    { label: 'Booth Setup', value: specs.boothSetup },
    { label: 'Sound System', value: specs.soundSystem },
    { label: 'Lighting', value: specs.lighting },
    { label: 'Stage Dimensions', value: specs.stagingDimensions },
    { label: 'Monitors', value: specs.monitorSetup },
  ];
  return (
    <div className="divide-y divide-[#1a1a1a]">
      {rows.map((r) => (
        <div key={r.label} className="py-3 grid grid-cols-3 gap-4 text-sm">
          <span className="text-[#555] text-xs font-medium uppercase tracking-wide col-span-1">{r.label}</span>
          <span className="text-[#ccc] col-span-2 leading-relaxed">{r.value}</span>
        </div>
      ))}
    </div>
  );
}
