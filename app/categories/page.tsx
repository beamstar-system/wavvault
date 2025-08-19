'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  Music, 
  Volume2, 
  Headphones, 
  Mic,
  Guitar,
  Piano,
  Drum,
  Zap,
  Star,
  ArrowRight
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { useCartStore } from '@/store/cartStore'

const categories = [
  {
    id: "bass",
    name: "Bass",
    icon: Volume2,
    description: "Powerful bass lines and sub-bass sounds for electronic music, hip-hop, and more.",
    color: "from-blue-500 to-purple-600",
    bgColor: "from-blue-50 to-purple-50",
    productCount: 245,
    featuredProducts: [
      {
        id: 1,
        title: "Deep House Bass",
        category: "Bass",
        price: 4.99,
        duration: "2:34",
        waveform: [20, 45, 30, 60, 40, 80, 35, 70, 50, 30],
        description: "Powerful deep house bass line with rich harmonics",
        tags: ["house", "bass", "electronic"],
        audioUrl: "/samples/deep-house-bass.wav",
        rating: 4.8,
        downloads: 1247
      },
      {
        id: 10,
        title: "Dubstep Wobble",
        category: "Bass",
        price: 5.49,
        duration: "1:55",
        waveform: [45, 85, 65, 95, 75, 100, 70, 90, 80, 60],
        description: "Heavy dubstep wobble bass",
        tags: ["dubstep", "wobble", "bass"],
        audioUrl: "/samples/dubstep-wobble.wav",
        rating: 4.6,
        downloads: 1892
      }
    ]
  },
  {
    id: "drums",
    name: "Drums",
    icon: Drum,
    description: "Punchy drum breaks, loops, and individual drum hits for all genres.",
    color: "from-orange-500 to-red-600",
    bgColor: "from-orange-50 to-red-50",
    productCount: 432,
    featuredProducts: [
      {
        id: 3,
        title: "Drum Break",
        category: "Drums",
        price: 2.99,
        duration: "0:58",
        waveform: [40, 80, 60, 90, 70, 95, 65, 85, 75, 50],
        description: "Classic drum break with punchy kicks",
        tags: ["drums", "break", "percussion"],
        audioUrl: "/samples/drum-break.wav",
        rating: 4.7,
        downloads: 3421
      },
      {
        id: 8,
        title: "Trap Hi-Hats",
        category: "Drums",
        price: 3.49,
        duration: "1:12",
        waveform: [35, 70, 50, 85, 60, 90, 55, 80, 65, 45],
        description: "Crispy trap hi-hat pattern",
        tags: ["trap", "hi-hats", "drums"],
        audioUrl: "/samples/trap-hihats.wav",
        rating: 4.7,
        downloads: 2987
      }
    ]
  },
  {
    id: "guitar",
    name: "Guitar",
    icon: Guitar,
    description: "Acoustic and electric guitar loops, riffs, and chord progressions.",
    color: "from-green-500 to-teal-600",
    bgColor: "from-green-50 to-teal-50",
    productCount: 189,
    featuredProducts: [
      {
        id: 2,
        title: "Acoustic Guitar Loop",
        category: "Guitar",
        price: 3.99,
        duration: "1:45",
        waveform: [15, 35, 25, 55, 30, 65, 25, 45, 35, 20],
        description: "Beautiful acoustic guitar progression",
        tags: ["acoustic", "guitar", "folk"],
        audioUrl: "/samples/acoustic-guitar.wav",
        rating: 4.9,
        downloads: 2156
      }
    ]
  },
  {
    id: "synth",
    name: "Synth",
    icon: Zap,
    description: "Atmospheric synth pads, leads, and electronic textures.",
    color: "from-purple-500 to-pink-600",
    bgColor: "from-purple-50 to-pink-50",
    productCount: 156,
    featuredProducts: [
      {
        id: 4,
        title: "Synth Pad",
        category: "Synth",
        price: 5.99,
        duration: "3:12",
        waveform: [10, 25, 15, 35, 20, 45, 15, 30, 25, 15],
        description: "Atmospheric synth pad with long release",
        tags: ["synth", "pad", "ambient"],
        audioUrl: "/samples/synth-pad.wav",
        rating: 4.6,
        downloads: 892
      }
    ]
  },
  {
    id: "vocals",
    name: "Vocals",
    icon: Mic,
    description: "Professional vocal samples, harmonies, and vocal effects.",
    color: "from-pink-500 to-rose-600",
    bgColor: "from-pink-50 to-rose-50",
    productCount: 98,
    featuredProducts: [
      {
        id: 5,
        title: "Vocal Sample",
        category: "Vocals",
        price: 6.99,
        duration: "1:23",
        waveform: [25, 50, 35, 70, 45, 80, 40, 65, 55, 30],
        description: "Clean vocal sample with harmonies",
        tags: ["vocals", "harmony", "pop"],
        audioUrl: "/samples/vocal-sample.wav",
        rating: 4.9,
        downloads: 1876
      }
    ]
  },
  {
    id: "piano",
    name: "Piano",
    icon: Piano,
    description: "Beautiful piano melodies, chord progressions, and classical pieces.",
    color: "from-yellow-500 to-orange-600",
    bgColor: "from-yellow-50 to-orange-50",
    productCount: 134,
    featuredProducts: [
      {
        id: 7,
        title: "Jazz Piano",
        category: "Piano",
        price: 7.99,
        duration: "2:15",
        waveform: [30, 60, 40, 75, 50, 85, 45, 70, 55, 35],
        description: "Smooth jazz piano progression",
        tags: ["jazz", "piano", "smooth"],
        audioUrl: "/samples/jazz-piano.wav",
        rating: 4.8,
        downloads: 1342
      }
    ]
  },
  {
    id: "strings",
    name: "Strings",
    icon: Music,
    description: "Orchestral strings, violin, cello, and string ensemble samples.",
    color: "from-indigo-500 to-blue-600",
    bgColor: "from-indigo-50 to-blue-50",
    productCount: 87,
    featuredProducts: [
      {
        id: 9,
        title: "Orchestral Strings",
        category: "Strings",
        price: 8.99,
        duration: "4:20",
        waveform: [20, 40, 25, 50, 30, 60, 25, 45, 35, 20],
        description: "Emotional orchestral string section",
        tags: ["orchestral", "strings", "emotional"],
        audioUrl: "/samples/orchestral-strings.wav",
        rating: 4.9,
        downloads: 756
      }
    ]
  },
  {
    id: "effects",
    name: "Effects",
    icon: Zap,
    description: "Sound effects, sweeps, impacts, and cinematic audio elements.",
    color: "from-gray-500 to-slate-600",
    bgColor: "from-gray-50 to-slate-50",
    productCount: 203,
    featuredProducts: [
      {
        id: 6,
        title: "FX Sweep",
        category: "Effects",
        price: 1.99,
        duration: "0:45",
        waveform: [5, 15, 10, 25, 15, 35, 10, 20, 15, 8],
        description: "Cinematic sweep effect",
        tags: ["fx", "sweep", "cinematic"],
        audioUrl: "/samples/fx-sweep.wav",
        rating: 4.5,
        downloads: 567
      }
    ]
  }
]

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const { addToCart } = useCartStore()

  const handleAddToCart = (product: any) => {
    addToCart(product)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-bg opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Audio
              <span className="text-gradient block">Categories</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore our carefully curated collection of audio files organized by category. 
              Find the perfect sounds for your next project.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
              >
                <div className={`bg-gradient-to-br ${category.bgColor} rounded-2xl p-8 h-full border border-gray-200 hover:shadow-lg transition-all duration-300`}>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`bg-gradient-to-r ${category.color} p-4 rounded-xl`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <ArrowRight className={`h-6 w-6 text-gray-400 group-hover:text-gray-600 transition-transform duration-300 ${
                      selectedCategory === category.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{category.productCount} files</span>
                    <Link 
                      href={`/browse?category=${category.name}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      Browse all
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Featured Products by Category */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Featured {categories.find(c => c.id === selectedCategory)?.name} Files
              </h2>
              <p className="text-xl text-gray-600">
                Popular audio files in this category
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories
                .find(c => c.id === selectedCategory)
                ?.featuredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductCard
                      product={product}
                      isPlaying={false}
                      onPlay={() => {}}
                      onAddToCart={() => handleAddToCart(product)}
                    />
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Category Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Most Popular Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Popular Categories</h2>
            <div className="space-y-4">
              {categories.slice(0, 4).map((category, index) => (
                <Link
                  key={category.id}
                  href={`/browse?category=${category.name}`}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-r ${category.color} p-3 rounded-lg`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500">{category.productCount} files</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Category Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Category Overview</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`bg-gradient-to-r ${category.color} p-2 rounded-lg`}>
                        <category.icon className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{category.productCount} files</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.8</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {categories.reduce((total, cat) => total + cat.productCount, 0)}
                  </div>
                  <div className="text-sm text-gray-500">Total Audio Files</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-primary-100 mb-6 max-w-2xl mx-auto">
              Browse our complete collection of audio files and find the perfect sounds for your next project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/browse"
                className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                Browse All Files
              </Link>
              <Link 
                href="/about"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}