/*
  # Create admin user

  1. New Data
    - Insert admin user with email 'Rishabhjain@270804' and password 'Rexjain@27'
    - Password is stored as plain text for demo purposes (in production, use proper hashing)
  
  2. Security
    - Admin user will be able to authenticate using existing RLS policies
*/

-- Insert the admin user referenced in the README and login component
INSERT INTO admin_users (email, password_hash) 
VALUES ('Rishabhjain@270804', 'Rexjain@27')
ON CONFLICT (email) DO NOTHING;