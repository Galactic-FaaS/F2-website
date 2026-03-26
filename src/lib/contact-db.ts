/**
 * Contact Form Database
 * Specialized database interface for contact form submissions
 */

import { InMemoryDatabase, BaseEntity } from './db';

export interface ContactSubmission extends BaseEntity {
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  ip?: string;
  userAgent?: string;
}

export interface CreateContactSubmission {
  name: string;
  email: string;
  subject?: string;
  message: string;
  ip?: string;
  userAgent?: string;
}

export interface UpdateContactSubmission {
  status?: 'new' | 'read' | 'replied' | 'archived';
}

/**
 * Contact Database singleton
 */
class ContactDatabase extends InMemoryDatabase<ContactSubmission> {
  constructor() {
    super({ maxSize: 5000 }); // Allow up to 5000 contact submissions
  }

  /**
   * Create a new contact submission
   */
  createSubmission(data: CreateContactSubmission): ContactSubmission {
    const id = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    return this.create({
      id,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      subject: data.subject?.trim() || '',
      message: data.message.trim(),
      status: 'new',
      ip: data.ip,
      userAgent: data.userAgent,
    });
  }

  /**
   * Get all new (unread) submissions
   */
  getNewSubmissions(): ContactSubmission[] {
    return this.findAll((submission) => submission.status === 'new');
  }

  /**
   * Get submissions by email
   */
  getByEmail(email: string): ContactSubmission[] {
    return this.findAll((submission) => submission.email === email.toLowerCase());
  }

  /**
   * Get submissions by status
   */
  getByStatus(status: ContactSubmission['status']): ContactSubmission[] {
    return this.findAll((submission) => submission.status === status);
  }

  /**
   * Update submission status
   */
  updateStatus(id: string, status: ContactSubmission['status']): ContactSubmission | undefined {
    return this.update(id, { status });
  }

  /**
   * Check if email has submitted recently (within last hour)
   */
  hasRecentSubmission(email: string): boolean {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    return this.findFirst(
      (submission) =>
        submission.email === email.toLowerCase() &&
        submission.createdAt > oneHourAgo
    ) !== undefined;
  }

  /**
   * Get submission statistics
   */
  getStats(): {
    total: number;
    new: number;
    read: number;
    replied: number;
    archived: number;
  } {
    const all = this.findAll();
    
    return {
      total: all.length,
      new: all.filter((s) => s.status === 'new').length,
      read: all.filter((s) => s.status === 'read').length,
      replied: all.filter((s) => s.status === 'replied').length,
      archived: all.filter((s) => s.status === 'archived').length,
    };
  }
}

// Export singleton instance
export const contactDb = new ContactDatabase();

// Export CRUD operations for convenience
export const contactDbOperations = {
  /**
   * Create a new contact submission
   */
  create: (data: CreateContactSubmission) => contactDb.createSubmission(data),

  /**
   * Get all contact submissions
   */
  findAll: () => contactDb.findAll(),

  /**
   * Get a single submission by ID
   */
  findById: (id: string) => contactDb.findById(id),

  /**
   * Get all new (unread) submissions
   */
  getNew: () => contactDb.getNewSubmissions(),

  /**
   * Get submissions by email
   */
  findByEmail: (email: string) => contactDb.getByEmail(email),

  /**
   * Get submissions by status
   */
  findByStatus: (status: ContactSubmission['status']) => contactDb.getByStatus(status),

  /**
   * Update submission status
   */
  updateStatus: (id: string, status: ContactSubmission['status']) => contactDb.updateStatus(id, status),

  /**
   * Delete a submission
   */
  delete: (id: string) => contactDb.delete(id),

  /**
   * Get database statistics
   */
  getStats: () => contactDb.getStats(),

  /**
   * Check if email has recent submission
   */
  hasRecentSubmission: (email: string) => contactDb.hasRecentSubmission(email),
};