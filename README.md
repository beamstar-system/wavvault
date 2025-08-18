# WavVault - Premium Audio Files Marketplace

A modern, responsive website for selling high-quality .wav audio files. Built with Next.js, TypeScript, and Tailwind CSS.

## 🎵 Features

### Core Features
- **Product Catalog**: Browse and search through audio files with categories and tags
- **Audio Preview**: Listen to samples before purchasing with a custom audio player
- **Shopping Cart**: Add items, manage quantities, and proceed to checkout
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Beautiful animations and smooth interactions

### Technical Features
- **Next.js 14**: App Router with TypeScript
- **Tailwind CSS**: Custom design system with audio-themed colors
- **Framer Motion**: Smooth animations and transitions
- **Zustand**: State management for cart functionality
- **React Hot Toast**: User-friendly notifications
- **Lucide React**: Beautiful icons throughout the interface

### Audio Features
- **Waveform Visualization**: Visual representation of audio files
- **Custom Audio Player**: Play/pause, seek, volume control, and skip controls
- **Multiple Audio Formats**: Support for .wav, .mp3, and .ogg files
- **Duration Display**: Show audio length for each file

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd wavvault
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
wavvault/
├── app/                    # Next.js App Router
│   ├── cart/              # Shopping cart page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── AudioPlayer.tsx    # Custom audio player
│   ├── Footer.tsx         # Site footer
│   ├── Header.tsx         # Navigation header
│   └── ProductCard.tsx    # Product display card
├── store/                 # State management
│   └── cartStore.ts       # Shopping cart store
├── public/                # Static assets
│   └── samples/           # Audio sample files
└── package.json           # Dependencies and scripts
```

## 🎨 Customization

### Colors
The design system uses custom colors defined in `tailwind.config.js`:
- **Primary**: Blue gradient for main actions
- **Secondary**: Purple gradient for accents
- **Custom animations**: Wave and pulse effects

### Adding Audio Files
1. Place your .wav files in `public/samples/`
2. Update the `sampleProducts` array in `app/page.tsx`
3. Add waveform data for visualization

### Styling
- Global styles in `app/globals.css`
- Component-specific styles using Tailwind classes
- Custom CSS components for buttons, cards, and audio player

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for production settings:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
```

### Payment Integration
The site is prepared for Stripe integration:
- Cart functionality ready
- Checkout flow implemented
- Payment processing simulation

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🎯 Key Components

### ProductCard
- Audio preview with waveform
- Play/pause functionality
- Add to cart button
- Like/favorite feature
- Category and duration display

### AudioPlayer
- Custom controls with play/pause
- Progress bar with seeking
- Volume control with mute
- Skip forward/backward buttons
- Time display

### Cart System
- Persistent cart state
- Quantity management
- Total calculation
- Checkout process

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms
The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform

## 🔮 Future Enhancements

- [ ] User authentication and accounts
- [ ] Wishlist functionality
- [ ] Advanced search and filters
- [ ] Audio file upload for sellers
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Email notifications
- [ ] Social sharing
- [ ] Reviews and ratings
- [ ] Subscription plans

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: support@wavvault.com
- Documentation: [docs.wavvault.com](https://docs.wavvault.com)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

---

Built with ❤️ for audio creators and producers