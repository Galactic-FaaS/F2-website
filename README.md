# Fortran² Website

Official website for the Fortran² programming language - a cutting-edge, multi-paradigm programming language that combines the performance of Fortran with modern language features.

## 🚀 Features

### Core Features
- **Interactive Playground** - Write and execute Fortran² code directly in the browser
- **Comprehensive Documentation** - Full language documentation with versioning
- **Tutorial System** - Step-by-step tutorials for learning Fortran²
- **Demo Gallery** - Interactive demonstrations of language capabilities
- **Blog** - Latest news, updates, and technical articles
- **Community Hub** - Connect with other Fortran² developers
- **Downloads** - Get the latest releases and installation guides
- **Contributors** - Meet the people behind Fortran²
- **Search** - Full-text search across all content
- **Offline Support** - Progressive Web App with offline capabilities

### Technical Features
- **Server-Side Rendering** - Fast initial page loads with Next.js
- **Static Generation** - Pre-rendered pages for optimal performance
- **API Routes** - Serverless backend functionality
- **Authentication** - GitHub OAuth integration
- **Analytics** - Google Analytics and Vercel Analytics support
- **Responsive Design** - Mobile-first, fully responsive layout
- **Dark/Light Theme** - Automatic theme switching
- **SEO Optimized** - Meta tags, sitemap, and robots.txt
- **Security Headers** - Comprehensive security configuration

## 📄 Pages

### Main Pages
- **Homepage** (`/`) - Landing page with hero section and feature highlights
- **Features** (`/features`) - Detailed feature showcase
- **Downloads** (`/downloads`) - Download links and installation guides
- **Playground** (`/playground`) - Interactive code editor
- **Blog** (`/blog`) - Blog posts and articles
- **Blog Post** (`/blog/[slug]`) - Individual blog post pages
- **Tutorials** (`/tutorials`) - Tutorial listing page
- **Tutorial** (`/tutorials/[slug]`) - Individual tutorial pages
- **Demos** (`/demos`) - Interactive demo gallery
- **Community** (`/community`) - Community resources and links
- **Contributors** (`/contributors`) - Contributor profiles and statistics
- **Offline** (`/offline`) - Offline fallback page

### Documentation Pages
- **Docs** (`/docs`) - Redirects to latest documentation
- **Docs Version** (`/docs/[version]`) - Documentation version layout
- **Getting Started** (`/docs/v3.0/getting-started`) - Quick start guide
- **Language Basics** (`/docs/v3.0/language-basics`) - Core language concepts
- **Advanced Arithmetic** (`/docs/v3.0/advanced-arithmetic`) - Advanced math operations
- **Differentiable Programming** (`/docs/v3.0/differentiable`) - Automatic differentiation
- **Probabilistic Programming** (`/docs/v3.0/probabilistic`) - Probabilistic features
- **Symbolic Computation** (`/docs/v3.0/symbolic-computation`) - Symbolic math
- **API Reference** (`/docs/v3.0/api-reference`) - Complete API documentation

## 🔌 API Endpoints

### Public API Routes
- **`GET /api/contributors`** - Fetch GitHub contributors with statistics
- **`GET /api/downloads`** - Fetch release information and download links
- **`POST /api/execute`** - Execute Fortran² code (sandboxed)
- **`GET /api/execute`** - Get execution environment information
- **`POST /api/newsletter`** - Subscribe to newsletter
- **`GET /api/newsletter`** - Check subscription status
- **`POST /api/contact`** - Submit contact form
- **`GET /api/contact`** - Get contact API information
- **`POST /api/search`** - Search across all content
- **`GET /api/search`** - Search API information

### Authentication Routes
- **`/api/auth/[...nextauth]`** - NextAuth.js authentication handlers

## 🧩 Components

### Layout Components
- **Header** - Main navigation with logo and menu
- **Footer** - Site footer with links and information
- **MobileNav** - Mobile navigation drawer

### UI Components
- **Badge** - Status and category badges
- **Button** - Primary and secondary buttons
- **Card** - Content cards with various styles
- **CodeBlock** - Syntax-highlighted code display
- **Container** - Responsive content containers
- **ContributorCard** - Contributor profile cards
- **ContributorStats** - Contributor statistics display
- **Input** - Form input fields
- **Search** - Search input with suggestions
- **ShareButton** - Social sharing buttons

### Feature Components
- **Analytics** - Analytics tracking wrapper
- **ArithmeticDemo** - Interactive arithmetic demonstrations
- **DemoContainer** - Demo wrapper with controls
- **DifferentiableDemo** - Differentiable programming demo
- **ProbabilisticDemo** - Probabilistic programming demo
- **SymbolicDemo** - Symbolic computation demo
- **DocContent** - Documentation content renderer
- **Sidebar** - Documentation sidebar navigation
- **TableOfContents** - Documentation table of contents
- **VersionBanner** - Version upgrade banner
- **VersionSelector** - Documentation version selector
- **CodeEditor** - Monaco-based code editor
- **EditorToolbar** - Code editor toolbar
- **OutputPanel** - Code execution output display

### Provider Components
- **AuthProvider** - NextAuth.js session provider
- **ThemeProvider** - Dark/light theme provider

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2.5
- **Language**: TypeScript 5.6.2
- **Styling**: Tailwind CSS 3.4.10
- **Animations**: Framer Motion 11.3.28
- **Code Editor**: Monaco Editor (via @monaco-editor/react)
- **Charts**: Recharts 3.8.0
- **Authentication**: NextAuth.js 4.24.13
- **Icons**: Lucide React 0.436.0
- **Math Rendering**: KaTeX 0.16.38

## 📦 Installation

### Prerequisites
- Node.js 18.x or later
- npm 9.x or later
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/fortran2/website.git
cd website

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local with your configuration
# (See Environment Variables section below)

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

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |

## 🔐 Environment Variables

See [`.env.local.example`](.env.local.example) for a complete list of environment variables.

### Required Variables
- `NEXTAUTH_URL` - Your application URL
- `NEXTAUTH_SECRET` - Secret for JWT encryption

### Optional Variables
- `GITHUB_TOKEN` - GitHub Personal Access Token (for higher API rate limits)
- `GITHUB_ID` / `GITHUB_SECRET` - GitHub OAuth credentials
- `MAILCHIMP_API_KEY` / `MAILCHIMP_AUDIENCE_ID` - Mailchimp integration
- `SENDGRID_API_KEY` - SendGrid integration
- `NEXT_PUBLIC_ANALYTICS_ID` - Google Analytics ID
- `NEXT_PUBLIC_VERCEL_ANALYTICS` - Enable Vercel Analytics

## 🚀 Deployment

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions.

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fortran2/website)

## 📚 Documentation

- [Language Documentation](https://fortran2.io/docs)
- [API Reference](https://fortran2.io/docs/v3.0/api-reference)
- [Tutorials](https://fortran2.io/tutorials)
- [Blog](https://fortran2.io/blog)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Website](https://fortran2.io)
- [Documentation](https://fortran2.io/docs)
- [GitHub](https://github.com/fortran2)
- [Discord](https://discord.gg/fortran2)
- [Twitter](https://twitter.com/fortran2)

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/fortran2/website/issues)
- **Discussions**: [GitHub Discussions](https://github.com/fortran2/website/discussions)
- **Email**: support@fortran2.io

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Vercel](https://vercel.com/) - Deployment platform
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Code editor
- [Lucide](https://lucide.dev/) - Icon library
