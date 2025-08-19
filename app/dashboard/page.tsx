'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, 
  ShoppingBag, 
  Download, 
  Heart, 
  Settings, 
  LogOut,
  Calendar,
  DollarSign,
  Music,
  Star,
  Eye,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import toast from 'react-hot-toast'

// Mock user data
const userData = {
  name: "John Producer",
  email: "john@example.com",
  memberSince: "January 2024",
  totalOrders: 12,
  totalSpent: 156.78,
  favoriteCategories: ["Bass", "Drums", "Synth"]
}

// Mock order history
const orderHistory = [
  {
    id: "WV-2024-001234",
    date: "2024-01-15",
    total: 24.97,
    status: "Completed",
    items: 5,
    downloads: 5
  },
  {
    id: "WV-2024-001198",
    date: "2024-01-10",
    total: 18.99,
    status: "Completed",
    items: 3,
    downloads: 3
  },
  {
    id: "WV-2024-001156",
    date: "2024-01-05",
    total: 32.45,
    status: "Completed",
    items: 4,
    downloads: 4
  },
  {
    id: "WV-2024-001123",
    date: "2023-12-28",
    total: 15.99,
    status: "Completed",
    items: 2,
    downloads: 2
  }
]

// Mock downloads
const downloads = [
  {
    id: 1,
    title: "Deep House Bass",
    category: "Bass",
    downloadDate: "2024-01-15",
    fileSize: "12.4 MB",
    downloadCount: 3
  },
  {
    id: 2,
    title: "Acoustic Guitar Loop",
    category: "Guitar",
    downloadDate: "2024-01-15",
    fileSize: "8.7 MB",
    downloadCount: 2
  },
  {
    id: 3,
    title: "Drum Break",
    category: "Drums",
    downloadDate: "2024-01-10",
    fileSize: "5.2 MB",
    downloadCount: 5
  },
  {
    id: 4,
    title: "Synth Pad",
    category: "Synth",
    downloadDate: "2024-01-10",
    fileSize: "15.8 MB",
    downloadCount: 1
  },
  {
    id: 5,
    title: "Vocal Sample",
    category: "Vocals",
    downloadDate: "2024-01-05",
    fileSize: "9.3 MB",
    downloadCount: 2
  }
]

// Mock favorites
const favorites = [
  {
    id: 6,
    title: "FX Sweep",
    category: "Effects",
    price: 1.99,
    rating: 4.5,
    addedDate: "2024-01-12"
  },
  {
    id: 7,
    title: "Jazz Piano",
    category: "Piano",
    price: 7.99,
    rating: 4.8,
    addedDate: "2024-01-10"
  },
  {
    id: 8,
    title: "Trap Hi-Hats",
    category: "Drums",
    price: 3.49,
    rating: 4.7,
    addedDate: "2024-01-08"
  }
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'downloads' | 'favorites' | 'settings'>('overview')
  const [searchQuery, setSearchQuery] = useState('')

  const handleLogout = () => {
    toast.success('Logged out successfully')
    // In real app, this would clear auth state and redirect
  }

  const handleDownload = (item: any) => {
    toast.success(`${item.title} downloaded successfully!`)
  }

  const handleRemoveFavorite = (item: any) => {
    toast.success(`${item.title} removed from favorites`)
  }

  const filteredDownloads = downloads.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredFavorites = favorites.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userData.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              {/* User Info */}
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {userData.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900">{userData.name}</h3>
                <p className="text-sm text-gray-500">{userData.email}</p>
                <p className="text-xs text-gray-400 mt-1">Member since {userData.memberSince}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'orders', label: 'Orders', icon: ShoppingBag },
                  { id: 'downloads', label: 'Downloads', icon: Download },
                  { id: 'favorites', label: 'Favorites', icon: Heart },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        activeTab === item.id
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  )
                })}
              </nav>

              {/* Logout */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{userData.totalOrders}</p>
                      </div>
                      <div className="bg-primary-100 p-3 rounded-lg">
                        <ShoppingBag className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Total Spent</p>
                        <p className="text-2xl font-bold text-gray-900">${userData.totalSpent}</p>
                      </div>
                      <div className="bg-green-100 p-3 rounded-lg">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Downloads</p>
                        <p className="text-2xl font-bold text-gray-900">{downloads.length}</p>
                      </div>
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Download className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                  
                  <div className="space-y-4">
                    {orderHistory.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <ShoppingBag className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">Order {order.id}</h3>
                            <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-gray-900">${order.total}</div>
                          <div className="text-sm text-green-600">{order.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Favorite Categories */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Favorite Categories</h2>
                  
                  <div className="flex flex-wrap gap-3">
                    {userData.favoriteCategories.map((category) => (
                      <span
                        key={category}
                        className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order History</h2>
                
                <div className="space-y-4">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary-100 p-2 rounded-lg">
                          <ShoppingBag className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{order.id}</h3>
                          <p className="text-sm text-gray-500">{order.date} • {order.items} items</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="font-medium text-gray-900">${order.total}</div>
                          <div className="text-sm text-green-600">{order.status}</div>
                        </div>
                        <button className="text-primary-600 hover:text-primary-700">
                          <ArrowRight className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Downloads Tab */}
            {activeTab === 'downloads' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Downloads</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search downloads..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredDownloads.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary-100 p-2 rounded-lg">
                          <Music className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.category} • {item.fileSize} • Downloaded {item.downloadCount} times</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-500">{item.downloadDate}</span>
                        <button
                          onClick={() => handleDownload(item)}
                          className="btn-primary"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Favorites</h2>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search favorites..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFavorites.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                          {item.category}
                        </span>
                        <button
                          onClick={() => handleRemoveFavorite(item)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Heart className="h-4 w-4 fill-current" />
                        </button>
                      </div>
                      
                      <h3 className="font-medium text-gray-900 mb-2">{item.title}</h3>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600">{item.rating}</span>
                        </div>
                        <span className="font-medium text-gray-900">${item.price}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">Added {item.addedDate}</span>
                        <button className="btn-primary text-sm">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          defaultValue={userData.name}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={userData.email}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-sm text-gray-700">Email notifications for new releases</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-sm text-gray-700">Weekly newsletter</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                        <span className="ml-2 text-sm text-gray-700">Marketing communications</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <button className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}