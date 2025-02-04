### 🚀 Building a Full-Stack Todo App with Next.js 14 and Payload CMS

In this tutorial, we build a modern Todo application that showcases the power of Next.js 14 and Payload CMS.

### Video - [Watch the video tutorial here!](https://youtu.be/v_ga0nzm-wU)

Key Features:

- ✅ Server Actions for form handling
- ✅ Image upload functionality
- ✅ Full CRUD operations
- ✅ Server-side rendering
- ✅ TypeScript integration
- ✅ Responsive design
- ✅ Media management with Payload CMS
- ✅ Clean and maintainable code structure

Tech Stack:

- Next.js 14
- Payload CMS
- TypeScript
- SQLite Database
- Server Components
- Server Actions
- next/image optimization

The application allows users to:
• Create todos with titles, descriptions, and images
• Mark todos as complete/incomplete
• View detailed todo information
• Upload and manage images
• Navigate between todos
• Responsive layout for all devices

Perfect for developers looking to learn:

- Next.js 14 Server Components
- Server Actions implementation
- Image handling in Next.js
- Integration with Payload CMS
- TypeScript best practices
- Modern React patterns

## Environment Variables

```typescript
DATABASE_URI=file:./my-payload-todo.db
PAYLOAD_SECRET=0f62ed5a6d2045b8bc6da1e9
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3000
```

## WEBSOCKET APPLICATION FLOW

### Payload Initialization:

- Root layout initializes Payload on app start
- The plugin gets initialized through Payload's onInit
- WebSocket server starts when the plugin initializes

### WebSocket Communication:

- Server sends updates through collection hooks
- Client (todo-live/page.tsx) connects and handles messages correctly
- Proper reconnection logic is implemented

### Data Flow:

- Create todo works with media upload
- Live updates work through WebSocket
- Regular page loads use direct Payload queries

### Configuration:

- Payload config includes the WebSocket plugin
- Image handling is configured in Next.js config
- Database and collections are properly set up

```typescript
// payload.config.ts
export default buildConfig({
  plugins: [
    websocketServerPlugin({
      collections: ['todos'],
      port: 8081, // Optional, defaults to 8081
    }),
  ],
})
```
