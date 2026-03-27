import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ContributorCard } from '@/components/ui/contributor-card';
import { ContributorStats } from '@/components/ui/contributor-stats';
import { 
  Users, 
  GitPullRequest, 
  Star, 
  Heart,
  Code2,
  FileText,
  MessageSquare,
  ExternalLink,
  Filter,
  RefreshCw
} from 'lucide-react';
import { getContributorsConfig } from '@/lib/config';

// Mock data for static generation
const mockData = {
  contributors: [
    {
      login: 'johndoe',
      id: 1,
      avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
      html_url: 'https://github.com/johndoe',
      contributions: 150,
      type: 'User',
      name: 'John Doe',
      bio: 'Core maintainer of Fortran²',
      company: 'Fortran² Foundation',
      location: 'San Francisco, CA',
      blog: 'https://johndoe.dev',
      twitter_username: 'johndoe',
      public_repos: 45,
      followers: 1200,
      following: 50,
      created_at: '2010-01-01T00:00:00Z',
    },
    {
      login: 'janesmith',
      id: 2,
      avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
      html_url: 'https://github.com/janesmith',
      contributions: 120,
      type: 'User',
      name: 'Jane Smith',
      bio: 'Documentation and tutorials',
      company: 'Tech Corp',
      location: 'New York, NY',
      blog: 'https://janesmith.io',
      twitter_username: 'janesmith',
      public_repos: 30,
      followers: 800,
      following: 100,
      created_at: '2011-05-15T00:00:00Z',
    },
    {
      login: 'bobwilson',
      id: 3,
      avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
      html_url: 'https://github.com/bobwilson',
      contributions: 95,
      type: 'User',
      name: 'Bob Wilson',
      bio: 'Performance optimization specialist',
      company: 'Research Labs',
      location: 'Boston, MA',
      public_repos: 25,
      followers: 500,
      following: 75,
      created_at: '2012-08-20T00:00:00Z',
    },
    {
      login: 'alicejohnson',
      id: 4,
      avatar_url: 'https://avatars.githubusercontent.com/u/4?v=4',
      html_url: 'https://github.com/alicejohnson',
      contributions: 80,
      type: 'User',
      name: 'Alice Johnson',
      bio: 'Testing and quality assurance',
      company: 'Software Inc',
      location: 'Seattle, WA',
      public_repos: 20,
      followers: 400,
      following: 60,
      created_at: '2013-03-10T00:00:00Z',
    },
    {
      login: 'charliebrown',
      id: 5,
      avatar_url: 'https://avatars.githubusercontent.com/u/5?v=4',
      html_url: 'https://github.com/charliebrown',
      contributions: 65,
      type: 'User',
      name: 'Charlie Brown',
      bio: 'Community manager and evangelist',
      company: 'Open Source Foundation',
      location: 'Austin, TX',
      public_repos: 15,
      followers: 300,
      following: 45,
      created_at: '2014-11-05T00:00:00Z',
    },
  ],
  stats: {
    totalContributors: 5,
    totalContributions: 510,
    contributionsByType: {
      commits: 45,
      pullRequests: 12,
      issues: 8,
      reviews: 5,
    },
    monthlyTrends: [
      { month: '2025-10', commits: 15, pullRequests: 3, issues: 2, total: 20 },
      { month: '2025-11', commits: 18, pullRequests: 4, issues: 3, total: 25 },
      { month: '2025-12', commits: 20, pullRequests: 5, issues: 2, total: 27 },
      { month: '2026-01', commits: 22, pullRequests: 4, issues: 3, total: 29 },
      { month: '2026-02', commits: 25, pullRequests: 6, issues: 4, total: 35 },
      { month: '2026-03', commits: 28, pullRequests: 5, issues: 3, total: 36 },
    ],
  },
  recentContributions: [
    {
      id: 'abc123',
      type: 'commit',
      title: 'Fix memory leak in symbolic differentiation',
      contributor: {
        login: 'johndoe',
        avatar_url: 'https://avatars.githubusercontent.com/u/1?v=4',
        html_url: 'https://github.com/johndoe',
      },
      date: '2026-03-25T10:30:00Z',
      url: 'https://github.com/fortransquared/fortransquared/commit/abc123',
    },
    {
      id: 'pr-456',
      type: 'pull_request',
      title: 'Add GPU acceleration for matrix operations',
      contributor: {
        login: 'janesmith',
        avatar_url: 'https://avatars.githubusercontent.com/u/2?v=4',
        html_url: 'https://github.com/janesmith',
      },
      date: '2026-03-24T15:45:00Z',
      url: 'https://github.com/fortransquared/fortransquared/pull/456',
    },
    {
      id: 'issue-789',
      type: 'issue',
      title: 'Documentation missing for probabilistic module',
      contributor: {
        login: 'bobwilson',
        avatar_url: 'https://avatars.githubusercontent.com/u/3?v=4',
        html_url: 'https://github.com/bobwilson',
      },
      date: '2026-03-23T09:20:00Z',
      url: 'https://github.com/fortransquared/fortransquared/issues/789',
    },
    {
      id: 'def456',
      type: 'commit',
      title: 'Update dependencies to latest versions',
      contributor: {
        login: 'alicejohnson',
        avatar_url: 'https://avatars.githubusercontent.com/u/4?v=4',
        html_url: 'https://github.com/alicejohnson',
      },
      date: '2026-03-22T14:15:00Z',
      url: 'https://github.com/fortransquared/fortransquared/commit/def456',
    },
    {
      id: 'pr-321',
      type: 'pull_request',
      title: 'Improve error messages for type mismatches',
      contributor: {
        login: 'charliebrown',
        avatar_url: 'https://avatars.githubusercontent.com/u/5?v=4',
        html_url: 'https://github.com/charliebrown',
      },
      date: '2026-03-21T11:30:00Z',
      url: 'https://github.com/fortransquared/fortransquared/pull/321',
    },
  ],
};

const contributionTypes = [
  { id: 'all', label: 'All Contributions', icon: Users },
  { id: 'commit', label: 'Commits', icon: Code2 },
  { id: 'pull_request', label: 'Pull Requests', icon: GitPullRequest },
  { id: 'issue', label: 'Issues', icon: MessageSquare },
  { id: 'review', label: 'Reviews', icon: FileText },
];

export const metadata: Metadata = {
  title: 'Contributors - Fortran² Community',
  description: 'Meet the amazing contributors who make Fortran² possible. View contribution statistics, recent activity, and top contributors.',
  openGraph: {
    title: 'Contributors - Fortran² Community',
    description: 'Meet the amazing contributors who make Fortran² possible.',
    url: 'https://fortran2.io/contributors',
    siteName: 'Fortran²',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contributors - Fortran²',
    description: 'Meet the amazing contributors who make Fortran² possible.',
  },
};

export default function ContributorsPage() {
  const contributorsConfig = getContributorsConfig();
  
  // Check if contributors dashboard is enabled
  if (!contributorsConfig.enabled) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Container>
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-carbon-gray-80 mb-4">
                <Users className="h-8 w-8 text-carbon-gray-40" />
              </div>
              <h2 className="text-carbon-2xl font-semibold text-carbon-gray-10 mb-2">
                Contributors Dashboard Disabled
              </h2>
              <p className="text-carbon-gray-40">
                The contributors dashboard is currently disabled. Please check the configuration.
              </p>
            </CardContent>
          </Card>
        </Container>
      </div>
    );
  }

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
              Contributors
            </Badge>
            <h1 className="text-carbon-display-01 font-light text-carbon-gray-10">
              Meet Our
              <span className="block mt-2 bg-gradient-to-r from-carbon-blue-40 via-accent-cyan to-accent-purple bg-clip-text text-transparent">
                Amazing Contributors
              </span>
            </h1>
            <p className="mt-6 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
              Fortran² is built by a passionate community of developers, researchers, and enthusiasts. 
              Meet the people who make it all possible.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" className="gap-2">
                <GitPullRequest className="h-4 w-4" />
                Become a Contributor
              </Button>
              <Button variant="secondary" size="lg" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View on GitHub
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-carbon-gray-90 border-y border-carbon-gray-80">
        <Container>
          <ContributorStats 
            stats={mockData.stats}
            topContributors={mockData.contributors.slice(0, 5)}
            showTrends={true}
            showLeaderboard={true}
          />
        </Container>
      </section>

      {/* Contributors Section */}
      <section className="py-24 bg-carbon-gray-100">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-carbon-3xl font-semibold text-carbon-gray-10">
                All Contributors
              </h2>
              <p className="mt-2 text-carbon-gray-40">
                {mockData.contributors.length} contributors have helped build Fortran²
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Contribution Type Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {contributionTypes.map((type) => (
              <Button
                key={type.id}
                variant={type.id === 'all' ? 'primary' : 'ghost'}
                size="sm"
                className="gap-2"
              >
                <type.icon className="h-4 w-4" />
                {type.label}
              </Button>
            ))}
          </div>

          {/* Contributors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockData.contributors.map((contributor, index) => (
              <ContributorCard
                key={contributor.id}
                contributor={contributor}
                showDetails={true}
                showTimeline={true}
                rank={index + 1}
                variant="elevated"
              />
            ))}
          </div>

          {/* Load More */}
          <div className="mt-12 text-center">
            <Button variant="secondary" size="lg" className="gap-2">
              <Users className="h-4 w-4" />
              Load More Contributors
            </Button>
          </div>
        </Container>
      </section>

      {/* Recent Contributions Section */}
      <section className="py-24 bg-carbon-gray-90">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-carbon-3xl font-semibold text-carbon-gray-10">
              Recent Contributions
            </h2>
            <p className="mt-4 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
              See the latest activity from our contributors
            </p>
          </div>

          <div className="space-y-4">
            {mockData.recentContributions.map((contribution) => (
              <Card key={contribution.id} variant="default" padding="md" hover>
                <CardContent>
                  <div className="flex items-start gap-4">
                    {/* Contribution Type Icon */}
                    <div className={`p-2 rounded-lg ${
                      contribution.type === 'commit' ? 'bg-carbon-blue-50/10' :
                      contribution.type === 'pull_request' ? 'bg-carbon-purple-50/10' :
                      'bg-carbon-yellow-50/10'
                    }`}>
                      {contribution.type === 'commit' && <Code2 className="h-5 w-5 text-carbon-blue-40" />}
                      {contribution.type === 'pull_request' && <GitPullRequest className="h-5 w-5 text-carbon-purple-40" />}
                      {contribution.type === 'issue' && <MessageSquare className="h-5 w-5 text-carbon-yellow-40" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <a
                            href={contribution.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-carbon-lg font-medium text-carbon-gray-10 hover:text-carbon-blue-40 transition-colors"
                          >
                            {contribution.title}
                          </a>
                          <div className="mt-1 flex items-center gap-3 text-carbon-sm text-carbon-gray-40">
                            <span className="capitalize">{contribution.type.replace('_', ' ')}</span>
                            <span>•</span>
                            <span>{new Date(contribution.date).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Contributor */}
                        <div className="flex items-center gap-2">
                          <a
                            href={contribution.contributor.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <img
                              src={contribution.contributor.avatar_url}
                              alt={`${contribution.contributor.login}'s avatar`}
                              className="w-8 h-8 rounded-full border border-carbon-gray-70 hover:border-carbon-blue-50 transition-colors"
                            />
                          </a>
                          <a
                            href={contribution.contributor.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-carbon-sm text-carbon-gray-30 hover:text-carbon-blue-40 transition-colors"
                          >
                            @{contribution.contributor.login}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button variant="secondary" size="lg" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              View All Activity on GitHub
            </Button>
          </div>
        </Container>
      </section>

      {/* Become a Contributor Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-carbon-gray-100 via-carbon-blue-100 to-carbon-gray-100" />
        <div className="absolute inset-0 hero-mesh opacity-20" />
        
        <Container className="relative z-10">
          <Card className="overflow-hidden border-carbon-gray-70 bg-carbon-gray-90/50 backdrop-blur-xl">
            <CardContent className="p-12 text-center">
              <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-accent-purple/10 mb-6">
                <Heart className="h-7 w-7 text-accent-purple" />
              </div>
              <h2 className="text-carbon-3xl font-semibold text-carbon-gray-10">
                Become a Contributor
              </h2>
              <p className="mt-4 text-carbon-lg text-carbon-gray-30 max-w-2xl mx-auto">
                Want to contribute to Fortran²? There are many ways to help, from code contributions 
                to documentation, testing, and community support.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button size="lg" className="gap-2">
                  <GitPullRequest className="h-4 w-4" />
                  Contribution Guide
                </Button>
                <Button variant="secondary" size="lg" className="gap-2">
                  <Star className="h-4 w-4" />
                  Star on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}
