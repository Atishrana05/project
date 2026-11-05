import { Building2, Layers, Factory } from 'lucide-react';
import { BRAND, IMAGES } from '@/lib/project';

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2">
        <div className="reveal">
          <p className="section-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> About the Developer
          </p>
          <h2 className="section-title">{BRAND.developer}</h2>
          <div className="divider-gold my-6" />
          <p className="text-lg leading-relaxed text-navy-100">
            Shree Kunj Bihariji Group has been developing contemporary urban destinations since 2005.
          </p>
          <p className="mt-4 leading-relaxed text-navy-200">
            With a sharp focus on commercial complexes, retail hubs and industrial parks, the group
            crafts destinations that blend architectural intent with everyday usability — creating
            landmarks that live and breathe the city around them.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Building2, title: 'Commercial Complexes', desc: 'Grade-A workplaces & mixed-use towers.' },
              { icon: Layers, title: 'Retail Hubs', desc: 'Destination malls & high-street retail.' },
              { icon: Factory, title: 'Industrial Parks', desc: 'Scalable, infrastructure-ready estates.' },
            ].map((f) => (
              <div key={f.title} className="card-glass p-5">
                <f.icon className="h-6 w-6 text-gold-300" />
                <h3 className="mt-3 font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-1 text-sm text-navy-200">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal grid gap-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 shadow-soft">
            <img
              src={IMAGES.developerTower}
              alt="KB West Walk tower exterior"
              className="h-[420px] w-full object-cover transition-transform duration-700 hover:scale-105"
              loading="lazy"
            />
          </div>
          <p className="text-xs text-navy-300">
            Indicative render. Actual specifications subject to approvals and developer revisions.
          </p>
        </div>
      </div>
    </section>
  );
}
