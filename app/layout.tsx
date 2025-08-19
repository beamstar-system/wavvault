import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WavVault - Premium Audio Files',
  description: 'Discover and purchase high-quality .wav audio files for your projects. Professional sound effects, music loops, and audio samples.',
  keywords: 'audio, wav, sound effects, music, samples, digital audio',
  authors: [{ name: 'WavVault' }],
  openGraph: {
    title: 'WavVault - Premium Audio Files',
    description: 'Discover and purchase high-quality .wav audio files for your projects.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  )
}