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
      /* ========================================
       * CARBON DESIGN SYSTEM - COLOR TOKENS
       * ======================================== */
      colors: {
        // Carbon Blue Scale - Primary interactive colors
        carbon: {
          blue: {
            10: '#EDF5FF',
            20: '#D0E2FF',
            30: '#A6C8FF',
            40: '#78A9FF',
            50: '#4C8BF5',
            60: '#0f62fe',  // Primary interactive color
            70: '#0043ce',  // Primary hover state
            80: '#00308A',
            90: '#001D6C',
            100: '#001141',
          },
          gray: {
            10: '#F4F4F4',   // Light background alternative
            20: '#E0E0E0',   // Primary text on dark
            30: '#C6C6C6',   // Tertiary text on dark
            40: '#A8A8A8',   // Secondary text
            50: '#8D8D8D',   // Placeholder text
            60: '#6F6F6F',   // Disabled text
            70: '#525252',   // Subtle borders
            80: '#393939',   // Tertiary background, hover states
            90: '#262626',   // Secondary background
            100: '#161616',  // Deepest background
          },
        },
        
        // Accent Colors - Fortran² Brand
        accent: {
          cyan: '#1192E8',
          teal: '#00a6a4',   // Selected states, highlights
          purple: '#8B5CF6', // Secondary accent, gradients
          green: '#10B981',  // Success states, code highlights
        },
        
        // Status Colors
        status: {
          success: '#24A148',
          'success-bg': 'rgba(36, 161, 72, 0.15)',
          warning: '#F1C21B',
          'warning-bg': 'rgba(241, 194, 27, 0.15)',
          error: '#DA1E28',
          'error-bg': 'rgba(218, 30, 40, 0.15)',
          info: '#0f62fe',
          'info-bg': 'rgba(15, 98, 254, 0.15)',
        },
        
        // Semantic aliases for common use
        primary: {
          DEFAULT: '#0f62fe',
          hover: '#0043ce',
          active: '#00a6a4',
        },
        
        background: {
          DEFAULT: '#161616',
          secondary: '#262626',
          tertiary: '#393939',
          overlay: '#0B0B0B',
        },
        
        text: {
          primary: '#F4F4F4',
          secondary: '#C6C6C6',
          tertiary: '#8D8D8D',
          disabled: '#6F6F6F',
        },
        
        border: {
          DEFAULT: '#393939',
          subtle: '#262626',
          strong: '#525252',
        },
      },
      
      /* ========================================
       * CARBON TYPOGRAPHY
       * ======================================== */
      fontFamily: {
        sans: ['IBM Plex Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      
      // Carbon Type Scale
      fontSize: {
        // Caption text
        'carbon-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0' }],        // 12px
        // Body text
        'carbon-sm': ['0.875rem', { lineHeight: '1.43', letterSpacing: '0' }],      // 14px
        // Card headings
        'carbon-base': ['1rem', { lineHeight: '1.38', letterSpacing: '0' }],        // 16px
        // Section headings
        'carbon-lg': ['1.125rem', { lineHeight: '1.33', letterSpacing: '0' }],      // 18px
        // Page headings
        'carbon-xl': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0' }],        // 20px
        // Major headings
        'carbon-2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '0' }],       // 24px
        // Hero headings
        'carbon-3xl': ['1.75rem', { lineHeight: '1.29', letterSpacing: '0' }],      // 28px
        // Large headings
        'carbon-4xl': ['2rem', { lineHeight: '1.25', letterSpacing: '0' }],         // 32px
        // Display styles
        'carbon-display-01': ['3rem', { lineHeight: '1.17', letterSpacing: '-0.02em', fontWeight: '300' }],      // 48px
        'carbon-display-02': ['3.375rem', { lineHeight: '1.11', letterSpacing: '-0.02em', fontWeight: '300' }],  // 54px
        'carbon-display-03': ['3.75rem', { lineHeight: '1.07', letterSpacing: '-0.02em', fontWeight: '300' }],   // 60px
      },
      
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      
      /* ========================================
       * CARBON SPACING SYSTEM (8px base grid)
       * ======================================== */
      spacing: {
        'carbon-01': '0.125rem',  // 2px  - Icon alignment, micro-adjustments
        'carbon-02': '0.25rem',   // 4px  - Tight spacing, inline elements
        'carbon-03': '0.5rem',    // 8px  - Base padding, component gaps
        'carbon-04': '0.75rem',   // 12px - Small padding, icon margins
        'carbon-05': '1rem',      // 16px - Standard padding, card padding
        'carbon-06': '1.5rem',    // 24px - Section padding, large gaps
        'carbon-07': '2rem',      // 32px - Component margins, section spacing
        'carbon-08': '2.5rem',    // 40px - Large section spacing
        'carbon-09': '3rem',      // 48px - Page section padding
        'carbon-10': '4rem',      // 64px - Major section spacing
        'carbon-11': '5rem',      // 80px - Hero section padding
        'carbon-12': '6rem',      // 96px - Maximum section spacing
      },
      
      /* ========================================
       * CARBON BREAKPOINTS
       * ======================================== */
      screens: {
        sm: '320px',    // Small mobile
        md: '672px',    // Large mobile / Small tablet
        lg: '1056px',   // Tablet / Small laptop
        xlg: '1312px',  // Desktop
        max: '1584px',  // Large desktop
      },
      
      /* ========================================
       * CARBON BORDER RADIUS (Tile styles)
       * ======================================== */
      borderRadius: {
        'none': '0',
        'carbon': '2px',      // Default Carbon tile
        'carbon-lg': '4px',   // Cards, elevated elements
        'carbon-xl': '8px',   // Terminal, modals
      },
      
      /* ========================================
       * CARBON BOX SHADOWS (Elevation tokens)
       * ======================================== */
      boxShadow: {
        // Carbon elevation shadows
        'elevation-1': '0 1px 2px rgba(0, 0, 0, 0.3)',
        'elevation-2': '0 2px 4px rgba(0, 0, 0, 0.3)',
        'elevation-3': '0 4px 8px rgba(0, 0, 0, 0.3)',
        // Glow effects
        'glow-sm': '0 0 20px rgba(15, 98, 254, 0.2)',
        'glow-md': '0 0 30px rgba(15, 98, 254, 0.3)',
        'glow-lg': '0 0 50px rgba(15, 98, 254, 0.4)',
        'glow-cyan': '0 0 30px rgba(17, 146, 232, 0.3)',
        'glow-teal': '0 0 30px rgba(0, 166, 164, 0.3)',
        'glow-purple': '0 0 30px rgba(139, 92, 246, 0.3)',
        'glow-green': '0 0 30px rgba(16, 185, 129, 0.3)',
      },
      
      /* ========================================
       * CARBON ANIMATIONS
       * ======================================== */
      animation: {
        'fade-in': 'fadeIn 150ms ease-out forwards',
        'slide-up': 'slideUp 150ms ease-out forwards',
        'slide-down': 'slideDown 150ms ease-out forwards',
        'scale-in': 'scaleIn 150ms ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
        'spin': 'spin 0.8s linear infinite',
        'blink': 'blink 1s step-end infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(15, 98, 254, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(15, 98, 254, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      
      /* ========================================
       * CARBON TRANSITIONS
       * ======================================== */
      transitionDuration: {
        'carbon-fast': '70ms',
        'carbon-normal': '150ms',
        'carbon-slow': '300ms',
      },
      
      transitionTimingFunction: {
        'carbon': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      /* ========================================
       * CARBON BACKGROUNDS
       * ======================================== */
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        // Hero gradient
        'hero-gradient': 'linear-gradient(135deg, #161616 0%, #1a1a2e 30%, #16213e 60%, #161616 100%)',
        // Accent gradient
        'accent-gradient': 'linear-gradient(135deg, #0f62fe 0%, #00a6a4 100%)',
        // Mesh gradient background
        'mesh-gradient': 'radial-gradient(at 40% 20%, rgba(15, 98, 254, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(0, 166, 164, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(139, 92, 246, 0.08) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(15, 98, 254, 0.08) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(0, 166, 164, 0.08) 0px, transparent 50%)',
        // Glow effect
        'glow-gradient': 'radial-gradient(ellipse at center, rgba(15, 98, 254, 0.2) 0%, transparent 70%)',
      },
      
      /* ========================================
       * CARBON CONTAINER
       * ======================================== */
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',    // 16px mobile
          md: '1.5rem',       // 24px tablet
          lg: '2rem',         // 32px desktop
        },
        screens: {
          sm: '320px',
          md: '672px',
          lg: '1056px',
          xlg: '1312px',
          max: '1584px',
        },
      },
      
      /* ========================================
       * CARBON Z-INDEX
       * ======================================== */
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
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
