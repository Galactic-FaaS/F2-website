import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Info, Sigma } from 'lucide-react';

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
            <Badge variant="primary" className="bg-brand-purple/20 text-brand-purple">
              <Sigma className="h-3 w-3 mr-1" /> Core Feature
            </Badge>
          </div>
          <p className="text-lg text-content-dark-secondary">
            Fortran² provides powerful symbolic mathematics capabilities including expression manipulation, 
            differentiation, integration, and equation solving.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12">
          {/* Overview */}
          <section id="overview">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Overview
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              The symbolic module enables exact mathematical computations without numerical approximation. 
              This is essential for:
            </p>
            <ul className="space-y-2 text-content-dark-secondary ml-6">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Deriving analytical solutions to differential equations</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Computing exact derivatives for optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Simplifying mathematical expressions</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Solving equations symbolically</span>
              </li>
            </ul>
          </section>

          {/* Symbolic Expressions */}
          <section id="expressions">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Symbolic Expressions
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Create and manipulate symbolic expressions using the <code className="text-brand-cyan">symbolic</code> module.
            </p>

            <CodeBlock
              code={`use symbolic
implicit none

type(symexpr) :: x, y, expr, result

! Define symbolic variables
x = symvar("x")
y = symvar("y")

! Create expressions
expr = x**2 + 2*x*y + y**2       ! (x + y)^2
expr = sin(x) + cos(y)           ! Trigonometric
expr = exp(x) * y                 ! Exponential
expr = log(x) / x                ! Logarithmic

! Simplify expressions
result = simplify(expr)

! Factor expressions
result = factor(expr)

! Expand expressions
result = expand((x + 1)**3)`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Expression Manipulation
            </h3>
            <CodeBlock
              code={`use symbolic
implicit none

type(symexpr) :: x, y, expr, subexpr

x = symvar("x")
y = symvar("y")

! Create complex expression
expr = (x + y)**2 - (x - y)**2

! Substitution
subexpr = expr%subs(x, symreal(2.0))  ! Replace x with 2

! Pattern matching
if (expr%has(x**2)) then
  print *, "Expression contains x^2"
end if

! Partial evaluation
subexpr = expr%eval(y, 1.0)  ! Evaluate at y=1

! Convert to string
print *, "Expression: ", expr%to_string()
print *, "LaTeX:      ", expr%to_latex()`}
              language="fortran"
            />
          </section>

          {/* Differentiation */}
          <section id="differentiation">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Differentiation
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Compute exact derivatives symbolically. This is more accurate than numerical differentiation 
              and more general than automatic differentiation.
            </p>

            <CodeBlock
              code={`use symbolic
implicit none

type(symexpr) :: x, y, f, df

! Define variable
x = symvar("x")

! Differentiate various functions
f = x**3 + 2*x**2 - 5*x + 1
df = f%diff(x)                    ! 3*x^2 + 4*x - 5

f = sin(x) * exp(x)
df = f%diff(x)                    ! exp(x)*sin(x) + exp(x)*cos(x)

f = log(x**2 + 1)
df = f%diff(x)                    ! 2*x / (x^2 + 1)

! Simplify the result
df = simplify(df)
print *, "Derivative: ", df%to_string()`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Partial Derivatives
            </h3>
            <CodeBlock
              code={`use symbolic
implicit none

type(symexpr) :: x, y, z, f, df

! Multi-variable functions
x = symvar("x")
y = symvar("y")
z = symvar("z")

f = x**2 + y**2 + z**2 + 2*x*y*z

! Partial derivatives
df = f%diff(x)    ! 2*x + 2*y*z
df = f%diff(y)    ! 2*y + 2*x*z
df = f%diff(z)    ! 2*z + 2*x*y

! Mixed partials
df = f%diff(x)%diff(y)  ! 2*z
df = f%diff(x, 2)      ! Second derivative d²f/dx² = 2`}
              language="fortran"
            />
          </section>

          {/* Integration */}
          <section id="integration">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Integration
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² can compute both definite and indefinite integrals symbolically.
            </p>

            <CodeBlock
              code={`use symbolic
implicit none

type(symexpr) :: x, f, F

x = symvar("x")

! Indefinite integrals
f = x**2
F = f%integrate(x)               ! x^3/3 + C

f = 1/(x**2 + 1)
F = f%integrate(x)               ! atan(x) + C

f = sin(x) * exp(x)
F = f%integrate(x)               ! (e^x * (sin(x) - cos(x))) / 2

! Definite integrals
F = f%integrate(x, 0.0, 1.0)    ! Integral from 0 to 1

F = (1/x)%integrate(x, 1.0, 2.0) ! ln(2)`}
              language="fortran"
            />

            <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">Note</span>
              </div>
              <p className="text-sm text-content-dark-secondary">
                Not all integrals have closed-form symbolic solutions. Fortran² uses the Risch algorithm 
                and will return a numerical approximation when symbolic integration is not possible.
              </p>
            </div>
          </section>

          {/* Equation Solving */}
          <section id="equation-solving">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Equation Solving
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Solve equations and systems of equations symbolically.
            </p>

            <CodeBlock
              code={`use symbolic
implicit none

type(symexpr) :: x, y, eq, solutions

! Solve single equation
x = symvar("x")
eq = x**2 - 4

solutions = solve(eq, x)          ! {2, -2}

! Solve with transformations
eq = sin(x) - 0.5
solutions = solve(eq, x)          ! {pi/6, 5*pi/6} + 2*pi*n

! Quadratic formula
eq = a*x**2 + b*x + c            ! Need to use symbolic parameters
! Note: Would need to define a, b, c as symbolic constants

! Solve systems of equations
x = symvar("x")
y = symvar("y")

eq1 = x + y - 3
eq2 = x - y - 1

solutions = solve_system([eq1, eq2], [x, y])  ! x=2, y=1`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Differential Equations
            </h3>
            <CodeBlock
              code={`use symbolic
implicit none

type(symexpr) :: x, y, y_prime, eq, solution
type(ode_params) :: params

! Define dependent variable
x = symvar("x")
y = symfunction("y", x)

! First order ODE: dy/dx = y
y_prime = y%diff(x)
eq = y_prime - y

solution = dsolve(eq, y)
print *, "Solution: ", solution%to_string()  ! C1 * e^x

! Second order ODE: y'' + y = 0
y_prime = y%diff(x)
eq = y_prime%diff(x) + y

solution = dsolve(eq, y)
print *, "Solution: ", solution%to_string()  ! C1*cos(x) + C2*sin(x)

! With initial conditions
params%ic(1) = 0.0    ! y(0) = 0
params%ic(2) = 1.0    ! y'(0) = 1

solution = dsolve(eq, y, params)  ! y = sin(x)`}
              language="fortran"
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex items-center justify-between border-t border-border-dark pt-8">
            <Link 
              href="/docs/v3.0/advanced-arithmetic"
              className="group flex flex-col items-start"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">Previous</span>
              <span className="text-brand-cyan group-hover:underline">← Advanced Arithmetic</span>
            </Link>
            <Link 
              href="/docs/v3.0/probabilistic"
              className="group flex flex-col items-end"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">Next</span>
              <span className="text-brand-cyan group-hover:underline">
                Probabilistic Programming →
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}