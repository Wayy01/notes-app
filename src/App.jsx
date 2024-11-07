import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <AuthDebug />
      <Toaster position="bottom-right" theme="dark" />
    </MobileMenuProvider>
  );
}

export default App;
