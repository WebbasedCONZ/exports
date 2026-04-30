import { cn } from '@/lib/utils';
import Image from 'next/image';

interface AvatarProps {
  src?: string;
  name: string;
  size?: number;
  className?: string;
}

export default function Avatar({ src, name, size = 40, className }: AvatarProps) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div
      className={cn('rounded-full overflow-hidden flex items-center justify-center bg-[#252525] text-[#888] font-semibold flex-shrink-0', className)}
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {src ? (
        <Image src={src} alt={name} width={size} height={size} className="object-cover w-full h-full" />
      ) : (
        initials
      )}
    </div>
  );
}
