import VideoTest from '@/components/VideoTest'
import PortfolioGrid from '@/components/PortfolioGrid'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      {/* Hero Section with Navigation */}
      <VideoTest />

      {/* Portfolio Showcase - Main Focus */}
      <PortfolioGrid />

      {/* Services Preview - Condensed */}
      <section className="py-16 bg-gray-950">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              Services That Drive Results
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Brand Films", icon: "🎬" },
              { title: "Commercials", icon: "📺" }, 
              { title: "Event Coverage", icon: "🎥" },
              { title: "Corporate Content", icon: "💼" }
            ].map((service, index) => (
              <div key={index} className="text-center p-6 bg-black/50 rounded-lg hover:bg-black/70 transition-all duration-300 group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Proof - Authentic */}
      <section className="py-12 bg-black">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-sm mb-8">Real Partnership. Real Results.</p>
          <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6 opacity-60">
            <div className="text-gray-500 font-semibold text-xs md:text-sm">Fort Wayne Vintage</div>
            <div className="w-px h-4 md:h-6 bg-gray-700"></div>
            <div className="text-gray-500 font-semibold text-xs md:text-sm">Ride Worx</div>
            <div className="w-px h-4 md:h-6 bg-gray-700"></div>
            <div className="text-gray-500 font-semibold text-xs md:text-sm">Indy Children's Museum</div>
            <div className="w-px h-4 md:h-6 bg-gray-700"></div>
            <div className="text-gray-500 font-semibold text-xs md:text-sm">Kissel Entertainment</div>
            <div className="w-px h-4 md:h-6 bg-gray-700"></div>
            <div className="text-gray-500 font-semibold text-xs md:text-sm">Trusted Dentistry</div>
            <div className="w-px h-4 md:h-6 bg-gray-700"></div>
            <div className="text-gray-500 font-semibold text-xs md:text-sm">+ More</div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-black/50 rounded-lg p-8 hover:bg-black/70 transition-all duration-300">
              <div className="text-4xl font-bold text-gold mb-2">400k+</div>
              <div className="text-gray-300 text-lg">Total Accumulated Views</div>
            </div>
            <div className="bg-black/50 rounded-lg p-8 hover:bg-black/70 transition-all duration-300">
              <div className="text-4xl font-bold text-gold mb-2">130+</div>
              <div className="text-gray-300 text-lg">Projects Completed</div>
            </div>
            <div className="bg-black/50 rounded-lg p-8 hover:bg-black/70 transition-all duration-300">
              <div className="text-4xl font-bold text-gold mb-2">24hr</div>
              <div className="text-gray-300 text-lg">Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Amplified */}
      <section className="py-16 bg-gold text-black">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            It's Time to Maximize Your Ideas.
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Your brand has a story. Your vision has potential. Let's amplify it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/portfolio" 
              className="bg-black text-gold hover:bg-gray-900 font-semibold px-8 py-4 rounded-sm transition-all duration-300"
            >
              See Our Work
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-black text-black hover:bg-black hover:text-gold font-semibold px-8 py-4 rounded-sm transition-all duration-300"
            >
              Get A Fair Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
