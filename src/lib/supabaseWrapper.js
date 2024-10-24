import { supabase as originalSupabase, createDebugClient } from './supabaseClient'

console.log('supabaseWrapper.js module evaluated')

export const supabase = new Proxy(originalSupabase, {
  get: function(target, prop, receiver) {
    console.log(`Accessing Supabase property: ${prop.toString()}`)
    return Reflect.get(target, prop, receiver)
  }
})

export { createDebugClient }

console.log('supabaseWrapper.js exports created')
