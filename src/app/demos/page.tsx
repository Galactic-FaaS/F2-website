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
  Sparkles
} from 'lucide-react';

type DemoType = 'arithmetic' | 'symbolic' | 'probabilistic' | 'differentiable';

const demoInfo = {
  arithmetic: {
    id: 'arithmetic' as DemoType,
    title: 'Advanced Arithmetic',
    description: 'Explore arbitrary precision, interval arithmetic, and dual number computation',
    icon: Calculator,
    color: 'text-brand-cyan',
    bgColor: 'bg-brand-cyan/10',
    borderColor: 'border-brand-cyan/30',
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
    color: 'text-brand-purple',
    bgColor: 'bg-brand-purple/10',
    borderColor: 'border-brand-purple/30',
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
    color: 'text-brand-green',
    bgColor: 'bg-brand-green/10',
    borderColor: 'border-brand-green/30',
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
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
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
    <div className="min-h-screen bg-surface-dark-primary">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh opacity-50" />
        <div className="absolute inset-0 bg-gradient-radial from-brand-cyan/5 to-transparent" />
        
        <Container className="relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="primary" className="mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Interactive Demos
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold font-heading text-content-dark-primary mb-6">
              Explore Fortran² Capabilities
            </h1>
            <p className="text-xl text-content-dark-secondary mb-8">
              Experience the power of Fortran² through interactive computation demos. 
              See firsthand how advanced mathematical systems work in practice.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {demos.map((demo) => (
                <Button
                  key={demo.id}
                  variant={activeDemo === demo.id ? 'primary' : 'secondary'}
                  onClick={() => setActiveDemo(activeDemo === demo.id ? null : demo.id)}
                  className="gap-2"
                >
                  <demo.icon className="w-4 h-4" />
                  {demo.title}
                </Button>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Demo Content */}
      <section className="py-12">
        <Container>
          {activeDemo ? (
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveDemo(null)}
                  className="gap-2"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Back to all demos
                </Button>
              </div>
              
              {activeDemo === 'arithmetic' && <ArithmeticDemo />}
              {activeDemo === 'symbolic' && <SymbolicDemo />}
              {activeDemo === 'probabilistic' && <ProbabilisticDemo />}
              {activeDemo === 'differentiable' && <DifferentiableDemo />}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {demos.map((demo) => {
                const Icon = demo.icon;
                return (
                  <Card 
                    key={demo.id}
                    variant="outlined"
                    className={`group cursor-pointer transition-all duration-300 hover:shadow-glow-sm ${demo.borderColor}`}
                    onClick={() => setActiveDemo(demo.id)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-lg ${demo.bgColor}`}>
                          <Icon className={`w-6 h-6 ${demo.color}`} />
                        </div>
                        <ArrowRight className="w-5 h-5 text-content-dark-tertiary group-hover:text-brand-cyan group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-xl mb-2">{demo.title}</CardTitle>
                      <CardDescription className="text-content-dark-secondary">
                        {demo.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter>
                      <ul className="space-y-2">
                        {demo.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-content-dark-tertiary">
                            <div className={`w-1.5 h-1.5 rounded-full ${demo.color.replace('text-', 'bg-')}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* Getting Started Section */}
      {!activeDemo && (
        <section className="py-16 border-t border-border-dark">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-heading text-content-dark-primary mb-4">
                Ready to Try Fortran²?
              </h2>
              <p className="text-content-dark-secondary mb-8">
                Download the latest version and start exploring advanced numerical computing capabilities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/downloads">
                  <Button variant="primary" size="lg" className="gap-2">
                    Download Fortran²
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button variant="secondary" size="lg">
                    Read Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}

export default function DemosPage() {
  return <DemosContent />;
}
