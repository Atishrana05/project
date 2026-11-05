import { useEffect, type ReactNode } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
};

export default function Modal({ open, onClose, title, children, maxWidth = 'max-w-lg' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className={`card-glass w-full ${maxWidth} max-h-[88vh] overflow-y-auto p-6 sm:p-8 animate-fade-up`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-xl font-semibold text-white sm:text-2xl">{title}</h2>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-navy-100 transition hover:bg-white/10 hover:text-white" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
