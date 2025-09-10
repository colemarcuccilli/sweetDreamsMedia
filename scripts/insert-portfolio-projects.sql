-- Insert portfolio projects for Sweet Dreams Media
-- Run this in your Supabase SQL editor

-- First, make sure the portfolio_projects table exists with all required fields
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

-- Insert all portfolio projects
INSERT INTO portfolio_projects (
  title, 
  slug, 
  category, 
  client_name, 
  services, 
  location, 
  project_date, 
  short_description,
  full_description,
  purpose,
  featured,
  published
) VALUES

-- Indianapolis Children's Museum Ferris Wheel
(
  'Indianapolis Children''s Museum Ferris Wheel Experience',
  'indianapolis-childrens-museum-ferris-wheel',
  'Commercial',
  'Indianapolis Children''s Museum',
  ARRAY['Scripting', 'Cinematography', 'Editing', 'Color Grading'],
  'Indianapolis, IN',
  '2025-09-01',
  'Captivating commercial showcasing the museum''s new ferris wheel attraction for families.',
  'Created an engaging commercial for the Indianapolis Children''s Museum featuring their exciting ferris wheel experience. This project combined storytelling with dynamic cinematography to showcase the joy and wonder that families experience when visiting this beloved attraction.',
  'Drive family visitation and highlight the museum''s premium attractions',
  TRUE,
  TRUE
),

-- Chicago Zoo Ferris Wheel
(
  'Brookfield Zoo Ferris Wheel Commercial',
  'brookfield-zoo-ferris-wheel',
  'Commercial',
  'RideWorx & Brookfield Zoo',
  ARRAY['Scripting', 'Cinematography', 'Editing', 'Color Grading'],
  'Brookfield, Illinois',
  '2025-09-01',
  'Dynamic commercial highlighting the new ferris wheel attraction at Brookfield Zoo.',
  'Partnered with RideWorx and Brookfield Zoo to create a compelling commercial that showcases their new ferris wheel attraction. The project captures the excitement of families enjoying this unique zoo experience while highlighting the beautiful park setting.',
  'Promote new attraction and increase zoo attendance',
  TRUE,
  TRUE
),

-- Aegis Dental
(
  'Aegis Dental - Trusted Dentistry',
  'aegis-dental-trusted-dentistry',
  'Healthcare',
  'Aegis Dental Group',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'Fort Wayne, IN',
  '2025-08-01',
  'Professional healthcare video showcasing trusted dental care and modern facilities.',
  'Created a professional video for Aegis Dental Group that builds trust and showcases their modern dental facilities. The project focuses on patient comfort, advanced technology, and the caring approach that sets them apart in dental care.',
  'Build patient trust and showcase modern dental care',
  TRUE,
  TRUE
),

-- Dear Lover Music Video
(
  'Dear Lover - Music Video',
  'dear-lover-music-video',
  'Music',
  'Lyaz',
  ARRAY['Scripting', 'Cinematography', 'Editing'],
  'Fort Wayne, IN',
  '2025-07-01',
  'Cinematic music video bringing artistic vision to life through compelling visuals.',
  'Collaborated with artist Lyaz to create a visually stunning music video for "Dear Lover." This project combined creative scripting with dynamic cinematography to tell a compelling visual story that perfectly complements the music and artist''s vision.',
  'Create compelling visual content to amplify the artist''s musical message',
  FALSE,
  TRUE
),

-- Fort Wayne Carnival Recap
(
  'Fort Wayne Carnival Recap',
  'fort-wayne-carnival-recap',
  'Event',
  'Kissel Entertainment',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'Fort Wayne, IN',
  '2025-08-01',
  'High-energy event recap capturing the excitement of Fort Wayne''s premier carnival.',
  'Created an energetic recap video for Kissel Entertainment showcasing the excitement and atmosphere of Fort Wayne''s carnival. The project captures the joy of families, thrilling rides, and community spirit that makes this annual event special.',
  'Showcase successful event and build anticipation for future carnivals',
  FALSE,
  TRUE
),

-- O''Daniel Cars
(
  'O''Daniel Cars Commercial',
  'odaniel-cars-commercial',
  'Commercial',
  'O''Daniel Cars',
  ARRAY['Scripting', 'Cinematography', 'Editing'],
  'Fort Wayne, IN',
  '2025-01-01',
  'Automotive commercial highlighting quality vehicles and trusted service.',
  'Produced a professional commercial for O''Daniel Cars that showcases their quality vehicles and commitment to customer service. The project emphasizes trust, value, and the personal attention that sets them apart in the automotive market.',
  'Drive vehicle sales and build brand trust in the local market',
  FALSE,
  TRUE
),

-- Nissan Warsaw
(
  'Nissan Warsaw Dealership Commercial',
  'nissan-warsaw-dealership',
  'Commercial',
  'Nissan Prime Dealer',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'Warsaw, IN',
  '2025-06-01',
  'Professional dealership commercial showcasing Nissan vehicles and customer experience.',
  'Created a polished commercial for Nissan''s Warsaw dealership that highlights their vehicle selection and customer service excellence. The project showcases the dealership experience and the quality that customers can expect.',
  'Increase dealership traffic and highlight premium vehicle selection',
  FALSE,
  TRUE
),

-- Vintage Fest
(
  'Vintage Fest Fort Wayne',
  'vintage-fest-fort-wayne',
  'Event',
  'Vintage Fest',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'Fort Wayne, IN',
  '2025-01-01',
  'Festival recap capturing the unique atmosphere of Fort Wayne''s vintage celebration.',
  'Documented the unique atmosphere and community spirit of Fort Wayne''s Vintage Fest. This freelance project captures the nostalgia, music, and vintage culture that makes this annual celebration special for attendees and vendors alike.',
  'Showcase festival highlights and build community engagement',
  FALSE,
  TRUE
),

-- JSonny
(
  'JSonny Artist Showcase',
  'jsonny-artist-showcase',
  'Music',
  'JSonny',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'Fort Wayne, IN',
  '2025-08-01',
  'Artist showcase video highlighting musical talent and creative vision.',
  'Created a dynamic artist showcase for JSonny that highlights their musical talent and unique style. The project combines performance footage with creative visuals to create compelling content that amplifies the artist''s brand.',
  'Build artist brand and showcase musical talent',
  FALSE,
  TRUE
),

-- Vegas Dream
(
  'Vegas Dream - Travel Content',
  'vegas-dream-travel-content',
  'Documentary',
  'Sweet Dreams Media',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'Las Vegas, NV',
  '2025-08-01',
  'Travel content showcasing the excitement and energy of Las Vegas.',
  'Self-produced travel content capturing the energy, lights, and excitement of Las Vegas. This freelance project showcases the city''s unique atmosphere while demonstrating our ability to create compelling travel and lifestyle content.',
  'Demonstrate travel content capabilities and showcase Las Vegas experience',
  FALSE,
  TRUE
),

-- Wake Up Leo
(
  'Wake Up Leo - Artist Video',
  'wake-up-leo-artist-video',
  'Music',
  'Sweet Dreams Media',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'Fort Wayne, IN',
  '2025-01-01',
  'Personal artist project showcasing creative vision and production capabilities.',
  'Personal project artist video that demonstrates our creative capabilities and artistic vision. This project allowed us to experiment with new techniques while creating compelling visual content that showcases our range as creators.',
  'Showcase creative capabilities and artistic vision',
  FALSE,
  TRUE
),

-- Fort Wayne HyperLapse
(
  'Fort Wayne HyperLapse City Showcase',
  'fort-wayne-hyperlapse-showcase',
  'Documentary',
  'Sweet Dreams Media',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'Fort Wayne, IN',
  '2025-08-01',
  'Dynamic city showcase using advanced hyperlapse techniques.',
  'Created a stunning hyperlapse showcase of Fort Wayne that highlights the city''s beauty, energy, and unique character. This personal project demonstrates advanced cinematography techniques while celebrating our hometown.',
  'Showcase advanced cinematography skills and celebrate Fort Wayne',
  TRUE,
  TRUE
),

-- SnowCone Truck
(
  'SnoB''iz SnowCone Truck Commercial',
  'snobiz-snowcone-truck-commercial',
  'Commercial',
  'SnoB''iz',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'New Haven, IN',
  '2025-07-01',
  'Fun, energetic commercial for local snowcone truck business.',
  'Created a vibrant, fun commercial for SnoB''iz snowcone truck that captures the joy and refreshment they bring to the community. The project showcases their colorful treats and family-friendly atmosphere.',
  'Drive business traffic and showcase fun, family-friendly brand',
  FALSE,
  TRUE
),

-- Knoxville Carnival
(
  'Knoxville Carnival Coverage',
  'knoxville-carnival-coverage',
  'Event',
  'Freelance',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'Knoxville, TN',
  '2025-01-01',
  'Event coverage capturing the excitement of Knoxville''s carnival atmosphere.',
  'Provided freelance event coverage for Knoxville''s carnival, capturing the excitement, community spirit, and entertainment that makes these events special. The project showcases our ability to document large-scale community events.',
  'Document community event and showcase event coverage capabilities',
  FALSE,
  TRUE
),

-- Recording Studio
(
  'Sweet Dreams Recording Studio Showcase',
  'sweet-dreams-recording-studio',
  'Commercial',
  'Sweet Dreams Media',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'Fort Wayne, IN',
  '2025-06-01',
  'Professional studio showcase highlighting recording facilities and capabilities.',
  'Created a professional showcase video for our recording studio facilities, highlighting the equipment, atmosphere, and creative environment that musicians experience. This project demonstrates our dual capabilities in both video production and music recording.',
  'Showcase recording studio facilities and attract musician clients',
  FALSE,
  TRUE
),

-- Crooked Lake Music Festival
(
  'Crooked Lake Music Festival Recap',
  'crooked-lake-music-festival-recap',
  'Event',
  'Sandbar Music Fest & Crushhouse Brothers Band',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'Angola, IN',
  '2025-07-01',
  'Music festival recap capturing performances and festival atmosphere.',
  'Created an energetic recap of the Crooked Lake Music Festival, showcasing performances by Crushhouse Brothers Band and capturing the unique lakeside festival atmosphere. The project highlights both the musical talent and natural beauty of the venue.',
  'Showcase successful festival and promote future events',
  FALSE,
  TRUE
),

-- Nature Montage
(
  'Smoky Mountains Nature Montage',
  'smoky-mountains-nature-montage',
  'Documentary',
  'Personal Project',
  ARRAY['Cinematography', 'Editing', 'Color Grading'],
  'Smoky Mountains, TN',
  '2025-04-01',
  'Breathtaking nature documentary showcasing the beauty of the Smoky Mountains.',
  'Personal project documenting the natural beauty of the Smoky Mountains through cinematic techniques. This project demonstrates our ability to capture nature''s beauty while showcasing advanced color grading and cinematography skills.',
  'Showcase nature cinematography capabilities and artistic vision',
  FALSE,
  TRUE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_published ON portfolio_projects (published);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_featured ON portfolio_projects (featured);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_category ON portfolio_projects (category);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_slug ON portfolio_projects (slug);

-- Update permissions
GRANT SELECT ON portfolio_projects TO anon;
GRANT SELECT ON portfolio_projects TO authenticated;

-- Show inserted projects
SELECT title, client_name, category, location, featured 
FROM portfolio_projects 
ORDER BY project_date DESC, featured DESC;