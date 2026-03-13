import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/ui/code-block';
import { ArrowRight, Zap, Code2, BookOpen, Download, Users } from 'lucide-react';

const heroCode = `! Fortran² - Advanced Arithmetic Example
program quantum_simulation
  use f2_arithmetic, only: qfloat, matrix_op
  use f2_differentiable, only: grad, value
  
  type(qfloat) :: state(4), hamiltonian(4,4)
  real :: energy
  
  ! Initialize quantum state
  state = qfloat([1.0, 0.0, 0.0, 0.0])
  
  ! Define Hamiltonian
  hamiltonian = matrix_op([[0,1,0,0], &
                          [1,0,0,0], &
                          [0,0,0,1], &
                          [0,0,1,0]])
  
  ! Compute energy with automatic differentiation
  call value(energy, state, hamiltonian)
  
  print *, "Ground state energy:", energy
end program quantum_simulation`;

const features = [
  {
    icon: Zap,
    title: 'Advanced Arithmetic',
    description: 'Native support for quad precision, complex numbers, and interval arithmetic out of the box.',
    href: '/features/advanced-arithmetic',
  },
  {
    icon: Code2,
    title: 'Differentiable Programming',
    description: 'Automatic differentiation for machine learning, optimization, and scientific computing.',
    href: '/features/differentiable-programming',
  },
  {
    icon: BookOpen,
    title: 'Symbolic Computation',
    description: 'Built-in symbolic algebra engine for equation manipulation and analytical solutions.',
    href: '/features/symbolic-computation',
  },
  {
    icon: Users,
    title: 'Probabilistic Programming',
    description: 'Bayesian inference and stochastic modeling with simple, intuitive syntax.',
    href: '/features/probabilistic-programming',
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
                v2.0 Now Available
              </Badge>
              <h1 className="font-heading text-4xl font-bold tracking-tight text-content-dark-primary sm:text-5xl lg:text-6xl">
                The Future of
                <span className="block mt-2 text-gradient">Scientific Computing</span>
              </h1>
              <p className="mt-6 text-lg text-content-dark-secondary max-w-xl mx-auto lg:mx-0">
                Fortran² combines the performance of classic Fortran with modern language features. 
                Advanced arithmetic, differentiable programming, and symbolic computation in one powerful package.
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
                <span>Cross-platform</span>
                <span>•</span>
                <span>MIT Licensed</span>
              </div>
            </div>

            {/* Code Demo */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-brand-cyan/20 to-brand-purple/20 blur-2xl" />
              <CodeBlock
                code={heroCode}
                language="fortran"
                filename="quantum_simulation.f90"
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
              Everything You Need for Scientific Computing
            </h2>
            <p className="mt-4 text-lg text-content-dark-secondary max-w-2xl mx-auto">
              Built from the ground up for computational science, with features that make 
              high-performance computing accessible and enjoyable.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link key={feature.href} href={feature.href}>
                <Card hover className="h-full">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-lg bg-brand-cyan/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-brand-cyan" />
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
                Download the latest release and start building your next-generation 
                scientific computing applications today.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="gap-2">
                  <Download className="h-4 w-4" />
                  Download v2.0
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
