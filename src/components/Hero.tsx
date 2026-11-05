import { ArrowRight, Download, Phone, MessageCircle } from 'lucide-react';
import { BRAND, IMAGES, CONTACT } from '@/lib/project';

type HeroProps = {
  onNavigate: (id: string) => void;
  onBrochure: () => void;
  onWhatsApp: () => void;
};

export default function Hero({ onNavigate, onBrochure, onWhatsApp }: HeroProps) {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroBuilding}
          alt="KB West Walk building render"
          className="h-full w-full object-cover object-center animate-kenburns"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/55 to-navy-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/30 to-transparent" />
      </div>

      {/* Decorative gold line */}
      <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-24">
        <div className="container-x max-w-3xl">
          <p className="section-eyebrow animate-fade-up">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Greater Noida West · Ecotech-12
          </p>
          <h1
            className="font-display text-5xl font-semibold leading-[1.05] text-white sm:text-6xl lg:text-7xl animate-fade-up"
            style={{ animationDelay: '80ms' }}
          >
            {BRAND.tagline}
          </h1>
          <p
            className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100 animate-fade-up"
            style={{ animationDelay: '160ms' }}
          >
            {BRAND.subheadline}
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-3 animate-fade-up"
            style={{ animationDelay: '240ms' }}
          >
            <button onClick={() => onNavigate('experience')} className="btn-gold">
              Explore Project <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={onBrochure} className="btn-outline">
              <Download className="h-4 w-4" /> Download Brochure
            </button>
            <button onClick={() => onNavigate('enquiry')} className="btn-outline">
              Enquire Now
            </button>
          </div>

          {/* Quick contact strip */}
          <div
            className="mt-10 flex flex-wrap items-center gap-4 text-sm text-navy-200 animate-fade-up"
            style={{ animationDelay: '320ms' }}
          >
            <a href={`tel:${CONTACT.phones[0]}`} className="inline-flex items-center gap-2 transition hover:text-gold-200">
              <Phone className="h-4 w-4 text-gold-300" /> {CONTACT.phones[0]}
            </a>
            <span className="h-3 w-px bg-white/15" />
            <button onClick={onWhatsApp} className="inline-flex items-center gap-2 transition hover:text-gold-200">
              <MessageCircle className="h-4 w-4 text-gold-300" /> WhatsApp Enquiry
            </button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-navy-200">
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
          <span className="h-2 w-1 animate-bounce rounded-full bg-gold-300" />
        </div>
      </div>

      {/* Developer strip */}
      <div className="absolute bottom-0 inset-x-0 border-t border-white/10 bg-navy-950/70 backdrop-blur-md">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-3 text-center text-xs text-navy-200 sm:flex-row sm:text-left">
          <span>By {BRAND.developer}</span>
          <span className="text-gold-300/90">RERA: {CONTACT.rera}</span>
          <span>{BRAND.website}</span>
        </div>
      </div>
    </section>
  );
}
