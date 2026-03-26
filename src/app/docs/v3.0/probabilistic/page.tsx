import { Metadata } from 'next';
import { CodeBlock } from '@/components/ui/code-block';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowRight, Info, Dice5, CheckCircle2 } from 'lucide-react';

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
              <CheckCircle2 className="h-3 w-3 mr-1" /> Production Ready
            </Badge>
          </div>
          <p className="text-lg text-content-dark-secondary">
            Fortran² provides comprehensive probabilistic programming with 15+ distributions, 
            MCMC/HMC/NUTS samplers, and variational inference for Bayesian modeling.
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
                  <span className="font-medium text-content-dark-primary">15+ Distributions</span>
                  <span className="text-content-dark-secondary ml-2">Normal, Beta, Gamma, Poisson, Bernoulli, and more</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-green/10 border border-brand-green/30">
                <CheckCircle2 className="h-5 w-5 text-brand-green" />
                <div>
                  <span className="font-medium text-content-dark-primary">MCMC Samplers</span>
                  <span className="text-content-dark-secondary ml-2">Metropolis-Hastings, Hamiltonian Monte Carlo (HMC)</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-green/10 border border-brand-green/30">
                <CheckCircle2 className="h-5 w-5 text-brand-green" />
                <div>
                  <span className="font-medium text-content-dark-primary">NUTS Sampler</span>
                  <span className="text-content-dark-secondary ml-2">No-U-Turn Sampler for efficient exploration</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-brand-green/10 border border-brand-green/30">
                <CheckCircle2 className="h-5 w-5 text-brand-green" />
                <div>
                  <span className="font-medium text-content-dark-primary">Variational Inference</span>
                  <span className="text-content-dark-secondary ml-2">ADVI for approximate posterior computation</span>
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
              The probabilistic programming module enables you to express probabilistic models as 
              executable code, making it easy to perform Bayesian inference and statistical analysis.
            </p>
            <ul className="space-y-2 text-content-dark-secondary ml-6">
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Distributions:</strong> 15+ probability distributions with sampling and density functions</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>Bayesian Inference:</strong> Posterior computation with variational methods</span>
              </li>
              <li className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-brand-cyan" />
                <span><strong>MCMC:</strong> Hamiltonian Monte Carlo, Metropolis-Hastings, NUTS</span>
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
              Access 15+ probability distributions with sampling, PDF/PMF, CDF, and quantile functions:
            </p>

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mb-3">
              Continuous Distributions
            </h3>
            <CodeBlock
              code={`! Continuous distributions
let normal_dist = Normal(mean=0.0, std=1.0)
let x = normal_dist.sample()       ! Draw a sample
let pdf_val = normal_dist.pdf(x)   ! Probability density
let cdf_val = normal_dist.cdf(x)   ! Cumulative distribution

! Other continuous distributions
let exp_dist = Exponential(rate=1.5)
let gamma_dist = Gamma(shape=2.0, rate=1.0)
let beta_dist = Beta(alpha=2.0, beta=3.0)
let uniform_dist = Uniform(a=0.0, b=1.0)
let lognormal_dist = LogNormal(mu=0.0, sigma=1.0)`}
              language="fortran"
              filename="continuous.f2"
            />

            <h3 className="text-h4 font-heading font-medium text-content-dark-primary mt-6 mb-3">
              Discrete Distributions
            </h3>
            <CodeBlock
              code={`! Discrete distributions
let bernoulli_dist = Bernoulli(prob=0.7)
let result = bernoulli_dist.sample()  ! Returns 0 or 1

let poisson_dist = Poisson(lambda=5.0)
let count = poisson_dist.sample()

let binomial_dist = Binomial(n=10, p=0.3)
let successes = binomial_dist.sample()

let categorical_dist = Categorical([0.1, 0.2, 0.3, 0.4])
let category = categorical_dist.sample()  ! Returns 0-3`}
              language="fortran"
              filename="discrete.f2"
            />
          </section>

          {/* Bayesian Model Definition */}
          <section id="bayesian-models">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Bayesian Model Definition
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Define probabilistic models using the <code className="text-brand-cyan">probabilistic</code> keyword:
            </p>

            <CodeBlock
              code={`! Define a probabilistic model
probabilistic function coin_flip_model(data)
    integer :: data(:)  ! Array of 0s and 1s
    
    ! Prior: Beta distribution on coin bias
    let theta = sample(Beta(2.0, 2.0))
    
    ! Likelihood: Bernoulli for each observation
    for coin_flip in data {
        observe(Bernoulli(theta), coin_flip)
    }
    
    return theta
end function

! Perform inference
let data = [1, 0, 1, 1, 0, 1, 1, 1, 0, 1]  ! 7 heads, 3 tails
let posterior = infer(coin_flip_model, data, method="NUTS", n_samples=10000)

print("Posterior mean: {posterior.mean}")
print("95% CI: [{posterior.ci_lower}, {posterior.ci_upper}]")`}
              language="fortran"
              filename="bayesian_model.f2"
            />
          </section>

          {/* MCMC Methods */}
          <section id="mcmc">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              MCMC Samplers
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              Fortran² provides multiple MCMC samplers for different use cases:
            </p>

            <CodeBlock
              code={`! Hamiltonian Monte Carlo (HMC)
! Best for continuous, differentiable posteriors
let hmc_samples = infer(model, data, 
    method="HMC",
    n_samples=10000,
    warmup=1000,
    step_size=0.1,
    n_leapfrog=10
)

! No-U-Turn Sampler (NUTS)
! Adaptive HMC that automatically tunes step size and trajectory length
let nuts_samples = infer(model, data,
    method="NUTS",
    n_samples=10000,
    warmup=1000,
    target_accept=0.8
)

! Metropolis-Hastings
! Generic MCMC for any log-probability function
let mh_samples = infer(model, data,
    method="MetropolisHastings",
    n_samples=20000,
    warmup=5000,
    proposal_std=0.5
)`}
              language="fortran"
              filename="mcmc.f2"
            />

            <div className="mt-4 p-4 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30">
              <div className="flex items-center gap-2 text-brand-cyan mb-2">
                <Info className="h-4 w-4" />
                <span className="font-medium">Recommended: NUTS</span>
              </div>
              <p className="text-sm text-content-dark-secondary">
                The No-U-Turn Sampler (NUTS) is recommended for most applications. It automatically 
                adapts the step size and trajectory length, eliminating the need for manual tuning.
              </p>
            </div>
          </section>

          {/* Variational Inference */}
          <section id="variational">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Variational Inference
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              For faster approximate inference, use Automatic Differentiation Variational Inference (ADVI):
            </p>

            <CodeBlock
              code={`! Automatic Differentiation Variational Inference (ADVI)
let vi_result = infer(model, data,
    method="ADVI",
    n_iter=10000,
    learning_rate=0.01
)

! VI returns an approximate posterior distribution
print("Approximate posterior: {vi_result.approx_posterior}")
print("ELBO: {vi_result.elbo}")  ! Evidence Lower Bound

! Sample from approximate posterior
let samples = vi_result.sample(1000)`}
              language="fortran"
              filename="variational.f2"
            />
          </section>

          {/* Linear Regression Example */}
          <section id="linear-regression">
            <h2 className="text-h2 font-heading font-semibold text-content-dark-primary mb-4">
              Example: Bayesian Linear Regression
            </h2>
            <p className="text-content-dark-secondary leading-relaxed mb-4">
              A complete example of Bayesian linear regression:
            </p>

            <CodeBlock
              code={`! Bayesian Linear Regression
probabilistic function linear_regression(x, y)
    real :: x(:), y(:)
    integer :: n = len(y)
    
    ! Priors on regression coefficients
    let alpha = sample(Normal(0.0, 10.0))   ! Intercept
    let beta = sample(Normal(0.0, 10.0))    ! Slope
    let sigma = sample(HalfCauchy(0.0, 5.0))  ! Noise scale
    
    ! Likelihood
    for i in 1..n {
        let mu = alpha + beta * x[i]
        observe(Normal(mu, sigma), y[i])
    }
    
    return (alpha, beta, sigma)
end function

! Generate synthetic data
let x_data = [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]
let y_data = [2.3, 4.1, 5.8, 8.2, 9.9, 12.1, 14.0, 16.2, 18.1, 20.0]

! Run inference
let posterior = infer(linear_regression, x_data, y_data,
    method="NUTS",
    n_samples=5000,
    warmup=1000
)

! Posterior summaries
print("Intercept (alpha): {posterior.alpha.mean} ± {posterior.alpha.std}")
print("Slope (beta): {posterior.beta.mean} ± {posterior.beta.std}")
print("Noise (sigma): {posterior.sigma.mean} ± {posterior.sigma.std}")`}
              language="fortran"
              filename="linear_regression.f2"
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
