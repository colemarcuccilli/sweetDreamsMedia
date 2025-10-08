-- Simple update for Knoxville Carnival project
-- Main video is kisselinterviewfinalCAPTIONS2

UPDATE portfolio_projects
SET
  -- Update title
  title = 'Kissel Entertainment Commercial & More',

  -- Update main video to kisselinterviewfinalCAPTIONS2 - CORRECTED VIDEO ID
  video_url = 'https://iframe.videodelivery.net/3fc86dceda74ba01653ac421e0211b4c',

  -- Set thumbnail from the main interview video
  thumbnail_url = 'https://customer-w6h9o08eg118alny.cloudflarestream.com/3fc86dceda74ba01653ac421e0211b4c/thumbnails/thumbnail.jpg?time=1s',

  -- Mark as published (remove coming soon status)
  published = TRUE,

  -- Add Kissel Entertainment logo
  client_logo_url = 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/logos/kisselLogo.webp',

  -- Update client name
  client_name = 'Kissel Entertainment',

  -- Add extra videos to show in Extra Videos section
  extra_notes = 'Additional Videos in this Project:

1. Cinematic Trailer 2 Final - Video ID: 7b576d365a6ccc9dc9c1be3e8b39ae82
https://iframe.videodelivery.net/7b576d365a6ccc9dc9c1be3e8b39ae82

2. Sunset Video Final - Video ID: b4fea9b4bb925313d6c2ad0cbdb08d19
https://iframe.videodelivery.net/b4fea9b4bb925313d6c2ad0cbdb08d19

3. Day Night Final - Video ID: 2951979a7710b955fa15770099aef52a
https://iframe.videodelivery.net/2951979a7710b955fa15770099aef52a

4. Ride Showcase Final (Horizontal) - Video ID: f4854323836cd38c28e00d3f7aa260e9
https://iframe.videodelivery.net/f4854323836cd38c28e00d3f7aa260e9

5. Ride Showcase Final (Vertical) - Video ID: 6b9afe5c623a2e18edbe977a800e976e
https://iframe.videodelivery.net/6b9afe5c623a2e18edbe977a800e976e

6. Carnival Template Video Final - Video ID: 851821b5ba9d7b4ca9abc3f80660016d
https://iframe.videodelivery.net/851821b5ba9d7b4ca9abc3f80660016d',

  -- Update timestamp
  updated_at = NOW()

WHERE slug = 'knoxville-carnival-coverage';