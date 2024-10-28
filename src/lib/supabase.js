import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check connection
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase.from('your_table').select('*').limit(1);
    return !error;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};

// Utility to check if we're online
export const isOnline = () => {
  return typeof navigator !== 'undefined' && navigator.onLine;
};

// Error handler utility
export const handleSupabaseError = (error) => {
  if (!isOnline()) {
    return 'You are offline. Please check your internet connection.';
  }

  if (error?.message?.includes('Failed to fetch')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }

  if (error?.message?.includes('JWT')) {
    return 'Your session has expired. Please sign in again.';
  }

  return error?.message || 'An unexpected error occurred';
};

// Test connection function
export const testConnection = async () => {
  try {
    const { error } = await supabase.auth.getSession();
    return !error;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};
