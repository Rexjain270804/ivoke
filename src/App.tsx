import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AdminLogin from './components/Admin/AdminLogin'
import AdminDashboard from './components/Admin/AdminDashboard'
import ProtectedRoute from './components/Admin/ProtectedRoute'

function App() {
  return (
    <Router>
      <div className="App">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Almendra+Display&family=Bitcount+Grid+Double:wght@100..900&family=Mukta:wght@200;300;400;500;600;700;800&display=swap');
          
          .font-almendra { font-family: 'Almendra Display', serif; }
          .font-mukta { font-family: 'Mukta', sans-serif; }
          .font-bitcount { font-family: 'Bitcount Grid Double', monospace; }
          
          * {
            box-sizing: border-box;
          }
          
          html {
            scroll-behavior: smooth;
          }
          
          body {
            margin: 0;
            padding: 0;
            font-family: 'Mukta', sans-serif;
            line-height: 1.6;
          }
        `}</style>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App