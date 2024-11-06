import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
  throw new Error('Missing Supabase environment variables');
}

// Create Supabase client with additional options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Helper function to check connection
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('notes')  // Replace with a table you know exists
      .select('count')
      .limit(1)
      .single();

    if (error) {
      console.error('Supabase connection test error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Supabase connection error:', error);
    return false;
  }
};

// Utility to handle connection errors
export const handleConnectionError = async () => {
  const isConnected = await checkSupabaseConnection();
  if (!isConnected) {
    console.error('Supabase connection lost. Attempting to reconnect...');
    // Implement reconnection logic if needed
  }
  return isConnected;
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
