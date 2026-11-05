import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  LogOut, Search, Download, X, Phone, Mail, MessageCircle, Calendar, StickyNote,
  Filter, Users, ClipboardList, MapPin, TrendingUp, ChevronRight, Plus, Clock,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { BRAND, CONTACT, ENQUIRY_TYPES, LEAD_STATUSES, FLOOR_OPTIONS } from '@/lib/project';
import EnquiryForm from '@/components/EnquiryForm';

type Lead = {
  id: string;
  customer_name: string;
  mobile: string;
  email: string | null;
  interested_floor: string | null;
  budget: string | null;
  enquiry_type: string;
  preferred_callback_time: string | null;
  consent: boolean;
  message: string | null;
  source: string;
  status: string;
  scheduled_at: string | null;
  created_at: string;
};

type Activity = {
  id: string;
  lead_id: string;
  type: string;
  body: string | null;
  created_at: string;
};

type AdminDashboardProps = {
  onSignOut: () => void;
  onBack: () => void;
};

const enquiryLabel = (id: string) => ENQUIRY_TYPES.find((t) => t.id === id)?.label ?? id;
const statusLabel = (id: string) => LEAD_STATUSES.find((s) => s.id === id)?.label ?? id;
const statusColor: Record<string, string> = {
  new: 'bg-sky-500/15 text-sky-300 border-sky-400/30',
  contacted: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
  site_visit_scheduled: 'bg-violet-500/15 text-violet-300 border-violet-400/30',
  closed: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
  lost: 'bg-red-500/15 text-red-300 border-red-400/30',
};

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

export default function AdminDashboard({ onSignOut, onBack }: AdminDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [floorFilter, setFloorFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selected, setSelected] = useState<Lead | null>(null);
  const [noteText, setNoteText] = useState('');
  const [scheduleAt, setScheduleAt] = useState('');
  const [addingActivity, setAddingActivity] = useState(false);
  const [showAddLead, setShowAddLead] = useState(false);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    setError('');
    let q = supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (floorFilter) q = q.eq('interested_floor', floorFilter);
    if (typeFilter) q = q.eq('enquiry_type', typeFilter);
    if (statusFilter) q = q.eq('status', statusFilter);
    const { data, error: err } = await q;
    if (err) { setError(err.message); setLoading(false); return; }
    setLeads(data as Lead[]);
    setLoading(false);
  }, [floorFilter, typeFilter, statusFilter]);

  useEffect(() => { loadLeads(); }, [loadLeads]);

  const loadActivities = useCallback(async (leadId: string) => {
    const { data } = await supabase
      .from('lead_activities')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false });
    setActivities((data as Activity[]) ?? []);
  }, []);

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase();
    if (!s) return leads;
    return leads.filter((l) =>
      l.customer_name.toLowerCase().includes(s) ||
      l.mobile.includes(s) ||
      (l.email?.toLowerCase().includes(s) ?? false)
    );
  }, [leads, search]);

  const stats = useMemo(() => ({
    total: leads.length,
    enquiries: leads.filter((l) => l.enquiry_type !== 'site_visit').length,
    siteVisits: leads.filter((l) => l.enquiry_type === 'site_visit').length,
    newLeads: leads.filter((l) => l.status === 'new').length,
  }), [leads]);

  const openLead = (l: Lead) => {
    setSelected(l);
    setNoteText('');
    setScheduleAt(l.scheduled_at ? l.scheduled_at.slice(0, 16) : '');
    loadActivities(l.id);
  };

  const updateStatus = async (status: string) => {
    if (!selected) return;
    const { error: err } = await supabase.from('leads').update({ status }).eq('id', selected.id);
    if (err) return;
    const updated = { ...selected, status };
    setSelected(updated);
    setLeads((ls) => ls.map((l) => (l.id === selected.id ? updated : l)));
    await supabase.from('lead_activities').insert({
      lead_id: selected.id,
      type: 'status_change',
      body: `Status changed to "${statusLabel(status)}".`,
    });
    loadActivities(selected.id);
  };

  const scheduleCallback = async () => {
    if (!selected || !scheduleAt) return;
    const iso = new Date(scheduleAt).toISOString();
    const { error: err } = await supabase.from('leads').update({ scheduled_at: iso }).eq('id', selected.id);
    if (err) return;
    const updated = { ...selected, scheduled_at: iso };
    setSelected(updated);
    setLeads((ls) => ls.map((l) => (l.id === selected.id ? updated : l)));
    await supabase.from('lead_activities').insert({
      lead_id: selected.id,
      type: 'callback',
      body: `Callback / site visit scheduled for ${fmtDate(iso)}.`,
    });
    loadActivities(selected.id);
  };

  const addNote = async () => {
    if (!selected || !noteText.trim()) return;
    setAddingActivity(true);
    await supabase.from('lead_activities').insert({
      lead_id: selected.id,
      type: 'note',
      body: noteText.trim(),
    });
    setNoteText('');
    setAddingActivity(false);
    loadActivities(selected.id);
  };

  const exportCsv = () => {
    const headers = ['Date', 'Name', 'Mobile', 'Email', 'Floor', 'Budget', 'Enquiry Type', 'Status', 'Callback Time', 'Scheduled At', 'Source', 'Consent', 'Message'];
    const rows = filtered.map((l) => [
      fmtDate(l.created_at), l.customer_name, l.mobile, l.email ?? '', l.interested_floor ?? '',
      l.budget ?? '', enquiryLabel(l.enquiry_type), statusLabel(l.status), l.preferred_callback_time ?? '',
      l.scheduled_at ? fmtDate(l.scheduled_at) : '', l.source, l.consent ? 'Yes' : 'No', (l.message ?? '').replace(/"/g, '""'),
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kb-west-walk-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const waLink = (mobile: string, name: string) => {
    const num = mobile.replace(/\D/g, '').length === 10 ? `91${mobile}` : mobile.replace(/\D/g, '');
    const msg = encodeURIComponent(`Hello ${name}, this is regarding your enquiry for KB West Walk.`);
    return `https://wa.me/${num}?text=${msg}`;
  };

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-navy-950/90 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-gold-300 to-gold-500 text-navy-950">
              <Users className="h-4 w-4" />
            </span>
            <div>
              <h1 className="font-display text-base font-semibold text-white">{BRAND.name} · Admin</h1>
              <p className="text-[10px] text-gold-300/80">Lead Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowAddLead(true)} className="hidden rounded-full bg-gold-400/15 px-4 py-2 text-xs font-semibold text-gold-200 transition hover:bg-gold-400/25 sm:inline-flex">
              + Add Lead
            </button>
            <button onClick={onBack} className="btn-ghost text-xs">View Site</button>
            <button onClick={onSignOut} className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-navy-100 transition hover:bg-white/5">
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="container-x py-8">
        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Users, label: 'Total Leads', value: stats.total, color: 'text-gold-300' },
            { icon: ClipboardList, label: 'Enquiries', value: stats.enquiries, color: 'text-sky-300' },
            { icon: MapPin, label: 'Site Visits', value: stats.siteVisits, color: 'text-violet-300' },
            { icon: TrendingUp, label: 'New Leads', value: stats.newLeads, color: 'text-emerald-300' },
          ].map((s) => (
            <div key={s.label} className="card-glass p-5">
              <div className="flex items-center justify-between">
                <span className={`grid h-10 w-10 place-items-center rounded-xl bg-white/5 ${s.color}`}>
                  <s.icon className="h-5 w-5" />
                </span>
                <span className="font-display text-3xl font-semibold text-white">{s.value}</span>
              </div>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-navy-200">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="card-glass mt-6 p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, mobile or email…"
                className="w-full rounded-xl border border-white/10 bg-navy-950/50 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-navy-400 focus:border-gold-400/50 focus:outline-none"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <select value={floorFilter} onChange={(e) => setFloorFilter(e.target.value)} className="rounded-xl border border-white/10 bg-navy-950/50 px-3 py-2.5 text-sm text-white focus:border-gold-400/50 focus:outline-none">
                <option value="">All Floors</option>
                {FLOOR_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="rounded-xl border border-white/10 bg-navy-950/50 px-3 py-2.5 text-sm text-white focus:border-gold-400/50 focus:outline-none">
                <option value="">All Types</option>
                {ENQUIRY_TYPES.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
              </select>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-white/10 bg-navy-950/50 px-3 py-2.5 text-sm text-white focus:border-gold-400/50 focus:outline-none">
                <option value="">All Status</option>
                {LEAD_STATUSES.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <button onClick={exportCsv} className="inline-flex items-center gap-1.5 rounded-xl bg-gold-400/15 px-4 py-2.5 text-sm font-semibold text-gold-200 transition hover:bg-gold-400/25">
                <Download className="h-4 w-4" /> CSV
              </button>
            </div>
          </div>
          {(floorFilter || typeFilter || statusFilter) && (
            <button
              onClick={() => { setFloorFilter(''); setTypeFilter(''); setStatusFilter(''); }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-navy-300 hover:text-white"
            >
              <Filter className="h-3 w-3" /> Clear filters
            </button>
          )}
        </div>

        {/* Leads table */}
        <div className="card-glass mt-6 overflow-hidden">
          {loading ? (
            <p className="p-8 text-center text-sm text-navy-300">Loading leads…</p>
          ) : error ? (
            <p className="p-8 text-center text-sm text-red-300">{error}</p>
          ) : filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-navy-300">No leads found. Submit an enquiry on the website to see it here.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-white/[0.04] text-xs uppercase tracking-wider text-navy-200">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Mobile</th>
                    <th className="hidden px-4 py-3 md:table-cell">Floor</th>
                    <th className="hidden px-4 py-3 sm:table-cell">Type</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="hidden px-4 py-3 lg:table-cell">Date</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filtered.map((l) => (
                    <tr key={l.id} className="cursor-pointer transition hover:bg-white/[0.03]" onClick={() => openLead(l)}>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-white">{l.customer_name}</p>
                        {l.email && <p className="text-xs text-navy-300">{l.email}</p>}
                      </td>
                      <td className="px-4 py-3 text-navy-100">{l.mobile}</td>
                      <td className="hidden px-4 py-3 text-navy-200 md:table-cell">{l.interested_floor ?? '—'}</td>
                      <td className="hidden px-4 py-3 text-navy-200 sm:table-cell">{enquiryLabel(l.enquiry_type)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${statusColor[l.status] ?? 'border-white/15 text-navy-200'}`}>
                          {statusLabel(l.status)}
                        </span>
                      </td>
                      <td className="hidden px-4 py-3 text-xs text-navy-300 lg:table-cell">{fmtDate(l.created_at)}</td>
                      <td className="px-4 py-3 text-right">
                        <ChevronRight className="h-4 w-4 text-navy-400" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Lead detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end bg-navy-950/70 backdrop-blur-sm animate-fade-in" onClick={() => setSelected(null)}>
          <div
            className="h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-navy-950 p-6 animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-semibold text-white">{selected.customer_name}</h2>
                <p className="mt-1 text-xs text-navy-300">Lead · {fmtDate(selected.created_at)}</p>
              </div>
              <button onClick={() => setSelected(null)} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-navy-100 transition hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick actions */}
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`tel:${selected.mobile}`} className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/15 px-3 py-1.5 text-xs font-semibold text-sky-300 transition hover:bg-sky-500/25">
                <Phone className="h-3.5 w-3.5" /> Call
              </a>
              <a href={waLink(selected.mobile, selected.customer_name)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/25">
                <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
              </a>
              {selected.email && (
                <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/15 px-3 py-1.5 text-xs font-semibold text-violet-300 transition hover:bg-violet-500/25">
                  <Mail className="h-3.5 w-3.5" /> Email
                </a>
              )}
            </div>

            {/* Details */}
            <dl className="mt-6 grid gap-3 text-sm">
              <Detail label="Mobile" value={selected.mobile} />
              <Detail label="Email" value={selected.email ?? '—'} />
              <Detail label="Interested Floor" value={selected.interested_floor ?? '—'} />
              <Detail label="Budget" value={selected.budget ?? '—'} />
              <Detail label="Enquiry Type" value={enquiryLabel(selected.enquiry_type)} />
              <Detail label="Callback Time" value={selected.preferred_callback_time ?? 'Anytime'} />
              <Detail label="Consent" value={selected.consent ? 'Yes' : 'No'} />
              <Detail label="Source" value={selected.source} />
              {selected.message && <Detail label="Message" value={selected.message} />}
            </dl>

            {/* Status */}
            <div className="mt-6">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-navy-200">Status</h3>
              <div className="flex flex-wrap gap-2">
                {LEAD_STATUSES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updateStatus(s.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                      selected.status === s.id
                        ? statusColor[s.id] ?? 'border-gold-400/40 bg-gold-400/15 text-gold-200'
                        : 'border-white/10 text-navy-200 hover:border-white/25 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="mt-6">
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy-200">
                <Calendar className="h-3.5 w-3.5" /> Schedule Callback / Site Visit
              </h3>
              <div className="flex gap-2">
                <input
                  type="datetime-local"
                  value={scheduleAt}
                  onChange={(e) => setScheduleAt(e.target.value)}
                  className="flex-1 rounded-xl border border-white/10 bg-navy-950/50 px-3 py-2 text-sm text-white focus:border-gold-400/50 focus:outline-none"
                />
                <button onClick={scheduleCallback} className="rounded-xl bg-gold-400/15 px-4 py-2 text-sm font-semibold text-gold-200 transition hover:bg-gold-400/25">
                  Save
                </button>
              </div>
              {selected.scheduled_at && (
                <p className="mt-2 flex items-center gap-1.5 text-xs text-gold-200">
                  <Clock className="h-3 w-3" /> Scheduled: {fmtDate(selected.scheduled_at)}
                </p>
              )}
            </div>

            {/* Add note */}
            <div className="mt-6">
              <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-navy-200">
                <StickyNote className="h-3.5 w-3.5" /> Follow-up Notes
              </h3>
              <div className="flex gap-2">
                <textarea
                  rows={2}
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add a follow-up note…"
                  className="flex-1 rounded-xl border border-white/10 bg-navy-950/50 px-3 py-2 text-sm text-white placeholder:text-navy-400 focus:border-gold-400/50 focus:outline-none"
                />
                <button onClick={addNote} disabled={addingActivity || !noteText.trim()} className="self-start rounded-xl bg-gold-400/15 px-4 py-2 text-sm font-semibold text-gold-200 transition hover:bg-gold-400/25 disabled:opacity-50">
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Activity timeline */}
              <ul className="mt-4 space-y-3">
                {activities.length === 0 && <p className="text-xs text-navy-300">No follow-ups yet.</p>}
                {activities.map((a) => (
                  <li key={a.id} className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold-300/80">{a.type.replace('_', ' ')}</p>
                    <p className="mt-1 text-sm text-navy-100">{a.body ?? '—'}</p>
                    <p className="mt-1 text-[10px] text-navy-400">{fmtDate(a.created_at)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Add lead modal */}
      {showAddLead && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-navy-950/90 p-4 backdrop-blur-sm animate-fade-in" onClick={() => setShowAddLead(false)}>
          <div className="w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-white">Add Lead Manually</h2>
              <button onClick={() => setShowAddLead(false)} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-navy-100 hover:bg-white/10">
                <X className="h-4 w-4" />
              </button>
            </div>
            <EnquiryForm defaults={{ enquiry_type: 'price_list' }} />
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/5 pb-2">
      <dt className="text-navy-300">{label}</dt>
      <dd className="text-right text-white">{value}</dd>
    </div>
  );
}
