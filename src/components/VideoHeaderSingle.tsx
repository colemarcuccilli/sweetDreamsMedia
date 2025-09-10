'use client'

import { useState, useEffect } from 'react'

export default function VideoHeaderSingle() {
  const [isReady, setIsReady] = useState(false)

  // Stream ID from your uploaded video
  const STREAM_ID = 'e80443ae9084ffea8f28180125ed3e15'

  useEffect(() => {
    // Mark as ready after brief delay for dramatic effect
    const timer = setTimeout(() => setIsReady(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Cloudflare Stream Video - INSTANT LOADING */}
      <div className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
        isReady ? 'opacity-100' : 'opacity-0'
      }`}>
        <iframe
          src={`https://iframe.videodelivery.net/${STREAM_ID}?muted=true&autoplay=true&loop=true&controls=false`}
          className="w-full h-full"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen
          style={{ border: 'none' }}
          title="Sweet Dreams Media Portfolio Header"
          onLoad={() => console.log('Cloudflare video loaded!')}
        />
      </div>

      {/* Loading State */}
      {!isReady && (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gold mb-4"></div>
            <p className="text-white text-lg">Loading cinematic content...</p>
          </div>
        </div>
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center pointer-events-none">
        {/* Hero Content */}
        <div className="max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Your Vision,
            <span className="block text-gold">Amplified.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl leading-relaxed drop-shadow-md">
            Modern media with timeless integrity. We create stunning, professional content that gets you noticed the right way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
            <button className="bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-4 rounded-sm transition-all duration-300 text-lg shadow-lg hover:shadow-xl">
              Let's Create
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-sm transition-all duration-300 text-lg backdrop-blur-sm">
              Discuss Your Vision
            </button>
          </div>
        </div>

        {/* Performance Badge */}
        <div className="absolute bottom-8 left-8 bg-black/80 text-green-400 px-4 py-2 rounded-sm text-sm font-medium">
          🚀 Powered by Cloudflare Stream - Instant Loading
        </div>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-noise mix-blend-overlay" />
    </div>
  )
}