import PortfolioGrid from '@/components/PortfolioGrid'
import StickyNav from '@/components/StickyNav'
import Link from 'next/link'

export const metadata = {
  title: 'Portfolio | Sweet Dreams Production',
  description: 'Explore our premium B2B video production portfolio featuring corporate films, commercials, and brand storytelling for Fortune 500 companies.',
  openGraph: {
    title: 'Portfolio | Sweet Dreams Production',
    description: 'Premium B2B video production portfolio showcasing cinematic content that converts for ambitious brands.',
  },
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Navigation */}
      <StickyNav />
      {/* Portfolio Header */}
      <section className="pt-32 pb-16 bg-black">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          {/* Back to Home */}
          <div className="mb-8">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-400 hover:text-gold transition-colors duration-300"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </div>

          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6">
            Proven Quality. <span className="text-gold">Unbeatable Value.</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
            Professional content that amplifies your message and builds real business value. 
            From corporate storytelling to promotional campaigns, we deliver results you can measure.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div>
              <div className="text-3xl font-playfair font-bold text-gold">50+</div>
              <div className="text-gray-400 text-sm">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-playfair font-bold text-gold">$3.5K+</div>
              <div className="text-gray-400 text-sm">Starting Investment</div>
            </div>
            <div>
              <div className="text-3xl font-playfair font-bold text-gold">24hr</div>
              <div className="text-gray-400 text-sm">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <PortfolioGrid />

      {/* CTA Section */}
      <section className="py-20 bg-gold text-black">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-playfair font-bold mb-4">
            From Vision to Value.
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Your brand has a story. Your vision has potential. Let's amplify it the right way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-black text-gold hover:bg-gray-900 font-semibold px-8 py-4 rounded-sm transition-all duration-300"
            >
              Get A Fair Quote
            </Link>
            <Link 
              href="/process" 
              className="border-2 border-black text-black hover:bg-black hover:text-gold font-semibold px-8 py-4 rounded-sm transition-all duration-300"
            >
              Our Process
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}