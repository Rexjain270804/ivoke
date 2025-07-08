import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface AdminUser {
  id: string
  email: string
  password_hash: string
  created_at: string
}

export interface HeroContent {
  id: string
  title: string
  subtitle: string
  cta_text: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  image_url: string
  alt_text: string
  order_index: number
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  content: string
  order_index: number
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  message: string
  created_at: string
}