'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function StickyNav() {
  const [isSticky, setIsSticky] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      const scrollPosition = window.scrollY
      
      setIsSticky(scrollPosition >= heroHeight - 80) // 80px offset for better UX
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`
      w-full z-50 transition-all duration-300 ease-in-out
      ${isSticky 
        ? 'fixed top-0 bg-black/95 backdrop-blur-md border-b border-gold/20 shadow-lg' 
        : 'relative bg-black/80 backdrop-blur-sm'
      }
    `}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img 
              src="https://fweeyjnqwxywmpmnqpts.supabase.co/storage/v1/object/public/media/logos/sweetDreamsProdlogo.png" 
              alt="Sweet Dreams Production" 
              className="h-8 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-gold transition-colors duration-200">
              Portfolio
            </Link>
            <Link href="/contact" className="text-white hover:text-gold transition-colors duration-200">
              Services
            </Link>
            <Link href="https://sweetdreamsmusic.com" target="_blank" className="text-white hover:text-gold transition-colors duration-200">
              Music
            </Link>
            <Link 
              href="/contact" 
              className="bg-gold hover:bg-gold/90 text-black font-semibold px-6 py-2 rounded-sm transition-all duration-200"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-gold transition-colors duration-200 p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gold/20">
            <div className="px-6 py-4 space-y-4">
              <Link 
                href="/" 
                className="block text-white hover:text-gold transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link 
                href="/contact" 
                className="block text-white hover:text-gold transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="https://sweetdreamsmusic.com" 
                target="_blank"
                className="block text-white hover:text-gold transition-colors duration-200 py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Music
              </Link>
              <Link 
                href="/contact" 
                className="block bg-gold hover:bg-gold/90 text-black font-semibold px-6 py-3 rounded-sm transition-all duration-200 text-center mt-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}