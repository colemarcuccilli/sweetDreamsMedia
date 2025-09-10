'use client'

import { useState, useEffect, useRef } from 'react'

interface VideoConfig {
  name: string
  url: string
  duration: number // Duration in seconds for each video
}

const HEADER_VIDEOS: VideoConfig[] = [
  {
    name: 'hyperlapseFW',
    url: 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/sign/portfolio-media/hyperlapseFW.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNzYzNTA0Yi05ZmEzLTQxNjAtYWRiZC05OTcyOWUwYTk0YTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8tbWVkaWEvaHlwZXJsYXBzZUZXLm1wNCIsImlhdCI6MTc1NjI2ODM0MiwiZXhwIjoyMDcxNjI4MzQyfQ.vLIng9phzj904CH16n9mOvSq_bRXtmRby4G7uXYlbD8',
    duration: 30
  },
  {
    name: 'V1-0001_A00000000',
    url: 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/sign/portfolio-media/V1-0001_A00000000.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNzYzNTA0Yi05ZmEzLTQxNjAtYWRiZC05OTcyOWUwYTk0YTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8tbWVkaWEvVjEtMDAwMV9BMDAwMDAwMDAubXA0IiwiaWF0IjoxNzU2MjY4MzQyLCJleHAiOjIwNzE2MjgzNDJ9.zTqpbuwGes64xrWcTGk9MQ26TB2xlSEVgEWhabRvDRA',
    duration: 25
  },
  {
    name: 'V1-0003_A00000000',
    url: 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/sign/portfolio-media/V1-0003_A00000000.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNzYzNTA0Yi05ZmEzLTQxNjAtYWRiZC05OTcyOWUwYTk0YTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8tbWVkaWEvVjEtMDAwM19BMDAwMDAwMDAubXA0IiwiaWF0IjoxNzU2MjY4MzQyLCJleHAiOjIwNzE2MjgzNDJ9.2JRnIWAa62aqzybo246soZhzodRcpOvNXNNZoyqoTDI',
    duration: 20
  },
  {
    name: 'V1-0004_A00000000',
    url: 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/sign/portfolio-media/V1-0004_A00000000.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNzYzNTA0Yi05ZmEzLTQxNjAtYWRiZC05OTcyOWUwYTk0YTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8tbWVkaWEvVjEtMDAwNF9BMDAwMDAwMDAubXA0IiwiaWF0IjoxNzU2MjY4MzQyLCJleHAiOjIwNzE2MjgzNDJ9.XMBcmIjWTxrjh1X9XpHGrynEo7HufKD05ZFNN0fPxnk',
    duration: 30
  },
  {
    name: 'V1-0005_A00000000',
    url: 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/sign/portfolio-media/V1-0005_A00000000.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNzYzNTA0Yi05ZmEzLTQxNjAtYWRiZC05OTcyOWUwYTk0YTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8tbWVkaWEvVjEtMDAwNV9BMDAwMDAwMDAubXA0IiwiaWF0IjoxNzU2MjY4MzQyLCJleHAiOjIwNzE2MjgzNDJ9.pJSy8c24-RycM-yMYjEtrsP4DpWifjCuOoSx1-vGukQ',
    duration: 25
  },
  {
    name: 'V1-0006_A00000000',
    url: 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/sign/portfolio-media/V1-0006_A00000000.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNzYzNTA0Yi05ZmEzLTQxNjAtYWRiZC05OTcyOWUwYTk0YTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8tbWVkaWEvVjEtMDAwNl9BMDAwMDAwMDAubXA0IiwiaWF0IjoxNzU2MjY4MzQyLCJleHAiOjIwNzE2MjgzNDJ9.a4GH1lWA64W6-Jh1X3PHGYh86kunE8-J_M68y-wtmH8',
    duration: 20
  },
  {
    name: 'V1-0007_A00000000',
    url: 'https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/sign/portfolio-media/V1-0007_A00000000.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lNzYzNTA0Yi05ZmEzLTQxNjAtYWRiZC05OTcyOWUwYTk0YTgiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8tbWVkaWEvVjEtMDAwN19BMDAwMDAwMDAubXA0IiwiaWF0IjoxNzU2MjY4MzQyLCJleHAiOjIwNzE2MjgzNDJ9.4W9O7lvI2QTCFW-4A3GRwwV_fR_WcouCmY_OQn-ca3c',
    duration: 35
  }
  // More videos to upload:
  // V1-0009 through V1-0015, toobig.mp4
]

export default function VideoHeader() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [nextVideoIndex, setNextVideoIndex] = useState(1 % HEADER_VIDEOS.length)
  const videoRef = useRef<HTMLVideoElement>(null)
  const nextVideoRef = useRef<HTMLVideoElement>(null)

  const currentVideo = HEADER_VIDEOS[currentVideoIndex]
  const nextVideo = HEADER_VIDEOS[nextVideoIndex]

  // Preload next video
  useEffect(() => {
    if (nextVideoRef.current) {
      nextVideoRef.current.load()
    }
  }, [nextVideoIndex])

  // Handle video transitions
  useEffect(() => {
    const timer = setTimeout(() => {
      // Seamlessly transition to next video
      setCurrentVideoIndex(nextVideoIndex)
      setNextVideoIndex((nextVideoIndex + 1) % HEADER_VIDEOS.length)
      setIsVideoReady(false)
    }, currentVideo.duration * 1000)

    return () => clearTimeout(timer)
  }, [currentVideoIndex, nextVideoIndex, currentVideo.duration])

  const handleVideoReady = () => {
    setIsVideoReady(true)
  }

  const handleVideoError = (error: any) => {
    console.warn('Video failed to load:', currentVideo.name, error)
    // Skip to next video on error
    setTimeout(() => {
      setCurrentVideoIndex(nextVideoIndex)
      setNextVideoIndex((nextVideoIndex + 1) % HEADER_VIDEOS.length)
    }, 1000)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Current Video */}
      <video
        ref={videoRef}
        key={currentVideo.url}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isVideoReady ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay
        muted
        playsInline
        loop={false}
        onCanPlayThrough={handleVideoReady}
        onError={handleVideoError}
        onLoadedData={handleVideoReady}
        preload="auto"
      >
        <source src={currentVideo.url} type="video/mp4" />
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <p className="text-white text-lg">Loading cinematic content...</p>
        </div>
      </video>

      {/* Preload Next Video (Hidden) */}
      <video
        ref={nextVideoRef}
        className="hidden"
        muted
        preload="auto"
      >
        <source src={nextVideo.url} type="video/mp4" />
      </video>

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center">
        {/* Hero Content */}
        <div className="max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
            Your Vision,
            <span className="block text-gold">Amplified.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl leading-relaxed">
            Modern media with timeless integrity. We create stunning, professional content that gets you noticed the right way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-4 rounded-sm transition-all duration-300 text-lg">
              Let's Create
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-sm transition-all duration-300 text-lg">
              Discuss Your Vision
            </button>
          </div>
        </div>

        {/* Video Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {HEADER_VIDEOS.map((_, index) => (
            <div
              key={index}
              className={`w-12 h-1 rounded-full transition-all duration-300 ${
                index === currentVideoIndex 
                  ? 'bg-gold' 
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-noise mix-blend-overlay" />
    </div>
  )
}