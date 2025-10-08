-- REMOVE AND RE-ADD VEGAS DREAM PROJECT TO FIX THUMBNAIL
-- Execute this in your Supabase SQL Editor

-- 1. Remove Vegas Dream project completely
DELETE FROM portfolio_projects 
WHERE title LIKE '%Vegas Dream%';

-- 2. Re-add Vegas Dream project with fresh data
INSERT INTO portfolio_projects (
    title,
    slug,
    category,
    client,
    client_name,
    services,
    location,
    project_date,
    short_description,
    full_description,
    video_url,
    cloudflare_stream_id,
    cloudflare_stream_url,
    cloudflare_thumbnail_url,
    thumbnail_url,
    client_logo_url,
    featured,
    published
) VALUES (
    'Vegas Dream - Travel Content',
    'vegas-dream-travel-content',
    'commercial',
    'Sweet Dreams Media',
    'Sweet Dreams Media',
    ARRAY['Video Production', 'Travel Content', 'Cinematic'],
    'Las Vegas, Nevada',
    '2024-01-01',
    'Cinematic travel content showcasing the vibrant energy and luxury of Las Vegas',
    'A stunning visual journey through Las Vegas, capturing the city''s iconic landmarks, luxurious hotels, and electric atmosphere. This travel content piece showcases our ability to create compelling destination marketing materials.',
    'https://iframe.videodelivery.net/a3cd0eb92f95b9b5bef859c197a91465?muted=true&controls=false&autoplay=true&loop=true',
    'a3cd0eb92f95b9b5bef859c197a91465',
    'https://customer-bt0bzj0ogm4g5mbc.cloudflarestream.com/a3cd0eb92f95b9b5bef859c197a91465/manifest/video.m3u8',
    'https://customer-bt0bzj0ogm4g5mbc.cloudflarestream.com/a3cd0eb92f95b9b5bef859c197a91465/thumbnails/thumbnail.jpg?time=5s',
    'https://customer-bt0bzj0ogm4g5mbc.cloudflarestream.com/a3cd0eb92f95b9b5bef859c197a91465/thumbnails/thumbnail.jpg?time=5s',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/logos/sweetdreamsmusiclogo.png',
    false,
    true
);

-- 3. VERIFY THE PROJECT WAS RECREATED
SELECT 
    title,
    CASE 
        WHEN thumbnail_url IS NOT NULL THEN '✅ HAS THUMBNAIL' 
        ELSE '❌ NO THUMBNAIL' 
    END as thumbnail_status,
    CASE 
        WHEN video_url IS NOT NULL THEN '✅ HAS VIDEO' 
        ELSE '❌ NO VIDEO' 
    END as video_status,
    thumbnail_url
FROM portfolio_projects 
WHERE title LIKE '%Vegas Dream%';