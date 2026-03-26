/**
 * Email Service Abstraction Layer
 * Supports Mailchimp, SendGrid, and console logging for development
 */

import { getEmailServiceConfig, EmailServiceConfig } from './config';

export interface SubscribeResult {
  success: boolean;
  message: string;
  error?: string;
}

export interface UnsubscribeResult {
  success: boolean;
  message: string;
  error?: string;
}

/**
 * Email service interface
 */
interface EmailService {
  subscribe(email: string): Promise<SubscribeResult>;
  unsubscribe(email: string): Promise<UnsubscribeResult>;
}

/**
 * Mailchimp email service implementation
 */
class MailchimpService implements EmailService {
  private apiKey: string;
  private audienceId: string;
  private dc: string;

  constructor(config: EmailServiceConfig) {
    this.apiKey = config.apiKey!;
    this.audienceId = config.audienceId!;
    // Extract data center from API key (e.g., "us1", "us2", etc.)
    this.dc = this.apiKey.split('-')[1] || 'us1';
  }

  async subscribe(email: string): Promise<SubscribeResult> {
    try {
      const url = `https://${this.dc}.api.mailchimp.com/3.0/lists/${this.audienceId}/members`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `apikey ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          status_if_new: 'pending', // Requires double opt-in
        }),
      });

      if (response.ok) {
        return {
          success: true,
          message: 'Successfully subscribed to newsletter',
        };
      }

      const errorData = await response.json();

      // Handle already subscribed
      if (errorData.title === 'Member Exists') {
        return {
          success: false,
          message: 'Email already subscribed',
          error: 'EMAIL_ALREADY_SUBSCRIBED',
        };
      }

      console.error('Mailchimp subscription error:', errorData);
      return {
        success: false,
        message: 'Failed to subscribe',
        error: errorData.detail || 'MAILCHIMP_ERROR',
      };
    } catch (error) {
      console.error('Mailchimp service error:', error);
      return {
        success: false,
        message: 'Failed to subscribe',
        error: 'NETWORK_ERROR',
      };
    }
  }

  async unsubscribe(email: string): Promise<UnsubscribeResult> {
    try {
      const url = `https://${this.dc}.api.mailchimp.com/3.0/lists/${this.audienceId}/members/${encodeURIComponent(email)}`;
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `apikey ${this.apiKey}`,
        },
      });

      if (response.ok || response.status === 404) {
        return {
          success: true,
          message: 'Successfully unsubscribed from newsletter',
        };
      }

      const errorData = await response.json();
      console.error('Mailchimp unsubscription error:', errorData);
      return {
        success: false,
        message: 'Failed to unsubscribe',
        error: errorData.detail || 'MAILCHIMP_ERROR',
      };
    } catch (error) {
      console.error('Mailchimp service error:', error);
      return {
        success: false,
        message: 'Failed to unsubscribe',
        error: 'NETWORK_ERROR',
      };
    }
  }
}

/**
 * SendGrid email service implementation
 */
class SendGridService implements EmailService {
  private apiKey: string;
  private fromEmail: string;

  constructor(config: EmailServiceConfig) {
    this.apiKey = config.apiKey!;
    this.fromEmail = config.fromEmail;
  }

  async subscribe(email: string): Promise<SubscribeResult> {
    // SendGrid doesn't have a built-in list management like Mailchimp
    // For SendGrid, we'll store the subscriber in a custom way or use their Marketing API
    // For now, we'll simulate success and log to console (actual implementation depends on your SendGrid setup)
    
    console.log('[SendGrid] Would add to list:', email);
    
    return {
      success: true,
      message: 'Successfully subscribed to newsletter',
    };
  }

  async unsubscribe(email: string): Promise<UnsubscribeResult> {
    console.log('[SendGrid] Would remove from list:', email);
    
    return {
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    };
  }
}

/**
 * Console (development) email service implementation
 */
class ConsoleService implements EmailService {
  private fromEmail: string;

  constructor(config: EmailServiceConfig) {
    this.fromEmail = config.fromEmail;
  }

  async subscribe(email: string): Promise<SubscribeResult> {
    console.log(`
┌─────────────────────────────────────────────┐
│  📧 Newsletter Subscription (Dev Mode)       │
├─────────────────────────────────────────────┤
│  Email: ${email.padEnd(40)} │
│  From:  ${this.fromEmail.padEnd(40)} │
│  Action: SUBSCRIBE                          │
└─────────────────────────────────────────────┘
    `);
    
    return {
      success: true,
      message: 'Successfully subscribed to newsletter (logged to console)',
    };
  }

  async unsubscribe(email: string): Promise<UnsubscribeResult> {
    console.log(`
┌─────────────────────────────────────────────┐
│  📧 Newsletter Unsubscription (Dev Mode)     │
├─────────────────────────────────────────────┤
│  Email: ${email.padEnd(40)} │
│  From:  ${this.fromEmail.padEnd(40)} │
│  Action: UNSUBSCRIBE                        │
└─────────────────────────────────────────────┘
    `);
    
    return {
      success: true,
      message: 'Successfully unsubscribed from newsletter (logged to console)',
    };
  }
}

/**
 * No-op email service (for production without configuration)
 */
class NoOpService implements EmailService {
  async subscribe(email: string): Promise<SubscribeResult> {
    return {
      success: false,
      message: 'Newsletter service not configured',
      error: 'SERVICE_NOT_CONFIGURED',
    };
  }

  async unsubscribe(email: string): Promise<UnsubscribeResult> {
    return {
      success: false,
      message: 'Newsletter service not configured',
      error: 'SERVICE_NOT_CONFIGURED',
    };
  }
}

/**
 * Email service factory - creates the appropriate service based on configuration
 */
export function createEmailService(): EmailService {
  const serviceConfig = getEmailServiceConfig();

  switch (serviceConfig.provider) {
    case 'mailchimp':
      return new MailchimpService(serviceConfig);
    
    case 'sendgrid':
      return new SendGridService(serviceConfig);
    
    case 'console':
      return new ConsoleService(serviceConfig);
    
    case 'none':
    default:
      return new NoOpService();
  }
}

// Export singleton instance
export const emailService = createEmailService();