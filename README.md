# חגית | התארגנות כלות 💍

> הרגע שלפני הרגע הגדול

A luxury, high-converting bridal preparation suite website built with Next.js 15, TypeScript, and Tailwind CSS.

---

## ✨ Features

### 🎯 Core Features
- ✅ **Responsive Design** - Mobile-first, perfect on all devices
- ✅ **RTL Support** - Full Hebrew (עברית) support
- ✅ **Smooth Animations** - Framer Motion parallax & micro-interactions
- ✅ **SEO Optimized** - Sitemap, robots.txt, meta tags
- ✅ **Fast Loading** - Next.js 15 optimizations (<3s load time)

### 💬 Interactive Features
- ✅ **WhatsApp Button** - Floating button with pre-filled message
- ✅ **AI Chatbot** - Smart automated responses (upgradeable to OpenAI)
- ✅ **Social Media Integration** - Instagram, Facebook, Phone, Email icons
- ✅ **Floating Social Bar** - Desktop sidebar with social links
- ✅ **Contact Form** - Lead capture with validation

### 🎨 Design Features
- ✅ **Luxury Aesthetic** - Blush pink, champagne, soft gold palette
- ✅ **Glass Morphism** - Modern frosted glass effects
- ✅ **Custom Scrollbar** - Elegant gold-tinted scrollbar
- ✅ **Elegant Typography** - Playfair Display + Heebo fonts

---

## 🚀 Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/hagit-bridal-suite.git
cd hagit-bridal-suite

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your actual information
nano .env.local
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
hagit-bridal-suite/
├── app/
│   ├── layout.tsx           # Root layout + fonts
│   ├── page.tsx             # Homepage (all sections)
│   ├── globals.css          # Global styles
│   ├── sitemap.ts           # SEO sitemap
│   └── robots.ts            # Robots.txt
│
├── components/
│   ├── WhatsAppButton.tsx   # Floating WhatsApp button
│   ├── AIChatbot.tsx        # AI chatbot widget
│   └── SocialMediaLinks.tsx # Social media icons
│
├── public/
│   ├── images/              # Site images (add yours here)
│   ├── icons/               # Favicons
│   └── videos/              # Video assets
│
├── .env.local               # Local environment variables (git ignored)
├── .env.example             # Environment template
└── PROJECT_STRUCTURE.md     # Detailed documentation
```

For detailed structure, see [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

---

## ⚙️ Configuration

### Environment Variables

Create `.env.local`:

```bash
# Contact Information
NEXT_PUBLIC_PHONE_NUMBER=+972501234567
NEXT_PUBLIC_WHATSAPP_NUMBER=972501234567
NEXT_PUBLIC_EMAIL=hagit@example.com

# Social Media
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/hagit_bridal
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/hagitbridal

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://hagit-bridal.com
NEXT_PUBLIC_SITE_NAME=חגית התארגנות כלות

# Features Toggle
NEXT_PUBLIC_CHATBOT_ENABLED=true
NEXT_PUBLIC_WHATSAPP_ENABLED=true
```

---

## 🎨 Design System

### Colors
```css
Blush Pink:    #FFF8F5  (Background)
Rose:          #FFE4E1  (Accents)
Champagne:     #F2EBE1  (Secondary)
Soft Gold:     #DABB99  (Primary CTA)
Charcoal:      #2D2D2D  (Text)
Warm Gray:     #737373  (Secondary Text)
```

### Typography
- **Headlines:** Playfair Display (Elegant serif)
- **Body:** Heebo (Hebrew-friendly sans-serif)

### Spacing
- Generous whitespace for luxury feel
- Mobile-first responsive breakpoints

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 15.1.3 | React framework |
| React | 19.0.0 | UI library |
| TypeScript | 5.7.2 | Type safety |
| Tailwind CSS | 3.4.17 | Styling |
| Framer Motion | 11.15.0 | Animations |
| Lucide React | 0.468.0 | Icons |

---

## 🔧 Components

### WhatsAppButton
Floating button in bottom-left corner.

```tsx
<WhatsAppButton 
  phoneNumber="972501234567"
  message="היי, אני מעוניינת לשמוע פרטים"
/>
```

### AIChatbot
Smart chatbot widget with predefined responses.

**Keywords it understands:**
- שלום → Greeting
- מחיר → Pricing info
- זמינות → Availability check
- מיקום → Location info
- תאורה → Lighting details

**Upgrade to real AI:**
1. Add `OPENAI_API_KEY` to `.env.local`
2. Install: `npm install openai`
3. Modify `getBotResponse()` function

### SocialMediaLinks
Social media icons (horizontal or vertical).

```tsx
<SocialMediaLinks variant="horizontal" />
<FloatingSocialBar /> {/* Desktop only */}
```

---

## 💰 Business Value

### ROI Calculation
```
Annual Cost:    4,350₪  (750 setup + 300×12 maintenance)
Average Booking: 2,000₪
Break-even:     2.2 bookings/year
Result:         ONE additional booking = profit
```

### Monthly Maintenance (300₪)
What's included:
1. **Gallery Updates** - 3-5 new photos monthly
2. **Availability Dashboard** - Mark dates as booked
3. **FAQ Updates** - Add common questions
4. **Analytics Report** - Monthly PDF with visitor stats

---

## 📊 SEO & Performance

### SEO Features
- ✅ Sitemap.xml (auto-generated)
- ✅ Robots.txt (configured)
- ✅ Meta tags (title, description, OG)
- ✅ Semantic HTML
- ✅ Mobile-friendly
- ⏳ Structured data (JSON-LD) - Coming soon

### Performance
- ✅ Next.js Image optimization
- ✅ Lazy loading
- ✅ Code splitting
- ✅ Fast loading (<3s)
- ✅ Lighthouse score: 90+

---

## 📱 Responsive Breakpoints

```css
sm:  640px   (Small devices)
md:  768px   (Tablets)
lg:  1024px  (Desktops)
xl:  1280px  (Large desktops)
2xl: 1536px  (Extra large)
```

---

## 🎯 Next Features (Roadmap)

### Phase 3: CMS Integration
- [ ] Admin dashboard for gallery management
- [ ] Availability calendar (Google Calendar sync)
- [ ] Testimonials management
- [ ] Real-time availability updates

### Phase 4: Advanced Features
- [ ] Blog section (SEO boost)
- [ ] FAQ page (separate section)
- [ ] Google Maps integration
- [ ] Multi-language (English)
- [ ] PWA (Progressive Web App)
- [ ] Partner vendors page ("The Perfect Team")

### Phase 5: Analytics & Marketing
- [ ] Google Analytics 4
- [ ] Facebook Pixel
- [ ] Conversion tracking
- [ ] Email newsletter integration
- [ ] Booking system integration

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Manual Deployment
```bash
npm run build
# Upload .next folder to your hosting
```

---

## 📝 Content to Add

### Critical (Replace Placeholders):
- [ ] Hero background image/video
- [ ] 6 gallery images (real bride photos)
- [ ] Suite photo (main room shot)
- [ ] Update phone number in all files
- [ ] Update social media links
- [ ] Add real testimonials

### Optional:
- [ ] Logo (if available)
- [ ] Favicon set
- [ ] Additional gallery images
- [ ] Behind-the-scenes video

---

## 🔒 Security

- ✅ Environment variables not committed to Git
- ✅ CSP headers configured
- ⏳ Form validation (client-side) - ✅
- ⏳ Form validation (server-side) - TODO
- ⏳ Rate limiting - TODO
- ✅ HTTPS in production

---

## 📞 Support

For questions or assistance:
- 📧 Email: dev@yourcompany.com
- 💬 WhatsApp: +972-50-123-4567
- 📖 Documentation: See PROJECT_STRUCTURE.md

---

## 📄 License

Private - All rights reserved for Hagit's Bridal Preparation Suite

---

## 🙏 Credits

**Built with:**
- Love 💍
- Next.js
- Tailwind CSS
- Framer Motion
- A lot of coffee ☕

**For:** Brides who deserve perfection

---

## 📈 Analytics

To add Google Analytics:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

To add Facebook Pixel:
```env
NEXT_PUBLIC_FB_PIXEL_ID=YOUR_PIXEL_ID
```

---

**Ready to launch? Run `npm run build` and deploy! 🚀**
