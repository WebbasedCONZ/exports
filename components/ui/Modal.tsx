'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({ open, onClose, title, children, className }: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
        <Dialog.Content
          className={cn(
            'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50',
            'bg-[#141414] border border-[#252525] rounded-md shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto',
            'animate-in fade-in zoom-in-95 duration-200',
            className
          )}
        >
          {title && (
            <div className="flex items-center justify-between p-5 border-b border-[#252525]">
              <Dialog.Title className="font-semibold text-base">{title}</Dialog.Title>
              <button onClick={onClose} className="text-[#555] hover:text-[#ededed] transition-colors">
                <X size={18} />
              </button>
            </div>
          )}
          <div className="p-5">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
