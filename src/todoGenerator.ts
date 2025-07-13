export interface TodoTemplate {
  title: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'completed';
  deadlineInDays?: number; // Days from now
  createdDaysAgo?: number; // Days ago when the todo was created (for randomization)
}

const TODO_TEMPLATES: TodoTemplate[] = [
  {
    title: 'Review project documentation',
    description: 'Go through all project docs and update outdated information',
    status: 'pending',
    deadlineInDays: 7,
  },
  {
    title: 'Fix login bug',
    description: 'Users are unable to login with special characters in password',
    status: 'in-progress',
    deadlineInDays: 3,
  },
  {
    title: 'Update dependencies',
    description: 'Check for outdated npm packages and update to latest versions',
    status: 'pending',
    deadlineInDays: 14,
  },
  {
    title: 'Write unit tests',
    description: 'Add comprehensive test coverage for new API endpoints',
    status: 'pending',
    deadlineInDays: 5,
  },
  {
    title: 'Database backup',
    description: 'Create automated backup script for production database',
    status: 'pending',
    deadlineInDays: 10,
  },
  {
    title: 'Performance optimization',
    description: 'Analyze and improve API response times for heavy queries',
    status: 'pending',
    deadlineInDays: 21,
  },
  {
    title: 'Security audit',
    description: 'Conduct security review of authentication and authorization systems',
    status: 'pending',
    deadlineInDays: 30,
  },
  {
    title: 'User interface improvements',
    description: 'Enhance mobile responsiveness and accessibility features',
    status: 'pending',
    deadlineInDays: 14,
  },
  {
    title: 'API documentation',
    description: 'Create comprehensive API documentation with examples',
    status: 'in-progress',
    deadlineInDays: 7,
  },
  {
    title: 'Code review process',
    description: 'Establish code review guidelines and approval workflow',
    status: 'pending',
    deadlineInDays: 5,
  },
  {
    title: 'Monitor system metrics',
    description: 'Set up monitoring dashboards for system health and performance',
    status: 'pending',
    deadlineInDays: 12,
  },
  {
    title: 'Customer feedback analysis',
    description: 'Review recent customer feedback and prioritize improvements',
    status: 'pending',
    deadlineInDays: 3,
  },
  {
    title: 'Refactor legacy code',
    description: 'Clean up and modernize old codebase sections',
    status: 'pending',
    deadlineInDays: 28,
  },
  {
    title: 'Team meeting notes',
    description: 'Document key decisions and action items from weekly team meeting',
    status: 'completed',
    deadlineInDays: 1,
  },
  {
    title: 'Deploy to staging',
    description: 'Push latest changes to staging environment for testing',
    status: 'in-progress',
    deadlineInDays: 2,
  },
  {
    title: 'Set up Playwright testing framework',
    description: 'Install and configure Playwright for end-to-end browser testing',
    status: 'pending',
    deadlineInDays: 7,
  },
  {
    title: 'Write Playwright E2E tests',
    description: 'Create comprehensive end-to-end tests for critical user journeys',
    status: 'pending',
    deadlineInDays: 14,
  },
  {
    title: 'Learn Playwright best practices',
    description: 'Study Playwright documentation and implement testing best practices',
    status: 'pending',
    deadlineInDays: 10,
  },
  {
    title: 'Automate visual regression testing',
    description: 'Set up visual comparison tests using Playwright screenshots',
    status: 'pending',
    deadlineInDays: 12,
  },
  {
    title: 'Cross-browser testing automation',
    description: 'Configure Playwright to run tests across Chrome, Firefox, and Safari',
    status: 'pending',
    deadlineInDays: 8,
  },
  {
    title: 'API testing with Playwright',
    description: 'Implement API endpoint testing using Playwright request fixtures',
    status: 'pending',
    deadlineInDays: 6,
  },
  {
    title: 'Mobile testing automation',
    description: 'Set up mobile device emulation tests with Playwright',
    status: 'pending',
    deadlineInDays: 15,
  },
  {
    title: 'Learn TypeScript advanced features',
    description: 'Study generics, decorators, and advanced type manipulation in TypeScript',
    status: 'pending',
    deadlineInDays: 21,
  },
  {
    title: 'Master React testing patterns',
    description: 'Learn React Testing Library and component testing strategies',
    status: 'pending',
    deadlineInDays: 18,
  },
  {
    title: 'Study CI/CD automation',
    description: 'Learn GitHub Actions and automated deployment pipelines',
    status: 'pending',
    deadlineInDays: 20,
  },
  {
    title: 'Test automation reporting',
    description: 'Set up automated test reporting and failure notifications',
    status: 'pending',
    deadlineInDays: 9,
  },
  {
    title: 'Performance testing automation',
    description: 'Implement automated performance tests and benchmarking',
    status: 'pending',
    deadlineInDays: 16,
  },
  {
    title: 'Learn Docker containerization',
    description: 'Study Docker fundamentals and containerization best practices',
    status: 'pending',
    deadlineInDays: 25,
  },
  {
    title: 'Accessibility testing automation',
    description: 'Set up automated accessibility testing using axe-core and Playwright',
    status: 'pending',
    deadlineInDays: 11,
  },
  {
    title: 'Database testing strategies',
    description: 'Learn database mocking and integration testing approaches',
    status: 'pending',
    deadlineInDays: 13,
  },
  {
    title: 'Parallel test execution',
    description: 'Optimize test suite performance with parallel execution in Playwright',
    status: 'pending',
    deadlineInDays: 7,
  },
  {
    title: 'Learn GraphQL testing',
    description: 'Study GraphQL query testing and schema validation techniques',
    status: 'pending',
    deadlineInDays: 19,
  },
  {
    title: 'Test data management',
    description: 'Implement test data factories and database seeding strategies',
    status: 'pending',
    deadlineInDays: 14,
  },
  {
    title: 'Learn Kubernetes basics',
    description: 'Study container orchestration and Kubernetes deployment concepts',
    status: 'pending',
    deadlineInDays: 30,
  },
  {
    title: 'Configure Playwright CI/CD pipeline',
    description: 'Set up Playwright tests in GitHub Actions workflow - https://playwright.dev/docs/ci',
    status: 'pending',
    deadlineInDays: 8,
  },
  {
    title: 'Implement Playwright page object model',
    description: 'Refactor tests using Page Object Model pattern for better maintainability',
    status: 'pending',
    deadlineInDays: 12,
  },
  {
    title: 'Explore Playwright resources',
    description: 'Study examples and best practices from https://playwright.info',
    status: 'pending',
    deadlineInDays: 5,
  },
  {
    title: 'Advanced Playwright automation patterns',
    description: 'Master advanced automation and solutions from https://playwright.info',
    status: 'pending',
    deadlineInDays: 16,
  },
];

export class TodoGenerator {
  private usedTemplates: Set<number> = new Set();

  /**
   * Generate a single random TODO from templates
   */
  generateRandomTodo(randomizeCreationDate?: boolean, maxCreationDaysAgo?: number): TodoTemplate {
    const randomIndex = Math.floor(Math.random() * TODO_TEMPLATES.length);
    const selectedTemplate = { ...TODO_TEMPLATES[randomIndex] };

    // Add random creation date if requested
    if (randomizeCreationDate) {
      selectedTemplate.createdDaysAgo = this.generateRandomCreationDaysAgo(maxCreationDaysAgo);
    }

    return selectedTemplate;
  }

  /**
   * Generate multiple unique TODOs from templates
   */
  generateMultipleTodos(count: number, randomizeCreationDate?: boolean, maxCreationDaysAgo?: number): TodoTemplate[] {
    if (count > TODO_TEMPLATES.length) {
      throw new Error(`Cannot generate ${count} unique todos. Maximum available: ${TODO_TEMPLATES.length}`);
    }

    const selectedTodos: TodoTemplate[] = [];
    const availableIndices = Array.from({ length: TODO_TEMPLATES.length }, (_, i) => i);

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const templateIndex = availableIndices[randomIndex];

      const selectedTemplate = { ...TODO_TEMPLATES[templateIndex] };

      // Add random creation date if requested
      if (randomizeCreationDate) {
        selectedTemplate.createdDaysAgo = this.generateRandomCreationDaysAgo(maxCreationDaysAgo);
      }

      selectedTodos.push(selectedTemplate);
      availableIndices.splice(randomIndex, 1);
    }

    return selectedTodos;
  }

  /**
   * Generate a TODO with custom parameters
   */
  generateCustomTodo(options: {
    titleKeywords?: string[];
    status?: 'pending' | 'in-progress' | 'completed';
    maxDeadlineDays?: number;
    randomizeCreationDate?: boolean;
    maxCreationDaysAgo?: number;
  }): TodoTemplate {
    let filteredTemplates = TODO_TEMPLATES;

    // Filter by status if specified
    if (options.status) {
      filteredTemplates = filteredTemplates.filter((t) => t.status === options.status);
    }

    // Filter by deadline if specified
    if (options.maxDeadlineDays) {
      filteredTemplates = filteredTemplates.filter(
        (t) => !t.deadlineInDays || t.deadlineInDays <= options.maxDeadlineDays
      );
    }

    // Filter by title keywords if specified
    if (options.titleKeywords && options.titleKeywords.length > 0) {
      filteredTemplates = filteredTemplates.filter((t) =>
        options.titleKeywords!.some(
          (keyword) =>
            t.title.toLowerCase().includes(keyword.toLowerCase()) ||
            t.description.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }

    if (filteredTemplates.length === 0) {
      throw new Error('No templates match the specified criteria');
    }

    const randomIndex = Math.floor(Math.random() * filteredTemplates.length);
    const selectedTemplate = { ...filteredTemplates[randomIndex] };

    // Add random creation date if requested
    if (options.randomizeCreationDate) {
      selectedTemplate.createdDaysAgo = this.generateRandomCreationDaysAgo(options.maxCreationDaysAgo);
    }

    return selectedTemplate;
  }

  /**
   * Get all available templates
   */
  getAllTemplates(): TodoTemplate[] {
    return TODO_TEMPLATES.map((template) => ({ ...template }));
  }

  /**
   * Get statistics about available templates
   */
  getTemplateStats() {
    const stats = {
      total: TODO_TEMPLATES.length,
      byStatus: {
        pending: 0,
        'in-progress': 0,
        completed: 0,
      },
      averageDeadlineDays: 0,
      withDeadlines: 0,
    };

    let totalDeadlineDays = 0;
    let deadlineCount = 0;

    TODO_TEMPLATES.forEach((template) => {
      if (template.status) {
        stats.byStatus[template.status]++;
      }
      if (template.deadlineInDays) {
        totalDeadlineDays += template.deadlineInDays;
        deadlineCount++;
        stats.withDeadlines++;
      }
    });

    stats.averageDeadlineDays = deadlineCount > 0 ? Math.round(totalDeadlineDays / deadlineCount) : 0;

    return stats;
  }

  /**
   * Generate random number of days ago for creation date
   */
  private generateRandomCreationDaysAgo(maxDaysAgo?: number): number {
    const maxDays = maxDaysAgo || 30; // Default to 30 days if not specified
    return Math.floor(Math.random() * maxDays);
  }

  /**
   * Generate creation date based on days ago
   */
  static generateCreationDate(daysAgo: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);
    return date;
  }
}

export const todoGenerator = new TodoGenerator();
