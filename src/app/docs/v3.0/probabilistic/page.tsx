import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Info, Dice5 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Probabilistic Programming - Fortran² Documentation',
  description: 'Probability distributions, Bayesian inference, MCMC methods, and Monte Carlo simulation in Fortran².',
};

export default function ProbabilisticPage() {
  return (
    <div className="flex-1 min-w-0 px-6 py-8 md:px-12">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/docs/v3.0" className="text-content-dark-tertiary hover:text-brand-cyan">
            Docs
          </Link>
          <span className="text-content-dark-tertiary">/</span>
          <span className="text-content-dark-secondary">Probabilistic Programming</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-h1 font-heading font-bold text-content-dark-primary">
              Probabilistic Programming
            </h1>
            <Badge variant="primary" className="bg-brand-green/20 text-brand-green">
              <Dice5 className="h-3 w-3 mr-1" /> Core Feature
            </Badge>
          </div>
          <p className="text-lg text-content-dark-secondary">
            Fortran² provides comprehensive probabilistic programming capabilities including probability 
            distributions, Bayesian inference, MCMC methods, and Monte Carlo simulation.
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
              The probabilistic module enables you to express probabilistic models as executable code, 
              making it easy to perform Bayesian inference and statistical analysis.
            </p>
            <ul className="space-y-2 text-content-dark-secondary ml-6">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Distributions:</strong> 40+ probability distributions with full support</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Bayesian Inference:</strong> Posterior computation with variational methods</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>MCMC:</strong> Hamiltonian Monte Carlo, Metropolis-Hastings, Gibbs sampling</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Monte Carlo:</strong> Variance reduction, importance sampling</span>
              </li>
            </ul>
          </section>

          {/* Probability Distributions */}
          <section id="distributions">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Probability Distributions
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Access over 40 probability distributions through the <code className="text-brand-cyan">prob</code> module.
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Continuous Distributions
            </h3>
            <CodeBlock
              code={`use prob
implicit none

type(normal_dist) :: normal
type(exponential_dist) :: exp_dist
type(gamma_dist) :: gamma
type(beta_dist) :: beta
real :: x, mean, pdf_value

! Normal distribution
normal = normal_dist(mean=0.0, std=1.0)
x = normal%sample()              ! Draw a sample
pdf_value = normal%pdf(x)       ! Probability density
cdf_value = normal%cdf(x)       ! Cumulative distribution

! Exponential distribution
exp_dist = exponential_dist(rate=1.5)
x = exp_dist%sample()

! Gamma distribution (shape-rate parameterization)
gamma = gamma_dist(shape=2.0, rate=1.0)

! Beta distribution
beta = beta_dist(alpha=2.0, beta=3.0)`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Discrete Distributions
            </h3>
            <CodeBlock
              code={`use prob
implicit none

type(bernoulli_dist) :: bernoulli
type(poisson_dist) :: poisson
type(binomial_dist) :: binomial
type(categorical_dist) :: categorical
integer :: x

! Bernoulli distribution
bernoulli = bernoulli_dist(prob=0.7)
x = bernoulli%sample()

! Poisson distribution
poisson = poisson_dist(lambda=5.0)
x = poisson%sample()

! Binomial distribution
binomial = binomial_dist(n=10, p=0.3)
x = binomial%sample()

! Categorical (multinomial with single draw)
categorical = categorical_dist([0.1, 0.2, 0.3, 0.4])
x = categorical%sample()`}
              language="fortran"
            />
          </section>

          {/* Bayesian Inference */}
          <section id="bayesian">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Bayesian Inference
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Perform Bayesian inference by combining prior distributions with likelihood functions.
            </p>

            <CodeBlock
              code={`use prob
use mcmc
implicit none

type(bayesian_model) :: model
type(normal_dist) :: prior, likelihood
type(posterior) :: post
real, dimension(1000) :: samples

! Define a Bayesian model: estimate mean of normal data
! Prior: Normal(0, 10)
prior = normal_dist(mean=0.0, std=10.0)

! Observed data: [9.8, 10.2, 9.9, 10.1, 10.0]
real, parameter :: data(5) = [9.8, 10.2, 9.9, 10.1, 10.0]

! Build model
model = bayesian_model()

! Add prior on mean parameter
call model%add_prior("mu", prior)

! Add likelihood: Normal(mu, 1)
likelihood = normal_dist(mean=0.0, std=1.0)
call model%add_likelihood(likelihood, data)

! Compute posterior using MCMC
post = model%infer(n_samples=10000)

! Get posterior statistics
print *, "Posterior mean: ", post%mean("mu")
print *, "Posterior std:  ", post%std("mu")
print *, "95% CI:         ", post%ci("mu", 0.95)`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Conjugate Priors
            </h3>
            <div className="p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 mb-4">
              <div className="flex items-center gap-2 text-brand-cyan mb-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">Performance Tip</span>
              </div>
              <p className="text-sm text-content-dark-secondary">
                When using conjugate priors, Fortran² uses closed-form posterior computation 
                which is much faster than MCMC. The posterior can be computed in milliseconds 
                instead of minutes.
              </p>
            </div>
          </section>

          {/* MCMC Methods */}
          <section id="mcmc">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              MCMC Methods
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Use Markov Chain Monte Carlo methods to sample from complex posterior distributions.
            </p>

            <CodeBlock
              code={`use mcmc
implicit none

type(hmc_sampler) :: hmc
type(metropolis_hastings) :: mh
type(gibbs_sampler) :: gibbs
real, dimension(:,:), allocatable :: chain
integer :: n_warmup, n_samples, n_dims

! Hamiltonian Monte Carlo (HMC)
! Best for continuous, differentiable posteriors
n_warmup = 1000
n_samples = 10000
n_dims = 5  ! 5 parameters

hmc = hmc_sampler(n_dims=n_dims, step_size=0.1, n_steps=10)
call hmc%set_target_log_prob(target_log_prob)
chain = hmc%sample(n_warmup, n_samples)

! Metropolis-Hastings
! Generic MCMC for any log-probability function
mh = metropolis_hastings(n_dims=5, proposal=proposal_gaussian)
chain = mh%sample(n_warmup, n_samples)

! Gibbs Sampling
! For models with conditional distributions
gibbs = gibbs_sampler()
call gibbs%add_conditional("x", conditional_x)
call gibbs%add_conditional("y", conditional_y)
chain = gibbs%sample(n_warmup, n_samples)`}
              language="fortran"
            />
          </section>

          {/* Monte Carlo Simulation */}
          <section id="monte-carlo">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Monte Carlo Simulation
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Perform Monte Carlo simulations with support for variance reduction and importance sampling.
            </p>

            <CodeBlock
              code={`use prob
use mc
implicit none

real :: estimate, variance, result
integer :: n_sim
real, dimension(:), allocatable :: weights

! Basic Monte Carlo
n_sim = 100000
estimate = mc_expectation(f, n_sim)  ! E[f(X)]

! With importance sampling
! When sampling from proposal q, weighting by f/p
allocate(weights(n_sim))
call importance_sampling(f, p, q, estimate, weights)

! Stratified sampling
call stratified_sampling(f, estimate, n_strata=100)

! Antithetic variates (variance reduction)
call antithetic_variates(f, estimate, variance)

! Multi-level Monte Carlo
call multilevel_mc(f, estimate, levels=[10, 100, 1000, 10000])`}
              language="fortran"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Practical Example: Options Pricing
            </h3>
            <CodeBlock
              code={`use prob
use mc
implicit none

real :: S0, K, T, r, sigma
real :: payoff, price
integer :: n_sim

! Black-Scholes parameters
S0 = 100.0    ! Initial stock price
K = 100.0     ! Strike price
T = 1.0       ! Time to maturity
r = 0.05      ! Risk-free rate
sigma = 0.2   ! Volatility
n_sim = 100000

! Simulate stock prices at maturity
! S_T = S_0 * exp((r - 0.5*sigma^2)*T + sigma*sqrt(T)*Z)
! where Z ~ N(0,1)

do i = 1, n_sim
  z = normal_dist(0.0, 1.0)%sample()
  ST = S0 * exp((r - 0.5*sigma**2)*T + sigma*sqrt(T)*z)
  
  ! Call option payoff
  payoff = max(ST - K, 0.0)
  
  ! Discounted expected payoff
  price = price + exp(-r*T) * payoff
end do

price = price / n_sim
print *, "Option price: ", price`}
              language="fortran"
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