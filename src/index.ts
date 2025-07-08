import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3013;

// Middleware
app.use(express.json());
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Todo interface
interface Todo {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

// In-memory storage (you can replace this with a database)
let todos: Todo[] = [];
let nextId = 1;

// Routes

// GET /api/todos - List all todos with optional status filter
app.get('/api/todos', (req, res) => {
  const { status } = req.query;

  let filteredTodos = todos;

  if (status && typeof status === 'string') {
    filteredTodos = todos.filter((todo) => todo.status === status);
  }

  res.json({
    success: true,
    data: filteredTodos,
    total: filteredTodos.length,
  });
});

// GET /api/todos/:id - Get specific todo
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found',
    });
  }

  res.json({
    success: true,
    data: todo,
  });
});

// POST /api/todos - Add new todo
app.post('/api/todos', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required',
    });
  }

  const newTodo: Todo = {
    id: nextId++,
    title,
    description: description || '',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  todos.push(newTodo);

  res.status(201).json({
    success: true,
    data: newTodo,
    message: 'Todo created successfully',
  });
});

// PUT /api/todos/:id - Update todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found',
    });
  }

  const { title, description, status } = req.body;

  // Validate status if provided
  if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status. Must be: pending, in-progress, or completed',
    });
  }

  // Update todo
  if (title !== undefined) todos[todoIndex].title = title;
  if (description !== undefined) todos[todoIndex].description = description;
  if (status !== undefined) todos[todoIndex].status = status;
  todos[todoIndex].updatedAt = new Date();

  res.json({
    success: true,
    data: todos[todoIndex],
    message: 'Todo updated successfully',
  });
});

// DELETE /api/todos/:id - Delete todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex((t) => t.id === id);

  if (todoIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found',
    });
  }

  todos.splice(todoIndex, 1);

  res.json({
    success: true,
    message: 'Todo deleted successfully',
  });
});

// GET /api/todos/status/:status - Filter todos by status
app.get('/api/todos/status/:status', (req, res) => {
  const { status } = req.params;

  if (!['pending', 'in-progress', 'completed'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid status. Must be: pending, in-progress, or completed',
    });
  }

  const filteredTodos = todos.filter((todo) => todo.status === status);

  res.json({
    success: true,
    data: filteredTodos,
    total: filteredTodos.length,
  });
});

// GET /api/help - API documentation
app.get('/api/help', (req, res) => {
  res.json({
    success: true,
    data: {
      title: 'TODO App API Documentation',
      version: '1.0.0',
      description: 'A simple REST API for managing TODO items',
      endpoints: {
        'GET /api/todos': {
          description: 'List all todos with optional status filter',
          parameters: {
            status: 'optional query parameter (pending|in-progress|completed)',
          },
          example: 'GET /api/todos?status=pending',
        },
        'POST /api/todos': {
          description: 'Create a new todo',
          body: {
            title: 'required - string',
            description: 'optional - string',
          },
          example: '{"title": "Buy groceries", "description": "Milk, bread, eggs"}',
        },
        'GET /api/todos/:id': {
          description: 'Get a specific todo by ID',
          parameters: {
            id: 'required path parameter - number',
          },
          example: 'GET /api/todos/1',
        },
        'PUT /api/todos/:id': {
          description: 'Update a todo',
          parameters: {
            id: 'required path parameter - number',
          },
          body: {
            title: 'optional - string',
            description: 'optional - string',
            status: 'optional - string (pending|in-progress|completed)',
          },
          example: '{"status": "completed"}',
        },
        'DELETE /api/todos/:id': {
          description: 'Delete a todo',
          parameters: {
            id: 'required path parameter - number',
          },
          example: 'DELETE /api/todos/1',
        },
        'GET /api/todos/status/:status': {
          description: 'Filter todos by status',
          parameters: {
            status: 'required path parameter (pending|in-progress|completed)',
          },
          example: 'GET /api/todos/status/completed',
        },
      },
      statusCodes: {
        '200': 'Success',
        '201': 'Created',
        '400': 'Bad Request',
        '404': 'Not Found',
        '500': 'Internal Server Error',
      },
    },
  });
});

// GET /api/about - API information
app.get('/api/about', (req, res) => {
  res.json({
    success: true,
    data: {
      name: 'TODO App API',
      version: '1.0.0',
      description: 'A simple REST API for managing TODO App items with status tracking',
      author: 'Your Name',
      created: '2025-07-05',
      features: [
        'Create, read, update, delete todos',
        'Status management (pending, in-progress, completed)',
        'Filter todos by status',
        'In-memory storage',
        'RESTful API design',
      ],
      technology: {
        runtime: 'Node.js',
        framework: 'Express.js',
        language: 'TypeScript',
      },
      endpoints: {
        total: 8,
        available: ['/api/todos', '/api/todos/:id', '/api/todos/status/:status', '/api/help', '/api/about'],
      },
    },
  });
});

const server = app.listen(PORT, () => {
  var address = server.address();
  if (address && typeof address === 'object') {
    address = address.address == '::' ? 'localhost' : address.address;
    console.log(`Visit it on -> http://${address}:${PORT}`);
    console.log(`Server is running on port ${PORT}`);
    console.log('\nAPI Endpoints:');
    console.log('GET    /api/todos - List all todos (optional ?status=pending|in-progress|completed)');
    console.log('POST   /api/todos - Add new todo');
    console.log('PUT    /api/todos/:id - Update todo');
    console.log('DELETE /api/todos/:id - Delete todo');
    console.log('GET    /api/todos/:id - Get specific todo');
    console.log('GET    /api/todos/status/:status - Filter by status');
    console.log('GET    /api/help - API documentation');
    console.log('GET    /api/about - API information');
  }
});
