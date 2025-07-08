import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface HeroContent {
  title: string
  subtitle: string
  cta_text: string
}

const Hero: React.FC = () => {
  const [content, setContent] = useState<HeroContent>({
    title: "Tradition Reimagined",
    subtitle: "Where heritage meets haute couture. Every thread tells a story of timeless elegance.",
    cta_text: "Discover Collection"
  })

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const { data, error } = await supabase
          .from('hero_content')
          .select('*')
          .single()

        if (data && !error) {
          setContent({
            title: data.title,
            subtitle: data.subtitle,
            cta_text: data.cta_text
          })
        }
      } catch (error) {
        console.log('Using default hero content')
      }
    }

    fetchHeroContent()
  }, [])

  const scrollToGallery = () => {
    const gallery = document.getElementById('gallery')
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center relative overflow-hidden">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bitcount text-pink-400 mb-6 leading-tight">
            {content.title}
          </h1>
          <p className="text-xl md:text-2xl font-mukta text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            {content.subtitle}
          </p>
          <button
            onClick={scrollToGallery}
            className="bg-pink-600 text-white px-8 py-3 rounded-full font-mukta font-medium text-lg hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            {content.cta_text}
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero