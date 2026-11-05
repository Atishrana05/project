import { ShieldCheck } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="space-y-5 text-sm leading-relaxed text-navy-200">
      <p className="flex items-center gap-2 text-gold-200">
        <ShieldCheck className="h-4 w-4" /> KB West Walk Privacy Policy
      </p>
      <p>
        KB West Walk, developed by Shree Kunj Bihariji Realty Pvt. Ltd., is committed to protecting
        your privacy. This policy explains how we collect, use and safeguard information you share
        through this website.
      </p>
      <h3 className="font-display text-base font-semibold text-white">Information We Collect</h3>
      <p>
        When you submit an enquiry, we collect your name, mobile number, email (if provided), preferred
        floor or unit type, budget, enquiry type, preferred callback time and any message you choose to
        share. We also record the date, time and source of your enquiry.
      </p>
      <h3 className="font-display text-base font-semibold text-white">How We Use Your Information</h3>
      <ul className="list-disc space-y-1 pl-5">
        <li>To respond to your enquiry and share requested price lists, floor plans, brochures or payment plans.</li>
        <li>To schedule callbacks or site visits at your preferred time.</li>
        <li>To send project updates and offers, only with your explicit consent.</li>
      </ul>
      <h3 className="font-display text-base font-semibold text-white">Data Storage & Security</h3>
      <p>
        Your enquiry is stored in a secure database with row-level access controls. Only authorised
        representatives of the developer can access lead information. Your details are never sold or
        shared with unrelated third parties.
      </p>
      <h3 className="font-display text-base font-semibold text-white">Your Consent</h3>
      <p>
        By submitting the enquiry form, you consent to receive communication from KB West Walk via call,
        WhatsApp or email regarding your enquiry. You may withdraw consent at any time by replying
        "STOP" to any message or contacting us on our published numbers.
      </p>
      <h3 className="font-display text-base font-semibold text-white">RERA Compliance</h3>
      <p>
        Project details are published in good faith per RERA registration {`UPRERAPRJ422027/01/2026`}.
        Verify all approvals and specifications on the UP RERA portal before booking.
      </p>
      <p className="text-xs text-navy-300">This policy may be updated from time to time. Last updated: July 2026.</p>
    </div>
  );
}
