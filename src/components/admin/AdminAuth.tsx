
import { useState, type FormEvent } from 'react';
import { Loader2, Lock, Mail, Building2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { BRAND } from '@/lib/project';

type AdminAuthProps = {
  onSuccess: () => void;
  onBack: () => void;
};

export default function AdminAuth({ onSuccess, onBack }: AdminAuthProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);

    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (err) throw err;

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-navy-950 px-4">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-900/40 to-navy-950" />

      <div className="relative w-full max-w-md">
        <button
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-2 text-sm text-navy-200 transition hover:text-gold-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to website
        </button>

        <div className="card-glass p-8">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950 shadow-glow-gold">
              <Building2 className="h-5 w-5" />
            </span>

            <div>
              <h1 className="font-display text-xl font-semibold text-white">
                {BRAND.name} Admin
              </h1>
              <p className="text-xs text-gold-300/80">
                Lead Management Dashboard
              </p>
            </div>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-200">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />

                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-navy-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder:text-navy-400 focus:border-gold-400/50 focus:outline-none"
                  placeholder="admin@kbwestwalk.co"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-navy-200">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />

                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-navy-950/50 py-3 pl-10 pr-4 text-sm text-white placeholder:text-navy-400 focus:border-gold-400/50 focus:outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-xs text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Please wait…
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-navy-300">
            Admin access is restricted to authorised personnel of {BRAND.developer}.
          </p>
        </div>
      </div>
    </div>
  );
}
