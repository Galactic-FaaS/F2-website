import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Info, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'API Reference - Fortran² Documentation',
  description: 'Complete API reference for Fortran² standard library, modules, functions, and type definitions.',
};

export default function APIReferencePage() {
  return (
    <div className="flex-1 min-w-0 px-6 py-8 md:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/docs/v3.0" className="text-content-dark-tertiary hover:text-brand-cyan">
            Docs
          </Link>
          <span className="text-content-dark-tertiary">/</span>
          <span className="text-content-dark-secondary">API Reference</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-h1 font-heading font-bold text-content-dark-primary">
              API Reference
            </h1>
          </div>
          <p className="text-lg text-content-dark-secondary">
            Complete reference for Fortran² standard library, modules, functions, and type definitions.
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
              Fortran² provides a comprehensive standard library organized into modules. Each module 
              contains related functions, types, and subroutines.
            </p>
            
            <div className="grid gap-4 md:grid-cols-2 mb-6">
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2">Core Modules</h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code className="text-brand-cyan">fortran2</code> - Language core</li>
                  <li>• <code className="text-brand-cyan">types</code> - Type system</li>
                  <li>• <code className="text-brand-cyan">io</code> - Input/Output</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2">Computation</h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code className="text-brand-cyan">bignum</code> - Arbitrary precision</li>
                  <li>• <code className="text-brand-cyan">interval</code> - Interval arithmetic</li>
                  <li>• <code className="text-brand-cyan">dual</code> - Dual numbers</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2">Math & Science</h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code className="text-brand-cyan">symbolic</code> - Symbolic math</li>
                  <li>• <code className="text-brand-cyan">prob</code> - Probability</li>
                  <li>• <code className="text-brand-cyan">linalg</code> - Linear algebra</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2">ML & DL</h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code className="text-brand-cyan">autodiff</code> - Auto differentiation</li>
                  <li>• <code className="text-brand-cyan">nn</code> - Neural networks</li>
                  <li>• <code className="text-brand-cyan">optim</code> - Optimization</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Module Reference */}
          <section id="modules">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Module Reference
            </h2>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              bignum - Arbitrary Precision Numbers
            </h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-dark-tertiary">
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Name</th>
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Type</th>
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">bigint</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">type</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Arbitrary precision integer</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">bigfloat</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">type</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Arbitrary precision floating point</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">bigrational</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">type</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Exact rational numbers</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              symbolic - Symbolic Mathematics
            </h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-dark-tertiary">
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Name</th>
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Type</th>
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">symexpr</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">type</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Symbolic expression</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">symvar</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">function</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Create symbolic variable</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">simplify</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">function</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Simplify expression</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              prob - Probability & Statistics
            </h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-dark-tertiary">
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Name</th>
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Type</th>
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">normal_dist</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">type</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Normal (Gaussian) distribution</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">gamma_dist</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">type</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Gamma distribution</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">poisson_dist</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">type</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Poisson distribution</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Function Reference */}
          <section id="functions">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Function Reference
            </h2>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Mathematical Functions
            </h3>
            <CodeBlock
              code={`! Basic math functions
use f2_math
implicit none

real :: x, result

! Trigonometric
x = 0.5
result = sin(x)        ! Sine
result = cos(x)        ! Cosine
result = tan(x)        ! Tangent

result = asin(x)       ! Arcsine
result = acos(x)       ! Arccosine
result = atan(x)       ! Arctangent

! Hyperbolic
result = sinh(x)       ! Hyperbolic sine
result = cosh(x)       ! Hyperbolic cosine
result = tanh(x)       ! Hyperbolic tangent

! Exponential & Logarithmic
result = exp(x)        ! Exponential
result = log(x)        ! Natural log
result = log10(x)      ! Base-10 log

! Power & Root
result = sqrt(x)       ! Square root
result = cbrt(x)       ! Cube root
result = x ** 2.0      ! Power`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Linear Algebra
            </h3>
            <CodeBlock
              code={`use linalg
implicit none

real, dimension(3,3) :: A, B
real, dimension(3) :: x, y
real :: dot_prod

! Matrix operations
A = matmul(A, B)       ! Matrix multiplication
A = transpose(A)       ! Transpose
A = inverse(A)        ! Matrix inverse
real :: det = det(A)   ! Determinant

! Vector operations
dot_prod = dot(x, y)   ! Dot product
x = cross(y, z)       ! Cross product (3D)

! Solve linear system Ax = b
x = solve(A, b)

! Eigenvalues and eigenvectors
call eigenvalues(A, values, vectors)`}
              language="fortran"
            />
          </section>

          {/* Type Definitions */}
          <section id="types">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Type Definitions
            </h2>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Tensor Type
            </h3>
            <CodeBlock
              code={`use autodiff
implicit none

type(tensor) :: t, t1, t2
integer, dimension(:) :: shape

! Create tensors
t = tensor(3.14)                    ! Scalar
t = tensor([1.0, 2.0, 3.0])        ! 1D array
t = tensor(reshape([1,2,3,4], [2,2]))  ! 2D array

! Tensor properties
shape = t%shape                     ! Get shape
t%requires_grad = .true.           ! Enable gradients

! Operations
t1 = t + 2.0                       ! Addition
t1 = t * t                         ! Element-wise multiplication
t1 = matmul(t1, t2)                ! Matrix multiplication

! Indexing
t1 = t(1, :)                       ! First row
t1 = t(:, 2)                       ! Second column`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Custom Types
            </h3>
            <CodeBlock
              code={`! User-defined type for complex numbers
type :: complex_number
  real :: re
  real :: im
contains
  procedure :: add => complex_add
  procedure :: multiply => complex_multiply
  procedure :: abs => complex_abs
end type complex_number

! Define operations
complex_number procedure complex_add
  type(complex_number) :: result
  result%re = self%re + other%re
  result%im = self%im + other%im
end procedure`}
              language="fortran"
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex items-center justify-between border-t border-border-dark pt-8">
            <Link 
              href="/docs/v3.0/differentiable"
              className="group flex flex-col items-start"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">Previous</span>
              <span className="text-brand-cyan group-hover:underline">← Differentiable Programming</span>
            </Link>
            <div />
          </nav>
        </div>
      </div>
    </div>
  );
}