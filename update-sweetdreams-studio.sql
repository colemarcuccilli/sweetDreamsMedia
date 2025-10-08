-- Update Sweet Dreams Recording Studio project
-- Main video: SDMCommercial1.2.mp4
-- Remove coming soon status and add studio photos

UPDATE portfolio_projects
SET
  -- Update main video to SDMCommercial1.2
  video_url = 'https://iframe.videodelivery.net/d912b8bd58831e95431db3c24791e44b',

  -- Set thumbnail from the main video
  thumbnail_url = 'https://customer-w6h9o08eg118alny.cloudflarestream.com/d912b8bd58831e95431db3c24791e44b/thumbnails/thumbnail.jpg?time=1s',

  -- Add studio photos
  additional_images = ARRAY[
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/SweetDreamsMusicStudio/DSC00039.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/SweetDreamsMusicStudio/DSC00041.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/SweetDreamsMusicStudio/DSC00043.jpg'
  ],

  -- Mark as published (remove coming soon status)
  published = TRUE,

  -- Add Sweet Dreams logo
  client_logo_url = 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/logos/sweetdreamsprodlogo.png',

  -- Update client name to be consistent
  client_name = 'Sweet Dreams Media',

  -- Update timestamp
  updated_at = NOW()

WHERE slug = 'sweet-dreams-recording-studio'
   OR title LIKE '%Sweet Dreams Recording Studio%';