import { Building2, Phone, MapPin, Globe, FileBadge } from 'lucide-react';
import { BRAND, CONTACT } from '@/lib/project';

type FooterProps = {
  onNavigate: (id: string) => void;
  onPrivacy: () => void;
  onBrochure: () => void;
};

export default function Footer({ onNavigate, onPrivacy, onBrochure }: FooterProps) {
  const links = [
    { id: 'about', label: 'Developer' },
    { id: 'experience', label: 'Experience' },
    { id: 'location', label: 'Location' },
    { id: 'floor-plans', label: 'Floor Plans' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'payment-plans', label: 'Payment Plans' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <footer className="border-t border-white/10 bg-navy-950">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950">
                <Building2 className="h-5 w-5" />
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-white">{BRAND.name}</p>
                <p className="text-xs text-gold-300/80">{BRAND.website}</p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-200">
              {BRAND.tagline} — {BRAND.subheadline}
            </p>
            <p className="mt-4 text-xs text-navy-300">
              Promoter: {BRAND.developer}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={onBrochure} className="rounded-full border border-white/15 px-4 py-2 text-xs text-navy-100 transition hover:border-gold-400/40 hover:text-gold-200">
                Download Brochure
              </button>
              <button onClick={onPrivacy} className="rounded-full border border-white/15 px-4 py-2 text-xs text-navy-100 transition hover:border-gold-400/40 hover:text-gold-200">
                Privacy Policy
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-300">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {links.map((l) => (
                <li key={l.id}>
                  <button onClick={() => onNavigate(l.id)} className="text-navy-200 transition hover:text-gold-200">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-gold-300">Reach Us</h4>
            <ul className="mt-4 space-y-3 text-sm text-navy-200">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <span><strong className="text-white">Site:</strong> {CONTACT.siteOffice}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <span><strong className="text-white">Corporate:</strong> {CONTACT.corporateOffice}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-gold-300" />
                <span>{CONTACT.phones.join(' · ')}</span>
              </li>
              <li className="flex items-center gap-2">
                <FileBadge className="h-4 w-4 shrink-0 text-gold-300" />
                <span>RERA: {CONTACT.rera}</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4 shrink-0 text-gold-300" />
                <a href={CONTACT.upReraUrl} target="_blank" rel="noreferrer" className="text-gold-200 underline underline-offset-2">www.up-rera.in</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-xs leading-relaxed text-navy-300">
          <strong className="text-navy-100">Disclaimer:</strong> All specifications, designs, layouts and
          images are indicative and subject to changes by the developer, architect or authorities. The
          price list is for information only and is not an offer. Customers should verify applicable
          approvals, specifications and RERA details before booking. Prices and charges are subject to
          change. This material does not promise guaranteed returns or rental income.
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 text-xs text-navy-300 sm:flex-row">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <span>Promoter ID: {CONTACT.promoterId}</span>
        </div>
      </div>
    </footer>
  );
}
