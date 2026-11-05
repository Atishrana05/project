import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import {
  ENQUIRY_TYPES,
  FLOOR_OPTIONS,
  BUDGET_OPTIONS,
  CALLBACK_TIMES,
} from '@/lib/project';

export type EnquiryPayload = {
  customer_name: string;
  mobile: string;
  email?: string;
  interested_floor?: string;
  budget?: string;
  enquiry_type: string;
  preferred_callback_time?: string;
  consent: boolean;
  message?: string;
};

type EnquiryFormProps = {
  defaults?: Partial<EnquiryPayload>;
  compact?: boolean;
};

type Status = 'idle' | 'submitting' | 'success' | 'error';

const stripPhone = (v: string) => v.replace(/[^\d]/g, '');
const validIndianMobile = (v: string) => {
  const d = stripPhone(v);
  return d.length === 10 && /^[6-9]\d{9}$/.test(d);
};

export default function EnquiryForm({ defaults, compact }: EnquiryFormProps) {
  const [form, setForm] = useState<EnquiryPayload>({
    customer_name: '',
    mobile: '',
    email: '',
    interested_floor: defaults?.interested_floor ?? '',
    budget: defaults?.budget ?? '',
    enquiry_type: defaults?.enquiry_type ?? 'price_list',
    preferred_callback_time: '',
    consent: false,
    message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const set = (k: keyof EnquiryPayload, v: string | boolean) => {
    setForm((f) => ({ ...f, [k]: v }));
    setFieldErrors((e) => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.customer_name.trim()) errs.customer_name = 'Please enter your name.';
    if (!form.mobile.trim()) errs.mobile = 'Mobile number is required.';
    else if (!validIndianMobile(form.mobile))
      errs.mobile = 'Enter a valid 10-digit Indian mobile number.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = 'Enter a valid email address.';
    if (!form.consent) errs.consent = 'Please accept to receive communication.';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!validate()) return;
    setStatus('submitting');
    const payload = {
      customer_name: form.customer_name.trim(),
      mobile: stripPhone(form.mobile),
      email: form.email?.trim() || null,
      interested_floor: form.interested_floor || null,
      budget: form.budget || null,
      enquiry_type: form.enquiry_type,
      preferred_callback_time: form.preferred_callback_time || null,
      consent: form.consent,
      message: form.message?.trim() || null,
      source: 'website',
    };
    const { error } = await supabase.from('leads').insert(payload);
    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong while submitting. Please try again or call us.');
      return;
    }
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="card-glass flex flex-col items-center p-8 text-center animate-fade-in">
        <CheckCircle2 className="h-14 w-14 text-emerald-400" />
        <h3 className="mt-4 font-display text-2xl font-semibold text-white">Thank you, {form.customer_name.split(' ')[0]}!</h3>
        <p className="mt-2 max-w-sm text-navy-200">
          Your enquiry has been recorded. Our team will reach out shortly on {stripPhone(form.mobile)}.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setForm({ customer_name: '', mobile: '', email: '', interested_floor: '', budget: '', enquiry_type: 'price_list', preferred_callback_time: '', consent: false, message: '' });
          }}
          className="btn-outline mt-6"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  const inputCls =
    'w-full rounded-xl border border-white/10 bg-navy-950/50 px-4 py-3 text-sm text-white placeholder:text-navy-400 transition focus:border-gold-400/50 focus:outline-none focus:ring-1 focus:ring-gold-400/40';
  const labelCls = 'mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-200';
  const errCls = 'mt-1 text-xs text-red-400';

  return (
    <form onSubmit={onSubmit} className="card-glass p-6 sm:p-8" noValidate>
      <div className={`grid gap-5 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <label className={labelCls} htmlFor="ef-name">Customer Name *</label>
          <input id="ef-name" className={inputCls} value={form.customer_name} onChange={(e) => set('customer_name', e.target.value)} placeholder="Your full name" />
          {fieldErrors.customer_name && <p className={errCls}>{fieldErrors.customer_name}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="ef-mobile">Mobile Number *</label>
          <input id="ef-mobile" className={inputCls} value={form.mobile} onChange={(e) => set('mobile', e.target.value)} placeholder="10-digit mobile" inputMode="numeric" maxLength={10} />
          {fieldErrors.mobile && <p className={errCls}>{fieldErrors.mobile}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="ef-email">Email</label>
          <input id="ef-email" className={inputCls} value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="you@example.com" type="email" />
          {fieldErrors.email && <p className={errCls}>{fieldErrors.email}</p>}
        </div>
        <div>
          <label className={labelCls} htmlFor="ef-floor">Interested Floor / Unit Type</label>
          <select id="ef-floor" className={inputCls} value={form.interested_floor} onChange={(e) => set('interested_floor', e.target.value)}>
            <option value="">Select floor</option>
            {FLOOR_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="ef-budget">Budget</label>
          <select id="ef-budget" className={inputCls} value={form.budget} onChange={(e) => set('budget', e.target.value)}>
            <option value="">Select budget</option>
            {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls} htmlFor="ef-type">Enquiry Type *</label>
          <select id="ef-type" className={inputCls} value={form.enquiry_type} onChange={(e) => set('enquiry_type', e.target.value)}>
            {ENQUIRY_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label className={labelCls} htmlFor="ef-cb">Preferred Callback Time</label>
          <select id="ef-cb" className={inputCls} value={form.preferred_callback_time} onChange={(e) => set('preferred_callback_time', e.target.value)}>
            <option value="">Anytime</option>
            {CALLBACK_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div className={compact ? '' : 'sm:col-span-2'}>
          <label className={labelCls} htmlFor="ef-msg">Message (optional)</label>
          <textarea id="ef-msg" rows={3} className={inputCls} value={form.message} onChange={(e) => set('message', e.target.value)} placeholder="Tell us what you're looking for…" />
        </div>
      </div>

      <label className="mt-5 flex items-start gap-3 text-sm text-navy-200">
        <input
          type="checkbox"
          checked={form.consent}
          onChange={(e) => set('consent', e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-white/20 bg-navy-900 accent-gold-400"
        />
        <span>
          I consent to receive communication from KB West Walk regarding this enquiry, including
          calls, WhatsApp and email. See our{' '}
          <a href="#privacy" className="text-gold-300 underline underline-offset-2">Privacy Policy</a>.
        </span>
      </label>
      {fieldErrors.consent && <p className={errCls}>{fieldErrors.consent}</p>}

      {status === 'error' && (
        <p className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">
          <AlertCircle className="h-4 w-4" /> {errorMsg}
        </p>
      )}

      <button type="submit" disabled={status === 'submitting'} className="btn-gold mt-6 w-full disabled:opacity-60">
        {status === 'submitting' ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</>
        ) : (
          <>Submit Enquiry</>
        )}
      </button>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-navy-300">
        <ShieldCheck className="h-3.5 w-3.5" /> Your details are securely stored and never shared with third parties.
      </p>
    </form>
  );
}
