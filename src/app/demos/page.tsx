'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArithmeticDemo, SymbolicDemo, ProbabilisticDemo, DifferentiableDemo } from '@/components/demos';
import { 
  Calculator, 
  FunctionSquare, 
  GitBranch, 
  Brain, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Play
} from 'lucide-react';

type DemoType = 'arithmetic' | 'symbolic' | 'probabilistic' | 'differentiable';

const demoInfo = {
  arithmetic: {
    id: 'arithmetic' as DemoType,
    title: 'Advanced Arithmetic',
    description: 'Explore arbitrary precision, interval arithmetic, and dual number computation',
    icon: Calculator,
    color: 'carbon-blue-40',
    bgColor: 'bg-carbon-blue-60/10',
    borderColor: 'border-carbon-blue-60/30',
    gradient: 'from-carbon-blue-40 to-accent-cyan',
    features: [
      'Arbitrary precision (up to 256-bit)',
      'Interval arithmetic with guaranteed bounds',
      'Dual numbers for automatic differentiation',
      'Error propagation tracking'
    ]
  },
  symbolic: {
    id: 'symbolic' as DemoType,
    title: 'Symbolic Computation',
    description: 'Computer algebra system with differentiation, simplification, and equation solving',
    icon: FunctionSquare,
    color: 'accent-purple',
    bgColor: 'bg-accent-purple/10',
    borderColor: 'border-accent-purple/30',
    gradient: 'from-accent-purple to-carbon-blue-60',
    features: [
      'Symbolic differentiation',
      'Expression simplification',
      'Equation solving',
      'Symbolic integration'
    ]
  },
  probabilistic: {
    id: 'probabilistic' as DemoType,
    title: 'Probabilistic Programming',
    description: 'Bayesian inference with MCMC sampling and distribution visualization',
    icon: GitBranch,
    color: 'status-success',
    bgColor: 'bg-status-success/10',
    borderColor: 'border-status-success/30',
    gradient: 'from-status-success to-accent-teal',
    features: [
      'Bayesian inference',
      'MCMC sampling algorithms',
      'Distribution visualization',
      'Posterior analysis'
    ]
  },
  differentiable: {
    id: 'differentiable' as DemoType,
    title: 'Differentiable Programming',
    description: 'Automatic differentiation for neural networks and optimization',
    icon: Brain,
    color: 'status-warning',
    bgColor: 'bg-status-warning/10',
    borderColor: 'border-status-warning/30',
    gradient: 'from-status-warning to-amber-500',
    features: [
      'Automatic differentiation',
      'Neural network layers',
      'Gradient-based optimization',
      'Training visualization'
    ]
  }
};

function DemosContent() {
  const [activeDemo, setActiveDemo] = useState<DemoType | null>(null);

  const demos = Object.values(demoInfo);

  return (
    <div className="min-h-screen bg-carbon-gray-100">
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
              <Sparkles className="h-3 w-3 mr-1" />
              Interactive Demos
            </Badge>
            <h1 className="text-carbon-display-01 font-light text-carbon-gray-10">
              Explore
              <span className="block mt-2 bg-gradient-to-r from-carbon-blue-40 via-accent-cyan to-accent-teal bg-clip-text text-transparent">
                Fortran² Capabilities
              </span>
            </h1>
            <p className="mt-6 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
              Experience the power of Fortran² through interactive computation demos. 
              See firsthand how advanced mathematical systems work in practice.
            </p>
          </div>
        </Container>
      </section>

      {/* Demo Type Selector */}
      <section className="py-8 bg-carbon-gray-90 border-y border-carbon-gray-80">
        <Container>
          <div className="flex flex-wrap justify-center gap-3">
            {demos.map((demo) => {
              const Icon = demo.icon;
              return (
                <Button
                  key={demo.id}
                  variant={activeDemo === demo.id ? 'primary' : 'secondary'}
                  onClick={() => setActiveDemo(activeDemo === demo.id ? null : demo.id)}
                  className="gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {demo.title}
                </Button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Demo Content */}
      <section className="py-12">
        <Container>
          {activeDemo ? (
            <div className="space-y-8">
              {/* Back Button */}
              <div className="flex items-center gap-4 mb-8">
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveDemo(null)}
                  className="gap-2 text-carbon-gray-40 hover:text-carbon-gray-10"
                >
                  <ChevronRight className="h-4 w-4 rotate-180" />
                  Back to all demos
                </Button>
              </div>
              
              {/* Demo Component */}
              {activeDemo === 'arithmetic' && <ArithmeticDemo />}
              {activeDemo === 'symbolic' && <SymbolicDemo />}
              {activeDemo === 'probabilistic' && <ProbabilisticDemo />}
              {activeDemo === 'differentiable' && <DifferentiableDemo />}
            </div>
          ) : (
            /* Demo Cards Grid */
            <div className="grid gap-6 md:grid-cols-2">
              {demos.map((demo) => {
                const Icon = demo.icon;
                return (
                  <Card 
                    key={demo.id}
                    hover
                    className={`group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-carbon-blue-60/10 ${demo.borderColor} relative overflow-hidden`}
                    onClick={() => setActiveDemo(demo.id)}
                  >
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-carbon-blue-60/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-xl ${demo.bgColor} group-hover:scale-105 transition-transform`}>
                          <Icon className={`w-6 h-6 text-${demo.color}`} />
                        </div>
                        <div className="h-8 w-8 rounded-lg bg-carbon-gray-80 group-hover:bg-carbon-blue-60/20 flex items-center justify-center transition-colors">
                          <Play className="h-4 w-4 text-carbon-gray-50 group-hover:text-carbon-blue-40 transition-colors" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardTitle className="text-carbon-xl font-semibold text-carbon-gray-10 mb-2 group-hover:text-white transition-colors">
                        {demo.title}
                      </CardTitle>
                      <CardDescription className="text-carbon-gray-40">
                        {demo.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="relative z-10">
                      <ul className="space-y-2">
                        {demo.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-carbon-sm text-carbon-gray-50">
                            <span className={`h-1.5 w-1.5 rounded-full bg-${demo.color}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardFooter>
                    
                    {/* Bottom Border Animation */}
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${demo.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Getting Started Section */}
      {!activeDemo && (
        <section className="py-24 border-t border-carbon-gray-80">
          <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-90 via-carbon-blue-100 to-carbon-gray-100" />
          <div className="absolute inset-0 hero-mesh opacity-20" />
          
          <Container className="relative z-10">
            <Card className="overflow-hidden border-carbon-blue-60/30 bg-carbon-gray-90/50 backdrop-blur-xl">
              <CardContent className="p-12 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-carbon-blue-60/10 mb-6">
                  <Sparkles className="h-8 w-8 text-carbon-blue-40" />
                </div>
                <h2 className="text-carbon-4xl font-semibold text-carbon-gray-10">
                  Ready to Try Fortran²?
                </h2>
                <p className="mt-4 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
                  Download the latest version and start exploring advanced numerical computing capabilities.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link href="/downloads">
                    <Button size="lg" className="gap-2 min-w-[200px]">
                      Download Fortran²
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/docs/v3.0/getting-started">
                    <Button variant="secondary" size="lg" className="min-w-[200px]">
                      Read Documentation
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </Container>
        </section>
      )}
    </div>
  );
}

export default function DemosPage() {
  return <DemosContent />;
}