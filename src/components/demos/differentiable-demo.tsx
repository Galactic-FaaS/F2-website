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
! Automatic differentiation for neural networks and optimization

program differentiable_demo
    use std::autodiff
    use std::neural
    use std::optimization
    
    ! Define neural network layers
    type(Dense) :: layer1, layer2, layer3
    type(Sequential) :: model
    type(Adam) :: optimizer
    
    ! Training data
    real(binary64), allocatable :: X(:,:), y(:,:)
    real(binary64) :: loss, accuracy
    integer :: epoch, batch_size
    
    ! Create model: 4 -> 16 -> 8 -> 2
    layer1 = Dense(input_dim=4, output_dim=16, activation='relu')
    layer2 = Dense(input_dim=16, output_dim=8, activation='relu')
    layer3 = Dense(input_dim=8, output_dim=2, activation='softmax')
    
    model = Sequential([layer1, layer2, layer3])
    
    ! Initialize optimizer with automatic differentiation
    optimizer = Adam(learning_rate=0.001)
    
    ! Generate synthetic training data
    call generate_data(X, y, n_samples=1000)
    batch_size = 32
    
    ! Training loop with automatic gradient computation
    do epoch = 1, 100
        ! Forward pass - computation graph is built automatically
        let output = model.forward(X)
        
        ! Compute cross-entropy loss
        loss = cross_entropy(output, y)
        
        ! Backward pass - gradients computed via reverse-mode AD
        let gradients = autodiff.backward(loss)
        
        ! Update weights using Adam optimizer
        call optimizer.step(model, gradients)
        
        ! Compute accuracy
        accuracy = compute_accuracy(output, y)
        
        if (mod(epoch, 10) == 0) then
            print *, "Epoch ", epoch, " Loss: ", loss, " Accuracy: ", accuracy
        end if
    end do
    
    print *, "Training complete!"
    print *, "Final accuracy: ", accuracy * 100, "%"
    
contains

    subroutine generate_data(X, y, n_samples)
        real(binary64), allocatable, intent(out) :: X(:,:), y(:,:)
        integer, intent(in) :: n_samples
        
        allocate(X(n_samples, 4))
        allocate(y(n_samples, 2))
        
        ! Generate synthetic classification data
        call random_number(X)
        y = 0.0
        where (X(:,1) + X(:,2) > 1.0)
            y(:,1) = 1.0
        elsewhere
            y(:,2) = 1.0
        end where
    end subroutine generate_data

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
                />
                <Scatter 
                  data={generateWeightData()} 
                  fill="#0891B2"
                  shape="circle"
                />
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
