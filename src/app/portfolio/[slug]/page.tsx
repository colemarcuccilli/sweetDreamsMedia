import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import ProjectVideoPlayer from '@/components/ProjectVideoPlayer'
import ProjectImageGallery from '@/components/ProjectImageGallery'
import ClientLogo from '@/components/ClientLogo'
import StickyNav from '@/components/StickyNav'

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
    // Vertical Video Layout - Centered and clean
    return (
      <main className="min-h-screen bg-black">
        {/* Navigation */}
        <StickyNav />

        {/* Project Header */}
        <section className="pt-24 pb-8 bg-black">
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

            {/* Title and Description */}
            <div className="text-center mb-8">
              <div className="flex justify-center items-center gap-4 mb-4">
                <span className="bg-gold text-black px-3 py-1 text-sm font-semibold rounded-sm">
                  {project.category}
                </span>
                <span className="bg-purple-600 text-white px-3 py-1 text-sm font-semibold rounded-sm">
                  VERTICAL
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                {project.short_description}
              </p>
            </div>

            {/* Vertical Video Player - Centered */}
            <div className="flex justify-center mb-12">
              <div className="w-full max-w-sm">
                <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl">
                  <iframe
                    src={(() => {
                      // Extract video ID and build proper stream URL
                      const videoId = project.video_url.match(/([a-f0-9]{32})/)?.[1]
                      if (videoId) {
                        return `https://iframe.videodelivery.net/${videoId}?poster=${encodeURIComponent(project.thumbnail_url || '')}&controls=true&muted=false&autoplay=true&loop=false&preload=auto`
                      }
                      return project.video_url + '?controls=true&muted=false&autoplay=true&loop=false&preload=auto'
                    })()}
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 'none' }}
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen={true}
                    title={project.title}
                  />
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="pb-16 bg-black">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Full Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-playfair font-bold text-white mb-4">Project Overview</h2>
                  <p className="text-gray-300 leading-relaxed whitespace-pre-line">
                    {project.full_description}
                  </p>
                </div>

                {/* Services */}
                <div className="mb-8">
                  <h3 className="text-xl font-playfair font-bold text-white mb-3">Services</h3>
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

                {/* Results/Metrics */}
                {project.results_metrics && (
                  <div className="mb-8 bg-gray-900 p-6 rounded-lg">
                    <h2 className="text-xl font-playfair font-bold text-white mb-3">Results</h2>
                    <p className="text-gray-300 leading-relaxed whitespace-pre-line">
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
                      <cite className="text-gold font-semibold">
                        — {project.testimonial_author}
                      </cite>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-gray-900 p-6 rounded-lg sticky top-24">
                  {/* Client Info */}
                  {project.client_logo_url && (
                    <div className="mb-6 text-center">
                      <ClientLogo
                        logoUrl={project.client_logo_url}
                        clientName={project.client_name}
                        websiteUrl={project.client_website_url}
                      />
                    </div>
                  )}

                  {/* Project Meta */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-gold font-semibold mb-1">Client</h3>
                      <p className="text-white">{project.client_name}</p>
                    </div>
                    <div>
                      <h3 className="text-gold font-semibold mb-1">Purpose</h3>
                      <p className="text-gray-300">{project.purpose}</p>
                    </div>
                    <div>
                      <h3 className="text-gold font-semibold mb-1">Category</h3>
                      <p className="text-gray-300">{project.category}</p>
                    </div>
                    <div>
                      <h3 className="text-gold font-semibold mb-1">Location</h3>
                      <p className="text-gray-300">{project.location}</p>
                    </div>
                    {project.project_date && (
                      <div>
                        <h3 className="text-gold font-semibold mb-1">Year</h3>
                        <p className="text-gray-300">{new Date(project.project_date).getFullYear()}</p>
                      </div>
                    )}
                    <div>
                      <h3 className="text-gold font-semibold mb-1">Format</h3>
                      <p className="text-gray-300">9:16 Vertical</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        {project.additional_images && project.additional_images.length > 0 && (
          <section className="py-16 bg-gray-950">
            <div className="container max-w-6xl mx-auto px-6">
              <h2 className="text-2xl font-playfair font-bold text-white mb-6 text-center">Project Gallery</h2>
              <ProjectImageGallery images={project.additional_images} title={project.title} />
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 bg-black border-t border-gray-900">
          <div className="container max-w-6xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-playfair font-bold text-white mb-4">Ready to Get Noticed?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's create compelling vertical content that captures attention and drives engagement.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-4 rounded-sm transition-all duration-300"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </main>
    )
  }

  // Standard Horizontal Video Layout
  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <StickyNav />

      {/* Project Header Section */}
      <section className="pt-24 pb-12 bg-black">
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

          {/* Project Title and Meta */}
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

            <h1 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-4">
              {project.title}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl">
              {project.short_description}
            </p>
          </div>

          {/* Video Player - Direct Cloudflare Stream Embed */}
          <div className="mb-12">
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl">
              <iframe
                src={(() => {
                  // Extract video ID and build proper stream URL
                  const videoId = project.video_url.match(/([a-f0-9]{32})/)?.[1]
                  if (videoId) {
                    return `https://iframe.videodelivery.net/${videoId}?poster=${encodeURIComponent(project.thumbnail_url || '')}&controls=true&muted=false&autoplay=true&loop=false&preload=auto`
                  }
                  return project.video_url + '?controls=true&muted=false&autoplay=true&loop=false&preload=auto'
                })()}
                className="w-full h-full"
                style={{ border: 'none' }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen={true}
                title={project.title}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="pb-16 bg-black">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
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
                    <h3 className="text-gold font-semibold mb-2">Category</h3>
                    <p className="text-gray-300">{project.category}</p>
                  </div>

                  <div>
                    <h3 className="text-gold font-semibold mb-2">Location</h3>
                    <p className="text-gray-300">{project.location}</p>
                  </div>

                  {project.project_date && (
                    <div>
                      <h3 className="text-gold font-semibold mb-2">Year</h3>
                      <p className="text-gray-300">{new Date(project.project_date).getFullYear()}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-gold font-semibold mb-2">Services</h3>
                    <div className="flex flex-wrap gap-1">
                      {project.services.map((service, index) => (
                        <span
                          key={index}
                          className="bg-gray-800 text-gray-300 px-2 py-1 text-xs rounded-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-8 pt-6 border-t border-gray-800">
                  <Link
                    href="/contact"
                    className="block w-full bg-gold hover:bg-gold/90 text-black font-semibold px-6 py-3 rounded-sm text-center transition-all duration-300"
                  >
                    Start Your Project
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