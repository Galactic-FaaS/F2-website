import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Github, 
  MessageCircle, 
  Twitter, 
  BookOpen, 
  MessageSquare, 
  Users,
  ArrowRight,
  GitPullRequest,
  Star,
  Heart,
  Code2,
  FileText,
  Globe,
  TestTube
} from 'lucide-react';

const communityChannels = [
  {
    icon: MessageCircle,
    title: 'Discord Server',
    description: 'Join our active community on Discord. Get help, share your projects, and connect with other Fortran² developers.',
    stats: '2.5k+ members',
    statsLabel: 'Active Members',
    href: 'https://discord.gg/fortran',
    cta: 'Join Discord',
    color: 'carbon-blue-40',
    bgColor: 'bg-carbon-blue-60/10',
    borderColor: 'border-carbon-blue-60/30',
  },
  {
    icon: Github,
    title: 'GitHub',
    description: 'Contribute to the Fortran² compiler, standard library, and tools. Report issues and submit pull requests.',
    stats: '1.2k+ stars',
    statsLabel: 'GitHub Stars',
    href: 'https://github.com/fortran-lang',
    cta: 'View Repository',
    color: 'carbon-gray-10',
    bgColor: 'bg-carbon-gray-80/50',
    borderColor: 'border-carbon-gray-70',
  },
  {
    icon: MessageSquare,
    title: 'Discourse Forum',
    description: 'Join the discussion on our community forum. Ask questions, share ideas, and help others.',
    stats: '5k+ posts',
    statsLabel: 'Forum Posts',
    href: 'https://fortran-lang.discourse.group',
    cta: 'Join Forum',
    color: 'accent-purple',
    bgColor: 'bg-accent-purple/10',
    borderColor: 'border-accent-purple/30',
  },
  {
    icon: Twitter,
    title: 'Twitter',
    description: 'Follow us for the latest updates, release announcements, and Fortran² tips and tricks.',
    stats: '8k+ followers',
    statsLabel: 'Followers',
    href: 'https://twitter.com/fortranlang',
    cta: 'Follow Us',
    color: 'accent-cyan',
    bgColor: 'bg-accent-cyan/10',
    borderColor: 'border-accent-cyan/30',
  },
];

const stats = [
  { icon: GitPullRequest, value: '50+', label: 'Contributors', color: 'carbon-blue-40' },
  { icon: Star, value: '1.2k+', label: 'GitHub Stars', color: 'status-warning' },
  { icon: Heart, value: '100+', label: 'Pull Requests', color: 'status-success' },
  { icon: Users, value: '2.5k+', label: 'Community Members', color: 'accent-purple' },
];

const contributionAreas = [
  { 
    title: 'Compiler', 
    description: 'Help improve the Fortran² compiler', 
    icon: Code2,
    color: 'carbon-blue-40',
    bgColor: 'bg-carbon-blue-60/10',
  },
  { 
    title: 'Standard Library', 
    description: 'Contribute to the standard library modules', 
    icon: BookOpen,
    color: 'accent-purple',
    bgColor: 'bg-accent-purple/10',
  },
  { 
    title: 'Documentation', 
    description: 'Write and improve documentation', 
    icon: FileText,
    color: 'status-success',
    bgColor: 'bg-status-success/10',
  },
  { 
    title: 'Examples', 
    description: 'Create example projects and tutorials', 
    icon: Globe,
    color: 'accent-cyan',
    bgColor: 'bg-accent-cyan/10',
  },
  { 
    title: 'Testing', 
    description: 'Write tests and improve test coverage', 
    icon: TestTube,
    color: 'status-warning',
    bgColor: 'bg-status-warning/10',
  },
  { 
    title: 'Website', 
    description: 'Help improve this website', 
    icon: Globe,
    color: 'accent-teal',
    bgColor: 'bg-accent-teal/10',
  },
];

export const metadata: Metadata = {
  title: 'Community - Join the Fortran² Community',
  description: 'Join the Fortran² community! Connect with developers on Discord, GitHub, Discourse, and Twitter. Contribute to the project or get help.',
  openGraph: {
    title: 'Community - Join the Fortran² Community',
    description: 'Join the Fortran² community and connect with developers worldwide.',
    url: 'https://fortran2.io/community',
    siteName: 'Fortran²',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Community - Fortran²',
    description: 'Join the Fortran² community and connect with developers worldwide.',
  },
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-100 via-carbon-gray-90 to-carbon-blue-100" />
        <div className="absolute inset-0 hero-mesh opacity-40" />
        
        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent-purple/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-carbon-blue-60/10 rounded-full blur-3xl" />
        
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="primary" className="mb-6">
              <Users className="h-3 w-3 mr-1" />
              Community
            </Badge>
            <h1 className="text-carbon-display-01 font-light text-carbon-gray-10">
              Join the
              <span className="block mt-2 bg-gradient-to-r from-carbon-blue-40 via-accent-cyan to-accent-purple bg-clip-text text-transparent">
                Fortran² Community
              </span>
            </h1>
            <p className="mt-6 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
              Connect with other developers, get help, share your projects, and 
              contribute to the future of Fortran².
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-carbon-gray-90 border-y border-carbon-gray-80">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-carbon-gray-80 mb-3">
                  <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                </div>
                <div className="text-carbon-2xl font-semibold text-carbon-gray-10">{stat.value}</div>
                <div className="text-carbon-sm text-carbon-gray-50">{stat.label}</div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Community Channels */}
      <section className="py-24 bg-carbon-gray-100">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-carbon-4xl font-semibold text-carbon-gray-10">
              Connect With Us
            </h2>
            <p className="mt-4 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
              Find your preferred way to engage with the Fortran² community.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {communityChannels.map((channel) => (
              <Card 
                key={channel.title} 
                hover
                className={`group cursor-pointer border ${channel.borderColor} hover:shadow-lg hover:shadow-carbon-blue-60/10 transition-all`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`h-12 w-12 rounded-xl ${channel.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                      <channel.icon className={`h-6 w-6 text-${channel.color}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-carbon-xl font-semibold text-carbon-gray-10 group-hover:text-white transition-colors">
                        {channel.title}
                      </h3>
                      <p className="mt-1 text-carbon-sm text-carbon-gray-40 group-hover:text-carbon-gray-30 transition-colors">
                        {channel.description}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div>
                          <span className="text-carbon-sm font-medium text-carbon-gray-20">{channel.stats}</span>
                          <span className="text-carbon-xs text-carbon-gray-50 ml-2">({channel.statsLabel})</span>
                        </div>
                        <Button size="sm" className="gap-2">
                          {channel.cta}
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Contributing Section */}
      <section className="py-24 bg-carbon-gray-90">
        <Container>
          <Card className="overflow-hidden border-carbon-gray-80">
            <div className="bg-gradient-to-r from-carbon-blue-100 via-carbon-gray-90 to-carbon-blue-100 px-8 py-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-accent-purple/10 mb-4">
                  <Users className="h-8 w-8 text-accent-purple" />
                </div>
                <h2 className="text-carbon-4xl font-semibold text-carbon-gray-10">
                  Contribute to Fortran²
                </h2>
                <p className="mt-4 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
                  Help us make Fortran² better! There are many ways to contribute.
                </p>
              </div>
            </div>
            
            <CardContent className="p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {contributionAreas.map((area) => (
                  <div
                    key={area.title}
                    className="group p-5 rounded-xl border border-carbon-gray-70 bg-carbon-gray-100 hover:bg-carbon-gray-90 hover:border-carbon-blue-60/30 transition-all cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`h-10 w-10 rounded-lg ${area.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}>
                        <area.icon className={`h-5 w-5 text-${area.color}`} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-carbon-gray-10 group-hover:text-white transition-colors">
                          {area.title}
                        </h4>
                        <p className="mt-1 text-carbon-sm text-carbon-gray-50">
                          {area.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <Button size="lg" className="gap-2 min-w-[220px]">
                  <GitPullRequest className="h-4 w-4" />
                  View Contribution Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>

      {/* Code of Conduct */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-100 via-carbon-blue-100 to-carbon-gray-100" />
        <div className="absolute inset-0 hero-mesh opacity-20" />
        
        <Container className="relative z-10">
          <Card className="overflow-hidden border-carbon-gray-70 bg-carbon-gray-90/50 backdrop-blur-xl">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-status-success/10 mb-6">
                <Heart className="h-7 w-7 text-status-success" />
              </div>
              <h2 className="text-carbon-3xl font-semibold text-carbon-gray-10">
                Code of Conduct
              </h2>
              <p className="mt-4 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
                We are committed to providing a welcoming and inclusive environment for everyone. 
                Please read our code of conduct before participating.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button variant="secondary" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Read Code of Conduct
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}