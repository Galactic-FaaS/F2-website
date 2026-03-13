import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, BookOpen, CheckCircle } from 'lucide-react';

interface TutorialSection {
  title: string;
  content: string;
  code?: string;
  language?: string;
}

interface Tutorial {
  slug: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  prerequisites?: string[];
  sections: TutorialSection[];
}

const tutorials: Record<string, Tutorial> = {
  'getting-started': {
    slug: 'getting-started',
    title: 'Getting Started with Fortran²',
    description:
      'Complete tutorial for beginners. Install Fortran², set up your environment, and write your first program.',
    level: 'Beginner',
    duration: '30 minutes',
    category: 'Fundamentals',
    prerequisites: ['Basic programming knowledge', 'Command line familiarity'],
    sections: [
      {
        title: 'What is Fortran²?',
        content: `
Fortran² is a modern scientific computing language that combines the performance of Fortran with modern language features. It's designed for:

- **Numerical computing** - Fast matrix operations and numerical algorithms
- **Symbolic mathematics** - Computer algebra and symbolic differentiation
- **Probabilistic programming** - Bayesian inference and statistical modeling
- **Differentiable programming** - Automatic differentiation for machine learning

In this tutorial, you'll learn how to install Fortran² and write your first program.
        `,
      },
      {
        title: 'Installing Fortran²',
        content: 'Fortran² can be installed using pip, conda, or from source. Choose your preferred method below:',
        code: `# Using pip (recommended)
pip install fortran2

# Using conda
conda install fortran2 -c fortran-lang

# Verify installation
f2 --version`,
        language: 'bash',
      },
      {
        title: 'Your First Program',
        content: "Now let's write your first Fortran² program. Create a file called hello.f90:",
        code: `program hello
  ! This is your first Fortran² program
  print *, "Hello, Fortran²!"
  
  ! Let's do some math
  real :: a = 5.0
  real :: b = 3.0
  real :: c
  
  c = a + b
  print *, "5 + 3 =", c
  
  ! Fortran² also supports modern features
  print *, "Fortran² supports:"
  print *, "  - Matrix operations"
  print *, "  - Symbolic math"
  print *, "  - And more!"
end program hello`,
        language: 'fortran',
      },
      {
        title: 'Running Your Program',
        content: 'Execute your program using the f2 command:',
        code: `# Run the program
f2 run hello.f90`,
        language: 'bash',
      },
      {
        title: 'Understanding the Output',
        content: `
You should see output similar to:

\`\`\`
Hello, Fortran²!
5 + 3 = 8.0
Fortran² supports:
  - Matrix operations
  - Symbolic math
  - And more!
\`\`\`

Congratulations! You've written and executed your first Fortran² program.

## Next Steps

Now that you've written your first program, continue to the next tutorial to build your first simulation!
        `,
      },
    ],
  },
  'your-first-simulation': {
    slug: 'your-first-simulation',
    title: 'Your First Simulation',
    description:
      'Build your first scientific simulation from scratch. Learn simulation fundamentals and practical implementation.',
    level: 'Beginner',
    duration: '45 minutes',
    category: 'Simulation',
    prerequisites: ['Completed Getting Started tutorial', 'Basic understanding of physics'],
    sections: [
      {
        title: 'What is Simulation?',
        content: `
Simulation is the approximate imitation of a process or system. In scientific computing, we use simulations to:

- Study systems that are difficult or impossible to observe directly
- Test hypotheses and theories
- Predict future behavior
- Optimize designs and processes

In this tutorial, we'll build a simple simulation of a falling object with air resistance.
        `,
      },
      {
        title: 'Setting Up the Project',
        content: 'Create a new project for your simulation:',
        code: `# Create a new project
f2 new falling-simulation
cd falling-simulation`,
        language: 'bash',
      },
      {
        title: 'The Physics',
        content: `
Our simulation will model a falling object with air resistance. The forces involved are:

1. **Gravity** - pulls the object down: F_g = m * g
2. **Air resistance** - opposes motion: F_d = 0.5 * ρ * v² * C_d * A

Where:
- m = mass
- g = gravitational acceleration (9.81 m/s²)
- ρ = air density (1.225 kg/m³)
- v = velocity
- C_d = drag coefficient
- A = cross-sectional area
        `,
      },
      {
        title: 'Writing the Simulation',
        content: 'Create a new file called simulation.f90:',
        code: `program falling_simulation
  implicit none
  
  ! Physical parameters
  real :: mass = 1.0        ! kg
  real :: g = 9.81         ! m/s²
  real :: rho = 1.225      ! kg/m³
  real :: Cd = 0.47        ! sphere
  real :: area = 0.01      ! m²
  
  ! Simulation parameters
  real :: dt = 0.01        ! time step (s)
  real :: t_max = 10.0     ! maximum time (s)
  
  ! State variables
  real :: position = 0.0   ! m (height above ground)
  real :: velocity = 0.0   ! m/s
  real :: acceleration = 0.0
  real :: t = 0.0
  
  ! Output header
  print '(A10, A12, A12, A12)', "Time(s)", "Height(m)", "Velocity(m/s)", "Accel(m/s²)"
  print '("-"  * 48)'
  
  ! Main simulation loop
  do while (t <= t_max)
    ! Calculate forces
    real :: F_gravity = mass * g
    real :: F_drag = 0.5 * rho * velocity**2 * Cd * area
    
    ! Determine drag direction (always opposes velocity)
    if (velocity > 0) then
      F_drag = -F_drag
    end if
    
    ! Net force and acceleration
    real :: F_net = F_gravity + F_drag
    acceleration = F_net / mass
    
    ! Update state using Euler integration
    velocity = velocity + acceleration * dt
    position = position + velocity * dt
    
    ! Check if object has hit the ground
    if (position <= 0) then
      position = 0.0
      exit
    end if
    
    ! Output current state
    print '(F10.3, F12.3, F12.3, F12.3)', t, position, velocity, acceleration
    
    t = t + dt
  end do
  
  print '("-"  * 48)'
  print *, "Simulation complete!"
  print *, "Final velocity:", velocity, "m/s"
  
end program falling_simulation`,
        language: 'fortran',
      },
      {
        title: 'Running the Simulation',
        content: 'Execute your simulation:',
        code: `# Run the simulation
f2 run simulation.f90`,
        language: 'bash',
      },
      {
        title: 'Visualizing Results',
        content: `
You can visualize the simulation results by redirecting output to a file and plotting:

\`\`\`bash
f2 run simulation.f90 > results.csv
\`\`\`

Then use your favorite plotting tool (Python/Matplotlib, gnuplot, etc.) to visualize:

- Height vs Time
- Velocity vs Time
- Acceleration vs Time

## Understanding the Physics

Notice how:
1. **Initially**, acceleration is close to g (9.81 m/s²)
2. **As velocity increases**, air resistance grows (proportional to v²)
3. **Eventually**, the object reaches terminal velocity where forces balance

## Extensions to Try

- Add wind effects
- Simulate different shapes (different C_d values)
- Implement more accurate integration (Runge-Kutta)
- Add bounce on impact

## Next Steps

Congratulations! You've built your first scientific simulation. Continue exploring:

- [Matrix Operations](/docs/v3.0/advanced-arithmetic)
- [Symbolic Computation](/docs/v3.0/symbolic-computation)
- [Probabilistic Programming](/docs/v3.0/probabilistic)
        `,
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(tutorials).map((slug) => ({ slug }));
}

interface TutorialPageProps {
  params: Promise<{ slug: string }>;
}

export default async function TutorialPage({ params }: TutorialPageProps) {
  const { slug } = await params;
  const tutorial = tutorials[slug];

  if (!tutorial) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16">
        <Container>
          {/* Back Link */}
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-2 text-sm text-content-dark-secondary hover:text-brand-cyan transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tutorials
          </Link>

          {/* Tutorial Header */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary">{tutorial.category}</Badge>
              <Badge
                className={
                  tutorial.level === 'Beginner'
                    ? 'bg-green-500/10 text-green-400 border-green-500/20'
                    : tutorial.level === 'Intermediate'
                    ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                    : 'bg-red-500/10 text-red-400 border-red-500/20'
                }
              >
                {tutorial.level}
              </Badge>
              <span className="text-sm text-content-dark-tertiary flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {tutorial.duration}
              </span>
            </div>

            <h1 className="font-heading text-3xl font-bold text-content-dark-primary md:text-4xl lg:text-5xl">
              {tutorial.title}
            </h1>

            <p className="mt-4 text-lg text-content-dark-secondary">
              {tutorial.description}
            </p>

            {tutorial.prerequisites && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-content-dark-primary mb-2">
                  Prerequisites:
                </h3>
                <ul className="list-disc list-inside text-sm text-content-dark-secondary">
                  {tutorial.prerequisites.map((prereq) => (
                    <li key={prereq}>{prereq}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Tutorial Content */}
          <div className="max-w-4xl">
            {tutorial.sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="font-heading text-2xl font-bold text-content-dark-primary mb-4 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-cyan/10 text-brand-cyan text-sm">
                    {index + 1}
                  </span>
                  {section.title}
                </h2>

                <div className="ml-10">
                  <div className="prose prose-invert prose-cyan max-w-none text-content-dark-secondary">
                    {section.content.split('\n').map((line, i) => {
                      if (line.startsWith('## ')) {
                        return (
                          <h3 key={i} className="text-xl font-bold mt-6 mb-3 text-content-dark-primary">
                            {line.replace('## ', '')}
                          </h3>
                        );
                      }
                      if (line.startsWith('```')) {
                        return null;
                      }
                      if (line.trim().startsWith('- ')) {
                        return (
                          <li key={i} className="ml-4">
                            {line.trim().substring(2)}
                          </li>
                        );
                      }
                      if (line.trim().startsWith('1. ') || line.trim().startsWith('2. ') || line.trim().startsWith('3. ') || line.trim().startsWith('4. ')) {
                        return (
                          <li key={i} className="ml-4">
                            {line.trim().substring(3)}
                          </li>
                        );
                      }
                      if (line.trim() === '') {
                        return <br key={i} />;
                      }
                      // Handle inline code and bold
                      const formattedLine = line
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/`([^`]+)`/g, '<code class="bg-surface-dark-tertiary px-1 rounded text-brand-cyan">$1</code>');
                      return (
                        <p
                          key={i}
                          dangerouslySetInnerHTML={{ __html: formattedLine }}
                        />
                      );
                    })}
                  </div>

                  {section.code && (
                    <div className="mt-6 rounded-xl bg-surface-dark border border-border-dark overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-border-dark">
                        <span className="text-xs text-content-dark-tertiary">
                          {section.language || 'code'}
                        </span>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm text-content-dark-secondary">
                          {section.code}
                        </code>
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-16 flex items-center justify-between border-t border-border-dark pt-8">
            <Link href="/tutorials">
              <Button variant="ghost">
                <ArrowLeft className="h-4 w-4 mr-2" />
                All Tutorials
              </Button>
            </Link>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
