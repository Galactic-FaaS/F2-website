import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, MessageCircle, Twitter, BookOpen, MessageSquare, Users } from 'lucide-react';

const communityChannels = [
  {
    icon: MessageCircle,
    title: 'Discord Server',
    description: 'Join our active community on Discord. Get help, share your projects, and connect with other Fortran² developers.',
    stats: '2.5k+ members',
    href: 'https://discord.gg/fortran',
    cta: 'Join Discord',
  },
  {
    icon: Github,
    title: 'GitHub',
    description: 'Contribute to the Fortran² compiler, standard library, and tools. Report issues and submit pull requests.',
    stats: '1.2k+ stars',
    href: 'https://github.com/fortran-lang',
    cta: 'View Repository',
  },
  {
    icon: MessageSquare,
    title: 'Discourse Forum',
    description: 'Join the discussion on our community forum. Ask questions, share ideas, and help others.',
    stats: '5k+ posts',
    href: 'https://fortran-lang.discourse.group',
    cta: 'Join Forum',
  },
  {
    icon: Twitter,
    title: 'Twitter',
    description: 'Follow us for the latest updates, release announcements, and Fortran² tips and tricks.',
    stats: '8k+ followers',
    href: 'https://twitter.com/fortranlang',
    cta: 'Follow Us',
  },
];

const contributionAreas = [
  { title: 'Compiler', description: 'Help improve the Fortran² compiler' },
  { title: 'Standard Library', description: 'Contribute to the standard library modules' },
  { title: 'Documentation', description: 'Write and improve documentation' },
  { title: 'Examples', description: 'Create example projects and tutorials' },
  { title: 'Testing', description: 'Write tests and improve test coverage' },
  { title: 'Website', description: 'Help improve this website' },
];

export default function CommunityPage() {
  return (
    <div className="py-24">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Community
          </Badge>
          <h1 className="font-heading text-4xl font-bold text-content-dark-primary sm:text-5xl">
            Join the Fortran² Community
          </h1>
          <p className="mt-4 text-lg text-content-dark-secondary max-w-2xl mx-auto">
            Connect with other developers, get help, share your projects, and 
            contribute to the future of Fortran².
          </p>
        </div>

        {/* Community Channels */}
        <div className="grid gap-6 md:grid-cols-2">
          {communityChannels.map((channel) => (
            <Card key={channel.title} hover>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                    <channel.icon className="h-6 w-6 text-brand-cyan" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-lg font-semibold text-content-dark-primary">
                      {channel.title}
                    </h3>
                    <p className="mt-1 text-sm text-content-dark-secondary">
                      {channel.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-content-dark-tertiary">{channel.stats}</span>
                      <Button size="sm">{channel.cta}</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contributing */}
        <div className="mt-20">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="h-16 w-16 rounded-2xl bg-brand-purple/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-brand-purple" />
                </div>
                <h2 className="font-heading text-2xl font-bold text-content-dark-primary">
                  Contribute to Fortran²
                </h2>
                <p className="mt-2 text-content-dark-secondary">
                  Help us make Fortran² better! There are many ways to contribute.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {contributionAreas.map((area) => (
                  <div
                    key={area.title}
                    className="p-4 rounded-lg border border-border-dark bg-surface-dark-primary"
                  >
                    <h4 className="font-semibold text-content-dark-primary">
                      {area.title}
                    </h4>
                    <p className="mt-1 text-sm text-content-dark-secondary">
                      {area.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Button>View Contribution Guide</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
