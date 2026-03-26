'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/ui/code-block';
import { 
  ArrowRight, 
  Zap, 
  Code2, 
  BookOpen, 
  Download, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Github,
  Terminal,
  Cpu,
  Layers,
  GitBranch,
  Play,
  Sparkles
} from 'lucide-react';

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

const stats = [
  { label: 'Implementation', value: '~85%', icon: Cpu },
  { label: 'Backend', value: 'LLVM', icon: Layers },
  { label: 'File Types', value: '.f2, .f90', icon: Terminal },
  { label: 'License', value: 'Open Source', icon: GitBranch },
];

const terminalCommands = [
  { command: 'git clone https://github.com/kadean/fortran2.git', output: 'Cloning repository...' },
  { command: 'cd fortran2 && mkdir build && cd build', output: '' },
  { command: 'cmake .. -DCMAKE_BUILD_TYPE=Release', output: 'Configuring build...' },
  { command: 'make -j$(nproc)', output: 'Building compiler...' },
  { command: './f2c examples/neural_network.f2', output: 'Compiling neural_network.f2...' },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section - agpt.co inspired */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-100 via-carbon-gray-90 to-carbon-blue-100" />
        
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 hero-mesh opacity-60" />
        
        {/* Animated Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-carbon-blue-60/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-teal/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,98,254,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(15,98,254,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <Container className="relative z-10 py-20">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-carbon-gray-90/80 backdrop-blur-sm border border-carbon-gray-80 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
                </span>
                <span className="text-carbon-sm text-carbon-gray-30">
                  ~85% Complete • Active Development
                </span>
              </div>
              
              {/* Headline */}
              <h1 className="text-carbon-display-01 font-light text-carbon-gray-10 leading-tight">
                The Future of
                <span className="block mt-2 bg-gradient-to-r from-carbon-blue-40 via-accent-cyan to-accent-teal bg-clip-text text-transparent">
                  Scientific Computing
                </span>
              </h1>
              
              {/* Description */}
              <p className="mt-6 text-carbon-lg text-carbon-gray-30 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Fortran² is a modern superset of Fortran designed by Kadean Lewis. Multi-paradigm programming 
                with advanced arithmetic, differentiable programming, probabilistic inference, and symbolic computation.
              </p>
              
              {/* CTA Buttons */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link href="/docs/v3.0/getting-started">
                  <Button size="xl" className="gap-2 min-w-[180px]">
                    <Sparkles className="h-5 w-5" />
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="https://github.com/kadean/fortran2" target="_blank" rel="noopener noreferrer">
                  <Button variant="ghost" size="xl" className="gap-2 min-w-[180px]">
                    <Github className="h-5 w-5" />
                    View on GitHub
                  </Button>
                </Link>
              </div>
              
              {/* Quick Stats */}
              <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-carbon-gray-80/50 flex items-center justify-center">
                      <stat.icon className="h-5 w-5 text-accent-cyan" />
                    </div>
                    <div>
                      <div className="text-carbon-sm font-semibold text-carbon-gray-10">{stat.value}</div>
                      <div className="text-carbon-xs text-carbon-gray-50">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Demo - Terminal Style */}
            <div className="relative">
              {/* Glow Effect Behind */}
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-carbon-blue-60/20 via-accent-teal/15 to-accent-purple/10 blur-2xl" />
              
              {/* Terminal Window */}
              <div className="relative bg-carbon-gray-100 border border-carbon-gray-80 rounded-carbon-lg overflow-hidden shadow-2xl">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-carbon-gray-90 border-b border-carbon-gray-80">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-status-error" />
                    <div className="w-3 h-3 rounded-full bg-status-warning" />
                    <div className="w-3 h-3 rounded-full bg-status-success" />
                  </div>
                  <span className="flex-1 text-center text-carbon-xs text-carbon-gray-50 font-mono">
                    neural_network.f2 — Fortran²
                  </span>
                </div>
                
                {/* Code Content */}
                <div className="p-6 font-mono text-carbon-sm overflow-x-auto">
                  <CodeBlock
                    code={heroCode}
                    language="fortran"
                    className="!bg-transparent !border-0 !p-0 !shadow-none"
                  />
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-accent-cyan/20 to-transparent rounded-full blur-xl animate-float" />
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-carbon-blue-60/20 to-transparent rounded-full blur-xl animate-float delay-500" />
              </div>
            </div>
          </div>
        </Container>
        
        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-carbon-gray-100 to-transparent" />
      </section>

      {/* Features Section */}
      <section className="py-24 bg-carbon-gray-100 relative">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(57,57,57,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(57,57,57,0.3)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
        
        <Container className="relative z-10">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">
              Core Features
            </Badge>
            <h2 className="text-carbon-4xl font-semibold text-carbon-gray-10">
              Production-Ready Scientific Computing
            </h2>
            <p className="mt-4 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
              Hand-optimized assembly kernels, SIMD vectorization (AVX-512, ARM NEON), and 
              LLVM native code generation for maximum performance.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href}>
                <Card hover className="h-full group relative overflow-hidden">
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-carbon-blue-60/5 to-accent-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <CardContent className="pt-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="h-12 w-12 rounded-lg bg-carbon-blue-60/10 flex items-center justify-center group-hover:bg-carbon-blue-60/20 transition-colors">
                        <feature.icon className="h-6 w-6 text-carbon-blue-40 group-hover:text-carbon-blue-30 transition-colors" />
                      </div>
                      {feature.status === 'production' ? (
                        <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-status-success/10 text-carbon-xs text-status-success">
                          <CheckCircle className="h-3 w-3" />
                          Production
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-status-warning/10 text-carbon-xs text-status-warning">
                          <AlertCircle className="h-3 w-3" />
                          Partial
                        </span>
                      )}
                    </div>
                    <h3 className="text-carbon-lg font-semibold text-carbon-gray-10 group-hover:text-white transition-colors">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-carbon-sm text-carbon-gray-40 group-hover:text-carbon-gray-30 transition-colors">
                      {feature.description}
                    </p>
                  </CardContent>
                  
                  {/* Bottom Border Animation */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-carbon-blue-60 to-accent-teal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Terminal Demo Section */}
      <section className="py-24 bg-carbon-gray-90 relative overflow-hidden">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Content */}
            <div>
              <Badge variant="secondary" className="mb-4">
                Quick Start
              </Badge>
              <h2 className="text-carbon-4xl font-semibold text-carbon-gray-10">
                Build from Source
              </h2>
              <p className="mt-4 text-carbon-lg text-carbon-gray-30">
                Get started with Fortran² in minutes. Clone the repository and build the LLVM-based 
                compiler with CMake.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  'LLVM 15+ toolchain required',
                  'CMake 3.20+ build system',
                  'C++17 compatible compiler',
                  'Optional: Python 3.8+ for bindings',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-carbon-gray-30">
                    <div className="h-5 w-5 rounded-full bg-status-success/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-status-success" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 flex gap-4">
                <Link href="/downloads">
                  <Button size="lg" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </Link>
                <Link href="/docs/v3.0/getting-started">
                  <Button variant="secondary" size="lg" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Documentation
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Terminal */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-carbon-blue-60/10 blur-2xl" />
              <div className="relative bg-carbon-gray-100 border border-carbon-gray-80 rounded-carbon-lg overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-carbon-gray-90 border-b border-carbon-gray-80">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-status-error" />
                    <div className="w-3 h-3 rounded-full bg-status-warning" />
                    <div className="w-3 h-3 rounded-full bg-status-success" />
                  </div>
                  <span className="flex-1 text-center text-carbon-xs text-carbon-gray-50 font-mono">
                    Terminal — bash
                  </span>
                </div>
                
                {/* Terminal Content */}
                <div className="p-4 font-mono text-carbon-sm space-y-2">
                  {terminalCommands.map((cmd, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex gap-2">
                        <span className="text-accent-teal">$</span>
                        <span className="text-carbon-gray-10">{cmd.command}</span>
                      </div>
                      {cmd.output && (
                        <div className="text-carbon-gray-50 pl-4">{cmd.output}</div>
                      )}
                    </div>
                  ))}
                  <div className="flex gap-2 mt-4">
                    <span className="text-accent-teal">$</span>
                    <span className="inline-block w-2 h-4 bg-carbon-gray-30 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-carbon-gray-100 border-y border-carbon-gray-80">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: '~85%', label: 'Implementation Complete' },
              { value: '23+', label: 'AD Operations' },
              { value: '15+', label: 'Probability Distributions' },
              { value: '100%', label: 'Open Source' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-carbon-4xl font-light bg-gradient-to-r from-carbon-blue-40 to-accent-cyan bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="mt-2 text-carbon-sm text-carbon-gray-40">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-90 via-carbon-blue-100 to-carbon-gray-100" />
        <div className="absolute inset-0 hero-mesh opacity-40" />
        
        <Container className="relative z-10">
          <Card className="overflow-hidden border-carbon-blue-60/30 bg-carbon-gray-90/50 backdrop-blur-xl">
            <CardContent className="p-12 md:p-16 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-carbon-blue-60/10 mb-6">
                <Play className="h-8 w-8 text-carbon-blue-40" />
              </div>
              <h2 className="text-carbon-4xl font-semibold text-carbon-gray-10">
                Start Building Today
              </h2>
              <p className="mt-4 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
                Join the future of scientific computing. Clone the repository and build the LLVM-based compiler. 
                Start exploring modern Fortran with advanced arithmetic systems today.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/docs/v3.0/getting-started">
                  <Button size="xl" className="gap-2 min-w-[200px]">
                    <Sparkles className="h-5 w-5" />
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/downloads">
                  <Button variant="secondary" size="xl" className="gap-2 min-w-[200px]">
                    <Download className="h-5 w-5" />
                    Download
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
