-- Update Knoxville Carnival Coverage project with new videos and content
-- Main video: kisselinterviewfinal
-- Additional videos: CinematicTrailer2Final, sunsetvideoFINAL, DayNightFinal, RideShowcaseFinal, RideshowcaseFinalVertical, carnivaltemplatevidFINAL

UPDATE portfolio_projects
SET
  -- Update main video to kisselinterviewfinal with captions
  video_url = 'https://iframe.videodelivery.net/3fc86dceda74ba01653ac421e0211b4c',

  -- Update title and descriptions with more comprehensive content
  title = 'Kissel Entertainment Commercial & More',
  short_description = 'Comprehensive carnival coverage featuring exclusive interviews, cinematic showcases, and immersive event documentation for Kissel Entertainment.',
  full_description = 'A multi-faceted commercial project capturing the full carnival experience through various perspectives. This comprehensive coverage includes an exclusive interview with Kissel Entertainment leadership, cinematic trailers showcasing the event atmosphere, stunning sunset visuals, day-to-night transformations, and dynamic ride showcases.

The project demonstrates our versatility in event documentation, from intimate interviews to sweeping cinematic shots, delivering a complete visual narrative that captures both the business side and the magical experience of carnival entertainment.

This extensive coverage provides Kissel Entertainment with a complete content package suitable for marketing, documentation, and promotional use across all platforms.',

  -- Update client name to reflect actual client
  client_name = 'Kissel Entertainment',

  -- Add all video IDs as additional content (stored in extra_notes temporarily until we have proper multi-video support)
  extra_notes = 'Additional Videos in this Project:

Main Interview (with captions) - Video ID: 3fc86dceda74ba01653ac421e0211b4c
   https://iframe.videodelivery.net/3fc86dceda74ba01653ac421e0211b4c

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

  -- Update services to reflect the comprehensive nature of the project
  services = ARRAY[
    'Commercial Production',
    'Event Coverage',
    'Interview Production',
    'Cinematic Trailers',
    'Vertical Content',
    'Multi-Format Delivery',
    'Color Grading',
    'Sound Design'
  ],

  -- Update purpose
  purpose = 'Multi-format carnival documentation and promotional content creation',

  -- Mark as featured since this is a major project
  featured = TRUE,

  -- Mark as published (remove coming soon status)
  published = TRUE,

  -- Add Kissel Entertainment logo
  client_logo_url = 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/logos/kisselLogo.webp',

  -- Add all project photos to additional_images array
  additional_images = ARRAY[
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/_DSC8522.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/_DSC8528.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/_DSC8875.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/_DSC8923.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/_DSC8934.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/_DSC8938.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/_DSC8943.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/_DSC8959.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/_DSC8963.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/_DSC9074.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DJI_20250912211137_0109_D.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DJI_20250912212213_0133_D.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DJI_20250912212541_0149_D.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DJI_20250912213926_0169_D.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DJI_20250912214019_0181_D.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08497.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08500.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08502.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08504.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08506.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08516.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08526.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08561.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08568.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08583.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08585.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08595.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08604.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08606.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08609.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08613.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08619.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08632.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08639.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08650.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08654.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08671.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08677.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08681.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08689.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08735.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08738.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08775.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08788.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08829.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08840.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08853.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08864.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08871.jpg',
    'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DSC08873.jpg'
  ],

  -- Update thumbnail to use one of the best photos
  thumbnail_url = 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/projects/KnoxvilleCarnival/DJI_20250912212541_0149_D.jpg',

  -- Update timestamp
  updated_at = NOW()

WHERE slug = 'knoxville-carnival-coverage';