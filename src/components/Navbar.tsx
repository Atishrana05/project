import { useEffect, useState } from 'react';
import { Menu, X, Building2 } from 'lucide-react';
import { BRAND } from '@/lib/project';

type NavbarProps = {
  onNavigate: (sectionId: string) => void;
  onAdmin: () => void;
};

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'Developer' },
  { id: 'experience', label: 'Experience' },
  { id: 'location', label: 'Location' },
  { id: 'floor-plans', label: 'Floor Plans' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'payment-plans', label: 'Payment Plans' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar({ onNavigate, onAdmin }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-navy-950/90 shadow-soft backdrop-blur-xl'
          : 'bg-gradient-to-b from-navy-950/60 to-transparent'
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between lg:h-20">
        <button onClick={() => go('home')} className="flex items-center gap-3 text-left">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950 shadow-glow-gold">
            <Building2 className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg font-semibold tracking-wide text-white">
              {BRAND.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-gold-300/80">
              Luxury Commercial
            </span>
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => go(l.id)}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-navy-100 transition hover:bg-white/5 hover:text-gold-200"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <button onClick={onAdmin} className="btn-ghost">
            Admin
          </button>
          <button onClick={() => go('enquiry')} className="btn-gold">
            Enquire Now
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-navy-950/95 backdrop-blur-xl lg:hidden">
          <ul className="container-x flex flex-col gap-1 py-4">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-navy-100 hover:bg-white/5 hover:text-gold-200"
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li className="mt-2 flex gap-2">
              <button onClick={onAdmin} className="btn-outline flex-1">Admin</button>
              <button onClick={() => go('enquiry')} className="btn-gold flex-1">Enquire</button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
