import { useState } from 'react';
import { Tag, Plus, Info, MessageCircle } from 'lucide-react';
import { FLOOR_PRICING, PLC, ADDITIONAL_CHARGES, inr, CONTACT } from '@/lib/project';

type PricingProps = {
  onEnquire: (floor?: string, type?: string) => void;
};

export default function Pricing({ onEnquire }: PricingProps) {
  const [openFloor, setOpenFloor] = useState<string | null>(null);

  const waMessage = (name: string) =>
    encodeURIComponent(`Hello KB West Walk, I would like to enquire about pricing for the ${name} level.`);

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> Price List
          </p>
          <h2 className="section-title">Transparent Pricing, Premium Floors</h2>
          <p className="mt-5 text-navy-200">
            BSP per square foot across every level, with PLCs and additional charges clearly listed.
          </p>
          <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/5 px-4 py-1.5 text-xs font-semibold text-gold-200">
            <Info className="h-3.5 w-3.5" /> Price list dated 12 July 2026 · Subject to change
          </p>
        </div>

        {/* BSP table */}
        <div className="reveal mt-12 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="hidden grid-cols-[1.5fr_1fr_1.2fr_1fr] gap-4 border-b border-white/10 bg-white/[0.04] px-6 py-4 text-xs font-semibold uppercase tracking-wider text-navy-200 sm:grid">
            <span>Floor</span>
            <span className="text-right">BSP / sq. ft.</span>
            <span className="text-center">PLC & Charges</span>
            <span className="text-right">Enquire</span>
          </div>
          {FLOOR_PRICING.map((f) => {
            const isOpen = openFloor === f.id;
            return (
              <div key={f.id} className="border-b border-white/5 last:border-0">
                <div className="grid grid-cols-2 gap-3 px-6 py-5 sm:grid-cols-[1.5fr_1fr_1.2fr_1fr] sm:items-center sm:gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <h3 className="font-display text-lg font-semibold text-white">{f.name}</h3>
                    <p className="text-xs text-navy-300">Base Selling Price</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-gold-200 sm:text-xl">{inr(f.bsp)}</span>
                    <p className="text-[10px] text-navy-300 sm:hidden">per sq. ft.</p>
                  </div>
                  <div className="hidden text-center sm:block">
                    <button
                      onClick={() => setOpenFloor(isOpen ? null : f.id)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-medium text-navy-100 transition hover:border-gold-400/40 hover:text-gold-200"
                    >
                      <Plus className={`h-3.5 w-3.5 transition ${isOpen ? 'rotate-45' : ''}`} />
                      Details
                    </button>
                  </div>
                  <div className="flex justify-end gap-2">
                    <a
                      href={`https://wa.me/${CONTACT.whatsapp}?text=${waMessage(f.name)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="grid h-9 w-9 place-items-center rounded-full bg-emerald-500/15 text-emerald-300 transition hover:bg-emerald-500/25"
                      aria-label="WhatsApp enquiry"
                    >
                      <MessageCircle className="h-4 w-4" />
                    </a>
                    <button
                      onClick={() => onEnquire(f.name, 'price_list')}
                      className="rounded-full bg-gold-400/15 px-4 py-2 text-xs font-semibold text-gold-200 transition hover:bg-gold-400/25"
                    >
                      Enquire
                    </button>
                  </div>
                </div>

                {isOpen && (
                  <div className="border-t border-white/5 bg-navy-950/40 px-6 py-5 animate-fade-in sm:hidden">
                    <PLCCompact />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* PLC + charges */}
        <div className="reveal mt-8 grid gap-6 lg:grid-cols-2">
          <div className="card-glass p-6">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-white">
              <Tag className="h-5 w-5 text-gold-300" /> Preferential Location Charges (PLC)
            </h3>
            <ul className="mt-4 divide-y divide-white/5">
              {PLC.map((p) => (
                <li key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-navy-100">{p.label}</span>
                  <span className="font-semibold text-gold-200">{p.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-glass p-6">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-white">
              <Plus className="h-5 w-5 text-gold-300" /> Additional Charges
            </h3>
            <ul className="mt-4 divide-y divide-white/5">
              {ADDITIONAL_CHARGES.map((c) => (
                <li key={c.label} className="flex items-center justify-between py-2.5 text-sm">
                  <span className="text-navy-100">{c.label}</span>
                  <span className="font-semibold text-gold-200">{c.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal mt-10 text-center">
          <button onClick={() => onEnquire(undefined, 'price_list')} className="btn-gold">
            Request Full Price List
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-navy-300">
          Price list is for information only and is not an offer. Prices and charges are subject to
          change. Customers should verify applicable approvals, specifications and RERA details before
          booking.
        </p>
      </div>
    </section>
  );
}

function PLCCompact() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PLC.map((p) => (
        <div key={p.id} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
          <span className="text-navy-100">{p.label}</span>
          <span className="font-semibold text-gold-200">{p.value}</span>
        </div>
      ))}
    </div>
  );
}
