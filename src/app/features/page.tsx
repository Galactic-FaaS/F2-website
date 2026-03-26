import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Code2, BookOpen, Users, Cpu, Gauge, Sparkles, CheckCircle, AlertCircle, Circle } from 'lucide-react';

type Status = 'production' | 'partial' | 'planned';

const features = [
  {
    slug: 'advanced-arithmetic',
    icon: Zap,
    title: 'Advanced Arithmetic',
    description: 'IEEE 754 (binary16/32/64, decimal64), arbitrary precision BigInt/BigFloat with assembly kernels, Posit 8/16/32/64 with quire accumulators, and interval arithmetic.',
    tags: ['IEEE 754', 'BigInt/BigFloat', 'Posit', 'Interval'],
    color: 'cyan',
    status: 'production' as Status,
    percent: 100,
  },
  {
    slug: 'differentiable',
    icon: Code2,
    title: 'Differentiable Programming',
    description: 'Tape-based reverse-mode automatic differentiation with 23 operations: add, sub, mul, div, sin, cos, tan, exp, log, sqrt, pow, and more.',
    tags: ['AutoDiff', 'Gradients', 'Reverse-Mode AD'],
    color: 'purple',
    status: 'production' as Status,
    percent: 100,
  },
  {
    slug: 'probabilistic',
    icon: Users,
    title: 'Probabilistic Programming',
    description: '15+ distributions (Normal, Gamma, Beta, Exponential, etc.), MCMC/HMC/NUTS samplers, and variational inference with ADAM optimizer.',
    tags: ['Bayesian', 'MCMC', 'HMC', 'Variational'],
    color: 'amber',
    status: 'production' as Status,
    percent: 100,
  },
  {
    slug: 'symbolic-computation',
    icon: BookOpen,
    title: 'Symbolic Computation',
    description: 'Expression trees, symbolic differentiation, and algebraic simplification. Integration and equation solving planned for Phase 6.',
    tags: ['Symbolic Math', 'Differentiation', 'Simplification'],
    color: 'green',
    status: 'partial' as Status,
    percent: 30,
  },
  {
    slug: 'metaprogramming',
    icon: Cpu,
    title: 'Metaprogramming',
    description: 'Template system with type parameters, hygienic macros, and compile-time evaluation. Advanced code generation in development.',
    tags: ['Templates', 'Macros', 'Compile-time'],
    color: 'cyan',
    status: 'partial' as Status,
    percent: 40,
  },
  {
    slug: 'functional-programming',
    icon: Gauge,
    title: 'Functional Programming',
    description: 'Map, filter, fold operations, lambda expressions with closures, and collection comprehensions. Lazy evaluation in development.',
    tags: ['Lambdas', 'Comprehensions', 'Higher-Order'],
    color: 'purple',
    status: 'partial' as Status,
    percent: 60,
  },
  {
    slug: 'inductive-programming',
    icon: Sparkles,
    title: 'Inductive Programming',
    description: 'Program synthesis from examples and pattern learning for code optimization. Planned for future release.',
    tags: ['Synthesis', 'Pattern Learning', 'AI'],
    color: 'amber',
    status: 'planned' as Status,
    percent: 0,
  },
];

const colorClasses = {
  cyan: {
    bg: 'bg-brand-cyan/10',
    text: 'text-brand-cyan',
    border: 'border-brand-cyan/30',
  },
  purple: {
    bg: 'bg-brand-purple/10',
    text: 'text-brand-purple',
    border: 'border-brand-purple/30',
  },
  green: {
    bg: 'bg-brand-green/10',
    text: 'text-brand-green',
    border: 'border-brand-green/30',
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-500',
    border: 'border-amber-500/30',
  },
};

export const metadata: Metadata = {
  title: 'Features - Fortran² Programming Language',
  description: 'Discover Fortran² powerful features including advanced arithmetic, differentiable programming, symbolic computation, and probabilistic programming for computational science.',
  openGraph: {
    title: 'Features - Fortran² Programming Language',
    description: 'Discover Fortran² powerful features including advanced arithmetic, differentiable programming, symbolic computation, and probabilistic programming.',
    url: 'https://fortran2.io/features',
    siteName: 'Fortran²',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Features - Fortran² Programming Language',
    description: 'Discover Fortran² powerful features for computational science.',
  },
};

export default function FeaturesPage() {
  return (
    <div className="py-24">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h1 className="font-heading text-4xl font-bold text-content-dark-primary sm:text-5xl">
            Multi-Paradigm Scientific Computing
          </h1>
          <p className="mt-4 text-lg text-content-dark-secondary max-w-2xl mx-auto">
            Fortran² is ~85% complete with production-ready advanced arithmetic, differentiable programming, 
            and probabilistic programming. Designed by Kadean Lewis @ GLCTC Corp.
          </p>
        </div>

        {/* Status Legend */}
        <div className="flex justify-center gap-6 mb-12 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-brand-green" />
            <span className="text-content-dark-secondary">Production Ready</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-500" />
            <span className="text-content-dark-secondary">Partially Implemented</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-4 w-4 text-content-dark-tertiary" />
            <span className="text-content-dark-secondary">Planned</span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.slug} href={`/docs/v3.0/${feature.slug}`}>
              <Card hover className={`h-full border ${colorClasses[feature.color as keyof typeof colorClasses].border}`}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`h-14 w-14 rounded-xl ${colorClasses[feature.color as keyof typeof colorClasses].bg} flex items-center justify-center`}>
                      <feature.icon className={`h-7 w-7 ${colorClasses[feature.color as keyof typeof colorClasses].text}`} />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {feature.status === 'production' && (
                        <span className="flex items-center gap-1 text-xs text-brand-green">
                          <CheckCircle className="h-3 w-3" />
                          Complete
                        </span>
                      )}
                      {feature.status === 'partial' && (
                        <span className="flex items-center gap-1 text-xs text-amber-500">
                          <AlertCircle className="h-3 w-3" />
                          {feature.percent}%
                        </span>
                      )}
                      {feature.status === 'planned' && (
                        <span className="flex items-center gap-1 text-xs text-content-dark-tertiary">
                          <Circle className="h-3 w-3" />
                          Planned
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-content-dark-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-content-dark-secondary">
                    {feature.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {feature.tags.map((tag) => (
                      <Badge key={tag} variant="outline" size="sm">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-content-dark-secondary">
            Want to learn more about our features?
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button variant="secondary">
              Read the Docs
            </Button>
            <Button variant="ghost" className="gap-2">
              View Examples
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
