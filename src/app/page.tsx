import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/ui/code-block';
import { ArrowRight, Zap, Code2, BookOpen, Download, Users, CheckCircle, AlertCircle } from 'lucide-react';

const heroCode = `! Fortran² - Automatic Differentiation Example
differentiable function neural_network(x: Vec(real64), weights: Vec(real64)) -> real64 {
    gradient (x, weights) reverse_mode
    let hidden = x.map(|xi| tanh(weights[0] * xi + weights[1]))
    let output = hidden.fold(0.0, |acc, h| acc + h * weights[2])
    output
}

! String interpolation and collection comprehensions
let squares = [x * x for x in 1..10]
let evens = [x for x in 1..20 if x % 2 == 0]
print("Welcome to Fortran² - {len(squares)} squares computed!")

! Pattern matching with sum types
type Shape = Circle(radius: real64) | 
             Rectangle(width: real64, height: real64)

function area(shape: Shape) -> real64 {
    match shape {
        Circle(r) => 3.14159 * r * r,
        Rectangle(w, h) => w * h
    }
}`;

const features = [
  {
    icon: Zap,
    title: 'Advanced Arithmetic',
    description: 'IEEE 754, arbitrary precision (BigInt/BigFloat), Posit arithmetic, and interval arithmetic with SIMD optimization.',
    href: '/docs/v3.0/advanced-arithmetic',
    status: 'production' as const,
  },
  {
    icon: Code2,
    title: 'Differentiable Programming',
    description: 'Tape-based reverse-mode AD with 23 operations for machine learning and scientific computing.',
    href: '/docs/v3.0/differentiable',
    status: 'production' as const,
  },
  {
    icon: BookOpen,
    title: 'Symbolic Computation',
    description: 'Expression trees, symbolic differentiation, and algebraic simplification (30% complete).',
    href: '/docs/v3.0/symbolic-computation',
    status: 'partial' as const,
  },
  {
    icon: Users,
    title: 'Probabilistic Programming',
    description: '15+ distributions, MCMC/HMC/NUTS samplers, and variational inference with ADAM optimizer.',
    href: '/docs/v3.0/probabilistic',
    status: 'production' as const,
  },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        {/* Background effects */}
        <div className="absolute inset-0 hero-background" />
        <div className="absolute inset-0 hero-glow" />
        
        <Container>
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <Badge variant="primary" className="mb-6">
                ~85% Complete • Active Development
              </Badge>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-content-dark-primary sm:text-5xl lg:text-6xl">
                The Future of
                <span className="block mt-2 text-gradient">Scientific Computing</span>
              </h1>
              <p className="mt-6 text-lg text-content-dark-secondary max-w-xl mx-auto lg:mx-0">
                Fortran² is a modern superset of Fortran designed by Kadean Lewis. Multi-paradigm programming 
                with advanced arithmetic, differentiable programming, probabilistic inference, and symbolic computation.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="lg">
                  View Documentation
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-content-dark-tertiary">
                <span>Open Source</span>
                <span>•</span>
                <span>LLVM Backend</span>
                <span>•</span>
                <span>.f2 & .f90 Files</span>
              </div>
            </div>

            {/* Code Demo */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 blur-2xl" />
              <CodeBlock
                code={heroCode}
                language="fortran"
                filename="neural_network.f2"
                className="relative"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-surface-dark-secondary">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
            <h2 className="font-heading text-3xl font-bold text-content-dark-primary sm:text-4xl">
              Production-Ready Scientific Computing
            </h2>
            <p className="mt-4 text-lg text-content-dark-secondary max-w-2xl mx-auto">
              Hand-optimized assembly kernels, SIMD vectorization (AVX-512, ARM NEON), and 
              LLVM native code generation for maximum performance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href}>
                <Card hover className="h-full">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-lg bg-brand-cyan/10 flex items-center justify-center">
                        <feature.icon className="h-6 w-6 text-brand-cyan" />
                      </div>
                      {feature.status === 'production' ? (
                        <span className="flex items-center gap-1 text-xs text-brand-green">
                          <CheckCircle className="h-3 w-3" />
                          Production
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-xs text-amber-500">
                          <AlertCircle className="h-3 w-3" />
                          Partial
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-content-dark-primary">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-content-dark-secondary">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <Container>
          <Card className="overflow-hidden border-brand-cyan/30 bg-gradient-mesh">
            <CardContent className="p-12 text-center">
              <h2 className="font-heading text-3xl font-bold text-content-dark-primary">
                Ready to Try Fortran²?
              </h2>
              <p className="mt-4 text-lg text-content-dark-secondary max-w-2xl mx-auto">
                Clone the repository and build the LLVM-based compiler. 
                Start exploring modern Fortran with advanced arithmetic systems today.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="gap-2">
                  <Download className="h-4 w-4" />
                  Build from Source
                </Button>
                <Button variant="outline" size="lg">
                  Read the Docs
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}
