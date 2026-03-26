import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Info, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Language Basics - Fortran² Documentation',
  description: 'Core syntax, variables, types, control flow, functions, and modules in Fortran².',
};

export default function LanguageBasicsPage() {
  return (
    <div className="flex-1 min-w-0 px-6 py-8 md:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/docs/v3.0" className="text-content-dark-tertiary hover:text-brand-cyan">
            Docs
          </Link>
          <span className="text-content-dark-tertiary">/</span>
          <span className="text-content-dark-secondary">Language Basics</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-h1 font-heading font-bold text-content-dark-primary">
              Language Basics
            </h1>
            <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
              <CheckCircle2 className="h-3 w-3 mr-1" /> Production Ready
            </Badge>
          </div>
          <p className="text-lg text-content-dark-secondary">
            Learn the core syntax, variables, types, control flow, and modern features in Fortran².
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12">
          {/* Paradigms */}
          <section id="paradigms">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Language Paradigms
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² is a multi-paradigm language supporting:
            </p>
            <div className="grid gap-2 md:grid-cols-2">
              <div className="flex items-center gap-2 p-2 rounded bg-surface-dark">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                <span className="text-content-dark-secondary">Structured Programming</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-surface-dark">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                <span className="text-content-dark-secondary">Imperative Programming</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-surface-dark">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                <span className="text-content-dark-secondary">Generic Programming</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-surface-dark">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                <span className="text-content-dark-secondary">Array Programming</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-surface-dark">
                <CheckCircle2 className="h-4 w-4 text-brand-amber" />
                <span className="text-content-dark-secondary">Functional Programming (60%)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-surface-dark">
                <CheckCircle2 className="h-4 w-4 text-brand-cyan" />
                <span className="text-content-dark-secondary">Concurrent Programming</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-surface-dark">
                <CheckCircle2 className="h-4 w-4 text-brand-amber" />
                <span className="text-content-dark-secondary">Metaprogramming (40%)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded bg-surface-dark">
                <CheckCircle2 className="h-4 w-4 text-brand-green" />
                <span className="text-content-dark-secondary">Differentiable Programming</span>
              </div>
            </div>
          </section>

          {/* Syntax Overview */}
          <section id="syntax">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Modern F2 Syntax
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² introduces modern syntax while maintaining backward compatibility with Fortran 2018.
              File extensions are <code className="text-brand-cyan">.f2</code> or <code className="text-brand-cyan">.f90</code>.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Basic Program Structure
            </h3>
            <CodeBlock
              code={`! Modern F2 program with string interpolation
program hello
    let name = "World"
    print("Hello, {name}!")
end program hello`}
              language="fortran"
              filename="hello.f2"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              String Interpolation
            </h3>
            <CodeBlock
              code={`! String interpolation with embedded expressions
let name = "Fortran²"
let version = 3.0
let count = 42

print("Welcome to {name} v{version}!")
print("The answer is {count}")
print("Computed: {count * 2 + 1}")  ! Expressions work too`}
              language="fortran"
              filename="strings.f2"
            />
          </section>

          {/* Variables and Types */}
          <section id="variables">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Variables and Types
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² provides type inference with <code className="text-brand-cyan">let</code> as well as 
              explicit type declarations.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Type Inference
            </h3>
            <CodeBlock
              code={`! Modern type inference with let
let x = 42              ! Inferred as integer
let pi = 3.14159        ! Inferred as real
let name = "Fortran²"   ! Inferred as character string
let flag = true         ! Inferred as logical

! Explicit types (traditional syntax still works)
integer :: i, j
real :: x, y
character(len=100) :: name
logical :: flag
complex :: z`}
              language="fortran"
              filename="variables.f2"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Built-in Types
            </h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-surface-dark-tertiary">
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Type</th>
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Description</th>
                    <th className="border border-border-dark px-4 py-2 text-left text-content-dark-primary">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">integer</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Whole numbers</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">42, -7</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">real</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Floating point</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">3.14, 1.0e-10</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">complex</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Complex numbers</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">(1.0, 2.0)</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">character</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Strings</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">"hello"</td>
                  </tr>
                  <tr>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">logical</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary">Boolean</td>
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">true, false</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Arrays
            </h3>
            <CodeBlock
              code={`! Array declarations
let arr = [1, 2, 3, 4, 5]              ! Integer array
let matrix = [[1, 2], [3, 4]]          ! 2D array

! Traditional array syntax
real, dimension(10) :: arr
real, dimension(5, 5) :: matrix

! Array operations
let sum = arr.sum()
let max_val = arr.max()
let sorted = arr.sort()`}
              language="fortran"
              filename="arrays.f2"
            />
          </section>

          {/* Control Flow */}
          <section id="control-flow">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Control Flow
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² provides modern control flow constructs including range-based loops.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              If-Then-Else
            </h3>
            <CodeBlock
              code={`let score = 85

if score >= 90 {
    print("Grade: A")
} else if score >= 80 {
    print("Grade: B")
} else if score >= 70 {
    print("Grade: C")
} else {
    print("Grade: F")
}`}
              language="fortran"
              filename="if.f2"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Range-Based Loops
            </h3>
            <CodeBlock
              code={`! Range-based for loop
for i in 1..10 {
    print("i = {i}")
}

! Inclusive range (1 to 10)
for i in 1..=10 {
    print("i = {i}")
}

! Iterate over array
let items = ["apple", "banana", "cherry"]
for item in items {
    print("Fruit: {item}")
}

! Traditional do loop (still supported)
do i = 1, 10
    print *, i
end do`}
              language="fortran"
              filename="loops.f2"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Pattern Matching
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary" className="bg-amber-500/20 text-amber-500">
                50% Implemented
              </Badge>
            </div>
            <CodeBlock
              code={`! Pattern matching (partially implemented)
match value {
    case 0 => print("Zero")
    case 1 => print("One")
    case n when n > 10 => print("Large: {n}")
    case _ => print("Other: {value}")
}`}
              language="fortran"
              filename="pattern.f2"
            />
          </section>

          {/* Functions */}
          <section id="functions">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Functions and Lambdas
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² supports both traditional functions and modern lambda expressions.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Lambda Expressions
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary" className="bg-amber-500/20 text-amber-500">
                60% Implemented
              </Badge>
            </div>
            <CodeBlock
              code={`! Lambda expressions
let square = (x) => x * x
let add = (a, b) => a + b
let factorial = (n) => if n <= 1 then 1 else n * factorial(n - 1)

! Usage
print("5 squared = {square(5)}")
print("3 + 4 = {add(3, 4)}")
print("5! = {factorial(5)}")`}
              language="fortran"
              filename="lambda.f2"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Traditional Functions
            </h3>
            <CodeBlock
              code={`! Function with result clause
function factorial(n) result(res)
    integer, intent(in) :: n
    integer :: res, i
    
    res = 1
    do i = 2, n
        res = res * i
    end do
end function factorial

! Subroutine for side effects
subroutine swap(a, b)
    integer, intent(inout) :: a, b
    integer :: temp
    
    temp = a
    a = b
    b = temp
end subroutine swap`}
              language="fortran"
              filename="functions.f2"
            />
          </section>

          {/* Error Handling */}
          <section id="error-handling">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Error Handling
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Modern error handling with try-catch blocks:
            </p>

            <CodeBlock
              code={`! Modern error handling
try {
    let result = risky_operation()
    print("Result: {result}")
} catch e: DivisionByZero {
    print("Error: Cannot divide by zero")
} catch e: Overflow {
    print("Error: Numeric overflow occurred")
} catch e {
    print("Unknown error: {e.message}")
}`}
              language="fortran"
              filename="errors.f2"
            />
          </section>

          {/* Metaprogramming */}
          <section id="metaprogramming">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Metaprogramming
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="primary" className="bg-amber-500/20 text-amber-500">
                40% Implemented
              </Badge>
            </div>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Compile-time code generation with macros:
            </p>

            <CodeBlock
              code={`! Metaprogramming with macros
macro generate_getter(field_name, field_type)
    function get_{field_name}() result(res)
        {field_type} :: res
        res = this.{field_name}
    end function
end macro

! Usage
struct Person
    character(:), allocatable :: name
    integer :: age
contains
    generate_getter(name, character(:))
    generate_getter(age, integer)
end struct`}
              language="fortran"
              filename="macro.f2"
            />

            <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Work in Progress</span>
              </div>
              <p className="text-sm text-content-dark-secondary">
                Metaprogramming features are approximately 40% complete. Basic macro expansion is available, 
                but advanced compile-time computation is still being implemented.
              </p>
            </div>
          </section>

          {/* Navigation */}
          <nav className="mt-12 flex items-center justify-between border-t border-border-dark pt-8">
            <Link 
              href="/docs/v3.0/getting-started"
              className="group flex flex-col items-start"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">Previous</span>
              <span className="text-brand-cyan group-hover:underline">← Getting Started</span>
            </Link>
            <Link 
              href="/docs/v3.0/advanced-arithmetic"
              className="group flex flex-col items-end"
            >
              <span className="text-sm text-content-dark-tertiary mb-1">Next</span>
              <span className="text-brand-cyan group-hover:underline">
                Advanced Arithmetic →
              </span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
