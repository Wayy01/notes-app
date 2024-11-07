import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from '@/components/Navigation';
import SignOutDialog from '@/components/SignOutDialog';
import { Toaster } from 'sonner';

const PageLayout = () => {
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);
  const { user, signOut } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      setShowSignOutDialog(false);
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[--bg-primary]">
      <Navigation /> {/* Using your existing Navigation component */}
      <main className="flex-1">
        <Outlet />
        <SignOutDialog
          isOpen={showSignOutDialog}
          onClose={() => setShowSignOutDialog(false)}
          onConfirm={handleSignOut}
        />
      </main>
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
};

export default PageLayout;
