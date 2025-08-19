'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Download, 
  Mail, 
  ArrowRight, 
  Home,
  Music,
  Heart,
  Star,
  Share2,
  Copy
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import toast from 'react-hot-toast'

// Mock order data - in real app this would come from the checkout process
const mockOrder = {
  orderId: "WV-2024-001234",
  orderDate: new Date().toLocaleDateString(),
  total: 24.97,
  items: [
    {
      id: 1,
      title: "Deep House Bass",
      category: "Bass",
      price: 4.99,
      downloadUrl: "/downloads/deep-house-bass.wav",
      fileSize: "12.4 MB"
    },
    {
      id: 2,
      title: "Acoustic Guitar Loop",
      category: "Guitar",
      price: 3.99,
      downloadUrl: "/downloads/acoustic-guitar.wav",
      fileSize: "8.7 MB"
    },
    {
      id: 3,
      title: "Drum Break",
      category: "Drums",
      price: 2.99,
      downloadUrl: "/downloads/drum-break.wav",
      fileSize: "5.2 MB"
    },
    {
      id: 4,
      title: "Synth Pad",
      category: "Synth",
      price: 5.99,
      downloadUrl: "/downloads/synth-pad.wav",
      fileSize: "15.8 MB"
    },
    {
      id: 5,
      title: "Vocal Sample",
      category: "Vocals",
      price: 6.99,
      downloadUrl: "/downloads/vocal-sample.wav",
      fileSize: "9.3 MB"
    }
  ]
}

const recommendedProducts = [
  {
    id: 6,
    title: "FX Sweep",
    category: "Effects",
    price: 1.99,
    rating: 4.5,
    downloads: 567
  },
  {
    id: 7,
    title: "Jazz Piano",
    category: "Piano",
    price: 7.99,
    rating: 4.8,
    downloads: 1342
  },
  {
    id: 8,
    title: "Trap Hi-Hats",
    category: "Drums",
    price: 3.49,
    rating: 4.7,
    downloads: 2987
  }
]

export default function SuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [downloadedItems, setDownloadedItems] = useState<Set<number>>(new Set())
  const [isDownloading, setIsDownloading] = useState<number | null>(null)

  const handleDownload = async (item: any) => {
    setIsDownloading(item.id)
    
    // Simulate download process
    setTimeout(() => {
      setDownloadedItems(prev => new Set(prev).add(item.id))
      setIsDownloading(null)
      toast.success(`${item.title} downloaded successfully!`)
    }, 2000)
  }

  const handleDownloadAll = async () => {
    setIsDownloading(-1) // Special ID for "all"
    
    // Simulate downloading all files
    setTimeout(() => {
      const allIds = mockOrder.items.map(item => item.id)
      setDownloadedItems(new Set(allIds))
      setIsDownloading(null)
      toast.success('All files downloaded successfully!')
    }, 3000)
  }

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(mockOrder.orderId)
    toast.success('Order ID copied to clipboard!')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Check out these amazing audio files!',
        text: `I just purchased some great audio files from WavVault. Order: ${mockOrder.orderId}`,
        url: window.location.origin
      })
    } else {
      navigator.clipboard.writeText(window.location.origin)
      toast.success('Website URL copied to clipboard!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You for Your Purchase!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your order has been successfully processed. You can now download your audio files.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>Order ID: {mockOrder.orderId}</span>
            <button
              onClick={handleCopyOrderId}
              className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
            >
              <Copy className="h-4 w-4" />
              <span>Copy</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
                <div className="text-sm text-gray-500">
                  {mockOrder.orderDate}
                </div>
              </div>
              
              <div className="space-y-4">
                {mockOrder.items.map((item, index) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary-100 p-2 rounded-lg">
                        <Music className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-500">{item.category} • {item.fileSize}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">${item.price}</span>
                      {downloadedItems.has(item.id) ? (
                        <div className="flex items-center space-x-1 text-green-600">
                          <CheckCircle className="h-4 w-4" />
                          <span className="text-sm">Downloaded</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDownload(item)}
                          disabled={isDownloading === item.id}
                          className="btn-primary flex items-center space-x-2"
                        >
                          {isDownloading === item.id ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Downloading...</span>
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleDownloadAll}
                  disabled={isDownloading === -1 || downloadedItems.size === mockOrder.items.length}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  {isDownloading === -1 ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Downloading All Files...</span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      <span>Download All Files</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* Next Steps */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">What's Next?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary-100 p-2 rounded-lg">
                    <Mail className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Check Your Email</h3>
                    <p className="text-sm text-gray-600">
                      We've sent you a confirmation email with download links and order details.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Heart className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Start Creating</h3>
                    <p className="text-sm text-gray-600">
                      Import your new audio files into your DAW and start making music!
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <Star className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Leave a Review</h3>
                    <p className="text-sm text-gray-600">
                      Share your experience and help other producers find great sounds.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Share2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Share Your Music</h3>
                    <p className="text-sm text-gray-600">
                      Tag us when you use our samples in your tracks!
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Items:</span>
                    <span>{mockOrder.items.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${(mockOrder.total - 0.99).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Processing Fee:</span>
                    <span>$0.99</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${mockOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* License Information */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">License Information</h3>
                
                <div className="space-y-3 text-sm text-gray-600">
                  <p>✅ Commercial use allowed</p>
                  <p>✅ Royalty-free</p>
                  <p>✅ No attribution required</p>
                  <p>✅ Unlimited projects</p>
                  <p>⚠️ No resale of individual files</p>
                </div>
                
                <button className="w-full mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View Full License
                </button>
              </div>

              {/* Recommended Products */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">You Might Also Like</h3>
                
                <div className="space-y-4">
                  {recommendedProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-3">
                      <div className="bg-gray-100 w-12 h-12 rounded-lg flex items-center justify-center">
                        <Music className="h-5 w-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{product.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{product.category}</span>
                          <span>•</span>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span>{product.rating}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900 text-sm">${product.price}</div>
                        <button className="text-primary-600 hover:text-primary-700 text-xs">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-4 btn-primary">
                  Browse More
                </button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/')}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Continue Shopping</span>
                </button>
                
                <button
                  onClick={handleShare}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share WavVault</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}