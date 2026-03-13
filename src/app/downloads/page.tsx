import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, Github, Apple, Linux, Windows } from 'lucide-react';

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
      { platform: 'Windows x64', size: '45.2 MB', icon: Windows },
      { platform: 'macOS ARM', size: '38.1 MB', icon: Apple },
      { platform: 'macOS Intel', size: '42.3 MB', icon: Apple },
      { platform: 'Linux x64', size: '41.8 MB', icon: Linux },
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
      { platform: 'Windows x64', size: '44.8 MB', icon: Windows },
      { platform: 'macOS ARM', size: '37.9 MB', icon: Apple },
      { platform: 'Linux x64', size: '41.5 MB', icon: Linux },
    ],
  },
];

const typeColors = {
  stable: 'success',
  beta: 'warning',
  nightly: 'error',
} as const;

export default function DownloadsPage() {
  return (
    <div className="py-24">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Downloads
          </Badge>
          <h1 className="font-heading text-4xl font-bold text-content-dark-primary sm:text-5xl">
            Get Fortran²
          </h1>
          <p className="mt-4 text-lg text-content-dark-secondary max-w-2xl mx-auto">
            Download the latest release for your platform. Choose between stable releases, 
            beta versions, or nightly builds.
          </p>
        </div>

        {/* Release Cards */}
        <div className="space-y-8">
          {releases.map((release) => (
            <Card key={release.version} className="overflow-hidden">
              <CardHeader className="border-b border-border-dark bg-surface-dark-tertiary/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <CardTitle className="text-2xl">{release.version}</CardTitle>
                    <Badge variant={typeColors[release.type as keyof typeof typeColors]}>
                      {release.type}
                    </Badge>
                  </div>
                  <span className="text-content-dark-tertiary">{release.date}</span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 lg:grid-cols-3">
                  {/* Highlights */}
                  <div className="lg:col-span-1">
                    <h4 className="font-semibold text-content-dark-primary mb-3">Highlights</h4>
                    <ul className="space-y-2">
                      {release.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-content-dark-secondary">
                          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-cyan flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Downloads */}
                  <div className="lg:col-span-2">
                    <h4 className="font-semibold text-content-dark-primary mb-3">Downloads</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {release.downloads.map((download, i) => (
                        <Button
                          key={i}
                          variant="secondary"
                          className="justify-between"
                        >
                          <span className="flex items-center gap-2">
                            <download.icon className="h-4 w-4" />
                            {download.platform}
                          </span>
                          <span className="text-content-dark-tertiary text-xs">
                            {download.size}
                          </span>
                        </Button>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Github className="h-4 w-4" />
                        View Source
                      </Button>
                      <Button variant="ghost" size="sm">
                        Checksums
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Installation Guide */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-8">
              <h3 className="font-heading text-xl font-semibold text-content-dark-primary mb-4">
                Installation
              </h3>
              <p className="text-content-dark-secondary mb-6">
                After downloading, extract the archive and add the <code className="px-1.5 py-0.5 rounded bg-surface-dark-tertiary text-brand-cyan">bin</code> directory to your PATH.
              </p>
              <div className="font-code text-sm bg-surface-dark-primary p-4 rounded-lg border border-border-dark">
                <p className="text-content-dark-tertiary"># Linux/macOS</p>
                <p className="text-content-dark-primary">$ tar -xzf fortran2-2.0.0-linux-x64.tar.gz</p>
                <p className="text-content-dark-primary">$ export PATH=$PATH:~/fortran2/bin</p>
                <p className="mt-2 text-content-dark-tertiary"># Verify installation</p>
                <p className="text-content-dark-primary">$ f2 --version</p>
                <p className="text-brand-green">Fortran² v2.0.0</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
