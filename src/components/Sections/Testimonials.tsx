import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface Testimonial {
  id: string
  name: string
  content: string
  order_index: number
}

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from('testimonials')
          .select('*')
          .order('order_index')

        if (data && !error) {
          setTestimonials(data)
        } else {
          // Default testimonials
          setTestimonials([
            {
              id: '1',
              name: 'Priya Sharma',
              content: 'Ivoke has redefined elegance for me. Each piece tells a story, and wearing their couture makes me feel connected to my heritage while embracing modernity.',
              order_index: 1
            },
            {
              id: '2',
              name: 'Ananya Gupta',
              content: 'The craftsmanship is absolutely breathtaking. Every detail is perfect, from the intricate embroidery to the way the fabric flows. Pure artistry.',
              order_index: 2
            },
            {
              id: '3',
              name: 'Kavya Reddy',
              content: 'I have never felt more confident and beautiful. Ivoke understands what it means to create clothes that celebrate femininity and strength.',
              order_index: 3
            }
          ])
        }
      } catch (error) {
        console.log('Using default testimonials')
      }
    }

    fetchTestimonials()
  }, [])

  return (
    <section id="testimonials" className="py-20 bg-black text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-pink-600 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-pink-600 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-pink-600 rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-almendra text-white mb-4">
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-pink-600 w-16"></div>
            <div className="mx-4 text-pink-400 font-bitcount text-lg">♦</div>
            <div className="h-px bg-pink-600 w-16"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-gray-900 rounded-lg p-8 relative">
              <div className="absolute -top-4 left-8 text-pink-400 text-4xl font-bitcount">
                "
              </div>
              <p className="text-gray-300 font-mukta text-lg mb-6 leading-relaxed">
                {testimonial.content}
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-almendra text-lg">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-4">
                  <h4 className="text-white font-mukta font-medium">
                    {testimonial.name}
                  </h4>
                  <p className="text-pink-400 font-mukta text-sm">
                    Ivoke Client
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials