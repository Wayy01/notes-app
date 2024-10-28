import React, { useState, useEffect } from 'react';
import { checkSupabaseConnection } from '@/lib/supabase';

const SupabaseDebug = () => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkSupabaseConnection();
      setStatus(isConnected ? 'connected' : 'disconnected');
    };

    checkConnection();
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 p-2 bg-black/50 rounded-lg text-xs">
      <p className={`${
        status === 'connected' ? 'text-green-400' : 'text-red-400'
      }`}>
        Supabase: {status}
      </p>
    </div>
  );
};

export default SupabaseDebug;
