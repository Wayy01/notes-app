import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthDebug = () => {
  const { user } = useAuth();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 p-2 bg-black/50 rounded-lg text-xs">
      <p className="text-white/50">
        {user ? 'Authenticated ✓' : 'Not authenticated'}
      </p>
    </div>
  );
};

export default AuthDebug;
