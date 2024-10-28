import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PageLayout from '@/layouts/PageLayout';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import SignupPage from '@/pages/auth/SignupPage';
import DashboardLayout from '@/layouts/DashboardLayout';
import FolderLayout from '@/layouts/FolderLayout';
import NotesGrid from '@/components/NotesGrid';
import PricingPage from '@/pages/pricing/PricingPage';
import BetaProgramPage from '@/pages/beta/BetaProgramPage';
import SupportPage from '@/pages/support/SupportPage';
import NotePage from '@/pages/NotePage';

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
    <Routes>
      {/* Public routes - Landing page accessible to all */}
      <Route path="/" element={<LandingPage />} />

      {/* Auth routes - Redirect to dashboard if logged in */}
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/dashboard" />} />

      {/* Public routes */}
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/beta" element={<BetaProgramPage />} />
      <Route path="/support" element={<SupportPage />} />

      {/* Protected routes - All wrapped in PageLayout */}
      <Route element={<PageLayout />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<NotesGrid />} />
          <Route path="inbox" element={<NotesGrid filter="inbox" />} />
          <Route path="favorites" element={<NotesGrid filter="favorites" />} />
          <Route path="archive" element={<NotesGrid filter="archive" />} />
          <Route path="trash" element={<NotesGrid filter="trash" />} />
          <Route path="folders/:folderId" element={<NotesGrid />} />
          <Route path="notes/:noteId" element={<NotePage />} />
        </Route>
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
