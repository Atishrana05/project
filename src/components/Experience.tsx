import { useEffect, useState } from 'react';
import { ShoppingBag, Sparkles, Film, UtensilsCrossed, Building, Store, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { IMAGES } from '@/lib/project';

type ExperienceProps = {
  onEnquire: () => void;
};

const ITEMS = [
  {
    icon: ShoppingBag,
    image: IMAGES.experience.mall,
    title: 'Five Levels of Retail',
    desc: 'A fully air-conditioned shopping mall and retail experience spread across five levels — designed for discovery and dwell time.',
  },
  {
    icon: Store,
    image: IMAGES.experience.atrium,
    title: 'Atrium-Facing Retail',
    desc: 'Atrium-facing shopfronts maximise visibility and footfall, putting every brand at the centre of the action.',
  },
  {
    icon: Film,
    image: IMAGES.experience.multiplex,
    title: 'Multiplex with Premium Concessions',
    desc: 'A multiplex experience with premium concessions, designed for comfort and the best sightlines in the house.',
  },
  {
    icon: UtensilsCrossed,
    image: IMAGES.experience.foodCourt,
    title: 'Food Court & Rooftop Restaurants',
    desc: 'A vibrant food court paired with rooftop restaurants for memorable evenings under the open sky.',
  },
  {
    icon: Building,
    image: IMAGES.experience.studios,
    title: 'State-of-the-Art Studio Apartments',
    desc: 'Modern studio apartments engineered for live-work convenience and a premium urban lifestyle.',
  },
  {
    icon: Sparkles,
    image: IMAGES.experience.retail,
    title: 'Curated Brands & Boutiques',
    desc: 'A hand-picked mix of brands and boutiques creates a destination that keeps visitors coming back.',
  },
];

export default function Experience({ onEnquire }: ExperienceProps) {
  const [activeImage, setActiveImage] = useState<number | null>(null);
  const closeImage = () => setActiveImage(null);
  const previousImage = () => setActiveImage((index) => index === null ? null : (index - 1 + ITEMS.length) % ITEMS.length);
  const nextImage = () => setActiveImage((index) => index === null ? null : (index + 1) % ITEMS.length);

  useEffect(() => {
    if (activeImage === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeImage();
      if (event.key === 'ArrowLeft') previousImage();
      if (event.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [activeImage]);

  return (
    <section id="experience" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> Project Experience
          </p>
          <h2 className="section-title">Where Retail, Leisure & Living Converge</h2>
          <p className="mt-5 text-navy-200">
            KB West Walk brings together five levels of fully air-conditioned shopping, atrium-facing
            retail, a premium multiplex, rooftop dining and state-of-the-art studios — one destination,
            many stories.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((it) => (
            <article
              key={it.title}
              className="reveal feature-card group relative overflow-hidden rounded-2xl border border-[#28516a]/15 bg-white text-left"
            >
              <button type="button"
                onClick={() => setActiveImage(ITEMS.findIndex((item) => item.title === it.title))}
                className="experience-image group/image relative block h-60 w-full overflow-hidden text-left"
                aria-label={"View larger image: " + it.title}
              >
                <img src={it.image} alt={it.title} className="h-full w-full object-cover transition-transform duration-700 group-hover/image:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#08283b]/85 via-[#08283b]/10 to-[#08283b]/20" />
                <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/95 text-[#174765] shadow-lg"><it.icon className="h-5 w-5" /></div>
                <span className="absolute bottom-4 left-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-white">Illustrative visual</span>
                <span className="absolute bottom-3 right-4 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-[#174765] shadow-lg"><Maximize2 className="h-4 w-4" /></span>
              </button>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-[#12364b]">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-200">{it.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <button onClick={onEnquire} className="btn-gold">
            Enquire About Availability
          </button>
        </div>
      </div>
      {activeImage !== null && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#061b29]/95 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={ITEMS[activeImage].title} onClick={closeImage}>
          <button type="button" onClick={closeImage} className="absolute right-5 top-5 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20" aria-label="Close image"><X className="h-6 w-6" /></button>
          <button type="button" onClick={(event) => { event.stopPropagation(); previousImage(); }} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:left-8" aria-label="Previous image"><ChevronLeft className="h-7 w-7" /></button>
          <div className="w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <img src={ITEMS[activeImage].image} alt={ITEMS[activeImage].title} className="max-h-[76vh] w-full rounded-2xl object-contain shadow-2xl" />
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-white">
              <div><p className="font-display text-xl">{ITEMS[activeImage].title}</p><p className="mt-1 text-xs text-white/65">Illustrative visual — not a confirmed project interior or architectural render.</p></div>
              <span className="text-sm text-white/70">{activeImage + 1} / {ITEMS.length}</span>
            </div>
          </div>
          <button type="button" onClick={(event) => { event.stopPropagation(); nextImage(); }} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:right-8" aria-label="Next image"><ChevronRight className="h-7 w-7" /></button>
        </div>
      )}
    </section>
  );
}
