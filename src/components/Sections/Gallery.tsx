import React, { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

interface GalleryImage {
  id: string
  image_url: string
  alt_text: string
  order_index: number
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([])

  useEffect(() => {
    const fetchGalleryImages = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery_images')
          .select('*')
          .order('order_index')

        if (data && !error) {
          setImages(data)
        } else {
          // Default gallery images
          setImages([
            { id: '1', image_url: 'https://i.ibb.co/zWSytyyj/Every-collection-begins-with-a-feeling-an-echo-from-our-roots-a-whisper-of-what-s-to-come-This-1.jpg', alt_text: 'Collection piece 1', order_index: 1 },
            { id: '2', image_url: 'https://i.ibb.co/1Yf6gy8y/Every-collection-begins-with-a-feeling-an-echo-from-our-roots-a-whisper-of-what-s-to-come-This.jpg', alt_text: 'Collection piece 2', order_index: 2 },
            { id: '3', image_url: 'https://i.ibb.co/0p6Hb5XS/Laid-back-but-make-it-couture-ivoke25-ivokeindia-1.jpg', alt_text: 'Collection piece 3', order_index: 3 },
            { id: '4', image_url: 'https://i.ibb.co/m5DShqJz/Laid-back-but-make-it-couture-ivoke25-ivokeindia-2.jpg', alt_text: 'Collection piece 4', order_index: 4 },
            { id: '5', image_url: 'https://i.ibb.co/Y4m0RV4p/Laid-back-but-make-it-couture-ivoke25-ivokeindia.jpg', alt_text: 'Collection piece 5', order_index: 5 },
            { id: '6', image_url: 'https://i.ibb.co/yn52pVgP/Look-closer-It-s-Ivoke-Where-subtle-meets-striking-ivokeindia-khoje-edit1.jpg', alt_text: 'Collection piece 6', order_index: 6 },
            { id: '7', image_url: 'https://i.ibb.co/67S48r5W/Poised-rebellion.jpg', alt_text: 'Collection piece 7', order_index: 7 },
            { id: '8', image_url: 'https://i.ibb.co/7cbJnRb/502439061-17852486307470958-6083905811463632621-n.jpg', alt_text: 'Collection piece 8', order_index: 8 },
          ])
        }
      } catch (error) {
        console.log('Using default gallery images')
      }
    }

    fetchGalleryImages()
  }, [])

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-almendra text-gray-900 mb-4">
            Our Collection
          </h2>
          <p className="text-xl text-gray-600 font-mukta max-w-2xl mx-auto">
            Each piece is meticulously crafted, blending traditional techniques with contemporary design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg bg-gray-100 aspect-square cursor-pointer"
            >
              <img
                src={image.image_url}
                alt={image.alt_text}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-gray-900 font-mukta text-sm text-center">
                    {image.alt_text}
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

export default Gallery