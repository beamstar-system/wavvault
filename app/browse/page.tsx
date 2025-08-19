'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List,
  Sliders,
  Search,
  Clock,
  DollarSign,
  Star
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { useCartStore } from '@/store/cartStore'

// Extended product data
const allProducts = [
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
    downloads: 1247,
    bpm: 128,
    key: "C"
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
    audioUrl: "/samples/acoustic-guitar.wav",
    rating: 4.9,
    downloads: 2156,
    bpm: 120,
    key: "G"
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
    downloads: 3421,
    bpm: 140,
    key: "N/A"
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
    downloads: 892,
    bpm: 90,
    key: "F"
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
    audioUrl: "/samples/vocal-sample.wav",
    rating: 4.9,
    downloads: 1876,
    bpm: 110,
    key: "A"
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
    audioUrl: "/samples/fx-sweep.wav",
    rating: 4.5,
    downloads: 567,
    bpm: 0,
    key: "N/A"
  },
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
    downloads: 1342,
    bpm: 95,
    key: "D"
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
    downloads: 2987,
    bpm: 140,
    key: "N/A"
  },
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
    downloads: 756,
    bpm: 75,
    key: "E"
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
    downloads: 1892,
    bpm: 140,
    key: "F#"
  }
]

const categories = [
  { name: "All", count: allProducts.length },
  { name: "Bass", count: allProducts.filter(p => p.category === "Bass").length },
  { name: "Drums", count: allProducts.filter(p => p.category === "Drums").length },
  { name: "Guitar", count: allProducts.filter(p => p.category === "Guitar").length },
  { name: "Synth", count: allProducts.filter(p => p.category === "Synth").length },
  { name: "Vocals", count: allProducts.filter(p => p.category === "Vocals").length },
  { name: "Effects", count: allProducts.filter(p => p.category === "Effects").length },
  { name: "Piano", count: allProducts.filter(p => p.category === "Piano").length },
  { name: "Strings", count: allProducts.filter(p => p.category === "Strings").length }
]

const sortOptions = [
  { name: "Newest", value: "newest" },
  { name: "Oldest", value: "oldest" },
  { name: "Price: Low to High", value: "price-asc" },
  { name: "Price: High to Low", value: "price-desc" },
  { name: "Most Popular", value: "popular" },
  { name: "Highest Rated", value: "rating" },
  { name: "Duration: Short to Long", value: "duration-asc" },
  { name: "Duration: Long to Short", value: "duration-desc" }
]

export default function BrowsePage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("newest")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 10])
  const [selectedBPM, setSelectedBPM] = useState<string[]>([])
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [isPlaying, setIsPlaying] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const { addToCart } = useCartStore()

  // Filter products
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesBPM = selectedBPM.length === 0 || selectedBPM.includes(product.bpm.toString())
    const matchesKey = selectedKeys.length === 0 || selectedKeys.includes(product.key)
    
    return matchesCategory && matchesSearch && matchesPrice && matchesBPM && matchesKey
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.id - a.id
      case "oldest":
        return a.id - b.id
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "popular":
        return b.downloads - a.downloads
      case "rating":
        return b.rating - a.rating
      case "duration-asc":
        return parseFloat(a.duration.replace(":", ".")) - parseFloat(b.duration.replace(":", "."))
      case "duration-desc":
        return parseFloat(b.duration.replace(":", ".")) - parseFloat(a.duration.replace(":", "."))
      default:
        return 0
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePlay = (productId: number) => {
    setIsPlaying(isPlaying === productId ? null : productId)
  }

  const handleAddToCart = (product: any) => {
    addToCart(product)
  }

  const clearFilters = () => {
    setSelectedCategory("All")
    setSearchQuery("")
    setPriceRange([0, 10])
    setSelectedBPM([])
    setSelectedKeys([])
    setCurrentPage(1)
  }

  const uniqueBPMs = [...new Set(allProducts.map(p => p.bpm).filter(bpm => bpm > 0))]
  const uniqueKeys = [...new Set(allProducts.map(p => p.key).filter(key => key !== "N/A"))]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Audio Files</h1>
          <p className="text-gray-600">
            Discover {allProducts.length} high-quality audio files for your projects
          </p>
        </div>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
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

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === "grid" 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  viewMode === "list" 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-primary flex items-center space-x-2"
            >
              <Sliders className="h-4 w-4" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.5"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseFloat(e.target.value)])}
                    className="w-full"
                  />
                </div>

                {/* BPM Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    BPM
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {uniqueBPMs.map((bpm) => (
                      <button
                        key={bpm}
                        onClick={() => {
                          if (selectedBPM.includes(bpm.toString())) {
                            setSelectedBPM(selectedBPM.filter(b => b !== bpm.toString()))
                          } else {
                            setSelectedBPM([...selectedBPM, bpm.toString()])
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedBPM.includes(bpm.toString())
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {bpm}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Key Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Musical Key
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {uniqueKeys.map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          if (selectedKeys.includes(key)) {
                            setSelectedKeys(selectedKeys.filter(k => k !== key))
                          } else {
                            setSelectedKeys([...selectedKeys, key])
                          }
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedKeys.includes(key)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {key}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={clearFilters}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Clear all filters
                </button>
                <span className="text-sm text-gray-500">
                  {filteredProducts.length} of {allProducts.length} results
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedCategory === category.name
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Products Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product, index) => (
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
        ) : (
          <div className="space-y-4">
            {paginatedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                      <div className="flex items-end justify-between h-12 space-x-1">
                        {product.waveform.slice(0, 8).map((height, i) => (
                          <div
                            key={i}
                            className="bg-primary-300 rounded-sm"
                            style={{ height: `${height}%`, width: '6px' }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {product.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full">
                        {product.category}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {product.duration}
                      </span>
                      <span className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        {product.rating}
                      </span>
                      <span>{product.downloads} downloads</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        ${product.price}
                      </div>
                    </div>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="btn-primary"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-primary-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="mx-auto h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No audio files found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}