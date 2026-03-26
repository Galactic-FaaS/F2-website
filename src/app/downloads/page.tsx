import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  Github, 
  Monitor, 
  Server,
  Cpu,
  Terminal,
  CheckCircle,
  AlertTriangle,
  FileCode,
  Package,
  ChevronRight,
  Copy,
  ExternalLink
} from 'lucide-react';

const releases = [
  {
    version: 'v2.0.0',
    date: 'March 2026',
    type: 'stable',
    highlights: [
      'New differentiable programming module',
      'Improved symbolic computation engine',
      '20% performance improvement',
      'Full macOS ARM support',
    ],
    downloads: [
      { platform: 'Windows x64', size: '45.2 MB', icon: Monitor, arch: 'x86_64', ext: '.zip' },
      { platform: 'macOS ARM', size: '38.1 MB', icon: Cpu, arch: 'arm64', ext: '.tar.gz' },
      { platform: 'macOS Intel', size: '42.3 MB', icon: Cpu, arch: 'x86_64', ext: '.tar.gz' },
      { platform: 'Linux x64', size: '41.8 MB', icon: Server, arch: 'x86_64', ext: '.tar.gz' },
    ],
  },
  {
    version: 'v2.0.0-rc1',
    date: 'February 2026',
    type: 'beta',
    highlights: [
      'Release candidate for v2.0',
      'Probabilistic programming module (beta)',
      'New standard library functions',
    ],
    downloads: [
      { platform: 'Windows x64', size: '44.8 MB', icon: Monitor, arch: 'x86_64', ext: '.zip' },
      { platform: 'macOS ARM', size: '37.9 MB', icon: Cpu, arch: 'arm64', ext: '.tar.gz' },
      { platform: 'Linux x64', size: '41.5 MB', icon: Server, arch: 'x86_64', ext: '.tar.gz' },
    ],
  },
];

const typeConfig = {
  stable: {
    color: 'success',
    label: 'Stable',
    icon: CheckCircle,
    description: 'Recommended for production use',
  },
  beta: {
    color: 'warning',
    label: 'Beta',
    icon: AlertTriangle,
    description: 'For testing new features',
  },
  nightly: {
    color: 'error',
    label: 'Nightly',
    icon: Terminal,
    description: 'Latest development builds',
  },
} as const;

const systemRequirements = [
  {
    platform: 'Windows',
    icon: Monitor,
    requirements: [
      'Windows 10 or later (64-bit)',
      '4 GB RAM minimum',
      '500 MB disk space',
      'Visual C++ Redistributable 2022',
    ],
  },
  {
    platform: 'macOS',
    icon: Cpu,
    requirements: [
      'macOS 11 (Big Sur) or later',
      '4 GB RAM minimum',
      '500 MB disk space',
      'Apple Silicon or Intel processor',
    ],
  },
  {
    platform: 'Linux',
    icon: Server,
    requirements: [
      'glibc 2.31 or later',
      '4 GB RAM minimum',
      '500 MB disk space',
      'x86_64 architecture',
    ],
  },
];

const installCommands = {
  linux: {
    label: 'Linux/macOS',
    commands: [
      { comment: '# Extract the archive' },
      { code: 'tar -xzf fortran2-2.0.0-linux-x64.tar.gz' },
      { comment: '# Add to PATH (add to ~/.bashrc or ~/.zshrc for persistence)' },
      { code: 'export PATH=$PATH:~/fortran2/bin' },
      { comment: '# Verify installation' },
      { code: 'f2 --version' },
      { output: 'Fortran² v2.0.0' },
    ],
  },
  windows: {
    label: 'Windows (PowerShell)',
    commands: [
      { comment: '# Extract the archive' },
      { code: 'Expand-Archive fortran2-2.0.0-windows-x64.zip -DestinationPath C:\\' },
      { comment: '# Add to PATH (run as Administrator)' },
      { code: '$env:Path += ";C:\\fortran2\\bin"' },
      { comment: '# Verify installation' },
      { code: 'f2 --version' },
      { output: 'Fortran² v2.0.0' },
    ],
  },
};

export const metadata: Metadata = {
  title: 'Download Fortran² - Get Started',
  description: 'Download Fortran² for Windows, macOS, and Linux. Choose from stable releases, beta versions, or nightly builds. MIT licensed open source.',
  openGraph: {
    title: 'Download Fortran² - Get Started',
    description: 'Download Fortran² for Windows, macOS, and Linux. MIT licensed open source.',
    url: 'https://fortran2.io/downloads',
    siteName: 'Fortran²',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Fortran²',
    description: 'Download Fortran² for Windows, macOS, and Linux.',
  },
};

export default function DownloadsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-100 via-carbon-gray-90 to-carbon-blue-100" />
        <div className="absolute inset-0 hero-mesh opacity-40" />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent-cyan/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-carbon-blue-60/10 rounded-full blur-3xl" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-6">
              <Download className="h-3 w-3 mr-1" />
              Downloads
            </Badge>
            <h1 className="text-carbon-display-01 font-light text-carbon-gray-10">
              Get
              <span className="block mt-2 bg-gradient-to-r from-carbon-blue-40 via-accent-cyan to-accent-teal bg-clip-text text-transparent">
                Fortran²
              </span>
            </h1>
            <p className="mt-6 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
              Download the latest release for your platform. Choose between stable releases, 
              beta versions, or nightly builds.
            </p>
          </div>
        </Container>
      </section>

      {/* Quick Download Section */}
      <section className="py-12 bg-carbon-gray-90 border-y border-carbon-gray-80">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <span className="text-carbon-gray-30">Quick download:</span>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2 min-w-[200px]">
                <Monitor className="h-5 w-5" />
                Windows x64
                <span className="text-carbon-xs opacity-70">45.2 MB</span>
              </Button>
              <Button variant="secondary" size="lg" className="gap-2 min-w-[200px]">
                <Cpu className="h-5 w-5" />
                macOS ARM
                <span className="text-carbon-xs opacity-70">38.1 MB</span>
              </Button>
              <Button variant="secondary" size="lg" className="gap-2 min-w-[200px]">
                <Server className="h-5 w-5" />
                Linux x64
                <span className="text-carbon-xs opacity-70">41.8 MB</span>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Release Cards */}
      <section className="py-24 bg-carbon-gray-100">
        <Container>
          <div className="space-y-8">
            {releases.map((release) => {
              const config = typeConfig[release.type as keyof typeof typeConfig];
              return (
                <Card key={release.version} className="overflow-hidden border-carbon-gray-80">
                  {/* Release Header */}
                  <div className="bg-carbon-gray-90 border-b border-carbon-gray-80 px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-lg ${config.color === 'success' ? 'bg-status-success/10' : config.color === 'warning' ? 'bg-status-warning/10' : 'bg-status-error/10'} flex items-center justify-center`}>
                          <config.icon className={`h-5 w-5 ${config.color === 'success' ? 'text-status-success' : config.color === 'warning' ? 'text-status-warning' : 'text-status-error'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-carbon-xl font-semibold text-carbon-gray-10">{release.version}</h3>
                            <Badge variant={config.color as 'success' | 'warning' | 'error'}>{config.label}</Badge>
                          </div>
                          <p className="text-carbon-sm text-carbon-gray-50">{config.description}</p>
                        </div>
                      </div>
                      <span className="text-carbon-sm text-carbon-gray-50">{release.date}</span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="grid gap-8 lg:grid-cols-3">
                      {/* Highlights */}
                      <div className="lg:col-span-1">
                        <h4 className="text-carbon-sm font-semibold text-carbon-gray-20 uppercase tracking-wider mb-4">
                          Release Highlights
                        </h4>
                        <ul className="space-y-3">
                          {release.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-3 text-carbon-sm text-carbon-gray-30">
                              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent-cyan flex-shrink-0" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Downloads */}
                      <div className="lg:col-span-2">
                        <h4 className="text-carbon-sm font-semibold text-carbon-gray-20 uppercase tracking-wider mb-4">
                          Download Options
                        </h4>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {release.downloads.map((download, i) => (
                            <div
                              key={i}
                              className="group flex items-center justify-between p-4 rounded-lg bg-carbon-gray-90 border border-carbon-gray-80 hover:border-carbon-blue-60/50 hover:bg-carbon-gray-80 transition-all cursor-pointer"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-carbon-blue-60/10 flex items-center justify-center group-hover:bg-carbon-blue-60/20 transition-colors">
                                  <download.icon className="h-5 w-5 text-carbon-blue-40" />
                                </div>
                                <div>
                                  <p className="font-medium text-carbon-gray-10">{download.platform}</p>
                                  <p className="text-carbon-xs text-carbon-gray-50">{download.arch} • {download.size}</p>
                                </div>
                              </div>
                              <Download className="h-4 w-4 text-carbon-gray-50 group-hover:text-accent-cyan transition-colors" />
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <Button variant="ghost" size="sm" className="gap-2 text-carbon-gray-40 hover:text-carbon-gray-10">
                            <Github className="h-4 w-4" />
                            View Source
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2 text-carbon-gray-40 hover:text-carbon-gray-10">
                            <FileCode className="h-4 w-4" />
                            Checksums
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2 text-carbon-gray-40 hover:text-carbon-gray-10">
                            <ExternalLink className="h-4 w-4" />
                            Release Notes
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Installation Guide */}
      <section className="py-24 bg-carbon-gray-90">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Installation
            </Badge>
            <h2 className="text-carbon-4xl font-semibold text-carbon-gray-10">
              Quick Start Guide
            </h2>
            <p className="mt-4 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
              Get up and running with Fortran² in minutes. Follow the steps below for your platform.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Linux/macOS */}
            <Card className="overflow-hidden border-carbon-gray-80">
              <div className="bg-carbon-gray-80 px-6 py-4 border-b border-carbon-gray-70">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-status-error" />
                    <div className="h-3 w-3 rounded-full bg-status-warning" />
                    <div className="h-3 w-3 rounded-full bg-status-success" />
                  </div>
                  <span className="text-carbon-sm text-carbon-gray-30 font-mono">Terminal</span>
                </div>
              </div>
              <CardContent className="p-0">
                <div className="p-6 font-mono text-carbon-sm bg-carbon-gray-100">
                  {installCommands.linux.commands.map((cmd, i) => (
                    <div key={i} className="mb-2">
                      {cmd.comment && (
                        <p className="text-carbon-gray-50">{cmd.comment}</p>
                      )}
                      {cmd.code && (
                        <div className="flex items-center gap-2 group">
                          <span className="text-accent-cyan">$</span>
                          <span className="text-carbon-gray-10">{cmd.code}</span>
                          <Copy className="h-3 w-3 text-carbon-gray-50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity" />
                        </div>
                      )}
                      {cmd.output && (
                        <p className="text-status-success pl-4">{cmd.output}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Windows */}
            <Card className="overflow-hidden border-carbon-gray-80">
              <div className="bg-carbon-gray-80 px-6 py-4 border-b border-carbon-gray-70">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-status-error" />
                    <div className="h-3 w-3 rounded-full bg-status-warning" />
                    <div className="h-3 w-3 rounded-full bg-status-success" />
                  </div>
                  <span className="text-carbon-sm text-carbon-gray-30 font-mono">PowerShell</span>
                </div>
              </div>
              <CardContent className="p-0">
                <div className="p-6 font-mono text-carbon-sm bg-carbon-gray-100">
                  {installCommands.windows.commands.map((cmd, i) => (
                    <div key={i} className="mb-2">
                      {cmd.comment && (
                        <p className="text-carbon-gray-50">{cmd.comment}</p>
                      )}
                      {cmd.code && (
                        <div className="flex items-center gap-2 group">
                          <span className="text-carbon-blue-40">PS></span>
                          <span className="text-carbon-gray-10">{cmd.code}</span>
                          <Copy className="h-3 w-3 text-carbon-gray-50 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity" />
                        </div>
                      )}
                      {cmd.output && (
                        <p className="text-status-success pl-4">{cmd.output}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* System Requirements */}
      <section className="py-24 bg-carbon-gray-100">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Requirements
            </Badge>
            <h2 className="text-carbon-4xl font-semibold text-carbon-gray-10">
              System Requirements
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {systemRequirements.map((platform) => (
              <Card key={platform.platform} className="border-carbon-gray-80">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-12 w-12 rounded-xl bg-carbon-blue-60/10 flex items-center justify-center">
                      <platform.icon className="h-6 w-6 text-carbon-blue-40" />
                    </div>
                    <h3 className="text-carbon-xl font-semibold text-carbon-gray-10">{platform.platform}</h3>
                  </div>
                  <ul className="space-y-3">
                    {platform.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-carbon-sm text-carbon-gray-30">
                        <CheckCircle className="h-4 w-4 text-status-success mt-0.5 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Additional Resources */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-90 via-carbon-blue-100 to-carbon-gray-100" />
        <div className="absolute inset-0 hero-mesh opacity-30" />
        
        <Container className="relative z-10">
          <Card className="overflow-hidden border-carbon-blue-60/30 bg-carbon-gray-90/50 backdrop-blur-xl">
            <CardContent className="p-12">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-carbon-blue-60/10 mb-4">
                    <Package className="h-7 w-7 text-carbon-blue-40" />
                  </div>
                  <h3 className="text-carbon-lg font-semibold text-carbon-gray-10 mb-2">Package Managers</h3>
                  <p className="text-carbon-sm text-carbon-gray-40">
                    Install via Homebrew, Scoop, or your favorite package manager.
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-accent-cyan/10 mb-4">
                    <Terminal className="h-7 w-7 text-accent-cyan" />
                  </div>
                  <h3 className="text-carbon-lg font-semibold text-carbon-gray-10 mb-2">Build from Source</h3>
                  <p className="text-carbon-sm text-carbon-gray-40">
                    Clone the repository and build with CMake for custom configurations.
                  </p>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-accent-purple/10 mb-4">
                    <FileCode className="h-7 w-7 text-accent-purple" />
                  </div>
                  <h3 className="text-carbon-lg font-semibold text-carbon-gray-10 mb-2">VS Code Extension</h3>
                  <p className="text-carbon-sm text-carbon-gray-40">
                    Get syntax highlighting, IntelliSense, and debugging support.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}
