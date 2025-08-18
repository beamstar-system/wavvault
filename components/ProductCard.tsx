'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  Pause, 
  ShoppingCart, 
  Heart, 
  Clock,
  Tag
} from 'lucide-react'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: {
    id: number
    title: string
    category: string
    price: number
    duration: string
    waveform: number[]
    description: string
    tags: string[]
    audioUrl: string
  }
  isPlaying: boolean
  onPlay: () => void
  onAddToCart: () => void
}

export default function ProductCard({ product, isPlaying, onPlay, onAddToCart }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleAddToCart = () => {
    onAddToCart()
    toast.success(`${product.title} added to cart!`)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites!')
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card overflow-hidden"
    >
      {/* Audio Preview Section */}
      <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-medium rounded-full">
              {product.category}
            </span>
            <div className="flex items-center space-x-1 text-gray-500 text-sm">
              <Clock className="h-4 w-4" />
              <span>{product.duration}</span>
            </div>
          </div>
          <button
            onClick={handleLike}
            className={`p-2 rounded-full transition-colors duration-200 ${
              isLiked 
                ? 'text-red-500 bg-red-50' 
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Waveform Visualization */}
        <div className="flex items-end justify-between h-16 mb-4 space-x-1">
          {product.waveform.map((height, index) => (
            <div
              key={index}
              className="bg-primary-300 rounded-sm transition-all duration-300 hover:bg-primary-400"
              style={{
                height: `${height}%`,
                minHeight: '4px',
                width: '8px'
              }}
            />
          ))}
        </div>

        {/* Play Button */}
        <div className="flex justify-center">
          <button
            onClick={onPlay}
            className={`p-4 rounded-full transition-all duration-200 transform hover:scale-110 ${
              isPlaying 
                ? 'bg-secondary-600 text-white' 
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-1" />
            )}
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            ${product.price}
          </div>
          <button
            onClick={handleAddToCart}
            className="btn-primary flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}