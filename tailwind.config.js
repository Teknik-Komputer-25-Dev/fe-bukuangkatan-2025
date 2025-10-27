/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand Primary Colors
        brand: {
          orange: '#EE7A13',     // Primary orange
          cream: '#FFFADD',      // Light cream
          red: '#C21807',        // Accent red
          purple: '#B47EDE',     // Secondary purple
          'purple-dark': '#3A0768', // Dark purple
        },
        
        // Semantic Color Aliases
        primary: {
          DEFAULT: '#EE7A13',    // brand-orange
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#EE7A13',        // Main color
          600: '#DC6B05',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        
        secondary: {
          DEFAULT: '#B47EDE',    // brand-purple
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#B47EDE',        // Main color
          600: '#9333EA',
          700: '#7C2D12',
          800: '#6B21A8',
          900: '#581C87',
        },
        
        accent: {
          red: '#C21807',        // brand-red
          cream: '#FFFADD',      // brand-cream
          'purple-dark': '#3A0768', // brand-purple-dark
        },
        
        // Component Specific Colors
        navbar: {
          bg: '#EE7A13',         // Navbar background
          text: '#FFFADD',       // Default navbar text
          'text-hover': '#B47EDE', // Hover text color
          'text-active': '#3A0768', // Active text color
          'bg-active': '#B47EDE',   // Active background
        },
        
        button: {
          primary: '#EE7A13',
          'primary-hover': '#DC6B05',
          secondary: '#B47EDE',
          'secondary-hover': '#9333EA',
          danger: '#C21807',
          'danger-hover': '#991B1B',
        },
        
        surface: {
          cream: '#FFFADD',
          'cream-dark': '#F5F5DC',
        }
      },
      
      // Custom spacing for brand consistency
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      // Custom font sizes
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
      },
      
      // Custom animations for brand
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'subtle-float': {
          '0%': { transform: 'translateX(0px) translateY(0px)', opacity: '0.3' },
          '50%': { transform: 'translateX(-10px) translateY(-5px)', opacity: '0.5' },
          '100%': { transform: 'translateX(0px) translateY(0px)', opacity: '0.3' },
        },
        'brand-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        
        // Purple space animations
        'stars-twinkle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'cosmic-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'aurora-shift': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '33%': { transform: 'rotate(120deg) scale(1.1)' },
          '66%': { transform: 'rotate(240deg) scale(0.9)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'nebula-flow': {
          '0%': { transform: 'translate(0%, 0%) scale(1)' },
          '25%': { transform: 'translate(5%, -2%) scale(1.05)' },
          '50%': { transform: 'translate(-3%, 4%) scale(0.95)' },
          '75%': { transform: 'translate(-5%, -3%) scale(1.02)' },
          '100%': { transform: 'translate(0%, 0%) scale(1)' },
        }
      },
      
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'subtle-float': 'subtle-float 30s linear infinite',
        'brand-pulse': 'brand-pulse 2s ease-in-out infinite',
        
        // Purple space animations
        'stars-twinkle': 'stars-twinkle 3s ease-in-out infinite',
        'cosmic-rotate': 'cosmic-rotate 60s linear infinite',
        'aurora-shift': 'aurora-shift 20s ease-in-out infinite',
        'nebula-flow': 'nebula-flow 40s ease-in-out infinite',
      },
      
      // Custom shadows with brand colors
      boxShadow: {
        'brand': '0 4px 14px 0 rgba(238, 122, 19, 0.25)',
        'brand-lg': '0 10px 25px -3px rgba(238, 122, 19, 0.25), 0 4px 6px -2px rgba(238, 122, 19, 0.05)',
        'purple': '0 4px 14px 0 rgba(180, 126, 222, 0.25)',
        'purple-lg': '0 10px 25px -3px rgba(180, 126, 222, 0.25), 0 4px 6px -2px rgba(180, 126, 222, 0.05)',
      },
      
      // Custom gradients
      backgroundImage: {
        'brand-gradient': 'linear-gradient(45deg, #EE7A13, #B47EDE)',
        'brand-gradient-reverse': 'linear-gradient(45deg, #B47EDE, #EE7A13)',
        'cream-gradient': 'linear-gradient(180deg, #FFFADD, #F5F5DC)',
        
        // Desktop background
        'desktop-bg': "url('/images/Desktop - 8.png')",
        
        // Purple space gradients (inspired by the image)
        'purple-space': 'radial-gradient(ellipse at center, #B47EDE 0%, #8B5CF6 25%, #7C3AED 50%, #6D28D9 75%, #3A0768 100%)',
        'purple-cosmic': 'linear-gradient(135deg, #1E1B4B 0%, #3730A3 20%, #6366F1 40%, #8B5CF6 60%, #A855F7 80%, #B47EDE 100%)',
        'purple-aurora': 'conic-gradient(from 180deg at 50% 50%, #3A0768 0deg, #6D28D9 72deg, #8B5CF6 144deg, #B47EDE 216deg, #C084FC 288deg, #3A0768 360deg)',
        'purple-nebula': 'radial-gradient(circle at 20% 50%, #3A0768 0%, transparent 50%), radial-gradient(circle at 80% 20%, #B47EDE 0%, transparent 50%), radial-gradient(circle at 40% 80%, #8B5CF6 0%, transparent 50%), linear-gradient(135deg, #1E1B4B, #3730A3)',
        
        // Animated background layers
        'purple-stars': 'radial-gradient(2px 2px at 20px 30px, #fff, transparent), radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.5), transparent), radial-gradient(1px 1px at 90px 40px, #fff, transparent), radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.5), transparent), radial-gradient(2px 2px at 160px 30px, #fff, transparent)',
      }
    },
  },
  plugins: [],
}