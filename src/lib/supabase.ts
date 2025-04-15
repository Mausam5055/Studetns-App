
import { createClient } from '@supabase/supabase-js'

// Get environment variables or use placeholder values for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single client instance with fallback values
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-url.supabase.co',  // Fallback URL to avoid runtime error
  supabaseAnonKey || 'placeholder-key',                  // Fallback key to avoid runtime error
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true
    }
  }
);

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return supabaseUrl !== '' && supabaseAnonKey !== '';
};
