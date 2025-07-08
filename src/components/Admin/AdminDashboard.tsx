import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { LogOut, Edit, Plus, Trash2 } from 'lucide-react'

const AdminDashboard: React.FC = () => {
  const { isLoggedIn, logout, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('hero')
  const [heroContent, setHeroContent] = useState({
    title: '',
    subtitle: '',
    cta_text: ''
  })
  const [galleryImages, setGalleryImages] = useState<any[]>([])
  const [testimonials, setTestimonials] = useState<any[]>([])

  useEffect(() => {
    if (isLoggedIn) {
      fetchData()
    }
  }, [isLoggedIn])

  const fetchData = async () => {
    try {
      // Fetch hero content
      const { data: heroData } = await supabase
        .from('hero_content')
        .select('*')
        .single()

      if (heroData) {
        setHeroContent({
          title: heroData.title,
          subtitle: heroData.subtitle,
          cta_text: heroData.cta_text
        })
      }

      // Fetch gallery images
      const { data: galleryData } = await supabase
        .from('gallery_images')
        .select('*')
        .order('order_index')

      if (galleryData) {
        setGalleryImages(galleryData)
      }

      // Fetch testimonials
      const { data: testimonialsData } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index')

      if (testimonialsData) {
        setTestimonials(testimonialsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const updateHeroContent = async () => {
    try {
      const { error } = await supabase
        .from('hero_content')
        .upsert({
          id: 1,
          title: heroContent.title,
          subtitle: heroContent.subtitle,
          cta_text: heroContent.cta_text,
          updated_at: new Date().toISOString()
        })

      if (!error) {
        alert('Hero content updated successfully!')
      }
    } catch (error) {
      console.error('Error updating hero content:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 font-mukta">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="https://i.ibb.co/Y4T6CR3y/505428244-1020249656551290-759465334344075415-n-1.jpg" 
                alt="Ivoke" 
                className="h-8 w-auto mr-4"
              />
              <h1 className="text-xl font-almendra text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <button
              onClick={logout}
              className="flex items-center text-gray-600 hover:text-pink-600 font-mukta"
            >
              <LogOut size={20} className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('hero')}
              className={`px-3 py-2 font-mukta font-medium text-sm ${
                activeTab === 'hero'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Hero Content
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-2 font-mukta font-medium text-sm ${
                activeTab === 'gallery'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-3 py-2 font-mukta font-medium text-sm ${
                activeTab === 'testimonials'
                  ? 'text-pink-600 border-b-2 border-pink-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Testimonials
            </button>
          </nav>
        </div>

        {activeTab === 'hero' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-almendra text-gray-900 mb-6">
              Edit Hero Section
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 font-mukta"
                />
              </div>
              <div>
                <label className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <textarea
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 font-mukta"
                />
              </div>
              <div>
                <label className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                  CTA Text
                </label>
                <input
                  type="text"
                  value={heroContent.cta_text}
                  onChange={(e) => setHeroContent({...heroContent, cta_text: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-pink-500 focus:border-pink-500 font-mukta"
                />
              </div>
              <button
                onClick={updateHeroContent}
                className="bg-pink-600 text-white px-4 py-2 rounded-md font-mukta hover:bg-pink-700"
              >
                Update Hero Content
              </button>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-almendra text-gray-900 mb-6">
              Manage Gallery
            </h2>
            <p className="text-gray-600 font-mukta">
              Gallery management functionality will be implemented here.
            </p>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-almendra text-gray-900 mb-6">
              Manage Testimonials
            </h2>
            <p className="text-gray-600 font-mukta">
              Testimonials management functionality will be implemented here.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard