import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
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
];

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <Container>
          {/* Header */}
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4">
              Blog
            </Badge>
            <h1 className="font-heading text-4xl font-bold text-content-dark-primary md:text-5xl">
              Fortran² <span className="text-brand-cyan">Blog</span>
            </h1>
            <p className="mt-4 text-lg text-content-dark-secondary max-w-2xl">
              Stay up to date with the latest news, tutorials, and insights from the Fortran² team
              and community.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full transition-all duration-200 hover:border-brand-cyan/50 hover:shadow-glow-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <span className="text-xs text-content-dark-tertiary">
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="mt-4 text-xl leading-tight">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-content-dark-secondary line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-content-dark-tertiary">
                      <span>{post.author}</span>
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="mt-16 rounded-2xl bg-surface-dark border border-border-dark p-8 md:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-heading text-2xl font-bold text-content-dark-primary">
                Subscribe to Our Newsletter
              </h2>
              <p className="mt-4 text-content-dark-secondary">
                Get the latest updates, tutorials, and release announcements delivered to your inbox.
              </p>
              <form className="mt-6 flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className="flex-1 rounded-lg border border-border-dark bg-surface-dark-secondary px-4 py-2.5 text-content-dark-primary placeholder:text-content-dark-tertiary focus:outline-none focus:ring-2 focus:ring-brand-cyan/20 focus:border-brand-cyan"
                />
                <Button type="submit">Subscribe</Button>
              </form>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
