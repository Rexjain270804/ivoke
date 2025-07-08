import React from 'react'
import { Instagram, Facebook, Twitter } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img 
              src="https://i.ibb.co/45yBCvs/496960366-17847481419470958-3960995824733361826-n.jpg" 
              alt="Ivoke" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-400 font-mukta">
              Where tradition meets contemporary elegance. 
              Handcrafted couture for the modern woman.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-almendra mb-4">Quick Links</h3>
            <ul className="space-y-2 font-mukta">
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Collection</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">Size Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-almendra mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 font-mukta">
            © 2024 Ivoke. All rights reserved. | Crafted with heritage and passion.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer