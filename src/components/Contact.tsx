import { Phone, MessageCircle, Mail, MapPin, FileBadge, Globe } from 'lucide-react';
import { CONTACT, BRAND } from '@/lib/project';
import EnquiryForm from './EnquiryForm';

type ContactProps = {
  onWhatsApp: () => void;
};

export default function Contact({ onWhatsApp }: ContactProps) {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-2">
        <div className="reveal">
          <p className="section-eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> Contact & RERA
          </p>
          <h2 className="section-title">Let's Talk</h2>
          <div className="divider-gold my-6" />

          <div className="space-y-4">
            <div className="card-glass p-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
                <Phone className="h-5 w-5 text-gold-300" /> Call Us
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {CONTACT.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="rounded-full border border-white/15 px-4 py-2 text-sm text-navy-100 transition hover:border-gold-400/40 hover:text-gold-200">
                    {p}
                  </a>
                ))}
              </div>
              <button onClick={onWhatsApp} className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-5 py-2.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/25">
                <MessageCircle className="h-4 w-4" /> WhatsApp: {CONTACT.whatsappDisplay}
              </button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="card-glass p-5">
                <h3 className="flex items-center gap-2 font-display text-base font-semibold text-white">
                  <MapPin className="h-4 w-4 text-gold-300" /> Site Office
                </h3>
                <p className="mt-2 text-sm text-navy-200">{CONTACT.siteOffice}</p>
              </div>
              <div className="card-glass p-5">
                <h3 className="flex items-center gap-2 font-display text-base font-semibold text-white">
                  <MapPin className="h-4 w-4 text-gold-300" /> Corporate Office
                </h3>
                <p className="mt-2 text-sm text-navy-200">{CONTACT.corporateOffice}</p>
              </div>
            </div>

            <div className="card-glass p-5">
              <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
                <FileBadge className="h-5 w-5 text-gold-300" /> RERA Details
              </h3>
              <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                <div><dt className="text-navy-300">Project</dt><dd className="text-white">{BRAND.name}</dd></div>
                <div><dt className="text-navy-300">Promoter</dt><dd className="text-white">{BRAND.developer}</dd></div>
                <div><dt className="text-navy-300">RERA Reg.</dt><dd className="text-gold-200">{CONTACT.rera}</dd></div>
                <div><dt className="text-navy-300">Promoter ID</dt><dd className="text-gold-200">{CONTACT.promoterId}</dd></div>
              </dl>
              <a href={CONTACT.upReraUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold-200 underline underline-offset-2">
                <Globe className="h-4 w-4" /> UP RERA: www.up-rera.in
              </a>
            </div>

            <a href={`mailto:${CONTACT.email}`} className="card-glass flex items-center gap-3 p-5 transition hover:border-gold-400/40">
              <Mail className="h-5 w-5 text-gold-300" />
              <span className="text-sm text-navy-100">{CONTACT.email}</span>
            </a>
          </div>
        </div>

        <div id="enquiry" className="reveal scroll-mt-24">
          <h3 className="font-display text-2xl font-semibold text-white">Schedule a Conversation</h3>
          <p className="mt-2 text-sm text-navy-200">
            Fill in your details and our team will get back to you with the requested price list, floor
            plan, brochure, payment plan or a scheduled site visit.
          </p>
          <div className="mt-6">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
