import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  currentSection: string
}

const Header: React.FC<HeaderProps> = ({ currentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [comingSoonPage, setComingSoonPage] = useState('')

  const isDarkSection = currentSection === 'hero' || currentSection === 'testimonials'
  const logoUrl = isDarkSection 
    ? "https://i.ibb.co/45yBCvs/496960366-17847481419470958-3960995824733361826-n.jpg"
    : "https://i.ibb.co/Y4T6CR3y/505428244-1020249656551290-759465334344075415-n-1.jpg"

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const handleComingSoon = (page: string) => {
    setComingSoonPage(page)
    setShowComingSoon(true)
    setIsMenuOpen(false)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <img 
                src={logoUrl} 
                alt="Ivoke" 
                className="h-8 w-auto transition-all duration-300"
              />
            </div>

            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-gray-900 hover:text-pink-600 transition-colors font-mukta"
              >
                Home
              </button>
              <button
                onClick={() => handleComingSoon('About')}
                className="text-gray-900 hover:text-pink-600 transition-colors font-mukta"
              >
                About
              </button>
              <button
                onClick={() => handleComingSoon('Collection')}
                className="text-gray-900 hover:text-pink-600 transition-colors font-mukta"
              >
                Collection
              </button>
              <button
                onClick={() => handleComingSoon('Contact')}
                className="text-gray-900 hover:text-pink-600 transition-colors font-mukta"
              >
                Contact
              </button>
            </nav>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-900 hover:text-pink-600 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button
                onClick={() => scrollToSection('hero')}
                className="block w-full text-left px-3 py-2 text-gray-900 hover:text-pink-600 font-mukta"
              >
                Home
              </button>
              <button
                onClick={() => handleComingSoon('About')}
                className="block w-full text-left px-3 py-2 text-gray-900 hover:text-pink-600 font-mukta"
              >
                About
              </button>
              <button
                onClick={() => handleComingSoon('Collection')}
                className="block w-full text-left px-3 py-2 text-gray-900 hover:text-pink-600 font-mukta"
              >
                Collection
              </button>
              <button
                onClick={() => handleComingSoon('Contact')}
                className="block w-full text-left px-3 py-2 text-gray-900 hover:text-pink-600 font-mukta"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
            <h2 className="text-2xl font-almendra text-gray-900 mb-4">
              {comingSoonPage}
            </h2>
            <p className="text-gray-600 font-mukta mb-6">
              This page is coming soon. We're working on something beautiful for you.
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="bg-pink-600 text-white px-6 py-2 rounded-md font-mukta hover:bg-pink-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Header