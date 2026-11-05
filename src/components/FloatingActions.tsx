import { useEffect, useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { CONTACT } from '@/lib/project';

type FloatingActionsProps = {
  onWhatsApp: () => void;
};

export default function FloatingActions({ onWhatsApp }: FloatingActionsProps) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="card-glass w-60 p-4 animate-fade-up">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-semibold text-white">Contact KB West Walk</span>
            <button onClick={() => setOpen(false)} className="text-navy-300 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-3 space-y-2">
            {CONTACT.phones.map((p) => (
              <a
                key={p}
                href={`tel:${p.replace(/\s/g, '')}`}
                className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm text-navy-100 transition hover:bg-white/10 hover:text-white"
              >
                <Phone className="h-4 w-4 text-gold-300" /> {p}
              </a>
            ))}
            <button
              onClick={onWhatsApp}
              className="flex w-full items-center gap-2 rounded-lg bg-emerald-500/15 px-3 py-2 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/25"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp {CONTACT.whatsappDisplay}
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className={`grid h-14 w-14 place-items-center rounded-full shadow-soft transition ${
          open ? 'bg-navy-800 text-white' : 'bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950'
        }`}
        aria-label="Quick contact"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
