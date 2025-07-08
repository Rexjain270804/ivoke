/*
  # Add default admin user

  1. New Data
    - Insert default admin user with email 'Rishabhjain@270804'
    - Password hash for 'Rexjain@27' using bcrypt
    - Auto-generated UUID and timestamp

  2. Security
    - Uses existing RLS policies on admin_users table
    - Password is properly hashed using bcrypt

  Note: This creates the admin user referenced in the README.md file
*/

-- Insert the default admin user
INSERT INTO admin_users (email, password_hash, created_at)
VALUES (
  'Rishabhjain@270804',
  '$2b$10$8K1p/a0dLOZ06X.ij/.OQeBjXDttR5qHb/7WeqO.KhB.bXauO8/Eq', -- bcrypt hash for 'Rexjain@27'
  now()
)
ON CONFLICT (email) DO NOTHING; -- Prevents duplicate if user already exists