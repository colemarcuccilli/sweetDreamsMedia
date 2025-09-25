'use client'

import { useState } from 'react'

interface ProjectVideoPlayerProps {
  videoUrl: string
  title: string
  thumbnailUrl?: string
  isMain?: boolean
}

export default function ProjectVideoPlayer({
  videoUrl,
  title,
  thumbnailUrl,
  isMain = false
}: ProjectVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

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

  // Extract video ID for auto thumbnail
  const videoId = videoUrl.match(/([a-f0-9]{32})/)?.[1] || ''
  const autoThumbnail = `https://customer-w6h9o08eg118alny.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg?time=2s`

  const handlePlay = () => {
    setIsPlaying(true)
  }

  // Show thumbnail with PLAY overlay until clicked
  if (!isPlaying) {
    return (
      <div className={`relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl group cursor-pointer ${isMain ? '' : 'mb-4'}`}
           onClick={handlePlay}>
        {/* Thumbnail */}
        <img
          src={thumbnailUrl || autoThumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />

        {/* PLAY Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-yellow-400 text-4xl font-bold tracking-wider mb-4 transform group-hover:scale-110 transition-transform duration-300">
              PLAY
            </div>
            <div className="w-20 h-20 mx-auto bg-gold/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <div className="w-0 h-0 border-l-[30px] border-l-black border-t-[18px] border-b-[18px] border-t-transparent border-b-transparent ml-2"></div>
            </div>
          </div>
        </div>

        {/* Title overlay for non-main videos */}
        {!isMain && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <p className="text-white text-sm font-semibold">{title}</p>
          </div>
        )}
      </div>
    )
  }

  // Show actual video player after clicking PLAY
  return (
    <div className={`w-full ${isMain ? '' : 'mb-4'}`}>
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
        <iframe
          src={(() => {
            // Clean the URL and add explicit parameters for controls
            const baseUrl = videoUrl.split('?')[0]
            const params = new URLSearchParams({
              'controls': 'true',
              'muted': 'false',
              'autoplay': 'true',
              'loop': 'false',
              'preload': 'auto',
              'primary': 'true',  // Cloudflare Stream specific
              'defaultTextTrack': 'false'
            })
            return `${baseUrl}?${params.toString()}`
          })()}
          className="absolute inset-0 w-full h-full"
          style={{ border: 'none' }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen={true}
          title={title}
        />
      </div>
    </div>
  )
}