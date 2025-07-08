import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { supabase } from '../lib/supabase'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitMessage({ type: 'error', text: 'Please fill in all fields' })
      return
    }

    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        })

      if (error) throw error

      setFormData({ name: '', email: '', message: '' })
      setSubmitMessage({ 
        type: 'success', 
        text: 'Thank you for your message! We\'ll get back to you soon.' 
      })
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitMessage(null), 5000)
    } catch (error: any) {
      console.error('Error submitting contact form:', error)
      setSubmitMessage({ 
        type: 'error', 
        text: error.message || 'Failed to send message. Please try again.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen">
      <Header currentSection="contact" />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bitcount text-gray-900 mb-6">
                Get In Touch
              </h1>
              <p className="text-xl md:text-2xl font-mukta text-gray-600 max-w-3xl mx-auto">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-4xl font-almendra text-gray-900 mb-8">
                  Let's Connect
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-mukta font-medium text-gray-900 mb-2">Visit Our Studio</h3>
                      <p className="text-gray-600 font-mukta">
                        123 Fashion District<br />
                        Mumbai, Maharashtra 400001<br />
                        India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-mukta font-medium text-gray-900 mb-2">Call Us</h3>
                      <p className="text-gray-600 font-mukta">
                        +91 98765 43210<br />
                        +91 87654 32109
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-mukta font-medium text-gray-900 mb-2">Email Us</h3>
                      <p className="text-gray-600 font-mukta">
                        hello@ivoke.com<br />
                        orders@ivoke.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="text-white" size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-mukta font-medium text-gray-900 mb-2">Studio Hours</h3>
                      <p className="text-gray-600 font-mukta">
                        Monday - Friday: 10:00 AM - 7:00 PM<br />
                        Saturday: 10:00 AM - 5:00 PM<br />
                        Sunday: By Appointment Only
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-12">
                  <h3 className="text-lg font-mukta font-medium text-gray-900 mb-4">Follow Our Journey</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                      <span className="text-sm font-bold">IG</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                      <span className="text-sm font-bold">FB</span>
                    </a>
                    <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center text-white hover:bg-pink-700 transition-colors">
                      <span className="text-sm font-bold">TW</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-almendra text-gray-900 mb-6">
                  Send Us a Message
                </h3>

                {submitMessage && (
                  <div className={`mb-6 flex items-center space-x-2 p-4 rounded-lg ${
                    submitMessage.type === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {submitMessage.type === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <p className="font-mukta">{submitMessage.text}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mukta transition-colors"
                      placeholder="Your full name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mukta transition-colors"
                      placeholder="your.email@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mukta transition-colors"
                      placeholder="Tell us about your inquiry, custom order, or any questions you have..."
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-mukta font-medium hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <Send size={20} />
                        <span>Send Message</span>
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-almendra text-gray-900 mb-4">
                Find Us
              </h2>
              <p className="text-xl text-gray-600 font-mukta">
                Located in the heart of Mumbai's fashion district
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 font-mukta">
                    Interactive map would be embedded here<br />
                    123 Fashion District, Mumbai, Maharashtra 400001
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default ContactPage