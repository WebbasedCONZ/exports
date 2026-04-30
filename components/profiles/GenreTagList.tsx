import Tag from '@/components/ui/Tag';
import type { Genre } from '@/types';

export default function GenreTagList({ genres, size = 'md' }: { genres: Genre[]; size?: 'sm' | 'md' }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {genres.map((g) => <Tag key={g} genre={g} size={size} />)}
    </div>
  );
}
