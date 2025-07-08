import React from 'react'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import { Heart, Award, Users, Sparkles } from 'lucide-react'

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Header currentSection="about" />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bitcount text-gray-900 mb-6">
                About Ivoke
              </h1>
              <p className="text-xl md:text-2xl font-mukta text-gray-600 max-w-3xl mx-auto">
                Where tradition meets innovation, and every thread tells a story of timeless elegance.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-almendra text-gray-900 mb-6">
                  Our Story
                </h2>
                <div className="space-y-6 font-mukta text-gray-700 text-lg leading-relaxed">
                  <p>
                    Founded with a vision to bridge the gap between traditional craftsmanship and contemporary design, 
                    Ivoke represents the evolution of women's couture fashion. Our journey began with a simple belief: 
                    that every woman deserves to feel extraordinary.
                  </p>
                  <p>
                    Drawing inspiration from rich cultural heritage while embracing modern aesthetics, we create pieces 
                    that are not just garments, but expressions of individuality and confidence. Each design is 
                    meticulously crafted to celebrate the unique beauty of every woman who wears it.
                  </p>
                  <p>
                    At Ivoke, we don't just make clothes – we craft experiences, memories, and moments of pure elegance 
                    that last a lifetime.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://i.ibb.co/zWSytyyj/Every-collection-begins-with-a-feeling-an-echo-from-our-roots-a-whisper-of-what-s-to-come-This-1.jpg"
                  alt="Ivoke craftsmanship"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-600 rounded-full opacity-20"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-almendra text-white mb-4">
                Our Values
              </h2>
              <div className="flex items-center justify-center mb-8">
                <div className="h-px bg-pink-600 w-16"></div>
                <div className="mx-4 text-pink-400 font-bitcount text-lg">♦</div>
                <div className="h-px bg-pink-600 w-16"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-almendra text-white mb-3">Passion</h3>
                <p className="text-gray-300 font-mukta">
                  Every stitch is infused with love and dedication to creating something truly beautiful.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-almendra text-white mb-3">Excellence</h3>
                <p className="text-gray-300 font-mukta">
                  We never compromise on quality, ensuring each piece meets the highest standards.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-almendra text-white mb-3">Community</h3>
                <p className="text-gray-300 font-mukta">
                  Supporting local artisans and building a community of empowered women.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-almendra text-white mb-3">Innovation</h3>
                <p className="text-gray-300 font-mukta">
                  Constantly evolving while honoring traditional techniques and craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-almendra text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 font-mukta max-w-2xl mx-auto">
                The passionate individuals behind every Ivoke creation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-almendra text-2xl">R</span>
                </div>
                <h3 className="text-xl font-almendra text-gray-900 mb-2">Rishabh Jain</h3>
                <p className="text-pink-600 font-mukta font-medium mb-3">Founder & Creative Director</p>
                <p className="text-gray-600 font-mukta">
                  Visionary behind Ivoke's unique aesthetic, blending traditional craftsmanship with modern design.
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-almendra text-2xl">A</span>
                </div>
                <h3 className="text-xl font-almendra text-gray-900 mb-2">Artisan Team</h3>
                <p className="text-pink-600 font-mukta font-medium mb-3">Master Craftspeople</p>
                <p className="text-gray-600 font-mukta">
                  Skilled artisans who bring each design to life with meticulous attention to detail.
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-500 to-purple-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-almendra text-2xl">D</span>
                </div>
                <h3 className="text-xl font-almendra text-gray-900 mb-2">Design Team</h3>
                <p className="text-pink-600 font-mukta font-medium mb-3">Creative Innovators</p>
                <p className="text-gray-600 font-mukta">
                  Talented designers who push boundaries while respecting traditional techniques.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage