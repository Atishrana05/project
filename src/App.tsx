import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Marketing from '@/components/Marketing';
import AdminAuth from '@/components/admin/AdminAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';

type View = 'site' | 'admin';

export default function App() {
  const [view, setView] = useState<View>(() =>
    window.location.hash.replace('#', '') === 'admin' ? 'admin' : 'site'
  );
  const [session, setSession] = useState<boolean>(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(!!data.session);
      setAuthChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(!!s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onHash = () => {
      setView(window.location.hash.replace('#', '') === 'admin' ? 'admin' : 'site');
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goAdmin = () => { window.location.hash = 'admin'; };
  const goSite = () => { window.location.hash = ''; };

  if (view === 'admin') {
    if (!authChecked) {
      return <div className="grid min-h-screen place-items-center bg-navy-950 text-navy-200">Loading…</div>;
    }
    if (!session) {
      return <AdminAuth onSuccess={() => setSession(true)} onBack={goSite} />;
    }
    return (
      <AdminDashboard
        onSignOut={async () => {
          await supabase.auth.signOut();
          setSession(false);
        }}
        onBack={goSite}
      />
    );
  }

  return <Marketing onAdmin={goAdmin} />;
}
