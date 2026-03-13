import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Info, Calculator, Sigma } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Advanced Arithmetic - Fortran² Documentation',
  description: 'Arbitrary precision, interval arithmetic, dual numbers, and complex numbers in Fortran².',
};

export default function AdvancedArithmeticPage() {
  return (
    <div className="flex-1 min-w-0 px-6 py-8 md:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/docs/v3.0" className="text-content-dark-tertiary hover:text-brand-cyan">
            Docs
          </Link>
          <span className="text-content-dark-tertiary">/</span>
          <span className="text-content-dark-secondary">Advanced Arithmetic</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-h1 font-heading font-bold text-content-dark-primary">
              Advanced Arithmetic
            </h1>
            <Badge variant="primary" className="bg-brand-purple/20 text-brand-purple">
              <Calculator className="h-3 w-3 mr-1" /> Core Feature
            </Badge>
          </div>
          <p className="text-lg text-content-dark-secondary">
            Fortran² provides powerful numerical computing capabilities including arbitrary precision, 
            interval arithmetic, dual numbers, and complex number support.
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
              The advanced arithmetic module in Fortran² extends traditional floating-point arithmetic 
              with several powerful numerical paradigms:
            </p>
            <ul className="space-y-2 text-content-dark-secondary ml-6">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Arbitrary Precision:</strong> Numbers with unlimited precision for exact computations</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Interval Arithmetic:</strong> Guaranteed bounds on numerical errors</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Dual Numbers:</strong> Automatic computation of derivatives</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Complex Numbers:</strong> Full support for complex arithmetic</span>
              </li>
            </ul>
          </section>

          {/* Arbitrary Precision */}
          <section id="arbitrary-precision">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Arbitrary Precision Arithmetic
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              The <code className="text-brand-cyan">bignum</code> module provides arbitrary precision integer 
              and rational arithmetic. This is essential for cryptographic applications, exact scientific 
              computations, and symbolic mathematics.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Using Big Integers
            </h3>
            <CodeBlock
              code={`use bignum
implicit none

type(bigint) :: a, b, result

! Initialize from string (supports very large numbers)
a = bigint("123456789012345678901234567890")
b = bigint("987654321098765432109876543210")

! Basic operations
result = a + b
print *, "Sum:       ", result%to_string()

result = a * b
print *, "Product:   ", result%to_string()

result = a ** 100  ! a raised to power 100
print *, "a^100:     ", result%to_string()

! Factorial of 1000
result = bigint(1)
do i = 2, 1000
  result = result * bigint(i)
end do
print *, "1000!:     ", result%to_string()`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Using Arbitrary Precision Reals
            </h3>
            <CodeBlock
              code={`use bignum
implicit none

type(bigfloat) :: x, y, pi_approx
integer :: prec

! Set precision (in bits)
call bigfloat_set_prec(256)  ! 256-bit precision

! Compute Pi to high precision
pi_approx = bigfloat("3.14159265358979323846264338327950288419716939937510")

! High-precision arithmetic
x = bigfloat("1.0")
do i = 1, 100
  x = x / bigfloat(i)
end do

print *, "1/100! = ", x%to_string(50)
print *, "Pi =    ", pi_approx%to_string(40)`}
              language="fortran"
            />
          </section>

          {/* Interval Arithmetic */}
          <section id="interval-arithmetic">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Interval Arithmetic
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              The <code className="text-brand-cyan">interval</code> module provides interval arithmetic, 
              which guarantees that the true result of a computation lies within the computed interval. 
              This is essential for verified computing and uncertainty quantification.
            </p>

            <div className="p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 mb-6">
              <div className="flex items-center gap-2 text-brand-cyan mb-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">Use Cases</span>
              </div>
              <p className="text-sm text-content-dark-secondary">
                Interval arithmetic is used in global optimization, constraint solving, validated numerics, 
                and uncertainty quantification in engineering.
              </p>
            </div>

            <CodeBlock
              code={`use interval
implicit none

type(interval) :: x, y, result
real :: a, b

! Create intervals
x = interval(1.0, 2.0)    ! [1.0, 2.0]
y = interval(0.5, 1.5)    ! [0.5, 1.5]

! Arithmetic operations (results in intervals)
result = x + y            ! [1.5, 3.5]
result = x - y            ! [-0.5, 1.5]
result = x * y            ! [0.5, 3.0]
result = x / y            ! [0.666..., 4.0]

! Functions preserve intervals
result = sin(x)           ! [sin(2.0), sin(1.0)] = [0.141..., 0.909...]

! Practical example: solve f(x) = x^2 - 2 = 0
! We know root is in [1, 2]
x = interval(1.0, 2.0)
do i = 1, 20
  ! Newton iteration with intervals
  y = (x%lo + x%hi) / 2.0
  if (y*y - 2.0 > 0) then
    x = interval(x%lo, y)
  else
    x = interval(y, x%hi)
  end if
end do
print *, "sqrt(2) in: ", x  ! Guaranteed to contain true value`}
              language="fortran"
            />
          </section>

          {/* Dual Numbers */}
          <section id="dual-numbers">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Dual Numbers
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Dual numbers extend real numbers with an infinitesimal component (ε) where ε² = 0. 
              They provide automatic computation of derivatives without symbolic manipulation or 
              numerical differentiation.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Automatic Differentiation
            </h3>
            <CodeBlock
              code={`use dual
implicit none

type(dual) :: x, y, z, result
real :: dx, dy, dz

! Initialize dual numbers
x = dual(2.0, 1.0)  ! value=2.0, derivative=1.0
y = dual(3.0, 0.0)  ! constant (derivative=0)
z = dual(1.0, 0.0)

! Compute f(x,y) = x^2 + x*y + y^3
result = x**2 + x*y + y**3

print *, "f(2,3) = ", result%val           ! 2^2 + 2*3 + 3^3 = 35
print *, "df/dx  = ", result%dval          ! 2*x + y = 7

! Use for gradient computation
x = dual(1.0, 1.0)  ! direction for x-derivative
y = dual(1.0, 0.0)  ! direction for y-derivative
result = x**2 + x*y + y**3
print *, "Gradient at (1,1): ", result%dval  ! df/dx = 2*1 + 1 = 3`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Taylor Mode Automatic Differentiation
            </h3>
            <CodeBlock
              code={`use dual
implicit none

type(dual) :: x, result
integer :: i

! Initialize with Taylor series (up to n terms)
x = dual_taylor(1.0, 4)  ! 4 terms, d[0]=1.0

! f(x) = exp(x) Taylor series automatically computed
result = exp(x)

! result now contains:
! result%val = 2.718... (value)
! result%dval(1) = 2.718... (first derivative = exp(x))
! result%dval(2) = 2.718... (second derivative = exp(x))
! etc.

print *, "exp(1) = ", result%val
print *, "exp'(1) = ", result%dval(1)
print *, "exp''(1) = ", result%dval(2)`}
              language="fortran"
            />
          </section>

          {/* Complex Numbers */}
          <section id="complex-numbers">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Complex Numbers
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² has native support for complex numbers through the <code className="text-brand-cyan">complex</code> 
              type and the extended <code className="text-brand-cyan">complex_advanced</code> module.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Basic Complex Arithmetic
            </h3>
            <CodeBlock
              code={`use complex_advanced
implicit none

complex :: z1, z2, result
type(complex128) :: cz1, cz2, cz_result

! Basic complex numbers
z1 = (1.0, 2.0)  ! 1 + 2i
z2 = (3.0, 4.0)  ! 3 + 4i

! Arithmetic
result = z1 + z2   ! (4, 6)
result = z1 - z2   ! (-2, -2)
result = z1 * z2   ! (-5, 10)  (1+2i)(3+4i) = 3+4i+6i+8i² = -5+10i
result = z1 / z2   ! (0.44, 0.08)

! Complex functions
result = exp(z1)   ! Complex exponential
result = sin(z1)   ! Complex sine
result = log(z1)   ! Complex logarithm

! High precision complex
cz1 = complex128("1.23456789012345678901234567890", "2.0")
cz_result = sqrt(cz1)  ! Complex square root`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Complex Special Functions
            </h3>
            <CodeBlock
              code={`use complex_advanced
implicit none

complex :: z, result
type(complex128) :: cz

! Gamma function (complex argument)
z = (0.5, 0.5)
result = gamma(z)

! Bessel functions
z = (1.0, 1.0)
result = bessel_j0(z)   ! Bessel J of first kind
result = bessel_y0(z)   ! Bessel Y of second kind

! Airy functions
result = airy_ai(z)     ! Airy function Ai
result = airy_bi(z)     ! Airy function Bi

! Error function (complex)
result = erf(z)
result = erfc(z)        ! Complementary error function`}
              language="fortran"
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex items-center justify-between border-t border-border-dark pt-8">
            <Link 
              href="/docs/v3.0/language-basics"
              className="group flex flex-col items-start"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">Previous</span>
              <span className="text-brand-cyan group-hover:underline">← Language Basics</span>
            </Link>
            <Link 
              href="/docs/v3.0/symbolic-computation"
              className="group flex flex-col items-end"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">Next</span>
              <span className="text-brand-cyan group-hover:underline">
                Symbolic Computation →
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}