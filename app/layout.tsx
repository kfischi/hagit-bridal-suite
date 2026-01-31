@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Raleway:wght@200;300;400;500;600;700&display=swap');

@layer base {
  :root {
    --background: #FAFAF8;
    --foreground: #1A1A1A;
    --gold: #D4AF37;
    --rose: #F4E4E1;
    --champagne: #F5E6D3;
  }

  html {
    scroll-behavior: smooth;
    overflow-x: hidden;
  }

  body {
    @apply bg-[--background] text-[--foreground];
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: 'Raleway', sans-serif;
    overflow-x: hidden;
  }
}

@layer components {
  /* Selection */
  ::selection {
    background-color: var(--gold);
    color: #fff;
  }

  /* Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, var(--gold), var(--champagne));
    border-radius: 10px;
  }

  /* Typography */
  .font-cormorant {
    font-family: 'Cormorant Garamond', serif;
  }

  .font-raleway {
    font-family: 'Raleway', sans-serif;
  }

  /* Glass Effects */
  .glass {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .glass-dark {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  /* Shadows */
  .shadow-luxury {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08), 0 0 60px rgba(212, 175, 55, 0.1);
  }

  .shadow-gold {
    box-shadow: 0 10px 40px rgba(212, 175, 55, 0.2), 0 0 80px rgba(212, 175, 55, 0.15);
  }

  /* Divider */
  .divider-luxury {
    position: relative;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--gold) 50%, transparent);
  }

  /* Hover Effects */
  .hover-lift {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hover-lift:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  .hover-scale {
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .hover-scale:hover {
    transform: scale(1.05);
  }

  /* Image Overlay */
  .image-overlay {
    position: relative;
    overflow: hidden;
  }

  .image-overlay::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.3) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 1;
  }

  .image-overlay:hover::before {
    opacity: 1;
  }

  .image-overlay img {
    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .image-overlay:hover img {
    transform: scale(1.1);
  }

  /* Gradient Text */
  .gradient-text {
    background: linear-gradient(135deg, #D4AF37 0%, #F5E6D3 50%, #D4AF37 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Luxury Button */
  .btn-luxury {
    position: relative;
    padding: 1rem 2.5rem;
    background: linear-gradient(135deg, var(--gold) 0%, #C9A87C 100%);
    color: white;
    border: none;
    border-radius: 50px;
    font-weight: 500;
    letter-spacing: 1px;
    overflow: hidden;
    transition: all 0.4s ease;
    box-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
  }

  .btn-luxury::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  .btn-luxury:hover::before {
    left: 100%;
  }

  .btn-luxury:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(212, 175, 55, 0.4);
  }
}

@layer utilities {
  /* Animations */
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  .animate-shimmer {
    animation: shimmer 3s linear infinite;
  }
}

/* Focus Styles */
:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 4px;
  border-radius: 4px;
}
