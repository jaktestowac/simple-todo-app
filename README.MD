# TODO App

A simple REST API for managing TODO items with status tracking, built with Express.js and TypeScript.

_Note: This project is used in course [Playwright z AI + MCP](https://jaktestowac.pl/course/playwright-z-ai/)._

## Features

- ✅ Create, read, update, delete todos
- 📊 Status management (pending, in-progress, completed)
- 🔍 Filter todos by status
- 💾 In-memory storage
- 📚 RESTful API design
- 📖 Built-in API documentation

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Package Runner**: tsx

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

### Start the server

```bash
npm start
```

The server will start on port 3013 (or the port specified in the `PORT` environment variable).
You can access the App at [http://localhost:3013](http://localhost:3013).

### API Endpoints

| Method | Endpoint                | Description                                                         |
| ------ | ----------------------- | ------------------------------------------------------------------- |
| GET    | `/todos`                | List all todos (optional `?status=pending\|in-progress\|completed`) |
| POST   | `/todos`                | Create a new todo                                                   |
| GET    | `/todos/:id`            | Get a specific todo by ID                                           |
| PUT    | `/todos/:id`            | Update a todo                                                       |
| DELETE | `/todos/:id`            | Delete a todo                                                       |
| GET    | `/todos/status/:status` | Filter todos by status                                              |
| GET    | `/help`                 | API documentation                                                   |
| GET    | `/about`                | API information                                                     |

### Todo Status Values

- `pending` - Todo is not started
- `in-progress` - Todo is being worked on
- `completed` - Todo is finished

## API Examples

### Create a todo

```bash
curl -X POST http://localhost:3013/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, bread, eggs"}'
```

### List all todos

```bash
curl http://localhost:3013/todos
```

### Filter by status

```bash
# Query parameter
curl http://localhost:3013/todos?status=pending

# Path parameter
curl http://localhost:3013/todos/status/completed
```

### Update todo status

```bash
curl -X PUT http://localhost:3013/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

### Delete a todo

```bash
curl -X DELETE http://localhost:3013/todos/1
```

### Get API documentation

```bash
curl http://localhost:3013/help
```

## Response Format

All responses follow a consistent format:

```json
{
  "success": true,
  "data": {
    /* response data */
  },
  "message": "Optional message",
  "total": "Number of items (for lists)"
}
```

## Todo Object Structure

```typescript
interface Todo {
  id: number;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}
```

## HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## Development

### Project Structure

```
rest-api-simple-todo-app/
├── src/
│   └── index.ts          # Main application file
├── public/
│   ├── index.html        # Frontend web interface
├── package.json          # Dependencies and scripts
└── README.md             # This file
```

### Frontend Web Interface

This project includes a simple web frontend for managing your todos. After starting the server, open [http://localhost:3013](http://localhost:3013) in your browser to use the Todo App.

The frontend is served from the `public/` directory and interacts with the REST API described above.

---

## Additional Notes & Recommendations

- This API uses in-memory storage, so data will be lost when the server restarts.
- For production use, consider implementing persistent storage (database).
- The API is designed for development and testing purposes.

### Scripts

- `npm start` - Start the server using tsx

## Notes

- This API uses in-memory storage, so data will be lost when the server restarts
- For production use, consider implementing persistent storage (database)
- The API is designed for development and testing purposes

## Links and Resources

- [expressjs.com](https://expressjs.com) - Express.js documentation
- [TypeScript](https://www.typescriptlang.org) - TypeScript documentation

## 📞 Contact & Support

Feel free to reach out to us:

- 🌐 **Website**: [jaktestowac.pl](https://jaktestowac.pl)
- 💼 **LinkedIn**: [jaktestowac.pl](https://www.linkedin.com/company/jaktestowac/)
- 💬 **Discord**: [Polish Playwright Community](https://discord.gg/mUAqQ7FUaZ)
- 📧 **Support**: Check our website for contact details

---

## Learning Resources

We have gathered a collection of resources to help you learn and master Playwright, both in Polish and English. Whether you're a beginner or an advanced user, these resources will help you enhance your skills and knowledge.

### **🇵🇱 Polish Resources**

- [Free Playwright Resources](https://jaktestowac.pl/darmowy-playwright/) - Comprehensive Polish learning materials
- [Playwright Basics](https://www.youtube.com/playlist?list=PLfKhn9AcZ-cD2TCB__K7NP5XARaCzZYn7) - YouTube series (Polish)
- [Playwright Elements](https://www.youtube.com/playlist?list=PLfKhn9AcZ-cAcpd-XN4pKeo-l4YK35FDA) - Advanced concepts (Polish)
- [Playwright MCP](https://www.youtube.com/playlist?list=PLfKhn9AcZ-cCqD34AG5YRejujaBqCBgl4) - MCP course (Polish)
- [Discord Community](https://discord.gg/mUAqQ7FUaZ) - First Polish Playwright community!
- [Playwright Info](https://playwright.info/) - first and only Polish Playwright blog

### **🇬🇧 English Resources**

- [VS Code Extensions](https://marketplace.visualstudio.com/publishers/jaktestowac-pl) - Our free Playwright plugins
- [Playwright Documentation](https://playwright.dev/docs/intro) - Official documentation
- [Playwright GitHub](https://github.com/microsoft/playwright) - Source code and issues

_PS. For more resources and updates, follow us on our [website](https://jaktestowac.pl) and [GitHub](https://github.com/jaktestowac)._

---

**Happy testing and automating tests!** 🚀

**jaktestowac.pl Team** 💚❤️

_PS. For more resources and updates, follow us on our [website](https://jaktestowac.pl) and [GitHub](https://github.com/jaktestowac)._

---

_Built with 💚❤️ for the Playwright and testing automation community_
