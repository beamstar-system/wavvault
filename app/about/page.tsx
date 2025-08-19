'use client'

import { motion } from 'framer-motion'
import { 
  Music, 
  Users, 
  Award, 
  Globe, 
  Heart,
  Star,
  Download,
  Headphones,
  Mic,
  Guitar,
  Piano,
  Drum
} from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    bio: "Former music producer with 15+ years in the industry. Passionate about connecting creators with high-quality audio resources.",
    avatar: "/team/alex.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    name: "Sarah Johnson",
    role: "Head of Content",
    bio: "Audio engineer and sound designer. Curates and quality-controls all audio content on the platform.",
    avatar: "/team/sarah.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  },
  {
    name: "Mike Rodriguez",
    role: "Lead Developer",
    bio: "Full-stack developer with expertise in audio streaming and e-commerce platforms.",
    avatar: "/team/mike.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Emma Davis",
    role: "Community Manager",
    bio: "Former music blogger and community builder. Helps creators find the perfect sounds for their projects.",
    avatar: "/team/emma.jpg",
    social: {
      twitter: "#",
      linkedin: "#",
      instagram: "#"
    }
  }
]

const stats = [
  { number: "10,000+", label: "Audio Files", icon: Music },
  { number: "50,000+", label: "Happy Customers", icon: Users },
  { number: "4.9/5", label: "Average Rating", icon: Star },
  { number: "1M+", label: "Downloads", icon: Download }
]

const values = [
  {
    title: "Quality First",
    description: "Every audio file is professionally produced and mastered to the highest standards.",
    icon: Award
  },
  {
    title: "Creator Focused",
    description: "We understand the needs of music producers, content creators, and audio professionals.",
    icon: Heart
  },
  {
    title: "Global Community",
    description: "Connecting creators worldwide through the universal language of music and sound.",
    icon: Globe
  }
]

export default function AboutPage() {
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
              About
              <span className="text-gradient block">WavVault</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              We're passionate about connecting creators with the highest quality audio resources. 
              Our mission is to empower musicians, producers, and content creators worldwide.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                At WavVault, we believe that every creator deserves access to professional-quality audio resources. 
                Whether you're a bedroom producer, a professional studio engineer, or a content creator, 
                we're here to provide the sounds that bring your vision to life.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Founded by music producers for music producers, we understand the challenges of finding 
                the perfect sound. That's why we've built a platform that not only offers high-quality 
                audio files but also provides the tools and community support you need to succeed.
              </p>
              <p className="text-lg text-gray-600">
                From deep house bass lines to orchestral strings, from punchy drum breaks to atmospheric 
                pads, our carefully curated collection spans every genre and style. Each file is 
                professionally produced, mastered, and ready to use in your next project.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why Choose WavVault?</h3>
                <ul className="space-y-4">
                  <li className="flex items-center space-x-3">
                    <Headphones className="h-5 w-5" />
                    <span>Preview before you buy</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Download className="h-5 w-5" />
                    <span>Instant download after purchase</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Star className="h-5 w-5" />
                    <span>Professional quality guaranteed</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <Globe className="h-5 w-5" />
                    <span>Global community of creators</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate people behind WavVault
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  {Object.entries(member.social).map(([platform, url]) => (
                    <a
                      key={platform}
                      href={url}
                      className="text-gray-400 hover:text-primary-600 transition-colors duration-200"
                    >
                      <span className="sr-only">{platform}</span>
                      <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                WavVault was born from frustration. As music producers ourselves, we were tired of 
                spending hours searching for the perfect sound, only to find low-quality samples or 
                expensive subscription services that didn't deliver.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                In 2023, we decided to create the platform we always wanted - a place where creators 
                could find professional-quality audio files without the hassle. We started with a 
                small collection of our own samples and quickly grew into a community of thousands 
                of creators worldwide.
              </p>
              <p className="text-lg text-gray-600">
                Today, WavVault is more than just a marketplace. It's a community of passionate 
                creators supporting each other, sharing knowledge, and pushing the boundaries of 
                what's possible in music and audio production.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-6 rounded-lg">
                  <Mic className="h-8 w-8 text-primary-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Vocals</h3>
                  <p className="text-sm text-gray-600">Professional vocal samples</p>
                </div>
                <div className="bg-gradient-to-br from-secondary-100 to-secondary-200 p-6 rounded-lg">
                  <Guitar className="h-8 w-8 text-secondary-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Guitars</h3>
                  <p className="text-sm text-gray-600">Acoustic & electric loops</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-green-100 to-green-200 p-6 rounded-lg">
                  <Piano className="h-8 w-8 text-green-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Keys</h3>
                  <p className="text-sm text-gray-600">Piano & synth samples</p>
                </div>
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 p-6 rounded-lg">
                  <Drum className="h-8 w-8 text-orange-600 mb-2" />
                  <h3 className="font-semibold text-gray-900">Drums</h3>
                  <p className="text-sm text-gray-600">Punchy drum breaks</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of creators who trust WavVault for their audio needs. 
              Start exploring our collection today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/browse" className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Browse Collection
              </a>
              <a href="/contact" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-colors duration-200">
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}