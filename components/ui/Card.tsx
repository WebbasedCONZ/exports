import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover }: CardProps) {
  return (
    <div
      className={cn(
        'bg-[#141414] border border-[#252525] rounded-md overflow-hidden',
        hover && 'transition-all duration-200 hover:border-[#3a3a3a] hover:bg-[#1a1a1a]',
        className
      )}
    >
      {children}
    </div>
  );
}
