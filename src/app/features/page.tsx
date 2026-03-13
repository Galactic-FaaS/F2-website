import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Code2, BookOpen, Users, Cpu, Shield, Gauge } from 'lucide-react';

const features = [
  {
    slug: 'advanced-arithmetic',
    icon: Zap,
    title: 'Advanced Arithmetic',
    description: 'Native support for quad precision, complex numbers, interval arithmetic, and arbitrary precision calculations.',
    tags: ['Quad Precision', 'Complex Numbers', 'Interval Arithmetic'],
    color: 'cyan',
  },
  {
    slug: 'differentiable-programming',
    icon: Code2,
    title: 'Differentiable Programming',
    description: 'Automatic differentiation enables gradient-based optimization, neural networks, and physics-informed machine learning.',
    tags: ['AutoDiff', 'Gradients', 'Optimization'],
    color: 'purple',
  },
  {
    slug: 'symbolic-computation',
    icon: BookOpen,
    title: 'Symbolic Computation',
    description: 'Built-in symbolic algebra engine for equation manipulation, simplification, and analytical solutions.',
    tags: ['Symbolic Math', 'Equation Solving', 'Calculus'],
    color: 'green',
  },
  {
    slug: 'probabilistic-programming',
    icon: Users,
    title: 'Probabilistic Programming',
    description: 'Bayesian inference and stochastic modeling with simple, intuitive syntax for statistical computing.',
    tags: ['Bayesian', 'MCMC', 'Stochastic'],
    color: 'amber',
  },
  {
    slug: 'metaprogramming',
    icon: Cpu,
    title: 'Metaprogramming',
    description: 'Powerful compile-time code generation and DSL support for domain-specific optimizations.',
    tags: ['Macros', 'Code Generation', 'DSL'],
    color: 'cyan',
  },
  {
    slug: 'functional-programming',
    icon: Gauge,
    title: 'Functional Programming',
    description: 'First-class functions, immutability, and pattern matching for clean, maintainable code.',
    tags: ['Higher-Order', 'Pattern Matching', 'Immutability'],
    color: 'purple',
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
            Powerful Features for Modern Computing
          </h1>
          <p className="mt-4 text-lg text-content-dark-secondary max-w-2xl mx-auto">
            Fortran² brings together the best of traditional Fortran performance with 
            modern language features designed for computational science.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.slug} href={`/features/${feature.slug}`}>
              <Card hover className={`h-full border ${colorClasses[feature.color as keyof typeof colorClasses].border}`}>
                <CardContent className="pt-6">
                  <div className={`h-14 w-14 rounded-xl ${colorClasses[feature.color as keyof typeof colorClasses].bg} flex items-center justify-center mb-5`}>
                    <feature.icon className={`h-7 w-7 ${colorClasses[feature.color as keyof typeof colorClasses].text}`} />
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
