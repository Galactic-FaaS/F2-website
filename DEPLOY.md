# Fortran² Website Deployment Guide

This document covers deployment options and procedures for the Fortran² website.

## Prerequisites

- Node.js 18.x or later
- npm 9.x or later
- Git
- Account on your chosen deployment platform (Vercel, Netlify, or Docker registry)

## Build Instructions

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The development server will start at `http://localhost:3000`.

### Production Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## Environment Variables

Create a `.env.local` file for local development:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.fortran2.io

# Optional: Analytics
NEXT_PUBLIC_GA_ID=

# Optional: API Keys
API_KEY=your-api-key
```

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the creators of Next.js and provides the best deployment experience.

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure the build settings

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add the required variables:
     - `NEXT_PUBLIC_API_URL`
     - `API_KEY` (if needed)

4. **Deploy**
   - The deploy workflow in `.github/workflows/deploy.yml` will automatically deploy on push to main

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Connect to Netlify**
   ```bash
   netlify login
   netlify init
   ```

3. **Configure netlify.toml**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

4. **Deploy**
   ```bash
   netlify deploy --prod
   ```

### Option 3: Docker

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build

   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV=production
   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/.next/standalone ./
   COPY --from=builder /app/.next/static ./.next/static
   USER nextjs
   EXPOSE 3000
   ENV PORT 3000
   CMD ["node", "server.js"]
   ```

2. **Build and Run**
   ```bash
   docker build -t fortran2-website .
   docker run -p 3000:3000 fortran2-website
   ```

## Post-Deployment Verification

1. **Check Homepage**
   - Visit the deployed URL
   - Verify the homepage loads correctly

2. **Test Navigation**
   - Click through main navigation links
   - Verify all pages load

3. **Test Interactive Features**
   - Test search functionality
   - Test demo pages
   - Test documentation viewer

4. **Verify SEO**
   - Check sitemap.xml is accessible
   - Check robots.txt is accessible
   - Verify meta tags in page source

5. **Test Forms**
   - Test newsletter subscription
   - Test contact form

## CI/CD Configuration

The project includes GitHub Actions workflows:

### CI Workflow (ci.yml)
- Runs on push and pull requests
- Tests against Node.js 18.x, 20.x, 22.x
- Runs linting, type-checking, and build

### Deploy Workflow (deploy.yml)
- Runs on push to main branch
- Builds the application
- Deploys to Vercel
- Requires secrets:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`
  - `NEXT_PUBLIC_API_URL`
  - `API_KEY`

## Troubleshooting

### Build Failures

1. **Clear .next cache**
   ```bash
   rm -rf .next
   npm run build
   ```

2. **Clear node_modules and reinstall**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### Deployment Issues

1. **Check environment variables** - Ensure all required variables are set in the deployment platform
2. **Check build logs** - Look for error messages in the deployment logs
3. **Verify Node.js version** - Ensure the deployment platform uses Node.js 18.x or later

## Security Headers

The application includes security headers configured in `next.config.js`:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy
- Content-Security-Policy

## Performance Optimization

- Images are optimized using Next.js Image component
- Fonts are optimized using next/font
- Static pages are pre-rendered at build time
- API routes are serverless

## Support

For issues or questions, please open an issue on the GitHub repository.
