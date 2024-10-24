import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [session, setSession] = useState(null);
  const navigate = useNavigate();
  const { supabase, signIn } = useAuth();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error getting session:', error.message);
      } else {
        setSession(session);
        console.log(session);
      }
    };

    getSession();
  }, [supabase.auth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const { data, error } = await signIn({ email, password });

      if (error) {
        throw error;
      }

      if (data.user) {
        console.log('User logged in:', data.user);
        navigate('/notes');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during login.');
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
