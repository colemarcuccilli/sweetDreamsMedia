'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

interface PortfolioProject {
  id: string
  title: string
  slug: string
  category: string
  client_name: string
  client: string
  thumbnail_url: string
  video_url: string
  short_description: string
  description: string
  full_description: string
  services: string[]
  location: string
  project_date: string
  purpose: string
  featured: boolean
  published: boolean
  client_logo_url: string | null
  client_logos?: string[] // Support for multiple logos
  created_at: string
}

export default function PortfolioGrid() {
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const getSignedUrl = async (filePath: string) => {
    if (!filePath) return null
    
    const supabaseClient = createClient()
    try {
      const { data, error } = await supabaseClient.storage
        .from('media')
        .createSignedUrl(filePath, 365 * 24 * 60 * 60) // 1 year expiry
      
      if (error) {
        console.error('Error getting signed URL:', error)
        return null
      }
      
      return data?.signedUrl || null
    } catch (err) {
      console.error('Error:', err)
      return null
    }
  }

  const fetchProjects = async () => {
    try {
      const supabaseClient = createClient()
      const { data, error } = await supabaseClient
        .from('portfolio_projects')
        .select('*')
        .order('published', { ascending: false })
        .order('featured', { ascending: false })
        .order('updated_at', { ascending: false })
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
        return
      }

      // Add coming soon projects
      const comingSoonProjects: PortfolioProject[] = [
        {
          id: 'coming-soon-1',
          title: 'Prime Dealer Fund Commercial',
          slug: 'prime-dealer-fund-commercial',
          category: 'Commercial',
          client_name: 'Prime Dealer Fund',
          client: 'Prime Dealer Fund',
          thumbnail_url: '/api/placeholder/600/400?text=Prime+Dealer+Fund',
          video_url: '',
          short_description: 'Commercial video production for Prime Dealer Fund showcasing their investment solutions.',
          description: 'Commercial video production for Prime Dealer Fund showcasing their investment solutions.',
          full_description: 'Commercial video production for Prime Dealer Fund showcasing their investment solutions.',
          services: ['Commercial Production', 'Video Marketing'],
          location: 'Indiana',
          project_date: new Date().toISOString(),
          purpose: 'Marketing',
          featured: false,
          published: false,
          client_logo_url: null,
          created_at: new Date().toISOString()
        },
        {
          id: 'coming-soon-2',
          title: 'Jet Pro Pilots Commercial',
          slug: 'jet-pro-pilots-commercial',
          category: 'Commercial',
          client_name: 'Jet Pro Pilots',
          client: 'Jet Pro Pilots',
          thumbnail_url: '/api/placeholder/600/400?text=Jet+Pro+Pilots',
          video_url: '',
          short_description: 'Professional commercial highlighting Jet Pro Pilots aviation services and expertise.',
          description: 'Professional commercial highlighting Jet Pro Pilots aviation services and expertise.',
          full_description: 'Professional commercial highlighting Jet Pro Pilots aviation services and expertise.',
          services: ['Commercial Production', 'Aviation Content'],
          location: 'Indiana',
          project_date: new Date().toISOString(),
          purpose: 'Marketing',
          featured: false,
          published: false,
          client_logo_url: null,
          created_at: new Date().toISOString()
        },
        {
          id: 'coming-soon-3',
          title: 'IU Dental Research Project',
          slug: 'iu-dental-research-project',
          category: 'Educational',
          client_name: 'Indiana University',
          client: 'Indiana University',
          thumbnail_url: '/api/placeholder/600/400?text=IU+Dental+Research',
          video_url: '',
          short_description: 'Educational video content for Indiana University dental research initiatives.',
          description: 'Educational video content for Indiana University dental research initiatives.',
          full_description: 'Educational video content for Indiana University dental research initiatives.',
          services: ['Educational Content', 'Research Documentation'],
          location: 'Indiana',
          project_date: new Date().toISOString(),
          purpose: 'Education',
          featured: false,
          published: false,
          client_logo_url: null,
          created_at: new Date().toISOString()
        }
      ]

      // Combine database projects with coming soon projects
      const allProjects = [...(data || []), ...comingSoonProjects]
      setProjects(allProjects)
    } catch (err) {
      console.error('Error fetching projects:', err)
      setProjects([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-black">
        <div className="container max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gold"></div>
            <p className="text-gray-400 mt-4">Loading portfolio...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Portfolio Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-6">
            Beyond Video. <span className="text-gold">We Build Value.</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Professional content that amplifies your message and gets you noticed. No shortcuts, no compromises.
          </p>
        </div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects found.</p>
            <p className="text-gray-500 text-sm mt-2">More amazing work coming soon...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              // Define coming soon projects by published status
              const isComingSoon = !project.published

              const ProjectCard = (
                <div className="relative">
                  {/* Project Thumbnail */}
                  <div className="relative aspect-video overflow-hidden">
                    {project.thumbnail_url ? (
                      <img
                        src={project.thumbnail_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <div className="text-6xl text-gray-600">▶</div>
                      </div>
                    )}
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gold/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-l-8 border-l-black border-t-4 border-b-4 border-t-transparent border-b-transparent ml-1"></div>
                      </div>
                    </div>

                    {/* Coming Soon Stamp */}
                    {isComingSoon && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
                        <div className="bg-red-600 text-white px-6 py-3 text-lg font-bold rounded-lg rotate-12 shadow-2xl border-4 border-red-700">
                          COMING SOON
                        </div>
                      </div>
                    )}

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 left-4 bg-gold text-black px-3 py-1 text-xs font-semibold rounded-sm">
                        FEATURED
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-black/80 text-white px-3 py-1 text-xs font-medium rounded-sm">
                      {project.category}
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    {/* Client Info with Logo(s) */}
                    <div className="flex items-center gap-3 mb-3">
                      {/* Display multiple logos if available, otherwise single logo */}
                      {project.client_logos && project.client_logos.length > 0 ? (
                        <div className="flex items-center gap-2">
                          {project.client_logos.slice(0, 3).map((logoUrl, index) => (
                            <img
                              key={index}
                              src={logoUrl}
                              alt={`Client logo ${index + 1}`}
                              className="w-8 h-8 object-contain rounded"
                            />
                          ))}
                          {project.client_logos.length > 3 && (
                            <span className="text-gold text-xs">+{project.client_logos.length - 3}</span>
                          )}
                        </div>
                      ) : project.client_logo_url ? (
                        <img
                          src={project.client_logo_url}
                          alt={`${project.client_name} logo`}
                          className="w-8 h-8 object-contain rounded"
                        />
                      ) : null}
                      <p className="text-gold text-sm font-medium">
                        {project.client_name}
                      </p>
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.short_description}
                    </p>
                  </div>

                  {/* Hover Border Effect */}
                  <div className={`absolute inset-0 border-2 border-transparent rounded-lg transition-colors duration-300 pointer-events-none ${
                    !isComingSoon ? 'group-hover:border-gold/30' : 'border-red-600/30'
                  }`}></div>
                </div>
              )

              return (
                <div key={project.id}>
                  {isComingSoon ? (
                    <div className="group relative overflow-hidden rounded-lg bg-gray-900 cursor-not-allowed transition-all duration-500">
                      {ProjectCard}
                    </div>
                  ) : (
                    <Link 
                      href={`/portfolio/${project.slug}`}
                      className="group relative overflow-hidden rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-500 block"
                    >
                      {ProjectCard}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">Ready to maximize your message?</p>
          <Link 
            href="/contact" 
            className="inline-block bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-4 rounded-sm transition-all duration-300"
          >
            Discuss Your Vision
          </Link>
        </div>
      </div>
    </section>
  )
}