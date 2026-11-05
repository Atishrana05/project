import { useCallback, useState } from 'react';
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
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [brochureOpen, setBrochureOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [enquiryDefaults, setEnquiryDefaults] = useState<{ interested_floor?: string; enquiry_type?: string }>({});

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
    <div className="relative">
      <Navbar onNavigate={scrollTo} onAdmin={onAdmin} />

      <main>
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
