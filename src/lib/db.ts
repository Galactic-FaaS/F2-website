/**
 * In-Memory Database Abstraction
 * Provides a simple in-memory data store that can be swapped for a real database later
 */

export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DatabaseOptions {
  maxSize?: number; // Maximum number of records
}

/**
 * Generic in-memory database implementation
 */
export class InMemoryDatabase<T extends BaseEntity> {
  private data: Map<string, T> = new Map();
  private maxSize: number;
  private listeners: Set<(entity: T, action: 'create' | 'update' | 'delete') => void> = new Set();

  constructor(options: DatabaseOptions = {}) {
    this.maxSize = options.maxSize || 10000;
  }

  /**
   * Create a new record
   */
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): T {
    const now = new Date();
    const id = entity.id || this.generateId();
    
    const newEntity: T = {
      ...entity,
      id,
      createdAt: now,
      updatedAt: now,
    } as T;

    if (this.data.size >= this.maxSize) {
      // Remove oldest record
      const oldestKey = this.data.keys().next().value;
      if (oldestKey) {
        this.data.delete(oldestKey);
      }
    }

    this.data.set(id, newEntity);
    this.notifyListeners(newEntity, 'create');
    
    return newEntity;
  }

  /**
   * Find a record by ID
   */
  findById(id: string): T | undefined {
    return this.data.get(id);
  }

  /**
   * Find all records matching a filter
   */
  findAll(filter?: (entity: T) => boolean): T[] {
    const allRecords = Array.from(this.data.values());
    
    if (!filter) {
      return allRecords;
    }
    
    return allRecords.filter(filter);
  }

  /**
   * Find first record matching a filter
   */
  findFirst(filter: (entity: T) => boolean): T | undefined {
    for (const entity of this.data.values()) {
      if (filter(entity)) {
        return entity;
      }
    }
    return undefined;
  }

  /**
   * Update a record
   */
  update(id: string, updates: Partial<Omit<T, 'id' | 'createdAt'>>): T | undefined {
    const existing = this.data.get(id);
    
    if (!existing) {
      return undefined;
    }

    const updated: T = {
      ...existing,
      ...updates,
      id: existing.id,
      createdAt: existing.createdAt,
      updatedAt: new Date(),
    } as T;

    this.data.set(id, updated);
    this.notifyListeners(updated, 'update');
    
    return updated;
  }

  /**
   * Delete a record
   */
  delete(id: string): boolean {
    const existing = this.data.get(id);
    
    if (!existing) {
      return false;
    }

    this.data.delete(id);
    this.notifyListeners(existing, 'delete');
    
    return true;
  }

  /**
   * Get count of all records
   */
  count(): number {
    return this.data.size;
  }

  /**
   * Clear all records
   */
  clear(): void {
    this.data.clear();
  }

  /**
   * Subscribe to database changes
   */
  subscribe(listener: (entity: T, action: 'create' | 'update' | 'delete') => void): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Generate a unique ID
   */
  private generateId(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Notify all listeners of changes
   */
  private notifyListeners(entity: T, action: 'create' | 'update' | 'delete'): void {
    for (const listener of this.listeners) {
      try {
        listener(entity, action);
      } catch (error) {
        console.error('Database listener error:', error);
      }
    }
  }
}

/**
 * Utility function to create a new in-memory database instance
 */
export function createDatabase<T extends BaseEntity>(options?: DatabaseOptions): InMemoryDatabase<T> {
  return new InMemoryDatabase<T>(options);
}