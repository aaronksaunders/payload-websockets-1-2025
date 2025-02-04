'use client'
import { useCallback, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Media } from '@/payload-types'
import { MESSAGE_TYPES, CONNECTION_STATUS, type Todo, type WSMessage } from './types'
import { useWebSocket } from './hooks/useWebSocket'

/**
 * Live Todo Page Component
 *
 * Provides real-time updates for todos through WebSocket connection.
 * Displays todos with their associated media and status.
 *
 * Features:
 * - Auto-reconnection on connection loss
 * - Real-time updates for create/update/delete operations
 * - Visual connection status indicator
 */
export default function TodoLivePage() {
  const [todos, setTodos] = useState<Todo[]>([])

  const handleMessage = useCallback((message: WSMessage) => {
    switch (message.type) {
      case MESSAGE_TYPES.COLLECTION_DATA:
        setTodos((message as any).data.docs)
        break
      case MESSAGE_TYPES.COLLECTION_CHANGED:
        if (message.collection === 'todos') {
          switch (message.operation) {
            case 'create':
              setTodos((prev) => [...prev, message.doc])
              break
            case 'update':
              setTodos((prev) =>
                prev.map((todo) => (todo.id === message.doc.id ? message.doc : todo)),
              )
              break
            case 'delete':
              setTodos((prev) => prev.filter((todo) => todo.id !== message.doc.id))
              break
          }
        }
        break
    }
  }, [])

  const { status } = useWebSocket<WSMessage>({
    collection: 'todos',
    onMessage: handleMessage,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 20 }}>
        <h2>Live Todos</h2>
        <span
          style={{
            color: status === CONNECTION_STATUS.CONNECTED ? 'green' : 'red',
          }}
        >
          {status}
        </span>
        <Link href="/">Back to todos</Link>
      </div>

      <div className="todos">
        {todos.map((todo) => (
          <div
            key={todo.id}
            style={{
              display: 'flex',
              border: '1px solid #ccc',
              borderRadius: 10,
              marginBottom: 16,
            }}
          >
            {todo.media ? (
              <div style={{ width: 100, height: 100, margin: 16, marginTop: 20 }}>
                <Image
                  src={`${(todo.media as Media)?.url}`}
                  alt={todo.title}
                  width={100}
                  height={100}
                />
              </div>
            ) : (
              <div style={{ width: 100, height: 100, margin: 16, marginTop: 20 }}>
                <p>No media</p>
              </div>
            )}
            <div style={{ paddingBottom: 16, paddingLeft: 16 }}>
              <h2>{todo.title}</h2>
              <p>{todo.description}</p>
              <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
              <p>{new Date(todo.createdAt).toLocaleString()}</p>
              <p>{new Date(todo.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
