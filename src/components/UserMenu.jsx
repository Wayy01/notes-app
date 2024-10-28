import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import {
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiSettings,
  FiHelpCircle,
  FiMoon,
  FiStar,
  FiGithub
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import SignOutDialog from './SignOutDialog';

const defaultAvatar = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgZmlsbD0ibm9uZSI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiM4QjVDRjYiLz48cGF0aCBkPSJNMTIgMTNjMi43NjEgMCA1LTIuMjM5IDUtNXMtMi4yMzktNS01LTUtNSAyLjIzOS01IDUgMi4yMzkgNSA1IDV6bTAgMmMtMy4zMTUgMC02IDIuNjg1LTYgNnMxMiAwIDEyIDBjMC0zLjMxNS0yLjY4NS02LTYtNnoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=';

function UserMenu() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

  const menuItems = [
    {
      icon: <FiUser />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
      divider: false
    },
    {
      icon: <FiSettings />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
      divider: false
    },
    {
      icon: <FiStar />,
      label: 'What\'s New',
      onClick: () => window.open('https://github.com/yourusername/yourrepo/releases', '_blank'),
      divider: true
    },
    {
      icon: <FiHelpCircle />,
      label: 'Help & Support',
      onClick: () => window.open('https://github.com/yourusername/yourrepo/issues', '_blank'),
      divider: false
    },
    {
      icon: <FiGithub />,
      label: 'GitHub Repo',
      onClick: () => window.open('https://github.com/yourusername/yourrepo', '_blank'),
      divider: true
    },
    {
      icon: <FiLogOut />,
      label: 'Sign Out',
      onClick: () => setShowSignOutDialog(true),
      divider: false,
      danger: true
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
      toast.success('Signed out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to sign out');
    }
  };

  return (
    <Menu as="div" className="relative inline-block w-full text-left">
      <Menu.Button
        as={motion.button}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg
                 bg-white/5 hover:bg-white/10 transition-colors duration-200
                 group border border-white/10 hover:border-white/20"
      >
        <div className="relative w-8 h-8">
          <img
            src={user?.user_metadata?.avatar_url || defaultAvatar}
            alt={user?.user_metadata?.username || 'User'}
            className="w-8 h-8 rounded-full object-cover border-2 border-violet-400/50"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultAvatar;
            }}
          />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full
                        border-2 border-[--bg-primary]" />
        </div>
        <span className="text-sm font-medium text-white flex-1 text-left truncate">
          {user?.user_metadata?.username || user?.email?.split('@')[0] || 'User'}
        </span>
        <FiChevronDown className="text-white/70 group-hover:text-white/90 transition-colors" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute left-0 mt-2 w-64 rounded-xl
                   bg-gradient-to-b from-[--bg-secondary] to-black/90
                   border border-white/10 shadow-xl shadow-black/40
                   backdrop-blur-xl divide-y divide-white/10
                   origin-top-right z-50"
        >
          {/* Dropdown Arrow */}
          <div className="absolute -top-2 left-4 w-4 h-4 rotate-45
                       bg-[--bg-secondary] border-l border-t border-white/10" />

          {/* User Info Section */}
          <div className="relative px-4 py-3 bg-[--bg-secondary]/95">
            <p className="text-sm text-white/50 font-medium">Signed in as</p>
            <p className="text-sm font-semibold text-white truncate mt-0.5">
              {user?.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="relative bg-transparent py-1 max-h-[calc(100vh-200px)]
                       overflow-y-auto scrollbar-thin scrollbar-track-transparent
                       scrollbar-thumb-white/10">
            {menuItems.map((item, index) => (
              <Fragment key={item.label}>
                <Menu.Item>
                  {({ active }) => (
                    <motion.button
                      onClick={item.onClick}
                      whileHover={{ x: 4 }}
                      className={`
                        ${active ? 'bg-white/10' : ''}
                        ${item.danger
                          ? 'text-red-400 hover:text-red-300'
                          : 'text-white/70 hover:text-white'
                        }
                        group flex w-full items-center px-4 py-2.5 text-sm
                        transition-all duration-200 relative
                      `}
                    >
                      <span className={`
                        w-5 h-5 mr-3 transition-transform duration-200
                        ${active ? 'scale-110 text-violet-400' : ''}
                        ${item.danger && active ? 'text-red-400' : ''}
                      `}>
                        {item.icon}
                      </span>
                      <span className="font-medium">{item.label}</span>

                      {active && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1
                                   bg-violet-500 rounded-r"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        />
                      )}
                    </motion.button>
                  )}
                </Menu.Item>
                {item.divider && (
                  <div className="my-1 border-t border-white/10" />
                )}
              </Fragment>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
            <div className="absolute -top-32 -right-32 w-64 h-64
                         bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64
                         bg-violet-500/10 rounded-full blur-3xl" />
          </div>
        </Menu.Items>
      </Transition>

      <SignOutDialog
        isOpen={showSignOutDialog}
        onClose={() => setShowSignOutDialog(false)}
        onConfirm={handleLogout}
      />
    </Menu>
  );
}

export { UserMenu };
export default UserMenu;
