/**
 * Environment Configuration
 * Manages type-safe access to environment variables with validation and defaults
 */

export interface EnvConfig {
  // Email Services
  mailchimpApiKey: string | null;
  mailchimpAudienceId: string | null;
  sendgridApiKey: string | null;
  newsletterFromEmail: string;
  
  // GitHub
  githubToken: string | null;
  
  // Authentication (NextAuth)
  nextAuthUrl: string | null;
  nextAuthSecret: string | null;
  githubId: string | null;
  githubSecret: string | null;
  
  // Analytics
  analyticsId: string | null;
  
  // App Config
  isDevelopment: boolean;
  isProduction: boolean;

  // Executor Config
  executorType: 'mock' | 'wasm' | 'remote';
  executionTimeout: number;
  maxExecutionTime: number;
  remoteExecutorUrl: string | null;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Get environment variable with type safety
 */
function getEnv(key: string): string | undefined {
  return process.env[key];
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Configuration object with type-safe access
 */
/**
 * Get executor configuration from environment
 */
function getExecutorConfig(): {
  executorType: 'mock' | 'wasm' | 'remote';
  executionTimeout: number;
  maxExecutionTime: number;
  remoteExecutorUrl: string | null;
} {
  const executorType = (getEnv('EXECUTOR_TYPE') as 'mock' | 'wasm' | 'remote') || 'mock';
  const executionTimeout = parseInt(getEnv('EXECUTION_TIMEOUT') || '5000', 10);
  const maxExecutionTime = parseInt(getEnv('MAX_EXECUTION_TIME') || '30000', 10);
  const remoteExecutorUrl = getEnv('REMOTE_EXECUTOR_URL') || null;
  
  return {
    executorType,
    executionTimeout: Math.min(Math.max(executionTimeout, 1000), 60000),
    maxExecutionTime: Math.min(Math.max(maxExecutionTime, 1000), 300000),
    remoteExecutorUrl,
  };
}

/**
 * Executor configuration object
 */
export const executorConfig = getExecutorConfig();

export const config: EnvConfig = {
  // Email Services
  get mailchimpApiKey() {
    return getEnv('MAILCHIMP_API_KEY') || null;
  },
  
  get mailchimpAudienceId() {
    return getEnv('MAILCHIMP_AUDIENCE_ID') || null;
  },
  
  get sendgridApiKey() {
    return getEnv('SENDGRID_API_KEY') || null;
  },
  
  get newsletterFromEmail() {
    const email = getEnv('NEWSLETTER_FROM_EMAIL') || 'noreply@fortran2.org';
    if (!isValidEmail(email)) {
      console.warn(`Invalid NEWSLETTER_FROM_EMAIL: ${email}, using default`);
      return 'noreply@fortran2.org';
    }
    return email;
  },
  
  // GitHub
  get githubToken() {
    return getEnv('GITHUB_TOKEN') || null;
  },
  
  // Authentication (NextAuth)
  get nextAuthUrl() {
    return getEnv('NEXTAUTH_URL') || null;
  },
  
  get nextAuthSecret() {
    return getEnv('NEXTAUTH_SECRET') || null;
  },
  
  get githubId() {
    return getEnv('GITHUB_ID') || null;
  },
  
  get githubSecret() {
    return getEnv('GITHUB_SECRET') || null;
  },
  
  // Analytics
  get analyticsId() {
    return getEnv('ANALYTICS_ID') || null;
  },
  
  // App Config
  get isDevelopment() {
    return process.env.NODE_ENV === 'development';
  },
  
  get isProduction() {
    return process.env.NODE_ENV === 'production';
  },
  
  // Executor Config
  get executorType() {
    return executorConfig.executorType;
  },
  
  get executionTimeout() {
    return executorConfig.executionTimeout;
  },
  
  get maxExecutionTime() {
    return executorConfig.maxExecutionTime;
  },
  
  get remoteExecutorUrl() {
    return executorConfig.remoteExecutorUrl;
  },
};

/**
 * Email service configuration
 */
export interface EmailServiceConfig {
  provider: 'mailchimp' | 'sendgrid' | 'console' | 'none';
  apiKey: string | null;
  audienceId?: string;
  fromEmail: string;
}

/**
 * Get the configured email service
 */
export function getEmailServiceConfig(): EmailServiceConfig {
  const hasMailchimp = config.mailchimpApiKey && config.mailchimpAudienceId;
  const hasSendgrid = config.sendgridApiKey;
  
  if (hasMailchimp) {
    return {
      provider: 'mailchimp',
      apiKey: config.mailchimpApiKey,
      audienceId: config.mailchimpAudienceId || undefined,
      fromEmail: config.newsletterFromEmail,
    };
  }
  
  if (hasSendgrid) {
    return {
      provider: 'sendgrid',
      apiKey: config.sendgridApiKey,
      fromEmail: config.newsletterFromEmail,
    };
  }
  
  if (config.isDevelopment) {
    return {
      provider: 'console',
      apiKey: null,
      fromEmail: config.newsletterFromEmail,
    };
  }
  
  return {
    provider: 'none',
    apiKey: null,
    fromEmail: config.newsletterFromEmail,
  };
}

/**
 * GitHub API configuration
 */
export interface GitHubApiConfig {
  token: string | null;
  owner: string;
  repo: string;
  baseUrl: string;
}

/**
 * Get the configured GitHub API
 */
export function getGitHubApiConfig(): GitHubApiConfig {
  return {
    token: config.githubToken,
    owner: 'fortransquared',
    repo: 'fortransquared',
    baseUrl: 'https://api.github.com',
  };
}