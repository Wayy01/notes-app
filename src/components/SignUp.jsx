import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';


function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const navigate = useNavigate();

    function registerUser(email, password) {
      if (!users.some(u => u.email === email)) {
        users.push({ email, password });
        localStorage.setItem('users', JSON.stringify(users)); // Store the entire array
      }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (email && password) {
          const existingUser = users.find(u => u.email === email);
          if (!existingUser) {
            registerUser(email, password);
            // You might want to add success handling here (e.g., a message)
            navigate('/'); // Redirect after successful registration
          }else {
            setError(true);
          }
        }
      };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col min-w-screen px-4 py-16 sm:px-6 lg:px-8 bg-[var(--MainColor)] fixed w-screen select-none">
      <div className="mx-auto max-w-lg flex"></div>
      <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-4 space-y-4 w-[250px]">
        <h1 className="text-1xl font-semibold text-white sm:text-3xl">Sign up</h1>
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
            {/* ... (rest of your email input) */}
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
        {error && (
            <span className="text-red-500 text-sm">User already exists</span>
        )}

        <div className="flex items-center justify-between flex-col">
        <button type="submit" className="justify-center items-center rounded-lg bg-blue-500 text-sm font-medium text-white w-full flex h-[40px]">
      Sign up
    </button>
     <p className="text-sm text-gray-500 w-full mt-2 inline-flex items-center ">
            <span>Already have an account?</span>
            <Link className="underline text-sm text-gray-500 ml-2" to="/">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
