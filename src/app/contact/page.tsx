import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Ready to Create?
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              From concept to completion, we bring your vision to life with cinematic storytelling 
              and cutting-edge production. Let's discuss your next project.
            </p>
          </div>

          {/* Contact Form */}
          <ContactForm />

          {/* Additional Contact Info */}
          <div className="mt-16 text-center">
            <div className="bg-black/60 backdrop-blur-sm rounded-lg p-8 max-w-lg mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Prefer to Call?</h3>
              <p className="text-gray-300 mb-4">
                We love talking about projects! Give us a call for immediate assistance.
              </p>
              <div className="space-y-3">
                <div className="text-gold font-semibold text-lg">
                  📧 jayvalleo@sweetdreamsmusic.com
                </div>
                <div className="text-gray-400 text-sm">
                  <div>Based in Fort Wayne, Indiana</div>
                  <div>Serving clients nationwide</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-gold/20 to-yellow-500/20 backdrop-blur-sm rounded-lg p-8 max-w-4xl mx-auto border border-gold/30">
              <h3 className="text-3xl font-bold text-white mb-4">Why Work With Sweet Dreams?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-gray-300">
                <div>
                  <div className="text-gold text-2xl mb-2">🎬</div>
                  <h4 className="font-semibold text-white mb-2">Cinematic Quality</h4>
                  <p className="text-sm">Professional equipment and techniques that make your content stand out</p>
                </div>
                <div>
                  <div className="text-gold text-2xl mb-2">⚡</div>
                  <h4 className="font-semibold text-white mb-2">Fast Turnaround</h4>
                  <p className="text-sm">Quick delivery without compromising on quality</p>
                </div>
                <div>
                  <div className="text-gold text-2xl mb-2">💡</div>
                  <h4 className="font-semibold text-white mb-2">Creative Vision</h4>
                  <p className="text-sm">We don't just film - we help craft your story</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}