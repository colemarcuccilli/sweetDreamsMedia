import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Get Supabase client instance
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables:', {
      url: !!supabaseUrl,
      key: !!supabaseAnonKey
    })
    throw new Error('Missing Supabase environment variables')
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Legacy export for backward compatibility
export function createClient() {
  return getSupabaseClient()
}

// Initialize client safely
let _supabaseClient: any = null

export const supabase = new Proxy({} as any, {
  get(target, prop) {
    if (!_supabaseClient) {
      try {
        _supabaseClient = getSupabaseClient()
      } catch (error) {
        console.error('Failed to initialize Supabase client:', error)
        return undefined
      }
    }
    return _supabaseClient[prop]
  }
})

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