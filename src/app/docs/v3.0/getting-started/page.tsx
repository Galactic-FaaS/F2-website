import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Terminal, Download, BookOpen, AlertCircle } from 'lucide-react';

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
              <CheckCircle2 className="h-3 w-3 mr-1" /> ~85% Complete
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
              Fortran² (pronounced "fortran squared") is a modern superset of Fortran designed to evolve 
              from a scientific computing language into a general-purpose programming language while 
              maintaining complete backward compatibility. Designed by <strong>Kadean Lewis</strong> and 
              developed by the Fortran² Development Team at GLCTC Corp.
            </p>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              The language combines multi-paradigm programming with cutting-edge arithmetic systems:
            </p>
            <ul className="space-y-2 text-content-dark-secondary ml-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                <span><strong>IEEE 754 Arithmetic:</strong> Binary16, Binary32, Binary64, Decimal64</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                <span><strong>Arbitrary Precision:</strong> BigInt and BigFloat with assembly kernels</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                <span><strong>Automatic Differentiation:</strong> Tape-based reverse-mode AD</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                <span><strong>Probabilistic Programming:</strong> 15+ distributions with MCMC samplers</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                <span><strong>Posit Arithmetic:</strong> 8, 16, 32, 64-bit with quire accumulators</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span><strong>Symbolic Computation:</strong> 30% complete (in development)</span>
              </li>
            </ul>
          </section>

          {/* Prerequisites Section */}
          <section id="prerequisites">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Prerequisites
            </h2>
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2">System Requirements</h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• Linux (Ubuntu 20.04+), Windows 10+, or macOS 11+</li>
                  <li>• x86-64 (Intel/AMD) or ARM64 (Apple Silicon)</li>
                  <li>• 4GB RAM minimum, 8GB recommended</li>
                  <li>• 2GB free space for compiler and dependencies</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2">Required Tools</h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• C++ Compiler: GCC 9+, Clang 10+, or MSVC 2019+</li>
                  <li>• CMake: Version 3.16 or later</li>
                  <li>• Git: For version control</li>
                  <li>• Python 3.8+: For build scripts and tools</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Installation Section */}
          <section id="installation">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Installation
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-6">
              Fortran² is currently in active development (~85% complete). The recommended way to install 
              is by building from source:
            </p>

            {/* From Source */}
            <div className="mb-6">
              <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
                Building from Source (Recommended)
              </h3>
              <CodeBlock
                code={`# Clone the repository with submodules
git clone --recursive https://github.com/fortransquared/fortransquared.git
cd fortransquared

# Build the compiler
mkdir build && cd build
cmake .. -DCMAKE_BUILD_TYPE=Release
make -j$(nproc)

# Install globally (optional)
sudo make install`}
                language="bash"
                filename="terminal"
              />
            </div>

            {/* Pre-built Binaries */}
            <div className="mb-6">
              <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
                Pre-built Binaries (Coming Soon)
              </h3>
              <CodeBlock
                code={`# Linux (Ubuntu/Debian) - Coming Soon
wget https://github.com/fortransquared/fortransquared/releases/latest/download/f2-linux-x64.deb
sudo dpkg -i f2-linux-x64.deb

# macOS - Coming Soon
brew install fortransquared/fortransquared/f2`}
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
              Once installed, you can start using Fortran² immediately. The unified <code className="text-brand-cyan">f2</code> command 
              provides a single entry point for all development tasks:
            </p>

            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <div className="h-10 w-10 rounded-lg bg-brand-cyan/10 flex items-center justify-center mb-3">
                  <Terminal className="h-5 w-5 text-brand-cyan" />
                </div>
                <h4 className="font-semibold text-content-dark-primary mb-1">Run Directly</h4>
                <p className="text-sm text-content-dark-secondary">
                  <code className="text-brand-cyan">f2 run file.f2</code> - Interpret and execute immediately
                </p>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <div className="h-10 w-10 rounded-lg bg-brand-purple/10 flex items-center justify-center mb-3">
                  <Download className="h-5 w-5 text-brand-purple" />
                </div>
                <h4 className="font-semibold text-content-dark-primary mb-1">Compile</h4>
                <p className="text-sm text-content-dark-secondary">
                  <code className="text-brand-purple">f2 compile file.f2</code> - Native machine code
                </p>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <div className="h-10 w-10 rounded-lg bg-brand-green/10 flex items-center justify-center mb-3">
                  <BookOpen className="h-5 w-5 text-brand-green" />
                </div>
                <h4 className="font-semibold text-content-dark-primary mb-1">Debug</h4>
                <p className="text-sm text-content-dark-secondary">
                  <code className="text-brand-green">f2 debug file.f2</code> - With integrated debugger
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
              <h4 className="font-semibold text-content-dark-primary mb-2">All Available Commands</h4>
              <div className="grid grid-cols-2 gap-2 text-sm text-content-dark-secondary">
                <div><code className="text-brand-cyan">f2 run</code> - Execute code immediately</div>
                <div><code className="text-brand-cyan">f2 compile</code> - Compile to native code</div>
                <div><code className="text-brand-cyan">f2 debug</code> - Run with debugger</div>
                <div><code className="text-brand-cyan">f2 install</code> - Package management</div>
                <div><code className="text-brand-cyan">f2 test</code> - Run test suites</div>
                <div><code className="text-brand-cyan">f2 format</code> - Code formatting</div>
                <div><code className="text-brand-cyan">f2 lint</code> - Static analysis</div>
                <div><code className="text-brand-cyan">f2 doc</code> - Generate documentation</div>
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
              code={`! hello.f2
program hello
    print("Hello, Fortran²!")
end program`}
              language="fortran"
              filename="hello.f2"
            />

            <div className="mt-6">
              <h4 className="font-semibold text-content-dark-primary mb-2">Run or Compile</h4>
              <CodeBlock
                code={`# Run directly (interpreted mode)
f2 run hello.f2

# Compile to executable
f2 compile hello.f2
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
              <code className="text-sm text-brand-green">Hello, Fortran²!</code>
            </div>
          </section>

          {/* Modern Features Example */}
          <section id="modern-features">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Modern Language Features
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-6">
              Here's a quick example showcasing Fortran²'s modern syntax:
            </p>

            <CodeBlock
              code={`! advanced.f2
program advanced_example
    use std::collections::Vec
    
    ! Modern syntax with type inference
    let numbers = [1, 2, 3, 4, 5]
    let doubled = numbers.map(|x| x * 2)
    
    ! String interpolation
    let name = "Fortran²"
    print("Welcome to {name}!")
    
    ! Collection comprehensions
    let squares = [x * x for x in 1..10]
    let evens = [x for x in 1..20 if x % 2 == 0]
    
    ! Pattern matching
    match doubled.len() {
        0 => print("Empty list"),
        n => print("List has {n} elements")
    }
    
    ! Error handling with Result types
    let result = try {
        let data = read_file("config.txt")?
        parse_config(data)?
    } catch {
        eprintln("Error: {}", error)
        return
    }
end program`}
              language="fortran"
              filename="advanced.f2"
            />
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