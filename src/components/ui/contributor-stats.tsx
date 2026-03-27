import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './card';

/**
 * Contributor Stats Component
 * 
 * Displays contributor statistics including:
 * - Total contributors count
 * - Contributions by type (code, docs, issues, PRs)
 * - Monthly contribution trends
 * - Top contributors leaderboard
 */

const contributorStatsVariants = cva(
  'transition-all duration-carbon-fast ease-carbon',
  {
    variants: {
      variant: {
        default: 'bg-carbon-gray-90 border border-carbon-gray-70',
        elevated: 'bg-carbon-gray-90 border border-carbon-gray-70 shadow-elevation-2',
        glass: 'bg-carbon-gray-90/80 backdrop-blur-xl border border-carbon-gray-70/50',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ContributorStatsProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contributorStatsVariants> {
  stats: {
    totalContributors: number;
    totalContributions: number;
    contributionsByType: {
      commits: number;
      pullRequests: number;
      issues: number;
      reviews: number;
    };
    monthlyTrends: Array<{
      month: string;
      commits: number;
      pullRequests: number;
      issues: number;
      total: number;
    }>;
  };
  showTrends?: boolean;
  showLeaderboard?: boolean;
  topContributors?: Array<{
    login: string;
    avatar_url: string;
    html_url: string;
    contributions: number;
  }>;
}

const ContributorStats = forwardRef<HTMLDivElement, ContributorStatsProps>(
  ({ 
    className, 
    variant, 
    stats, 
    showTrends = true,
    showLeaderboard = true,
    topContributors = [],
    ...props 
  }, ref) => {
    // Format large numbers
    const formatNumber = (num: number): string => {
      if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
      }
      if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}k`;
      }
      return num.toString();
    };

    // Format month for display
    const formatMonth = (monthStr: string): string => {
      const [year, month] = monthStr.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    };

    // Calculate max for trend chart
    const maxTrend = Math.max(...stats.monthlyTrends.map(t => t.total), 1);

    return (
      <div ref={ref} className={cn(contributorStatsVariants({ variant }), className)} {...props}>
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-carbon-04 mb-carbon-06">
          {/* Total Contributors */}
          <Card variant="default" padding="md">
            <CardContent>
              <div className="flex items-center gap-carbon-03">
                <div className="p-carbon-02 rounded-carbon-sm bg-carbon-blue-50/10">
                  <svg className="w-6 h-6 text-carbon-blue-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-carbon-sm text-carbon-gray-40">Total Contributors</p>
                  <p className="text-carbon-2xl font-bold text-carbon-gray-10">
                    {formatNumber(stats.totalContributors)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Contributions */}
          <Card variant="default" padding="md">
            <CardContent>
              <div className="flex items-center gap-carbon-03">
                <div className="p-carbon-02 rounded-carbon-sm bg-carbon-green-50/10">
                  <svg className="w-6 h-6 text-carbon-green-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-carbon-sm text-carbon-gray-40">Total Contributions</p>
                  <p className="text-carbon-2xl font-bold text-carbon-gray-10">
                    {formatNumber(stats.totalContributions)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pull Requests */}
          <Card variant="default" padding="md">
            <CardContent>
              <div className="flex items-center gap-carbon-03">
                <div className="p-carbon-02 rounded-carbon-sm bg-carbon-purple-50/10">
                  <svg className="w-6 h-6 text-carbon-purple-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-carbon-sm text-carbon-gray-40">Pull Requests</p>
                  <p className="text-carbon-2xl font-bold text-carbon-gray-10">
                    {formatNumber(stats.contributionsByType.pullRequests)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Issues */}
          <Card variant="default" padding="md">
            <CardContent>
              <div className="flex items-center gap-carbon-03">
                <div className="p-carbon-02 rounded-carbon-sm bg-carbon-yellow-50/10">
                  <svg className="w-6 h-6 text-carbon-yellow-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-carbon-sm text-carbon-gray-40">Issues</p>
                  <p className="text-carbon-2xl font-bold text-carbon-gray-10">
                    {formatNumber(stats.contributionsByType.issues)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contribution Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-carbon-06">
          {/* Monthly Trends */}
          {showTrends && stats.monthlyTrends.length > 0 && (
            <Card variant="default" padding="md">
              <CardHeader>
                <CardTitle className="text-carbon-lg">Monthly Contribution Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-carbon-03">
                  {stats.monthlyTrends.map((trend) => (
                    <div key={trend.month} className="space-y-carbon-01">
                      <div className="flex items-center justify-between text-carbon-sm">
                        <span className="text-carbon-gray-30">{formatMonth(trend.month)}</span>
                        <span className="text-carbon-gray-10 font-medium">{trend.total}</span>
                      </div>
                      <div className="h-2 bg-carbon-gray-80 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-carbon-blue-50 to-carbon-green-50 rounded-full transition-all duration-500"
                          style={{ width: `${(trend.total / maxTrend) * 100}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-carbon-03 text-carbon-xs text-carbon-gray-40">
                        <span className="flex items-center gap-carbon-01">
                          <span className="w-2 h-2 rounded-full bg-carbon-blue-50" />
                          {trend.commits} commits
                        </span>
                        <span className="flex items-center gap-carbon-01">
                          <span className="w-2 h-2 rounded-full bg-carbon-purple-50" />
                          {trend.pullRequests} PRs
                        </span>
                        <span className="flex items-center gap-carbon-01">
                          <span className="w-2 h-2 rounded-full bg-carbon-yellow-50" />
                          {trend.issues} issues
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Contribution Type Breakdown */}
          <Card variant="default" padding="md">
            <CardHeader>
              <CardTitle className="text-carbon-lg">Contribution Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-carbon-04">
                {/* Commits */}
                <div className="space-y-carbon-02">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-carbon-02">
                      <div className="w-3 h-3 rounded-full bg-carbon-blue-50" />
                      <span className="text-carbon-sm text-carbon-gray-20">Commits</span>
                    </div>
                    <span className="text-carbon-sm font-medium text-carbon-gray-10">
                      {stats.contributionsByType.commits}
                    </span>
                  </div>
                  <div className="h-2 bg-carbon-gray-80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-carbon-blue-50 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(stats.contributionsByType.commits / (stats.contributionsByType.commits + stats.contributionsByType.pullRequests + stats.contributionsByType.issues + stats.contributionsByType.reviews || 1)) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Pull Requests */}
                <div className="space-y-carbon-02">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-carbon-02">
                      <div className="w-3 h-3 rounded-full bg-carbon-purple-50" />
                      <span className="text-carbon-sm text-carbon-gray-20">Pull Requests</span>
                    </div>
                    <span className="text-carbon-sm font-medium text-carbon-gray-10">
                      {stats.contributionsByType.pullRequests}
                    </span>
                  </div>
                  <div className="h-2 bg-carbon-gray-80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-carbon-purple-50 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(stats.contributionsByType.pullRequests / (stats.contributionsByType.commits + stats.contributionsByType.pullRequests + stats.contributionsByType.issues + stats.contributionsByType.reviews || 1)) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Issues */}
                <div className="space-y-carbon-02">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-carbon-02">
                      <div className="w-3 h-3 rounded-full bg-carbon-yellow-50" />
                      <span className="text-carbon-sm text-carbon-gray-20">Issues</span>
                    </div>
                    <span className="text-carbon-sm font-medium text-carbon-gray-10">
                      {stats.contributionsByType.issues}
                    </span>
                  </div>
                  <div className="h-2 bg-carbon-gray-80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-carbon-yellow-50 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(stats.contributionsByType.issues / (stats.contributionsByType.commits + stats.contributionsByType.pullRequests + stats.contributionsByType.issues + stats.contributionsByType.reviews || 1)) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Reviews */}
                <div className="space-y-carbon-02">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-carbon-02">
                      <div className="w-3 h-3 rounded-full bg-carbon-green-50" />
                      <span className="text-carbon-sm text-carbon-gray-20">Reviews</span>
                    </div>
                    <span className="text-carbon-sm font-medium text-carbon-gray-10">
                      {stats.contributionsByType.reviews}
                    </span>
                  </div>
                  <div className="h-2 bg-carbon-gray-80 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-carbon-green-50 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${(stats.contributionsByType.reviews / (stats.contributionsByType.commits + stats.contributionsByType.pullRequests + stats.contributionsByType.issues + stats.contributionsByType.reviews || 1)) * 100}%` 
                      }}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Contributors Leaderboard */}
        {showLeaderboard && topContributors.length > 0 && (
          <Card variant="default" padding="md" className="mt-carbon-06">
            <CardHeader>
              <CardTitle className="text-carbon-lg">Top Contributors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-carbon-03">
                {topContributors.slice(0, 5).map((contributor, index) => (
                  <div
                    key={contributor.login}
                    className="flex items-center gap-carbon-03 p-carbon-03 rounded-carbon-sm bg-carbon-gray-80 hover:bg-carbon-gray-70 transition-colors"
                  >
                    {/* Rank */}
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold',
                      index === 0 ? 'bg-yellow-500 text-yellow-900' :
                      index === 1 ? 'bg-gray-400 text-gray-900' :
                      index === 2 ? 'bg-amber-600 text-amber-900' :
                      'bg-carbon-gray-70 text-carbon-gray-20'
                    )}>
                      {index + 1}
                    </div>

                    {/* Avatar */}
                    <a
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={contributor.avatar_url}
                        alt={`${contributor.login}'s avatar`}
                        className="w-10 h-10 rounded-full border-2 border-carbon-gray-70 hover:border-carbon-blue-50 transition-colors"
                      />
                    </a>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <a
                        href={contributor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-carbon-sm font-medium text-carbon-gray-10 hover:text-carbon-blue-40 transition-colors truncate"
                      >
                        {contributor.login}
                      </a>
                    </div>

                    {/* Contributions */}
                    <div className="text-carbon-sm font-medium text-carbon-gray-20">
                      {formatNumber(contributor.contributions)} contributions
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }
);

ContributorStats.displayName = 'ContributorStats';

export { ContributorStats, contributorStatsVariants };
