# Optimal Supabase Storage Structure

## Single Bucket with Folders (Recommended)
```
media/
├── logos/
│   ├── kissel-logo.png
│   ├── sweet-dreams-logo.png
│   ├── trusted-dental-logo.png
│   └── ...
├── projects/
│   ├── fort-wayne-carnival/
│   │   ├── thumbnail.jpg
│   │   ├── gallery-1.jpg
│   │   ├── gallery-2.mp4
│   │   └── behind-scenes.jpg
│   ├── wake-up-blind/
│   │   ├── thumbnail.jpg
│   │   ├── set-photos/
│   │   └── extras/
│   ├── aegis-implant/
│   └── brookfield-zoo/
└── general/
    ├── backgrounds/
    └── ui-elements/
```

## Benefits:
- **Cost**: Only 1 bucket = minimal cost
- **Organization**: Clear folder structure
- **Scalability**: Easy to add projects
- **URLs**: Clean paths like `/media/projects/carnival/gallery-1.jpg`

## Database Updates:
```sql
-- Logos
client_logo_url = 'https://[project]/storage/v1/object/public/media/logos/kissel-logo.png'

-- Project galleries  
additional_images = ARRAY[
  'https://[project]/storage/v1/object/public/media/projects/carnival/gallery-1.jpg',
  'https://[project]/storage/v1/object/public/media/projects/carnival/gallery-2.mp4'
]
```

## Alternative: Multiple buckets would cost ~$0.25/month per bucket
With 17+ projects = $4+ monthly just for storage organization