export interface SearchIndexItem {
  id: string;
  title: string;
  url: string;
  content: string;
  type: 'doc' | 'blog' | 'api' | 'tutorial';
  keywords: string[];
  version?: string;
}

export interface SearchResult extends SearchIndexItem {
  relevance: number;
}

// Sample search index data - in production this would be generated from actual content
const searchIndex: SearchIndexItem[] = [
  // Documentation
  {
    id: 'doc-getting-started',
    title: 'Getting Started',
    url: '/docs/v3.0/getting-started',
    content: 'Learn how to install Fortran² and write your first program. This guide covers installation, setup, and your first computation.',
    type: 'doc',
    keywords: ['install', 'setup', 'hello world', 'beginner', 'quickstart'],
    version: 'v3.0',
  },
  {
    id: 'doc-language-basics',
    title: 'Language Basics',
    url: '/docs/v3.0/language-basics',
    content: 'Understand the fundamentals of Fortran² including syntax, data types, variables, and core concepts.',
    type: 'doc',
    keywords: ['syntax', 'variables', 'types', 'fundamentals', 'basics'],
    version: 'v3.0',
  },
  {
    id: 'doc-advanced-arithmetic',
    title: 'Advanced Arithmetic',
    url: '/docs/v3.0/advanced-arithmetic',
    content: 'Explore advanced arithmetic operations including matrix operations, vectorized computations, and numerical methods.',
    type: 'doc',
    keywords: ['math', 'matrix', 'vector', 'numerical', 'computation'],
    version: 'v3.0',
  },
  {
    id: 'doc-symbolic',
    title: 'Symbolic Computation',
    url: '/docs/v3.0/symbolic-computation',
    content: 'Learn about symbolic mathematics, algebraic expressions, and symbolic differentiation in Fortran².',
    type: 'doc',
    keywords: ['symbolic', 'algebra', 'differentiation', 'derivative', 'expression'],
    version: 'v3.0',
  },
  {
    id: 'doc-probabilistic',
    title: 'Probabilistic Programming',
    url: '/docs/v3.0/probabilistic',
    content: 'Introduction to probabilistic programming, Bayesian inference, and stochastic methods.',
    type: 'doc',
    keywords: ['probability', 'bayesian', 'statistics', 'random', 'stochastic'],
    version: 'v3.0',
  },
  {
    id: 'doc-differentiable',
    title: 'Differentiable Programming',
    url: '/docs/v3.0/differentiable',
    content: 'Automatic differentiation, gradient-based optimization, and neural network foundations.',
    type: 'doc',
    keywords: ['differentiable', 'gradient', 'automatic differentiation', 'optimization', 'neural'],
    version: 'v3.0',
  },
  {
    id: 'doc-api-reference',
    title: 'API Reference',
    url: '/docs/v3.0/api-reference',
    content: 'Complete API documentation for Fortran² including all functions, modules, and interfaces.',
    type: 'api',
    keywords: ['api', 'reference', 'functions', 'modules', 'interface'],
    version: 'v3.0',
  },
  // Blog Posts
  {
    id: 'blog-v3-release',
    title: 'Fortran² Version 3.0 Release Announcement',
    url: '/blog/fortran2-v3-release',
    content: 'Announcing the release of Fortran² 3.0 with revolutionary features including differentiable programming, improved performance, and new probabilistic modules.',
    type: 'blog',
    keywords: ['release', 'announcement', 'version 3.0', 'new features'],
  },
  {
    id: 'blog-differentiable',
    title: 'Introduction to Differentiable Programming',
    url: '/blog/differentiable-programming',
    content: 'Discover how differentiable programming enables modern scientific computing with automatic gradients and optimization.',
    type: 'blog',
    keywords: ['differentiable', 'programming', 'gradient', 'machine learning', 'optimization'],
  },
  {
    id: 'blog-benchmarks',
    title: 'Performance Benchmarks: Fortran² vs Traditional Approaches',
    url: '/blog/performance-benchmarks',
    content: 'Comprehensive performance comparison showing Fortran² advantages in speed and memory efficiency for scientific workloads.',
    type: 'blog',
    keywords: ['performance', 'benchmark', 'speed', 'comparison', 'optimization'],
  },
  // Tutorials
  {
    id: 'tutorial-getting-started',
    title: 'Getting Started with Fortran²',
    url: '/tutorials/getting-started',
    content: 'Complete tutorial for beginners. Install Fortran², set up your environment, and write your first simulation.',
    type: 'tutorial',
    keywords: ['tutorial', 'beginner', 'getting started', 'setup', 'installation'],
  },
  {
    id: 'tutorial-first-simulation',
    title: 'Your First Simulation',
    url: '/tutorials/your-first-simulation',
    content: 'Build your first scientific simulation from scratch. Learn simulation fundamentals and practical implementation.',
    type: 'tutorial',
    keywords: ['tutorial', 'simulation', 'beginner', 'project', 'hands-on'],
  },
];

// Fuzzy matching using Levenshtein distance
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

// Calculate relevance score for a search result
function calculateRelevance(item: SearchIndexItem, query: string): number {
  const queryLower = query.toLowerCase();
  const titleLower = item.title.toLowerCase();
  const contentLower = item.content.toLowerCase();
  const keywordsLower = item.keywords.map((k) => k.toLowerCase());

  let score = 0;

  // Exact match in title (highest weight)
  if (titleLower === queryLower) {
    score += 100;
  } else if (titleLower.includes(queryLower)) {
    score += 50;
  }

  // Match in keywords
  keywordsLower.forEach((keyword) => {
    if (keyword === queryLower) {
      score += 40;
    } else if (keyword.includes(queryLower)) {
      score += 20;
    } else {
      // Fuzzy match for typos
      const distance = levenshteinDistance(queryLower, keyword);
      if (distance <= 2) {
        score += 10 - distance;
      }
    }
  });

  // Match in content
  const contentMatches = (contentLower.match(new RegExp(queryLower, 'g')) || []).length;
  score += Math.min(contentMatches * 5, 30);

  // Fuzzy match on title for typos
  const titleDistance = levenshteinDistance(queryLower, titleLower);
  if (titleDistance <= 3 && titleDistance > 0) {
    score += 15 - titleDistance * 4;
  }

  // Boost for docs (primary content)
  if (item.type === 'doc') {
    score *= 1.2;
  }

  // Boost for tutorials
  if (item.type === 'tutorial') {
    score *= 1.1;
  }

  return Math.round(score * 10) / 10;
}

// Search function
export function search(query: string, limit = 10): SearchResult[] {
  if (!query.trim()) {
    return [];
  }

  const results = searchIndex
    .map((item) => ({
      ...item,
      relevance: calculateRelevance(item, query),
    }))
    .filter((item) => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance)
    .slice(0, limit);

  return results;
}

// Get all items for index generation
export function getAllSearchItems(): SearchIndexItem[] {
  return searchIndex;
}

// Get items by type
export function getItemsByType(type: SearchIndexItem['type']): SearchIndexItem[] {
  return searchIndex.filter((item) => item.type === type);
}

// Get items by version
export function getItemsByVersion(version: string): SearchIndexItem[] {
  return searchIndex.filter((item) => item.version === version);
}
