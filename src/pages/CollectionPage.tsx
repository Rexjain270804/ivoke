import React, { useState } from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { Filter, Grid, List, Heart, ShoppingBag, Star } from 'lucide-react'

interface CollectionItem {
  id: string
  name: string
  price: string
  image: string
  category: string
  isNew?: boolean
  isFeatured?: boolean
  rating: number
  description: string
}

const CollectionPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'tops', name: 'Tops & Blouses' },
    { id: 'bottoms', name: 'Bottoms' },
    { id: 'accessories', name: 'Accessories' }
  ]

  const sortOptions = [
    { id: 'featured', name: 'Featured' },
    { id: 'newest', name: 'Newest First' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' }
  ]

  const collectionItems: CollectionItem[] = [
    {
      id: '1',
      name: 'Ethereal Evening Gown',
      price: '₹45,000',
      image: 'https://i.ibb.co/zWSytyyj/Every-collection-begins-with-a-feeling-an-echo-from-our-roots-a-whisper-of-what-s-to-come-This-1.jpg',
      category: 'dresses',
      isNew: true,
      isFeatured: true,
      rating: 5,
      description: 'A stunning evening gown that embodies elegance and sophistication with intricate embroidery.'
    },
    {
      id: '2',
      name: 'Heritage Silk Saree',
      price: '₹32,000',
      image: 'https://i.ibb.co/1Yf6gy8y/Every-collection-begins-with-a-feeling-an-echo-from-our-roots-a-whisper-of-what-s-to-come-This.jpg',
      category: 'dresses',
      isFeatured: true,
      rating: 5,
      description: 'Traditional silk saree with contemporary draping and modern embellishments.'
    },
    {
      id: '3',
      name: 'Couture Blazer Set',
      price: '₹28,000',
      image: 'https://i.ibb.co/0p6Hb5XS/Laid-back-but-make-it-couture-ivoke25-ivokeindia-1.jpg',
      category: 'tops',
      isNew: true,
      rating: 4,
      description: 'Laid-back luxury meets couture craftsmanship in this sophisticated blazer ensemble.'
    },
    {
      id: '4',
      name: 'Modern Minimalist Dress',
      price: '₹22,000',
      image: 'https://i.ibb.co/m5DShqJz/Laid-back-but-make-it-couture-ivoke25-ivokeindia-2.jpg',
      category: 'dresses',
      rating: 4,
      description: 'Clean lines and subtle details create a perfect balance of comfort and elegance.'
    },
    {
      id: '5',
      name: 'Statement Coord Set',
      price: '₹35,000',
      image: 'https://i.ibb.co/Y4m0RV4p/Laid-back-but-make-it-couture-ivoke25-ivokeindia.jpg',
      category: 'tops',
      isFeatured: true,
      rating: 5,
      description: 'Bold yet refined coordinate set that makes a statement while maintaining sophistication.'
    },
    {
      id: '6',
      name: 'Artisan Crafted Ensemble',
      price: '₹42,000',
      image: 'https://i.ibb.co/yn52pVgP/Look-closer-It-s-Ivoke-Where-subtle-meets-striking-ivokeindia-khoje-edit1.jpg',
      category: 'dresses',
      isNew: true,
      isFeatured: true,
      rating: 5,
      description: 'Where subtle meets striking - intricate craftsmanship in every detail.'
    },
    {
      id: '7',
      name: 'Rebellious Grace',
      price: '₹38,000',
      image: 'https://i.ibb.co/67S48r5W/Poised-rebellion.jpg',
      category: 'dresses',
      rating: 4,
      description: 'Poised rebellion captured in fabric - for the woman who dares to be different.'
    },
    {
      id: '8',
      name: 'Contemporary Classic',
      price: '₹29,000',
      image: 'https://i.ibb.co/7cbJnRb/502439061-17852486307470958-6083905811463632621-n.jpg',
      category: 'tops',
      rating: 4,
      description: 'Timeless design with a contemporary twist, perfect for the modern woman.'
    }
  ]

  const filteredItems = collectionItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  )

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ))
  }

  return (
    <div className="min-h-screen">
      <Header currentSection="collection" />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bitcount text-gray-900 mb-6">
                Our Collection
              </h1>
              <p className="text-xl md:text-2xl font-mukta text-gray-600 max-w-3xl mx-auto">
                Discover pieces that celebrate your unique style and embrace timeless elegance.
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Controls */}
        <section className="py-8 bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              {/* Category Filter */}
              <div className="flex items-center space-x-4">
                <Filter className="text-gray-400" size={20} />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 font-mukta focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort and View Controls */}
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 font-mukta focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>

                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-pink-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-pink-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-600 font-mukta">
              Showing {filteredItems.length} of {collectionItems.length} items
            </div>
          </div>
        </section>

        {/* Collection Grid */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredItems.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                      {item.isNew && (
                        <div className="absolute top-3 left-3 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-mukta font-medium z-10">
                          New
                        </div>
                      )}
                      {item.isFeatured && (
                        <div className="absolute top-3 right-3 bg-black text-white px-2 py-1 rounded-full text-xs font-mukta font-medium z-10">
                          Featured
                        </div>
                      )}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex space-x-3">
                          <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors">
                            <Heart size={20} className="text-gray-900" />
                          </button>
                          <button className="bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-colors">
                            <ShoppingBag size={20} className="text-gray-900" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-mukta font-medium text-gray-900 group-hover:text-pink-600 transition-colors">
                        {item.name}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(item.rating)}
                        </div>
                        <span className="text-sm text-gray-500 font-mukta">({item.rating})</span>
                      </div>
                      <p className="text-lg font-mukta font-medium text-gray-900">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-6 p-6 border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      {item.isNew && (
                        <div className="absolute -top-2 -right-2 bg-pink-600 text-white px-2 py-1 rounded-full text-xs font-mukta font-medium">
                          New
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-mukta font-medium text-gray-900 mb-2">{item.name}</h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center space-x-1">
                              {renderStars(item.rating)}
                            </div>
                            <span className="text-sm text-gray-500 font-mukta">({item.rating})</span>
                          </div>
                          <p className="text-gray-600 font-mukta mb-3">{item.description}</p>
                          <p className="text-xl font-mukta font-medium text-gray-900">{item.price}</p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button className="p-2 border border-gray-300 rounded-lg hover:border-pink-600 hover:text-pink-600 transition-colors">
                            <Heart size={20} />
                          </button>
                          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg font-mukta hover:bg-pink-700 transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-almendra text-white mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-gray-300 font-mukta mb-8 max-w-2xl mx-auto">
              We offer custom design services to create the perfect piece just for you.
            </p>
            <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-full font-mukta font-medium text-lg hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105">
              Request Custom Design
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default CollectionPage