'use client'

import { useState } from 'react'

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
  const [isMuted, setIsMuted] = useState(true)
  const [iframeKey, setIframeKey] = useState(0)

  // Create video URL with dynamic mute parameter and controls
  if (!videoUrl) {
    return (
      <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
        <div className="text-white text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Video Not Available</h2>
          <p className="text-gray-400">This project's video is currently unavailable.</p>
        </div>
      </div>
    )
  }

  // Create video URL with proper audio controls for Cloudflare Stream
  let videoUrlWithSound = videoUrl
  
  // Replace muted parameter
  if (videoUrlWithSound.includes('muted=true')) {
    videoUrlWithSound = videoUrlWithSound.replace('muted=true', `muted=${isMuted}`)
  } else if (videoUrlWithSound.includes('muted=false')) {
    videoUrlWithSound = videoUrlWithSound.replace('muted=false', `muted=${isMuted}`)
  } else {
    // Add muted parameter if it doesn't exist
    const separator = videoUrlWithSound.includes('?') ? '&' : '?'
    videoUrlWithSound += `${separator}muted=${isMuted}`
  }
  
  // Handle controls parameter - show controls when unmuted
  if (!isMuted) {
    if (videoUrlWithSound.includes('controls=false')) {
      videoUrlWithSound = videoUrlWithSound.replace('controls=false', 'controls=true')
    } else if (!videoUrlWithSound.includes('controls=')) {
      videoUrlWithSound += '&controls=true'
    }
  } else {
    // Keep controls hidden when muted for autoplay
    if (videoUrlWithSound.includes('controls=true')) {
      videoUrlWithSound = videoUrlWithSound.replace('controls=true', 'controls=false')
    }
  }

  const toggleSound = () => {
    setIsMuted(!isMuted)
    setIframeKey(prev => prev + 1) // Force iframe reload
  }

  // Detect if video is vertical by checking if title contains vertical indicators
  const isVerticalVideo = title.toLowerCase().includes('vertical') || 
                          title.toLowerCase().includes('sliced by sonny') ||
                          title.toLowerCase().includes('snob') ||
                          videoUrl.includes('877826bd010c5e4a495de0b8f125c8a5') || // Sliced By Sonny
                          videoUrl.includes('c2edacb37740868677353b6e519e8f53') || // ShowBiz
                          videoUrl.includes('ce837049cfd6f4984f136ae36006809e')    // SnowBiz 2

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Cloudflare Stream Video */}
      <iframe
        key={iframeKey} // Force reload when mute state changes
        src={videoUrlWithSound}
        className={`absolute inset-0 ${isVerticalVideo ? 'w-auto h-full left-1/2 transform -translate-x-1/2' : 'w-full h-full'}`}
        style={{ 
          border: 'none',
          ...(isVerticalVideo ? {
            // Vertical video styling - center and maintain aspect ratio
            aspectRatio: '9/16',
            maxWidth: '56.25vh', // 9:16 aspect ratio based on viewport height
            transform: 'translateX(-50%)',
          } : {
            // Horizontal video styling - scale slightly for edge-to-edge
            transform: 'scale(1.1)',
            transformOrigin: 'center center',
            width: '110%',
            height: '110%',
            left: '-5%',
            top: '-5%'
          })
        }}
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen={false}
      />

      {/* Project Title Overlay */}
      <div className="absolute inset-0 bg-black/20 flex items-end">
        <div className="absolute bottom-12 left-8 right-8">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
          </div>
        </div>

        {/* Sound Toggle Button */}
        <div className="absolute top-8 right-8">
          <button
            onClick={toggleSound}
            className="bg-black/80 hover:bg-black text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
          >
            {isMuted ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm font-medium mb-2">Scroll for Details</span>
            <div className="animate-bounce">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlays for Better Text Readability */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-1/4 bg-gradient-to-b from-black/50 to-transparent pointer-events-none"></div>
    </div>
  )
}