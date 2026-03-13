import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorRole?: string;
  category: string;
  readTime: string;
  tags?: string[];
}

const blogPosts: Record<string, BlogPost> = {
  'fortran2-v3-release': {
    slug: 'fortran2-v3-release',
    title: 'Fortran² Version 3.0 Release Announcement',
    excerpt: 'Announcing the release of Fortran² 3.0 with revolutionary features including differentiable programming, improved performance, and new probabilistic modules.',
    date: '2025-10-01',
    author: 'Fortran² Team',
    category: 'Release',
    readTime: '5 min read',
    tags: ['release', 'announcement', 'version 3.0'],
    content: `
We are thrilled to announce the release of **Fortran² 3.0**, the most significant update to our scientific computing platform since its inception.

## What's New in Fortran² 3.0

### Differentiable Programming
The headline feature of this release is native differentiability. You can now write programs that are automatically differentiable, enabling:

- **Automatic differentiation** - No manual gradient computation needed
- **Gradient-based optimization** - Built-in optimizers for machine learning
- **Neural network layers** - Pre-built components for deep learning

### Probabilistic Module
Our new probabilistic programming module brings Bayesian inference to Fortran²:

- **Sampling methods** - MCMC, HMC, and particle filters
- **Distributions** - Comprehensive library of probability distributions
- **Inference engines** - Automated inference for complex models

### Enhanced Symbolic Computation
The symbolic mathematics engine has been completely rewritten:

- Faster symbolic manipulation
- Better handling of large expressions
- Improved LaTeX output

### Performance Improvements
We've made significant performance optimizations:

- **2x faster** matrix operations
- **30% reduced** memory usage
- **New JIT compiler** for faster startup times

### WebAssembly Support
Run Fortran² directly in your browser! Our WebAssembly port enables:

- Client-side computation
- Interactive documentation
- Educational demonstrations

## Breaking Changes

When upgrading from version 2.x, please note:

1. Differentiable blocks now use \`diff\` keyword instead of \`auto_diff\`
2. Probabilistic module functions have been renamed for clarity
3. Some symbolic functions have new signatures

## Getting Started

Install the latest version:

\`\`\`bash
# Using pip
pip install fortran2==3.0.0

# Using conda
conda install fortran2=3.0.0

# Using Docker
docker pull fortranlang/fortran2:3.0.0
\`\`\`

## Thank You

This release is the result of months of hard work from our team and valuable feedback from the community. Thank you for your continued support!

**The Fortran² Team**
    `,
  },
  'differentiable-programming': {
    slug: 'differentiable-programming',
    title: 'Introduction to Differentiable Programming',
    excerpt: 'Discover how differentiable programming enables modern scientific computing with automatic gradients and optimization. Learn the fundamentals and practical applications.',
    date: '2025-11-15',
    author: 'Dr. Sarah Chen',
    authorRole: 'Lead Researcher, Differentiable Computing',
    category: 'Tutorial',
    readTime: '8 min read',
    tags: ['differentiable', 'programming', 'gradient', 'machine learning', 'tutorial'],
    content: `
Differentiable programming is revolutionizing how we approach scientific computing. In this tutorial, we'll explore the fundamentals and see how Fortran² makes it easy.

## What is Differentiable Programming?

Differentiable programming is a programming paradigm where programs are written such that they can be automatically differentiated. This means the gradient of any output with respect to any input can be computed efficiently.

### Why Does It Matter?

Traditionally, if you wanted to optimize a function, you had to manually compute gradients. This is error-prone and time-consuming. Differentiable programming automates this process.

## Getting Started with Fortran²

Here's a simple example of a differentiable function in Fortran²:

\`\`\`fortran
program gradient_example
  use f2_diff
  
  ! Define a differentiable function
  diff function f(x)
    f = x**2 + 2*x + 1
  end function
  
  ! Compute gradient at x = 3.0
  real :: x = 3.0
  real :: df_dx
  
  df_dx = gradient(f, x)
  print *, "Gradient at x =", x, "is", df_dx
end program
\`\`\`

This should output: \`Gradient at x = 3.0 is 8.0\`

## Building a Simple Neural Network

Let's build a simple neural network layer:

\`\`\`fortran
module neural_layer
  use f2_diff
  use f2_linalg
  
  type :: DenseLayer
    real, allocatable :: weights(:,:)
    real, allocatable :: bias(:)
  contains
    procedure :: forward
    procedure :: backward
  end type DenseLayer
  
contains

  function forward(layer, input) result(output)
    type(DenseLayer), intent(in) :: layer
    real, intent(in) :: input(:)
    real :: output(size(layer%bias))
    
    output = matmul(input, layer%weights) + layer%bias
  end function

end module
\`\`\`

## Optimization

Fortran² includes built-in optimizers:

\`\`\`fortran
use f2_optim

! Minimize the Rosenbrock function
real :: x0(2) = [0.0, 0.0]
real :: result

result = minimize(rosenbrock, x0, method='adam')
\`\`\`

## Applications

Differentiable programming enables many applications:

1. **Machine Learning** - Neural networks, deep learning
2. **Physics-Informed ML** - Combining physical laws with data
3. **Optimization** - Finding optimal parameters
4. **Sensitivity Analysis** - Understanding parameter influence

## Next Steps

- Check out the [Differentiable Programming documentation](/docs/v3.0/differentiable)
- Try the [interactive demo](/demos)
- Explore our [tutorials](/tutorials)
    `,
  },
  'performance-benchmarks': {
    slug: 'performance-benchmarks',
    title: 'Performance Benchmarks: Fortran² vs Traditional Approaches',
    excerpt: 'Comprehensive performance comparison showing Fortran² advantages in speed and memory efficiency for scientific workloads. See real-world benchmarks and analysis.',
    date: '2025-12-20',
    author: 'Michael Roberts',
    authorRole: 'Performance Engineer',
    category: 'Performance',
    readTime: '6 min read',
    tags: ['performance', 'benchmark', 'comparison', 'optimization'],
    content: `
How does Fortran² compare to traditional scientific computing approaches? We ran comprehensive benchmarks to find out.

## Benchmark Methodology

We tested on a variety of common scientific computing tasks:

- Matrix operations
- Numerical integration
- Differential equations
- Symbolic computation
- Probabilistic inference

### Test Environment
- **CPU**: AMD EPYC 7763 (64 cores)
- **RAM**: 256 GB DDR4
- **OS**: Ubuntu 22.04 LTS

## Results

### Matrix Operations

| Operation | Fortran² | NumPy | MATLAB | Speedup |
|-----------|----------|-------|--------|---------|
| Matrix multiply (10k×10k) | 0.23s | 0.45s | 0.52s | 2.0x |
| SVD (5k×5k) | 1.2s | 2.8s | 3.1s | 2.3x |
| Eigenvalues (3k×3k) | 0.8s | 1.9s | 2.2s | 2.4x |

### Symbolic Differentiation

| Expression Size | Fortran² | SymPy | Mathematica | Speedup |
|-----------------|----------|-------|-------------|---------|
| 100 terms | 0.01s | 0.15s | 0.22s | 15x |
| 1,000 terms | 0.08s | 1.8s | 2.1s | 22x |
| 10,000 terms | 0.7s | 45s | 38s | 54x |

### Probabilistic Inference

| Model | Fortran² | PyMC3 | Stan | Speedup |
|-------|-----------|-------|------|---------|
| Linear regression | 0.5s | 2.3s | 3.1s | 4.6x |
| Hierarchical model | 2.1s | 12s | 15s | 5.7x |
| Gaussian process | 3.8s | 28s | 32s | 7.4x |

## Memory Efficiency

Fortran² uses significantly less memory than alternatives:

- **30% less** memory than NumPy for large matrices
- **50% less** memory than Python-based symbolic libraries
- **Streaming** computation for unbounded data

## Why Fortran² is Faster

1. **Native compilation** - No interpreter overhead
2. **Type inference** - Optimized memory layout
3. **Parallel by default** - Automatic multi-threading
4. **Specialized kernels** - Optimized for scientific computing

## Try It Yourself

Run your own benchmarks:

\`\`\`bash
# Install Fortran²
pip install fortran2

# Run benchmark suite
f2 benchmark --all
\`\`\`

## Conclusion

Fortran² consistently outperforms traditional approaches across all benchmark categories. The combination of performance and ease of use makes it ideal for modern scientific computing.
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <Container>
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-content-dark-secondary hover:text-brand-cyan transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <article className="mx-auto max-w-3xl">
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary">{post.category}</Badge>
                <span className="text-sm text-content-dark-tertiary flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {post.readTime}
                </span>
              </div>

              <h1 className="font-heading text-3xl font-bold text-content-dark-primary md:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              <p className="mt-4 text-lg text-content-dark-secondary">
                {post.excerpt}
              </p>

              <div className="mt-6 flex items-center gap-6 text-sm text-content-dark-tertiary">
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            </header>

            {/* Tags */}
            {post.tags && (
              <div className="flex flex-wrap gap-2 mb-8">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-invert prose-cyan max-w-none">
              {post.content.split('\n').map((line, i) => {
                if (line.startsWith('## ')) {
                  return (
                    <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                      {line.replace('## ', '')}
                    </h2>
                  );
                }
                if (line.startsWith('### ')) {
                  return (
                    <h3 key={i} className="text-xl font-bold mt-6 mb-3">
                      {line.replace('### ', '')}
                    </h3>
                  );
                }
                if (line.startsWith('```')) {
                  return null;
                }
                if (line.trim().startsWith('- ')) {
                  return (
                    <li key={i} className="ml-4">
                      {line.trim().substring(2)}
                    </li>
                  );
                }
                if (line.startsWith('| ')) {
                  return null; // Skip table rows for simplicity
                }
                if (line.trim() === '') {
                  return <br key={i} />;
                }
                // Handle inline code and bold
                const formattedLine = line
                  .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                  .replace(/`([^`]+)`/g, '<code class="bg-surface-dark-tertiary px-1 rounded">$1</code>');
                return (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{ __html: formattedLine }}
                  />
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-xl bg-surface-dark border border-border-dark p-6">
              <h3 className="font-heading text-lg font-bold text-content-dark-primary">
                Ready to get started?
              </h3>
              <p className="mt-2 text-content-dark-secondary">
                Install Fortran² and start exploring its capabilities today.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link href="/downloads">
                  <Button>Download Now</Button>
                </Link>
                <Link href="/docs/v3.0/getting-started">
                  <Button variant="outline">Read Documentation</Button>
                </Link>
              </div>
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
