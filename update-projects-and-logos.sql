-- UPDATE PROJECTS AND LOGOS
-- Execute this in your Supabase SQL Editor

-- 1. Update Vegas Dream thumbnail to use custom cover image
UPDATE portfolio_projects 
SET thumbnail_url = 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/VegasDream/VegasDreamCover.png'
WHERE title LIKE '%Vegas Dream%';

-- 2. Hide Sweet Dreams Recording Studio Showcase project (unpublish it)
UPDATE portfolio_projects 
SET published = false
WHERE title LIKE '%Sweet Dreams Recording Studio%' OR title LIKE '%Recording Studio%';

-- 3. Add Sweet Dreams Prod logo to Cumberland Falls project
UPDATE portfolio_projects 
SET client_logo_url = 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/logos/sweetdreamsprodlogo.png'
WHERE title LIKE '%Cumberland Falls%';

-- 4. Add Sweet Dreams Prod logo to Vegas Dream project
UPDATE portfolio_projects 
SET client_logo_url = 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/logos/sweetdreamsprodlogo.png'
WHERE title LIKE '%Vegas Dream%';

-- 4. VERIFY ALL UPDATES
SELECT 
    title,
    published,
    CASE 
        WHEN thumbnail_url IS NOT NULL THEN '✅ HAS THUMBNAIL' 
        ELSE '❌ NO THUMBNAIL' 
    END as thumbnail_status,
    CASE 
        WHEN client_logo_url IS NOT NULL THEN '✅ HAS LOGO' 
        ELSE '❌ NO LOGO' 
    END as logo_status,
    thumbnail_url,
    client_logo_url
FROM portfolio_projects 
WHERE title LIKE '%Vegas Dream%' 
   OR title LIKE '%Cumberland Falls%'
   OR title LIKE '%Sweet Dreams Recording Studio%'
   OR title LIKE '%Recording Studio%'
ORDER BY published DESC, title;