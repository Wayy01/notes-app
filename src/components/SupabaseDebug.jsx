import React, { useState, useEffect } from 'react';
import { checkSupabaseConnection } from '@/lib/supabase';

const SupabaseDebug = () => {
  const [status, setStatus] = useState('checking');
  const [lastChecked, setLastChecked] = useState(null);

  useEffect(() => {
    const checkConnection = async () => {
      setStatus('checking');
      const isConnected = await checkSupabaseConnection();
      setStatus(isConnected ? 'connected' : 'disconnected');
      setLastChecked(new Date());
    };

    // Initial check
    checkConnection();

    // Check every 30 seconds
    const interval = setInterval(checkConnection, 30000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 p-2 bg-black/50 rounded-lg text-xs">
      <div className={`flex items-center gap-2 ${
        status === 'connected' ? 'text-green-400' :
        status === 'checking' ? 'text-yellow-400' : 'text-red-400'
      }`}>
        <div className={`w-2 h-2 rounded-full ${
          status === 'connected' ? 'bg-green-400' :
          status === 'checking' ? 'bg-yellow-400' : 'bg-red-400'
        }`} />
        <span>Supabase: {status}</span>
      </div>
      {lastChecked && (
        <div className="text-white/50 mt-1">
          Last checked: {lastChecked.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

export default SupabaseDebug;
