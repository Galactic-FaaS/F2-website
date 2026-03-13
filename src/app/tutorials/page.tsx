import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Code, Zap } from 'lucide-react';

interface Tutorial {
  slug: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
}

const tutorials: Tutorial[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started with Fortran²',
    description: 'Complete tutorial for beginners. Install Fortran², set up your environment, and write your first program.',
    level: 'Beginner',
    duration: '30 minutes',
    category: 'Fundamentals',
  },
  {
    slug: 'your-first-simulation',
    title: 'Your First Simulation',
    description: 'Build your first scientific simulation from scratch. Learn simulation fundamentals and practical implementation.',
    level: 'Beginner',
    duration: '45 minutes',
    category: 'Simulation',
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  Fundamentals: <BookOpen className="h-5 w-5" />,
  Simulation: <Zap className="h-5 w-5" />,
  'Machine Learning': <Code className="h-5 w-5" />,
};

const levelColors: Record<string, string> = {
  Beginner: 'bg-green-500/10 text-green-400 border-green-500/20',
  Intermediate: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Advanced: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export default function TutorialsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <Container>
          {/* Header */}
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4">
              Tutorials
            </Badge>
            <h1 className="font-heading text-4xl font-bold text-content-dark-primary md:text-5xl">
              Fortran² <span className="text-brand-cyan">Tutorials</span>
            </h1>
            <p className="mt-4 text-lg text-content-dark-secondary max-w-2xl">
              Step-by-step guides to help you learn Fortran² from scratch and build
              real-world scientific applications.
            </p>
          </div>

          {/* Tutorials Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {tutorials.map((tutorial) => (
              <Link key={tutorial.slug} href={`/tutorials/${tutorial.slug}`}>
                <Card className="h-full transition-all duration-200 hover:border-brand-cyan/50 hover:shadow-glow-sm group">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-cyan/10 text-brand-cyan">
                          {categoryIcons[tutorial.category]}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {tutorial.category}
                        </Badge>
                      </div>
                      <Badge className={`text-xs ${levelColors[tutorial.level]}`}>
                        {tutorial.level}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4 text-xl group-hover:text-brand-cyan transition-colors">
                      {tutorial.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {tutorial.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-content-dark-tertiary">
                        {tutorial.duration}
                      </span>
                      <span className="flex items-center gap-1 text-sm font-medium text-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity">
                        Start Tutorial <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* More Coming Soon */}
          <div className="mt-12 rounded-xl border border-dashed border-border-dark p-8 text-center">
            <h3 className="font-heading text-lg font-bold text-content-dark-primary">
              More Tutorials Coming Soon
            </h3>
            <p className="mt-2 text-content-dark-secondary">
              We're working on more tutorials covering machine learning, data science,
              and advanced simulation techniques.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {['Machine Learning', 'Data Science', 'Advanced Simulation', 'GPU Computing'].map(
                (topic) => (
                  <Badge key={topic} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                )
              )}
            </div>
          </div>

          {/* Quick Start Section */}
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-bold text-content-dark-primary mb-6">
              Quick Start
            </h2>
            <div className="rounded-xl bg-surface-dark border border-border-dark p-6">
              <pre className="overflow-x-auto text-sm text-content-dark-secondary">
                <code>{`# Install Fortran²
pip install fortran2

# Create a new project
f2 new my-project

# Run your first program
f2 run hello.f90`}</code>
              </pre>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
