import { useCallback, useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Location from '@/components/Location';
import FloorPlans from '@/components/FloorPlans';
import Pricing from '@/components/Pricing';
import PaymentPlans from '@/components/PaymentPlans';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingActions from '@/components/FloatingActions';
import Modal from '@/components/Modal';
import PrivacyPolicy from '@/components/PrivacyPolicy';
import EnquiryForm from '@/components/EnquiryForm';
import { CONTACT } from '@/lib/project';
import { useReveal } from '@/lib/useReveal';

type MarketingProps = {
  onAdmin: () => void;
};

export default function Marketing({ onAdmin }: MarketingProps) {
  useReveal();
  const [introVisible, setIntroVisible] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryDefaults, setEnquiryDefaults] = useState<{ interested_floor?: string; enquiry_type?: string }>({});

  useEffect(() => {
    if (!introVisible) return;
    const timer = window.setTimeout(() => setIntroVisible(false), 2800);
    return () => window.clearTimeout(timer);
  }, [introVisible]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const openWhatsApp = useCallback(() => {
    const msg = encodeURIComponent(
      "Hello KB West Walk, I'm interested in your project and would like more details."
    );
    window.open(`https://wa.me/${CONTACT.whatsapp}?text=${msg}`, '_blank');
  }, []);

  const openEnquiry = useCallback((floor?: string, type?: string) => {
    setEnquiryDefaults({ interested_floor: floor, enquiry_type: type });
    setEnquiryOpen(true);
  }, []);

  return (
    <div className="relative pb-20 sm:pb-0">
      {introVisible && (
        <div className="kb-intro fixed inset-0 z-[100] grid place-items-center bg-white" role="status" aria-label="KB West Walk">
          <button
            type="button"
            onClick={() => setIntroVisible(false)}
            className="absolute right-5 top-5 rounded-full border border-[#28516a]/25 px-4 py-2 text-xs font-semibold tracking-wide text-[#28516a] transition hover:bg-[#eef4f7]"
          >
            Skip
          </button>
          <div className="kb-intro-content flex flex-col items-center px-8 text-center">
            <img
              src="/kb-west-walk-logo.svg"
              alt="KB West Walk"
              className="kb-intro-logo h-52 w-52 object-contain sm:h-64 sm:w-64"
            />
            <div className="kb-intro-rule mt-5 h-[2px] w-20 rounded-full bg-[#28516a]" />
            <p className="kb-intro-tagline mt-5 text-xs font-semibold uppercase tracking-[0.32em] text-[#28516a] sm:text-sm">
              Every Step, A Story
            </p>
          </div>
        </div>
      )}
      <Navbar onNavigate={scrollTo} onAdmin={onAdmin} />

      <main className="site-main cinematic-flow">
        <Hero onNavigate={scrollTo} onBrochure={() => setBrochureOpen(true)} onWhatsApp={openWhatsApp} />
        <About />
        <Experience onEnquire={() => openEnquiry(undefined, 'brochure')} />
        <Location />
        <FloorPlans />
        <Pricing onEnquire={(floor, type) => openEnquiry(floor, type)} />
        <PaymentPlans onEnquire={() => openEnquiry(undefined, 'payment_plan')} />
        <Contact onWhatsApp={openWhatsApp} />
      </main>

      <Footer onNavigate={scrollTo} onPrivacy={() => setPrivacyOpen(true)} onBrochure={() => setBrochureOpen(true)} />
      <FloatingActions onWhatsApp={openWhatsApp} />

      <Modal open={privacyOpen} onClose={() => setPrivacyOpen(false)} title="Privacy Policy" maxWidth="max-w-xl">
        <PrivacyPolicy />
      </Modal>

      <Modal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} title="Enquire Now" maxWidth="max-w-xl">
        <EnquiryForm defaults={enquiryDefaults} />
      </Modal>

      <Modal open={brochureOpen} onClose={() => setBrochureOpen(false)} title="Download Brochure" maxWidth="max-w-md">
        <div className="space-y-4 text-sm text-navy-200">
          <div className="overflow-hidden rounded-xl border border-white/10">
            <img
              src="/image.png"
              alt="KB West Walk building render"
              className="h-44 w-full object-cover object-center"
            />
          </div>
          <p>
            View the KB West Walk project details, floor plans, pricing and payment plans in the
            brochure published by Shree Kunj Bihariji Realty Pvt. Ltd.
          </p>
          <a
            href="/KB-West-Walk-Brochure.pdf"
            download="KB-West-Walk-Brochure.pdf"
            className="btn-gold w-full"
          >
            Download Brochure (PDF)
          </a>
          <p className="text-xs text-navy-300">
            Project imagery shown above is the uploaded KB West Walk render. Prices and specifications
            remain subject to the legal disclaimer and developer approvals.
          </p>
        </div>
      </Modal>
    </div>
  );
}
