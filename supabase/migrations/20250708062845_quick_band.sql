/*
  # Seed admin user for demo

  1. New Data
    - Insert demo admin user with credentials from README
    - Email: Rishabhjain@270804
    - Password: Rexjain@27 (stored as plain text for demo purposes)

  2. Security
    - Uses existing RLS policies on admin_users table
    - Demo credentials are documented in README

  Note: In production, passwords should be properly hashed
*/

INSERT INTO admin_users (email, password_hash) 
VALUES ('Rishabhjain@270804', 'Rexjain@27')
ON CONFLICT (email) DO NOTHING;