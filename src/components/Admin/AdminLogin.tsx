import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, isLoggedIn, loading } = useAuth()

  // Show loading spinner while checking auth state
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

  // Redirect if already logged in
  if (isLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await login(email, password)
      // Navigation will happen automatically via useAuth hook
    } catch (err: any) {
      console.error('Login error:', err)
      
      // Handle specific error messages
      if (err.message?.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please check your credentials and try again.')
      } else if (err.message?.includes('Email not confirmed')) {
        setError('Please confirm your email address before logging in.')
      } else if (err.message?.includes('Too many requests')) {
        setError('Too many login attempts. Please wait a moment and try again.')
      } else {
        setError(err.message || 'Login failed. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <img 
              src="https://i.ibb.co/Y4T6CR3y/505428244-1020249656551290-759465334344075415-n-1.jpg" 
              alt="Ivoke" 
              className="h-12 w-auto mx-auto mb-4"
            />
            <h2 className="text-3xl font-almendra text-gray-900 mb-2">
              Admin Portal
            </h2>
            <p className="text-gray-600 font-mukta">
              Sign in to manage your content
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mukta transition-colors"
                placeholder="Enter your email"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-mukta font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 font-mukta transition-colors"
                  placeholder="Enter your password"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle size={20} />
                <p className="text-sm font-mukta">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-4 rounded-lg font-mukta font-medium hover:from-pink-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 font-mukta text-center mb-2">
                <strong>Demo Credentials:</strong>
              </p>
              <div className="text-xs text-gray-700 font-mukta space-y-1">
                <p><strong>Email:</strong> admin@ivoke.com</p>
                <p><strong>Password:</strong> admin123</p>
              </div>
              <p className="text-xs text-gray-500 font-mukta mt-2 text-center">
                Note: You'll need to create this user in your Supabase Auth dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin