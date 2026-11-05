/*
# Tighten anon privileges on leads and lead_activities

## Why
The security posture shows `anon` holds SELECT, INSERT, UPDATE, DELETE on both
`leads` and `lead_activities`. The public enquiry form only needs to INSERT into
`leads`; everything else must be admin-only (authenticated). Excess anon grants
mean an unauthenticated visitor could read or modify every lead, which is a
data-leak and tampering risk.

## Changes
1. Revoke SELECT, UPDATE, DELETE from `anon` on `leads` (keep INSERT).
2. Revoke SELECT, INSERT, UPDATE, DELETE from `anon` on `lead_activities`.
3. Re-grant INSERT on `leads` to `anon` (idempotent).
4. No schema changes; RLS policies unchanged (anon still has the INSERT policy).
*/

REVOKE SELECT, UPDATE, DELETE ON leads FROM anon;
REVOKE SELECT, INSERT, UPDATE, DELETE ON lead_activities FROM anon;
GRANT INSERT ON leads TO anon;
