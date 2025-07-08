import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

interface HeaderProps {
  currentSection: string
}

const Header: React.FC<HeaderProps> = ({ currentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

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

  return (
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <Link to="/">
                <img 
                  src={logoUrl} 
                  alt="Ivoke" 
                  className="h-8 w-auto transition-all duration-300"
                />
              </Link>
            </div>

            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`text-gray-900 hover:text-pink-600 transition-colors font-mukta ${
                  location.pathname === '/' ? 'text-pink-600' : ''
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`text-gray-900 hover:text-pink-600 transition-colors font-mukta ${
                  location.pathname === '/about' ? 'text-pink-600' : ''
                }`}
              >
                About
              </Link>
              <Link
                to="/collection"
                className={`text-gray-900 hover:text-pink-600 transition-colors font-mukta ${
                  location.pathname === '/collection' ? 'text-pink-600' : ''
                }`}
              >
                Collection
              </Link>
              <Link
                to="/contact"
                className={`text-gray-900 hover:text-pink-600 transition-colors font-mukta ${
                  location.pathname === '/contact' ? 'text-pink-600' : ''
                }`}
              >
                Contact
              </Link>
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
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-gray-900 hover:text-pink-600 font-mukta ${
                  location.pathname === '/' ? 'text-pink-600' : ''
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-gray-900 hover:text-pink-600 font-mukta ${
                  location.pathname === '/about' ? 'text-pink-600' : ''
                }`}
              >
                About
              </Link>
              <Link
                to="/collection"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-gray-900 hover:text-pink-600 font-mukta ${
                  location.pathname === '/collection' ? 'text-pink-600' : ''
                }`}
              >
                Collection
              </Link>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 text-gray-900 hover:text-pink-600 font-mukta ${
                  location.pathname === '/contact' ? 'text-pink-600' : ''
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>
    </div>
  )
}

export default Header