import React, { useState, useEffect } from 'react';
import { checkConnection } from '@/lib/supabase';

const ConnectionStatus = () => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkStatus = async () => {
      const isConnected = await checkConnection();
      setStatus(isConnected ? 'connected' : 'disconnected');
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 p-2 bg-black/50 rounded text-xs">
      <p className={status === 'connected' ? 'text-green-400' : 'text-red-400'}>
        {status === 'connected' ? '🟢 Connected' : '🔴 Disconnected'}
      </p>
    </div>
  );
};

export default ConnectionStatus;
