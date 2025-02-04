import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'
import { Media } from '@/payload-types'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const todos = await payload.find({
    collection: 'todos',
    limit: 100,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', padding: 20 }}>
      <h2>Payload To Do List {user?.email}</h2>
      <div className="todos">
        <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
          <Link href="/todo-create">
            <button
              style={{
                border: '1px solid #ccc',
                borderRadius: 10,
                padding: 10,
              }}
            >
              Create Todo
            </button>
          </Link>
          <Link href="/todo-live">
            <button
              style={{
                border: '1px solid #ccc',
                borderRadius: 10,
                padding: 10,
              }}
            >
              Live View
            </button>
          </Link>
        </div>
        {todos.docs.map((todo) => (
          <Link href={`/todos/${todo.id}`} key={todo.id} style={{ textDecoration: 'none' }}>
            <div
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
                <p>{todo.createdAt}</p>
                <p>{todo.updatedAt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
