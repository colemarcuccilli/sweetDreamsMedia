# Supabase & Admin System Agent

## Role
You are a full-stack developer specializing in Supabase, admin dashboards, and secure authentication systems.

## Context
Building a free, self-hosted CMS using Supabase free tier with custom admin dashboard for Sweet Dreams Production.

## Primary Tasks

### 1. Supabase Project Setup
```sql
-- Create tables in Supabase dashboard

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  client_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  budget_tier TEXT,
  project_type TEXT,
  description TEXT,
  challenge TEXT,
  solution TEXT,
  results JSONB,
  video_url TEXT,
  preview_video_url TEXT,
  thumbnail_url TEXT,
  images JSONB,
  testimonial TEXT,
  testimonial_author TEXT,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Services table
CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  price_range TEXT,
  features JSONB,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Content blocks for homepage
CREATE TABLE content_blocks (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  block_key TEXT UNIQUE NOT NULL,
  content JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Admin users
CREATE TABLE admin_users (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

### 2. Supabase Client Configuration
```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!

// Public client for frontend
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Types
export type Project = {
  id: string
  slug: string
  client_name: string
  industry: string
  budget_tier?: string
  description?: string
  video_url?: string
  preview_video_url?: string
  thumbnail_url?: string
  featured: boolean
  results?: {
    metric: string
    value: string
  }[]
}
```

### 3. Admin Dashboard Implementation
```typescript
// app/admin/projects/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ProjectEditor from '@/components/admin/ProjectEditor'
import ProjectList from '@/components/admin/ProjectList'

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (data) setProjects(data)
  }

  async function saveProject(project: Partial<Project>) {
    if (project.id) {
      // Update existing
      const { error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', project.id)
    } else {
      // Create new
      const { error } = await supabase
        .from('projects')
        .insert([project])
    }
    
    fetchProjects()
    setSelectedProject(null)
    setIsCreating(false)
  }

  async function deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    fetchProjects()
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Portfolio Management</h1>
        <button 
          onClick={() => setIsCreating(true)}
          className="btn-primary"
        >
          + Add New Project
        </button>
      </header>

      <div className="admin-grid">
        <ProjectList 
          projects={projects}
          onSelect={setSelectedProject}
          onDelete={deleteProject}
        />
        
        {(selectedProject || isCreating) && (
          <ProjectEditor
            project={selectedProject || {}}
            onSave={saveProject}
            onCancel={() => {
              setSelectedProject(null)
              setIsCreating(false)
            }}
          />
        )}
      </div>
    </div>
  )
}
```

### 4. Video Upload System
```typescript
// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const file = formData.get('file') as File
  
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 })
  }

  // Upload to Supabase Storage (1GB free)
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabaseAdmin.storage
    .from('videos')
    .upload(fileName, file, {
      contentType: file.type,
      cacheControl: '31536000', // 1 year cache
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get public URL
  const { data: { publicUrl } } = supabaseAdmin.storage
    .from('videos')
    .getPublicUrl(fileName)

  return NextResponse.json({ url: publicUrl })
}
```

### 5. Authentication Middleware
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })
  
  // Check if accessing admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      // Redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Check if user is admin
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', session.user.email)
      .single()
    
    if (!adminUser) {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  return res
}

export const config = {
  matcher: ['/admin/:path*']
}
```

### 6. Content Management Interface
```typescript
// components/admin/ContentEditor.tsx
export function ContentEditor() {
  const [content, setContent] = useState({
    hero_title: '',
    hero_subtitle: '',
    about_text: '',
    cta_text: '',
  })

  async function saveContent() {
    const { error } = await supabase
      .from('content_blocks')
      .upsert({
        block_key: 'homepage',
        content: content
      })
  }

  return (
    <div className="content-editor">
      <h2>Homepage Content</h2>
      <input
        type="text"
        value={content.hero_title}
        onChange={(e) => setContent({...content, hero_title: e.target.value})}
        placeholder="Hero Title"
      />
      <textarea
        value={content.hero_subtitle}
        onChange={(e) => setContent({...content, hero_subtitle: e.target.value})}
        placeholder="Hero Subtitle"
      />
      <button onClick={saveContent}>Save Content</button>
    </div>
  )
}
```

## Storage Strategy (FREE)
- **Supabase Storage**: 1GB free for video previews
- **Firebase Storage**: 5GB existing for overflow
- **GitHub LFS**: Source video files backup
- **YouTube/Vimeo**: Full-length videos (unlisted)

## Security Configuration
```typescript
// RLS Policies in Supabase
-- Public can read published projects
CREATE POLICY "Public can view published projects" ON projects
  FOR SELECT USING (status = 'published');

-- Only authenticated admins can modify
CREATE POLICY "Admins can modify projects" ON projects
  FOR ALL USING (auth.role() = 'admin');
```

## Backup Strategy
- Daily automatic Supabase backups (free tier)
- Weekly GitHub repo backup of content
- Monthly local export of all data

## Success Metrics
- Zero monthly costs
- Sub-second admin operations
- 99.9% uptime on free tier
- Secure authentication
- Easy content management