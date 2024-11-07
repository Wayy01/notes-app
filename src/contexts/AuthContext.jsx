import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, checkSupabaseConnection } from '@/lib/supabase';
import { toast } from 'sonner';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Check connection first
        const connected = await checkSupabaseConnection();
        if (!mounted) return;
        setIsConnected(connected);

        if (!connected) {
          toast.error('Unable to connect to the server', {
            description: 'Please check your internet connection and try again.',
            duration: 4000,
            icon: '🔌'
          });
          setLoading(false);
          return;
        }

        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            if (!mounted) return;
            setSession(session);
            setUser(session?.user ?? null);
          }
        );

        return () => {
          subscription?.unsubscribe();
        };
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (!mounted) return;
        toast.error('Error initializing authentication', {
          description: error.message,
          duration: 4000,
        });
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();
    return () => {
      mounted = false;
    };
  }, []);

  // Add connection status check interval
  useEffect(() => {
    const checkConnection = async () => {
      const connected = await checkSupabaseConnection();
      if (connected !== isConnected) {
        setIsConnected(connected);
        if (!connected) {
          toast.error('Lost connection to server', {
            description: 'Please check your internet connection and try again.',
            duration: 4000,
            icon: '🔌'
          });
        } else if (isConnected === false) {
          toast.success('Connection restored', {
            description: 'You are back online!',
            duration: 3000,
            icon: '👋'
          });
        }
      }
    };

    const interval = setInterval(checkConnection, 30000);
    return () => clearInterval(interval);
  }, [isConnected]);

  const value = {
    user,
    session,
    loading,
    isConnected,
    signIn: async (credentials) => {
      if (!isConnected) {
        toast.error('No connection to server', {
          description: 'Please check your internet connection and try again.'
        });
        throw new Error('No connection to server');
      }
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: credentials.email.trim().toLowerCase(),
          password: credentials.password
        });

        if (error) throw error;
        toast.success('Welcome back!', {
          description: `Welcome back, ${data.user.email}!`,
          duration: 3000,
        });
        return data;
      } catch (error) {
        console.error('Login error:', error);
        toast.error('Failed to sign in', {
          description: error.message
        });
        throw error;
      }
    },
    signUp: async (credentials) => {
      if (!isConnected) {
        toast.error('No connection to server');
        throw new Error('No connection to server');
      }
      try {
        const { data, error } = await supabase.auth.signUp(credentials);
        if (error) throw error;
        toast.success('Account created successfully!', {
          description: 'Please check your email to verify your account.',
          duration: 5000,
        });
        return data;
      } catch (error) {
        toast.error('Failed to create account', {
          description: error.message
        });
        throw error;
      }
    },
    signOut: async () => {
      try {
        await supabase.auth.signOut();
        toast.success('Signed out successfully', {
          description: 'You have been safely logged out.'
        });
      } catch (error) {
        toast.error('Failed to sign out', {
          description: error.message
        });
      }
    },
    resetPassword: (email) => supabase.auth.resetPasswordForEmail(email),
    updatePassword: (newPassword) => supabase.auth.updateUser({ password: newPassword })
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
