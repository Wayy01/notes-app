import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiUser } from 'react-icons/fi';
import { Logo } from '@/components/Logo';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { supabase } from '@/lib/supabase';

function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const isEmail = formData.emailOrUsername.includes('@');
      let email = formData.emailOrUsername;

      if (!isEmail) {
        const { data: userData, error: userError } = await supabase
          .rpc('get_user_by_display_name', {
            display_name: formData.emailOrUsername.trim()
          });

        if (userError) {
          console.error('Display name lookup error:', userError);
          throw new Error('Failed to lookup display name');
        }

        if (!userData || userData.length === 0) {
          throw new Error('Username not found');
        }

        email = userData[0].email;
      }

      const { error: signInError } = await signIn({
        email: email.toLowerCase().trim(),
        password: formData.password
      });

      if (signInError) {
        if (signInError.message === 'Invalid login credentials') {
          throw new Error(isEmail ? 'Invalid email or password' : 'Invalid username or password');
        }
        throw signInError;
      }

      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error(
        error.message === 'Username not found'
          ? 'Username not found. Please check your spelling and try again.'
          : error.message === 'Invalid login credentials'
          ? 'Invalid password'
          : error.message === 'Failed to lookup display name'
          ? 'Unable to verify username. Please try again.'
          : 'Failed to sign in'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0F] relative overflow-hidden">
      <AnimatedBackground />

      {/* Navigation */}
      <nav className="border-b border-white/10 backdrop-blur-md bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Header */}
          <div className="text-center space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-300
                         to-cyan-300 bg-clip-text text-transparent"
            >
              Welcome back
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg"
            >
              Sign in to your account to continue
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="mt-8 space-y-6 backdrop-blur-md bg-black/40 p-8 rounded-xl
                     border border-white/10 hover:border-white/20 transition-colors
                     duration-300 shadow-xl shadow-black/20"
          >
            <div className="space-y-5">
              {/* Email or Username Field */}
              <div className="group">
                <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-300 mb-2">
                  Email or Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400 group-hover:text-violet-400 transition-colors" />
                  </div>
                  <input
                    id="emailOrUsername"
                    name="emailOrUsername"
                    type="text"
                    required
                    value={formData.emailOrUsername}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10
                             rounded-lg text-white focus:ring-2 focus:ring-violet-500
                             focus:border-transparent transition-all duration-200
                             hover:border-violet-500/50 hover:bg-white/[0.07]"
                    placeholder="Enter your email or username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400 group-hover:text-violet-400 transition-colors" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10
                             rounded-lg text-white focus:ring-2 focus:ring-violet-500
                             focus:border-transparent transition-all duration-200
                             hover:border-violet-500/50 hover:bg-white/[0.07]"
                    placeholder="Enter your password"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3
                       text-sm font-medium rounded-lg text-white
                       bg-gradient-to-r from-violet-600 via-violet-500 to-fuchsia-500
                       hover:from-violet-500 hover:via-violet-400 hover:to-fuchsia-400
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500
                       transition-all duration-200 animate-gradient
                       disabled:opacity-50 disabled:cursor-not-allowed
                       shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40
                       hover:scale-[1.02] active:scale-[0.98]
                       gap-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in <FiArrowRight className="animate-pulse" />
                </>
              )}
            </button>

            {/* Links */}
            <div className="flex items-center justify-between pt-4 space-x-4">
              <Link
                to="/forgot-password"
                className="text-sm text-violet-400 hover:text-violet-300 transition-colors
                         hover:underline decoration-2 underline-offset-4 flex-1 text-center"
              >
                Forgot password?
              </Link>
              <div className="h-4 w-px bg-white/10" />
              <Link
                to="/signup"
                className="text-sm text-violet-400 hover:text-violet-300 transition-colors
                         hover:underline decoration-2 underline-offset-4 flex-1 text-center"
              >
                Create account
              </Link>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}

export default LoginPage;
