import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/Logo';
import ConfirmDialog from './ConfirmDialog';
import SignOutDialog from './SignOutDialog';
import UserMenu from '@/components/UserMenu';

function Navigation() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const isNoteOpen = location.pathname.includes('/notes/');

  const isDashboard = location.pathname.startsWith('/dashboard');

  // Update navItems to keep "Dashboard" label
  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/support', label: 'Support' },
  ];

  // Updated logo click handler
  const handleLogoClick = () => {
    navigate('/', { replace: true });
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <motion.nav
      className={`sticky top-0 z-50 border-b border-white/10
                bg-gradient-to-b from-[--bg-secondary] to-[--bg-secondary]/80
                backdrop-blur-xl
                ${isNoteOpen ? 'lg:pr-0' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-200
                    ${isActive(item.path)
                      ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <UserMenu />
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-white/70 hover:text-white
                             transition-colors rounded-lg border border-white/10
                             hover:border-white/20 bg-white/5"
                  >
                    Sign In
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-500
                             hover:from-violet-500 hover:to-violet-400
                             text-white rounded-lg transition-all duration-300
                             shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40
                             border border-violet-400/20"
                  >
                    Sign Up
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white
                     hover:bg-white/5 transition-colors border border-white/10"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu with improved styling */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-gradient-to-b
                     from-[--bg-secondary] to-[--bg-primary]"
          >
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Navigation Items */}
              <div className="space-y-2">
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-2 rounded-lg transition-all duration-200
                        ${isActive(item.path)
                          ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                          : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                        }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Mobile User Actions */}
              {user ? (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <UserMenu />
                </div>
              ) : (
                <div className="space-y-2 pt-2 border-t border-white/10">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 text-white/70 hover:text-white
                             hover:bg-white/5 rounded-lg transition-colors
                             border border-white/10"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 bg-gradient-to-r from-violet-600
                             to-violet-500 hover:from-violet-500 hover:to-violet-400
                             text-white rounded-lg transition-all duration-300
                             shadow-lg shadow-violet-500/25 border border-violet-400/20"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SignOutDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
      />
    </motion.nav>
  );
}

export default Navigation;
