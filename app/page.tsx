'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  Volume2, 
  ShoppingCart, 
  Heart, 
  Star,
  Music,
  Headphones,
  Download,
  Search
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AudioPlayer from '@/components/AudioPlayer'
import ProductCard from '@/components/ProductCard'
import { useCartStore } from '@/store/cartStore'

// Sample product data
const sampleProducts = [
  {
    id: 1,
    title: "Deep House Bass",
    category: "Bass",
    price: 4.99,
    duration: "2:34",
    waveform: [20, 45, 30, 60, 40, 80, 35, 70, 50, 30],
    description: "Powerful deep house bass line with rich harmonics",
    tags: ["house", "bass", "electronic"],
    audioUrl: "/samples/deep-house-bass.wav"
  },
  {
    id: 2,
    title: "Acoustic Guitar Loop",
    category: "Guitar",
    price: 3.99,
    duration: "1:45",
    waveform: [15, 35, 25, 55, 30, 65, 25, 45, 35, 20],
    description: "Beautiful acoustic guitar progression",
    tags: ["acoustic", "guitar", "folk"],
    audioUrl: "/samples/acoustic-guitar.wav"
  },
  {
    id: 3,
    title: "Drum Break",
    category: "Drums",
    price: 2.99,
    duration: "0:58",
    waveform: [40, 80, 60, 90, 70, 95, 65, 85, 75, 50],
    description: "Classic drum break with punchy kicks",
    tags: ["drums", "break", "percussion"],
    audioUrl: "/samples/drum-break.wav"
  },
  {
    id: 4,
    title: "Synth Pad",
    category: "Synth",
    price: 5.99,
    duration: "3:12",
    waveform: [10, 25, 15, 35, 20, 45, 15, 30, 25, 15],
    description: "Atmospheric synth pad with long release",
    tags: ["synth", "pad", "ambient"],
    audioUrl: "/samples/synth-pad.wav"
  },
  {
    id: 5,
    title: "Vocal Sample",
    category: "Vocals",
    price: 6.99,
    duration: "1:23",
    waveform: [25, 50, 35, 70, 45, 80, 40, 65, 55, 30],
    description: "Clean vocal sample with harmonies",
    tags: ["vocals", "harmony", "pop"],
    audioUrl: "/samples/vocal-sample.wav"
  },
  {
    id: 6,
    title: "FX Sweep",
    category: "Effects",
    price: 1.99,
    duration: "0:45",
    waveform: [5, 15, 10, 25, 15, 35, 10, 20, 15, 8],
    description: "Cinematic sweep effect",
    tags: ["fx", "sweep", "cinematic"],
    audioUrl: "/samples/fx-sweep.wav"
  }
]

const categories = [
  { name: "All", icon: Music },
  { name: "Bass", icon: Volume2 },
  { name: "Drums", icon: Headphones },
  { name: "Guitar", icon: Music },
  { name: "Synth", icon: Volume2 },
  { name: "Vocals", icon: Music },
  { name: "Effects", icon: Headphones }
]

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isPlaying, setIsPlaying] = useState<number | null>(null)
  const { addToCart } = useCartStore()

  const filteredProducts = sampleProducts.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const handlePlay = (productId: number) => {
    setIsPlaying(isPlaying === productId ? null : productId)
  }

  const handleAddToCart = (product: any) => {
    addToCart(product)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
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
              Discover Premium
              <span className="text-gradient block">Audio Files</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              High-quality .wav files for producers, musicians, and content creators. 
              Professional sound effects, music loops, and audio samples.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary text-lg px-8 py-4">
                <Music className="inline mr-2" />
                Browse Collection
              </button>
              <button className="btn-secondary text-lg px-8 py-4">
                <Headphones className="inline mr-2" />
                Listen to Samples
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search audio files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    selectedCategory === category.name
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  {category.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProductCard
                product={product}
                isPlaying={isPlaying === product.id}
                onPlay={() => handlePlay(product.id)}
                onAddToCart={() => handleAddToCart(product)}
              />
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Music className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No audio files found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose WavVault?
            </h2>
            <p className="text-xl text-gray-600">
              Professional quality audio files for every project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Instant Download</h3>
              <p className="text-gray-600">Get your audio files immediately after purchase</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-secondary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">All files are professionally produced and mastered</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Preview Before Buy</h3>
              <p className="text-gray-600">Listen to samples before making your purchase</p>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}