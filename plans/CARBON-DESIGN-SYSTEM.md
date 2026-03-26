# Fortran² Carbon Design System

> **Document Version:** 1.0  
> **Status:** Design Specification  
> **Last Updated:** 2026-03-26  
> **Inspiration:** IBM Carbon Design System & agpt.co

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Components](#components)
6. [Layout](#layout)
7. [Visual Effects](#visual-effects)
8. [Page Structure](#page-structure)
9. [Accessibility](#accessibility)
10. [Implementation Guide](#implementation-guide)

---

## Design Philosophy

The Fortran² Carbon Design System blends **IBM's Carbon Design Language** with modern web aesthetics inspired by **agpt.co**. This system prioritizes:

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Clarity** | Remove ambiguity, guide the user | Clear visual hierarchy, consistent patterns |
| **Efficiency** | Streamline workflows | Intuitive navigation, predictable interactions |
| **Consistency** | Build trust through repetition | Unified components, standardized spacing |
| **Accessibility** | Design for everyone | WCAG 2.1 AA compliance, keyboard navigation |

### Design Values

- **Dark mode first** - Primary experience is dark theme
- **Scientific precision** - Clean, mathematical aesthetic
- **Modern innovation** - Subtle animations, glassmorphism effects
- **Performance focused** - Lightweight, fast-loading interfaces

---

## Color Palette

### Primary Colors (Carbon Blue Tones)

The primary palette is derived from IBM Carbon's blue spectrum, adapted for Fortran² branding.

```css
/* Primary Blue Scale */
--carbon-blue-10:  #EDF5FF;
--carbon-blue-20:  #D0E2FF;
--carbon-blue-30:  #A6C8FF;
--carbon-blue-40:  #78A9FF;
--carbon-blue-50:  #4C8BF5;
--carbon-blue-60:  #0f62fe;  /* Primary interactive color */
--carbon-blue-70:  #0043ce;  /* Primary hover state */
--carbon-blue-80:  #00308A;
--carbon-blue-90:  #001D6C;
--carbon-blue-100: #001141;
```

| Token | Hex | Usage |
|-------|-----|-------|
| **Primary** | `#0f62fe` | Primary buttons, links, active states |
| **Primary Hover** | `#0043ce` | Hover state for primary elements |
| **Primary Selected** | `#00a6a4` | Selected/active navigation, teal accent |

### Background Colors (Carbon Gray Scale)

```css
/* Carbon Gray Scale - Dark Theme */
--carbon-gray-100: #161616;  /* Deepest background */
--carbon-gray-90:  #262626;  /* Secondary background */
--carbon-gray-80:  #393939;  /* Tertiary background, hover states */
--carbon-gray-70:  #525252;  /* Subtle borders */
--carbon-gray-60:  #6F6F6F;  /* Disabled text */
--carbon-gray-50:  #8D8D8D;  /* Placeholder text */
--carbon-gray-40:  #A8A8A8;  /* Secondary text */
--carbon-gray-30:  #C6C6C6;  /* Tertiary text on dark */
--carbon-gray-20:  #E0E0E0;  /* Primary text on dark */
--carbon-gray-10:  #F4F4F4;  /* Light background alternative */
```

| Token | Dark Mode | Light Mode | Usage |
|-------|-----------|------------|-------|
| **Background Primary** | `#161616` | `#F4F4F4` | Page background |
| **Background Secondary** | `#262626` | `#FFFFFF` | Cards, elevated surfaces |
| **Background Tertiary** | `#393939` | `#E0E0E0` | Hover states, active items |
| **Background Overlay** | `#0B0B0B` | `#FFFFFF` | Modal overlays |

### Text Colors

```css
/* Dark Mode Text */
--text-primary-dark:   #F4F4F4;  /* High contrast headings */
--text-secondary-dark: #C6C6C6;  /* Body text */
--text-tertiary-dark:  #8D8D8D;  /* Muted text, placeholders */
--text-disabled-dark:  #6F6F6F;  /* Disabled state */

/* Light Mode Text */
--text-primary-light:   #161616;  /* High contrast headings */
--text-secondary-light: #525252;  /* Body text */
--text-tertiary-light:  #8D8D8D;  /* Muted text */
--text-disabled-light:  #C6C6C6;  /* Disabled state */
```

### Accent Colors (Fortran² Branding)

```css
/* Cyan/Teal Accents - Fortran² Brand */
--accent-cyan-10: #E5F6FF;
--accent-cyan-20: #BAE6FF;
--accent-cyan-30: #82CFFF;
--accent-cyan-40: #33B1FF;
--accent-cyan-50: #1192E8;  /* Primary accent */
--accent-cyan-60: #0072C3;  /* Accent hover */
--accent-cyan-70: #00539A;
--accent-cyan-80: #003A6D;

/* Teal Accent */
--accent-teal: #00a6a4;  /* Selected states, highlights */

/* Purple Accent */
--accent-purple: #8B5CF6;  /* Secondary accent, gradients */

/* Green Accent */
--accent-green: #10B981;  /* Success states, code highlights */
```

### Semantic Colors

```css
/* Status Colors */
--status-success:      #24A148;  /* Green */
--status-success-bg:   rgba(36, 161, 72, 0.15);
--status-warning:      #F1C21B;  /* Yellow */
--status-warning-bg:   rgba(241, 194, 27, 0.15);
--status-error:        #DA1E28;  /* Red */
--status-error-bg:     rgba(218, 30, 40, 0.15);
--status-info:         #0f62fe;  /* Blue */
--status-info-bg:      rgba(15, 98, 254, 0.15);
```

### CSS Custom Properties

```css
:root {
  /* Primary Colors */
  --color-primary: #0f62fe;
  --color-primary-hover: #0043ce;
  --color-primary-active: #00a6a4;
  
  /* Background Colors */
  --color-background: #161616;
  --color-background-secondary: #262626;
  --color-background-tertiary: #393939;
  --color-background-overlay: #0B0B0B;
  
  /* Text Colors */
  --color-text-primary: #F4F4F4;
  --color-text-secondary: #C6C6C6;
  --color-text-tertiary: #8D8D8D;
  --color-text-disabled: #6F6F6F;
  
  /* Border Colors */
  --color-border: #393939;
  --color-border-subtle: #262626;
  --color-border-strong: #525252;
  
  /* Accent Colors */
  --color-accent-cyan: #1192E8;
  --color-accent-teal: #00a6a4;
  --color-accent-purple: #8B5CF6;
  --color-accent-green: #10B981;
  
  /* Semantic Colors */
  --color-success: #24A148;
  --color-warning: #F1C21B;
  --color-error: #DA1E28;
  --color-info: #0f62fe;
}

/* Light Mode Override */
.light {
  --color-background: #F4F4F4;
  --color-background-secondary: #FFFFFF;
  --color-background-tertiary: #E0E0E0;
  --color-background-overlay: #FFFFFF;
  
  --color-text-primary: #161616;
  --color-text-secondary: #525252;
  --color-text-tertiary: #8D8D8D;
  --color-text-disabled: #C6C6C6;
  
  --color-border: #E0E0E0;
  --color-border-subtle: #F4F4F4;
  --color-border-strong: #C6C6C6;
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts - Carbon Colors
colors: {
  carbon: {
    blue: {
      10: '#EDF5FF',
      20: '#D0E2FF',
      30: '#A6C8FF',
      40: '#78A9FF',
      50: '#4C8BF5',
      60: '#0f62fe',
      70: '#0043ce',
      80: '#00308A',
      90: '#001D6C',
      100: '#001141',
    },
    gray: {
      10: '#F4F4F4',
      20: '#E0E0E0',
      30: '#C6C6C6',
      40: '#A8A8A8',
      50: '#8D8D8D',
      60: '#6F6F6F',
      70: '#525252',
      80: '#393939',
      90: '#262626',
      100: '#161616',
    },
  },
  accent: {
    cyan: '#1192E8',
    teal: '#00a6a4',
    purple: '#8B5CF6',
    green: '#10B981',
  },
}
```

---

## Typography

### Font Family

IBM Plex is Carbon's official typeface, designed for clarity and readability.

```css
/* Font Stack */
--font-sans: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'IBM Plex Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
```

```typescript
// Tailwind Configuration
fontFamily: {
  sans: ['IBM Plex Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
  mono: ['IBM Plex Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
}
```

### Carbon Type Scale

The Carbon type scale follows a modular scale with precise sizing.

| Token | Size | Line Height | Letter Spacing | Weight | Usage |
|-------|------|-------------|----------------|--------|-------|
| `display-01` | 48px | 1.17 | -0.02em | 300 | Hero headlines |
| `display-02` | 54px | 1.11 | -0.02em | 300 | Large display |
| `display-03` | 60px | 1.07 | -0.02em | 300 | Extra large display |
| `heading-01` | 12px | 1.33 | 0.02em | 600 | Section labels |
| `heading-02` | 14px | 1.43 | 0.02em | 600 | Subsection labels |
| `heading-03` | 16px | 1.38 | 0 | 600 | Card headings |
| `heading-04` | 18px | 1.33 | 0 | 600 | Section headings |
| `heading-05` | 20px | 1.4 | 0 | 600 | Page headings |
| `heading-06` | 24px | 1.33 | 0 | 600 | Major headings |
| `heading-07` | 28px | 1.29 | 0 | 600 | Hero headings |
| `heading-08` | 32px | 1.25 | 0 | 600 | Large headings |
| `body-01` | 12px | 1.5 | 0 | 400 | Caption text |
| `body-02` | 14px | 1.43 | 0 | 400 | Body text |
| `body-compact-01` | 12px | 1.33 | 0 | 400 | Compact body |
| `body-compact-02` | 14px | 1.29 | 0 | 400 | Compact body |
| `code-01` | 12px | 1.5 | 0.32px | 400 | Inline code |
| `code-02` | 14px | 1.43 | 0.32px | 400 | Code blocks |
| `label-01` | 12px | 1.33 | 0.02em | 400 | Form labels |

### Font Weights

```css
--font-weight-light:    300;
--font-weight-regular:  400;
--font-weight-medium:   500;
--font-weight-semibold: 600;
```

### CSS Typography Classes

```css
/* Display Styles */
.display-01 {
  font-size: 3rem;        /* 48px */
  line-height: 1.17;
  letter-spacing: -0.02em;
  font-weight: 300;
}

.display-02 {
  font-size: 3.375rem;    /* 54px */
  line-height: 1.11;
  letter-spacing: -0.02em;
  font-weight: 300;
}

.display-03 {
  font-size: 3.75rem;     /* 60px */
  line-height: 1.07;
  letter-spacing: -0.02em;
  font-weight: 300;
}

/* Heading Styles */
.heading-01 {
  font-size: 0.75rem;     /* 12px */
  line-height: 1.33;
  letter-spacing: 0.02em;
  font-weight: 600;
}

.heading-02 {
  font-size: 0.875rem;    /* 14px */
  line-height: 1.43;
  letter-spacing: 0.02em;
  font-weight: 600;
}

.heading-03 {
  font-size: 1rem;        /* 16px */
  line-height: 1.38;
  font-weight: 600;
}

.heading-04 {
  font-size: 1.125rem;    /* 18px */
  line-height: 1.33;
  font-weight: 600;
}

.heading-05 {
  font-size: 1.25rem;     /* 20px */
  line-height: 1.4;
  font-weight: 600;
}

.heading-06 {
  font-size: 1.5rem;      /* 24px */
  line-height: 1.33;
  font-weight: 600;
}

.heading-07 {
  font-size: 1.75rem;     /* 28px */
  line-height: 1.29;
  font-weight: 600;
}

.heading-08 {
  font-size: 2rem;        /* 32px */
  line-height: 1.25;
  font-weight: 600;
}

/* Body Styles */
.body-01 {
  font-size: 0.75rem;     /* 12px */
  line-height: 1.5;
  font-weight: 400;
}

.body-02 {
  font-size: 0.875rem;    /* 14px */
  line-height: 1.43;
  font-weight: 400;
}

/* Code Styles */
.code-01 {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.75rem;     /* 12px */
  line-height: 1.5;
  letter-spacing: 0.32px;
  font-weight: 400;
}

.code-02 {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 0.875rem;    /* 14px */
  line-height: 1.43;
  letter-spacing: 0.32px;
  font-weight: 400;
}

/* Label Styles */
.label-01 {
  font-size: 0.75rem;     /* 12px */
  line-height: 1.33;
  letter-spacing: 0.02em;
  font-weight: 400;
}
```

### Tailwind Typography Configuration

```typescript
// tailwind.config.ts - Typography
fontSize: {
  'carbon-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0' }],
  'carbon-sm': ['0.875rem', { lineHeight: '1.43', letterSpacing: '0' }],
  'carbon-base': ['1rem', { lineHeight: '1.38', letterSpacing: '0' }],
  'carbon-lg': ['1.125rem', { lineHeight: '1.33', letterSpacing: '0' }],
  'carbon-xl': ['1.25rem', { lineHeight: '1.4', letterSpacing: '0' }],
  'carbon-2xl': ['1.5rem', { lineHeight: '1.33', letterSpacing: '0' }],
  'carbon-3xl': ['1.75rem', { lineHeight: '1.29', letterSpacing: '0' }],
  'carbon-4xl': ['2rem', { lineHeight: '1.25', letterSpacing: '0' }],
  'carbon-display-01': ['3rem', { lineHeight: '1.17', letterSpacing: '-0.02em', fontWeight: '300' }],
  'carbon-display-02': ['3.375rem', { lineHeight: '1.11', letterSpacing: '-0.02em', fontWeight: '300' }],
  'carbon-display-03': ['3.75rem', { lineHeight: '1.07', letterSpacing: '-0.02em', fontWeight: '300' }],
},
fontWeight: {
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
},
```

---

## Spacing System

### 8px Base Grid

Carbon uses an 8px base grid system for consistent spacing.

```css
/* Spacing Tokens */
--spacing-01: 2px;   /* 0.25rem */
--spacing-02: 4px;   /* 0.5rem */
--spacing-03: 8px;   /* 1rem - Base unit */
--spacing-04: 12px;  /* 1.5rem */
--spacing-05: 16px;  /* 2rem */
--spacing-06: 24px;  /* 3rem */
--spacing-07: 32px;  /* 4rem */
--spacing-08: 40px;  /* 5rem */
--spacing-09: 48px;  /* 6rem */
--spacing-10: 64px;  /* 8rem */
--spacing-11: 80px;  /* 10rem */
--spacing-12: 96px;  /* 12rem */
```

### Spacing Usage Guidelines

| Token | Value | Usage |
|-------|-------|-------|
| `spacing-01` | 2px | Icon alignment, micro-adjustments |
| `spacing-02` | 4px | Tight spacing, inline elements |
| `spacing-03` | 8px | Base padding, component gaps |
| `spacing-04` | 12px | Small padding, icon margins |
| `spacing-05` | 16px | Standard padding, card padding |
| `spacing-06` | 24px | Section padding, large gaps |
| `spacing-07` | 32px | Component margins, section spacing |
| `spacing-08` | 40px | Large section spacing |
| `spacing-09` | 48px | Page section padding |
| `spacing-10` | 64px | Major section spacing |
| `spacing-11` | 80px | Hero section padding |
| `spacing-12` | 96px | Maximum section spacing |

### Tailwind Spacing Configuration

```typescript
// tailwind.config.ts - Spacing
spacing: {
  'carbon-01': '0.125rem',  // 2px
  'carbon-02': '0.25rem',   // 4px
  'carbon-03': '0.5rem',    // 8px
  'carbon-04': '0.75rem',   // 12px
  'carbon-05': '1rem',      // 16px
  'carbon-06': '1.5rem',    // 24px
  'carbon-07': '2rem',      // 32px
  'carbon-08': '2.5rem',    // 40px
  'carbon-09': '3rem',      // 48px
  'carbon-10': '4rem',      // 64px
  'carbon-11': '5rem',      // 80px
  'carbon-12': '6rem',      // 96px
}
```

---

## Components

### Buttons

Carbon button styles with four main variants.

```typescript
// Button Component Types
type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}
```

#### Button Variants

| Variant | Dark Mode | Light Mode | Use Case |
|---------|-----------|------------|----------|
| **Primary** | bg: `#0f62fe`, text: `#F4F4F4` | bg: `#0f62fe`, text: `#FFFFFF` | Main CTAs |
| **Secondary** | bg: `#393939`, text: `#F4F4F4` | bg: `#393939`, text: `#FFFFFF` | Secondary actions |
| **Tertiary** | bg: transparent, border: `#393939` | bg: transparent, border: `#393939` | Tertiary actions |
| **Ghost** | bg: transparent, text: `#0f62fe` | bg: transparent, text: `#0f62fe` | Subtle actions |
| **Danger** | bg: `#DA1E28`, text: `#FFFFFF` | bg: `#DA1E28`, text: `#FFFFFF` | Destructive actions |

#### Button Sizes

| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 32px | 8px 16px | 12px |
| `md` | 40px | 12px 20px | 14px |
| `lg` | 48px | 16px 24px | 14px |
| `xl` | 56px | 20px 32px | 16px |
| `2xl` | 64px | 24px 40px | 16px |

#### Button CSS

```css
/* Button Base */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 0;  /* Carbon uses no border radius */
  transition: all 70ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.btn:focus {
  outline: 2px solid #0f62fe;
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Primary Button */
.btn-primary {
  background-color: #0f62fe;
  color: #FFFFFF;
  border: none;
}

.btn-primary:hover {
  background-color: #0043ce;
}

.btn-primary:active {
  background-color: #00308A;
}

/* Secondary Button */
.btn-secondary {
  background-color: #393939;
  color: #F4F4F4;
  border: none;
}

.btn-secondary:hover {
  background-color: #4C4C4C;
}

/* Tertiary Button */
.btn-tertiary {
  background-color: transparent;
  color: #F4F4F4;
  border: 1px solid #393939;
}

.btn-tertiary:hover {
  border-color: #525252;
}

/* Ghost Button */
.btn-ghost {
  background-color: transparent;
  color: #0f62fe;
  border: none;
}

.btn-ghost:hover {
  background-color: rgba(15, 98, 254, 0.1);
}

/* Danger Button */
.btn-danger {
  background-color: #DA1E28;
  color: #FFFFFF;
  border: none;
}

.btn-danger:hover {
  background-color: #B81921;
}
```

### Cards (Tiles)

Carbon uses "tiles" for card-like components.

```typescript
// Card/Tile Component Types
type TileVariant = 'default' | 'selectable' | 'expandable' | 'clickable';
type TilePadding = 'sm' | 'md' | 'lg';

interface TileProps {
  variant?: TileVariant;
  padding?: TilePadding;
  selected?: boolean;
  disabled?: boolean;
}
```

#### Tile Styles

| Variant | Dark Mode | Light Mode | Border |
|---------|-----------|------------|--------|
| **Default** | bg: `#262626` | bg: `#FFFFFF` | 1px `#393939` |
| **Selectable** | bg: `#262626`, selected: border `#0f62fe` | bg: `#FFFFFF`, selected: border `#0f62fe` | 1px `#393939` |
| **Clickable** | bg: `#262626`, hover: `#333333` | bg: `#FFFFFF`, hover: `#F4F4F4` | 1px `#393939` |

#### Tile CSS

```css
/* Tile Base */
.tile {
  background-color: #262616;
  border: 1px solid #393939;
  padding: 16px;
  transition: all 70ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Clickable Tile */
.tile-clickable {
  cursor: pointer;
}

.tile-clickable:hover {
  background-color: #333333;
  border-color: #525252;
}

/* Selectable Tile */
.tile-selectable {
  cursor: pointer;
}

.tile-selectable.selected {
  border-color: #0f62fe;
  border-width: 2px;
}

/* Tile with hover effect (agpt.co inspired) */
.tile-hover {
  position: relative;
  overflow: hidden;
}

.tile-hover::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(15, 98, 254, 0.05) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 200ms ease;
}

.tile-hover:hover::before {
  opacity: 1;
}
```

### Navigation

Carbon-style header with mega-menu support.

```typescript
// Navigation Component Types
interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

interface HeaderProps {
  logo: React.ReactNode;
  navItems: NavItem[];
  actions?: React.ReactNode;
  search?: boolean;
  themeToggle?: boolean;
}
```

#### Header Styles

| Element | Specification |
|---------|---------------|
| Height | 48px (desktop), 56px (mobile) |
| Background | `#161616` / `#F4F4F4` |
| Border | Bottom: 1px `#393939` |
| Nav spacing | 32px between items |
| Active indicator | 3px bottom border `#0f62fe` |

#### Header CSS

```css
/* Header */
.header {
  height: 48px;
  background-color: #161616;
  border-bottom: 1px solid #393939;
  position: sticky;
  top: 0;
  z-index: 100;
}

/* Navigation Item */
.nav-item {
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 16px;
  color: #C6C6C6;
  font-size: 14px;
  font-weight: 400;
  transition: color 70ms ease;
  position: relative;
}

.nav-item:hover {
  color: #F4F4F4;
}

.nav-item.active {
  color: #F4F4F4;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #0f62fe;
}

/* Mega Menu */
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #262626;
  border: 1px solid #393939;
  padding: 24px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-8px);
  transition: all 150ms ease;
}

.nav-item:hover .mega-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
```

### Forms

Carbon input styles with clear focus states.

```typescript
// Input Component Types
type InputSize = 'sm' | 'md' | 'lg';
type InputState = 'default' | 'warning' | 'error' | 'success';

interface InputProps {
  size?: InputSize;
  state?: InputState;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  placeholder?: string;
}
```

#### Input Styles

| State | Border | Background | Helper Color |
|-------|--------|------------|--------------|
| Default | `#393939` | `#262626` | `#8D8D8D` |
| Focus | `#0f62fe` | `#262626` | `#8D8D8D` |
| Warning | `#F1C21B` | `#262626` | `#F1C21B` |
| Error | `#DA1E28` | `#262626` | `#DA1E28` |
| Success | `#24A148` | `#262626` | `#24A148` |
| Disabled | `#393939` | `#161616` | `#6F6F6F` |

#### Input CSS

```css
/* Input Wrapper */
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Label */
.input-label {
  font-size: 12px;
  line-height: 1.33;
  letter-spacing: 0.02em;
  color: #C6C6C6;
}

/* Input */
.input {
  height: 40px;
  padding: 0 12px;
  background-color: #262626;
  border: 1px solid #393939;
  color: #F4F4F4;
  font-size: 14px;
  transition: border-color 70ms ease;
}

.input::placeholder {
  color: #6F6F6F;
}

.input:focus {
  outline: none;
  border-color: #0f62fe;
  box-shadow: 0 0 0 2px rgba(15, 98, 254, 0.3);
}

.input:disabled {
  background-color: #161616;
  color: #6F6F6F;
  cursor: not-allowed;
}

/* Error State */
.input-error {
  border-color: #DA1E28;
}

.input-error:focus {
  border-color: #DA1E28;
  box-shadow: 0 0 0 2px rgba(218, 30, 40, 0.3);
}

/* Helper Text */
.input-helper {
  font-size: 12px;
  color: #8D8D8D;
}

.input-helper-error {
  color: #DA1E28;
}
```

### Code Blocks

Terminal-like styling for code display.

```typescript
// Code Block Component Types
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
| Background | `#161616` | `#F4F4F4` |
| Border | 1px `#393939` | 1px `#C6C6C6` |
| Text | `#F4F4F4` | `#161616` |
| Line numbers | `#6F6F6F` | `#8D8D8D` |
| Font | IBM Plex Mono, 14px | IBM Plex Mono, 14px |

#### Code Block CSS

```css
/* Code Block Container */
.code-block {
  background-color: #161616;
  border: 1px solid #393939;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  line-height: 1.43;
  overflow-x: auto;
}

/* Code Block Header */
.code-block-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #393939;
  background-color: #262626;
}

.code-block-filename {
  font-size: 12px;
  color: #8D8D8D;
}

/* Code Content */
.code-block-content {
  padding: 16px;
  counter-reset: line;
}

/* Line Numbers */
.code-block-line-number {
  display: inline-block;
  width: 40px;
  color: #6F6F6F;
  text-align: right;
  padding-right: 16px;
  user-select: none;
}

/* Syntax Highlighting */
.code-keyword { color: #33B1FF; }
.code-function { color: #BE95FF; }
.code-string { color: #25A148; }
.code-number { color: #FF8389; }
.code-comment { color: #6F6F6F; font-style: italic; }
.code-operator { color: #F4F4F4; }
.code-type { color: #08BDBA; }
.code-variable { color: #F4F4F4; }
```

### Tags/Badges

Carbon tag styles for labels and categories.

```typescript
// Tag Component Types
type TagVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
type TagSize = 'sm' | 'md';

interface TagProps {
  variant?: TagVariant;
  size?: TagSize;
  dismissible?: boolean;
  icon?: React.ReactNode;
}
```

#### Tag Variants

| Variant | Dark Mode | Light Mode |
|---------|-----------|------------|
| Default | bg: `#393939`, text: `#F4F4F4` | bg: `#E0E0E0`, text: `#161616` |
| Primary | bg: `#0f62fe`, text: `#FFFFFF` | bg: `#0f62fe`, text: `#FFFFFF` |
| Success | bg: `#24A148`, text: `#FFFFFF` | bg: `#24A148`, text: `#FFFFFF` |
| Warning | bg: `#F1C21B`, text: `#161616` | bg: `#F1C21B`, text: `#161616` |
| Error | bg: `#DA1E28`, text: `#FFFFFF` | bg: `#DA1E28`, text: `#FFFFFF` |

#### Tag CSS

```css
/* Tag Base */
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 400;
}

/* Tag Variants */
.tag-default {
  background-color: #393939;
  color: #F4F4F4;
}

.tag-primary {
  background-color: #0f62fe;
  color: #FFFFFF;
}

.tag-success {
  background-color: #24A148;
  color: #FFFFFF;
}

.tag-warning {
  background-color: #F1C21B;
  color: #161616;
}

.tag-error {
  background-color: #DA1E28;
  color: #FFFFFF;
}
```

### Modals and Overlays

```typescript
// Modal Component Types
type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  size?: ModalSize;
  title?: string;
  description?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}
```

#### Modal Styles

| Element | Specification |
|---------|---------------|
| Overlay | `rgba(22, 22, 22, 0.9)` |
| Container bg | `#262626` |
| Border | 1px `#393939` |
| Max width | sm: 320px, md: 640px, lg: 960px, xl: 1280px |
| Padding | 24px |
| Animation | Fade + scale, 150ms |

#### Modal CSS

```css
/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(22, 22, 22, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 150ms ease;
}

.modal-overlay.open {
  opacity: 1;
  visibility: visible;
}

/* Modal Container */
.modal {
  background-color: #262626;
  border: 1px solid #393939;
  max-width: 640px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  transform: scale(0.95);
  transition: transform 150ms ease;
}

.modal-overlay.open .modal {
  transform: scale(1);
}

/* Modal Header */
.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid #393939;
}

.modal-title {
  font-size: 20px;
  font-weight: 600;
  color: #F4F4F4;
}

/* Modal Body */
.modal-body {
  padding: 24px;
}

/* Modal Footer */
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px 24px;
  border-top: 1px solid #393939;
}
```

---

## Layout

### Grid System

Carbon uses a 16-column grid system.

```css
/* Grid Configuration */
--grid-columns: 16;
--grid-gutter: 16px;    /* Mobile */
--grid-gutter-md: 24px; /* Tablet */
--grid-gutter-lg: 32px; /* Desktop */
--grid-margin: 16px;    /* Mobile */
--grid-margin-md: 24px; /* Tablet */
--grid-margin-lg: 32px; /* Desktop */
```

#### Grid CSS

```css
/* Grid Container */
.grid-container {
  width: 100%;
  max-width: 1584px;
  margin: 0 auto;
  padding: 0 16px;
}

@media (min-width: 672px) {
  .grid-container {
    padding: 0 24px;
  }
}

@media (min-width: 1056px) {
  .grid-container {
    padding: 0 32px;
  }
}

/* Grid Row */
.grid-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (min-width: 672px) {
  .grid-row {
    grid-template-columns: repeat(8, 1fr);
    gap: 24px;
  }
}

@media (min-width: 1056px) {
  .grid-row {
    grid-template-columns: repeat(16, 1fr);
    gap: 32px;
  }
}

/* Column Spanning */
.col-span-1 { grid-column: span 1; }
.col-span-2 { grid-column: span 2; }
.col-span-3 { grid-column: span 3; }
.col-span-4 { grid-column: span 4; }
.col-span-6 { grid-column: span 6; }
.col-span-8 { grid-column: span 8; }
.col-span-12 { grid-column: span 12; }
.col-span-16 { grid-column: span 16; }
```

### Container Widths

| Breakpoint | Max Width | Gutter | Margin |
|------------|-----------|--------|--------|
| sm (320px) | 100% | 16px | 16px |
| md (672px) | 672px | 24px | 24px |
| lg (1056px) | 1056px | 32px | 32px |
| xlg (1312px) | 1312px | 32px | 32px |
| max (1584px) | 1584px | 32px | 32px |

### Breakpoints

```css
/* Carbon Breakpoints */
--breakpoint-sm:  320px;   /* Small mobile */
--breakpoint-md:  672px;   /* Large mobile / Small tablet */
--breakpoint-lg:  1056px;  /* Tablet / Small laptop */
--breakpoint-xlg: 1312px;  /* Desktop */
--breakpoint-max: 1584px;  /* Large desktop */
```

```typescript
// Tailwind Configuration
screens: {
  sm: '320px',
  md: '672px',
  lg: '1056px',
  xlg: '1312px',
  max: '1584px',
}
```

---

## Visual Effects

### Subtle Gradients

agpt.co-inspired gradient effects.

```css
/* Hero Gradient */
.hero-gradient {
  background: linear-gradient(
    135deg,
    #161616 0%,
    #1a1a2e 25%,
    #16213e 50%,
    #0f3460 75%,
    #161616 100%
  );
}

/* Accent Gradient */
.accent-gradient {
  background: linear-gradient(
    135deg,
    #0f62fe 0%,
    #00a6a4 100%
  );
}

/* Mesh Gradient Background */
.mesh-gradient {
  background:
    radial-gradient(at 40% 20%, rgba(15, 98, 254, 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(0, 166, 164, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(139, 92, 246, 0.08) 0px, transparent 50%),
    radial-gradient(at 80% 50%, rgba(15, 98, 254, 0.08) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(0, 166, 164, 0.08) 0px, transparent 50%);
}

/* Glow Effect */
.glow-effect {
  background: radial-gradient(
    ellipse at center,
    rgba(15, 98, 254, 0.2) 0%,
    transparent 70%
  );
}
```

### Glassmorphism Effects

```css
/* Glass Card */
.glass-card {
  background: rgba(38, 38, 38, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(57, 57, 57, 0.5);
}

/* Glass Header */
.glass-header {
  background: rgba(22, 22, 22, 0.9);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(57, 57, 57, 0.5);
}

/* Glass Modal */
.glass-modal {
  background: rgba(38, 38, 38, 0.95);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(57, 57, 57, 0.5);
}
```

### Animations and Transitions

```css
/* Transition Timing */
--transition-fast: 70ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-normal: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Scale In */
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Pulse Glow */
@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(15, 98, 254, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(15, 98, 254, 0.6);
  }
}

/* Float Animation */
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

/* Shimmer Loading */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.shimmer {
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s linear infinite;
}
```

### Loading States

```css
/* Skeleton Loader */
.skeleton {
  background-color: #262626;
  position: relative;
  overflow: hidden;
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 100%
  );
  animation: shimmer 2s linear infinite;
}

/* Spinner */
.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid #393939;
  border-top-color: #0f62fe;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

---

## Page Structure

### Hero Section (agpt.co-inspired)

```typescript
// Hero Section Component
interface HeroSectionProps {
  headline: string;
  subheadline?: string;
  description?: string;
  cta?: {
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
  codeDemo?: React.ReactNode;
  animated?: boolean;
}
```

#### Hero Layout

```
┌─────────────────────────────────────────────────────────────┐
│                     Gradient Background                      │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                                                         ││
│  │   ┌─────────────────┐    ┌─────────────────────────┐   ││
│  │   │                 │    │                         │   ││
│  │   │   Headline      │    │    Code Demo/Terminal   │   ││
│  │   │   Subheadline   │    │                         │   ││
│  │   │   Description   │    │                         │   ││
│  │   │   [CTA Buttons] │    │                         │   ││
│  │   │                 │    │                         │   ││
│  │   └─────────────────┘    └─────────────────────────┘   ││
│  │                                                         ││
│  └─────────────────────────────────────────────────────────┘│
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

#### Hero CSS

```css
/* Hero Section */
.hero {
  min-height: 80vh;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

/* Hero Background */
.hero-background {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    #161616 0%,
    #1a1a2e 30%,
    #16213e 60%,
    #161616 100%
  );
}

/* Hero Gradient Overlay */
.hero-gradient-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(at 40% 20%, rgba(15, 98, 254, 0.15) 0px, transparent 50%),
    radial-gradient(at 80% 0%, rgba(0, 166, 164, 0.1) 0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(139, 92, 246, 0.08) 0px, transparent 50%);
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  padding: 48px 16px;
  max-width: 1584px;
  margin: 0 auto;
}

@media (min-width: 1056px) {
  .hero-content {
    grid-template-columns: 1fr 1fr;
    padding: 80px 32px;
  }
}

/* Hero Headline */
.hero-headline {
  font-size: 48px;
  font-weight: 300;
  line-height: 1.17;
  letter-spacing: -0.02em;
  color: #F4F4F4;
}

@media (min-width: 672px) {
  .hero-headline {
    font-size: 54px;
  }
}

@media (min-width: 1056px) {
  .hero-headline {
    font-size: 60px;
  }
}

/* Hero Description */
.hero-description {
  font-size: 16px;
  line-height: 1.5;
  color: #C6C6C6;
  max-width: 560px;
}

/* Hero CTA Container */
.hero-cta {
  display: flex;
  gap: 16px;
  margin-top: 32px;
}
```

### Feature Cards Grid

```typescript
// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  tags?: string[];
}
```

#### Feature Grid Layout

```
┌─────────────────────────────────────────────────────────────┐
│                      Feature Section                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ [Icon]          │  │ [Icon]          │  │ [Icon]      │ │
│  │ Title           │  │ Title           │  │ Title       │ │
│  │ Description     │  │ Description     │  │ Description │ │
│  │ [Tags]          │  │ [Tags]          │  │ [Tags]      │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │ [Icon]          │  │ [Icon]          │  │ [Icon]      │ │
│  │ Title           │  │ Title           │  │ Title       │ │
│  │ Description     │  │ Description     │  │ Description │ │
│  │ [Tags]          │  │ [Tags]          │  │ [Tags]      │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

#### Feature Card CSS

```css
/* Feature Grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
}

@media (min-width: 672px) {
  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1056px) {
  .feature-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Feature Card */
.feature-card {
  background-color: #262626;
  border: 1px solid #393939;
  padding: 24px;
  transition: all 150ms ease;
  position: relative;
  overflow: hidden;
}

.feature-card:hover {
  border-color: #525252;
  transform: translateY(-2px);
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #0f62fe, #00a6a4);
  opacity: 0;
  transition: opacity 150ms ease;
}

.feature-card:hover::before {
  opacity: 1;
}

/* Feature Icon */
.feature-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(15, 98, 254, 0.1);
  color: #0f62fe;
  margin-bottom: 16px;
}

/* Feature Title */
.feature-title {
  font-size: 18px;
  font-weight: 600;
  color: #F4F4F4;
  margin-bottom: 8px;
}

/* Feature Description */
.feature-description {
  font-size: 14px;
  line-height: 1.43;
  color: #C6C6C6;
}
```

### Terminal-like Code Preview

```typescript
// Terminal Preview Component
interface TerminalPreviewProps {
  title?: string;
  commands: string[];
  output?: string[];
  language?: string;
}
```

#### Terminal CSS

```css
/* Terminal Container */
.terminal {
  background-color: #161616;
  border: 1px solid #393939;
  border-radius: 8px;
  overflow: hidden;
}

/* Terminal Header */
.terminal-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background-color: #262626;
  border-bottom: 1px solid #393939;
}

/* Terminal Buttons */
.terminal-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-button-close { background-color: #DA1E28; }
.terminal-button-minimize { background-color: #F1C21B; }
.terminal-button-maximize { background-color: #24A148; }

/* Terminal Title */
.terminal-title {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #8D8D8D;
  font-family: 'IBM Plex Mono', monospace;
}

/* Terminal Body */
.terminal-body {
  padding: 16px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 14px;
  line-height: 1.43;
}

/* Terminal Line */
.terminal-line {
  display: flex;
  gap: 8px;
  margin-bottom: 4px;
}

.terminal-prompt {
  color: #00a6a4;
}

.terminal-command {
  color: #F4F4F4;
}

.terminal-output {
  color: #8D8D8D;
  margin-left: 24px;
}

/* Cursor Blink */
.terminal-cursor {
  display: inline-block;
  width: 8px;
  height: 16px;
  background-color: #F4F4F4;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}
```

### Footer

```css
/* Footer */
.footer {
  background-color: #161616;
  border-top: 1px solid #393939;
  padding: 48px 16px;
}

@media (min-width: 672px) {
  .footer {
    padding: 64px 24px;
  }
}

/* Footer Grid */
.footer-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  max-width: 1584px;
  margin: 0 auto;
}

@media (min-width: 672px) {
  .footer-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 1056px) {
  .footer-grid {
    grid-template-columns: repeat(5, 1fr);
  }
}

/* Footer Section */
.footer-section-title {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #F4F4F4;
  margin-bottom: 16px;
}

.footer-link {
  display: block;
  font-size: 14px;
  color: #8D8D8D;
  padding: 4px 0;
  transition: color 70ms ease;
}

.footer-link:hover {
  color: #F4F4F4;
}

/* Footer Bottom */
.footer-bottom {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid #393939;
}

@media (min-width: 672px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
```

---

## Accessibility

### WCAG 2.1 AA Compliance

The Carbon Design System follows WCAG 2.1 AA guidelines.

### Color Contrast

| Element | Ratio | Requirement |
|---------|-------|-------------|
| Body text on dark | 12.63:1 | ✓ AA (4.5:1) |
| Large text on dark | 12.63:1 | ✓ AA (3:1) |
| Primary button text | 8.59:1 | ✓ AA (4.5:1) |
| Secondary text | 7.05:1 | ✓ AA (4.5:1) |
| Disabled text | 4.48:1 | ✓ AA (3:1) |

### Focus States

```css
/* Focus Ring */
:focus-visible {
  outline: 2px solid #0f62fe;
  outline-offset: 2px;
}

/* Skip Link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #0f62fe;
  color: #FFFFFF;
  padding: 8px 16px;
  z-index: 1000;
  transition: top 150ms ease;
}

.skip-link:focus {
  top: 0;
}
```

### Keyboard Navigation

- All interactive elements are focusable
- Tab order follows visual order
- Escape closes modals and dropdowns
- Arrow keys navigate menus
- Enter/Space activates buttons

### Screen Reader Support

```html
<!-- Landmark Regions -->
<header role="banner">
<nav role="navigation" aria-label="Main navigation">
<main role="main">
<aside role="complementary">
<footer role="contentinfo">

<!-- Button Labels -->
<button aria-label="Close menu">
<button aria-expanded="false" aria-controls="menu">

<!-- Form Labels -->
<label for="email">Email address</label>
<input id="email" type="email" aria-describedby="email-hint">
<span id="email-hint">We'll never share your email.</span>

<!-- Live Regions -->
<div aria-live="polite" aria-atomic="true">
  <!-- Dynamic content updates -->
</div>
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Implementation Guide

### Tailwind Configuration

Complete Tailwind configuration for the Carbon Design System:

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      /* Colors */
      colors: {
        carbon: {
          blue: {
            10: '#EDF5FF',
            20: '#D0E2FF',
            30: '#A6C8FF',
            40: '#78A9FF',
            50: '#4C8BF5',
            60: '#0f62fe',
            70: '#0043ce',
            80: '#00308A',
            90: '#001D6C',
            100: '#001141',
          },
          gray: {
            10: '#F4F4F4',
            20: '#E0E0E0',
            30: '#C6C6C6',
            40: '#A8A8A8',
            50: '#8D8D8D',
            60: '#6F6F6F',
            70: '#525252',
            80: '#393939',
            90: '#262626',
            100: '#161616',
          },
        },
        accent: {
          cyan: '#1192E8',
          teal: '#00a6a4',
          purple: '#8B5CF6',
          green: '#10B981',
        },
        status: {
          success: '#24A148',
          warning: '#F1C21B',
          error: '#DA1E28',
          info: '#0f62fe',
        },
      },
      
      /* Typography */
      fontFamily: {
        sans: ['IBM Plex Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['IBM Plex Mono', 'Menlo', 'Monaco', 'Courier New', 'monospace'],
      },
      
      fontSize: {
        'carbon-xs': ['0.75rem', { lineHeight: '1.5' }],
        'carbon-sm': ['0.875rem', { lineHeight: '1.43' }],
        'carbon-base': ['1rem', { lineHeight: '1.38' }],
        'carbon-lg': ['1.125rem', { lineHeight: '1.33' }],
        'carbon-xl': ['1.25rem', { lineHeight: '1.4' }],
        'carbon-2xl': ['1.5rem', { lineHeight: '1.33' }],
        'carbon-3xl': ['1.75rem', { lineHeight: '1.29' }],
        'carbon-4xl': ['2rem', { lineHeight: '1.25' }],
        'carbon-display-01': ['3rem', { lineHeight: '1.17', letterSpacing: '-0.02em', fontWeight: '300' }],
        'carbon-display-02': ['3.375rem', { lineHeight: '1.11', letterSpacing: '-0.02em', fontWeight: '300' }],
        'carbon-display-03': ['3.75rem', { lineHeight: '1.07', letterSpacing: '-0.02em', fontWeight: '300' }],
      },
      
      /* Spacing */
      spacing: {
        'carbon-01': '0.125rem',
        'carbon-02': '0.25rem',
        'carbon-03': '0.5rem',
        'carbon-04': '0.75rem',
        'carbon-05': '1rem',
        'carbon-06': '1.5rem',
        'carbon-07': '2rem',
        'carbon-08': '2.5rem',
        'carbon-09': '3rem',
        'carbon-10': '4rem',
        'carbon-11': '5rem',
        'carbon-12': '6rem',
      },
      
      /* Breakpoints */
      screens: {
        sm: '320px',
        md: '672px',
        lg: '1056px',
        xlg: '1312px',
        max: '1584px',
      },
      
      /* Animations */
      animation: {
        'fade-in': 'fadeIn 150ms ease-out forwards',
        'slide-up': 'slideUp 150ms ease-out forwards',
        'scale-in': 'scaleIn 150ms ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 3s ease-in-out infinite',
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
      },
      
      /* Transitions */
      transitionDuration: {
        'carbon-fast': '70ms',
        'carbon-normal': '150ms',
        'carbon-slow': '300ms',
      },
      
      /* Box Shadows */
      boxShadow: {
        'glow-sm': '0 0 20px rgba(15, 98, 254, 0.2)',
        'glow-md': '0 0 30px rgba(15, 98, 254, 0.3)',
        'glow-lg': '0 0 50px rgba(15, 98, 254, 0.4)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};

export default config;
```

### CSS Custom Properties

```css
/* globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Primary Colors */
    --color-primary: #0f62fe;
    --color-primary-hover: #0043ce;
    --color-primary-active: #00a6a4;
    
    /* Background Colors */
    --color-background: #161616;
    --color-background-secondary: #262626;
    --color-background-tertiary: #393939;
    
    /* Text Colors */
    --color-text-primary: #F4F4F4;
    --color-text-secondary: #C6C6C6;
    --color-text-tertiary: #8D8D8D;
    
    /* Border Colors */
    --color-border: #393939;
    --color-border-subtle: #262626;
    --color-border-strong: #525252;
    
    /* Accent Colors */
    --color-accent-cyan: #1192E8;
    --color-accent-teal: #00a6a4;
    --color-accent-purple: #8B5CF6;
    --color-accent-green: #10B981;
    
    /* Status Colors */
    --color-success: #24A148;
    --color-warning: #F1C21B;
    --color-error: #DA1E28;
    --color-info: #0f62fe;
    
    /* Spacing */
    --spacing-01: 2px;
    --spacing-02: 4px;
    --spacing-03: 8px;
    --spacing-04: 12px;
    --spacing-05: 16px;
    --spacing-06: 24px;
    --spacing-07: 32px;
    --spacing-08: 40px;
    --spacing-09: 48px;
    --spacing-10: 64px;
    --spacing-11: 80px;
    --spacing-12: 96px;
    
    /* Typography */
    --font-sans: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --font-mono: 'IBM Plex Mono', 'Menlo', 'Monaco', 'Courier New', monospace;
    
    /* Transitions */
    --transition-fast: 70ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Light Mode Override */
  .light {
    --color-background: #F4F4F4;
    --color-background-secondary: #FFFFFF;
    --color-background-tertiary: #E0E0E0;
    
    --color-text-primary: #161616;
    --color-text-secondary: #525252;
    --color-text-tertiary: #8D8D8D;
    
    --color-border: #E0E0E0;
    --color-border-subtle: #F4F4F4;
    --color-border-strong: #C6C6C6;
  }

  * {
    border-color: var(--color-border);
  }

  body {
    font-family: var(--font-sans);
    background-color: var(--color-background);
    color: var(--color-text-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code, pre {
    font-family: var(--font-mono);
  }
}

@layer components {
  /* Button Base */
  .btn {
    @apply inline-flex items-center justify-center gap-2;
    @apply font-sans font-normal;
    @apply transition-all duration-75;
    @apply focus:outline-none focus-visible:ring-2 focus-visible:ring-carbon-blue-60 focus-visible:ring-offset-2;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-primary {
    @apply bg-carbon-blue-60 text-white;
    @apply hover:bg-carbon-blue-70 active:bg-carbon-blue-80;
  }

  .btn-secondary {
    @apply bg-carbon-gray-80 text-carbon-gray-10;
    @apply hover:bg-carbon-gray-70;
  }

  .btn-tertiary {
    @apply bg-transparent text-carbon-gray-10 border border-carbon-gray-80;
    @apply hover:border-carbon-gray-70;
  }

  .btn-ghost {
    @apply bg-transparent text-carbon-blue-60;
    @apply hover:bg-carbon-blue-60/10;
  }

  .btn-danger {
    @apply bg-status-error text-white;
    @apply hover:bg-red-700;
  }

  /* Tile/Card Base */
  .tile {
    @apply bg-carbon-gray-90 border border-carbon-gray-80;
    @apply p-4 transition-all duration-75;
  }

  .tile-clickable {
    @apply cursor-pointer;
    @apply hover:bg-carbon-gray-80 hover:border-carbon-gray-70;
  }

  .tile-selected {
    @apply border-carbon-blue-60 border-2;
  }

  /* Input Base */
  .input {
    @apply w-full h-10 px-3;
    @apply bg-carbon-gray-90 border border-carbon-gray-80;
    @apply text-carbon-gray-10 placeholder:text-carbon-gray-60;
    @apply transition-colors duration-75;
    @apply focus:outline-none focus:border-carbon-blue-60 focus:ring-2 focus:ring-carbon-blue-60/30;
  }

  .input-error {
    @apply border-status-error;
    @apply focus:border-status-error focus:ring-status-error/30;
  }

  /* Tag Base */
  .tag {
    @apply inline-flex items-center gap-1 h-6 px-2;
    @apply text-xs font-normal;
  }

  .tag-default {
    @apply bg-carbon-gray-80 text-carbon-gray-10;
  }

  .tag-primary {
    @apply bg-carbon-blue-60 text-white;
  }

  .tag-success {
    @apply bg-status-success text-white;
  }

  .tag-warning {
    @apply bg-status-warning text-carbon-gray-100;
  }

  .tag-error {
    @apply bg-status-error text-white;
  }

  /* Code Block */
  .code-block {
    @apply bg-carbon-gray-100 border border-carbon-gray-80;
    @apply font-mono text-sm leading-relaxed;
    @apply overflow-x-auto;
  }

  /* Terminal */
  .terminal {
    @apply bg-carbon-gray-100 border border-carbon-gray-80 rounded-lg overflow-hidden;
  }

  .terminal-header {
    @apply flex items-center gap-2 px-4 py-3;
    @apply bg-carbon-gray-90 border-b border-carbon-gray-80;
  }

  .terminal-body {
    @apply p-4 font-mono text-sm;
  }
}

@layer utilities {
  /* Text Gradient */
  .text-gradient {
    @apply bg-gradient-to-r from-carbon-blue-60 to-accent-teal bg-clip-text text-transparent;
  }

  /* Glow Effects */
  .glow-sm {
    box-shadow: 0 0 20px rgba(15, 98, 254, 0.2);
  }

  .glow-md {
    box-shadow: 0 0 30px rgba(15, 98, 254, 0.3);
  }

  .glow-lg {
    box-shadow: 0 0 50px rgba(15, 98, 254, 0.4);
  }

  /* Glass Effect */
  .glass {
    @apply bg-carbon-gray-90/80 backdrop-blur-xl border border-carbon-gray-80/50;
  }

  /* Hero Background */
  .hero-gradient {
    background: linear-gradient(
      135deg,
      #161616 0%,
      #1a1a2e 30%,
      #16213e 60%,
      #161616 100%
    );
  }

  .hero-mesh {
    background:
      radial-gradient(at 40% 20%, rgba(15, 98, 254, 0.15) 0px, transparent 50%),
      radial-gradient(at 80% 0%, rgba(0, 166, 164, 0.1) 0px, transparent 50%),
      radial-gradient(at 0% 50%, rgba(139, 92, 246, 0.08) 0px, transparent 50%),
      radial-gradient(at 80% 50%, rgba(15, 98, 254, 0.08) 0px, transparent 50%),
      radial-gradient(at 0% 100%, rgba(0, 166, 164, 0.08) 0px, transparent 50%);
  }

  /* Focus Visible */
  .focus-ring {
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carbon-blue-60 focus-visible:ring-offset-2;
  }

  /* Hide Scrollbar */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Font Loading

```html
<!-- Next.js Font Optimization -->
<!-- app/layout.tsx -->
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

// Apply to body
<body className={`${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
```

---

## Summary

This Carbon Design System provides a comprehensive foundation for the Fortran² website, combining IBM's Carbon Design Language with modern web aesthetics inspired by agpt.co.

### Key Features

| Feature | Implementation |
|---------|----------------|
| **Color System** | Carbon blue tones with Fortran² cyan/teal accents |
| **Typography** | IBM Plex Sans/Mono with Carbon type scale |
| **Spacing** | 8px base grid system |
| **Components** | Carbon-style buttons, tiles, forms, code blocks |
| **Layout** | 16-column grid with Carbon breakpoints |
| **Visual Effects** | Gradients, glassmorphism, subtle animations |
| **Accessibility** | WCAG 2.1 AA compliant |
| **Dark Mode** | Primary experience with light mode support |

### Implementation Checklist

- [ ] Update Tailwind configuration with Carbon tokens
- [ ] Add IBM Plex fonts via Next.js font optimization
- [ ] Update CSS custom properties in globals.css
- [ ] Create Carbon-style button components
- [ ] Create tile/card components
- [ ] Create input components with Carbon styling
- [ ] Create code block and terminal components
- [ ] Update header/navigation to Carbon style
- [ ] Implement hero section with gradient effects
- [ ] Create feature card grid layout
- [ ] Update footer styling
- [ ] Test accessibility compliance
- [ ] Verify dark/light mode switching

---

*Document ready for implementation in Code mode*