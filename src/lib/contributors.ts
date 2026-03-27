/**
 * Contributors Utilities
 * Fetches and processes contributor data from GitHub API with caching and statistics
 */

import { getGitHubApiConfig, getContributorsConfig, config } from './config';

export interface GitHubContributor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
}

export interface GitHubCommit {
  sha: string;
  node_id: string;
  commit: {
    author: {
      name: string;
      email: string;
      date: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
    message: string;
    tree: {
      sha: string;
      url: string;
    };
    url: string;
    comment_count: number;
    verification: {
      verified: boolean;
      reason: string;
      signature: string | null;
      payload: string | null;
    };
  };
  url: string;
  html_url: string;
  comments_url: string;
  author: {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
    html_url: string;
  } | null;
  committer: {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
    html_url: string;
  } | null;
  parents: {
    sha: string;
    url: string;
    html_url: string;
  }[];
}

export interface GitHubPullRequest {
  id: number;
  number: number;
  state: 'open' | 'closed';
  title: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  html_url: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  state: 'open' | 'closed';
  title: string;
  user: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  html_url: string;
  pull_request?: {
    url: string;
    html_url: string;
    diff_url: string;
    patch_url: string;
  };
}

export interface Contributor {
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
}

export interface ContributorStats {
  totalContributors: number;
  totalContributions: number;
  contributionsByType: {
    commits: number;
    pullRequests: number;
    issues: number;
    reviews: number;
  };
  topContributors: Contributor[];
  recentContributions: RecentContribution[];
  monthlyTrends: MonthlyTrend[];
}

export interface RecentContribution {
  id: string;
  type: 'commit' | 'pull_request' | 'issue' | 'review';
  title: string;
  contributor: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  date: string;
  url: string;
  additions?: number;
  deletions?: number;
  changedFiles?: number;
}

export interface MonthlyTrend {
  month: string;
  commits: number;
  pullRequests: number;
  issues: number;
  total: number;
}

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

/**
 * Contributors API client with caching
 */
class ContributorsApiClient {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private githubConfig: ReturnType<typeof getGitHubApiConfig>;
  private contributorsConfig: ReturnType<typeof getContributorsConfig>;

  constructor() {
    this.githubConfig = getGitHubApiConfig();
    this.contributorsConfig = getContributorsConfig();
  }

  /**
   * Get cache duration in milliseconds
   */
  private get cacheDuration(): number {
    return this.contributorsConfig.cacheTtl * 1000;
  }

  /**
   * Get cached data if not expired
   */
  private getCached<T>(key: string): T | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined;
    
    if (!entry) {
      return null;
    }

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  /**
   * Set cache entry
   */
  private setCache<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      expiresAt: Date.now() + this.cacheDuration,
    });
  }

  /**
   * Get headers for GitHub API requests
   */
  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    if (this.githubConfig.token) {
      headers['Authorization'] = `Bearer ${this.githubConfig.token}`;
    }

    return headers;
  }

  /**
   * Parse repository owner and name from config
   */
  private getRepoInfo(): { owner: string; repo: string } {
    const [owner, repo] = this.contributorsConfig.githubRepo.split('/');
    return { owner, repo };
  }

  /**
   * Fetch contributors from GitHub API
   */
  async fetchContributors(): Promise<GitHubContributor[]> {
    const cacheKey = 'contributors';
    const cached = this.getCached<GitHubContributor[]>(cacheKey);
    
    if (cached) {
      if (config.isDevelopment) {
        console.log('[Contributors API] Using cached contributors');
      }
      return cached;
    }

    const { owner, repo } = this.getRepoInfo();
    const url = `${this.githubConfig.baseUrl}/repos/${owner}/${repo}/contributors?per_page=100`;

    try {
      const response = await fetch(url, { headers: this.getHeaders() });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Contributors API] Error ${response.status}: ${errorText}`);
        
        // Return cached data if available, even if expired
        const expiredEntry = this.cache.get(cacheKey);
        if (expiredEntry) {
          return expiredEntry.data as GitHubContributor[];
        }
        
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const contributors: GitHubContributor[] = await response.json();
      
      // Only cache successful responses
      this.setCache(cacheKey, contributors);

      if (config.isDevelopment) {
        console.log(`[Contributors API] Fetched ${contributors.length} contributors`);
      }

      return contributors;
    } catch (error) {
      console.error('[Contributors API] Failed to fetch contributors:', error);
      
      // Return cached data if available, even if expired
      const expiredEntry = this.cache.get(cacheKey);
      if (expiredEntry) {
        return expiredEntry.data as GitHubContributor[];
      }
      
      throw error;
    }
  }

  /**
   * Fetch recent commits from GitHub API
   */
  async fetchRecentCommits(since?: string): Promise<GitHubCommit[]> {
    const cacheKey = `commits-${since || 'recent'}`;
    const cached = this.getCached<GitHubCommit[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const { owner, repo } = this.getRepoInfo();
    let url = `${this.githubConfig.baseUrl}/repos/${owner}/${repo}/commits?per_page=30`;
    
    if (since) {
      url += `&since=${since}`;
    }

    try {
      const response = await fetch(url, { headers: this.getHeaders() });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Contributors API] Error ${response.status}: ${errorText}`);
        
        const expiredEntry = this.cache.get(cacheKey);
        if (expiredEntry) {
          return expiredEntry.data as GitHubCommit[];
        }
        
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const commits: GitHubCommit[] = await response.json();
      this.setCache(cacheKey, commits);

      return commits;
    } catch (error) {
      console.error('[Contributors API] Failed to fetch commits:', error);
      
      const expiredEntry = this.cache.get(cacheKey);
      if (expiredEntry) {
        return expiredEntry.data as GitHubCommit[];
      }
      
      throw error;
    }
  }

  /**
   * Fetch recent pull requests from GitHub API
   */
  async fetchRecentPullRequests(): Promise<GitHubPullRequest[]> {
    const cacheKey = 'pull-requests';
    const cached = this.getCached<GitHubPullRequest[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const { owner, repo } = this.getRepoInfo();
    const url = `${this.githubConfig.baseUrl}/repos/${owner}/${repo}/pulls?state=all&sort=updated&direction=desc&per_page=30`;

    try {
      const response = await fetch(url, { headers: this.getHeaders() });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Contributors API] Error ${response.status}: ${errorText}`);
        
        const expiredEntry = this.cache.get(cacheKey);
        if (expiredEntry) {
          return expiredEntry.data as GitHubPullRequest[];
        }
        
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const pullRequests: GitHubPullRequest[] = await response.json();
      this.setCache(cacheKey, pullRequests);

      return pullRequests;
    } catch (error) {
      console.error('[Contributors API] Failed to fetch pull requests:', error);
      
      const expiredEntry = this.cache.get(cacheKey);
      if (expiredEntry) {
        return expiredEntry.data as GitHubPullRequest[];
      }
      
      throw error;
    }
  }

  /**
   * Fetch recent issues from GitHub API
   */
  async fetchRecentIssues(): Promise<GitHubIssue[]> {
    const cacheKey = 'issues';
    const cached = this.getCached<GitHubIssue[]>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const { owner, repo } = this.getRepoInfo();
    const url = `${this.githubConfig.baseUrl}/repos/${owner}/${repo}/issues?state=all&sort=updated&direction=desc&per_page=30`;

    try {
      const response = await fetch(url, { headers: this.getHeaders() });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Contributors API] Error ${response.status}: ${errorText}`);
        
        const expiredEntry = this.cache.get(cacheKey);
        if (expiredEntry) {
          return expiredEntry.data as GitHubIssue[];
        }
        
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const issues: GitHubIssue[] = await response.json();
      this.setCache(cacheKey, issues);

      return issues;
    } catch (error) {
      console.error('[Contributors API] Failed to fetch issues:', error);
      
      const expiredEntry = this.cache.get(cacheKey);
      if (expiredEntry) {
        return expiredEntry.data as GitHubIssue[];
      }
      
      throw error;
    }
  }

  /**
   * Fetch user details from GitHub API
   */
  async fetchUserDetails(username: string): Promise<Partial<Contributor>> {
    const cacheKey = `user-${username}`;
    const cached = this.getCached<Partial<Contributor>>(cacheKey);
    
    if (cached) {
      return cached;
    }

    const url = `${this.githubConfig.baseUrl}/users/${username}`;

    try {
      const response = await fetch(url, { headers: this.getHeaders() });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Contributors API] Error ${response.status}: ${errorText}`);
        
        const expiredEntry = this.cache.get(cacheKey);
        if (expiredEntry) {
          return expiredEntry.data as Partial<Contributor>;
        }
        
        return {};
      }

      const userData = await response.json();
      const userDetails: Partial<Contributor> = {
        name: userData.name,
        bio: userData.bio,
        company: userData.company,
        location: userData.location,
        blog: userData.blog,
        twitter_username: userData.twitter_username,
        public_repos: userData.public_repos,
        followers: userData.followers,
        following: userData.following,
        created_at: userData.created_at,
      };
      
      this.setCache(cacheKey, userDetails);

      return userDetails;
    } catch (error) {
      console.error(`[Contributors API] Failed to fetch user details for ${username}:`, error);
      
      const expiredEntry = this.cache.get(cacheKey);
      if (expiredEntry) {
        return expiredEntry.data as Partial<Contributor>;
      }
      
      return {};
    }
  }

  /**
   * Parse contributor data
   */
  async parseContributor(contributor: GitHubContributor): Promise<Contributor> {
    const userDetails = await this.fetchUserDetails(contributor.login);
    
    return {
      login: contributor.login,
      id: contributor.id,
      avatar_url: contributor.avatar_url,
      html_url: contributor.html_url,
      contributions: contributor.contributions,
      type: contributor.type,
      ...userDetails,
    };
  }

  /**
   * Get all contributors with details
   */
  async getContributors(): Promise<Contributor[]> {
    const githubContributors = await this.fetchContributors();
    
    // Fetch details for top 20 contributors (to avoid rate limiting)
    const topContributors = githubContributors.slice(0, 20);
    const contributorsWithDetails = await Promise.all(
      topContributors.map((contributor) => this.parseContributor(contributor))
    );
    
    // Add remaining contributors without details
    const remainingContributors = githubContributors.slice(20).map((contributor) => ({
      login: contributor.login,
      id: contributor.id,
      avatar_url: contributor.avatar_url,
      html_url: contributor.html_url,
      contributions: contributor.contributions,
      type: contributor.type,
    }));
    
    return [...contributorsWithDetails, ...remainingContributors];
  }

  /**
   * Parse recent contributions from commits, PRs, and issues
   */
  async getRecentContributions(): Promise<RecentContribution[]> {
    const [commits, pullRequests, issues] = await Promise.all([
      this.fetchRecentCommits(),
      this.fetchRecentPullRequests(),
      this.fetchRecentIssues(),
    ]);

    const contributions: RecentContribution[] = [];

    // Add commits
    for (const commit of commits.slice(0, 10)) {
      if (commit.author) {
        contributions.push({
          id: commit.sha,
          type: 'commit',
          title: commit.commit.message.split('\n')[0],
          contributor: {
            login: commit.author.login,
            avatar_url: commit.author.avatar_url,
            html_url: commit.author.html_url,
          },
          date: commit.commit.author.date,
          url: commit.html_url,
        });
      }
    }

    // Add pull requests
    for (const pr of pullRequests.slice(0, 10)) {
      contributions.push({
        id: `pr-${pr.number}`,
        type: 'pull_request',
        title: pr.title,
        contributor: {
          login: pr.user.login,
          avatar_url: pr.user.avatar_url,
          html_url: pr.user.html_url,
        },
        date: pr.updated_at,
        url: pr.html_url,
      });
    }

    // Add issues (excluding pull requests)
    for (const issue of issues.slice(0, 10)) {
      if (!issue.pull_request) {
        contributions.push({
          id: `issue-${issue.number}`,
          type: 'issue',
          title: issue.title,
          contributor: {
            login: issue.user.login,
            avatar_url: issue.user.avatar_url,
            html_url: issue.user.html_url,
          },
          date: issue.updated_at,
          url: issue.html_url,
        });
      }
    }

    // Sort by date (most recent first)
    contributions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return contributions.slice(0, 20);
  }

  /**
   * Calculate monthly trends from commits
   */
  async getMonthlyTrends(): Promise<MonthlyTrend[]> {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const commits = await this.fetchRecentCommits(sixMonthsAgo.toISOString());
    const pullRequests = await this.fetchRecentPullRequests();
    const issues = await this.fetchRecentIssues();

    // Group by month
    const monthlyData: Record<string, MonthlyTrend> = {};

    // Initialize last 6 months
    for (let i = 0; i < 6; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const monthKey = date.toISOString().slice(0, 7); // YYYY-MM
      monthlyData[monthKey] = {
        month: monthKey,
        commits: 0,
        pullRequests: 0,
        issues: 0,
        total: 0,
      };
    }

    // Count commits by month
    for (const commit of commits) {
      const month = commit.commit.author.date.slice(0, 7);
      if (monthlyData[month]) {
        monthlyData[month].commits++;
      }
    }

    // Count pull requests by month
    for (const pr of pullRequests) {
      const month = pr.created_at.slice(0, 7);
      if (monthlyData[month]) {
        monthlyData[month].pullRequests++;
      }
    }

    // Count issues by month
    for (const issue of issues) {
      if (!issue.pull_request) {
        const month = issue.created_at.slice(0, 7);
        if (monthlyData[month]) {
          monthlyData[month].issues++;
        }
      }
    }

    // Calculate totals
    for (const month of Object.values(monthlyData)) {
      month.total = month.commits + month.pullRequests + month.issues;
    }

    // Sort by month (oldest first)
    return Object.values(monthlyData).sort((a, b) => a.month.localeCompare(b.month));
  }

  /**
   * Get contributor statistics
   */
  async getContributorStats(): Promise<ContributorStats> {
    const [contributors, recentContributions, monthlyTrends] = await Promise.all([
      this.getContributors(),
      this.getRecentContributions(),
      this.getMonthlyTrends(),
    ]);

    // Calculate total contributions
    const totalContributions = contributors.reduce((sum, c) => sum + c.contributions, 0);

    // Calculate contributions by type
    const contributionsByType = {
      commits: recentContributions.filter((c) => c.type === 'commit').length,
      pullRequests: recentContributions.filter((c) => c.type === 'pull_request').length,
      issues: recentContributions.filter((c) => c.type === 'issue').length,
      reviews: 0, // Would need additional API call for reviews
    };

    // Get top 10 contributors
    const topContributors = contributors
      .sort((a, b) => b.contributions - a.contributions)
      .slice(0, 10);

    return {
      totalContributors: contributors.length,
      totalContributions,
      contributionsByType,
      topContributors,
      recentContributions,
      monthlyTrends,
    };
  }

  /**
   * Clear cache (useful for testing or force refresh)
   */
  clearCache(): void {
    this.cache.clear();
    if (config.isDevelopment) {
      console.log('[Contributors API] Cache cleared');
    }
  }
}

// Export singleton instance
export const contributorsApi = new ContributorsApiClient();

// Export convenience functions
export const getContributors = () => contributorsApi.getContributors();
export const getContributorStats = () => contributorsApi.getContributorStats();
export const getRecentContributions = () => contributorsApi.getRecentContributions();
export const getMonthlyTrends = () => contributorsApi.getMonthlyTrends();
