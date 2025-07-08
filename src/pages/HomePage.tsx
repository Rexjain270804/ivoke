import React, { useState, useEffect } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import Hero from '../components/Sections/Hero'
import Gallery from '../components/Sections/Gallery'
import Testimonials from '../components/Sections/Testimonials'

const HomePage: React.FC = () => {
  const [currentSection, setCurrentSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'gallery', 'testimonials']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setCurrentSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      <Header currentSection={currentSection} />
      <main>
        <Hero />
        <Gallery />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

export default HomePage