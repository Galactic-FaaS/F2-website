import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CodeBlock } from '@/components/ui/code-block';
import { 
  ArrowRight, 
  Zap, 
  Code2, 
  BookOpen, 
  Users, 
  Cpu, 
  Gauge, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Circle,
  ChevronDown,
  ChevronUp,
  Terminal,
  Layers,
  Binary,
  Braces
} from 'lucide-react';

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
    codeExample: `! Arbitrary precision arithmetic
let big = 123456789012345678901234567890BigInt
let precise = 3.14159265358979323846264338327950288BigFloat

! Posit arithmetic with quire
let p8: posit8 = 0.125
let p16: posit16 = 3.14159
let quire_result = quire_accumulate([p8, p16])

! Interval arithmetic for bounds
let x = interval(1.0, 2.0)
let y = interval(3.0, 4.0)
let z = x * y  ! interval(3.0, 8.0)`,
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
    codeExample: `! Automatic differentiation
differentiable function loss(x: real64, y: real64) -> real64 {
    gradient (x, y) reverse_mode
    let prediction = x * 2.0 + y
    let target = 10.0
    (prediction - target) ** 2
}

! Compute gradients
let (value, grads) = loss.gradient(3.0, 4.0)
print("Loss: {value}, ∂L/∂x: {grads.x}, ∂L/∂y: {grads.y}")`,
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
    codeExample: `! Probabilistic model
model linear_regression(x: Vec(real64), y: Vec(real64)) {
    let slope ~ Normal(0.0, 10.0)
    let intercept ~ Normal(0.0, 10.0)
    let noise ~ Gamma(2.0, 2.0)
    
    for i in 0..x.len() {
        y[i] ~ Normal(slope * x[i] + intercept, noise)
    }
}

! Sample from posterior
let samples = linear_regression.sample_hmc(data_x, data_y, 
    num_samples=1000, warmup=500)`,
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
    codeExample: `! Symbolic expressions
let x = Symbol("x")
let expr = x**2 + 2*x + 1

! Symbolic differentiation
let derivative = diff(expr, x)  ! 2*x + 2

! Simplification
let simplified = simplify((x + 1)**2)  ! x**2 + 2*x + 1
let expanded = expand((x + 1)**2)      ! x**2 + 2*x + 1`,
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
    codeExample: `! Generic templates
template function map<T, U>(arr: Vec<T>, f: T -> U) -> Vec<U> {
    let result = Vec<U>.with_capacity(arr.len())
    for elem in arr {
        result.push(f(elem))
    }
    result
}

! Compile-time evaluation
comptime let factorial_10 = factorial(10)
comptime let type_info = typeof(MyStruct)`,
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
    codeExample: `! Collection comprehensions
let squares = [x * x for x in 1..10]
let evens = [x for x in 1..20 if x % 2 == 0]

! Lambda expressions
let double = |x| x * 2
let add = |a, b| a + b

! Higher-order functions
let sum = [1, 2, 3, 4, 5]
    .map(|x| x * 2)
    .filter(|x| x > 5)
    .fold(0, |acc, x| acc + x)`,
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
    codeExample: `! Program synthesis (planned)
let examples = [
    (input: [1, 2, 3], output: [2, 4, 6]),
    (input: [5, 6], output: [10, 12]),
]

let synthesized = synthesize(examples)
! Result: |x| x.map(|n| n * 2)

! Pattern-based optimization
let optimized = learn_optimize(my_function, training_data)`,
  },
];

const colorClasses = {
  cyan: {
    bg: 'bg-carbon-blue-60/10',
    text: 'text-carbon-blue-40',
    border: 'border-carbon-blue-60/30',
    gradient: 'from-carbon-blue-60 to-accent-cyan',
  },
  purple: {
    bg: 'bg-accent-purple/10',
    text: 'text-accent-purple',
    border: 'border-accent-purple/30',
    gradient: 'from-accent-purple to-carbon-blue-60',
  },
  green: {
    bg: 'bg-status-success/10',
    text: 'text-status-success',
    border: 'border-status-success/30',
    gradient: 'from-status-success to-accent-teal',
  },
  amber: {
    bg: 'bg-status-warning/10',
    text: 'text-status-warning',
    border: 'border-status-warning/30',
    gradient: 'from-status-warning to-amber-600',
  },
};

const statusConfig = {
  production: {
    icon: CheckCircle,
    label: 'Production Ready',
    color: 'text-status-success',
    bgColor: 'bg-status-success/10',
    borderColor: 'border-status-success/30',
  },
  partial: {
    icon: AlertCircle,
    label: 'In Progress',
    color: 'text-status-warning',
    bgColor: 'bg-status-warning/10',
    borderColor: 'border-status-warning/30',
  },
  planned: {
    icon: Circle,
    label: 'Planned',
    color: 'text-carbon-gray-50',
    bgColor: 'bg-carbon-gray-80/50',
    borderColor: 'border-carbon-gray-70',
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-100 via-carbon-gray-90 to-carbon-blue-100" />
        <div className="absolute inset-0 hero-mesh opacity-40" />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-carbon-blue-60/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-6">
              Core Features
            </Badge>
            <h1 className="text-carbon-display-01 font-light text-carbon-gray-10">
              Multi-Paradigm
              <span className="block mt-2 bg-gradient-to-r from-carbon-blue-40 via-accent-cyan to-accent-teal bg-clip-text text-transparent">
                Scientific Computing
              </span>
            </h1>
            <p className="mt-6 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
              Fortran² is ~85% complete with production-ready advanced arithmetic, differentiable programming, 
              and probabilistic programming. Designed by Kadean Lewis @ GLCTC Corp.
            </p>
          </div>
        </Container>
      </section>

      {/* Status Legend */}
      <section className="py-8 bg-carbon-gray-90 border-y border-carbon-gray-80">
        <Container>
          <div className="flex flex-wrap justify-center gap-8">
            {(Object.entries(statusConfig) as [Status, typeof statusConfig.production][]).map(([key, config]) => (
              <div key={key} className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-lg ${config.bgColor} flex items-center justify-center`}>
                  <config.icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <span className="text-carbon-sm text-carbon-gray-30">{config.label}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-carbon-gray-100">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.slug} feature={feature} />
            ))}
          </div>
        </Container>
      </section>

      {/* Feature Categories */}
      <section className="py-24 bg-carbon-gray-90">
        <Container>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              By Status
            </Badge>
            <h2 className="text-carbon-4xl font-semibold text-carbon-gray-10">
              Implementation Progress
            </h2>
          </div>

          {/* Production Ready */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-status-success/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-status-success" />
              </div>
              <h3 className="text-carbon-2xl font-semibold text-carbon-gray-10">Production Ready</h3>
              <Badge variant="success" size="sm">{features.filter(f => f.status === 'production').length} Features</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {features.filter(f => f.status === 'production').map((feature) => (
                <Link key={feature.slug} href={`/docs/v3.0/${feature.slug}`}>
                  <Card hover className="border-status-success/20">
                    <CardContent className="py-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses].bg} flex items-center justify-center`}>
                          <feature.icon className={`h-5 w-5 ${colorClasses[feature.color as keyof typeof colorClasses].text}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-carbon-gray-10">{feature.title}</h4>
                          <p className="text-carbon-xs text-carbon-gray-50">100% Complete</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Partially Implemented */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-status-warning/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-status-warning" />
              </div>
              <h3 className="text-carbon-2xl font-semibold text-carbon-gray-10">In Development</h3>
              <Badge variant="warning" size="sm">{features.filter(f => f.status === 'partial').length} Features</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {features.filter(f => f.status === 'partial').map((feature) => (
                <Link key={feature.slug} href={`/docs/v3.0/${feature.slug}`}>
                  <Card hover className="border-status-warning/20">
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses].bg} flex items-center justify-center`}>
                            <feature.icon className={`h-5 w-5 ${colorClasses[feature.color as keyof typeof colorClasses].text}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-carbon-gray-10">{feature.title}</h4>
                            <p className="text-carbon-xs text-carbon-gray-50">{feature.percent}% Complete</p>
                          </div>
                        </div>
                        <div className="w-24 h-2 bg-carbon-gray-80 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-status-warning to-amber-500 rounded-full"
                            style={{ width: `${feature.percent}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Planned */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-carbon-gray-80/50 flex items-center justify-center">
                <Circle className="h-5 w-5 text-carbon-gray-50" />
              </div>
              <h3 className="text-carbon-2xl font-semibold text-carbon-gray-10">Planned</h3>
              <Badge variant="secondary" size="sm">{features.filter(f => f.status === 'planned').length} Features</Badge>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {features.filter(f => f.status === 'planned').map((feature) => (
                <Card key={feature.slug} className="border-carbon-gray-70 opacity-75">
                  <CardContent className="py-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses].bg} flex items-center justify-center`}>
                        <feature.icon className={`h-5 w-5 ${colorClasses[feature.color as keyof typeof colorClasses].text}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-carbon-gray-10">{feature.title}</h4>
                        <p className="text-carbon-xs text-carbon-gray-50">Coming Soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-90 via-carbon-blue-100 to-carbon-gray-100" />
        <div className="absolute inset-0 hero-mesh opacity-30" />
        
        <Container className="relative z-10">
          <Card className="overflow-hidden border-carbon-blue-60/30 bg-carbon-gray-90/50 backdrop-blur-xl">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-carbon-blue-60/10 mb-6">
                <Terminal className="h-8 w-8 text-carbon-blue-40" />
              </div>
              <h2 className="text-carbon-4xl font-semibold text-carbon-gray-10">
                Explore the Documentation
              </h2>
              <p className="mt-4 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
                Dive deep into each feature with comprehensive documentation, examples, and API references.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/docs/v3.0/getting-started">
                  <Button size="lg" className="gap-2 min-w-[180px]">
                    <BookOpen className="h-4 w-4" />
                    Read the Docs
                  </Button>
                </Link>
                <Link href="/demos">
                  <Button variant="secondary" size="lg" className="gap-2 min-w-[180px]">
                    View Examples
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}

// Feature Card Component with expandable code
function FeatureCard({ feature }: { feature: typeof features[0] }) {
  const colorClass = colorClasses[feature.color as keyof typeof colorClasses];
  const status = statusConfig[feature.status];
  
  return (
    <Link href={`/docs/v3.0/${feature.slug}`}>
      <Card hover className={`h-full group relative overflow-hidden border ${colorClass.border}`}>
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-blue-60/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardContent className="pt-6 relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className={`h-14 w-14 rounded-xl ${colorClass.bg} flex items-center justify-center group-hover:scale-105 transition-transform`}>
              <feature.icon className={`h-7 w-7 ${colorClass.text}`} />
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${status.bgColor}`}>
                <status.icon className={`h-3 w-3 ${status.color}`} />
                <span className={`text-carbon-xs ${status.color}`}>
                  {feature.status === 'partial' ? `${feature.percent}%` : status.label}
                </span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <h3 className="text-carbon-xl font-semibold text-carbon-gray-10 group-hover:text-white transition-colors">
            {feature.title}
          </h3>
          <p className="mt-3 text-carbon-sm text-carbon-gray-40 group-hover:text-carbon-gray-30 transition-colors">
            {feature.description}
          </p>
          
          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {feature.tags.map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
          </div>
          
          {/* Progress Bar for Partial */}
          {feature.status === 'partial' && (
            <div className="mt-4">
              <div className="w-full h-1.5 bg-carbon-gray-80 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${colorClass.gradient} rounded-full transition-all duration-500`}
                  style={{ width: `${feature.percent}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Bottom Border Animation */}
          <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${colorClass.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
        </CardContent>
      </Card>
    </Link>
  );
}
