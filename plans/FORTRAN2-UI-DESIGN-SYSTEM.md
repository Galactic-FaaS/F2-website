# Fortran² Official Website - UI/UX Design System

> **Document Version:** 1.0  
> **Status:** Design Specification  
> **Last Updated:** 2026-03-13

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Visual Identity & Branding](#visual-identity--branding)
3. [Color System](#color-system)
4. [Typography System](#typography-system)
5. [Component Design System](#component-design-system)
6. [Layout & Spacing](#layout--spacing)
7. [Animation & Interaction](#animation--interaction)
8. [Special Elements](#special-elements)
9. [Tailwind CSS Configuration](#tailwind-css-configuration)

---

## Design Philosophy

The Fortran² website embodies the intersection of **scientific precision** and **modern innovation**. The design reflects the language's position as a cutting-edge tool for computational science while maintaining approachability for developers at all levels.

### Core Design Principles

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Precision** | Scientific accuracy in every detail | Clean typography, exact spacing, precise borders |
| **Innovation** | Forward-thinking visual language | Subtle gradients, modern shadows, fluid animations |
| **Performance** | Fast, responsive, efficient | Optimized assets, minimal animations, instant feedback |
| **Trust** | Professional, reliable, authoritative | Consistent patterns, clear hierarchy, accessible design |

### Target Audience

- Scientific researchers and computational scientists
- Software engineers working with numerical computing
- Academic institutions and students
- Data scientists and machine learning practitioners

---

## Visual Identity & Branding

### Logo System

#### Primary Logo
The primary Fortran² logo consists of the word "Fortran" followed by a stylized superscript "²" (squared symbol).

```typescript
// Logo Component Props
interface LogoProps {
  variant: 'full' | 'icon' | 'wordmark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}
```

#### Logo Variants

| Variant | Use Case | Description |
|---------|----------|-------------|
| `full` | Hero sections, main headers | Full logo with icon + wordmark |
| `icon` | Favicon, mobile, small spaces | Square icon with stylized "F²" |
| `wordmark` | Footers, secondary headers | Text-only "Fortran²" |

#### Stylized ² Mark Guidelines

The superscript "²" is the distinctive brand mark:

- **Style**: Bold, slightly taller than standard superscript
- **Color**: Use primary accent color (Electric Cyan `#00D4FF`)
- **Animation**: Subtle glow effect on hover
- **Minimum size**: 16px height
- **Clear space**: 0.25em on all sides

```css
/* ² Mark CSS */
.logo-superscript {
  font-weight: 700;
  color: var(--color-accent-primary);
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
  transition: text-shadow 0.3s ease;
}

.logo-superscript:hover {
  text-shadow: 0 0 30px rgba(0, 212, 255, 0.8);
}
```

### Brand Color Palette

#### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Deep Space** | `#0A0E17` | 10, 14, 23 | Primary dark background |
| **Midnight** | `#111827` | 17, 24, 40 | Secondary dark background |
| **Electric Cyan** | `#00D4FF` | 0, 212, 255 | Primary accent, links, CTAs |
| **Quantum Purple** | `#8B5CF6` | 139, 92, 246 | Secondary accent, gradients |
| **Neon Green** | `#10B981` | 16, 185, 129 | Success states, code highlights |

#### Neutrals

| Name | Dark Mode | Light Mode | Usage |
|------|-----------|------------|-------|
| **Surface Elevated** | `#1E293B` | `#FFFFFF` | Cards, modals |
| **Surface Base** | `#0F172A` | `#F8FAFC` | Page backgrounds |
| **Surface Muted** | `#334155` | `#E2E8F0` | Borders, dividers |
| **Text Primary** | `#F8FAFC` | `#0F172A` | Headings, body |
| **Text Secondary** | `#94A3B8` | `#64748B` | Captions, metadata |
| **Text Muted** | `#64748B` | `#94A3B8` | Placeholders |

---

## Color System

### Dark Mode Palette

```typescript
// Dark Mode Colors
export const darkMode = {
  background: {
    primary: '#0A0E17',     // Deepest background
    secondary: '#111827',   // Cards, elevated surfaces
    tertiary: '#1E293B',    // Hover states, active
  },
  surface: {
    DEFAULT: '#111827',
    elevated: '#1E293B',
    overlay: '#0F172A',
  },
  border: {
    DEFAULT: '#334155',
    muted: '#1E293B',
    emphasis: '#475569',
  },
  content: {
    primary: '#F8FAFC',
    secondary: '#94A3B8',
    tertiary: '#64748B',
    inverse: '#0A0E17',
  },
  accent: {
    primary: '#00D4FF',     // Electric Cyan
    secondary: '#8B5CF6',    // Quantum Purple
    tertiary: '#10B981',   // Neon Green
    warning: '#F59E0B',     // Amber
    error: '#EF4444',       // Red
    info: '#3B82F6',        // Blue
  },
};
```

### Light Mode Palette

```typescript
// Light Mode Colors
export const lightMode = {
  background: {
    primary: '#FFFFFF',
    secondary: '#F8FAFC',
    tertiary: '#F1F5F9',
  },
  surface: {
    DEFAULT: '#FFFFFF',
    elevated: '#FFFFFF',
    overlay: '#F8FAFC',
  },
  border: {
    DEFAULT: '#E2E8F0',
    muted: '#F1F5F9',
    emphasis: '#CBD5E1',
  },
  content: {
    primary: '#0F172A',
    secondary: '#64748B',
    tertiary: '#94A3B8',
    inverse: '#FFFFFF',
  },
  accent: {
    primary: '#0891B2',     // Darker cyan for better contrast
    secondary: '#7C3AED',   // Darker purple
    tertiary: '#059669',   // Darker green
    warning: '#D97706',
    error: '#DC2626',
    info: '#2563EB',
  },
};
```

### Semantic Colors

```typescript
// Semantic Color System
export const semantic = {
  success: {
    light: '#10B981',
    dark: '#34D399',
    bg: {
      light: 'rgba(16, 185, 129, 0.1)',
      dark: 'rgba(52, 211, 153, 0.1)',
    },
  },
  warning: {
    light: '#F59E0B',
    dark: '#FBBF24',
    bg: {
      light: 'rgba(245, 158, 11, 0.1)',
      dark: 'rgba(251, 191, 36, 0.1)',
    },
  },
  error: {
    light: '#EF4444',
    dark: '#F87171',
    bg: {
      light: 'rgba(239, 68, 68, 0.1)',
      dark: 'rgba(248, 113, 113, 0.1)',
    },
  },
  info: {
    light: '#3B82F6',
    dark: '#60A5FA',
    bg: {
      light: 'rgba(59, 130, 246, 0.1)',
      dark: 'rgba(96, 165, 250, 0.1)',
    },
  },
};
```

### Gradient Definitions

```typescript
// Hero & Accent Gradients
export const gradients = {
  hero: {
    // Main hero section background
    primary: 'linear-gradient(135deg, #0A0E17 0%, #1E293B 50%, #0F172A 100%)',
    // Accent glow effect
    glow: 'radial-gradient(ellipse at center, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
    // Animated mesh gradient base
    mesh: 'radial-gradient(at 40% 20%, rgba(0, 212, 255, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(16, 185, 129, 0.08) 0px, transparent 50%)',
  },
  accent: {
    // Primary accent gradient (buttons, links)
    cyan: 'linear-gradient(135deg, #00D4FF 0%, #0891B2 100%)',
    // Purple accent
    purple: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
    // Mixed gradient for special CTAs
    mixed: 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 50%, #10B981 100%)',
    // Code syntax gradient
    code: 'linear-gradient(180deg, rgba(0, 212, 255, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)',
  },
  text: {
    // Gradient text effect
    hero: 'linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)',
    accent: 'linear-gradient(135deg, #00D4FF 0%, #8B5CF6 100%)',
  },
};
```

### Color Usage Guidelines

| Element | Dark Mode | Light Mode |
|---------|-----------|------------|
| Page Background | `#0A0E17` | `#FFFFFF` |
| Card Background | `#111827` | `#FFFFFF` |
| Primary Text | `#F8FAFC` | `#0F172A` |
| Secondary Text | `#94A3B8` | `#64748B` |
| Primary Links | `#00D4FF` | `#0891B2` |
| Borders | `#334155` | `#E2E8F0` |
| Code Background | `#0F172A` | `#F8FAFC` |

---

## Typography System

### Font Family Selection

```typescript
// Font Family Definitions
export const fonts = {
  // Headings - Modern geometric sans-serif
  heading: {
    family: '"Space Grotesk", system-ui, sans-serif',
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  // Body text - Highly readable sans-serif
  body: {
    family: '"Inter", system-ui, sans-serif',
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
  },
  // Code - Monospace with ligatures
  code: {
    family: '"JetBrains Mono", "Fira Code", monospace',
    weights: {
      regular: 400,
      medium: 500,
    },
  },
  // Display - For hero sections
  display: {
    family: '"Space Grotesk", system-ui, sans-serif',
    weights: {
      bold: 700,
      extrabold: 800,
    },
  },
};
```

### Type Scale

```typescript
// Responsive Type Scale
export const typeScale = {
  // Desktop (base)
  h1: {
    fontSize: '3.5rem',      // 56px
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    fontWeight: 700,
  },
  h2: {
    fontSize: '2.5rem',      // 40px
    lineHeight: 1.2,
    letterSpacing: '-0.01em',
    fontWeight: 700,
  },
  h3: {
    fontSize: '2rem',        // 32px
    lineHeight: 1.25,
    letterSpacing: '0',
    fontWeight: 600,
  },
  h4: {
    fontSize: '1.5rem',      // 24px
    lineHeight: 1.3,
    letterSpacing: '0',
    fontWeight: 600,
  },
  h5: {
    fontSize: '1.25rem',     // 20px
    lineHeight: 1.4,
    letterSpacing: '0',
    fontWeight: 600,
  },
  h6: {
    fontSize: '1rem',        // 16px
    lineHeight: 1.5,
    letterSpacing: '0.01em',
    fontWeight: 600,
  },
  body: {
    fontSize: '1rem',        // 16px
    lineHeight: 1.6,
    letterSpacing: '0',
  },
  bodySmall: {
    fontSize: '0.875rem',    // 14px
    lineHeight: 1.5,
    letterSpacing: '0',
  },
  caption: {
    fontSize: '0.75rem',     // 12px
    lineHeight: 1.4,
    letterSpacing: '0.02em',
  },
  code: {
    fontSize: '0.875rem',    // 14px
    lineHeight: 1.7,
    letterSpacing: '0',
  },
  codeSmall: {
    fontSize: '0.8125rem',   // 13px
    lineHeight: 1.6,
    letterSpacing: '0',
  },
};
```

### Responsive Type Utilities

```css
/* Responsive Typography - Tailwind extended */
@layer utilities {
  /* Heading sizes */
  .h1 { @apply text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight; }
  .h2 { @apply text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight; }
  .h3 { @apply text-2xl md:text-3xl lg:text-4xl font-semibold; }
  .h4 { @apply text-xl md:text-2xl lg:text-3xl font-semibold; }
  .h5 { @apply text-lg md:text-xl lg:text-2xl font-semibold; }
  .h6 { @apply text-base md:text-lg lg:text-xl font-semibold; }
  
  /* Body sizes */
  .body-lg { @apply text-lg leading-relaxed; }
  .body { @apply text-base leading-relaxed; }
  .body-sm { @apply text-sm leading-relaxed; }
  .body-xs { @apply text-xs leading-normal; }
  
  /* Code */
  .code { @apply text-sm font-mono leading-relaxed; }
  .code-lg { @apply text-base font-mono leading-relaxed; }
  
  /* Display - Hero text */
  .display-xl { @apply text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter; }
  .display-lg { @apply text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight; }
}
```

### Font Loading Strategy

```html
<!-- Next.js Font Optimization -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link 
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700;800&display=swap" 
  rel="stylesheet" 
/>
```

---

## Component Design System

### Button Component

```typescript
// Button Variants
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}
```

#### Button Styles

| Variant | Dark Mode | Light Mode | Use Case |
|---------|-----------|-------------|----------|
| **Primary** | bg: `#00D4FF`, text: `#0A0E17` | bg: `#0891B2`, text: `#FFFFFF` | Main CTAs |
| **Secondary** | bg: `#1E293B`, border: `#334155` | bg: `#F1F5F9`, border: `#E2E8F0` | Secondary actions |
| **Ghost** | bg: transparent, text: `#94A3B8` | bg: transparent, text: `#64748B` | Tertiary actions |
| **Danger** | bg: `#EF4444`, text: `#FFFFFF` | bg: `#DC2626`, text: `#FFFFFF` | Destructive actions |

#### Button Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 32px | 12px 16px | 13px |
| `md` | 40px | 12px 20px | 14px |
| `lg` | 48px | 16px 28px | 16px |
| `icon` | 40px | 12px | 16px (icon only) |

### Input Component

```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'search' | 'url';
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}
```

#### Input Styles

| State | Dark Mode | Light Mode |
|-------|-----------|------------|
| Default | border: `#334155`, bg: `#111827` | border: `#E2E8F0`, bg: `#FFFFFF` |
| Focus | border: `#00D4FF`, ring: `rgba(0, 212, 255, 0.2)` | border: `#0891B2`, ring: `rgba(8, 145, 178, 0.2)` |
| Error | border: `#EF4444` | border: `#DC2626` |
| Disabled | bg: `#0F172A`, opacity: 0.5 | bg: `#F1F5F9`, opacity: 0.5 |

### Card Component

```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  interactive?: boolean;
}
```

#### Card Variants

| Variant | Dark Mode | Light Mode | Shadow |
|---------|-----------|------------|--------|
| Default | bg: `#111827`, border: `#334155` | bg: `#FFFFFF`, border: `#E2E8F0` | None |
| Elevated | bg: `#1E293B` | bg: `#FFFFFF` | `0 4px 6px -1px rgba(0, 0, 0, 0.1)` |
| Outlined | bg: transparent, border: `#334155` | bg: transparent, border: `#E2E8F0` | None |
| Gradient | bg: gradient mesh | bg: gradient mesh | Subtle glow |

### Navigation Components

#### Header Navigation

```typescript
interface NavItem {
  label: string;
  href: string;
  items?: NavItem[]; // For dropdowns
}

interface HeaderProps {
  navItems: NavItem[];
  logo: React.ReactNode;
  actions?: React.ReactNode;
  themeToggle?: boolean;
  search?: boolean;
}
```

#### Header Styles

| Element | Specification |
|---------|----------------|
| Height | 64px (desktop), 56px (mobile) |
| Background | `#0A0E17` / `#FFFFFF` (with blur) |
| Blur | `backdrop-filter: blur(12px)` |
| Border | Bottom: 1px `#334155` / `#E2E8F0` |
| Logo spacing | 24px from left |
| Nav spacing | 32px between items |
| Actions | 24px from right |

#### Mobile Navigation

| Element | Specification |
|---------|----------------|
| Trigger | Hamburger icon, 24px |
| Menu width | 100% viewport width |
| Animation | Slide from right, 300ms |
| Overlay | `rgba(0, 0, 0, 0.5)` with blur |
| Items | Full-width touch targets, 48px height |

### Code Block Component

```typescript
interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  copyable?: boolean;
  downloadable?: boolean;
}
```

#### Code Block Styles

| Element | Dark Mode | Light Mode |
|---------|-----------|------------|
| Background | `#0F172A` | `#F8FAFC` |
| Border | 1px `#334155` | 1px `#E2E8F0` |
| Border radius | 8px | 8px |
| Padding | 16px | 16px |
| Font | JetBrains Mono, 14px | JetBrains Mono, 14px |
| Line height | 1.7 | 1.7 |
| Line number color | `#64748B` | `#94A3B8` |

#### Syntax Highlighting Theme

```typescript
// Custom Fortran² Syntax Theme
export const syntaxTheme = {
  dark: {
    keyword: '#00D4FF',
    function: '#8B5CF6',
    string: '#10B981',
    number: '#F59E0B',
    comment: '#64748B',
    operator: '#F8FAFC',
    type: '#60A5FA',
    variable: '#F8FAFC',
    property: '#F8FAFC',
  },
  light: {
    keyword: '#0891B2',
    function: '#7C3AED',
    string: '#059669',
    number: '#D97706',
    comment: '#94A3B8',
    operator: '#0F172A',
    type: '#2563EB',
    variable: '#0F172A',
    property: '#0F172A',
  },
};
```

### Badge Component

```typescript
interface BadgeProps {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md';
}
```

#### Badge Variants

| Variant | Dark Mode | Light Mode |
|---------|-----------|------------|
| Default | bg: `#1E293B`, text: `#94A3B8` | bg: `#F1F5F9`, text: `#64748B` |
| Primary | bg: `rgba(0, 212, 255, 0.15)`, text: `#00D4FF` | bg: `rgba(8, 145, 178, 0.1)`, text: `#0891B2` |
| Secondary | bg: `rgba(139, 92, 246, 0.15)`, text: `#8B5CF6` | bg: `rgba(124, 58, 237, 0.1)`, text: `#7C3AED` |
| Success | bg: `rgba(16, 185, 129, 0.15)`, text: `#10B981` | bg: `rgba(5, 150, 105, 0.1)`, text: `#059669` |
| Warning | bg: `rgba(245, 158, 11, 0.15)`, text: `#F59E0B` | bg: `rgba(217, 119, 6, 0.1)`, text: `#D97706` |
| Error | bg: `rgba(239, 68, 68, 0.15)`, text: `#EF4444` | bg: `rgba(220, 38, 38, 0.1)`, text: `#DC2626` |

### Modal Component

```typescript
interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}
```

#### Modal Styles

| Element | Specification |
|---------|----------------|
| Overlay | `rgba(0, 0, 0, 0.7)` with `backdrop-blur(4px)` |
| Container bg | `#111827` / `#FFFFFF` |
| Border | 1px `#334155` / `#E2E8F0` |
| Border radius | 12px |
| Max width | sm: 400px, md: 500px, lg: 700px, xl: 900px |
| Padding | 24px |
| Animation | Scale + fade, 200ms ease-out |

### Tooltip Component

```typescript
interface TooltipProps {
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
  delay?: number;
}
```

#### Tooltip Styles

| Element | Dark Mode | Light Mode |
|---------|-----------|------------|
| Background | `#1E293B` | `#0F172A` |
| Text | `#F8FAFC` | `#FFFFFF` |
| Border radius | 6px |
| Padding | 6px 12px |
| Font size | 13px |
| Arrow size | 6px |
| Delay | 300ms default |

---

## Layout & Spacing

### Spacing Scale

```typescript
// Base 4px spacing scale
export const spacing = {
  0: '0px',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  14: '56px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
};
```

### Container System

```typescript
// Container max-widths
export const containers = {
  sm: '640px',     // Small containers
  md: '768px',     // Medium containers
  lg: '1024px',    // Large containers
  xl: '1280px',    // Extra large
  '2xl': '1400px', // 2X large
  full: '100%',    // Full width
};

// Container padding
export const containerPadding = {
  default: '24px',   // Mobile: 16px
  md: '32px',        // Tablet
  lg: '48px',        // Desktop
};
```

### Grid System

```typescript
// Grid configuration
export const grid = {
  columns: 12,
  gap: {
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
  },
  rowGap: {
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '48px',
  },
};
```

### Responsive Breakpoints

```typescript
// Breakpoint definitions
export const breakpoints = {
  sm: '640px',   // Small tablets
  md: '768px',   // Tablets
  lg: '1024px',  // Laptops
  xl: '1280px',  // Desktops
  '2xl': '1536px', // Large desktops
};

// Usage in Tailwind:
// sm: @media (min-width: 640px)
// md: @media (min-width: 768px)
// lg: @media (min-width: 1024px)
// xl: @media (min-width: 1280px)
// 2xl: @media (min-width: 1536px)
```

### Layout Patterns

#### Page Layout

```typescript
// Standard page layout
const pageLayout = {
  maxWidth: '1280px',
  paddingX: '24px',  // Mobile: 16px
  paddingY: '32px',  // Section spacing
};

// Marketing page section spacing
const sectionSpacing = {
  py: {
    default: '64px',
    md: '96px',
    lg: '128px',
  },
};
```

#### Documentation Layout

```typescript
// Docs layout configuration
const docsLayout = {
  sidebar: {
    width: '280px',       // Desktop
    mobileWidth: '100%',
    collapsible: true,
  },
  content: {
    maxWidth: '800px',
    minWidth: '0',        // Prevent overflow
  },
  toc: {
    width: '240px',       // Desktop only
    sticky: true,
  },
};
```

---

## Animation & Interaction

### Transition Timings

```typescript
// Animation timing functions
export const transitions = {
  // Quick, snappy (buttons, links)
  fast: {
    duration: '150ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  // Normal (cards, modals)
  normal: {
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  // Slow (page transitions)
  slow: {
    duration: '300ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  // Smooth (hover effects)
  smooth: {
    duration: '250ms',
    easing: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  },
  // Spring-like (emphasis)
  spring: {
    duration: '400ms',
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
};
```

### Micro-interactions

| Element | Trigger | Animation |
|---------|---------|-----------|
| Button | Hover | Scale 1.02, shadow increase |
| Button | Active | Scale 0.98 |
| Link | Hover | Underline slide in |
| Card | Hover | Lift shadow, subtle scale |
| Input | Focus | Border color, ring |
| Toggle | Click | Slide with bounce |
| Dropdown | Open | Fade + slide down |
| Modal | Open | Scale + fade in |
| Toast | Enter | Slide from top |

### Loading States

```typescript
// Skeleton loading variants
export const skeletons = {
  // Text placeholder
  text: {
    height: '1em',
    borderRadius: '4px',
    animation: 'pulse 2s ease-in-out infinite',
  },
  // Avatar placeholder
  avatar: {
    size: '40px',
    borderRadius: '50%',
  },
  // Card placeholder
  card: {
    height: '200px',
    borderRadius: '8px',
  },
  // Code block placeholder
  code: {
    height: '100px',
    borderRadius: '8px',
  },
};

// Spinner configuration
export const spinner = {
  size: {
    sm: '16px',
    md: '24px',
    lg: '32px',
  },
  strokeWidth: {
    sm: '2px',
    md: '3px',
    lg: '4px',
  },
  color: '#00D4FF',
};
```

### Page Transitions

```typescript
// Page transition variants
export const pageTransitions = {
  // Fade
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  // Slide up
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 },
  },
  // Scale
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 },
    transition: { duration: 0.2 },
  },
};
```

### Animation Utilities

```css
/* Tailwind Animation Utilities */
@layer utilities {
  /* Fade animations */
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  /* Slide animations */
  .animate-slide-up {
    animation: slideUp 0.3s ease-out forwards;
  }
  
  .animate-slide-down {
    animation: slideDown 0.3s ease-out forwards;
  }
  
  /* Scale animations */
  .animate-scale-in {
    animation: scaleIn 0.2s ease-out forwards;
  }
  
  /* Spin (for spinners) */
  .animate-spin-slow {
    animation: spin 1.5s linear infinite;
  }
  
  /* Pulse glow */
  .animate-pulse-glow {
    animation: pulseGlow 2s ease-in-out infinite;
  }
  
  /* Float (for floating elements) */
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  /* Shimmer (for loading) */
  .animate-shimmer {
    animation: shimmer 2s linear infinite;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%
    );
  }
}

/* Keyframes */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 212, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 212, 255, 0.6); }
}

@keyframes shimmer {
  from { background-position: -200% 0; }
  to { background-position: 200% 0; }
}
```

---

## Special Elements

### Hero Section

```typescript
interface HeroSectionProps {
  headline: string;
  subheadline?: string;
  cta?: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  codeDemo?: boolean;
  background?: 'gradient' | 'mesh' | 'solid';
}
```

#### Hero Design Specifications

| Element | Desktop | Mobile |
|---------|---------|--------|
| Min height | 80vh | 70vh |
| Content max width | 640px | 100% |
| Headline size | 56px | 36px |
| Subheadline size | 20px | 16px |
| Gap between elements | 24px | 16px |
| CTA buttons | Side by side | Stacked |
| Code demo | Right side / below | Below |
| Background | Mesh gradient | Solid color |

#### Hero Background Effects

```css
/* Mesh gradient background */
.hero-background {
  background: 
    radial-gradient(at 40% 20%, rgba(0, 212, 255, 0.12) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.12) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(16, 185, 129, 0.08) 0px, transparent 50%),
    radial-gradient(at 80% 50%, rgba(0, 212, 255, 0.08) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(139, 92, 246, 0.08) 0px, transparent 50%);
}

/* Glow effect overlay */
.hero-glow {
  background: radial-gradient(ellipse at center, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
}
```

### Feature Card

```typescript
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  tags?: string[];
}
```

#### Feature Card Design

| Element | Specification |
|---------|----------------|
| Size | 100% width, auto height |
| Padding | 24px |
| Border | 1px `#334155` / `#E2E8F0` |
| Border radius | 12px |
| Icon size | 48px |
| Icon bg | `rgba(0, 212, 255, 0.1)` |
| Hover effect | Border color change, subtle lift |
| Tags | Horizontal list, badges |

### Code Demo Container

```typescript
interface CodeDemoProps {
  title?: string;
  description?: string;
  code: string;
  language: string;
  output?: string;
  editable?: boolean;
  runnable?: boolean;
}
```

#### Code Demo Specifications

| Element | Specification |
|---------|----------------|
| Container | Split view: editor + output |
| Editor | Monaco or CodeMirror |
| Output | Terminal-style display |
| Toolbar | Run, copy, reset, fullscreen |
| Height | 400px default, resizable |
| Syntax | Fortran² custom theme |

### Documentation Layout

```typescript
interface DocsLayoutProps {
  sidebar: React.ReactNode;
  content: React.ReactNode;
  toc?: React.ReactNode;
}
```

#### Docs Layout Specifications

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Sidebar | 280px fixed | 280px drawer | Hidden |
| Content | Max 800px | 100% | 100% |
| TOC | 240px fixed | Hidden | Hidden |
| Header | Sticky | Sticky | Sticky |

### Download Card

```typescript
interface DownloadCardProps {
  version: string;
  releaseDate: string;
  type: 'stable' | 'beta' | 'nightly';
  platforms: {
    name: string;
    url: string;
    size: string;
  }[];
  changelog?: string;
  highlights?: string[];
}
```

#### Download Card Design

| Element | Specification |
|---------|----------------|
| Version badge | Color-coded by type |
| Platform buttons | Icons + names |
| Size display | Right-aligned |
| Copy checksum | On click |
| Copy url | On click |

---

## Tailwind CSS Configuration

```typescript
// tailwind.config.ts - Complete Design System
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Colors
      colors: {
        // Brand colors
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
        // Surface colors
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
        // Content colors
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
```

---

## Implementation Checklist

### Phase 1: Foundation
- [ ] Configure Tailwind with custom theme
- [ ] Set up CSS variables for theming
- [ ] Implement dark/light mode toggle
- [ ] Create base layout components

### Phase 2: Components
- [ ] Build Button component with variants
- [ ] Build Input component with states
- [ ] Build Card component with variants
- [ ] Build Navigation (Header, Sidebar, Mobile)
- [ ] Build Code Block with syntax highlighting
- [ ] Build Badge, Modal, Tooltip components

### Phase 3: Pages
- [ ] Implement Hero section
- [ ] Create Feature cards grid
- [ ] Build Download cards
- [ ] Design Documentation layout

### Phase 4: Polish
- [ ] Add animations with Framer Motion
- [ ] Implement micro-interactions
- [ ] Create loading states
- [ ] Test responsive behavior
- [ ] Verify accessibility

---

## Summary

This UI/UX design system provides a comprehensive foundation for building the Fortran² official website. The design:

1. **Reflects scientific precision** with clean typography and exact spacing
2. **Embraces modern innovation** through subtle gradients and animations
3. **Ensures accessibility** with proper contrast ratios and semantic HTML
4. **Enables performance** with optimized animations and minimal complexity

The Tailwind CSS configuration is ready to be implemented, with all design tokens properly structured for the Code mode to implement directly.

---

*Document ready for implementation in Code mode*
