import { useEffect, useRef, useState } from 'react'
import { WS_CONFIG, CONNECTION_STATUS, type ConnectionStatus } from '../types'
import { initPayload } from '@/app/actions/initPayload'

type UseWebSocketProps<T> = {
  collection: string
  onMessage: (data: T) => void
}

export function useWebSocket<T>({ collection, onMessage }: UseWebSocketProps<T>) {
  const [status, setStatus] = useState<ConnectionStatus>(CONNECTION_STATUS.CONNECTING)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    let retryCount = 0

    const connectWebSocket = async () => {
      if (wsRef.current?.readyState === WebSocket.OPEN) return

      try {
        // Initialize Payload if needed
        await initPayload()

        wsRef.current = new WebSocket(WS_CONFIG.URL)

        wsRef.current.onopen = () => {
          setStatus(CONNECTION_STATUS.CONNECTED)
          retryCount = 0
          wsRef.current?.send(
            JSON.stringify({
              type: 'FETCH_COLLECTION',
              collection,
            }),
          )
        }

        wsRef.current.onmessage = (event) => {
          const message = JSON.parse(event.data)
          onMessage(message)
        }

        wsRef.current.onclose = () => {
          setStatus(CONNECTION_STATUS.DISCONNECTED)

          if (retryCount < WS_CONFIG.MAX_RETRIES) {
            retryCount++
            setTimeout(connectWebSocket, WS_CONFIG.RETRY_DELAY)
          } else {
            setStatus(CONNECTION_STATUS.FAILED)
          }
        }
      } catch (error) {
        console.error('WebSocket error:', error)
        setStatus(CONNECTION_STATUS.ERROR)
      }
    }

    connectWebSocket()

    return () => {
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
    }
  }, [collection, onMessage])

  return { status }
}
