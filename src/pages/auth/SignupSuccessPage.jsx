import React from 'react';
import { Link } from 'react-router-dom';

function SignupSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] p-4">
      <div className="w-full max-w-md space-y-8 p-8 bg-[#12121A] rounded-xl border border-white/10 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-white">
            Check your email
          </h2>

          <p className="text-gray-400">
            We've sent you an email with a verification link.
            Please verify your email to complete the signup process.
          </p>

          <div className="pt-6 space-y-4">
            <Link
              to="/login"
              className="inline-block px-6 py-2.5 bg-violet-600 hover:bg-violet-700
                       rounded-lg font-medium text-white transition-colors
                       duration-200"
            >
              Go to Login
            </Link>

            <p className="text-sm text-gray-400">
              Didn't receive the email?{' '}
              <Link
                to="/signup"
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                Try signing up again
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupSuccessPage;
