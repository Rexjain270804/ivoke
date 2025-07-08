import React, { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login, isLoggedIn } = useAuth()

  if (isLoggedIn) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(email, password)
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <img 
            src="https://i.ibb.co/Y4T6CR3y/505428244-1020249656551290-759465334344075415-n-1.jpg" 
            alt="Ivoke" 
            className="h-12 w-auto mx-auto mb-4"
          />
          <h2 className="text-2xl font-almendra text-gray-900">
            Admin Login
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-mukta font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 font-mukta"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-mukta font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 font-mukta"
              required
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm font-mukta">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-pink-600 text-white py-2 px-4 rounded-md font-mukta font-medium hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 font-mukta">
            Demo credentials:<br />
            Email: Rishabhjain@270804<br />
            Password: Rexjain@27
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin