import type { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowRight, 
  BookOpen, 
  Code, 
  Zap, 
  Clock,
  GraduationCap,
  Terminal,
  ChevronRight,
  Layers,
  Cpu,
  Brain,
  Database
} from 'lucide-react';

interface Tutorial {
  slug: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  prerequisites?: string[];
}

const tutorials: Tutorial[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Fortran²',
    description: 'Complete tutorial for beginners. Install Fortran², set up your environment, and write your first program.',
    level: 'Beginner',
    duration: '30 minutes',
    category: 'Fundamentals',
    prerequisites: ['Basic programming knowledge'],
  },
  {
    slug: 'your-first-simulation',
    title: 'Your First Simulation',
    description: 'Build your first scientific simulation from scratch. Learn simulation fundamentals and practical implementation.',
    level: 'Beginner',
    duration: '45 minutes',
    category: 'Simulation',
    prerequisites: ['Getting Started tutorial'],
  },
  {
    slug: 'differentiable-programming-basics',
    title: 'Differentiable Programming Basics',
    description: 'Learn the fundamentals of automatic differentiation and gradient-based optimization in Fortran².',
    level: 'Intermediate',
    duration: '1 hour',
    category: 'Machine Learning',
    prerequisites: ['Basic Fortran²', 'Calculus fundamentals'],
  },
  {
    slug: 'probabilistic-modeling',
    title: 'Building Probabilistic Models',
    description: 'Create Bayesian models using Fortran² probabilistic programming features with MCMC sampling.',
    level: 'Advanced',
    duration: '1.5 hours',
    category: 'Data Science',
    prerequisites: ['Differentiable Programming', 'Statistics basics'],
  },
  {
    slug: 'symbolic-math',
    title: 'Symbolic Mathematics',
    description: 'Explore symbolic computation, expression trees, and algebraic simplification in Fortran².',
    level: 'Intermediate',
    duration: '1 hour',
    category: 'Math',
    prerequisites: ['Basic Fortran²'],
  },
  {
    slug: 'gpu-computing',
    title: 'GPU Computing with Fortran²',
    description: 'Harness GPU acceleration for parallel scientific computations using Fortran² GPU features.',
    level: 'Advanced',
    duration: '2 hours',
    category: 'Performance',
    prerequisites: ['Intermediate Fortran²', 'GPU basics'],
  },
];

const upcomingTopics = [
  'Machine Learning',
  'Data Science',
  'Advanced Simulation',
  'GPU Computing',
  'Parallel Computing',
  'Symbolic Math',
];

const categoryConfig: Record<string, { icon: React.ReactNode; color: string; bgColor: string; borderColor: string }> = {
  Fundamentals: { 
    icon: <BookOpen className="h-5 w-5" />, 
    color: 'text-carbon-blue-40',
    bgColor: 'bg-carbon-blue-60/10',
    borderColor: 'border-carbon-blue-60/30',
  },
  Simulation: { 
    icon: <Zap className="h-5 w-5" />, 
    color: 'text-status-warning',
    bgColor: 'bg-status-warning/10',
    borderColor: 'border-status-warning/30',
  },
  'Machine Learning': { 
    icon: <Brain className="h-5 w-5" />, 
    color: 'text-accent-purple',
    bgColor: 'bg-accent-purple/10',
    borderColor: 'border-accent-purple/30',
  },
  'Data Science': { 
    icon: <Database className="h-5 w-5" />, 
    color: 'text-status-success',
    bgColor: 'bg-status-success/10',
    borderColor: 'border-status-success/30',
  },
  Math: { 
    icon: <Layers className="h-5 w-5" />, 
    color: 'text-accent-cyan',
    bgColor: 'bg-accent-cyan/10',
    borderColor: 'border-accent-cyan/30',
  },
  Performance: { 
    icon: <Cpu className="h-5 w-5" />, 
    color: 'text-accent-teal',
    bgColor: 'bg-accent-teal/10',
    borderColor: 'border-accent-teal/30',
  },
};

const levelConfig: Record<string, { color: string; bgColor: string; borderColor: string }> = {
  Beginner: { 
    color: 'text-status-success', 
    bgColor: 'bg-status-success/10',
    borderColor: 'border-status-success/30',
  },
  Intermediate: { 
    color: 'text-status-warning', 
    bgColor: 'bg-status-warning/10',
    borderColor: 'border-status-warning/30',
  },
  Advanced: { 
    color: 'text-status-error', 
    bgColor: 'bg-status-error/10',
    borderColor: 'border-status-error/30',
  },
};

export const metadata: Metadata = {
  title: 'Tutorials - Learn Fortran²',
  description: 'Step-by-step tutorials to help you learn Fortran² from scratch. Build your first simulation, explore differentiable programming, and more.',
  openGraph: {
    title: 'Tutorials - Learn Fortran²',
    description: 'Step-by-step tutorials to help you learn Fortran² from scratch.',
    url: 'https://fortran2.io/tutorials',
    siteName: 'Fortran²',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tutorials - Fortran²',
    description: 'Step-by-step tutorials to help you learn Fortran².',
  },
};

export default function TutorialsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-100 via-carbon-gray-90 to-carbon-blue-100" />
        <div className="absolute inset-0 hero-mesh opacity-40" />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-carbon-blue-60/10 rounded-full blur-3xl" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-6">
              <GraduationCap className="h-3 w-3 mr-1" />
              Tutorials
            </Badge>
            <h1 className="text-carbon-display-01 font-light text-carbon-gray-10">
              Learn
              <span className="block mt-2 bg-gradient-to-r from-carbon-blue-40 via-accent-cyan to-accent-teal bg-clip-text text-transparent">
                Fortran²
              </span>
            </h1>
            <p className="mt-6 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
              Step-by-step guides to help you learn Fortran² from scratch and build
              real-world scientific applications.
            </p>
          </div>
        </Container>
      </section>

      {/* Level Filter */}
      <section className="py-6 bg-carbon-gray-90 border-b border-carbon-gray-80">
        <Container>
          <div className="flex flex-wrap gap-2">
            <Badge variant="primary" className="cursor-pointer">All Levels</Badge>
            <Badge variant="secondary" className="cursor-pointer">Beginner</Badge>
            <Badge variant="secondary" className="cursor-pointer">Intermediate</Badge>
            <Badge variant="secondary" className="cursor-pointer">Advanced</Badge>
          </div>
        </Container>
      </section>

      {/* Tutorials Grid */}
      <section className="py-16 bg-carbon-gray-100">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tutorials.map((tutorial) => {
              const category = categoryConfig[tutorial.category] || categoryConfig['Fundamentals'];
              const level = levelConfig[tutorial.level];
              
              return (
                <Link key={tutorial.slug} href={`/tutorials/${tutorial.slug}`}>
                  <Card hover className="h-full group border-carbon-gray-80 hover:border-carbon-blue-60/30 hover:shadow-lg hover:shadow-carbon-blue-60/10 transition-all relative overflow-hidden">
                    {/* Hover Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-carbon-blue-60/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <CardHeader className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <div className={`h-10 w-10 rounded-lg ${category.bgColor} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                            <span className={category.color}>{category.icon}</span>
                          </div>
                          <Badge variant="secondary" size="sm">{tutorial.category}</Badge>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${level.bgColor} ${level.color}`}>
                          {tutorial.level}
                        </div>
                      </div>
                      <CardTitle className="text-carbon-xl font-semibold text-carbon-gray-10 group-hover:text-white transition-colors">
                        {tutorial.title}
                      </CardTitle>
                      <CardDescription className="mt-2 text-carbon-gray-40">
                        {tutorial.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="text-carbon-sm text-carbon-gray-50 flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {tutorial.duration}
                        </span>
                        <span className="flex items-center gap-1 text-carbon-sm font-medium text-carbon-blue-40 opacity-0 group-hover:opacity-100 transition-opacity">
                          Start <ArrowRight className="h-4 w-4" />
                        </span>
                      </div>
                      
                      {/* Prerequisites */}
                      {tutorial.prerequisites && tutorial.prerequisites.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-carbon-gray-80">
                          <p className="text-carbon-xs text-carbon-gray-50 mb-2">Prerequisites:</p>
                          <div className="flex flex-wrap gap-1">
                            {tutorial.prerequisites.map((prereq, i) => (
                              <Badge key={i} variant="outline" size="sm" className="text-carbon-xs">
                                {prereq}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                    
                    {/* Bottom Border Animation */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-carbon-blue-40 to-accent-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* More Coming Soon */}
      <section className="py-16 bg-carbon-gray-90">
        <Container>
          <Card className="border-carbon-gray-70 border-dashed bg-carbon-gray-80/30">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-carbon-gray-80 mb-4">
                <BookOpen className="h-7 w-7 text-carbon-gray-50" />
              </div>
              <h3 className="text-carbon-2xl font-semibold text-carbon-gray-10">
                More Tutorials Coming Soon
              </h3>
              <p className="mt-4 text-carbon-lg text-carbon-gray-40 max-w-xl mx-auto">
                We're working on more tutorials covering machine learning, data science,
                and advanced simulation techniques.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {upcomingTopics.map((topic) => (
                  <Badge key={topic} variant="secondary" size="sm">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Quick Start Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-100 via-carbon-blue-100 to-carbon-gray-100" />
        <div className="absolute inset-0 hero-mesh opacity-20" />
        
        <Container className="relative z-10">
          <Card className="overflow-hidden border-carbon-blue-60/30 bg-carbon-gray-90/50 backdrop-blur-xl">
            <div className="bg-gradient-to-r from-carbon-blue-100 via-carbon-gray-90 to-carbon-blue-100 px-8 py-8">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent-cyan/10 flex items-center justify-center">
                  <Terminal className="h-5 w-5 text-accent-cyan" />
                </div>
                <div>
                  <h2 className="text-carbon-2xl font-semibold text-carbon-gray-10">Quick Start</h2>
                  <p className="text-carbon-sm text-carbon-gray-50">Get up and running in minutes</p>
                </div>
              </div>
            </div>
            
            <CardContent className="p-0">
              <div className="p-6 font-mono text-carbon-sm bg-carbon-gray-100">
                <div className="mb-4">
                  <p className="text-carbon-gray-50"># Install Fortran²</p>
                  <p className="text-accent-cyan">pip install fortran2</p>
                </div>
                <div className="mb-4">
                  <p className="text-carbon-gray-50"># Create a new project</p>
                  <p className="text-accent-cyan">f2 new my-project</p>
                </div>
                <div>
                  <p className="text-carbon-gray-50"># Run your first program</p>
                  <p className="text-accent-cyan">f2 run hello.f90</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <Link href="/docs/v3.0/getting-started">
              <Button variant="secondary" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Read the Full Documentation
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}