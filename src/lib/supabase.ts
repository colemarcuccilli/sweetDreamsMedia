import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Helper function to create client
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Public client for frontend - lazy initialization
export const supabase = (() => {
  try {
    return createClient()
  } catch (error) {
    // Return a mock client during build time
    return null as any
  }
})()

// Function to create admin client only when needed (server-side)
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('SUPABASE_SERVICE_KEY and SUPABASE_URL are required for admin operations')
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}


// Database types
export type Project = {
  id: string
  slug: string
  client_name: string
  industry: 'corporate' | 'healthcare' | 'entertainment' | 'events' | 'music'
  budget_tier: 'basic' | 'standard' | 'premium' | 'enterprise'
  project_type: string
  description: string
  challenge?: string
  solution?: string
  results?: {
    metric: string
    value: string
  }[]
  video_url?: string
  preview_video_url?: string
  thumbnail_url?: string
  images?: string[]
  testimonial?: string
  testimonial_author?: string
  featured: boolean
  sort_order: number
  status: 'draft' | 'published'
  created_at: string
  updated_at: string
}

export type Service = {
  id: string
  slug: string
  title: string
  description: string
  short_description: string
  price_range: string
  features: string[]
  icon: string
  sort_order: number
  active: boolean
  created_at: string
}

export type ContentBlock = {
  id: string
  block_key: string
  content: any
  updated_at: string
}

export type AdminUser = {
  id: string
  email: string
  password_hash: string
  role: string
  last_login?: string
  created_at: string
}