# חגית - התארגנות כלות | Luxury Bridal Suite Website

A high-end, conversion-focused website for Hagit's bridal preparation suite business. Built with Next.js 15, featuring a soft feminine luxury aesthetic with editorial magazine influences.

## 🎨 Design Philosophy

**Aesthetic Direction:** Soft Feminine Luxury × Editorial Elegance

- **Typography:** Crimson Pro (serif headlines) + Montserrat (clean body text)
- **Color Palette:** Warm ivory, blush pink, dusty rose, champagne gold
- **Motion:** Gentle fade-ups, floating elements, shimmer effects
- **Tone:** Intimate, personal, calming yet luxurious

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS (Mobile-first)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Crimson Pro + Montserrat (Google Fonts)

## 📦 Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📋 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with fonts & metadata
│   ├── page.tsx            # Homepage (assembles all sections)
│   └── globals.css         # Global styles, utilities, animations
├── components/
│   ├── Hero.tsx            # Hero section with main CTA
│   ├── About.tsx           # "Why choose me" with features
│   ├── Gallery.tsx         # Image gallery (masonry grid)
│   ├── Testimonials.tsx    # Client reviews & social proof
│   ├── Contact.tsx         # Contact form + WhatsApp CTA
│   └── Footer.tsx          # Footer with social links
└── public/                 # Static assets (add images here)
```

## 🎯 Key Features

1. **Hero Section** - Emotional headline with personal touch
2. **About Section** - 4 value propositions + personal story
3. **Gallery** - Masonry grid with hover effects
4. **Testimonials** - Social proof with stats
5. **Contact Form** - WhatsApp integration
6. **Footer** - Social links & branding

## 🔧 Customization Guide

### Update Contact Information
**File:** `components/Contact.tsx`
- Line 78: WhatsApp number
- Lines 84-104: Contact methods

### Add Real Images
1. Add images to `/public/` folder
2. Update `components/Gallery.tsx` with actual image paths

### Modify Colors
**File:** `app/globals.css` (lines 6-12)
```css
:root {
  --color-ivory: 255 248 240;
  /* Change RGB values */
}
```

## 💼 Business Value - The 300₪/month Justification

**Monthly Maintenance Includes:**
- ✅ Gallery updates (3-5 new photos)
- ✅ Availability calendar updates
- ✅ FAQ additions
- ✅ Monthly analytics report
- ✅ Technical support

**ROI:**
- Annual cost: 4,350₪
- Average booking: 2,000₪
- Breakeven: 3 bookings/year
- Realistic: 10-20 bookings = 20,000-40,000₪ revenue

## 📱 Mobile-First

Responsive breakpoints:
- Mobile: < 640px
- Tablet: 640-1024px
- Desktop: > 1024px

## 🚀 Deployment

```bash
npm run build
npm start
```

Or deploy to Vercel for automatic deployments.

## 📝 Pre-Launch Checklist

- [ ] Update all contact info
- [ ] Add real venue photos
- [ ] Write authentic testimonials
- [ ] Update availability
- [ ] Set up WhatsApp Business
- [ ] Create Instagram account

---

**Built with ❤️ for brides who deserve a calm, luxurious start to their special day**
