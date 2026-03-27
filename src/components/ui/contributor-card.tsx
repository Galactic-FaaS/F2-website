import { HTMLAttributes, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Card, CardContent } from './card';

/**
 * Contributor Card Component
 * 
 * Displays contributor information including:
 * - Avatar, name, GitHub profile link
 * - Contribution count and type
 * - Contribution timeline
 */

const contributorCardVariants = cva(
  'transition-all duration-carbon-fast ease-carbon',
  {
    variants: {
      variant: {
        default: 'bg-carbon-gray-90 border border-carbon-gray-70',
        elevated: 'bg-carbon-gray-90 border border-carbon-gray-70 shadow-elevation-2',
        glass: 'bg-carbon-gray-90/80 backdrop-blur-xl border border-carbon-gray-70/50',
      },
      size: {
        sm: 'p-carbon-03',
        md: 'p-carbon-05',
        lg: 'p-carbon-06',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface ContributorCardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contributorCardVariants> {
  contributor: {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    contributions: number;
    type: string;
    name?: string;
    bio?: string;
    company?: string;
    location?: string;
    blog?: string;
    twitter_username?: string;
    public_repos?: number;
    followers?: number;
    following?: number;
    created_at?: string;
  };
  showDetails?: boolean;
  showTimeline?: boolean;
  rank?: number;
}

const ContributorCard = forwardRef<HTMLDivElement, ContributorCardProps>(
  ({ 
    className, 
    variant, 
    size, 
    contributor, 
    showDetails = false,
    showTimeline = false,
    rank,
    ...props 
  }, ref) => {
    // Format contribution count
    const formatContributions = (count: number): string => {
      if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}k`;
      }
      return count.toString();
    };

    // Format date
    const formatDate = (dateString?: string): string => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
      });
    };

    // Get contribution badge color based on count
    const getContributionBadgeColor = (count: number): string => {
      if (count >= 100) return 'bg-carbon-blue-50 text-white';
      if (count >= 50) return 'bg-carbon-green-50 text-white';
      if (count >= 20) return 'bg-carbon-yellow-50 text-carbon-gray-90';
      return 'bg-carbon-gray-70 text-carbon-gray-20';
    };

    return (
      <Card
        ref={ref}
        variant={variant}
        padding="none"
        className={cn(contributorCardVariants({ variant, size }), className)}
        {...props}
      >
        <CardContent className="p-0">
          <div className="flex items-start gap-carbon-04">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <a
                href={contributor.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <img
                  src={contributor.avatar_url}
                  alt={`${contributor.login}'s avatar`}
                  className="w-16 h-16 rounded-full border-2 border-carbon-gray-70 hover:border-carbon-blue-50 transition-colors"
                />
              </a>
              
              {/* Rank badge */}
              {rank && rank <= 3 && (
                <div className={cn(
                  'absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                  rank === 1 ? 'bg-yellow-500 text-yellow-900' :
                  rank === 2 ? 'bg-gray-400 text-gray-900' :
                  'bg-amber-600 text-amber-900'
                )}>
                  {rank}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-start justify-between gap-carbon-02">
                <div className="min-w-0">
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <h3 className="text-carbon-lg font-semibold text-carbon-gray-10 hover:text-carbon-blue-40 transition-colors truncate">
                      {contributor.name || contributor.login}
                    </h3>
                  </a>
                  
                  <a
                    href={contributor.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-carbon-sm text-carbon-gray-40 hover:text-carbon-blue-40 transition-colors"
                  >
                    @{contributor.login}
                  </a>
                </div>

                {/* Contribution count badge */}
                <div className={cn(
                  'flex-shrink-0 px-carbon-02 py-carbon-01 rounded-carbon-sm text-carbon-sm font-medium',
                  getContributionBadgeColor(contributor.contributions)
                )}>
                  {formatContributions(contributor.contributions)} contributions
                </div>
              </div>

              {/* Bio */}
              {showDetails && contributor.bio && (
                <p className="mt-carbon-02 text-carbon-sm text-carbon-gray-30 line-clamp-2">
                  {contributor.bio}
                </p>
              )}

              {/* Details */}
              {showDetails && (
                <div className="mt-carbon-03 flex flex-wrap gap-carbon-03 text-carbon-xs text-carbon-gray-40">
                  {contributor.company && (
                    <div className="flex items-center gap-carbon-01">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span>{contributor.company}</span>
                    </div>
                  )}
                  
                  {contributor.location && (
                    <div className="flex items-center gap-carbon-01">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{contributor.location}</span>
                    </div>
                  )}
                  
                  {contributor.public_repos !== undefined && (
                    <div className="flex items-center gap-carbon-01">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      <span>{contributor.public_repos} repos</span>
                    </div>
                  )}
                  
                  {contributor.followers !== undefined && (
                    <div className="flex items-center gap-carbon-01">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>{contributor.followers} followers</span>
                    </div>
                  )}
                  
                  {contributor.created_at && (
                    <div className="flex items-center gap-carbon-01">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Joined {formatDate(contributor.created_at)}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Social links */}
              {showDetails && (
                <div className="mt-carbon-03 flex items-center gap-carbon-03">
                  {contributor.blog && (
                    <a
                      href={contributor.blog.startsWith('http') ? contributor.blog : `https://${contributor.blog}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-carbon-sm text-carbon-blue-40 hover:text-carbon-blue-30 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </a>
                  )}
                  
                  {contributor.twitter_username && (
                    <a
                      href={`https://twitter.com/${contributor.twitter_username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-carbon-sm text-carbon-blue-40 hover:text-carbon-blue-30 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  )}
                </div>
              )}

              {/* Timeline */}
              {showTimeline && contributor.created_at && (
                <div className="mt-carbon-03 pt-carbon-03 border-t border-carbon-gray-70">
                  <div className="flex items-center gap-carbon-02 text-carbon-xs text-carbon-gray-40">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Contributing since {formatDate(contributor.created_at)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

ContributorCard.displayName = 'ContributorCard';

export { ContributorCard, contributorCardVariants };
