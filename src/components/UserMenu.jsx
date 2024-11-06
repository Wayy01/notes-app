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
import { toast } from 'sonner';
import SignOutDialog from './SignOutDialog';
import UserAvatar from './UserAvatar';

function UserMenu() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showSignOutDialog, setShowSignOutDialog] = useState(false);

  const menuItems = [
    {
      icon: <FiUser className="w-4 h-4" />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
      divider: false
    },
    {
      icon: <FiSettings className="w-4 h-4" />,
      label: 'Settings',
      onClick: () => navigate('/settings'),
      divider: false
    },
    {
      icon: <FiStar className="w-4 h-4" />,
      label: 'What\'s New',
      onClick: () => window.open('https://github.com/yourusername/yourrepo/releases', '_blank'),
      divider: true
    },
    {
      icon: <FiLogOut className="w-4 h-4" />,
      label: 'Sign Out',
      onClick: () => setShowSignOutDialog(true),
      divider: false,
      danger: true
    }
  ];

  // Get display name or fallback to a default
  const displayName = user?.user_metadata?.full_name || 'User';

  return (
    <>
      <Menu as="div" className="relative w-full md:w-auto">
        <Menu.Button
          className="flex items-center justify-between w-full p-2.5 rounded-lg
                     bg-white/5 hover:bg-white/10 transition-colors border border-white/10
                     active:scale-95 transform duration-200"
        >
          <div className="flex items-center gap-3">
            <UserAvatar size="sm" />
            <span className="text-sm font-medium text-white/90">{displayName}</span>
          </div>
          <FiChevronDown className="w-4 h-4 text-white/50" />
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
            className="md:absolute md:right-0 mt-2 w-full md:w-56 rounded-lg
                       bg-[#141417] border border-white/10 shadow-xl shadow-black/20
                       focus:outline-none overflow-hidden"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <UserAvatar size="md" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white/90">{displayName}</span>
                  <span className="text-xs text-white/50">{user?.email}</span>
                </div>
              </div>
            </div>
            <div className="p-1.5">
              {menuItems.map((item, index) => (
                <Fragment key={item.label}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={item.onClick}
                        className={`${
                          active
                            ? item.danger
                              ? 'bg-red-500/10 text-red-400'
                              : 'bg-violet-500/10 text-violet-400'
                            : item.danger
                              ? 'text-red-400/70'
                              : 'text-white/70'
                        } group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm
                        transition-colors duration-200`}
                      >
                        {item.icon}
                        {item.label}
                      </button>
                    )}
                  </Menu.Item>
                  {item.divider && (
                    <div className="my-1.5 border-t border-white/5" />
                  )}
                </Fragment>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <SignOutDialog
        isOpen={showSignOutDialog}
        onClose={() => setShowSignOutDialog(false)}
        onConfirm={signOut}
      />
    </>
  );
}

export default UserMenu;
