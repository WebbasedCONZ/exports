'use client';
import { genreColor } from '@/lib/utils';
import type { Genre } from '@/types';

const ALL_GENRES: Genre[] = ['140', 'UKG', 'Jungle', 'Industrial', 'Techno', 'House', 'Drum & Bass', 'Grime', 'Garage', 'Afrobeats', 'Breaks', 'Footwork', 'Dubstep', 'Ambient', 'Electro'];

interface Props {
  selected: Genre[];
  onChange: (genres: Genre[]) => void;
}

export default function GenreFilterBar({ selected, onChange }: Props) {
  const toggle = (g: Genre) => {
    onChange(selected.includes(g) ? selected.filter((x) => x !== g) : [...selected, g]);
  };

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button
        onClick={() => onChange([])}
        className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-sm border transition-all ${
          selected.length === 0
            ? 'border-[#c6ff00]/40 bg-[#c6ff00]/10 text-[#c6ff00]'
            : 'border-[#252525] text-[#555] hover:text-[#888]'
        }`}
      >
        All
      </button>
      {ALL_GENRES.map((g) => {
        const active = selected.includes(g);
        const color = genreColor(g);
        return (
          <button
            key={g}
            onClick={() => toggle(g)}
            className="flex-shrink-0 text-xs px-3 py-1.5 rounded-sm border transition-all uppercase tracking-wide"
            style={
              active
                ? { color, borderColor: `${color}60`, backgroundColor: `${color}15` }
                : { color: '#555', borderColor: '#252525' }
            }
          >
            {g}
          </button>
        );
      })}
    </div>
  );
}
