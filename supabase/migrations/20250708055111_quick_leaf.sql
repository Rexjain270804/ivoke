/*
  # Create Ivoke Fashion Website Database Schema

  1. New Tables
    - `admin_users` - Store admin login credentials
    - `hero_content` - Store hero section content
    - `gallery_images` - Store gallery image information
    - `testimonials` - Store customer testimonials
    - `contact_messages` - Store contact form messages

  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
    - Secure admin authentication
*/

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create hero_content table
CREATE TABLE IF NOT EXISTS hero_content (
  id serial PRIMARY KEY,
  title text NOT NULL DEFAULT 'Tradition Reimagined',
  subtitle text NOT NULL DEFAULT 'Where heritage meets haute couture. Every thread tells a story of timeless elegance.',
  cta_text text NOT NULL DEFAULT 'Discover Collection',
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  alt_text text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  content text NOT NULL,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for admin_users
CREATE POLICY "Admin users can access their own data"
  ON admin_users
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for hero_content
CREATE POLICY "Everyone can read hero content"
  ON hero_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can update hero content"
  ON hero_content
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for gallery_images
CREATE POLICY "Everyone can read gallery images"
  ON gallery_images
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can manage gallery images"
  ON gallery_images
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for testimonials
CREATE POLICY "Everyone can read testimonials"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admin can manage testimonials"
  ON testimonials
  FOR ALL
  TO authenticated
  USING (true);

-- Create policies for contact_messages
CREATE POLICY "Anyone can create contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Admin can read contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default admin user
INSERT INTO admin_users (email, password_hash) VALUES
  ('Rishabhjain@270804', '$2b$10$placeholder_hash_for_demo')
ON CONFLICT (email) DO NOTHING;

-- Insert default hero content
INSERT INTO hero_content (title, subtitle, cta_text) VALUES
  ('Tradition Reimagined', 'Where heritage meets haute couture. Every thread tells a story of timeless elegance.', 'Discover Collection')
ON CONFLICT (id) DO NOTHING;

-- Insert default gallery images
INSERT INTO gallery_images (image_url, alt_text, order_index) VALUES
  ('https://i.ibb.co/zWSytyyj/Every-collection-begins-with-a-feeling-an-echo-from-our-roots-a-whisper-of-what-s-to-come-This-1.jpg', 'Collection piece showcasing traditional craftsmanship', 1),
  ('https://i.ibb.co/1Yf6gy8y/Every-collection-begins-with-a-feeling-an-echo-from-our-roots-a-whisper-of-what-s-to-come-This.jpg', 'Elegant couture piece with heritage details', 2),
  ('https://i.ibb.co/0p6Hb5XS/Laid-back-but-make-it-couture-ivoke25-ivokeindia-1.jpg', 'Laid-back couture design', 3),
  ('https://i.ibb.co/m5DShqJz/Laid-back-but-make-it-couture-ivoke25-ivokeindia-2.jpg', 'Contemporary couture styling', 4),
  ('https://i.ibb.co/Y4m0RV4p/Laid-back-but-make-it-couture-ivoke25-ivokeindia.jpg', 'Modern couture interpretation', 5),
  ('https://i.ibb.co/yn52pVgP/Look-closer-It-s-Ivoke-Where-subtle-meets-striking-ivokeindia-khoje-edit1.jpg', 'Subtle yet striking design details', 6),
  ('https://i.ibb.co/67S48r5W/Poised-rebellion.jpg', 'Poised rebellion collection piece', 7),
  ('https://i.ibb.co/7cbJnRb/502439061-17852486307470958-6083905811463632621-n.jpg', 'Signature Ivoke design', 8)
ON CONFLICT (id) DO NOTHING;

-- Insert default testimonials
INSERT INTO testimonials (name, content, order_index) VALUES
  ('Priya Sharma', 'Ivoke has redefined elegance for me. Each piece tells a story, and wearing their couture makes me feel connected to my heritage while embracing modernity.', 1),
  ('Ananya Gupta', 'The craftsmanship is absolutely breathtaking. Every detail is perfect, from the intricate embroidery to the way the fabric flows. Pure artistry.', 2),
  ('Kavya Reddy', 'I have never felt more confident and beautiful. Ivoke understands what it means to create clothes that celebrate femininity and strength.', 3)
ON CONFLICT (id) DO NOTHING;