import { useEffect, useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Maximize2, Info } from 'lucide-react';
import { FLOOR_PLANS } from '@/lib/project';

export default function FloorPlans() {
  const [active, setActive] = useState<number | null>(null);

  const open = (i: number) => setActive(i);
  const close = () => setActive(null);
  const prev = () => setActive((i) => (i === null ? i : (i - 1 + FLOOR_PLANS.length) % FLOOR_PLANS.length));
  const next = () => setActive((i) => (i === null ? i : (i + 1) % FLOOR_PLANS.length));

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  const enterFullscreen = async () => {
    const el = document.getElementById('lightbox-img');
    if (!el) return;
    try {
      if (!document.fullscreenElement) await el.requestFullscreen();
      else await document.exitFullscreen();
    } catch {
      /* ignore */
    }
  };

  return (
    <section id="floor-plans" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> Floor-Wise Project Plans
          </p>
          <h2 className="section-title">Every Level, Planned with Intent</h2>
          <p className="mt-5 text-navy-200">
            Browse the actual floor plans across all levels of KB West Walk. Tap any plan to zoom and
            view full screen. Drawings are presented as published — not recreated or modified.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FLOOR_PLANS.map((fp, i) => (
            <button
              key={fp.id}
              onClick={() => open(i)}
              className="reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left transition hover:border-gold-400/40"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={fp.image}
                  alt={`${fp.label} floor plan`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
                <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-navy-950/70 text-gold-300 opacity-0 backdrop-blur transition group-hover:opacity-100">
                  <ZoomIn className="h-4 w-4" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-gold-300/80">Level {i + 1}</span>
                <h3 className="font-display text-lg font-semibold text-white">{fp.label}</h3>
              </div>
            </button>
          ))}
        </div>

        <p className="reveal mt-8 flex items-center justify-center gap-2 text-center text-xs text-navy-300">
          <Info className="h-3.5 w-3.5" /> Floor plans are indicative and subject to changes by the
          developer, architect or authorities.
        </p>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/95 p-4 backdrop-blur-sm animate-fade-in"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/10 sm:left-6"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white/10 sm:right-6"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <figure className="max-h-[88vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <div className="overflow-hidden rounded-xl border border-white/10 bg-navy-900">
              <img
                id="lightbox-img"
                src={FLOOR_PLANS[active].image}
                alt={`${FLOOR_PLANS[active].label} floor plan`}
                className="max-h-[78vh] w-full object-contain"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between gap-4">
              <span className="font-display text-lg text-white">{FLOOR_PLANS[active].label}</span>
              <button
                onClick={enterFullscreen}
                className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-4 py-2 text-xs font-semibold text-gold-200 transition hover:bg-gold-400/10"
              >
                <Maximize2 className="h-3.5 w-3.5" /> Fullscreen
              </button>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
