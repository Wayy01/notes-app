import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/Logo';
import UserMenu from '@/components/UserMenu';
import { useMobileMenu } from '@/contexts/MobileMenuContext';

function Navigation({ landingPage, scrollToSection, sections }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { activeMenu, setActiveMenu } = useMobileMenu();
  const isNavOpen = activeMenu === 'nav';

  // Add this function to check if a path is active
  const isActive = (path) => {
    if (landingPage && path.startsWith('#')) {
      return false; // Sections don't have an "active" state on landing page
    }
    return location.pathname.startsWith(path);
  };

  const toggleNav = () => {
    setActiveMenu(isNavOpen ? null : 'nav');
  };

  // Update the mobile menu section to handle both regular links and section scrolling
  const handleMobileItemClick = (item) => {
    if (item.isSection) {
      scrollToSection(item.path);
    }
    setActiveMenu(null);
  };

  // Conditional nav items based on page type
  const navItems = landingPage && !user
    ? sections.map(section => ({
        path: section.id,
        label: section.name,
        isSection: true
      }))
    : [
        { path: '/dashboard', label: 'Dashboard' },
        { path: '/pricing', label: 'Pricing', badge: 'Beta' },
        { path: '/support', label: 'Support' },
      ];

  const handleNavClick = (item) => {
    if (landingPage && item.isSection) {
      scrollToSection(item.path);
      setActiveMenu(null);
    }
  };

  return (
    <nav className={`${landingPage ? 'fixed' : 'sticky'} top-0 w-full z-50
                    border-b border-white/10
                    bg-gradient-to-b from-[--bg-secondary] to-[--bg-secondary]/80
                    backdrop-blur-xl`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Logo onClick={() => navigate('/')} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.isSection ? (
                <motion.button
                  key={item.path}
                  onClick={() => handleNavClick(item)}
                  className="text-white/70 hover:text-white transition-colors
                           relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="flex items-center gap-2">
                    {item.label}
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-xs bg-violet-500/20
                                    text-violet-400 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5
                                 bg-gradient-to-r from-violet-400 to-fuchsia-400
                                 group-hover:w-full transition-all duration-300" />
                </motion.button>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200
                    flex items-center gap-2
                    ${location.pathname.startsWith(item.path)
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                    }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="px-1.5 py-0.5 text-xs bg-violet-500/20
                                  text-violet-400 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            ))}
          </div>

          {/* User Menu / Auth Buttons */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              {user ? (
                <UserMenu />
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-white/70 hover:text-white
                             transition-colors rounded-lg border border-white/10
                             hover:border-white/20"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-500
                             text-white rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleNav}
              className="md:hidden p-2 rounded-lg text-white/70 hover:text-white
                       hover:bg-white/5 transition-all border border-white/10"
            >
              {isNavOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden absolute top-[64px] left-0 right-0
                       bg-[#0A0A0F] border-b border-white/10
                       shadow-lg shadow-black/50"
            >
              <div className="px-4 py-6 space-y-6 max-h-[calc(100vh-64px)] overflow-y-auto">
                {/* Navigation Items */}
                <div className="space-y-2">
                  {navItems.map((item) => (
                    item.isSection ? (
                      <motion.button
                        key={item.path}
                        onClick={() => handleMobileItemClick(item)}
                        className="block w-full text-left px-4 py-3 rounded-lg
                                 text-white/70 hover:text-white hover:bg-violet-500/10
                                 transition-all duration-200 font-medium"
                      >
                        {item.label}
                      </motion.button>
                    ) : (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setActiveMenu(null)}
                        className={`block px-4 py-3 rounded-lg transition-all duration-200 font-medium
                          ${isActive(item.path)
                            ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                            : 'text-white/70 hover:text-white hover:bg-violet-500/10'
                          }`}
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                </div>

                {/* Mobile Auth Section */}
                {user ? (
                  <div className="pt-4 border-t border-white/10">
                    <UserMenu />
                  </div>
                ) : (
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    <Link
                      to="/login"
                      onClick={() => setActiveMenu(null)}
                      className="block w-full px-4 py-3 text-center text-white/70
                               hover:text-white rounded-lg transition-colors
                               border border-white/10 hover:border-white/20
                               hover:bg-white/5"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setActiveMenu(null)}
                      className="block w-full px-4 py-3 text-center
                               bg-violet-600 hover:bg-violet-500
                               text-white font-medium rounded-lg
                               transition-colors"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

Navigation.defaultProps = {
  landingPage: false,
  scrollToSection: () => {},
  sections: []
};

export default Navigation;
