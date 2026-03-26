/**
 * GitHub API Integration
 * Fetches release data from GitHub API with caching and fallback support
 */

import { getGitHubApiConfig, config } from './config';

export interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
  draft: boolean;
  prerelease: boolean;
  assets: GitHubAsset[];
}

export interface GitHubAsset {
  id: number;
  name: string;
  size: number;
  download_count: number;
  browser_download_url: string;
  content_type: string;
}

export interface ParsedRelease {
  version: string;
  releaseDate: string;
  releaseNotes: string;
  downloads: {
    linux: {
      x64?: string;
      arm64?: string;
    };
    macos: {
      x64?: string;
      arm64?: string;
    };
    windows: {
      x64?: string;
    };
  };
  docker?: string;
  pip?: string;
  conda?: string;
  checksum: Record<string, string>;
}

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

/**
 * GitHub API client with caching
 */
class GitHubApiClient {
  private cache: Map<string, CacheEntry<unknown>> = new Map();
  private cacheDuration = 60 * 60 * 1000; // 1 hour in milliseconds
  private config: ReturnType<typeof getGitHubApiConfig>;

  constructor() {
    this.config = getGitHubApiConfig();
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
   * Fetch releases from GitHub API
   */
  async fetchReleases(): Promise<GitHubRelease[]> {
    const cacheKey = 'releases';
    const cached = this.getCached<GitHubRelease[]>(cacheKey);
    
    if (cached) {
      if (config.isDevelopment) {
        console.log('[GitHub API] Using cached releases');
      }
      return cached;
    }

    const url = `${this.config.baseUrl}/repos/${this.config.owner}/${this.config.repo}/releases`;
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    // Add authentication for higher rate limits
    if (this.config.token) {
      headers['Authorization'] = `Bearer ${this.config.token}`;
    }

    try {
      const response = await fetch(url, { headers });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[GitHub API] Error ${response.status}: ${errorText}`);
        
        // Return cached data if available, even if expired
        const expiredEntry = this.cache.get(cacheKey);
        if (expiredEntry) {
          return expiredEntry.data as GitHubRelease[];
        }
        
        throw new Error(`GitHub API error: ${response.status}`);
      }

      const releases: GitHubRelease[] = await response.json();
      
      // Only cache successful responses
      this.setCache(cacheKey, releases);

      if (config.isDevelopment) {
        console.log(`[GitHub API] Fetched ${releases.length} releases`);
      }

      return releases;
    } catch (error) {
      console.error('[GitHub API] Failed to fetch releases:', error);
      
      // Return cached data if available, even if expired
      const expiredEntry = this.cache.get(cacheKey);
      if (expiredEntry) {
        return expiredEntry.data as GitHubRelease[];
      }
      
      throw error;
    }
  }

  /**
   * Parse GitHub release to our format
   */
  parseRelease(release: GitHubRelease): ParsedRelease {
    const version = release.tag_name.replace(/^v/, '');
    const releaseDate = release.published_at.split('T')[0];
    const releaseNotes = release.body || '';
    
    // Parse assets
    const downloads: ParsedRelease['downloads'] = {
      linux: {},
      macos: {},
      windows: {},
    };
    
    const checksum: Record<string, string> = {};

    for (const asset of release.assets) {
      const name = asset.name.toLowerCase();
      
      // Linux
      if (name.includes('linux')) {
        if (name.includes('x64') || name.includes('x86_64')) {
          downloads.linux.x64 = asset.browser_download_url;
        } else if (name.includes('arm64') || name.includes('aarch64')) {
          downloads.linux.arm64 = asset.browser_download_url;
        }
      }
      
      // macOS
      if (name.includes('macos') || name.includes('darwin')) {
        if (name.includes('x64') || name.includes('x86_64')) {
          downloads.macos.x64 = asset.browser_download_url;
        } else if (name.includes('arm64') || name.includes('aarch64')) {
          downloads.macos.arm64 = asset.browser_download_url;
        }
      }
      
      // Windows
      if (name.includes('windows') || name.includes('win')) {
        downloads.windows.x64 = asset.browser_download_url;
      }
      
      // Checksums
      if (name.includes('checksum') || name.includes('sha')) {
        // Store as-is, would need actual checksum file parsing
        checksum['checksum_file'] = asset.browser_download_url;
      }
    }

    // Generate docker and package manager references
    const docker = `fortranlang/fortran2:${version}`;
    const pip = `fortran2==${version}`;
    const conda = `fortran2=${version}`;

    return {
      version,
      releaseDate,
      releaseNotes,
      downloads,
      docker,
      pip,
      conda,
      checksum,
    };
  }

  /**
   * Get all releases in our format
   */
  async getReleases(): Promise<ParsedRelease[]> {
    const githubReleases = await this.fetchReleases();
    return githubReleases.map((release) => this.parseRelease(release));
  }

  /**
   * Get latest release
   */
  async getLatestRelease(): Promise<ParsedRelease | null> {
    const releases = await this.fetchReleases();
    
    // Filter out drafts and prereleases to get stable release
    const stableRelease = releases.find((r) => !r.draft && !r.prerelease);
    
    if (!stableRelease) {
      return null;
    }
    
    return this.parseRelease(stableRelease);
  }

  /**
   * Get specific release by version
   */
  async getRelease(version: string): Promise<ParsedRelease | null> {
    const releases = await this.fetchReleases();
    const release = releases.find((r) => r.tag_name === `v${version}` || r.tag_name === version);
    
    if (!release) {
      return null;
    }
    
    return this.parseRelease(release);
  }

  /**
   * Clear cache (useful for testing or force refresh)
   */
  clearCache(): void {
    this.cache.clear();
    if (config.isDevelopment) {
      console.log('[GitHub API] Cache cleared');
    }
  }
}

// Export singleton instance
export const githubApi = new GitHubApiClient();

// Export the getReleases function for convenience
export const getReleases = () => githubApi.getReleases();
export const getLatestRelease = () => githubApi.getLatestRelease();
export const getRelease = (version: string) => githubApi.getRelease(version);