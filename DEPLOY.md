# Fortran² Website Deployment Guide

This document covers deployment options and procedures for the Fortran² website.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Build Instructions](#build-instructions)
- [Environment Variables](#environment-variables)
- [Deployment Options](#deployment-options)
  - [Vercel (Recommended)](#option-1-vercel-recommended)
  - [Netlify](#option-2-netlify)
  - [Docker](#option-3-docker)
  - [Self-Hosted](#option-4-self-hosted)
- [Post-Deployment Verification](#post-deployment-verification)
- [CI/CD Configuration](#cicd-configuration)
- [Performance Optimization](#performance-optimization)
- [Security Considerations](#security-considerations)
- [Troubleshooting](#troubleshooting)

## Prerequisites

- **Node.js**: 18.x or later (LTS recommended)
- **npm**: 9.x or later (or yarn/pnpm)
- **Git**: Latest version
- **Account**: On your chosen deployment platform (Vercel, Netlify, or Docker registry)

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

### Build Output

The production build creates:
- `.next/` - Next.js build output
- `.next/static/` - Static assets
- `.next/server/` - Server-side rendering code
- `.next/standalone/` - Standalone server (if configured)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXTAUTH_URL` | Your application URL | `https://fortran2.io` |
| `NEXTAUTH_SECRET` | Secret for JWT encryption | `openssl rand -base64 32` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `GITHUB_TOKEN` | GitHub Personal Access Token | - |
| `GITHUB_ID` | GitHub OAuth Client ID | - |
| `GITHUB_SECRET` | GitHub OAuth Client Secret | - |
| `MAILCHIMP_API_KEY` | Mailchimp API Key | - |
| `MAILCHIMP_AUDIENCE_ID` | Mailchimp Audience ID | - |
| `SENDGRID_API_KEY` | SendGrid API Key | - |
| `NEWSLETTER_FROM_EMAIL` | Newsletter sender email | `noreply@fortran2.org` |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | Enable analytics | `true` in production |
| `NEXT_PUBLIC_ANALYTICS_ID` | Google Analytics ID | - |
| `NEXT_PUBLIC_VERCEL_ANALYTICS` | Enable Vercel Analytics | `false` |

See [`.env.local.example`](.env.local.example) for a complete list.

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the creator of Next.js and provides the best deployment experience.

#### Automatic Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js and configure build settings

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add all required variables:
     - `NEXTAUTH_URL` = `https://your-domain.com`
     - `NEXTAUTH_SECRET` = `your-secret-key`
     - `GITHUB_TOKEN` (optional, for higher API rate limits)
     - Other optional variables as needed

4. **Deploy**
   - The deploy workflow in `.github/workflows/deploy.yml` will automatically deploy on push to main
   - Or manually trigger deployment from Vercel dashboard

#### Manual Deployment with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

#### Vercel Configuration

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXTAUTH_URL": "https://your-domain.com",
    "NEXTAUTH_SECRET": "@nextauth-secret"
  }
}
```

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

   [build.environment]
     NODE_VERSION = "18"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200

   [[headers]]
     for = "/*"
     [headers.values]
       X-Frame-Options = "DENY"
       X-XSS-Protection = "1; mode=block"
       X-Content-Type-Options = "nosniff"
       Referrer-Policy = "strict-origin-when-cross-origin"
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

2. **Create .dockerignore**
   ```
   node_modules
   .next
   .git
   .env.local
   ```

3. **Build and Run**
   ```bash
   # Build image
   docker build -t fortran2-website .

   # Run container
   docker run -p 3000:3000 \
     -e NEXTAUTH_URL=https://your-domain.com \
     -e NEXTAUTH_SECRET=your-secret \
     fortran2-website
   ```

4. **Docker Compose (Optional)**
   ```yaml
   version: '3.8'
   services:
     web:
       build: .
       ports:
         - "3000:3000"
       environment:
         - NEXTAUTH_URL=https://your-domain.com
         - NEXTAUTH_SECRET=your-secret
       restart: unless-stopped
   ```

### Option 4: Self-Hosted

1. **Build the Application**
   ```bash
   npm install
   npm run build
   ```

2. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   ```

3. **Start with PM2**
   ```bash
   pm2 start npm --name "fortran2-website" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx (Reverse Proxy)**
   ```nginx
   server {
       listen 80;
       server_name fortran2.io;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Enable HTTPS with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d fortran2.io
   ```

## Post-Deployment Verification

### 1. Check Homepage
- Visit the deployed URL
- Verify the homepage loads correctly
- Check that all images and assets load

### 2. Test Navigation
- Click through main navigation links
- Verify all pages load without errors
- Test mobile navigation

### 3. Test Interactive Features
- Test search functionality
- Test demo pages
- Test documentation viewer
- Test code playground

### 4. Verify SEO
- Check `sitemap.xml` is accessible at `/sitemap.xml`
- Check `robots.txt` is accessible at `/robots.txt`
- Verify meta tags in page source
- Test social sharing (Open Graph tags)

### 5. Test Forms
- Test newsletter subscription
- Test contact form
- Verify form validation

### 6. Test API Endpoints
- `GET /api/contributors` - Should return contributor data
- `GET /api/downloads` - Should return release information
- `POST /api/search` - Should return search results
- `POST /api/newsletter` - Should handle subscription

### 7. Performance Check
- Run Lighthouse audit
- Check Core Web Vitals
- Verify image optimization
- Test loading speed

### 8. Security Check
- Verify security headers are present
- Check HTTPS is enforced
- Test authentication flow
- Verify CORS configuration

## CI/CD Configuration

The project includes GitHub Actions workflows:

### CI Workflow (ci.yml)

Runs on push and pull requests:
- Tests against Node.js 18.x, 20.x, 22.x
- Runs linting
- Runs type checking
- Builds the application

### Deploy Workflow (deploy.yml)

Runs on push to main branch:
- Builds the application
- Deploys to Vercel
- Requires secrets:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`
  - `NEXT_PUBLIC_API_URL`
  - `API_KEY`

### Setting Up GitHub Secrets

1. Go to your repository on GitHub
2. Navigate to Settings > Secrets and variables > Actions
3. Add the following secrets:
   - `VERCEL_TOKEN` - Get from Vercel account settings
   - `VERCEL_ORG_ID` - Get from Vercel project settings
   - `VERCEL_PROJECT_ID` - Get from Vercel project settings
   - `NEXTAUTH_URL` - Your production URL
   - `NEXTAUTH_SECRET` - Your production secret

## Performance Optimization

### Build Optimization
- Static pages are pre-rendered at build time
- API routes are serverless
- Images are optimized using Next.js Image component
- Fonts are optimized using next/font

### Runtime Optimization
- Code splitting is automatic
- Lazy loading for components
- Image optimization with WebP/AVIF
- Font optimization with subsetting

### Caching Strategy
- Static assets are cached with long TTL
- API responses are cached where appropriate
- Service worker caches for offline support

## Security Considerations

### Security Headers

The application includes security headers configured in `next.config.js`:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy: [configured policy]`

### Authentication
- NextAuth.js handles authentication
- JWT tokens are encrypted with `NEXTAUTH_SECRET`
- OAuth providers are configured securely

### API Security
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS configuration
- Environment variable protection

### Data Protection
- No sensitive data in client-side code
- Environment variables for secrets
- Secure cookie configuration
- HTTPS enforcement

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

3. **Check Node.js version**
   ```bash
   node --version  # Should be 18.x or later
   ```

4. **Check TypeScript errors**
   ```bash
   npm run type-check
   ```

### Deployment Issues

1. **Check environment variables**
   - Ensure all required variables are set in the deployment platform
   - Verify variable names match exactly
   - Check for typos in values

2. **Check build logs**
   - Look for error messages in the deployment logs
   - Check for missing dependencies
   - Verify build command is correct

3. **Verify Node.js version**
   - Ensure the deployment platform uses Node.js 18.x or later
   - Check package.json for engine requirements

### Runtime Errors

1. **Check server logs**
   - Review deployment platform logs
   - Check for unhandled exceptions
   - Verify API endpoint errors

2. **Check API rate limits**
   - GitHub API has rate limits
   - Add `GITHUB_TOKEN` for higher limits
   - Implement fallback to mock data

3. **Check authentication**
   - Verify `NEXTAUTH_URL` matches your domain
   - Verify `NEXTAUTH_SECRET` is set correctly
   - Check OAuth callback URLs

### Performance Issues

1. **Run Lighthouse audit**
   - Check performance score
   - Identify bottlenecks
   - Optimize images and assets

2. **Check bundle size**
   ```bash
   npm run build
   # Check .next/analyze for bundle analysis
   ```

3. **Optimize images**
   - Use Next.js Image component
   - Provide appropriate sizes
   - Use modern formats (WebP/AVIF)

## Support

For issues or questions:
- **GitHub Issues**: [github.com/fortran2/website/issues](https://github.com/fortran2/website/issues)
- **GitHub Discussions**: [github.com/fortran2/website/discussions](https://github.com/fortran2/website/discussions)
- **Email**: support@fortran2.io

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Docker Documentation](https://docs.docker.com/)
