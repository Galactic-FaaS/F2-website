import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Brand colors
      colors: {
        brand: {
          cyan: {
            DEFAULT: '#00D4FF',
            dark: '#0891B2',
            light: '#67E8F9',
          },
          purple: {
            DEFAULT: '#8B5CF6',
            dark: '#7C3AED',
            light: '#A78BFA',
          },
          green: {
            DEFAULT: '#10B981',
            dark: '#059669',
            light: '#34D399',
          },
        },
        // Surface colors - Dark mode
        surface: {
          dark: {
            primary: '#0A0E17',
            secondary: '#111827',
            tertiary: '#1E293B',
            elevated: '#1E293B',
          },
          light: {
            primary: '#FFFFFF',
            secondary: '#F8FAFC',
            tertiary: '#F1F5F9',
            elevated: '#FFFFFF',
          },
        },
        // Border colors
        border: {
          dark: {
            DEFAULT: '#334155',
            muted: '#1E293B',
            emphasis: '#475569',
          },
          light: {
            DEFAULT: '#E2E8F0',
            muted: '#F1F5F9',
            emphasis: '#CBD5E1',
          },
        },
        // Content colors - Dark mode
        content: {
          dark: {
            primary: '#F8FAFC',
            secondary: '#94A3B8',
            tertiary: '#64748B',
          },
          light: {
            primary: '#0F172A',
            secondary: '#64748B',
            tertiary: '#94A3B8',
          },
        },
        // Deep Space background
        'deep-space': '#0A0E17',
        'midnight': '#111827',
      },
      
      // Typography
      fontFamily: {
        heading: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        code: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      
      // Font sizes (type scale)
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '800' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h1': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['2.25rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['1.5rem', { lineHeight: '1.35', fontWeight: '600' }],
        'h5': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'h6': ['1rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'body-xs': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'code': ['0.875rem', { lineHeight: '1.7', fontWeight: '400' }],
        'code-sm': ['0.8125rem', { lineHeight: '1.6', fontWeight: '400' }],
      },
      
      // Spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Border radius
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      
      // Box shadows
      boxShadow: {
        'glow-sm': '0 0 20px rgba(0, 212, 255, 0.2)',
        'glow-md': '0 0 30px rgba(0, 212, 255, 0.3)',
        'glow-lg': '0 0 50px rgba(0, 212, 255, 0.4)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.3)',
        'glow-green': '0 0 30px rgba(16, 185, 129, 0.3)',
        'inner-glow': 'inset 0 0 20px rgba(0, 212, 255, 0.1)',
      },
      
      // Background images
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(0, 212, 255, 0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.12) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(16, 185, 129, 0.08) 0px, transparent 50%)',
        'gradient-accent': 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 50%, #10B981 100%)',
        'gradient-text': 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 100%)',
        'hero-glow': 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
      },
      
      // Animation
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      
      // Keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      
      // Transition timing
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.0, 0.0, 0.2, 1)',
      },
      
      // Container
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
          xl: '2.5rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1400px',
        },
      },
    },
  },
  
  // Plugins
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

export default config;
