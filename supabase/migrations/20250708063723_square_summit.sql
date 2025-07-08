/*
  # Create Admin User for Authentication

  1. Purpose
     - Creates an admin user in Supabase Auth system
     - Matches the credentials specified in README.md
     - Enables admin login functionality

  2. Admin Credentials
     - Email: Rishabhjain@270804
     - Password: Rexjain@27 (will be hashed by Supabase)

  3. Security
     - User will be created with email confirmation disabled for immediate access
     - Password will be securely hashed by Supabase Auth system

  Note: This migration creates the user directly in auth.users table
  The admin_users table in public schema can be used for additional admin metadata
*/

-- Insert admin user into Supabase auth system
-- This creates the user that can actually log in
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'authenticated',
  'Rishabhjain@270804',
  crypt('Rexjain@27', gen_salt('bf')),
  NOW(),
  NULL,
  NULL,
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
);

-- Insert corresponding record in public.admin_users table
INSERT INTO public.admin_users (email, password_hash)
SELECT 
  'Rishabhjain@270804',
  crypt('Rexjain@27', gen_salt('bf'))
WHERE NOT EXISTS (
  SELECT 1 FROM public.admin_users WHERE email = 'Rishabhjain@270804'
);