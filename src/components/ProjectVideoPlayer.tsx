'use client'

interface ProjectVideoPlayerProps {
  videoUrl: string
  title: string
  thumbnailUrl?: string
}

export default function ProjectVideoPlayer({
  videoUrl,
  title,
  thumbnailUrl
}: ProjectVideoPlayerProps) {
  if (!videoUrl) {
    return (
      <div className="w-full aspect-video bg-black flex items-center justify-center rounded-lg">
        <div className="text-white text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-gray-400">Video Not Available</p>
        </div>
      </div>
    )
  }

  // Build proper Cloudflare Stream URL with audio
  const buildVideoUrl = () => {
    let url = videoUrl

    console.log('Original video URL:', url)

    // Remove any existing parameters and add the ones that actually work
    const baseUrl = url.split('?')[0]

    // Force these specific parameters for Cloudflare Stream
    const params = [
      'controls=true',
      'muted=false',
      'autoplay=false',
      'preload=metadata',
      'poster=' + (thumbnailUrl || ''),
      'defaultTextTrack=false'
    ].filter(param => param !== 'poster=' && param !== '')

    const finalUrl = `${baseUrl}?${params.join('&')}`

    console.log('Built video URL:', finalUrl)
    return finalUrl
  }

  return (
    <div className="w-full">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
        <iframe
          src={buildVideoUrl()}
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen={true}
          title={title}
        />

        {/* Debug info */}
        <div className="absolute top-2 left-2 bg-black/80 text-white text-xs p-2 rounded opacity-50 hover:opacity-100">
          Audio: ON | Controls: VISIBLE
        </div>
      </div>
    </div>
  )
}