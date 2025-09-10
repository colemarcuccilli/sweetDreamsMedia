'use client'

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'

interface CloudflareVideo {
  id: string
  name: string
  cloudflare_stream_id: string
  cloudflare_stream_url: string
  duration: number
  order_index: number
  is_active: boolean
}

export default function VideoHeaderCloudflare() {
  const [videos, setVideos] = useState<CloudflareVideo[]>([])
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [nextVideoIndex, setNextVideoIndex] = useState(1)
  const [loading, setLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const nextVideoRef = useRef<HTMLVideoElement>(null)

  // Fetch videos from Supabase
  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('header_videos')
        .select('*')
        .eq('is_active', true)
        .eq('migration_status', 'completed')
        .not('cloudflare_stream_id', 'is', null)
        .order('order_index')

      if (error) {
        console.error('Error fetching videos:', error)
        return
      }

      if (data && data.length > 0) {
        setVideos(data)
        setNextVideoIndex(1 % data.length)
      }
    } catch (err) {
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Handle video transitions
  useEffect(() => {
    if (!videos.length) return

    const currentVideo = videos[currentVideoIndex]
    const timer = setTimeout(() => {
      // Seamlessly transition to next video
      setCurrentVideoIndex(nextVideoIndex)
      setNextVideoIndex((nextVideoIndex + 1) % videos.length)
    }, currentVideo.duration * 1000)

    return () => clearTimeout(timer)
  }, [currentVideoIndex, nextVideoIndex, videos])

  // Preload next video
  useEffect(() => {
    if (nextVideoRef.current && videos.length > 1) {
      nextVideoRef.current.load()
    }
  }, [nextVideoIndex, videos])

  if (loading) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gold mb-4"></div>
          <p className="text-white text-lg">Loading cinematic content...</p>
        </div>
      </div>
    )
  }

  if (!videos.length) {
    return (
      <div className="relative w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Video content coming soon...</p>
          <p className="text-gray-400 text-sm">Professional videos are being optimized for the best viewing experience.</p>
        </div>
      </div>
    )
  }

  const currentVideo = videos[currentVideoIndex]
  const nextVideo = videos[nextVideoIndex] || videos[0]

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Current Video - Cloudflare Stream iframe */}
      <iframe
        key={currentVideo.cloudflare_stream_id}
        src={`https://iframe.videodelivery.net/${currentVideo.cloudflare_stream_id}?muted=true&autoplay=true&loop=false&controls=false`}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
        allowFullScreen
        style={{ border: 'none' }}
      />

      {/* Preload Next Video (Hidden) */}
      {videos.length > 1 && (
        <iframe
          key={`preload-${nextVideo.cloudflare_stream_id}`}
          src={`https://iframe.videodelivery.net/${nextVideo.cloudflare_stream_id}?muted=true&preload=true`}
          className="hidden"
          style={{ border: 'none' }}
        />
      )}

      {/* Content Overlay */}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center pointer-events-none">
        {/* Hero Content */}
        <div className="max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
            Your Vision,
            <span className="block text-gold">Amplified.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl leading-relaxed">
            Modern media with timeless integrity. We create stunning, professional content that gets you noticed the right way.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto">
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
          {videos.map((_, index) => (
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