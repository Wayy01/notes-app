import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const AuthDebug = () => {
  const { user } = useAuth();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 p-2 bg-black/50 rounded-lg text-xs">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${user ? 'bg-green-400' : 'bg-red-400'}`} />
        <p className={`${user ? 'text-green-400' : 'text-red-400'}`}>
          {user ? 'Authenticated' : 'Not authenticated'}
        </p>
      </div>
    </div>
  );
};

export default AuthDebug;
