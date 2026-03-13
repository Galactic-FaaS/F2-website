import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Info, Brain } from 'lucide-react';

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
            <Badge variant="primary" className="bg-brand-purple/20 text-brand-purple">
              <Brain className="h-3 w-3 mr-1" /> Core Feature
            </Badge>
          </div>
          <p className="text-lg text-content-dark-secondary">
            Fortran² provides powerful differentiable programming capabilities including automatic differentiation, 
            neural network layers, gradient descent, and optimization algorithms.
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
              Differentiable programming enables you to compute gradients automatically, making it ideal for:
            </p>
            <ul className="space-y-2 text-content-dark-secondary ml-6">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Machine learning and deep learning</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Physics-informed neural networks</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Optimization and root finding</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span>Sensitivity analysis</span>
              </li>
            </ul>
          </section>

          {/* Automatic Differentiation */}
          <section id="auto-diff">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Automatic Differentiation
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              The <code className="text-brand-cyan">autodiff</code> module provides automatic computation of 
              gradients, jacobians, and hessians.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Forward Mode
            </h3>
            <CodeBlock
              code={`use autodiff
implicit none

type(tensor) :: x, y, dy
type(gradient) :: grad

! Create tensor with gradient tracking
x = tensor([1.0, 2.0, 3.0], requires_grad=.true.)

! Compute function
y = x * x + sin(x)  ! y = x^2 + sin(x)

! Compute gradient dy/dx
grad = y%grad(x)

! Access gradient values
print *, "dy/dx = ", grad%value  ! [2*x + cos(x)] at x=[1,2,3]
                             ! = [2*1+cos(1), 2*2+cos(2), 2*3+cos(3)]

! Compute second derivative (Hessian)
grad = y%grad(x, order=2)`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Reverse Mode (Backpropagation)
            </h3>
            <CodeBlock
              code={`use autodiff
implicit none

type(tensor) :: a, b, c, result

! Create computational graph
a = tensor(3.0, requires_grad=.true.)
b = tensor(4.0, requires_grad=.true.)

! Build computation: c = a^2 + b^2
c = a**2 + b**2

! Forward pass
result = c * 2 + a

! Backward pass (compute gradients)
call result%backward()

! Access gradients
print *, "dresult/da = ", a%grad%value  ! 2*a + 2 = 8
print *, "dresult/db = ", b%grad%value  ! 4*b = 16`}
              language="fortran"
            />
          </section>

          {/* Neural Network Layers */}
          <section id="neural-networks">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Neural Network Layers
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              The <code className="text-brand-cyan">nn</code> module provides common neural network layers 
              with automatic differentiation support.
            </p>

            <CodeBlock
              code={`use nn
implicit none

type(linear_layer) :: linear
type(conv2d_layer) :: conv
type(lstm_layer) :: lstm
type(attention_layer) :: attention
type(tensor) :: input, output

! Dense (Linear) layer
! y = x @ W^T + b
input = tensor([32, 128])  ! batch_size=32, features=128
linear = linear_layer(128, 64)  ! 128 -> 64
output = linear%forward(input)

! Convolution layer
input = tensor([8, 3, 32, 32])  ! batch, channels, height, width
conv = conv2d_layer(3, 64, kernel_size=3, stride=1, padding=1)
output = conv%forward(input)

! LSTM (Long Short-Term Memory)
input = tensor([16, 10, 64])  ! batch=16, seq=10, features=64
lstm = lstm_layer(64, hidden_size=128, num_layers=2)
output = lstm%forward(input)  ! Returns (output, hidden, cell)

! Multi-head Attention
input = tensor([4, 8, 128])  ! batch=4, seq=8, features=128
attention = attention_layer(128, num_heads=8)
output = attention%forward(input, input, input)`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Building a Network
            </h3>
            <CodeBlock
              code={`use nn
implicit none

type(module) :: net
type(sequential) :: layers
type(tensor) :: input, output

! Build a simple MLP
layers = sequential()

call layers%add(linear_layer(784, 256))
call layers%add(relu())           ! Activation function
call layers%add(linear_layer(256, 128))
call layers%add(relu())
call layers%add(linear_layer(128, 10))

! Forward pass
input = tensor([64, 784])  ! 64 samples, 784 features
output = layers%forward(input)

! Get predictions
output = softmax(output, dim=2)
print *, "Predictions shape: ", output%shape

! Compute loss
type(tensor) :: target, loss
target = tensor([1, 2, 3, 4, ...])  ! Class labels
loss = cross_entropy(output, target)

! Backward pass
call loss%backward()

! Access gradients in first layer
type(linear_layer) :: first_layer
first_layer = layers%layers(1)%as_linear()
print *, "W grad shape: ", first_layer%weight%grad%shape`}
              language="fortran"
            />
          </section>

          {/* Gradient Descent */}
          <section id="gradient-descent">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Gradient Descent
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              The <code className="text-brand-cyan">optim</code> module provides various optimization algorithms.
            </p>

            <CodeBlock
              code={`use optim
use autodiff
implicit none

type(optimizer) :: sgd, adam, rmsprop
type(linear_layer) :: layer
type(tensor) :: input, target, loss
real :: learning_rate

! Create optimizer
learning_rate = 0.001

! Stochastic Gradient Descent
sgd = sgd_optimizer([layer%weight, layer%bias], lr=learning_rate, momentum=0.9)

! Adam optimizer (adaptive learning rate)
adam = adam_optimizer([layer%weight, layer%bias], lr=learning_rate, &
                     beta1=0.9, beta2=0.999, eps=1e-8)

! RMSprop
rmsprop = rmsprop_optimizer([layer%weight, layer%bias], lr=learning_rate, &
                           alpha=0.99, eps=1e-8)

! Training loop
do epoch = 1, 100
  do batch = 1, n_batches
    ! Forward pass
    output = model%forward(batch_input)
    
    ! Compute loss
    loss = mse_loss(output, batch_target)
    
    ! Backward pass
    call loss%backward()
    
    ! Update parameters
    call adam%step()
    call adam%zero_grad()
  end do
end do`}
              language="fortran"
            />
          </section>

          {/* Optimization */}
          <section id="optimization">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Optimization
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Beyond neural network training, Fortran² provides general optimization routines.
            </p>

            <CodeBlock
              code={`use optim
use autodiff
implicit none

type(tensor) :: x, result
real :: f_result

! Define objective function
function objective(x) result(f)
  type(tensor) :: x, f
  f = x(1)**2 + x(2)**2 + sin(x(1)) * exp(-x(2))
end function

! Initialize
x = tensor([1.0, 2.0])

! Unconstrained optimization (L-BFGS-B)
result = fmin_lbfgsb(objective, x, max_iter=100)

! Gradient descent
result = fmin_gd(objective, x, lr=0.01, max_iter=1000)

! Newton method (requires gradients)
result = fmin_newton(objective, x)

! Constrained optimization
! Minimize subject to: g(x) <= 0
type(tensor) :: constraints(1)
constraints(1) = x(1) + x(2) - 1.0  ! x1 + x2 <= 1
result = fmin_slsqp(objective, x, constraints=constraints)`}
              language="fortran"
            />

            <div className="mt-4 p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30">
              <div className="flex items-center gap-2 text-brand-cyan mb-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">Physics-Informed Learning</span>
              </div>
              <p className="text-sm text-content-dark-secondary">
                Fortran²'s differentiable programming is ideal for physics-informed neural networks (PINNs), 
                where you can embed physical constraints directly into the loss function.
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