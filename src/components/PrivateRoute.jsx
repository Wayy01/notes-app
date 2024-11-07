import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';  // Assuming you have an AuthContext

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[--bg-primary] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[--accent-primary]" />
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
