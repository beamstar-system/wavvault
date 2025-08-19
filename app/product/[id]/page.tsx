'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Download,
  Star,
  Clock,
  Tag,
  Music,
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  MessageCircle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { useCartStore } from '@/store/cartStore'
import toast from 'react-hot-toast'

// Extended product data with reviews
const productData = {
  1: {
    id: 1,
    title: "Deep House Bass",
    category: "Bass",
    price: 4.99,
    duration: "2:34",
    waveform: [20, 45, 30, 60, 40, 80, 35, 70, 50, 30, 25, 55, 45, 75, 35, 65],
    description: "Powerful deep house bass line with rich harmonics and warm analog character. Perfect for house, techno, and electronic music production. Features a punchy attack and smooth decay that sits perfectly in the mix.",
    longDescription: "This deep house bass sample was crafted using vintage analog synthesizers and carefully processed to deliver that classic warm, punchy sound that defines the genre. The bass line features a rich harmonic content with a tight, controlled low end that won't muddy up your mix. Perfect for creating driving house tracks, atmospheric techno, or any electronic music that needs a solid foundation. The sample includes multiple variations and can be easily transposed to fit any key.",
    tags: ["house", "bass", "electronic", "analog", "warm", "punchy"],
    audioUrl: "/samples/deep-house-bass.wav",
    rating: 4.8,
    downloads: 1247,
    bpm: 128,
    key: "C",
    fileSize: "12.4 MB",
    sampleRate: "44.1 kHz",
    bitDepth: "24-bit",
    license: "Commercial",
    reviews: [
      {
        id: 1,
        user: "ProducerMike",
        rating: 5,
        date: "2024-01-15",
        comment: "Amazing bass sound! Perfect for my house tracks. The quality is outstanding and it sits perfectly in the mix."
      },
      {
        id: 2,
        user: "DJSarah",
        rating: 4,
        date: "2024-01-10",
        comment: "Great bass sample, very warm and punchy. Would definitely recommend for electronic music producers."
      },
      {
        id: 3,
        user: "StudioMaster",
        rating: 5,
        date: "2024-01-08",
        comment: "Excellent quality and exactly what I was looking for. The analog character really shines through."
      }
    ]
  }
}

const relatedProducts = [
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
    audioUrl: "/samples/drum-break.wav",
    rating: 4.7,
    downloads: 3421
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
    audioUrl: "/samples/synth-pad.wav",
    rating: 4.6,
    downloads: 892
  }
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.id as string)
  const product = productData[productId as keyof typeof productData]
  
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details')

  const { addToCart } = useCartStore()

  useEffect(() => {
    if (!product) {
      router.push('/browse')
    }
  }, [product, router])

  if (!product) {
    return null
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleAddToCart = () => {
    addToCart(product)
    toast.success(`${product.title} added to cart!`)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast.success(isLiked ? 'Removed from favorites' : 'Added to favorites!')
  }

  const handleShare = () => {
    navigator.share?.({
      title: product.title,
      text: product.description,
      url: window.location.href
    }).catch(() => {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    })
  }

  const averageRating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-primary-600 transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Browse
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Audio Player */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              {/* Audio Player */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePlayPause}
                      className="p-4 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors duration-200"
                    >
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6 ml-1" />
                      )}
                    </button>
                    <div>
                      <div className="text-sm text-gray-500">Preview</div>
                      <div className="text-lg font-semibold">{product.duration}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-20 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                {/* Waveform */}
                <div className="flex items-end justify-between h-20 mb-4 space-x-1">
                  {product.waveform.map((height, index) => (
                    <div
                      key={index}
                      className="bg-primary-300 rounded-sm transition-all duration-300 hover:bg-primary-400"
                      style={{
                        height: `${height}%`,
                        minHeight: '4px',
                        width: '12px'
                      }}
                    />
                  ))}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
              </div>

              {/* Product Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">${product.price}</div>
                  <div className="text-sm text-gray-500">Price</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{product.rating}</div>
                  <div className="text-sm text-gray-500">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{product.downloads}</div>
                  <div className="text-sm text-gray-500">Downloads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{product.bpm}</div>
                  <div className="text-sm text-gray-500">BPM</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="btn-primary flex items-center justify-center space-x-2 flex-1"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleLike}
                  className={`p-3 rounded-lg border transition-colors duration-200 ${
                    isLiked 
                      ? 'border-red-500 text-red-500 bg-red-50' 
                      : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3 border border-gray-300 text-gray-600 rounded-lg hover:border-primary-500 hover:text-primary-600 transition-colors duration-200"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <div className="text-gray-600 leading-relaxed">
                {showFullDescription ? (
                  <div>
                    <p className="mb-4">{product.description}</p>
                    <p>{product.longDescription}</p>
                  </div>
                ) : (
                  <p>{product.description}</p>
                )}
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-primary-600 hover:text-primary-700 font-medium mt-2"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                </button>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Technical Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Category</div>
                  <div className="font-medium">{product.category}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="font-medium">{product.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">BPM</div>
                  <div className="font-medium">{product.bpm}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Key</div>
                  <div className="font-medium">{product.key}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">File Size</div>
                  <div className="font-medium">{product.fileSize}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Sample Rate</div>
                  <div className="font-medium">{product.sampleRate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Bit Depth</div>
                  <div className="font-medium">{product.bitDepth}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">License</div>
                  <div className="font-medium">{product.license}</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'details'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({product.reviews.length})
              </button>
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === 'details' && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="prose prose-gray max-w-none">
                  <p>This high-quality audio sample was professionally recorded and mastered to ensure the best possible sound quality for your productions. The file is delivered in uncompressed WAV format to preserve all the original audio fidelity.</p>
                  <p>Perfect for use in:</p>
                  <ul>
                    <li>House and techno music production</li>
                    <li>Electronic dance music</li>
                    <li>Film and video game soundtracks</li>
                    <li>Podcast intros and outros</li>
                    <li>Commercial advertising</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {/* Review Summary */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
                      <div className="flex items-center justify-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">{product.reviews.length} reviews</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-600">
                        Based on {product.reviews.length} customer reviews
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                {product.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="font-medium text-gray-900">{review.user}</div>
                        <div className="flex items-center mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                product={relatedProduct}
                isPlaying={false}
                onPlay={() => {}}
                onAddToCart={() => addToCart(relatedProduct)}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}