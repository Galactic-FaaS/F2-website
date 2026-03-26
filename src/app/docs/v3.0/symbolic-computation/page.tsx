import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Info, AlertTriangle, Construction } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Symbolic Computation - Fortran² Documentation',
  description: 'Symbolic expressions, differentiation, integration, and equation solving in Fortran².',
};

export default function SymbolicComputationPage() {
  return (
    <div className="flex-1 min-w-0 px-6 py-8 md:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/docs/v3.0" className="text-content-dark-tertiary hover:text-brand-cyan">
            Docs
          </Link>
          <span className="text-content-dark-tertiary">/</span>
          <span className="text-content-dark-secondary">Symbolic Computation</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-h1 font-heading font-bold text-content-dark-primary">
              Symbolic Computation
            </h1>
            <Badge variant="primary" className="bg-amber-500/20 text-amber-500">
              <Construction className="h-3 w-3 mr-1" /> 30% Implemented
            </Badge>
          </div>
          <p className="text-lg text-content-dark-secondary">
            Fortran² provides symbolic mathematics capabilities including expression manipulation, 
            differentiation, and pattern matching. This module is currently under active development.
          </p>
        </header>

        {/* Implementation Status Warning */}
        <div className="mb-8 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
          <div className="flex items-center gap-2 text-amber-500 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-medium">Work in Progress</span>
          </div>
          <p className="text-sm text-content-dark-secondary">
            The symbolic computation module is approximately 30% complete. Basic expression manipulation 
            and pattern matching are available, but advanced features like integration and differential 
            equation solving are still being implemented.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Overview */}
          <section id="overview">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Overview
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              The symbolic module enables exact mathematical computations without numerical approximation. 
              When complete, this will support:
            </p>
            <ul className="space-y-2 text-content-dark-secondary ml-6">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Symbolic expression representation and manipulation</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Pattern matching for expression transformation</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Symbolic differentiation (planned)</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Equation solving (planned)</span>
              </li>
            </ul>
          </section>

          {/* Symbolic Function Definition */}
          <section id="symbolic-functions">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Symbolic Functions
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Define symbolic functions using the <code className="text-brand-cyan">symbolic</code> keyword 
              with pattern matching:
            </p>

            <CodeBlock
              code={`! Define a symbolic function with pattern matching
symbolic function simplify(expr)
    match expr {
        case Add(x, y) when x == 0 => y           ! 0 + y = y
        case Add(x, y) when y == 0 => x           ! x + 0 = x
        case Mul(x, y) when x == 1 => y           ! 1 * y = y
        case Mul(x, y) when x == 0 => 0           ! 0 * y = 0
        case Mul(x, y) when y == 1 => x           ! x * 1 = x
        case Pow(x, n) when n == 0 => 1           ! x^0 = 1
        case Pow(x, n) when n == 1 => x           ! x^1 = x
        case _ => expr                             ! No simplification
    }
end function`}
              language="fortran"
              filename="simplify.f2"
            />
          </section>

          {/* Expression Trees */}
          <section id="expressions">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Expression Trees
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Symbolic expressions are represented as trees that can be constructed and manipulated:
            </p>

            <CodeBlock
              code={`! Create symbolic expressions
let x = symvar("x")
let y = symvar("y")

! Build expressions
let expr = x**2 + 2*x*y + y**2       ! (x + y)^2
let trig = sin(x) + cos(y)           ! Trigonometric
let exp_expr = exp(x) * y            ! Exponential

! Expression operations (partially implemented)
let simplified = simplify(expr)
let expanded = expand(expr)
let factored = factor(expr)

! String conversion
print("Expression: {expr}")
print("LaTeX form: {expr.to_latex()}")`}
              language="fortran"
              filename="expressions.f2"
            />
          </section>

          {/* Pattern Matching */}
          <section id="pattern-matching">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Pattern Matching
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary" className="bg-amber-500/20 text-amber-500">
                50% Implemented
              </Badge>
              <span className="text-sm text-content-dark-tertiary">Pattern matching is partially available</span>
            </div>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Use pattern matching to transform symbolic expressions:
            </p>

            <CodeBlock
              code={`! Pattern matching for symbolic transformation
symbolic function derivative(expr, var)
    match expr {
        case Const(c) => 0                         ! d/dx(c) = 0
        case Var(v) when v == var => 1             ! d/dx(x) = 1
        case Var(v) when v != var => 0             ! d/dx(y) = 0
        case Add(f, g) => derivative(f, var) + derivative(g, var)
        case Mul(f, g) => f * derivative(g, var) + g * derivative(f, var)
        case Pow(f, n) => n * f**(n-1) * derivative(f, var)
        case Sin(f) => cos(f) * derivative(f, var)
        case Cos(f) => -sin(f) * derivative(f, var)
        case Exp(f) => exp(f) * derivative(f, var)
        case Log(f) => derivative(f, var) / f
        case _ => error("Unknown expression type")
    }
end function`}
              language="fortran"
              filename="derivative.f2"
            />
          </section>

          {/* Planned Features */}
          <section id="planned">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Planned Features
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              The following features are planned for future releases:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-surface-dark border border-border-dark">
                <h4 className="font-medium text-content-dark-primary mb-2">Integration</h4>
                <p className="text-sm text-content-dark-secondary">
                  Symbolic definite and indefinite integration using the Risch algorithm.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark border border-border-dark">
                <h4 className="font-medium text-content-dark-primary mb-2">Equation Solving</h4>
                <p className="text-sm text-content-dark-secondary">
                  Solve algebraic equations and systems of equations symbolically.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark border border-border-dark">
                <h4 className="font-medium text-content-dark-primary mb-2">Differential Equations</h4>
                <p className="text-sm text-content-dark-secondary">
                  Symbolic solutions to ODEs with initial/boundary conditions.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark border border-border-dark">
                <h4 className="font-medium text-content-dark-primary mb-2">LaTeX Export</h4>
                <p className="text-sm text-content-dark-secondary">
                  Convert symbolic expressions to LaTeX notation for documentation.
                </p>
              </div>
            </div>
          </section>

          {/* Current Limitations */}
          <section id="limitations">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Current Limitations
            </h2>
            <div className="p-4 rounded-lg bg-surface-dark border border-border-dark">
              <ul className="space-y-2 text-content-dark-secondary">
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">⚠️</span>
                  <span>Integration is not yet implemented - use numerical methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">⚠️</span>
                  <span>Equation solving is limited to simple polynomial forms</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">⚠️</span>
                  <span>Differential equation solving is not available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">⚠️</span>
                  <span>Pattern matching supports basic expression types only</span>
                </li>
              </ul>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30">
              <div className="flex items-center gap-2 text-brand-cyan mb-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">Alternative: Automatic Differentiation</span>
              </div>
              <p className="text-sm text-content-dark-secondary">
                For computing derivatives, consider using the <Link href="/docs/v3.0/differentiable" className="text-brand-cyan hover:underline">Differentiable Programming</Link> module, 
                which is production-ready and supports 23 operations.
              </p>
            </div>
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex items-center justify-between border-t border-border-dark pt-8">
            <Link 
              href="/docs/v3.0/probabilistic"
              className="group flex flex-col items-start"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">Previous</span>
              <span className="text-brand-cyan group-hover:underline">← Probabilistic Programming</span>
            </Link>
            <Link 
              href="/docs/v3.0/api-reference"
              className="group flex flex-col items-end"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">Next</span>
              <span className="text-brand-cyan group-hover:underline">
                API Reference →
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
