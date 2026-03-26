import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Info, BookOpen, CheckCircle2, AlertTriangle } from 'lucide-react';

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
                <h4 className="font-semibold text-content-dark-primary mb-2 flex items-center gap-2">
                  Core Modules
                  <Badge variant="primary" className="bg-brand-green/20 text-brand-green text-xs">Production</Badge>
                </h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code className="text-brand-cyan">collections</code> - Vec, HashMap, HashSet</li>
                  <li>• <code className="text-brand-cyan">ieee754</code> - IEEE 754 arithmetic</li>
                  <li>• <code className="text-brand-cyan">simd</code> - SIMD vectorization</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2 flex items-center gap-2">
                  Arbitrary Precision
                  <Badge variant="primary" className="bg-brand-green/20 text-brand-green text-xs">Production</Badge>
                </h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code className="text-brand-cyan">bigint</code> - Arbitrary precision integers</li>
                  <li>• <code className="text-brand-cyan">bigfloat</code> - Arbitrary precision floats</li>
                  <li>• <code className="text-brand-cyan">posit</code> - Posit arithmetic</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2 flex items-center gap-2">
                  Differentiable
                  <Badge variant="primary" className="bg-brand-green/20 text-brand-green text-xs">Production</Badge>
                </h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code className="text-brand-cyan">autodiff</code> - Automatic differentiation</li>
                  <li>• <code className="text-brand-cyan">dual</code> - Dual numbers</li>
                  <li>• <code className="text-brand-cyan">grad</code> - Gradient computation</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2 flex items-center gap-2">
                  Probabilistic
                  <Badge variant="primary" className="bg-brand-green/20 text-brand-green text-xs">Production</Badge>
                </h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code className="text-brand-cyan">distributions</code> - 15+ distributions</li>
                  <li>• <code className="text-brand-cyan">mcmc</code> - MCMC samplers</li>
                  <li>• <code className="text-brand-cyan">variational</code> - Variational inference</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2 flex items-center gap-2">
                  Symbolic
                  <Badge variant="primary" className="bg-amber-500/20 text-amber-500 text-xs">30%</Badge>
                </h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code className="text-brand-cyan">symbolic</code> - Symbolic expressions</li>
                  <li>• <code className="text-brand-cyan">pattern</code> - Pattern matching</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2 flex items-center gap-2">
                  Planned
                  <Badge variant="primary" className="bg-red-500/20 text-red-500 text-xs">Planned</Badge>
                </h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code className="text-brand-cyan">nn</code> - Neural networks</li>
                  <li>• <code className="text-brand-cyan">gpu</code> - GPU acceleration</li>
                  <li>• <code className="text-brand-cyan">quantum</code> - Quantum computing</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Collections Module */}
          <section id="collections">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Collections Module
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Production Ready
              </Badge>
            </div>
            
            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Vec - Dynamic Arrays
            </h3>
            <CodeBlock
              code={`! Vec - Dynamic growable array
let v = Vec<integer>()        ! Create empty vector
v.push(1)                      ! Add elements
v.push(2)
v.push(3)

print("Length: {v.len()}")     ! Length: 3
print("First: {v[0]}")         ! First: 1

let sum = v.iter().sum()       ! Sum all elements
let doubled = v.map((x) => x * 2)  ! Map function`}
              language="fortran"
              filename="vec.f2"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              HashMap - Key-Value Storage
            </h3>
            <CodeBlock
              code={`! HashMap - Key-value pairs
let map = HashMap<string, integer>()
map.insert("one", 1)
map.insert("two", 2)
map.insert("three", 3)

let value = map.get("two")     ! Returns 2
map.remove("one")

for (key, value) in map {
    print("{key} => {value}")
}`}
              language="fortran"
              filename="hashmap.f2"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              HashSet - Unique Elements
            </h3>
            <CodeBlock
              code={`! HashSet - Unique element collection
let set = HashSet<integer>()
set.insert(1)
set.insert(2)
set.insert(2)                   ! Duplicate ignored

print("Contains 1: {set.contains(1)}")  ! true
print("Size: {set.len()}")               ! 2`}
              language="fortran"
              filename="hashset.f2"
            />
          </section>

          {/* IEEE 754 Module */}
          <section id="ieee754">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              IEEE 754 Arithmetic Module
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Production Ready
              </Badge>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-dark-tertiary">
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Type</th>
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Size</th>
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">real(binary16)</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">16-bit</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Half precision</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">real(binary32)</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">32-bit</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Single precision</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">real(binary64)</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">64-bit</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Double precision</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">real(decimal64)</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">64-bit</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Decimal floating point</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              code={`! IEEE 754 types
let x16 = 1.0e0_binary16      ! Half precision
let x32 = 1.0e0_binary32      ! Single precision
let x64 = 1.0e0_binary64      ! Double precision
let xd64 = 1.0e0_decimal64    ! Decimal

! Special values
let inf = real(binary64).infinity
let nan_val = real(binary64).nan
let neg_zero = real(binary64).negative_zero`}
              language="fortran"
              filename="ieee754.f2"
            />
          </section>

          {/* BigInt/BigFloat Module */}
          <section id="bignum">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Arbitrary Precision Module
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Production Ready
              </Badge>
            </div>

            <CodeBlock
              code={`! BigInt - Arbitrary precision integers
let big = BigInt("123456789012345678901234567890")
let result = big * big * big    ! No overflow!

! BigFloat - Arbitrary precision floats
let pi = BigFloat("3.141592653589793238462643383279")
pi.set_precision(1000)          ! 1000 bits of precision

! Assembly-optimized kernels for performance
let a = BigFloat(1.0)
let b = BigFloat(2.0)
let c = a + b                    ! Uses optimized kernel`}
              language="fortran"
              filename="bignum.f2"
            />
          </section>

          {/* Posit Module */}
          <section id="posit">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Posit Arithmetic Module
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Production Ready
              </Badge>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-dark-tertiary">
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Type</th>
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Size</th>
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Features</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">posit8</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">8-bit</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Embedded systems</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">posit16</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">16-bit</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Better than float16</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">posit32</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">32-bit</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Alternative to float32</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">posit64</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">64-bit</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">High precision</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <CodeBlock
              code={`! Posit arithmetic with quire accumulators
let p = posit32(3.14159)
let q = posit32(2.71828)

! Quire accumulator for exact dot products
let quire = quire32()
quire.add(p * q)               ! Exact accumulation
let result = quire.to_posit()  ! Convert back to posit`}
              language="fortran"
              filename="posit.f2"
            />
          </section>

          {/* Autodiff Module */}
          <section id="autodiff">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Automatic Differentiation Module
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Production Ready
              </Badge>
            </div>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Supported Operations (23 total)
            </h3>
            <div className="grid gap-2 md:grid-cols-4 mb-4">
              {['sin', 'cos', 'tan', 'exp', 'log', 'sqrt', 'pow', 'abs', 'sinh', 'cosh', 'tanh', 'asin', 'acos', 'atan', 'erf', 'erfc', 'relu', 'sigmoid', 'softplus', 'add', 'sub', 'mul', 'div'].map(op => (
                <div key={op} className="p-2 rounded bg-surface-dark text-center text-sm text-content-dark-secondary font-mono">
                  {op}
                </div>
              ))}
            </div>

            <CodeBlock
              code={`! Mark function as differentiable
differentiable function f(x)
    real, intent(in) :: x
    f = x**2 + sin(x) * exp(x)
end function

! Compute gradients
let df = grad(f)               ! Gradient function
let h = hessian(f)             ! Hessian function
let j = jacobian(f)            ! Jacobian function

! Usage
let x = 1.0
let gradient = df(x)           ! df/dx at x=1`}
              language="fortran"
              filename="autodiff.f2"
            />
          </section>

          {/* Distributions Module */}
          <section id="distributions">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Probability Distributions Module
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
                <CheckCircle2 className="h-3 w-3 mr-1" /> 15+ Distributions
              </Badge>
            </div>

            <div className="grid gap-2 md:grid-cols-3 mb-4">
              {['Normal', 'Beta', 'Gamma', 'Exponential', 'Uniform', 'LogNormal', 'Bernoulli', 'Poisson', 'Binomial', 'Categorical', 'HalfCauchy', 'StudentT', 'ChiSquared', 'Dirichlet', 'Multinomial'].map(dist => (
                <div key={dist} className="p-2 rounded bg-surface-dark text-center text-sm text-content-dark-secondary font-mono">
                  {dist}
                </div>
              ))}
            </div>

            <CodeBlock
              code={`! Create and use distributions
let normal = Normal(mean=0.0, std=1.0)
let x = normal.sample()        ! Draw sample
let p = normal.pdf(x)          ! Probability density
let cdf = normal.cdf(x)        ! Cumulative distribution

! Probabilistic model definition
probabilistic function model(data)
    let theta = sample(Beta(2.0, 2.0))
    for d in data {
        observe(Bernoulli(theta), d)
    }
    return theta
end function

! Inference
let posterior = infer(model, data, method="NUTS", n_samples=10000)`}
              language="fortran"
              filename="distributions.f2"
            />
          </section>

          {/* SIMD Module */}
          <section id="simd">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              SIMD Vectorization Module
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Production Ready
              </Badge>
            </div>

            <CodeBlock
              code={`! SIMD vectorized operations
let a = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0]
let b = [8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0, 1.0]

! Automatic SIMD vectorization
let c = a + b                   ! AVX-512 or ARM NEON

! Explicit SIMD control
#![simd(vector_width=512)]
let d = a * b + a.sin()

! Check CPU features
if cpu_supports("AVX-512") {
    print("AVX-512 available")
}`}
              language="fortran"
              filename="simd.f2"
            />
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex items-center justify-between border-t border-border-dark pt-8">
            <Link 
              href="/docs/v3.0/symbolic-computation"
              className="group flex flex-col items-start"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">Previous</span>
              <span className="text-brand-cyan group-hover:underline">← Symbolic Computation</span>
            </Link>
            <div />
          </nav>
        </div>
      </div>
    </div>
  );
}
