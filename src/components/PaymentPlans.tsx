import { useState } from 'react';
import { ChevronDown, Wallet, Calendar, Info } from 'lucide-react';
import { PAYMENT_PLANS } from '@/lib/project';

type PaymentPlansProps = {
  onEnquire: () => void;
};

export default function PaymentPlans({ onEnquire }: PaymentPlansProps) {
  const [openId, setOpenId] = useState<string>(PAYMENT_PLANS[0].id);

  return (
    <section id="payment-plans" className="relative py-24 sm:py-32">
      <div className="container-x">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="section-eyebrow justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> Payment Plans
          </p>
          <h2 className="section-title">Flexible Plans, Built Around Your Milestones</h2>
          <p className="mt-5 text-navy-200">
            Four payment plans — from a down-payment plan with rent assistance to a slab-by-slab
            construction linked plan. Tap a card to expand its milestone table.
          </p>
        </div>

        <div className="reveal mt-12 grid gap-6 md:grid-cols-2">
          {PAYMENT_PLANS.map((plan) => {
            const isOpen = openId === plan.id;
            const total = plan.milestones.reduce((s, m) => s + m.pct, 0);
            return (
              <article
                key={plan.id}
                className={`card-glass overflow-hidden transition-all duration-300 ${
                  isOpen ? 'border-gold-400/40 shadow-glow-gold' : 'hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? '' : plan.id)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <span>
                    <span className="flex items-center gap-2">
                      <Wallet className="h-5 w-5 text-gold-300" />
                      <h3 className="font-display text-xl font-semibold text-white">{plan.name}</h3>
                    </span>
                    <p className="mt-1 text-sm text-navy-200">{plan.tagline}</p>
                  </span>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-gold-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="border-t border-white/10 px-6 pb-6 pt-4 animate-fade-in">
                    <ul className="space-y-2.5">
                      {plan.milestones.map((m, i) => (
                        <li key={m.label} className="flex items-center gap-3">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-400/10 text-xs font-bold text-gold-300">
                            {i + 1}
                          </span>
                          <span className="flex-1 text-sm text-navy-100">{m.label}</span>
                          <span className="font-semibold text-gold-200">{m.pct}%</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3 text-sm">
                      <span className="flex items-center gap-2 text-navy-200">
                        <Calendar className="h-4 w-4 text-gold-300" /> Total
                      </span>
                      <span className="font-semibold text-white">{total}%</span>
                    </div>
                    <button onClick={onEnquire} className="btn-outline mt-5 w-full">
                      Enquire About This Plan
                    </button>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <p className="reveal mt-8 flex items-center justify-center gap-2 text-center text-xs text-navy-300">
          <Info className="h-3.5 w-3.5" /> Rent assistance is provided per the developer's policy.
          Rental commitments are not guaranteed and should not be assumed as assured returns.
        </p>
      </div>
    </section>
  );
}
