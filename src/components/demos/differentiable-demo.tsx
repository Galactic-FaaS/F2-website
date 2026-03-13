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
  ReferenceLine,
  ScatterChart,
  Scatter,
  ZAxis,
  ComposedChart,
  Area
} from 'recharts';

const sampleCode = `! Fortran² Differentiable Programming Demo
! Automatic differentiation for neural networks

program differentiable_demo
  use f2_autodiff
  use f2_nn
  
  type(dense_layer) :: layer1, layer2
  type(dense_layer_grad) :: grad
  real :: input(4, 32), output(2, 32)
  real :: loss, accuracy
  real :: gradients(1)
  integer :: epoch
  
  ! Define neural network architecture
  ! Input: 4 features -> Hidden: 8 -> Output: 2
  layer1 = dense_layer(4, 8, activation='relu')
  layer2 = dense_layer(8, 2, activation='softmax')
  
  ! Forward pass
  input = random_normal(0.0, 1.0, [4, 32])
  output = layer2%forward(layer1%forward(input))
  
  ! Compute loss (cross-entropy)
  loss = cross_entropy_loss(output, target)
  
  ! Backward pass - compute gradients automatically
  grad = backward(loss)
  
  ! Gradient descent update
  layer1%weights = layer1%weights - lr * grad%w1
  layer1%bias = layer1%bias - lr * grad%b1
  
  ! Training loop
  do epoch = 1, 100
    call train_step(input, target, loss, accuracy)
  end do
  
  print *, "Final Loss:", loss
  print *, "Accuracy:", accuracy * 100, "%"
  
end program differentiable_demo`;

interface TrainingData {
  epoch: number;
  loss: number;
  accuracy: number;
  gradient: number;
}

interface WeightData {
  layer: string;
  neuron: number;
  weight: number;
  gradient: number;
}

export function DifferentiableDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Generate training curve data
  const generateTrainingData = (): TrainingData[] => {
    const data: TrainingData[] = [];
    let loss = 2.5;
    let accuracy = 0.1;
    for (let epoch = 0; epoch <= 50; epoch++) {
      loss = loss * 0.92 + Math.random() * 0.05;
      accuracy = Math.min(0.98, accuracy + 0.018 + Math.random() * 0.005);
      data.push({
        epoch,
        loss: parseFloat(loss.toFixed(4)),
        accuracy: parseFloat(accuracy.toFixed(3)),
        gradient: parseFloat((0.5 * Math.exp(-epoch * 0.08) + 0.01).toFixed(4))
      });
    }
    return data;
  };

  // Generate weight visualization data
  const generateWeightData = (): WeightData[] => {
    const data: WeightData[] = [];
    const layers = ['Input→Hidden', 'Hidden→Output'];
    const neurons = [8, 2];
    
    layers.forEach((layer, layerIdx) => {
      for (let n = 0; n < neurons[layerIdx]; n++) {
        const baseWeight = layerIdx === 0 ? 0.3 * Math.sin(n * 0.8) : 0.2 * Math.cos(n * 1.2);
        const gradient = 0.1 * Math.exp(-n * 0.3);
        data.push({
          layer,
          neuron: n,
          weight: parseFloat((baseWeight + (Math.random() - 0.5) * 0.1).toFixed(3)),
          gradient: parseFloat(gradient.toFixed(4))
        });
      }
    });
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
      {/* Training Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="outlined" padding="sm">
          <CardContent className="pt-4">
            <p className="text-xs text-content-dark-tertiary uppercase tracking-wide">Final Loss</p>
            <p className="text-2xl font-mono text-brand-cyan mt-1">0.124</p>
          </CardContent>
        </Card>
        <Card variant="outlined" padding="sm">
          <CardContent className="pt-4">
            <p className="text-xs text-content-dark-tertiary uppercase tracking-wide">Accuracy</p>
            <p className="text-2xl font-mono text-brand-green mt-1">96.8%</p>
          </CardContent>
        </Card>
        <Card variant="outlined" padding="sm">
          <CardContent className="pt-4">
            <p className="text-xs text-content-dark-tertiary uppercase tracking-wide">Epochs</p>
            <p className="text-2xl font-mono text-brand-purple mt-1">50</p>
          </CardContent>
        </Card>
        <Card variant="outlined" padding="sm">
          <CardContent className="pt-4">
            <p className="text-xs text-content-dark-tertiary uppercase tracking-wide">Learning Rate</p>
            <p className="text-2xl font-mono text-amber-500 mt-1">0.001</p>
          </CardContent>
        </Card>
      </div>

      {/* Loss & Accuracy Curves */}
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>Training Curves</CardTitle>
          <CardDescription>Loss and accuracy over 50 epochs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={generateTrainingData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="epoch" 
                  stroke="#94A3B8"
                  label={{ value: 'Epoch', position: 'bottom', fill: '#94A3B8' }}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="#94A3B8"
                  domain={[0, 3]}
                  label={{ value: 'Loss', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
                />
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  stroke="#94A3B8"
                  domain={[0, 1]}
                  label={{ value: 'Accuracy', angle: 90, position: 'insideRight', fill: '#94A3B8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#F8FAFC' }}
                />
                <Area 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="loss" 
                  stroke="#00D4FF" 
                  fill="#00D4FF" 
                  fillOpacity={0.2}
                  name="Loss"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="accuracy" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={false}
                  name="Accuracy"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-cyan" />
              <span className="text-sm text-content-dark-secondary">Cross-Entropy Loss</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-green" />
              <span className="text-sm text-content-dark-secondary">Accuracy</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gradient Flow Visualization */}
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>Gradient Flow</CardTitle>
          <CardDescription>Gradient magnitudes across network layers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateTrainingData().slice(0, 30)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="epoch" 
                  stroke="#94A3B8"
                  label={{ value: 'Epoch', position: 'bottom', fill: '#94A3B8' }}
                />
                <YAxis 
                  stroke="#94A3B8"
                  label={{ value: 'Gradient', angle: -90, position: 'insideLeft', fill: '#94A3B8' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#F8FAFC' }}
                />
                <ReferenceLine y={0.01} stroke="#64748B" strokeDasharray="3 3" />
                <Line 
                  type="monotone" 
                  dataKey="gradient" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={false}
                  name="Gradient Magnitude"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-surface-dark-overlay rounded-lg">
            <p className="text-sm text-content-dark-secondary">
              <span className="text-brand-purple font-semibold">Gradient Flow:</span> Gradients are well-scaled across layers, 
              indicating healthy training dynamics. Vanishing gradient problem avoided.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Weight Heatmap */}
      <Card variant="default" padding="md">
        <CardHeader>
          <CardTitle>Network Weights</CardTitle>
          <CardDescription>Learned weight values by layer and neuron</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="neuron" 
                  type="number" 
                  stroke="#94A3B8"
                  domain={[0, 7]}
                  label={{ value: 'Neuron Index', position: 'bottom', fill: '#94A3B8' }}
                />
                <YAxis 
                  dataKey="layer" 
                  type="category" 
                  stroke="#94A3B8"
                  dataKey="layer"
                  domain={['Input→Hidden', 'Hidden→Output']}
                />
                <ZAxis dataKey="weight" range={[-1, 1]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E293B', 
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                  labelStyle={{ color: '#F8FAFC' }}
                  formatter={(value: number, name: string) => [
                    value.toFixed(3), 
                    name === 'weight' ? 'Weight' : name
                  ]}
                />
                <Scatter 
                  data={generateWeightData()} 
                  fill="#00D4FF"
                  shape="circle"
                >
                  {generateWeightData().map((entry, index) => (
                    <cell 
                      key={`cell-${index}`} 
                      fill={entry.weight > 0 ? '#00D4FF' : '#8B5CF6'} 
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 mt-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-cyan" />
              <span className="text-sm text-content-dark-secondary">Positive weights</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-brand-purple" />
              <span className="text-sm text-content-dark-secondary">Negative weights</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Network Architecture Summary */}
      <Card variant="outlined" padding="md">
        <CardHeader>
          <CardTitle className="text-brand-cyan">Network Architecture</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <Badge variant="primary">Input Layer</Badge>
              <div className="mt-2 px-4 py-2 bg-surface-dark-overlay rounded border border-border-dark">
                4 features
              </div>
            </div>
            <div className="text-2xl text-brand-cyan">→</div>
            <div className="flex flex-col items-center">
              <Badge variant="secondary">Hidden Layer</Badge>
              <div className="mt-2 px-4 py-2 bg-surface-dark-overlay rounded border border-border-dark">
                8 neurons (ReLU)
              </div>
            </div>
            <div className="text-2xl text-brand-cyan">→</div>
            <div className="flex flex-col items-center">
              <Badge variant="success">Output Layer</Badge>
              <div className="mt-2 px-4 py-2 bg-surface-dark-overlay rounded border border-border-dark">
                2 classes (Softmax)
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-surface-dark-overlay rounded-lg">
            <p className="text-sm text-content-dark-secondary">
              <span className="text-brand-green font-semibold">Auto-diff enabled:</span> All operations support 
              automatic differentiation. Gradients computed via backpropagation through the entire computation graph.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  ) : null;

  return (
    <DemoContainer
      title="Differentiable Programming"
      description="Automatic differentiation for neural networks and optimization"
      code={sampleCode}
      language="fortran"
      onRun={runComputation}
      isRunning={isRunning}
      output={outputContent}
    />
  );
}
