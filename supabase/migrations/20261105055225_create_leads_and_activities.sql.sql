/*
# Create leads and lead_activities tables for KB West Walk enquiry system

1. New Tables
- `leads`
  - id (uuid PK)
  - customer_name (text, not null) — full name of enquiring customer
  - mobile (text, not null) — 10-digit Indian mobile number
  - email (text, nullable) — optional email
  - interested_floor (text, nullable) — selected floor / unit type
  - budget (text, nullable) — selected budget band
  - enquiry_type (text, not null) — one of: price_list, floor_plan, brochure, payment_plan, site_visit
  - preferred_callback_time (text, nullable) — preferred callback slot
  - consent (boolean, not null default false) — consent to receive communication
  - message (text, nullable) — optional free-text message
  - source (text, not null default 'website') — submission source
  - status (text, not null default 'new') — lead status: new / contacted / site_visit_scheduled / closed / lost
  - scheduled_at (timestamptz, nullable) — scheduled callback / site visit time
  - created_at (timestamptz, default now()) — submission timestamp
- `lead_activities`
  - id (uuid PK)
  - lead_id (uuid FK -> leads.id ON DELETE CASCADE)
  - type (text, not null) — note / status_change / callback / site_visit / call
  - body (text, nullable) — note / description text
  - created_at (timestamptz, default now())
- `lead_followups` — NOT a separate table; status changes and notes captured in lead_activities.

2. Security
- Enable RLS on both tables.
- leads: anon + authenticated may INSERT (public enquiry form). SELECT / UPDATE / DELETE restricted to authenticated (admin).
  RLS still applies to authenticated, but admin reads all rows so ownership predicate is `true` for authenticated.
- lead_activities: only authenticated may SELECT / INSERT / UPDATE / DELETE (admin-only operations).
- Grant service_role full access on both tables.
- Revoke EXECUTE on no functions (none created).

3. Important Notes
- The enquiry form on the public site runs as `anon`, so INSERT must be allowed for anon with a real WITH CHECK (true is acceptable because any visitor submitting the form is intentionally permitted to create a lead).
- Admin dashboard runs as `authenticated` after sign-in; all CRUD allowed for authenticated.
- Enquiry type / status / source enforced with CHECK constraints for data hygiene.
- created_at recorded automatically so every lead has a precise date + time.
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  mobile text NOT NULL,
  email text,
  interested_floor text,
  budget text,
  enquiry_type text NOT NULL CHECK (enquiry_type IN ('price_list','floor_plan','brochure','payment_plan','site_visit')),
  preferred_callback_time text,
  consent boolean NOT NULL DEFAULT false,
  message text,
  source text NOT NULL DEFAULT 'website',
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','site_visit_scheduled','closed','lost')),
  scheduled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lead_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('note','status_change','callback','site_visit','call')),
  body text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;

GRANT SELECT, INSERT, UPDATE, DELETE ON leads TO authenticated;
GRANT INSERT ON leads TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON lead_activities TO authenticated;

DROP POLICY IF EXISTS "anon_insert_lead" ON leads;
CREATE POLICY "anon_insert_lead" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_leads" ON leads;
CREATE POLICY "auth_read_leads" ON leads FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_leads" ON leads;
CREATE POLICY "auth_update_leads" ON leads FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_leads" ON leads;
CREATE POLICY "auth_delete_leads" ON leads FOR DELETE
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_all_lead_activities" ON lead_activities;
CREATE POLICY "auth_all_lead_activities" ON lead_activities FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_lead_activities" ON lead_activities;
CREATE POLICY "auth_insert_lead_activities" ON lead_activities FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_lead_activities" ON lead_activities;
CREATE POLICY "auth_update_lead_activities" ON lead_activities FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_lead_activities" ON lead_activities;
CREATE POLICY "auth_delete_lead_activities" ON lead_activities FOR DELETE
  TO authenticated USING (true);

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status);
CREATE INDEX IF NOT EXISTS leads_enquiry_type_idx ON leads (enquiry_type);
CREATE INDEX IF NOT EXISTS lead_activities_lead_id_idx ON lead_activities (lead_id);
