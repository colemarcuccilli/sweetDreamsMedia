import StickyNav from './StickyNav'

export default function VideoTest() {
  return (
    <div className="relative w-full bg-black">
      {/* Mobile Layout - Stack video and text */}
      <div className="block md:hidden">
        {/* Video Section - Top half */}
        <div className="relative h-[50vh] overflow-hidden">
          <iframe
            src="https://iframe.videodelivery.net/e80443ae9084ffea8f28180125ed3e15?muted=true&autoplay=true&loop=true&controls=false&quality=4k"
            className="absolute inset-0 w-full h-full"
            style={{ 
              border: 'none',
              transform: 'scale(1.1)',
              transformOrigin: 'center center',
              width: '110%',
              height: '110%',
              left: '-5%',
              top: '-5%'
            }}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen={false}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* Text Section - Bottom half */}
        <div className="h-[50vh] bg-black flex flex-col justify-center items-center text-center px-6 pb-20">
          <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto">
            <h1 className="text-3xl font-playfair font-bold text-white mb-3 leading-tight">
              Your Vision,
              <span className="block text-gold">Amplified.</span>
            </h1>
            
            <p className="text-base text-white/90 mb-4 leading-relaxed">
              Modern media with timeless integrity. We create stunning, professional content that gets you noticed the right way.
            </p>

            <div className="flex flex-col gap-3 w-full">
              <a href="/contact" className="bg-gold hover:bg-gold/90 text-black font-semibold px-6 py-3 rounded-sm transition-all duration-300 text-center">
                Let's Create
              </a>
              <a href="/contact" className="border border-white text-white hover:bg-white hover:text-black font-semibold px-6 py-3 rounded-sm transition-all duration-300 text-center">
                Discuss Your Vision
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Original overlay style */}
      <div className="hidden md:block relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <iframe
          src="https://iframe.videodelivery.net/e80443ae9084ffea8f28180125ed3e15?muted=true&autoplay=true&loop=true&controls=false&quality=4k"
          className="absolute inset-0 w-full h-full"
          style={{ 
            border: 'none',
            transform: 'scale(1.1)',
            transformOrigin: 'center center',
            width: '110%',
            height: '110%',
            left: '-5%',
            top: '-5%'
          }}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          allowFullScreen={false}
        />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 bg-black/30 flex flex-col justify-center items-center text-center">
          {/* Hero Content */}
          <div className="max-w-4xl px-6 z-20">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
              Your Vision,
              <span className="block text-gold">Amplified.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl leading-relaxed">
              Modern media with timeless integrity. We create stunning, professional content that gets you noticed the right way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-gold hover:bg-gold/90 text-black font-semibold px-8 py-4 rounded-sm transition-all duration-300 text-lg text-center">
                Let's Create
              </a>
              <a href="/contact" className="border border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-4 rounded-sm transition-all duration-300 text-lg text-center">
                Discuss Your Vision
              </a>
            </div>
          </div>
        </div>

        {/* Subtle Grain Overlay - Desktop only */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-noise mix-blend-overlay" />
      </div>
      
      {/* Navigation at bottom of hero - All screens */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <StickyNav />
      </div>
    </div>
  )
}