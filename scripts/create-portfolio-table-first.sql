-- First, create the portfolio_projects table with all required columns
-- Run this FIRST in your Supabase SQL editor

-- Drop existing table if it has wrong structure (optional)
-- DROP TABLE IF EXISTS portfolio_projects;

-- Create the complete portfolio_projects table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  client_name TEXT NOT NULL,
  services TEXT[] NOT NULL DEFAULT '{}',
  location TEXT NOT NULL,
  project_date DATE,
  short_description TEXT,
  full_description TEXT,
  purpose TEXT,
  video_url TEXT,
  thumbnail_url TEXT,
  additional_images TEXT[] DEFAULT '{}',
  cloudflare_stream_id TEXT,
  cloudflare_stream_url TEXT,
  cloudflare_thumbnail_url TEXT,
  client_logo_url TEXT,
  client_website_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  budget_range TEXT,
  results_metrics TEXT,
  testimonial TEXT,
  testimonial_author TEXT,
  extra_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_published ON portfolio_projects (published);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured ON portfolio_projects (featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category ON portfolio_projects (category);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_slug ON portfolio_projects (slug);

-- Grant permissions
GRANT SELECT ON portfolio_projects TO anon;
GRANT SELECT ON portfolio_projects TO authenticated;

-- Check if table was created successfully
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'portfolio_projects' 
ORDER BY ordinal_position;