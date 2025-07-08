import React, { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { LogOut, Edit, Plus, Trash2, Save, AlertCircle, CheckCircle, Upload, ArrowUp, ArrowDown } from 'lucide-react'

interface HeroContent {
  title: string
  subtitle: string
  cta_text: string
}

interface GalleryImage {
  id: string
  image_url: string
  alt_text: string
  order_index: number
}

interface Testimonial {
  id: string
  name: string
  content: string
  order_index: number
}

const AdminDashboard: React.FC = () => {
  const { user, isLoggedIn, logout, loading } = useAuth()
  const [activeTab, setActiveTab] = useState('hero')
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: '',
    subtitle: '',
    cta_text: ''
  })
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [newGalleryImage, setNewGalleryImage] = useState({ image_url: '', alt_text: '' })
  const [newTestimonial, setNewTestimonial] = useState({ name: '', content: '' })
  const [editingGallery, setEditingGallery] = useState<string | null>(null)
  const [editingTestimonial, setEditingTestimonial] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    if (isLoggedIn) {
      fetchData()
    }
  }, [isLoggedIn])

  const fetchData = async () => {
    try {
      // Fetch hero content
      const { data: heroData, error: heroError } = await supabase
        .from('hero_content')
        .select('*')
        .single()

      if (heroError && heroError.code !== 'PGRST116') {
        console.error('Error fetching hero content:', heroError)
      } else if (heroData) {
        setHeroContent({
          title: heroData.title || '',
          subtitle: heroData.subtitle || '',
          cta_text: heroData.cta_text || ''
        })
      }

      // Fetch gallery images
      const { data: galleryData, error: galleryError } = await supabase
        .from('gallery_images')
        .select('*')
        .order('order_index')

      if (galleryError) {
        console.error('Error fetching gallery images:', galleryError)
      } else if (galleryData) {
        setGalleryImages(galleryData)
      }

      // Fetch testimonials
      const { data: testimonialsData, error: testimonialsError } = await supabase
        .from('testimonials')
        .select('*')
        .order('order_index')

      if (testimonialsError) {
        console.error('Error fetching testimonials:', testimonialsError)
      } else if (testimonialsData) {
        setTestimonials(testimonialsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      setSaveMessage({ type: 'error', text: 'Failed to load data. Please refresh the page.' })
    }
  }

  const updateHeroContent = async () => {
    if (!heroContent.title.trim() || !heroContent.subtitle.trim() || !heroContent.cta_text.trim()) {
      setSaveMessage({ type: 'error', text: 'Please fill in all fields' })
      return
    }

    setIsSaving(true)
    setSaveMessage(null)

    try {
      const { error } = await supabase
        .from('hero_content')
        .upsert({
          id: 1,
          title: heroContent.title.trim(),
          subtitle: heroContent.subtitle.trim(),
          cta_text: heroContent.cta_text.trim(),
          updated_at: new Date().toISOString()
        })

      if (error) {
        throw error
      }

      setSaveMessage({ type: 'success', text: 'Hero content updated successfully!' })
      
      // Clear message after 3 seconds
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error: any) {
      console.error('Error updating hero content:', error)
      setSaveMessage({ type: 'error', text: error.message || 'Failed to update hero content' })
    } finally {
      setIsSaving(false)
    }
  }

  const addGalleryImage = async () => {
    if (!newGalleryImage.image_url.trim() || !newGalleryImage.alt_text.trim()) {
      setSaveMessage({ type: 'error', text: 'Please fill in all gallery image fields' })
      return
    }

    setIsSaving(true)
    setSaveMessage(null)

    try {
      const maxOrder = Math.max(...galleryImages.map(img => img.order_index), 0)
      
      const { data, error } = await supabase
        .from('gallery_images')
        .insert({
          image_url: newGalleryImage.image_url.trim(),
          alt_text: newGalleryImage.alt_text.trim(),
          order_index: maxOrder + 1
        })
        .select()
        .single()

      if (error) throw error

      setGalleryImages([...galleryImages, data])
      setNewGalleryImage({ image_url: '', alt_text: '' })
      setSaveMessage({ type: 'success', text: 'Gallery image added successfully!' })
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error: any) {
      console.error('Error adding gallery image:', error)
      setSaveMessage({ type: 'error', text: error.message || 'Failed to add gallery image' })
    } finally {
      setIsSaving(false)
    }
  }

  const updateGalleryImage = async (id: string, updates: Partial<GalleryImage>) => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      const { error } = await supabase
        .from('gallery_images')
        .update(updates)
        .eq('id', id)

      if (error) throw error

      setGalleryImages(galleryImages.map(img => 
        img.id === id ? { ...img, ...updates } : img
      ))
      setEditingGallery(null)
      setSaveMessage({ type: 'success', text: 'Gallery image updated successfully!' })
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error: any) {
      console.error('Error updating gallery image:', error)
      setSaveMessage({ type: 'error', text: error.message || 'Failed to update gallery image' })
    } finally {
      setIsSaving(false)
    }
  }

  const deleteGalleryImage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    setIsSaving(true)
    setSaveMessage(null)

    try {
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id)

      if (error) throw error

      setGalleryImages(galleryImages.filter(img => img.id !== id))
      setSaveMessage({ type: 'success', text: 'Gallery image deleted successfully!' })
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error: any) {
      console.error('Error deleting gallery image:', error)
      setSaveMessage({ type: 'error', text: error.message || 'Failed to delete gallery image' })
    } finally {
      setIsSaving(false)
    }
  }

  const addTestimonial = async () => {
    if (!newTestimonial.name.trim() || !newTestimonial.content.trim()) {
      setSaveMessage({ type: 'error', text: 'Please fill in all testimonial fields' })
      return
    }

    setIsSaving(true)
    setSaveMessage(null)

    try {
      const maxOrder = Math.max(...testimonials.map(t => t.order_index), 0)
      
      const { data, error } = await supabase
        .from('testimonials')
        .insert({
          name: newTestimonial.name.trim(),
          content: newTestimonial.content.trim(),
          order_index: maxOrder + 1
        })
        .select()
        .single()

      if (error) throw error

      setTestimonials([...testimonials, data])
      setNewTestimonial({ name: '', content: '' })
      setSaveMessage({ type: 'success', text: 'Testimonial added successfully!' })
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error: any) {
      console.error('Error adding testimonial:', error)
      setSaveMessage({ type: 'error', text: error.message || 'Failed to add testimonial' })
    } finally {
      setIsSaving(false)
    }
  }

  const updateTestimonial = async (id: string, updates: Partial<Testimonial>) => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      const { error } = await supabase
        .from('testimonials')
        .update(updates)
        .eq('id', id)

      if (error) throw error

      setTestimonials(testimonials.map(t => 
        t.id === id ? { ...t, ...updates } : t
      ))
      setEditingTestimonial(null)
      setSaveMessage({ type: 'success', text: 'Testimonial updated successfully!' })
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error: any) {
      console.error('Error updating testimonial:', error)
      setSaveMessage({ type: 'error', text: error.message || 'Failed to update testimonial' })
    } finally {
      setIsSaving(false)
    }
  }

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    setIsSaving(true)
    setSaveMessage(null)

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) throw error

      setTestimonials(testimonials.filter(t => t.id !== id))
      setSaveMessage({ type: 'success', text: 'Testimonial deleted successfully!' })
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error: any) {
      console.error('Error deleting testimonial:', error)
      setSaveMessage({ type: 'error', text: error.message || 'Failed to delete testimonial' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error('Logout error:', error)
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
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="https://i.ibb.co/Y4T6CR3y/505428244-1020249656551290-759465334344075415-n-1.jpg" 
                alt="Ivoke" 
                className="h-8 w-auto mr-4"
              />
              <div>
                <h1 className="text-xl font-almendra text-gray-900">
                  Admin Dashboard
                </h1>
                {user?.email && (
                  <p className="text-sm text-gray-500 font-mukta">
                    Welcome, {user.email}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-600 hover:text-pink-600 font-mukta transition-colors"
            >
              <LogOut size={20} className="mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Save Message */}
        {saveMessage && (
          <div className={`mb-6 flex items-center space-x-2 p-4 rounded-lg ${
            saveMessage.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {saveMessage.type === 'success' ? (
              <CheckCircle size={20} />
            ) : (
              <AlertCircle size={20} />
            )}
            <p className="font-mukta">{saveMessage.text}</p>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('hero')}
              className={`px-3 py-2 font-mukta font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'hero'
                  ? 'text-pink-600 border-pink-600'
                  : 'text-gray-500 hover:text-gray-700 border-transparent'
              }`}
            >
              Hero Content
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`px-3 py-2 font-mukta font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'gallery'
                  ? 'text-pink-600 border-pink-600'
                  : 'text-gray-500 hover:text-gray-700 border-transparent'
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => setActiveTab('testimonials')}
              className={`px-3 py-2 font-mukta font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'testimonials'
                  ? 'text-pink-600 border-pink-600'
                  : 'text-gray-500 hover:text-gray-700 border-transparent'
              }`}
            >
              Testimonials
            </button>
          </nav>
        </div>

        {/* Hero Content Tab */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-almendra text-gray-900">
                Edit Hero Section
              </h2>
              <Edit className="text-gray-400" size={24} />
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mukta transition-colors"
                  placeholder="Enter hero title"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mukta transition-colors"
                  placeholder="Enter hero subtitle"
                />
              </div>
              
              <div>
                <label className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                  Call-to-Action Text
                </label>
                <input
                  type="text"
                  value={heroContent.cta_text}
                  onChange={(e) => setHeroContent({...heroContent, cta_text: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mukta transition-colors"
                  placeholder="Enter CTA button text"
                />
              </div>
              
              <button
                onClick={updateHeroContent}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg font-mukta font-medium hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save size={20} />
                    <span>Update Hero Content</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-almendra text-gray-900">
                Manage Gallery
              </h2>
              <Upload className="text-gray-400" size={24} />
            </div>
            
            {/* Add New Image Form */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-mukta font-medium text-gray-900 mb-4">Add New Image</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    value={newGalleryImage.image_url}
                    onChange={(e) => setNewGalleryImage({...newGalleryImage, image_url: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mukta"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={newGalleryImage.alt_text}
                    onChange={(e) => setNewGalleryImage({...newGalleryImage, alt_text: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mukta"
                    placeholder="Description of the image"
                  />
                </div>
              </div>
              <button
                onClick={addGalleryImage}
                disabled={isSaving}
                className="mt-4 flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg font-mukta hover:bg-pink-700 disabled:opacity-50"
              >
                <Plus size={16} />
                <span>Add Image</span>
              </button>
            </div>

            {/* Gallery Images List */}
            <div className="space-y-4">
              {galleryImages.map((image) => (
                <div key={image.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-4">
                    <img
                      src={image.image_url}
                      alt={image.alt_text}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      {editingGallery === image.id ? (
                        <div className="space-y-3">
                          <input
                            type="url"
                            value={image.image_url}
                            onChange={(e) => setGalleryImages(galleryImages.map(img => 
                              img.id === image.id ? {...img, image_url: e.target.value} : img
                            ))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-mukta"
                          />
                          <input
                            type="text"
                            value={image.alt_text}
                            onChange={(e) => setGalleryImages(galleryImages.map(img => 
                              img.id === image.id ? {...img, alt_text: e.target.value} : img
                            ))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-mukta"
                          />
                          <div className="flex space-x-2">
                            <button
                              onClick={() => updateGalleryImage(image.id, {
                                image_url: image.image_url,
                                alt_text: image.alt_text
                              })}
                              className="bg-green-600 text-white px-3 py-1 rounded text-sm font-mukta hover:bg-green-700"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingGallery(null)}
                              className="bg-gray-600 text-white px-3 py-1 rounded text-sm font-mukta hover:bg-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <p className="font-mukta font-medium text-gray-900">{image.alt_text}</p>
                          <p className="text-sm text-gray-500 font-mukta truncate">{image.image_url}</p>
                          <p className="text-xs text-gray-400 font-mukta">Order: {image.order_index}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingGallery(image.id)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => deleteGalleryImage(image.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {galleryImages.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 font-mukta">No gallery images yet. Add your first image above!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === 'testimonials' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-almendra text-gray-900">
                Manage Testimonials
              </h2>
              <Edit className="text-gray-400" size={24} />
            </div>
            
            {/* Add New Testimonial Form */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-mukta font-medium text-gray-900 mb-4">Add New Testimonial</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    value={newTestimonial.name}
                    onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mukta"
                    placeholder="Customer's full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                    Testimonial Content
                  </label>
                  <textarea
                    value={newTestimonial.content}
                    onChange={(e) => setNewTestimonial({...newTestimonial, content: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mukta"
                    placeholder="What did the customer say about your brand?"
                  />
                </div>
              </div>
              <button
                onClick={addTestimonial}
                disabled={isSaving}
                className="mt-4 flex items-center space-x-2 bg-pink-600 text-white px-4 py-2 rounded-lg font-mukta hover:bg-pink-700 disabled:opacity-50"
              >
                <Plus size={16} />
                <span>Add Testimonial</span>
              </button>
            </div>

            {/* Testimonials List */}
            <div className="space-y-4">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
                  {editingTestimonial === testimonial.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => setTestimonials(testimonials.map(t => 
                          t.id === testimonial.id ? {...t, name: e.target.value} : t
                        ))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-mukta"
                      />
                      <textarea
                        value={testimonial.content}
                        onChange={(e) => setTestimonials(testimonials.map(t => 
                          t.id === testimonial.id ? {...t, content: e.target.value} : t
                        ))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 font-mukta"
                      />
                      <div className="flex space-x-2">
                        <button
                          onClick={() => updateTestimonial(testimonial.id, {
                            name: testimonial.name,
                            content: testimonial.content
                          })}
                          className="bg-green-600 text-white px-3 py-1 rounded text-sm font-mukta hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTestimonial(null)}
                          className="bg-gray-600 text-white px-3 py-1 rounded text-sm font-mukta hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-mukta font-medium text-gray-900 mb-2">{testimonial.name}</h4>
                        <p className="text-gray-700 font-mukta">{testimonial.content}</p>
                        <p className="text-xs text-gray-400 font-mukta mt-2">Order: {testimonial.order_index}</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => setEditingTestimonial(testimonial.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => deleteTestimonial(testimonial.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {testimonials.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500 font-mukta">No testimonials yet. Add your first testimonial above!</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard