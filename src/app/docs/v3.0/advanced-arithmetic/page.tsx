import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Info, Calculator, CheckCircle2, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Advanced Arithmetic - Fortran² Documentation',
  description: 'IEEE 754, arbitrary precision, posit arithmetic, interval arithmetic, and complex numbers in Fortran².',
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
            <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
              <CheckCircle2 className="h-3 w-3 mr-1" /> Production Ready
            </Badge>
          </div>
          <p className="text-lg text-content-dark-secondary">
            Fortran² provides comprehensive native support for multiple precision formats with 
            hand-optimized assembly kernels for maximum performance.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12">
          {/* Implementation Status */}
          <section id="status">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Implementation Status
            </h2>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-green/10 border border-brand-green/30">
                <CheckCircle2 className="h-5 w-5 text-brand-green" />
                <div>
                  <span className="font-medium text-content-dark-primary">IEEE 754 Suite</span>
                  <span className="text-content-dark-secondary ml-2">Binary16, Binary32, Binary64, Decimal64 with SIMD (AVX-512, ARM NEON)</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-green/10 border border-brand-green/30">
                <CheckCircle2 className="h-5 w-5 text-brand-green" />
                <div>
                  <span className="font-medium text-content-dark-primary">Arbitrary Precision</span>
                  <span className="text-content-dark-secondary ml-2">BigInt and BigFloat with hand-optimized assembly kernels</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-green/10 border border-brand-green/30">
                <CheckCircle2 className="h-5 w-5 text-brand-green" />
                <div>
                  <span className="font-medium text-content-dark-primary">Posit Arithmetic</span>
                  <span className="text-content-dark-secondary ml-2">8, 16, 32, 64-bit posits with quire accumulators</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-green/10 border border-brand-green/30">
                <CheckCircle2 className="h-5 w-5 text-brand-green" />
                <div>
                  <span className="font-medium text-content-dark-primary">Interval Arithmetic</span>
                  <span className="text-content-dark-secondary ml-2">Full interval operations and error propagation</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-green/10 border border-brand-green/30">
                <CheckCircle2 className="h-5 w-5 text-brand-green" />
                <div>
                  <span className="font-medium text-content-dark-primary">Complex Numbers</span>
                  <span className="text-content-dark-secondary ml-2">Full complex IEEE 754 arithmetic</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <div>
                  <span className="font-medium text-content-dark-primary">Unum Types</span>
                  <span className="text-content-dark-secondary ml-2">Planned for future release</span>
                </div>
              </div>
            </div>
          </section>

          {/* IEEE 754 Arithmetic */}
          <section id="ieee754">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              IEEE 754 Arithmetic
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² provides complete IEEE 754 support with hardware acceleration via SIMD 
              vectorization (AVX-512 and ARM NEON):
            </p>

            <CodeBlock
              code={`! IEEE 754 variants
real(binary16) :: half_precision       ! 16-bit half
real(binary32) :: single_precision     ! 32-bit single
real(binary64) :: double_precision     ! 64-bit double
real(decimal64) :: financial_calc      ! 64-bit decimal

! Operations are hardware-accelerated
let a: real(binary64) = 3.14159265358979
let b: real(binary64) = 2.71828182845904
let result = a * b + sin(a) - exp(b)`}
              language="fortran"
              filename="ieee754.f2"
            />
          </section>

          {/* Arbitrary Precision */}
          <section id="arbitrary-precision">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Arbitrary Precision Arithmetic
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              The arbitrary precision system provides unlimited precision integers (BigInt) and 
              floating-point numbers (BigFloat) with hand-optimized assembly kernels for core 
              operations: multiply, divide, modulo, GCD, LCM, sqrt.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              BigInt - Unlimited Precision Integers
            </h3>
            <CodeBlock
              code={`! BigInt with assembly-optimized kernels
real(arbitrary(precision=1000)) :: ultra_high_prec

! Compute factorial of 1000 with exact precision
let factorial_1000 = bigint::factorial(1000)
print("1000! has {factorial_1000.digit_count()} digits")

! Cryptographic-size computations
let prime1 = bigint("170141183460469231731687303715884105727")
let prime2 = bigint("170141183460469231731687303715884105757")
let product = prime1 * prime2  ! Assembly-optimized multiplication`}
              language="fortran"
              filename="bigint.f2"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              BigFloat - Arbitrary Precision Floating-Point
            </h3>
            <CodeBlock
              code={`! BigFloat: BigInt mantissa + int exponent
let pi_1000_digits = bigfloat("3.14159265358979323846...", precision=1000)

! High-precision computation
let x = bigfloat(1.0, precision=256)  ! 256-bit precision
let result = x / factorial(100)
print("1/100! = {result.to_string(50)}")`}
              language="fortran"
              filename="bigfloat.f2"
            />
          </section>

          {/* Posit Arithmetic */}
          <section id="posit-arithmetic">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Posit Arithmetic
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² implements posit arithmetic (Type III unums) with 8, 16, 32, and 64-bit 
              variants, including quire accumulators for exact dot products.
            </p>

            <CodeBlock
              code={`! Posit number formats
real(posit8) :: p8    ! 8-bit posit
real(posit16) :: p16  ! 16-bit posit
real(posit32) :: p32  ! 32-bit posit
real(posit64) :: p64  ! 64-bit posit

! Posit with quire accumulator for exact dot products
let a = [1.0, 2.0, 3.0, 4.0, 5.0]
let b = [0.1, 0.2, 0.3, 0.4, 0.5]

! Exact dot product using quire
let dot_product = quire_dot(a, b)  ! No rounding error!

! Posit arithmetic
let x: real(posit32) = 3.14159
let y: real(posit32) = 2.71828
let result = x * y + sqrt(x)`}
              language="fortran"
              filename="posit.f2"
            />

            <div className="p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 mt-4">
              <div className="flex items-center gap-2 text-brand-cyan mb-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">Why Posits?</span>
              </div>
              <p className="text-sm text-content-dark-secondary">
                Posits provide better precision than IEEE 754 floats of the same size, especially 
                near zero. They have no NaN and only one representation for zero, making them ideal 
                for scientific computing.
              </p>
            </div>
          </section>

          {/* Interval Arithmetic */}
          <section id="interval-arithmetic">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Interval Arithmetic
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Interval arithmetic guarantees that the true result of a computation lies within 
              the computed interval. Essential for verified computing and uncertainty quantification.
            </p>

            <CodeBlock
              code={`! Interval arithmetic with guaranteed bounds
interval(real(binary64)) :: guaranteed_bounds

! Create intervals
let x = interval(1.0, 2.0)    ! [1.0, 2.0]
let y = interval(0.5, 1.5)    ! [0.5, 1.5]

! Arithmetic operations preserve bounds
let sum = x + y           ! [1.5, 3.5]
let diff = x - y          ! [-0.5, 1.5]
let prod = x * y          ! [0.5, 3.0]
let quot = x / y          ! [0.666..., 4.0]

! Functions preserve intervals
let sin_result = sin(x)   ! [sin(2.0), sin(1.0)]

! Uncertainty propagation
let temperature = 25.0 ± 0.5    ! 25.0 with uncertainty ±0.5
let pressure = 1013.25 ± 2.0    ! 1013.25 with uncertainty ±2.0
let density = ideal_gas_law(temperature, pressure)
! Automatically propagates uncertainty through calculation`}
              language="fortran"
              filename="interval.f2"
            />
          </section>

          {/* Complex Numbers */}
          <section id="complex-numbers">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Complex Numbers
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Full complex IEEE 754 arithmetic with optimized operations. Complex variants for 
              other number systems are planned for future releases.
            </p>

            <CodeBlock
              code={`! Complex IEEE 754 arithmetic
complex :: z1, z2, result

! Basic complex numbers
z1 = (1.0, 2.0)  ! 1 + 2i
z2 = (3.0, 4.0)  ! 3 + 4i

! Arithmetic operations
result = z1 + z2   ! (4, 6)
result = z1 * z2   ! (-5, 10)  via (1+2i)(3+4i)
result = z1 / z2   ! (0.44, 0.08)

! Complex functions
result = exp(z1)   ! Complex exponential
result = sin(z1)   ! Complex sine
result = log(z1)   ! Complex logarithm
result = sqrt(z1)  ! Complex square root

! Complex with arbitrary precision
complex(arbitrary(precision=200)) :: symbolic_complex`}
              language="fortran"
              filename="complex.f2"
            />
          </section>

          {/* SIMD Optimization */}
          <section id="simd">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              SIMD Vectorization
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              All arithmetic operations are optimized with SIMD vectorization for maximum performance:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-brand-green/10 border border-brand-green/30">
                <div className="flex items-center gap-2 text-brand-green mb-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-medium">AVX-512</span>
                </div>
                <p className="text-sm text-content-dark-secondary">
                  Complete vectorization for x86-64 with AVX-512 instructions
                </p>
              </div>
              <div className="p-4 rounded-lg bg-brand-green/10 border border-brand-green/30">
                <div className="flex items-center gap-2 text-brand-green mb-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="font-medium">ARM NEON</span>
                </div>
                <p className="text-sm text-content-dark-secondary">
                  Complete vectorization for ARM64 including Apple Silicon
                </p>
              </div>
            </div>
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
              href="/docs/v3.0/differentiable"
              className="group flex flex-col items-end"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">Next</span>
              <span className="text-brand-cyan group-hover:underline">
                Differentiable Programming →
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}