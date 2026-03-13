import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Terminal, Download, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Getting Started - Fortran² Documentation',
  description: 'Learn how to install Fortran² and write your first program. Quick start guide for new users.',
};

export default function GettingStartedPage() {
  return (
    <div className="flex-1 min-w-0 px-6 py-8 md:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/docs/v3.0" className="text-content-dark-tertiary hover:text-brand-cyan">
            Docs
          </Link>
          <span className="text-content-dark-tertiary">/</span>
          <span className="text-content-dark-secondary">Getting Started</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-h1 font-heading font-bold text-content-dark-primary">
              Getting Started
            </h1>
            <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
              <CheckCircle2 className="h-3 w-3 mr-1" /> Updated
            </Badge>
          </div>
          <p className="text-lg text-content-dark-secondary">
            Learn how to install Fortran² and write your first program in just a few minutes.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12">
          {/* Introduction Section */}
          <section id="introduction">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Introduction
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² (pronounced "fortran squared") is a modern, multi-paradigm programming language 
              designed for computational science and high-performance computing. It combines the power 
              of traditional Fortran with modern language features including:
            </p>
            <ul className="space-y-2 text-content-dark-secondary ml-6">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Advanced arithmetic with arbitrary precision support</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Built-in symbolic computation capabilities</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Probabilistic programming and Bayesian inference</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Differentiable programming for machine learning</span>
              </li>
            </ul>
          </section>

          {/* Installation Section */}
          <section id="installation">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Installation
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-6">
              Fortran² can be installed using various package managers. Choose your preferred method below:
            </p>

            {/* Using Conda */}
            <div className="mb-6">
              <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
                Using Conda (Recommended)
              </h3>
              <CodeBlock
                code={`# Create a new environment with Fortran²
conda create -n fortran2 fortran2

# Activate the environment
conda activate fortran2

# Verify installation
fortran2 --version`}
                language="bash"
                filename="terminal"
              />
            </div>

            {/* Using pip */}
            <div className="mb-6">
              <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
                Using pip
              </h3>
              <CodeBlock
                code={`# Install Fortran² via pip
pip install fortran2

# Verify installation
fortran2 --version`}
                language="bash"
                filename="terminal"
              />
            </div>

            {/* From Source */}
            <div className="mb-6">
              <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
                Building from Source
              </h3>
              <CodeBlock
                code={`# Clone the repository
git clone https://github.com/fortran2/fortran2.git
cd fortran2

# Build the compiler
./configure --prefix=/usr/local
make
sudo make install

# Verify installation
fortran2 --version`}
                language="bash"
                filename="terminal"
              />
            </div>
          </section>

          {/* Quick Start Section */}
          <section id="quick-start">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Quick Start
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-6">
              Once installed, you can start using Fortran² immediately. Here's a quick overview of the workflow:
            </p>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <div className="h-10 w-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center mb-3">
                  <Terminal className="h-5 w-5 text-brand-cyan" />
                </div>
                <h4 className="font-semibold text-content-dark-primary mb-1">Write Code</h4>
                <p className="text-sm text-content-dark-secondary">
                  Create your .f2 source files using any text editor
                </p>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <div className="h-10 w-10 rounded-lg bg-brand-purple/10 flex items-center justify-center mb-3">
                  <Download className="h-5 w-5 text-brand-purple" />
                </div>
                <h4 className="font-semibold text-content-dark-primary mb-1">Compile</h4>
                <p className="text-sm text-content-dark-secondary">
                  Use the f2c compiler to build your executable
                </p>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <div className="h-10 w-10 rounded-lg bg-brand-green/10 flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-brand-green" />
                </div>
                <h4 className="font-semibold text-content-dark-primary mb-1">Run</h4>
                <p className="text-sm text-content-dark-secondary">
                  Execute your compiled program
                </p>
              </div>
            </div>
          </section>

          {/* Your First Program Section */}
          <section id="first-program">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Your First Fortran² Program
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-6">
              Let's create a simple "Hello, World!" program to verify your installation:
            </p>

            <CodeBlock
              code={`program hello
  ! This is a comment in Fortran²
  implicit none
  
  ! Print greeting to console
  print *, "Hello, World from Fortran²!"
  
end program hello`}
              language="fortran"
              filename="hello.f2"
            />

            <div className="mt-6">
              <h4 className="font-semibold text-content-dark-primary mb-2">Compile and Run</h4>
              <CodeBlock
                code={`# Compile the program
f2c hello.f2 -o hello

# Run the executable
./hello`}
                language="bash"
                filename="terminal"
              />
            </div>

            <div className="mt-4 p-4 rounded-lg bg-brand-green/10 border border-brand-green/30">
              <div className="flex items-center gap-2 text-brand-green font-medium mb-1">
                <CheckCircle2 className="h-4 w-4" />
                Expected Output
              </div>
              <code className="text-sm text-brand-green">Hello, World from Fortran²!</code>
            </div>
          </section>

          {/* Next Steps */}
          <section className="mt-12 p-6 rounded-xl bg-gradient-mesh border border-border-dark">
            <h3 className="text-h4 font-heading font-semibold text-content-dark-primary mb-3">
              Continue Learning
            </h3>
            <p className="text-content-dark-secondary mb-4">
              Now that you have Fortran² installed, continue with the Language Basics to understand 
              the core features of the language.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/docs/v3.0/language-basics"
                className="inline-flex items-center gap-2 text-brand-cyan hover:underline"
              >
                Language Basics →
              </Link>
              <Link 
                href="/docs/v3.0/advanced-arithmetic"
                className="inline-flex items-center gap-2 text-content-dark-tertiary hover:text-brand-cyan"
              >
                Advanced Arithmetic →
              </Link>
            </div>
          </section>
        </div>

        {/* Navigation */}
        <nav className="mt-12 flex items-center justify-between border-t border-border-dark pt-8">
          <div />
          <Link 
            href="/docs/v3.0/language-basics"
            className="group flex flex-col items-end"
          >
            <span className="text-sm text-content-dark-tertiary mb-1">Next</span>
            <span className="text-brand-cyan group-hover:underline">
              Language Basics →
            </span>
          </Link>
        </nav>
      </div>
    </div>
  );
}