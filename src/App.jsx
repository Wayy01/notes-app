import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NotesPage from './components/NotesPage';
import EmailConfirm from './auth/EmailConfirm';
import Login from './auth/Login';  // Assuming you have a Login component
import SignUp from './auth/SignUp';  // Assuming you have a Signup component
import PrivateRoute from './components/PrivateRoute';  // A component to handle protected routes
import { AuthProvider, useAuth } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App bg-[--MainColor] min-h-screen">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/src/auth/confirm" element={<EmailConfirm />} />
            <Route
              path="/notes"
              element={
                <PrivateRoute>
                  <NotesPage />
                </PrivateRoute>
              }
            />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
