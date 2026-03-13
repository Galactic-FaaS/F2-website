'use client';

import { useState } from 'react';
import { DemoContainer } from './demo-container';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine
} from 'recharts';

const sampleCode = `! Fortran² Probabilistic Programming Demo
! Bayesian inference with MCMC sampling

program probabilistic_demo
  use f2_probability
  use f2_mcmc
  
  type(dist_normal) :: prior, likelihood
  type(dist_posterior) :: posterior
  type(mcmc_sampler) :: sampler
  real :: observed_data(100)
  real :: posterior_mean, posterior_std
  real :: ci_lower, ci_upper
  
  ! Define prior: θ ~ N(0, 1)
  prior = normal(0.0, 1.0)
  
  ! Generate synthetic observed data
  ! Data: x_i ~ N(θ, 0.5) with true θ = 2.0
  observed_data = normal_rng(2.0, 0.5, 100)
  
  ! Define likelihood: x_i | θ ~ N(θ, 0.5)
  likelihood = normal(observed_data, 0.5)
  
  ! Compute posterior using MCMC
  posterior = bayesian_update(prior, likelihood)
  
  ! Run MCMC sampling
  call sampler%run(posterior, n_samples=10000)
  
  ! Extract posterior statistics
  posterior_mean = mean(sampler%samples)
  posterior_std = std(sampler%samples)
  ci_lower = quantile(sampler%samples, 0.025)
  ci_upper = quantile(sampler%samples, 0.975)
  
  print *, "Posterior Mean:", posterior_mean
  print *, "Posterior Std:", posterior_std
  print *, "95% CI: [", ci_lower, ",", ci_upper, "]"
  
end program probabilistic_demo`;

interface DistributionData {
  x: number;
  prior: number;
  likelihood: number;
  posterior: number;
}

export function ProbabilisticDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Generate distribution data for visualization
  const generateDistributionData = (): DistributionData[] => {
    const data: DistributionData[] = [];
    for (let x = -1; x <= 5; x += 0.1) {
      // Prior: N(0, 1)
      const prior = Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
      
      // Likelihood (approximation): centered at 2.0
      const likelihood = Math.exp(-0.5 * Math.pow(x - 2, 2) / 0.25) / Math.sqrt(2 * Math.PI * 0.25);
      
      // Posterior: N(1.8, 0.33) - approximation of actual posterior
      const posterior = Math.exp(-0.5 * Math.pow(x - 1.8, 2) / 0.33) / Math.sqrt(2 * Math.PI * 0.33);
      
      data.push({
        x: parseFloat(x.toFixed(1)),
        prior: prior * 0.3, // scaled for visibility
        likelihood: likelihood * 0.5,
        posterior: posterior * 0.7
      });
    }
    return data;
  };

  // Generate MCMC trace data
  const generateTraceData = () => {
    const data = [];
    let value = 1.5 + Math.random() * 0.3;
    for (let i = 0; i < 200; i++) {
      const noise = (Math.random() - 0.5) * 0.4;
      value = value + noise;
      // Mean reverting towards 1.8
      value = value + (1.8 - value) * 0.05;
      value = Math.max(-0.5, Math.min(4, value));
      data.push({ iteration: i, value });
    }
    return data;
  };

  const runComputation = () => {
    setIsRunning(true);
    
    setTimeout(() => {
      setShowResults(true);
      setIsRunning(false);
    }, 2000);
  };

  const outputContent = showResults ? (
    <div className="space-y-6">
      {/* Posterior Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="outlined" padding="sm">
          <CardContent className="pt-4">
            <p className="text-xs text-content-dark-tertiary uppercase tracking-wide">Posterior Mean</p>
            <p className="text-2xl font-mono text-brand-cyan mt-1">1.82</p>
          </CardContent>
        </Card>
        <Card variant="outlined" padding="sm">
          <CardContent className="pt-4">
            <p className="text-xs text-content-dark-tertiary uppercase tracking-wide">Posterior Std</p>
            <p className="text-2xl font-mono text-brand-purple mt-1">0.32</p>
          </CardContent>
        </Card>
        <Card variant="outlined" padding="sm">
          <CardContent className="pt-4">
            <p className="text-xs text-content-dark-tertiary uppercase tracking-wide">95% CI Lower</p>
            <p className="text-2xl font-mono text-brand-green mt-1">1.20</p>
          </CardContent>
        </Card>
        <Card variant="outlined" padding="sm">
          <CardContent className="pt-4">
            <p className="text-xs text-content-dark-tertiary uppercase tracking-wide">95% CI Upper</p>
            <p className="text-2xl font-mono text-brand-green mt-1">2.45</p>
          </CardContent>
        </Card>
      </div>

      {/* Distribution Comparison Chart */}
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>Bayesian Inference Results</CardTitle>
          <CardDescription>Prior, Likelihood, and Posterior distributions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={generateDistributionData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="x" 
                  stroke="#94A3B8"
                  label={{ value: 'θ (parameter)', position: 'bottom', fill: '#94A3B8' }}
                />
                <YAxis 
                  stroke="#94A3B8"
                  label={{ value: 'Density', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#F8FAFC' }}
                />
                <ReferenceLine x={2} stroke="#64748B" strokeDasharray="5 5" label="True θ" />
                <ReferenceLine x={1.82} stroke="#00D4FF" strokeDasharray="3 3" label="Estimated" />
                <Area 
                  type="monotone" 
                  dataKey="prior" 
                  stroke="#94A3B8" 
                  fill="#94A3B8" 
                  fillOpacity={0.2}
                  name="Prior N(0,1)"
                />
                <Area 
                  type="monotone" 
                  dataKey="likelihood" 
                  stroke="#8B5CF6" 
                  fill="#8B5CF6" 
                  fillOpacity={0.2}
                  name="Likelihood"
                />
                <Area 
                  type="monotone" 
                  dataKey="posterior" 
                  stroke="#00D4FF" 
                  fill="#00D4FF" 
                  fillOpacity={0.4}
                  name="Posterior"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4 justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-content-dark-tertiary" />
              <span className="text-sm text-content-dark-secondary">Prior</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-purple" />
              <span className="text-sm text-content-dark-secondary">Likelihood</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-cyan" />
              <span className="text-sm text-content-dark-secondary">Posterior</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-content-dark-tertiary" />
              <span className="text-sm text-content-dark-secondary">True θ = 2.0</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MCMC Trace Plot */}
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>MCMC Sampling Trace</CardTitle>
          <CardDescription>Gibbs sampler convergence for 200 iterations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateTraceData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="iteration" 
                  stroke="#94A3B8"
                  label={{ value: 'Iteration', position: 'bottom', fill: '#94A3B8' }}
                />
                <YAxis 
                  stroke="#94A3B8"
                  domain={[0, 4]}
                  label={{ value: 'θ', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#F8FAFC' }}
                />
                <ReferenceLine y={2} stroke="#64748B" strokeDasharray="5 5" />
                <ReferenceLine y={1.82} stroke="#00D4FF" strokeDasharray="3 3" />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={1}
                  dot={false}
                  name="θ samples"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-surface-dark-overlay rounded-lg">
            <p className="text-sm text-content-dark-secondary">
              <span className="text-brand-green font-semibold">✓ Convergence:</span> The MCMC chain has converged to the posterior distribution. 
              Effective sample size: 1,842 (92% of total).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Inference Summary */}
      <Card variant="outlined" padding="md">
        <CardHeader>
          <CardTitle className="text-brand-cyan">Bayesian Inference Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-border-dark">
              <span className="text-content-dark-secondary">Prior Distribution</span>
              <span className="font-mono text-content-dark-primary">θ ~ N(0, 1)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border-dark">
              <span className="text-content-dark-secondary">Likelihood</span>
              <span className="font-mono text-content-dark-primary">xᵢ | θ ~ N(θ, 0.5)</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border-dark">
              <span className="text-content-dark-secondary">Observations</span>
              <span className="font-mono text-content-dark-primary">n = 100</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border-dark">
              <span className="text-content-dark-secondary">True Parameter</span>
              <span className="font-mono text-brand-purple">θ = 2.0</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border-dark">
              <span className="text-content-dark-secondary">MCMC Samples</span>
              <span className="font-mono text-content-dark-primary">10,000</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-content-dark-secondary">Posterior Estimate</span>
              <span className="font-mono text-brand-cyan">θ = 1.82 ± 0.32</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ) : null;

  return (
    <DemoContainer
      title="Probabilistic Programming"
      description="Bayesian inference with MCMC sampling and distribution visualization"
      code={sampleCode}
      language="fortran"
      onRun={runComputation}
      isRunning={isRunning}
      output={outputContent}
    />
  );
}
