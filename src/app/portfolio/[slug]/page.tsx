import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import ProjectVideoPlayer from '@/components/ProjectVideoPlayer'
import ProjectImageGallery from '@/components/ProjectImageGallery'
import ClientLogo from '@/components/ClientLogo'

interface ProjectData {
  id: string
  title: string
  slug: string
  category: string
  purpose: string
  client_name: string
  client_logo_url: string | null
  client_website_url: string | null
  services: string[]
  location: string
  short_description: string
  full_description: string
  video_url: string
  thumbnail_url: string
  additional_images: string[]
  extra_notes: string | null
  project_date: string
  budget_range: string | null
  results_metrics: string | null
  testimonial: string | null
  testimonial_author: string | null
  featured: boolean
  published: boolean
  created_at: string
}

async function getProject(slug: string): Promise<ProjectData | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('portfolio_projects')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)
  
  if (!project) {
    return {
      title: 'Project Not Found | Sweet Dreams Production'
    }
  }

  return {
    title: `${project.title} | ${project.client_name} | Sweet Dreams Production`,
    description: project.short_description,
    openGraph: {
      title: `${project.title} - ${project.client_name}`,
      description: project.short_description,
      images: project.thumbnail_url ? [{ url: project.thumbnail_url }] : [],
      type: 'article',
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  // Detect if main video is vertical
  const isVerticalVideo = project.video_url && (
    project.title.toLowerCase().includes('vertical') || 
    project.title.toLowerCase().includes('sliced by sonny') ||
    project.title.toLowerCase().includes('snob') ||
    project.video_url.includes('877826bd010c5e4a495de0b8f125c8a5') || // Sliced By Sonny
    project.video_url.includes('c2edacb37740868677353b6e519e8f53') || // ShowBiz
    project.video_url.includes('ce837049cfd6f4984f136ae36006809e')    // SnowBiz 2
  )

  if (isVerticalVideo) {
    // Vertical Video Layout - Side by side
    return (
      <main className="min-h-screen bg-black">
        <div className="flex h-screen">
          {/* Left Side - Vertical Video */}
          <div className="w-1/2 relative bg-black flex items-center justify-center">
            <div className="relative h-full w-full max-w-md mx-auto">
              <iframe
                src={project.video_url}
                className="w-full h-full"
                style={{ 
                  border: 'none',
                  aspectRatio: '9/16',
                }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                allowFullScreen={false}
              />
              
              {/* Video Overlay Controls */}
              <div className="absolute top-6 right-6">
                <div className="bg-black/80 text-white px-3 py-2 text-sm rounded-full">
                  Vertical Video
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Project Content */}
          <div className="w-1/2 overflow-y-auto">
            <div className="p-8 lg:p-12">
              {/* Back to Portfolio */}
              <div className="mb-8">
                <Link 
                  href="/portfolio" 
                  className="inline-flex items-center text-gray-400 hover:text-gold transition-colors duration-300"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Portfolio
                </Link>
              </div>

              {/* Project Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-gold text-black px-3 py-1 text-sm font-semibold rounded-sm">
                    {project.category}
                  </span>
                  <span className="bg-purple-600 text-white px-3 py-1 text-sm font-semibold rounded-sm">
                    VERTICAL FORMAT
                  </span>
                  {project.featured && (
                    <span className="bg-gray-800 text-gold px-3 py-1 text-sm font-semibold rounded-sm">
                      FEATURED
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-white mb-4">
                  {project.title}
                </h1>
                
                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                  {project.short_description}
                </p>

                {/* Client Info */}
                <div className="flex items-center gap-4 mb-6">
                  {project.client_logo_url && (
                    <img
                      src={project.client_logo_url}
                      alt={`${project.client_name} logo`}
                      className="w-12 h-12 object-contain rounded bg-white/10 p-2"
                    />
                  )}
                  <div>
                    <p className="text-gold font-semibold">{project.client_name}</p>
                    <p className="text-gray-400 text-sm">{project.location}</p>
                  </div>
                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-gold font-semibold mb-2">Purpose</h3>
                  <p className="text-gray-300 text-sm">{project.purpose}</p>
                </div>
                <div>
                  <h3 className="text-gold font-semibold mb-2">Category</h3>
                  <p className="text-gray-300 text-sm">{project.category}</p>
                </div>
                {project.project_date && (
                  <div>
                    <h3 className="text-gold font-semibold mb-2">Year</h3>
                    <p className="text-gray-300 text-sm">{new Date(project.project_date).getFullYear()}</p>
                  </div>
                )}
                <div>
                  <h3 className="text-gold font-semibold mb-2">Format</h3>
                  <p className="text-gray-300 text-sm">9:16 Vertical</p>
                </div>
              </div>

              {/* Services */}
              <div className="mb-8">
                <h3 className="text-gold font-semibold mb-3">Services</h3>
                <div className="flex flex-wrap gap-2">
                  {project.services.map((service, index) => (
                    <span 
                      key={index}
                      className="bg-gray-800 text-gray-300 px-3 py-1 text-sm rounded-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Full Description */}
              <div className="mb-8">
                <h2 className="text-xl font-playfair font-bold text-white mb-4">Project Overview</h2>
                <div className="prose prose-invert prose-sm max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.full_description}
                  </p>
                </div>
              </div>

              {/* Results/Metrics */}
              {project.results_metrics && (
                <div className="mb-8 bg-gray-900 p-6 rounded-lg">
                  <h2 className="text-xl font-playfair font-bold text-white mb-3">Results</h2>
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                    {project.results_metrics}
                  </p>
                </div>
              )}

              {/* Client Testimonial */}
              {project.testimonial && (
                <div className="mb-8 border-l-4 border-gold pl-6">
                  <blockquote className="text-gray-300 italic mb-3">
                    "{project.testimonial}"
                  </blockquote>
                  {project.testimonial_author && (
                    <cite className="text-gold font-semibold text-sm">
                      — {project.testimonial_author}
                    </cite>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <h3 className="text-white font-semibold mb-4">Ready to Get Noticed?</h3>
                <Link 
                  href="/contact"
                  className="block w-full bg-gold hover:bg-gold/90 text-black font-semibold px-6 py-3 rounded-sm text-center transition-all duration-300"
                >
                  Let's Create
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section - Full Width Below */}
        {project.additional_images && project.additional_images.length > 0 && (
          <section className="py-16 bg-gray-950">
            <div className="container max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6 text-center">Project Gallery</h2>
              <ProjectImageGallery images={project.additional_images} title={project.title} />
            </div>
          </section>
        )}
      </main>
    )
  }

  // Standard Horizontal Video Layout
  return (
    <main className="min-h-screen bg-black">
      {/* Project Video Header */}
      <section className="relative">
        <ProjectVideoPlayer 
          videoUrl={project.video_url}
          title={project.title}
          thumbnailUrl={project.thumbnail_url}
        />
      </section>

      {/* Project Details */}
      <section className="py-16 bg-black">
        <div className="container max-w-6xl mx-auto px-6">
          {/* Back to Portfolio */}
          <div className="mb-8">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center text-gray-400 hover:text-gold transition-colors duration-300"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Portfolio
            </Link>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Project Header */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-gold text-black px-3 py-1 text-sm font-semibold rounded-sm">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="bg-gray-800 text-gold px-3 py-1 text-sm font-semibold rounded-sm">
                      FEATURED
                    </span>
                  )}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
                  {project.title}
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  {project.short_description}
                </p>
              </div>

              {/* Full Description */}
              <div className="mb-12">
                <h2 className="text-2xl font-playfair font-bold text-white mb-4">Project Overview</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.full_description}
                  </p>
                </div>
              </div>

              {/* Results/Metrics */}
              {project.results_metrics && (
                <div className="mb-12 bg-gray-900 p-8 rounded-lg">
                  <h2 className="text-2xl font-playfair font-bold text-white mb-4">Results</h2>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.results_metrics}
                  </p>
                </div>
              )}

              {/* Client Testimonial */}
              {project.testimonial && (
                <div className="mb-12 border-l-4 border-gold pl-8">
                  <blockquote className="text-lg text-gray-300 italic mb-4">
                    "{project.testimonial}"
                  </blockquote>
                  {project.testimonial_author && (
                    <cite className="text-gold font-semibold">
                      — {project.testimonial_author}
                    </cite>
                  )}
                </div>
              )}

              {/* Additional Images */}
              {project.additional_images && project.additional_images.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-playfair font-bold text-white mb-6">Project Gallery</h2>
                  <ProjectImageGallery images={project.additional_images} title={project.title} />
                </div>
              )}

              {/* Extra Notes */}
              {project.extra_notes && (
                <div className="mb-12">
                  <h2 className="text-2xl font-playfair font-bold text-white mb-4">Additional Notes</h2>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.extra_notes}
                  </p>
                </div>
              )}
            </div>

            {/* Project Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-900 p-8 rounded-lg sticky top-8">
                {/* Client Logo */}
                {project.client_logo_url && (
                  <div className="mb-8 text-center">
                    <ClientLogo 
                      logoUrl={project.client_logo_url}
                      clientName={project.client_name}
                      websiteUrl={project.client_website_url}
                    />
                  </div>
                )}

                {/* Project Meta */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-gold font-semibold mb-2">Client</h3>
                    <p className="text-white">
                      {project.client_website_url ? (
                        <a 
                          href={project.client_website_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-gold transition-colors duration-300"
                        >
                          {project.client_name}
                        </a>
                      ) : (
                        project.client_name
                      )}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-gold font-semibold mb-2">Purpose</h3>
                    <p className="text-gray-300">{project.purpose}</p>
                  </div>

                  <div>
                    <h3 className="text-gold font-semibold mb-2">Services</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((service, index) => (
                        <span 
                          key={index}
                          className="bg-gray-800 text-gray-300 px-3 py-1 text-sm rounded-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-gold font-semibold mb-2">Location</h3>
                    <p className="text-gray-300">{project.location}</p>
                  </div>

                  <div>
                    <h3 className="text-gold font-semibold mb-2">Category</h3>
                    <p className="text-gray-300">{project.category}</p>
                  </div>

                  {project.project_date && (
                    <div>
                      <h3 className="text-gold font-semibold mb-2">Project Date</h3>
                      <p className="text-gray-300">{new Date(project.project_date).getFullYear()}</p>
                    </div>
                  )}

                  {project.budget_range && (
                    <div>
                      <h3 className="text-gold font-semibold mb-2">Investment Range</h3>
                      <p className="text-gray-300">{project.budget_range}</p>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                  <h3 className="text-white font-semibold mb-4">Ready to Get Noticed?</h3>
                  <Link 
                    href="/contact"
                    className="block w-full bg-gold hover:bg-gold/90 text-black font-semibold px-6 py-3 rounded-sm text-center transition-all duration-300"
                  >
                    Let's Create
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}