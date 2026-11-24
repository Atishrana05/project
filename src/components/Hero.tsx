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
          className="hero-scene h-full w-full object-cover object-center animate-kenburns"
          loading="eager"
        />
        <div className="hero-blue-wash absolute inset-0 bg-gradient-to-b from-[#12364b]/85 via-[#12364b]/65 to-[#12364b]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#12364b]/85 via-[#12364b]/35 to-transparent" />
        <div className="hero-depth-grid pointer-events-none absolute inset-0" />
      </div>

      {/* Decorative gold line */}
      <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-center pt-24">
        <div className="container-x max-w-3xl">
          <p className="section-eyebrow !text-white animate-fade-up">
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
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/95 drop-shadow-md animate-fade-up"
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
            className="mt-10 hidden flex-wrap items-center gap-3 text-sm animate-fade-up sm:flex"
            style={{ animationDelay: '320ms' }}
          >
            <a href={`tel:${CONTACT.phones[0]}`} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white px-4 py-2.5 font-semibold text-[#12364b] shadow-lg transition hover:bg-[#eaf2f7]">
              <Phone className="h-4 w-4 text-[#28516a]" /> {CONTACT.phones[0]}
            </a>
            <span className="hidden h-3 w-px bg-white/30" />
            <button onClick={onWhatsApp} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white px-4 py-2.5 font-semibold text-[#12364b] shadow-lg transition hover:bg-[#eaf2f7]">
              <MessageCircle className="h-4 w-4 text-[#28516a]" /> WhatsApp Enquiry
            </button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-navy-200 sm:block">
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
          <span className="h-2 w-1 animate-bounce rounded-full bg-gold-300" />
        </div>
      </div>

      {/* Developer strip */}
      <div className="relative mt-8 border-t border-white/20 bg-[#12364b]/85 backdrop-blur-md sm:absolute sm:bottom-0 sm:inset-x-0 sm:mt-0">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-3 text-center text-xs text-navy-200 sm:flex-row sm:text-left">
          <span>By {BRAND.developer}</span>
          <span className="text-gold-300/90">RERA: {CONTACT.rera}</span>
          <span>{BRAND.website}</span>
        </div>
      </div>
    </section>
  );
}
