import { todoGenerator, TodoTemplate, TodoGenerator } from '../todoGenerator';

// Todo interface - replicating from main file to avoid circular dependency
interface Todo {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
  deadline?: Date;
}

export interface GenerateTodosRequest {
  count?: number;
  status?: 'pending' | 'in-progress' | 'completed';
  titleKeywords?: string[];
  maxDeadlineDays?: number;
  randomizeCreationDate?: boolean;
  maxCreationDaysAgo?: number;
}

export interface GenerateTodosResponse {
  success: boolean;
  data?: Todo[];
  message: string;
  error?: string;
}

export class TodoGeneratorService {
  private static readonly MAX_GENERATION_COUNT = 15;

  /**
   * Generate todos based on request parameters
   */
  static generateTodos(
    request: GenerateTodosRequest,
    nextIdRef: { value: number },
    todosArray: Todo[]
  ): GenerateTodosResponse {
    try {
      const { count = 1, status, titleKeywords, maxDeadlineDays, randomizeCreationDate, maxCreationDaysAgo } = request;

      // Validate count
      if (count > this.MAX_GENERATION_COUNT) {
        return {
          success: false,
          message: `Cannot generate more than ${this.MAX_GENERATION_COUNT} todos at once`,
          error: 'INVALID_COUNT',
        };
      }

      if (count < 1) {
        return {
          success: false,
          message: 'Count must be at least 1',
          error: 'INVALID_COUNT',
        };
      }

      let generatedTemplates: TodoTemplate[];

      if (count === 1) {
        // Generate single todo with custom options
        generatedTemplates = [
          this.generateSingleTodo({
            status,
            titleKeywords,
            maxDeadlineDays,
            randomizeCreationDate,
            maxCreationDaysAgo,
          }),
        ];
      } else {
        // Generate multiple random todos
        generatedTemplates = this.generateMultipleTodos(count, randomizeCreationDate, maxCreationDaysAgo);
      }

      // Convert templates to actual todos
      const newTodos = generatedTemplates.map((template) => this.templateToTodo(template, nextIdRef, todosArray));

      return {
        success: true,
        data: newTodos,
        message: `${newTodos.length} todo(s) generated successfully`,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to generate todos',
        error: 'GENERATION_ERROR',
      };
    }
  }

  /**
   * Generate a single todo with custom parameters
   */
  private static generateSingleTodo(options: {
    status?: 'pending' | 'in-progress' | 'completed';
    titleKeywords?: string[];
    maxDeadlineDays?: number;
    randomizeCreationDate?: boolean;
    maxCreationDaysAgo?: number;
  }): TodoTemplate {
    return todoGenerator.generateCustomTodo(options);
  }

  /**
   * Generate multiple random todos
   */
  private static generateMultipleTodos(
    count: number,
    randomizeCreationDate?: boolean,
    maxCreationDaysAgo?: number
  ): TodoTemplate[] {
    return todoGenerator.generateMultipleTodos(count, randomizeCreationDate, maxCreationDaysAgo);
  }

  /**
   * Convert a TodoTemplate to a Todo object
   */
  private static templateToTodo(template: TodoTemplate, nextIdRef: { value: number }, todosArray: Todo[]): Todo {
    let deadline: Date | undefined = undefined;
    if (template.deadlineInDays) {
      deadline = new Date();
      deadline.setDate(deadline.getDate() + template.deadlineInDays);
    }

    // Determine creation date - use randomized date if specified, otherwise current date
    let createdAt: Date;
    let updatedAt: Date;

    if (template.createdDaysAgo !== undefined) {
      createdAt = TodoGenerator.generateCreationDate(template.createdDaysAgo);
      // Updated date should be between creation date and now
      const daysSinceCreation = Math.floor(Math.random() * template.createdDaysAgo);
      updatedAt = TodoGenerator.generateCreationDate(daysSinceCreation);
    } else {
      createdAt = new Date();
      updatedAt = new Date();
    }

    const todo: Todo = {
      id: nextIdRef.value++,
      title: template.title,
      description: template.description,
      status: template.status || 'pending',
      createdAt,
      updatedAt,
      deadline,
    };

    todosArray.push(todo);
    return todo;
  }

  /**
   * Get generation statistics and available options
   */
  static getGenerationInfo() {
    const stats = todoGenerator.getTemplateStats();
    return {
      maxCount: this.MAX_GENERATION_COUNT,
      availableTemplates: stats.total,
      templateStats: stats,
      supportedStatuses: ['pending', 'in-progress', 'completed'],
      features: [
        'Generate single or multiple todos',
        'Filter by status',
        'Filter by title keywords',
        'Set maximum deadline days',
        'Automatic deadline calculation',
        'Randomize creation dates',
        'Set maximum creation days ago',
      ],
      randomizationOptions: {
        randomizeCreationDate: 'boolean - Enable/disable creation date randomization',
        maxCreationDaysAgo: 'number - Maximum days ago for creation date (default: 30)',
      },
    };
  }

  /**
   * Validate generation request parameters
   */
  static validateRequest(request: GenerateTodosRequest): { valid: boolean; error?: string } {
    const { count, status, titleKeywords, maxDeadlineDays, randomizeCreationDate, maxCreationDaysAgo } = request;

    if (count !== undefined) {
      if (typeof count !== 'number' || count < 1 || count > this.MAX_GENERATION_COUNT) {
        return {
          valid: false,
          error: `Count must be a number between 1 and ${this.MAX_GENERATION_COUNT}`,
        };
      }
    }

    if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
      return {
        valid: false,
        error: 'Status must be one of: pending, in-progress, completed',
      };
    }

    if (titleKeywords && (!Array.isArray(titleKeywords) || titleKeywords.some((k) => typeof k !== 'string'))) {
      return {
        valid: false,
        error: 'titleKeywords must be an array of strings',
      };
    }

    if (maxDeadlineDays !== undefined && (typeof maxDeadlineDays !== 'number' || maxDeadlineDays < 1)) {
      return {
        valid: false,
        error: 'maxDeadlineDays must be a positive number',
      };
    }

    if (randomizeCreationDate !== undefined && typeof randomizeCreationDate !== 'boolean') {
      return {
        valid: false,
        error: 'randomizeCreationDate must be a boolean',
      };
    }

    if (maxCreationDaysAgo !== undefined && (typeof maxCreationDaysAgo !== 'number' || maxCreationDaysAgo < 1)) {
      return {
        valid: false,
        error: 'maxCreationDaysAgo must be a positive number',
      };
    }

    return { valid: true };
  }
}
