import { cn } from '@/lib/utils';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed',
          {
            'bg-[#3d52ff] text-black hover:bg-[#2a3fe0] active:scale-95': variant === 'primary',
            'bg-[#1a1a1a] text-[#ededed] border border-[#252525] hover:border-[#3a3a3a] hover:bg-[#222]': variant === 'secondary',
            'bg-transparent text-[#888] hover:text-[#ededed] hover:bg-[#1a1a1a]': variant === 'ghost',
            'bg-transparent border border-[#252525] text-[#ededed] hover:border-[#3d52ff] hover:text-[#3d52ff]': variant === 'outline',
            'bg-[#ff4444]/10 text-[#ff4444] border border-[#ff4444]/20 hover:bg-[#ff4444]/20': variant === 'danger',
          },
          {
            'text-xs px-3 py-1.5 gap-1.5': size === 'sm',
            'text-sm px-4 py-2 gap-2': size === 'md',
            'text-base px-6 py-3 gap-2.5': size === 'lg',
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
export default Button;
