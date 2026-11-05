import { Train, Route, MapPin, Plane, HeartPulse, GraduationCap, Info } from 'lucide-react';
import { IMAGES, LOCATION_ADVANTAGES, NEARBY_HOSPITALS, NEARBY_SCHOOLS } from '@/lib/project';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Train, Route, MapPin, Plane,
};

export default function Location() {
  return (
    <section id="location" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img src={IMAGES.locationNight} alt="" className="h-full w-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-navy-950/85" />
      </div>

      <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="reveal">
          <p className="section-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> Location Advantage
          </p>
          <h2 className="section-title">Connected to Everything That Matters</h2>
          <div className="divider-gold my-6" />
          <p className="text-navy-200">
            Strategically located at Ecotech-12, Greater Noida West — with metro, highway and airport
            connectivity woven into the daily commute.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {LOCATION_ADVANTAGES.map((l) => {
              const Icon = ICONS[l.icon] ?? MapPin;
              return (
                <li
                  key={l.title}
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold-400/10 text-gold-300">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white">{l.title}</span>
                    <span className="block text-xs text-navy-200">{l.value}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="card-glass p-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
                <HeartPulse className="h-5 w-5 text-gold-300" /> Nearby Hospitals
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-navy-200">
                {NEARBY_HOSPITALS.map((h) => <li key={h}>· {h}</li>)}
              </ul>
            </div>
            <div className="card-glass p-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
                <GraduationCap className="h-5 w-5 text-gold-300" /> Renowned Schools
              </h3>
              <ul className="mt-3 space-y-1.5 text-sm text-navy-200">
                {NEARBY_SCHOOLS.map((s) => <li key={s}>· {s}</li>)}
              </ul>
            </div>
          </div>

          <p className="mt-6 flex items-start gap-2 text-xs text-navy-300">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Connectivity details are brochure-provided claims. Customers should verify current
            infrastructure and approvals before booking.
          </p>
        </div>

        <div className="reveal overflow-hidden rounded-2xl border border-white/10 shadow-soft">
          <img
            src={IMAGES.location}
            alt="Greater Noida West connectivity"
            className="h-full min-h-[420px] w-full object-cover"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
