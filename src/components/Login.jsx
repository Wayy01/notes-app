import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Login() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); // State for error message
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const existingUser = users.find(u => u.email === email);

    if (existingUser && existingUser.password === password) {
      sessionStorage.setItem('currentUser', JSON.stringify(existingUser));
      navigate('/notes');
      setLoginError(false);
    } else {
      setLoginError(true);
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


        {loginError && (
          <span className="text-red-500 text-sm">Invalid email or password</span>
        )}

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
