'use client';

import { useParams, notFound } from 'next/navigation';
import { DocContent, TableOfContents, VersionBanner } from '@/components/docs';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Clock, Star } from 'lucide-react';

// This would normally come from a database or file system
// For now, we'll have a simple mapping
const docsData: Record<string, { 
  title: string; 
  description: string;
  content: string;
  toc: { id: string; title: string; level: number }[];
  lastUpdated: string;
  isNew?: boolean;
  compatibility?: 'full' | 'partial' | 'deprecated' | 'experimental';
}> = {
  'v3.0/getting-started': {
    title: 'Getting Started',
    description: 'Learn how to install Fortran² and write your first program',
    content: '',
    toc: [
      { id: 'introduction', title: 'Introduction', level: 2 },
      { id: 'installation', title: 'Installation', level: 2 },
      { id: 'quick-start', title: 'Quick Start', level: 2 },
      { id: 'first-program', title: 'Your First Program', level: 2 },
    ],
    lastUpdated: 'January 15, 2025',
    isNew: true,
  },
  'v3.0/language-basics': {
    title: 'Language Basics',
    description: 'Core syntax, variables, types, and control flow',
    content: '',
    toc: [
      { id: 'syntax', title: 'Syntax Overview', level: 2 },
      { id: 'variables', title: 'Variables & Types', level: 2 },
      { id: 'control-flow', title: 'Control Flow', level: 2 },
      { id: 'functions', title: 'Functions & Modules', level: 2 },
    ],
    lastUpdated: 'January 10, 2025',
    compatibility: 'full',
  },
  'v3.0/advanced-arithmetic': {
    title: 'Advanced Arithmetic',
    description: 'Arbitrary precision, interval, dual, and complex numbers',
    content: '',
    toc: [
      { id: 'overview', title: 'Overview', level: 2 },
      { id: 'arbitrary-precision', title: 'Arbitrary Precision', level: 2 },
      { id: 'interval-arithmetic', title: 'Interval Arithmetic', level: 2 },
      { id: 'dual-numbers', title: 'Dual Numbers', level: 2 },
      { id: 'complex-numbers', title: 'Complex Numbers', level: 2 },
    ],
    lastUpdated: 'January 8, 2025',
  },
  'v3.0/symbolic-computation': {
    title: 'Symbolic Computation',
    description: 'Symbolic expressions, differentiation, and equation solving',
    content: '',
    toc: [
      { id: 'overview', title: 'Overview', level: 2 },
      { id: 'expressions', title: 'Symbolic Expressions', level: 2 },
      { id: 'differentiation', title: 'Differentiation', level: 2 },
      { id: 'integration', title: 'Integration', level: 2 },
      { id: 'equation-solving', title: 'Equation Solving', level: 2 },
    ],
    lastUpdated: 'January 5, 2025',
  },
  'v3.0/probabilistic': {
    title: 'Probabilistic Programming',
    description: 'Probability distributions, Bayesian inference, and MCMC',
    content: '',
    toc: [
      { id: 'overview', title: 'Overview', level: 2 },
      { id: 'distributions', title: 'Probability Distributions', level: 2 },
      { id: 'bayesian', title: 'Bayesian Inference', level: 2 },
      { id: 'mcmc', title: 'MCMC Methods', level: 2 },
      { id: 'monte-carlo', title: 'Monte Carlo Simulation', level: 2 },
    ],
    lastUpdated: 'December 20, 2024',
  },
  'v3.0/differentiable': {
    title: 'Differentiable Programming',
    description: 'Automatic differentiation, neural networks, and optimization',
    content: '',
    toc: [
      { id: 'overview', title: 'Overview', level: 2 },
      { id: 'auto-diff', title: 'Automatic Differentiation', level: 2 },
      { id: 'neural-networks', title: 'Neural Network Layers', level: 2 },
      { id: 'gradient-descent', title: 'Gradient Descent', level: 2 },
      { id: 'optimization', title: 'Optimization', level: 2 },
    ],
    lastUpdated: 'December 15, 2024',
    isNew: true,
  },
  'v3.0/api-reference': {
    title: 'API Reference',
    description: 'Complete API reference for Fortran² standard library',
    content: '',
    toc: [
      { id: 'overview', title: 'Overview', level: 2 },
      { id: 'modules', title: 'Module Reference', level: 2 },
      { id: 'functions', title: 'Function Reference', level: 2 },
      { id: 'types', title: 'Type Definitions', level: 2 },
    ],
    lastUpdated: 'January 12, 2025',
  },
};

export default function DocPage() {
  const params = useParams();
  const version = params.version as string;
  const slug = params.slug as string;
  const fullPath = `${version}/${slug}`;
  
  const doc = docsData[fullPath];
  
  if (!doc) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-content-dark-primary mb-4">Page Not Found</h1>
          <p className="text-content-dark-secondary mb-4">
            The documentation page you're looking for doesn't exist.
          </p>
          <Link 
            href={`/docs/${version}/getting-started`}
            className="text-brand-cyan hover:underline"
          >
            Go to Getting Started →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Main content */}
      <div className="flex-1 min-w-0 px-6 py-8 md:px-12">
        <div className="mx-auto max-w-4xl">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm">
            <Link 
              href={`/docs/${version}`}
              className="text-content-dark-tertiary hover:text-brand-cyan"
            >
              Docs
            </Link>
            <span className="text-content-dark-tertiary">/</span>
            <span className="text-content-dark-secondary">{doc.title}</span>
          </nav>
          
          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-h1 font-heading font-bold text-content-dark-primary">
                {doc.title}
              </h1>
              {doc.isNew && (
                <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
                  <Star className="h-3 w-3 mr-1" /> New
                </Badge>
              )}
            </div>
            <p className="text-lg text-content-dark-secondary mb-4">
              {doc.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-content-dark-tertiary">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Updated {doc.lastUpdated}
              </span>
            </div>
          </header>
          
          {/* Version compatibility banner */}
          {doc.compatibility && (
            <div className="mb-8">
              <VersionBanner compatibility={doc.compatibility} />
            </div>
          )}
          
          {/* Content - we'll render this from separate page files */}
          <DocContent>
            {doc.content || (
              // Placeholder that will be replaced by actual page content
              <div className="text-content-dark-secondary">
                <p>Loading documentation content...</p>
              </div>
            )}
          </DocContent>
          
          {/* Navigation */}
          <nav className="mt-12 flex items-center justify-between border-t border-border-dark pt-8">
            <Link 
              href={`/docs/${version}/${slug === 'getting-started' ? 'language-basics' : slug}`}
              className="group flex flex-col items-start"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">
                Previous
              </span>
              <span className="text-brand-cyan group-hover:underline">
                ← Back
              </span>
            </Link>
            <Link 
              href={`/docs/${version}/${slug === 'api-reference' ? 'differentiable' : slug}`}
              className="group flex flex-col items-end"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">
                Next
              </span>
              <span className="text-brand-cyan group-hover:underline">
                Continue →
              </span>
            </Link>
          </nav>
        </div>
      </div>
      
      {/* Table of Contents - hidden on mobile */}
      <aside className="hidden xl:block w-64 flex-shrink-0 border-l border-border-dark bg-deep-space/50 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-8 px-4">
        <TableOfContents items={doc.toc} />
      </aside>
    </div>
  );
}