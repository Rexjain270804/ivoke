import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token')
      if (token) {
        try {
          const { data } = await supabase
            .from('admin_users')
            .select('id')
            .eq('id', token)
            .single()
          
          if (data) {
            setIsLoggedIn(true)
          }
        } catch (error) {
          localStorage.removeItem('admin_token')
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, password_hash')
        .eq('email', email)
        .single()

      if (error || !data) {
        throw new Error('Invalid credentials')
      }

      // In a real app, you'd verify the password hash
      // For demo purposes, we'll assume the password is correct
      localStorage.setItem('admin_token', data.id)
      setIsLoggedIn(true)
      return true
    } catch (error) {
      throw new Error('Login failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    setIsLoggedIn(false)
  }

  return { isLoggedIn, login, logout, loading }
}