
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Marketing from '@/components/Marketing';
import AdminAuth from '@/components/admin/AdminAuth';
import AdminDashboard from '@/components/admin/AdminDashboard';

type View = 'site' | 'admin';
type Access = 'checking' | 'signed_out' | 'admin' | 'denied' | 'error';

export default function App() {
  const [view, setView] = useState<View>(() =>
    window.location.hash.replace('#', '') === 'admin' ? 'admin' : 'site'
  );

  const [access, setAccess] = useState<Access>('checking');

  const verifyAdminAccess = async () => {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();

    if (sessionError) {
      setAccess('error');
      return;
    }

    if (!sessionData.session) {
      setAccess('signed_out');
      return;
    }

    setAccess('checking');

    const { data, error } = await supabase.rpc('is_admin');

    if (error) {
      console.error('Admin verification failed:', error);
      setAccess('error');
      return;
    }

    setAccess(data === true ? 'admin' : 'denied');
  };

  useEffect(() => {
    verifyAdminAccess();

    const { data: sub } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          setAccess('signed_out');
        } else {
          setAccess('checking');

          // Run verification after the auth callback finishes
          Promise.resolve().then(() => verifyAdminAccess());
        }
      }
    );

    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onHash = () => {
      setView(
        window.location.hash.replace('#', '') === 'admin'
          ? 'admin'
          : 'site'
      );
    };

    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const goAdmin = () => {
    window.location.hash = 'admin';
  };

  const goSite = () => {
    window.location.hash = '';
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAccess('signed_out');
  };

  if (view === 'admin') {
    if (access === 'checking') {
      return (
        <div className="grid min-h-screen place-items-center bg-navy-950 text-navy-200">
          Verifying admin access...
        </div>
      );
    }

    if (access === 'signed_out') {
      return (
        <AdminAuth
          onSuccess={verifyAdminAccess}
          onBack={goSite}
        />
      );
    }

    if (access === 'denied') {
      return (
        <div className="grid min-h-screen place-items-center bg-navy-950 text-navy-200">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-bold">Access Denied</h2>
            <p>This account is not authorised to access the admin dashboard.</p>
            <button onClick={signOut}>Sign Out</button>
            <button onClick={goSite}>Back to Website</button>
          </div>
        </div>
      );
    }

    if (access === 'error') {
      return (
        <div className="grid min-h-screen place-items-center bg-navy-950 text-navy-200">
          <div className="text-center space-y-4">
            <p>Unable to verify admin permissions.</p>
            <button onClick={verifyAdminAccess}>Retry</button>
            <button onClick={signOut}>Sign Out</button>
          </div>
        </div>
      );
    }

    return (
      <AdminDashboard
        onSignOut={signOut}
        onBack={goSite}
      />
    );
  }

  return <Marketing onAdmin={goAdmin} />;
}
