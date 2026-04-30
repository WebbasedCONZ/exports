import { genreColor } from '@/lib/utils';
import type { Genre } from '@/types';

interface TagProps {
  genre: Genre;
  size?: 'sm' | 'md';
}

export default function Tag({ genre, size = 'md' }: TagProps) {
  const color = genreColor(genre);
  return (
    <span
      className={`inline-flex items-center rounded-sm font-medium tracking-wide uppercase ${
        size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1'
      }`}
      style={{ color, backgroundColor: `${color}18`, border: `1px solid ${color}30` }}
    >
      {genre}
    </span>
  );
}
