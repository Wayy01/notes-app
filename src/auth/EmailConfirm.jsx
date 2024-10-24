import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient'; // Import the shared Supabase client

const EmailConfirm = () => {
  const [message, setMessage] = useState('Verifying your email...');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const confirmEmail = async () => {
      const searchParams = new URLSearchParams(location.search);
      const tokenHash = searchParams.get('token_hash');
      const type = searchParams.get('type');

      if (tokenHash && type) {
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type,
          });

          if (error) throw error;

          setMessage('Email confirmed successfully! Redirecting to login...');
          setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
          console.error('Error confirming email:', error);
          setMessage('Failed to confirm email. Please try again or contact support.');
        }
      } else {
        setMessage('Invalid confirmation link.');
      }
    };

    confirmEmail();
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[--MainColor]">
      <div className="bg-[var(--base-color)] p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Email Confirmation</h1>
        <p className="text-white">{message}</p>
      </div>
    </div>
  );
};

export default EmailConfirm;
