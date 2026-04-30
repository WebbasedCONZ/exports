import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export default function Badge({ children, color, className }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-sm border', className)}
      style={color ? { color, borderColor: `${color}40`, backgroundColor: `${color}12` } : undefined}
    >
      {children}
    </span>
  );
}
