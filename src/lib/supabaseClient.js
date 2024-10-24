import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables')
  throw new Error('Missing Supabase environment variables')
}

let supabaseInstance = null
let instanceCount = 0

function createSupabaseClient() {
  instanceCount++
  console.log(`createSupabaseClient called. Instance count: ${instanceCount}`)
  console.trace() // This will show the stack trace of where the function is being called

  if (supabaseInstance) {
    console.log('Returning existing Supabase instance')
    return supabaseInstance
  }

  console.log('Creating new Supabase instance')
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    console.log('Supabase instance created successfully')
  } catch (error) {
    console.error('Error creating Supabase instance:', error)
    throw error
  }
  return supabaseInstance
}

export const supabase = createSupabaseClient()

// Debug function to track client creation attempts
export function createDebugClient(url, key) {
  console.warn('Attempt to create a new Supabase client detected')
  console.trace()
  return supabase // Always return the singleton instance
}

// Add this line at the end of the file
console.log('supabaseClient.js module evaluated')
