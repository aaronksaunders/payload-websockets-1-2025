'use server'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'

let initialized = false

export async function initPayload() {
  if (!initialized) {
    console.log('Initializing Payload...')
    const config = await payloadConfig
    await getPayload({ config })
    console.log('Payload initialized successfully')
    initialized = true
  }
  return true
}
