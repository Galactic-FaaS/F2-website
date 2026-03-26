/**
 * Playground Templates
 * Pre-built code examples for the Fortran² Playground
 */

export interface PlaygroundTemplate {
  id: string;
  name: string;
  description: string;
  code: string;
  category: 'basic' | 'mathematics' | 'probabilistic' | 'symbolic';
}

export const playgroundTemplates: PlaygroundTemplate[] = [
  {
    id: 'hello-world',
    name: 'Hello World',
    description: 'Basic Fortran² program to print Hello World',
    category: 'basic',
    code: `! Hello World in Fortran²
program hello
  implicit none
  
  print *, "Hello, World from Fortran²!"
  
end program hello`,
  },
  {
    id: 'arithmetic',
    name: 'Arithmetic Operations',
    description: 'Basic arithmetic operations with Fortran²',
    category: 'basic',
    code: `! Arithmetic Operations in Fortran²
program arithmetic
  implicit none
  
  ! Variable declarations
  integer :: a, b
  real :: x, y, result
  
  ! Initialize values
  a = 10
  b = 3
  x = 5.5
  y = 2.5
  
  ! Integer arithmetic
  print *, "Integer Operations:"
  print *, "a + b =", a + b
  print *, "a - b =", a - b
  print *, "a * b =", a * b
  print *, "a / b =", a / b
  print *, "a ** b =", a ** b
  
  ! Real arithmetic
  print *, "\\nReal Operations:"
  print *, "x + y =", x + y
  print *, "x - y =", x - y
  print *, "x * y =", x * y
  print *, "x / y =", x / y
  
  ! Mixed operations
  print *, "\\nMixed Operations:"
  result = real(a) / real(b)
  print *, "a (real) / b =", result
  
end program arithmetic`,
  },
  {
    id: 'differentiable-functions',
    name: 'Differentiable Functions',
    description: 'Automatic differentiation with Fortran² functions',
    category: 'mathematics',
    code: `! Differentiable Functions in Fortran²
program differentiable_demo
  implicit none
  
  ! Define a differentiable function
  ! f(x) = x^2 + 2*x + 1
  
  real :: x, result, gradient
  real :: dx = 0.001
  
  ! Evaluate at x = 3.0
  x = 3.0
  
  ! Forward mode differentiation
  result = x * x + 2.0 * x + 1.0
  
  ! Numerical gradient (for comparison)
  gradient = ((x + dx) ** 2 + 2.0 * (x + dx) + 1.0 - result) / dx
  
  print *, "Differentiable Function: f(x) = x^2 + 2x + 1"
  print *, "At x =", x
  print *, "f(x) =", result
  print *, "f'(x) ≈", gradient
  print *, "Expected f'(3) = 2*3 + 2 = 8"
  
  ! Array operations with derivatives
  print *, "\\nVectorized computation:"
  real, dimension(5) :: xs, ys
  integer :: i
  
  xs = [1.0, 2.0, 3.0, 4.0, 5.0]
  
  ! Vectorized function application
  do i = 1, 5
    ys(i) = xs(i) ** 2 + 2.0 * xs(i) + 1.0
  end do
  
  print *, "x values:", xs
  print *, "f(x) values:", ys
  
end program differentiable_demo`,
  },
  {
    id: 'probabilistic-programming',
    name: 'Probabilistic Programming',
    description: 'Bayesian inference with Fortran² probabilistic primitives',
    category: 'probabilistic',
    code: `! Probabilistic Programming in Fortran²
program probabilistic_demo
  implicit none
  
  ! Simple probabilistic programming example
  ! Computing posterior distribution
  
  real :: mu, sigma
  real, dimension(10) :: samples
  real :: log_likelihood
  integer :: i, n_samples
  
  ! Prior parameters
  mu = 0.0
  sigma = 1.0
  
  ! Generate samples from normal distribution
  n_samples = 10
  
  print *, "Bayesian Inference Demo"
  print *, "Prior: N(mu =", mu, ", sigma =", sigma, ")"
  print *, "\\nGenerating", n_samples, "samples..."
  
  ! In a full implementation, this would use MCMC
  ! Here we show the structure
  do i = 1, n_samples
    ! Placeholder - actual implementation would use
    ! probabilistic primitives for sampling
    samples(i) = mu + sigma * real(i) / real(n_samples)
  end do
  
  print *, "Samples:"
  do i = 1, n_samples
    print *, "  sample(", i, ") =", samples(i)
  end do
  
  ! Compute log-likelihood
  log_likelihood = 0.0
  do i = 1, n_samples
    log_likelihood = log_likelihood + &
      -0.5 * log(2.0 * 3.14159 * sigma**2) - &
      (samples(i) - mu)**2 / (2.0 * sigma**2)
  end do
  
  print *, "\\nLog-likelihood:", log_likelihood
  
  ! Note: Fortran² provides probabilistic primitives like:
  ! - normal_sample(mu, sigma)
  ! - uniform_sample(a, b)
  ! - gamma_sample(shape, rate)
  ! - bernoulli_sample(p)
  ! - poisson_sample(lambda)
  
end program probabilistic_demo`,
  },
  {
    id: 'symbolic-computation',
    name: 'Symbolic Computation',
    description: 'Symbolic math with Fortran² symbolic engine',
    category: 'symbolic',
    code: `! Symbolic Computation in Fortran²
program symbolic_demo
  implicit none
  
  ! Symbolic computation demo
  ! In full implementation, Fortran² would provide
  ! symbolic expression types and operations
  
  print *, "Symbolic Computation Demo"
  print *, "\\n--- Expression Simplification ---"
  
  ! Example symbolic expressions would be:
  ! type(SymbolicExpr) :: expr1, expr2, result
  
  ! expr1 = symbol("x") + symbol("x")
  ! result = simplify(expr1)  ! Should give 2*x
  
  print *, "Simplifying: x + x -> 2*x"
  print *, "Simplifying: x * 1 -> x"
  print *, "Simplifying: x + 0 -> x"
  
  print *, "\\n--- Symbolic Differentiation ---"
  
  ! Derivative of x^2 + 3*x + 1
  print *, "d/dx(x^2 + 3*x + 1) = 2*x + 3"
  
  ! Derivative of sin(x)
  print *, "d/dx(sin(x)) = cos(x)"
  
  ! Derivative of exp(x)
  print *, "d/dx(exp(x)) = exp(x)"
  
  print *, "\\n--- Symbolic Integration ---"
  
  ! Integral of x^2
  print *, "Integral(x^2) = x^3/3 + C"
  
  ! Integral of 1/x
  print *, "Integral(1/x) = ln|x| + C"
  
  print *, "\\n--- Expression Evaluation ---"
  
  ! Evaluating symbolic expression at specific values
  real :: x_val, result
  
  ! If we have: f(x) = x^2 + 2*x + 1
  ! evaluate(f, x = 3.0) = 16.0
  x_val = 3.0
  result = x_val ** 2 + 2.0 * x_val + 1.0
  
  print *, "Evaluating f(x) = x^2 + 2*x + 1 at x =", x_val
  print *, "Result:", result
  
end program symbolic_demo`,
  },
  {
    id: 'arrays-matrices',
    name: 'Arrays & Matrices',
    description: 'Working with arrays and matrices in Fortran²',
    category: 'basic',
    code: `! Arrays and Matrices in Fortran²
program arrays_demo
  implicit none
  
  integer, dimension(5) :: arr1
  real, dimension(3, 3) :: matrix
  integer :: i, j
  
  print *, "Array Operations Demo"
  
  ! Initialize array
  arr1 = [1, 2, 3, 4, 5]
  print *, "Array:", arr1
  
  ! Array operations
  print *, "Sum:", sum(arr1)
  print *, "Product:", product(arr1)
  print *, "Max:", maxval(arr1)
  print *, "Min:", minval(arr1)
  
  ! Matrix initialization
  matrix = reshape([ &
    1.0, 2.0, 3.0, &
    4.0, 5.0, 6.0, &
    7.0, 8.0, 9.0], &
    [3, 3])
  
  print *, "\\nMatrix:"
  do i = 1, 3
    print *, matrix(i, 1), matrix(i, 2), matrix(i, 3)
  end do
  
  ! Matrix operations
  print *, "\\nMatrix transpose:"
  do i = 1, 3
    print *, matrix(1, i), matrix(2, i), matrix(3, i)
  end do
  
  ! Array slicing
  print *, "\\nArray slice arr1(2:4):", arr1(2:4)
  
end program arrays_demo`,
  },
  {
    id: 'control-flow',
    name: 'Control Flow',
    description: 'Conditionals and loops in Fortran²',
    category: 'basic',
    code: `! Control Flow in Fortran²
program control_flow
  implicit none
  
  integer :: x, i
  real :: grade
  
  print *, "Control Flow Demo"
  
  ! If-else statement
  x = 75
  
  if (x > 90) then
    print *, "Grade: A"
  else if (x > 80) then
    print *, "Grade: B"
  else if (x > 70) then
    print *, "Grade: C"
  else if (x > 60) then
    print *, "Grade: D"
  else
    print *, "Grade: F"
  end if
  
  ! Case statement
  grade = 85.0
  
  select case (int(grade / 10))
    case (10, 9)
      print *, "Excellent"
    case (8)
      print *, "Good"
    case (7)
      print *, "Average"
    case (6)
      print *, "Pass"
    case default
      print *, "Need improvement"
  end select
  
  ! Do loop
  print *, "\\nDo loop (1 to 5):"
  do i = 1, 5
    print *, "i =", i
  end do
  
  ! While loop
  print *, "\\nWhile loop:"
  i = 1
  do while (i <= 3)
    print *, "i =", i
    i = i + 1
  end do
  
  ! Loop with step
  print *, "\\nDo loop with step (0 to 10 by 2):"
  do i = 0, 10, 2
    print *, "i =", i
  end do
  
end program control_flow`,
  },
  {
    id: 'functions-procedures',
    name: 'Functions & Procedures',
    description: 'Defining and using functions in Fortran²',
    category: 'basic',
    code: `! Functions and Procedures in Fortran²
program functions_demo
  implicit none
  
  real :: x, result
  real :: area, radius
  
  print *, "Functions and Procedures Demo"
  
  ! Function call
  x = 2.0
  result = factorial(5)
  print *, "factorial(5) =", result
  
  result = fibonacci(10)
  print *, "fibonacci(10) =", result
  
  ! Procedure call
  radius = 5.0
  call circle_area(radius, area)
  print *, "Circle area (r=5):", area
  
contains

  ! Recursive function
  recursive function factorial(n) result(res)
    integer, intent(in) :: n
    integer :: res
    
    if (n <= 1) then
      res = 1
    else
      res = n * factorial(n - 1)
    end if
  end function factorial
  
  ! Iterative function
  function fibonacci(n) result(res)
    integer, intent(in) :: n
    integer :: res
    integer :: a, b, c, i
    
    if (n <= 1) then
      res = n
      return
    end if
    
    a = 0
    b = 1
    do i = 2, n
      c = a + b
      a = b
      b = c
    end do
    res = b
  end function fibonacci
  
  ! Subroutine (procedure)
  subroutine circle_area(r, a)
    real, intent(in) :: r
    real, intent(out) :: a
    real, parameter :: pi = 3.14159265359
    a = pi * r * r
  end subroutine circle_area
  
end program functions_demo`,
  },
];

export function getTemplateById(id: string): PlaygroundTemplate | undefined {
  return playgroundTemplates.find((t) => t.id === id);
}

export function getTemplatesByCategory(
  category: PlaygroundTemplate['category'],
): PlaygroundTemplate[] {
  return playgroundTemplates.filter((t) => t.category === category);
}