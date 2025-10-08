'use client'

import { useState } from 'react'

interface VideoInfo {
  title: string
  videoId: string
  url: string
}

interface ProjectVideosSectionProps {
  extraNotes: string | null
  mainVideoUrl: string
  projectTitle: string
}

export default function ProjectVideosSection({ extraNotes, mainVideoUrl, projectTitle }: ProjectVideosSectionProps) {
  const [selectedVideo, setSelectedVideo] = useState<string>(mainVideoUrl)

  // Parse additional videos from extra_notes
  const additionalVideos: VideoInfo[] = []

  if (extraNotes && extraNotes.includes('Video ID:')) {
    const lines = extraNotes.split('\n')
    let currentVideo: Partial<VideoInfo> = {}

    lines.forEach(line => {
      if (line.includes(' - Video ID: ')) {
        // Extract title and video ID
        const match = line.match(/(.+?) - Video ID: ([a-f0-9]{32})/)
        if (match) {
          currentVideo.title = match[1].replace(/^\d+\.\s*/, '').trim()
          currentVideo.videoId = match[2]
        }
      } else if (line.includes('https://iframe.videodelivery.net/')) {
        currentVideo.url = line.trim()
        if (currentVideo.title && currentVideo.videoId && currentVideo.url) {
          additionalVideos.push(currentVideo as VideoInfo)
          currentVideo = {}
        }
      }
    })
  }

  // Extract main video ID
  const mainVideoId = mainVideoUrl.match(/([a-f0-9]{32})/)?.[1] || ''

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-playfair font-bold text-white mb-8 flex items-center gap-3">
        <span className="text-gold">🎬</span> Project Videos
      </h2>

      {/* Main Video Player */}
      <div className="mb-8">
        <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
          <iframe
            src={`${selectedVideo}?controls=true&muted=false&autoplay=false&loop=false&preload=auto`}
            className="w-full h-full"
            style={{ border: 'none' }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen={true}
            title={projectTitle}
          />
        </div>
      </div>

      {/* Video Thumbnails Grid */}
      {additionalVideos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-300 mb-4">All Project Videos ({additionalVideos.length + 1})</h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Main Video Thumbnail */}
            <button
              onClick={() => setSelectedVideo(mainVideoUrl)}
              className={`relative group overflow-hidden rounded-lg transition-all duration-300 ${
                selectedVideo === mainVideoUrl ? 'ring-2 ring-gold scale-95' : 'hover:scale-105'
              }`}
            >
              <div className="aspect-video bg-gray-800 relative">
                <img
                  src={`https://customer-w6h9o08eg118alny.cloudflarestream.com/${mainVideoId}/thumbnails/thumbnail.jpg?time=1s`}
                  alt="Main Video"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-gold/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-0 h-0 border-l-6 border-l-black border-t-3 border-b-3 border-t-transparent border-b-transparent ml-0.5"></div>
                  </div>
                </div>
                {selectedVideo === mainVideoUrl && (
                  <div className="absolute top-2 right-2 bg-gold text-black px-2 py-1 text-xs font-semibold rounded">
                    NOW PLAYING
                  </div>
                )}
              </div>
              <div className="p-2 bg-gray-900">
                <p className="text-xs text-white font-medium truncate">Main Interview</p>
              </div>
            </button>

            {/* Additional Video Thumbnails */}
            {additionalVideos.map((video, index) => (
              <button
                key={video.videoId}
                onClick={() => setSelectedVideo(video.url)}
                className={`relative group overflow-hidden rounded-lg transition-all duration-300 ${
                  selectedVideo === video.url ? 'ring-2 ring-gold scale-95' : 'hover:scale-105'
                }`}
              >
                <div className="aspect-video bg-gray-800 relative">
                  <img
                    src={`https://customer-w6h9o08eg118alny.cloudflarestream.com/${video.videoId}/thumbnails/thumbnail.jpg?time=1s`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gold/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-0 h-0 border-l-6 border-l-black border-t-3 border-b-3 border-t-transparent border-b-transparent ml-0.5"></div>
                    </div>
                  </div>
                  {selectedVideo === video.url && (
                    <div className="absolute top-2 right-2 bg-gold text-black px-2 py-1 text-xs font-semibold rounded">
                      NOW PLAYING
                    </div>
                  )}
                  {video.title.toLowerCase().includes('vertical') && (
                    <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 text-xs font-semibold rounded">
                      9:16
                    </div>
                  )}
                </div>
                <div className="p-2 bg-gray-900">
                  <p className="text-xs text-white font-medium truncate">{video.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}