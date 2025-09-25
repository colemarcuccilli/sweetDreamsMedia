'use client'

import { useState } from 'react'

interface ProjectImageGalleryProps {
  images: string[]
  title: string
}

export default function ProjectImageGallery({ images, title }: ProjectImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isImageLoading, setIsImageLoading] = useState(false)

  const openLightbox = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setIsImageLoading(true)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    setIsImageLoading(false)
  }

  const handleImageLoad = () => {
    setIsImageLoading(false)
  }

  // Create optimized thumbnail URL for Supabase images
  const getThumbnailUrl = (imageUrl: string) => {
    if (!imageUrl.includes('supabase.co')) return imageUrl

    // Use Supabase's transform API for thumbnails
    // This creates a 400px wide thumbnail to load quickly
    return imageUrl + '?width=400&quality=75'
  }

  // Get full quality URL (original image)
  const getFullQualityUrl = (imageUrl: string) => {
    return imageUrl // Original full quality
  }

  const isVideo = (url: string) => {
    return url.includes('iframe.videodelivery.net')
  }

  const isVerticalVideo = (url: string) => {
    // Check for specific vertical video IDs from your uploads
    const verticalVideoIds = [
      '877826bd010c5e4a495de0b8f125c8a5', // Sliced By Sonny
      'c2edacb37740868677353b6e519e8f53', // ShowBiz
      'ce837049cfd6f4984f136ae36006809e', // SnowBiz 2
      'a3cd0eb92f95b9b5bef859c197a91465'  // Vegas Old Style
    ]
    return verticalVideoIds.some(id => url.includes(id))
  }

  if (!images || images.length === 0) {
    return null
  }

  return (
    <>
      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((mediaUrl, index) => {
          const isVertical = isVideo(mediaUrl) && isVerticalVideo(mediaUrl)
          
          return (
            <div 
              key={index}
              className={`relative overflow-hidden rounded-lg cursor-pointer group shadow-lg hover:shadow-2xl transition-all duration-300 ${
                isVertical ? 'aspect-[9/16]' : 'aspect-video'
              }`}
              onClick={() => openLightbox(mediaUrl)}
            >
              {isVideo(mediaUrl) ? (
                <>
                  <iframe
                    src={mediaUrl}
                    className="w-full h-full object-cover"
                    style={{ border: 'none' }}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                  />
                  {/* Video Play Icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-gold/90 rounded-full flex items-center justify-center">
                        <div className="w-0 h-0 border-l-6 border-l-black border-t-3 border-b-3 border-t-transparent border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  </div>
                  {/* Vertical Video Badge */}
                  {isVertical && (
                    <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 text-xs font-semibold rounded">
                      Vertical
                    </div>
                  )}
                </>
              ) : (
                <>
                  <img
                    src={getThumbnailUrl(mediaUrl)}
                    alt={`${title} - Image ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Image Zoom Icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gold text-3xl font-light z-10 w-10 h-10 flex items-center justify-center"
            aria-label="Close lightbox"
          >
            ×
          </button>

          {/* Media Container */}
          <div className="relative max-w-7xl max-h-full">
            {isVideo(selectedImage) ? (
              <iframe
                src={selectedImage}
                className={`w-full h-full ${
                  isVerticalVideo(selectedImage) 
                    ? 'max-w-[50vw] min-h-[80vh] aspect-[9/16]' 
                    : 'min-w-[80vw] min-h-[80vh]'
                }`}
                style={{ border: 'none' }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div className="relative">
                {/* Loading spinner */}
                {isImageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
                  </div>
                )}
                <img
                  src={getFullQualityUrl(selectedImage)}
                  alt={`${title} - Full size`}
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                  onLoad={handleImageLoad}
                  style={{ opacity: isImageLoading ? 0.3 : 1 }}
                />
              </div>
            )}
          </div>

          {/* Navigation hint */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/70 text-sm">
            Click outside image to close
          </div>
        </div>
      )}
    </>
  )
}