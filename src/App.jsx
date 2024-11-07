import React from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageLayout from '@/layouts/PageLayout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import PricingPage from '@/pages/pricing/PricingPage';
import Dashboard from '@/pages/Dashboard';
import ProfilePage from '@/pages/profile/ProfilePage';
import SettingsPage from '@/pages/settings/SettingsPage';
import { MobileMenuProvider } from '@/contexts/MobileMenuContext';
import AuthDebug from '@/components/AuthDebug';
import { Toaster } from 'sonner';
import 'react-quill/dist/quill.snow.css';
import 'highlight.js/styles/monokai-sublime.css';
import './styles/editor.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-violet-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <MobileMenuProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* Auth routes */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/dashboard" />}
        />

        {/* Protected routes */}
        <Route element={<PageLayout />}>
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/profile"
            element={user ? <ProfilePage /> : <Navigate to="/login" />}
          />
          <Route
            path="/settings"
            element={user ? <SettingsPage /> : <Navigate to="/login" />}
          />
          {/* You can add more protected routes here in the future */}
        </Route>

        {/* Catch all */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F]">
            <div className="text-center space-y-4 p-6 bg-[#12121A] rounded-xl border border-white/10">
              <h2 className="text-2xl font-bold text-white">Page Not Found</h2>
              <p className="text-gray-400">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <Link
                to="/dashboard"
                className="inline-block px-6 py-2 bg-violet-500 hover:bg-violet-600
                         transition-colors rounded-lg text-white"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        } />
      </Routes>
      <AuthDebug />
      <Toaster position="bottom-right" theme="dark" />
    </MobileMenuProvider>
  );
}

export default App;
