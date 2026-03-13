import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, BookOpen, Code2, Zap, Users } from 'lucide-react';

const docSections = [
  {
    icon: BookOpen,
    title: 'Getting Started',
    description: 'Learn how to install Fortran² and write your first program.',
    href: '/docs/v2.0/getting-started',
    items: ['Installation', 'Hello World', 'Basic Syntax', 'Running Programs'],
  },
  {
    icon: Zap,
    title: 'Language Reference',
    description: 'Complete reference for the Fortran² language features.',
    href: '/docs/v2.0/language-reference',
    items: ['Types', 'Operators', 'Control Flow', 'Functions', 'Modules'],
  },
  {
    icon: Code2,
    title: 'Standard Library',
    description: 'Documentation for built-in modules and functions.',
    href: '/docs/v2.0/stdlib',
    items: ['Arithmetic', 'Linear Algebra', 'IO', 'Strings', 'Utilities'],
  },
  {
    icon: Users,
    title: 'Advanced Topics',
    description: 'Deep dives into advanced features and optimization.',
    href: '/docs/v2.0/advanced',
    items: ['Differentiable Programming', 'Symbolic Computation', 'Performance Tips'],
  },
];

export default function DocsPage() {
  return (
    <div className="py-24">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Documentation
          </Badge>
          <h1 className="font-heading text-4xl font-bold text-content-dark-primary sm:text-5xl">
            Learn Fortran²
          </h1>
          <p className="mt-4 text-lg text-content-dark-secondary max-w-2xl mx-auto">
            Everything you need to know about Fortran², from getting started to 
            advanced programming techniques.
          </p>
        </div>

        {/* Doc Sections */}
        <div className="grid gap-6 md:grid-cols-2">
          {docSections.map((section) => (
            <Card key={section.title} hover>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                    <section.icon className="h-6 w-6 text-brand-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-content-dark-primary">
                      {section.title}
                    </h3>
                    <p className="mt-1 text-sm text-content-dark-secondary">
                      {section.description}
                    </p>
                    <ul className="mt-4 space-y-1">
                      {section.items.map((item) => (
                        <li key={item} className="text-sm text-content-dark-tertiary">
                          • {item}
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" size="sm" className="mt-4 gap-2">
                      Learn More
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Version Selector */}
        <div className="mt-12 text-center">
          <p className="text-content-dark-tertiary">Currently viewing docs for</p>
          <div className="mt-2">
            <Badge variant="primary" className="text-sm px-4 py-2">
              Fortran² v2.0
            </Badge>
          </div>
          <p className="mt-2 text-sm text-content-dark-tertiary">
            <a href="/docs/v1.0" className="hover:text-brand-cyan transition-colors">
              View v1.0 Documentation →
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
