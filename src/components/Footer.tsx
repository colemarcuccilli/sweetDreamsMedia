import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 pt-16">
      <div className="container max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <img 
                src="https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/logos/sweetDreamsProdlogo.png" 
                alt="Sweet Dreams Production" 
                className="h-10 w-auto mb-4"
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Masters of cinematic content and 2025 social media strategy. We leverage cutting-edge tools 
                to create comprehensive plans that skyrocket businesses and deliver true foundation and value 
                to trustworthy clients. Located in Fort Wayne, Indiana, serving clients nationwide.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="text-gray-300">
                <p className="font-semibold text-gold mb-2">Contact Information</p>
                <p className="text-sm">
                  <strong>Email:</strong> <a href="mailto:jayvalleo@sweetdreamsmusic.com" className="text-gold hover:text-yellow-400 transition-colors">jayvalleo@sweetdreamsmusic.com</a>
                </p>
                <p className="text-sm">
                  <strong>Jay Val Leo:</strong> <a href="tel:+12604507739" className="text-gold hover:text-yellow-400 transition-colors">+1 (260) 450-7739</a>
                </p>
                <p className="text-sm">
                  <strong>Cole Marcuccilli:</strong> <a href="tel:+12606157467" className="text-gold hover:text-yellow-400 transition-colors">(260) 615-7467</a>
                </p>
              </div>
              
              {/* Studio Location */}
              <div className="text-gray-300 pt-3">
                <p className="font-semibold text-gold mb-2">Studio Location</p>
                <p className="text-sm">
                  Sweet Dreams Music Studio<br />
                  3943 Parnell Ave<br />
                  Fort Wayne, IN 46805
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-400 hover:text-gold transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-gold transition-colors">Contact</Link>
              </li>
              <li>
                <a href="https://sweetdreamsmusic.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">Music Studio</a>
              </li>
              <li>
                <a href="https://sweetdreamsmusic.com/blog/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          {/* Resources & Social */}
          <div>
            <h3 className="font-semibold text-gold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://sweetdreamsmusic.com/wakeupblind/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">Jay Val Leo</a>
              </li>
              <li>
                <a href="https://www.youtube.com/@cmarcu" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">Cole's YouTube</a>
              </li>
              <li>
                <a href="https://www.youtube.com/@sweetdreamsmusicfw" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gold transition-colors">Sweet Dreams YouTube</a>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-gold transition-colors">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Sweet Dreams Music LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}