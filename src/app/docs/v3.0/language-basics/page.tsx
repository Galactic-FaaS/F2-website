import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Info, AlertTriangle } from 'lucide-react';

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
          </div>
          <p className="text-lg text-content-dark-secondary">
            Learn the core syntax, variables, types, control flow, functions, and modules in Fortran².
          </p>
        </header>

        {/* Content */}
        <div className="space-y-12">
          {/* Syntax Overview */}
          <section id="syntax">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Syntax Overview
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² maintains backward compatibility with Fortran 2018 while introducing modern 
              syntactic conveniences. The language is case-insensitive for keywords and identifiers.
            </p>
            
            <div className="p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 mb-4">
              <div className="flex items-center gap-2 text-brand-cyan mb-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">Key Feature</span>
              </div>
              <p className="text-sm text-content-dark-secondary">
                Fortran² supports both fixed-format (legacy) and free-format (modern) source code. 
                We recommend free-format for new projects.
              </p>
            </div>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Basic Program Structure
            </h3>
            <CodeBlock
              code={`! Free-format Fortran² program
program my_program
  implicit none
  
  ! Declarations
  integer :: i
  real :: x
  
  ! Executable statements
  x = 3.14159
  i = 42
  
  ! Output
  print "(A, F6.3, A, I2)", "Pi = ", x, ", i = ", i
  
end program my_program`}
              language="fortran"
              filename="example.f2"
            />
          </section>

          {/* Variables and Types */}
          <section id="variables">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Variables and Types
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² provides a rich type system including built-in types and user-defined types.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
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
                    <td className="border border-border-dark px-4 py-2 text-content-dark-secondary font-mono">.true., .false.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Type Declaration
            </h3>
            <CodeBlock
              code={`! Explicit type declarations
implicit none

! Scalar variables
integer :: i, j
real :: x, y
character(len=100) :: name
logical :: flag
complex :: z

! Array variables
real, dimension(10) :: arr
real, dimension(5, 5) :: matrix

! With initialization
integer :: count = 0
real :: pi = 3.14159265359`}
              language="fortran"
            />
          </section>

          {/* Control Flow */}
          <section id="control-flow">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Control Flow
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² provides various control flow constructs for conditional execution and iteration.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              If-Then-Else
            </h3>
            <CodeBlock
              code={`integer :: score
score = 85

if (score >= 90) then
  print *, "Grade: A"
else if (score >= 80) then
  print *, "Grade: B"
else if (score >= 70) then
  print *, "Grade: C"
else
  print *, "Grade: F"
end if`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Select Case
            </h3>
            <CodeBlock
              code={`integer :: day
day = 3

select case (day)
  case (1)
    print *, "Monday"
  case (2)
    print *, "Tuesday"
  case (3)
    print *, "Wednesday"
  case (4)
    print *, "Thursday"
  case (5)
    print *, "Friday"
  case default
    print *, "Weekend"
end select`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Do Loops
            </h3>
            <CodeBlock
              code={`! Count-controlled loop
integer :: i
do i = 1, 10
  print *, i
end do

! With step
do i = 10, 1, -1
  print *, i
end do

! While loop (using do while)
integer :: n
n = 0
do while (n < 10)
  n = n + 1
end do`}
              language="fortran"
            />
          </section>

          {/* Functions and Modules */}
          <section id="functions">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Functions and Modules
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² uses modules as the primary organization unit, replacing the older common blocks 
              and include files.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Functions and Subroutines
            </h3>
            <CodeBlock
              code={`! Function - returns a value
function factorial(n) result(res)
  integer, intent(in) :: n
  integer :: res
  integer :: i
  
  res = 1
  do i = 2, n
    res = res * i
  end do
end function factorial

! Subroutine - called with arguments
subroutine swap(a, b)
  integer, intent(inout) :: a, b
  integer :: temp
  
  temp = a
  a = b
  b = temp
end subroutine swap`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Modules
            </h3>
            <CodeBlock
              code={`! math_utils.f90
module math_utils
  implicit none
  
  ! Public interface
  public :: factorial, swap
  
contains

  function factorial(n) result(res)
    integer, intent(in) :: n
    integer :: res, i
    res = 1
    do i = 2, n
      res = res * i
    end do
  end function factorial
  
  subroutine swap(a, b)
    integer, intent(inout) :: a, b
    integer :: temp
    temp = a; a = b; b = temp
  end subroutine swap
  
end module math_utils`}
              language="fortran"
              filename="math_utils.f90"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Using Modules
            </h3>
            <CodeBlock
              code={`program main
  use math_utils
  implicit none
  
  integer :: x = 5, y = 10
  
  print *, "Before swap: x =", x, ", y =", y
  call swap(x, y)
  print *, "After swap: x =", x, ", y =", y
  
  print *, "5! =", factorial(5)
  
end program main`}
              language="fortran"
              filename="main.f2"
            />

            <div className="mt-4 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
              <div className="flex items-center gap-2 text-amber-500 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Best Practice</span>
              </div>
              <p className="text-sm text-content-dark-secondary">
                Always use <code className="text-amber-400">implicit none</code> in your programs and modules 
                to catch typing errors early. This forces explicit declaration of all variables.
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