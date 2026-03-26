import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  FileText, 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  Mail,
  Search,
  TrendingUp,
  Zap,
  BookOpen
} from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'fortran2-v3-release',
    title: 'Fortran² Version 3.0 Release Announcement',
    excerpt: 'Announcing the release of Fortran² 3.0 with revolutionary features including differentiable programming, improved performance, and new probabilistic modules.',
    date: '2025-10-01',
    author: 'Fortran² Team',
    category: 'Release',
    readTime: '5 min read',
    featured: true,
  },
  {
    slug: 'differentiable-programming',
    title: 'Introduction to Differentiable Programming',
    excerpt: 'Discover how differentiable programming enables modern scientific computing with automatic gradients and optimization. Learn the fundamentals and practical applications.',
    date: '2025-11-15',
    author: 'Dr. Sarah Chen',
    category: 'Tutorial',
    readTime: '8 min read',
  },
  {
    slug: 'performance-benchmarks',
    title: 'Performance Benchmarks: Fortran² vs Traditional Approaches',
    excerpt: 'Comprehensive performance comparison showing Fortran² advantages in speed and memory efficiency for scientific workloads. See real-world benchmarks and analysis.',
    date: '2025-12-20',
    author: 'Michael Roberts',
    category: 'Performance',
    readTime: '6 min read',
  },
  {
    slug: 'probabilistic-programming',
    title: 'Building Bayesian Models with Fortran²',
    excerpt: 'Learn how to use Fortran² probabilistic programming features to build and analyze Bayesian models with MCMC sampling and variational inference.',
    date: '2026-01-10',
    author: 'Dr. Emily Watson',
    category: 'Tutorial',
    readTime: '10 min read',
  },
  {
    slug: 'llvm-backend',
    title: 'Inside the LLVM Backend: How Fortran² Compiles to Machine Code',
    excerpt: 'Deep dive into Fortran² LLVM backend architecture, optimization passes, and code generation strategies for maximum performance.',
    date: '2026-02-05',
    author: 'Kadean Lewis',
    category: 'Technical',
    readTime: '12 min read',
  },
  {
    slug: 'symbolic-math',
    title: 'Symbolic Computation in Fortran²',
    excerpt: 'Explore the symbolic mathematics features in Fortran² including expression trees, symbolic differentiation, and algebraic simplification.',
    date: '2026-03-01',
    author: 'Dr. James Park',
    category: 'Feature',
    readTime: '7 min read',
  },
];

const categories = [
  { name: 'All', count: blogPosts.length },
  { name: 'Release', count: blogPosts.filter(p => p.category === 'Release').length },
  { name: 'Tutorial', count: blogPosts.filter(p => p.category === 'Tutorial').length },
  { name: 'Performance', count: blogPosts.filter(p => p.category === 'Performance').length },
  { name: 'Technical', count: blogPosts.filter(p => p.category === 'Technical').length },
  { name: 'Feature', count: blogPosts.filter(p => p.category === 'Feature').length },
];

export const metadata: Metadata = {
  title: 'Blog - Fortran² News and Tutorials',
  description: 'Read the latest news, tutorials, and insights about Fortran². Stay updated with release announcements, performance benchmarks, and how-to guides.',
  openGraph: {
    title: 'Blog - Fortran² News and Tutorials',
    description: 'Read the latest news, tutorials, and insights about Fortran².',
    url: 'https://fortran2.io/blog',
    siteName: 'Fortran²',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Fortran²',
    description: 'Read the latest news, tutorials, and insights about Fortran².',
  },
};

export default function BlogPage() {
  const featuredPost = blogPosts.find(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-100 via-carbon-gray-90 to-carbon-blue-100" />
        <div className="absolute inset-0 hero-mesh opacity-40" />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-6">
              <FileText className="h-3 w-3 mr-1" />
              Blog
            </Badge>
            <h1 className="text-carbon-display-01 font-light text-carbon-gray-10">
              Fortran²
              <span className="block mt-2 bg-gradient-to-r from-carbon-blue-40 via-accent-cyan to-accent-teal bg-clip-text text-transparent">
                Blog
              </span>
            </h1>
            <p className="mt-6 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
              Stay up to date with the latest news, tutorials, and insights from the Fortran² team
              and community.
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-carbon-gray-90 border-b border-carbon-gray-80">
        <Container>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <Button 
                key={cat.name} 
                variant={cat.name === 'All' ? 'primary' : 'secondary'} 
                size="sm"
                className="gap-2"
              >
                {cat.name}
                <span className="text-carbon-xs opacity-70">({cat.count})</span>
              </Button>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-carbon-gray-100">
          <Container>
            <div className="mb-8">
              <Badge variant="success" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                Featured
              </Badge>
            </div>
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card hover className="overflow-hidden border-carbon-blue-60/30 group">
                <div className="grid md:grid-cols-2">
                  {/* Image Placeholder */}
                  <div className="relative h-64 md:h-auto bg-gradient-to-br from-carbon-blue-60/20 to-accent-purple/20">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-20 w-20 rounded-2xl bg-carbon-blue-60/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Zap className="h-10 w-10 text-carbon-blue-40" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <CardContent className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="outline" size="sm">{featuredPost.category}</Badge>
                      <span className="text-carbon-sm text-carbon-gray-50 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {featuredPost.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-carbon-3xl font-semibold text-carbon-gray-10 group-hover:text-white transition-colors mb-4">
                      {featuredPost.title}
                    </CardTitle>
                    <p className="text-carbon-lg text-carbon-gray-40 mb-6">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-carbon-sm text-carbon-gray-50">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {featuredPost.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(featuredPost.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <ArrowRight className="h-5 w-5 text-carbon-blue-40 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          </Container>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-carbon-gray-100">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {regularPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card hover className="h-full group border-carbon-gray-80 hover:border-carbon-blue-60/30 hover:shadow-lg hover:shadow-carbon-blue-60/10 transition-all">
                  {/* Card Image Area */}
                  <div className="h-40 bg-gradient-to-br from-carbon-gray-90 to-carbon-gray-80 relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${post.category === 'Tutorial' ? 'bg-accent-purple/10' : post.category === 'Performance' ? 'bg-status-warning/10' : 'bg-carbon-blue-60/10'}`}>
                        {post.category === 'Tutorial' ? (
                          <BookOpen className="h-6 w-6 text-accent-purple" />
                        ) : post.category === 'Performance' ? (
                          <Zap className="h-6 w-6 text-status-warning" />
                        ) : (
                          <FileText className="h-6 w-6 text-carbon-blue-40" />
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" size="sm">{post.category}</Badge>
                      <span className="text-carbon-xs text-carbon-gray-50 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="mt-4 text-carbon-xl font-semibold text-carbon-gray-10 group-hover:text-white transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-carbon-sm text-carbon-gray-40 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-carbon-xs text-carbon-gray-50">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </span>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-carbon-gray-90">
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-90 via-carbon-blue-100 to-carbon-gray-100" />
        <div className="absolute inset-0 hero-mesh opacity-20" />
        
        <Container className="relative z-10">
          <Card className="overflow-hidden border-carbon-blue-60/30 bg-carbon-gray-90/50 backdrop-blur-xl">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-accent-cyan/10 mb-6">
                <Mail className="h-8 w-8 text-accent-cyan" />
              </div>
              <h2 className="text-carbon-4xl font-semibold text-carbon-gray-10">
                Subscribe to Our Newsletter
              </h2>
              <p className="mt-4 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
                Get the latest updates, tutorials, and release announcements delivered to your inbox.
              </p>
              <form className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center max-w-md mx-auto">
                <Input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-carbon-gray-100 border-carbon-gray-70 text-carbon-gray-10 placeholder:text-carbon-gray-50 focus:border-carbon-blue-40 focus:ring-carbon-blue-40/20"
                />
                <Button type="submit" size="lg" className="min-w-[140px]">
                  Subscribe
                </Button>
              </form>
              <p className="mt-4 text-carbon-sm text-carbon-gray-50">
                No spam, unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}