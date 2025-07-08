/*
  # Insert Admin User

  1. New Data
    - Insert admin user with email 'Rishabhjain@270804'
    - Set password hash (in production, this should be properly hashed)
    - Set creation timestamp

  2. Security
    - Admin user will be able to authenticate using existing RLS policies
    - Password is stored as plain text for demo purposes (should be hashed in production)

  Note: In a production environment, passwords should be properly hashed using bcrypt or similar.
*/

INSERT INTO admin_users (email, password_hash, created_at)
VALUES ('Rishabhjain@270804', 'Rexjain@27', now())
ON CONFLICT (email) DO NOTHING;