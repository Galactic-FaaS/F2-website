import { NextRequest, NextResponse } from 'next/server';
import { contributorsApi } from '@/lib/contributors';
import { config, getContributorsConfig } from '@/lib/config';

// Mock contributor data - used as fallback when GitHub API is unavailable
const mockContributors = {
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const contributorsConfig = getContributorsConfig();

    // Check if contributors dashboard is enabled
    if (!contributorsConfig.enabled) {
      return NextResponse.json(
        { error: 'Contributors dashboard is disabled' },
        { status: 403 }
      );
    }

    // Try to fetch from GitHub API
    let useGitHub = false;
    let contributorsData: typeof mockContributors;

    try {
      const [contributors, stats, recentContributions] = await Promise.all([
        contributorsApi.getContributors(),
        contributorsApi.getContributorStats(),
        contributorsApi.getRecentContributions(),
      ]);

      useGitHub = true;

      if (config.isDevelopment) {
        console.log('[Contributors API] Using GitHub API data');
      }

      contributorsData = {
        contributors,
        stats: {
          totalContributors: stats.totalContributors,
          totalContributions: stats.totalContributions,
          contributionsByType: stats.contributionsByType,
          monthlyTrends: stats.monthlyTrends,
        },
        recentContributions,
      };
    } catch (error) {
      console.warn('[Contributors API] GitHub API unavailable, using fallback data:', error);
      contributorsData = mockContributors;
    }

    // Filter by contribution type if requested
    if (type) {
      const validTypes = ['commit', 'pull_request', 'issue', 'review'];
      if (!validTypes.includes(type)) {
        return NextResponse.json(
          { error: `Invalid contribution type. Must be one of: ${validTypes.join(', ')}` },
          { status: 400 }
        );
      }

      const filteredContributions = contributorsData.recentContributions.filter(
        (c) => c.type === type
      );

      return NextResponse.json({
        contributors: contributorsData.contributors,
        stats: contributorsData.stats,
        recentContributions: filteredContributions.slice(0, limit),
        _meta: {
          source: useGitHub ? 'github' : 'fallback',
          fetchedAt: new Date().toISOString(),
          filteredBy: type,
        },
      });
    }

    // Return all data with limit applied to recent contributions
    const response = {
      contributors: contributorsData.contributors,
      stats: contributorsData.stats,
      recentContributions: contributorsData.recentContributions.slice(0, limit),
      _meta: {
        source: useGitHub ? 'github' : 'fallback',
        fetchedAt: new Date().toISOString(),
      },
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Contributors API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
