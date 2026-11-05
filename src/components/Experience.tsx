import { ShoppingBag, Sparkles, Film, UtensilsCrossed, Building, Store } from 'lucide-react';
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
              className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="relative h-60 overflow-hidden">
                <img
                  src={it.image}
                  alt={it.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
                <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-navy-950/70 text-gold-300 backdrop-blur">
                  <it.icon className="h-5 w-5" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-white">{it.title}</h3>
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
    </section>
  );
}
