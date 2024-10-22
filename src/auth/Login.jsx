import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const REACT_APP_SUPABASE_KEY ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaXpqYnBrc2x1a2lnaWRncnFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY4ODk3MjUsImV4cCI6MjA0MjQ2NTcyNX0.c868gOS3MQv4CMUsQBzeqvf4TgxkMliaMNY_dGRMvWU'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {

      const getSession = async () => {
            const supabaseUrl = 'https://mnizjbpkslukigidgrqg.supabase.co';
            const supabaseKey = REACT_APP_SUPABASE_KEY;
            const supabase = createClient(supabaseUrl, supabaseKey);


      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error.message);
      } else {
          setSession(session);
          console.log(session)
      }
    };

    getSession();
  }, []);

    const handleSubmit = async (event) => {
            const supabaseUrl = 'https://mnizjbpkslukigidgrqg.supabase.co';
            const supabaseKey = REACT_APP_SUPABASE_KEY;
            const supabase = createClient(supabaseUrl, supabaseKey);


    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        console.log('User logged in:', data.user);
        navigate('/notes');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during sign up.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col min-w-screen px-4 py-16 sm:px-6 lg:px-8 bg-[var(--MainColor)] fixed w-screen select-none">
      <div className="mx-auto max-w-lg flex"></div>
      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-4 space-y-4 w-[250px]">
        <h1 className="text-1xl font-semibold text-white sm:text-4xl">Log in</h1>
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              id="email"
              className="w-full rounded-lg border-gray-200 p-3.5 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              className="w-full rounded-lg border-gray-200 p-3.5 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <span className="text-red-500 text-sm">{error}</span>}

        <div className="flex items-center justify-between flex-col">
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-full"
          >
            Log in
          </button>
          <p className="text-sm text-gray-500 w-full mt-2">
            No account?
            <Link className="underline text-sm text-gray-500 ml-2" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
