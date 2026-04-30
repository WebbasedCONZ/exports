import { cn } from '@/lib/utils';

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('bg-[#1a1a1a] rounded-sm animate-pulse', className)} />
  );
}
