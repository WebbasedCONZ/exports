import { CheckCircle2, Disc3, Music2, Cpu, Sliders, Radio } from 'lucide-react';
import type { Equipment } from '@/types';

const icons: Record<Equipment, React.ReactNode> = {
  'CDJ-3000s': <Disc3 size={14} />,
  'CDJ-2000NXS2': <Disc3 size={14} />,
  'Vinyl': <Music2 size={14} />,
  'Controller': <Sliders size={14} />,
  'Ableton': <Cpu size={14} />,
  'Modular': <Radio size={14} />,
};

export default function EquipmentChecklist({ equipment }: { equipment: Equipment[] }) {
  const all: Equipment[] = ['CDJ-3000s', 'CDJ-2000NXS2', 'Vinyl', 'Controller', 'Ableton', 'Modular'];
  return (
    <div className="grid grid-cols-2 gap-2">
      {all.map((e) => {
        const proficient = equipment.includes(e);
        return (
          <div
            key={e}
            className={`flex items-center gap-2 text-xs px-3 py-2 rounded-sm border ${
              proficient
                ? 'border-[#3d52ff]/20 bg-[#3d52ff]/5 text-[#3d52ff]'
                : 'border-[#252525] text-[#444]'
            }`}
          >
            {proficient ? <CheckCircle2 size={13} /> : icons[e]}
            <span>{e}</span>
          </div>
        );
      })}
    </div>
  );
}
