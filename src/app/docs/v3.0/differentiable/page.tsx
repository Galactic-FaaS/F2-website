import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Info, Brain, CheckCircle2, Zap, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Differentiable Programming - Fortran² Documentation',
  description: 'Automatic differentiation, neural network layers, gradient descent, and optimization in Fortran².',
};

export default function DifferentiablePage() {
  return (
    <div className="flex-1 min-w-0 px-6 py-8 md:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/docs/v3.0" className="text-content-dark-tertiary hover:text-brand-cyan">
            Docs
          </Link>
          <span className="text-content-dark-tertiary">/</span>
          <span className="text-content-dark-secondary">Differentiable Programming</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-h1 font-heading font-bold text-content-dark-primary">
              Differentiable Programming
            </h1>
            <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
              <CheckCircle2 className="h-3 w-3 mr-1" /> Production Ready
            </Badge>
          </div>
          <p className="text-lg text-content-dark-secondary">
            Fortran² provides tape-based reverse-mode automatic differentiation (AD) with 
            23 supported operations, enabling gradient-based optimization and machine learning.
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
                  <span className="font-medium text-content-dark-primary">Tape-Based Reverse-Mode AD</span>
                  <span className="text-content-dark-secondary ml-2">Complete implementation with 23 operations</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-green/10 border border-brand-green/30">
                <CheckCircle2 className="h-5 w-5 text-brand-green" />
                <div>
                  <span className="font-medium text-content-dark-primary">Gradient Computation</span>
                  <span className="text-content-dark-secondary ml-2">Automatic gradient for all supported operations</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-green/10 border border-brand-green/30">
                <CheckCircle2 className="h-5 w-5 text-brand-green" />
                <div>
                  <span className="font-medium text-content-dark-primary">Jacobian & Hessian</span>
                  <span className="text-content-dark-secondary ml-2">Vector-Jacobian and Hessian products</span>
                </div>
              </div>
            </div>
          </section>

          {/* Overview */}
          <section id="overview">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Overview
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Differentiable programming extends traditional programming with the ability to 
              automatically compute derivatives of functions. Fortran² uses tape-based reverse-mode 
              AD, which is efficient for functions with many inputs and few outputs (like neural networks).
            </p>
            <ul className="space-y-2 text-content-dark-secondary ml-6">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Machine Learning:</strong> Training neural networks via backpropagation</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Optimization:</strong> Gradient-based optimization algorithms</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Sensitivity Analysis:</strong> Understanding how inputs affect outputs</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Scientific Computing:</strong> Solving differential equations and inverse problems</span>
              </li>
            </ul>
          </section>

          {/* Basic Usage */}
          <section id="basic-usage">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Basic Usage
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Use the <code className="text-brand-cyan">differentiable</code> keyword to mark functions 
              as differentiable. The compiler automatically generates gradient computation code.
            </p>

            <CodeBlock
              code={`! Define a differentiable function
differentiable function f(x, y)
    real :: x, y
    f = x**2 + sin(x * y) + y**3
end function

! Compute function value and gradient
let (value, gradient) = grad(f, [2.0, 3.0])
print("f(2, 3) = {value}")
print("∇f = [{gradient[0]}, {gradient[1]}]")`}
              language="fortran"
              filename="basic_ad.f2"
            />
          </section>

          {/* Reverse Mode AD */}
          <section id="reverse-mode">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Reverse Mode AD (Backpropagation)
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Reverse mode AD records the computation graph on a "tape" during the forward pass, 
              then propagates gradients backward. This is the most efficient mode for scalar-valued 
              functions of many variables.
            </p>

            <CodeBlock
              code={`! Tape-based reverse-mode AD
differentiable function loss(weights, inputs, targets)
    real :: weights(:), inputs(:), targets(:)
    
    ! Forward pass through neural network
    let hidden = relu(matmul(inputs, weights[0]) + biases[0])
    let output = sigmoid(matmul(hidden, weights[1]) + biases[1])
    
    ! Compute loss
    loss = mean((output - targets)**2)
end function

! Training step with automatic gradient
function train_step(weights, inputs, targets, lr)
    real :: weights(:), inputs(:), targets(:), lr
    
    ! Compute gradient
    let (loss_val, gradients) = grad(loss, weights, inputs, targets)
    
    ! Update weights with gradient descent
    weights[0] = weights[0] - lr * gradients[0]
    weights[1] = weights[1] - lr * gradients[1]
    
    return loss_val
end function`}
              language="fortran"
              filename="neural_net.f2"
            />
          </section>

          {/* Supported Operations */}
          <section id="operations">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Supported Operations (23 Total)
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran²'s AD system supports 23 operations with verified gradients:
            </p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2">Elementary Functions</h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code>sin, cos, tan</code></li>
                  <li>• <code>exp, log, sqrt</code></li>
                  <li>• <code>sinh, cosh, tanh</code></li>
                  <li>• <code>asin, acos, atan</code></li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2">Arithmetic Operations</h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• Addition, subtraction, multiplication, division</li>
                  <li>• Power (<code>**</code>)</li>
                  <li>• Negation, absolute value</li>
                  <li>• Matrix multiplication</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2">Neural Network Functions</h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code>relu, sigmoid, softmax</code></li>
                  <li>• <code>leaky_relu, elu</code></li>
                  <li>• <code>dropout</code> (with fixed seed)</li>
                  <li>• <code>batch_norm</code></li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-surface-dark-secondary border border-border-dark">
                <h4 className="font-semibold text-content-dark-primary mb-2">Reduction Operations</h4>
                <ul className="text-sm text-content-dark-secondary space-y-1">
                  <li>• <code>sum, mean</code></li>
                  <li>• <code>max, min</code></li>
                  <li>• <code>norm</code></li>
                  <li>• <code>dot_product</code></li>
                </ul>
              </div>
            </div>
          </section>

          {/* Jacobian and Hessian */}
          <section id="jacobian-hessian">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Jacobian and Hessian Computation
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² provides efficient computation of Jacobians and Hessians:
            </p>

            <CodeBlock
              code={`! Vector-valued function
differentiable function vector_func(x)
    real :: x(3)
    real :: vector_func(3)
    vector_func[0] = x[0]**2 + x[1]
    vector_func[1] = sin(x[0] * x[2])
    vector_func[2] = exp(x[1]) + x[2]
end function

! Compute Jacobian matrix
let J = jacobian(vector_func, [1.0, 2.0, 3.0])
! J is a 3x3 matrix of partial derivatives

! Compute Hessian (matrix of second derivatives)
differentiable function scalar_func(x)
    real :: x(2)
    scalar_func = x[0]**2 + x[0]*x[1] + x[1]**2
end function

let H = hessian(scalar_func, [1.0, 2.0])
! H is a 2x2 symmetric matrix`}
              language="fortran"
              filename="jacobian.f2"
            />
          </section>

          {/* Optimization Example */}
          <section id="optimization">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Gradient-Based Optimization
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Use automatic differentiation for gradient-based optimization:
            </p>

            <CodeBlock
              code={`! Minimize Rosenbrock function using gradient descent
differentiable function rosenbrock(x)
    real :: x(2)
    rosenbrock = (1 - x[0])**2 + 100 * (x[1] - x[0]**2)**2
end function

function main()
    real :: x(2) = [0.0, 0.0]  ! Initial guess
    real :: lr = 0.001
    integer :: i
    
    for i in 1..10000 {
        let (f_val, gradient) = grad(rosenbrock, x)
        
        ! Gradient descent update
        x = x - lr * gradient
        
        if i % 1000 == 0 {
            print("Iteration {i}: f = {f_val:.6f}, x = [{x[0]:.4f}, {x[1]:.4f}]")
        }
    }
    
    print("Minimum at: [{x[0]:.6f}, {x[1]:.6f}]")
    ! Expected: [1.0, 1.0]
end function`}
              language="fortran"
              filename="optimize.f2"
            />
          </section>

          {/* Performance Tips */}
          <section id="performance">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Performance Considerations
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30">
                <div className="flex items-center gap-2 text-brand-cyan mb-2">
                  <Zap className="h-4 w-4" />
                  <span className="font-medium">Memory Efficiency</span>
                </div>
                <p className="text-sm text-content-dark-secondary">
                  The tape records only necessary operations. Use <code>checkpoint()</code> for 
                  long computations to reduce memory usage.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30">
                <div className="flex items-center gap-2 text-brand-cyan mb-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="font-medium">Vectorization</span>
                </div>
                <p className="text-sm text-content-dark-secondary">
                  AD operations are SIMD-vectorized for batch processing. Process multiple 
                  samples simultaneously for best performance.
                </p>
              </div>
            </div>
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
