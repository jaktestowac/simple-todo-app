export interface TodoTemplate {
  title: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'completed';
  deadlineInDays?: number; // Days from now
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
];

export class TodoGenerator {
  private usedTemplates: Set<number> = new Set();

  /**
   * Generate a single random TODO from templates
   */
  generateRandomTodo(): TodoTemplate {
    const randomIndex = Math.floor(Math.random() * TODO_TEMPLATES.length);
    return { ...TODO_TEMPLATES[randomIndex] };
  }

  /**
   * Generate multiple unique TODOs from templates
   */
  generateMultipleTodos(count: number): TodoTemplate[] {
    if (count > TODO_TEMPLATES.length) {
      throw new Error(`Cannot generate ${count} unique todos. Maximum available: ${TODO_TEMPLATES.length}`);
    }

    const selectedTodos: TodoTemplate[] = [];
    const availableIndices = Array.from({ length: TODO_TEMPLATES.length }, (_, i) => i);

    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const templateIndex = availableIndices[randomIndex];

      selectedTodos.push({ ...TODO_TEMPLATES[templateIndex] });
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
    return { ...filteredTemplates[randomIndex] };
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
}

export const todoGenerator = new TodoGenerator();
