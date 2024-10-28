import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu,
  FiX,
  FiPlus,
  FiInbox,
  FiStar,
  FiArchive,
  FiTrash2,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
  FiFolder
} from 'react-icons/fi';
import { useNotes } from '@/contexts/NotesContext';
import { useAuth } from '@/contexts/AuthContext';
import FoldersList from './FoldersList';
import { useMobileMenu } from '@/contexts/MobileMenuContext';
import UserAvatar from './UserAvatar';

const MobileSidebar = ({ onCreateNote }) => {
  const location = useLocation();
  const { activeMenu, setActiveMenu } = useMobileMenu();
  const { notes, folders } = useNotes();
  const { user, signOut } = useAuth();
  const isSidebarOpen = activeMenu === 'sidebar';

  // Calculate counts
  const getCounts = () => {
    return {
      inbox: notes.filter(note => !note.is_deleted && !note.is_archived && !note.folder_id).length,
      favorites: notes.filter(note => note.is_favorite && !note.is_deleted).length,
      archived: notes.filter(note => note.is_archived && !note.is_deleted).length,
      trash: notes.filter(note => note.is_deleted).length
    };
  };

  const counts = getCounts();

  const systemFolders = [
    { id: 'inbox', icon: FiInbox, label: 'Inbox', path: '/dashboard/inbox', count: counts.inbox },
    { id: 'favorites', icon: FiStar, label: 'Favorites', path: '/dashboard/favorites', count: counts.favorites },
    { id: 'archive', icon: FiArchive, label: 'Archive', path: '/dashboard/archive', count: counts.archived },
    { id: 'trash', icon: FiTrash2, label: 'Trash', path: '/dashboard/trash', count: counts.trash }
  ];

  const toggleSidebar = () => {
    setActiveMenu(isSidebarOpen ? null : 'sidebar');
  };

  // Close sidebar on route change
  useEffect(() => {
    setActiveMenu(null);
  }, [location.pathname, setActiveMenu]);

  return (
    <div className="lg:hidden">
      {/* Mobile Menu Button */}
      <motion.button
        initial={false}
        animate={{
          scale: isSidebarOpen ? 1 : 1,
          rotate: isSidebarOpen ? 180 : 0,
          y: activeMenu === 'nav' ? 100 : 0 // Retract when nav is open
        }}
        transition={{ duration: 0.2 }}
        onClick={toggleSidebar}
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-violet-500
                 text-white shadow-lg hover:bg-violet-600 transition-all
                 duration-200 flex items-center justify-center"
      >
        {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </motion.button>

      {/* Sidebar Content */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setActiveMenu(null)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-[--bg-secondary]
                       border-r border-white/10 z-50 flex flex-col"
            >
              {/* User Section at Top */}
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <UserAvatar size="lg" />
                  <div>
                    <h3 className="font-medium text-white">{user?.email}</h3>
                    <p className="text-sm text-white/50">Free Plan</p>
                  </div>
                </div>

                {/* New Note Button */}
                <motion.button
                  onClick={() => {
                    onCreateNote();
                    setActiveMenu(null);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2.5 rounded-lg bg-violet-500
                           hover:bg-violet-600 text-white font-medium
                           transition-colors duration-200 flex items-center
                           justify-center gap-2"
                >
                  <FiPlus className="w-5 h-5" />
                  New Note
                </motion.button>
              </div>

              {/* Main Navigation */}
              <div className="flex-1 overflow-y-auto">
                <nav className="p-3 space-y-1">
                  {systemFolders.map((folder) => {
                    const Icon = folder.icon;
                    return (
                      <Link
                        key={folder.id}
                        to={folder.path}
                        onClick={() => setActiveMenu(null)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                          ${location.pathname === folder.path
                            ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                            : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                          }
                          transition-all duration-200
                        `}
                      >
                        <span className="flex items-center gap-3">
                          <Icon className="w-5 h-5" />
                          {folder.label}
                        </span>
                        {folder.count > 0 && (
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10">
                            {folder.count}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>

                {/* Folders Section */}
                <div className="p-3">
                  <div className="flex items-center justify-between px-3 mb-2">
                    <h2 className="text-sm font-medium text-white/50">Folders</h2>
                    <button
                      onClick={() => {/* Add new folder logic */}}
                      className="p-1 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <FiPlus className="w-4 h-4 text-white/50" />
                    </button>
                  </div>
                  <div className="space-y-1">
                    {folders.map(folder => (
                      <Link
                        key={folder.id}
                        to={`/dashboard/folders/${folder.id}`}
                        onClick={() => setActiveMenu(null)}
                        className={`
                          w-full flex items-center justify-between px-3 py-2.5 rounded-lg
                          ${location.pathname === `/dashboard/folders/${folder.id}`
                            ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                            : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                          }
                          transition-all duration-200
                        `}
                      >
                        <span className="flex items-center gap-3">
                          <FiFolder className="w-5 h-5" />
                          {folder.name}
                        </span>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10">
                          {notes.filter(note => note.folder_id === folder.id && !note.is_deleted).length}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-3 border-t border-white/10">
                <div className="space-y-1">
                  <Link
                    to="/settings"
                    onClick={() => setActiveMenu(null)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                             text-white/70 hover:text-white hover:bg-white/5
                             transition-all duration-200"
                  >
                    <FiSettings className="w-5 h-5" />
                    Settings
                  </Link>
                  <Link
                    to="/help"
                    onClick={() => setActiveMenu(null)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                             text-white/70 hover:text-white hover:bg-white/5
                             transition-all duration-200"
                  >
                    <FiHelpCircle className="w-5 h-5" />
                    Help & Support
                  </Link>
                  <button
                    onClick={async () => {
                      await signOut();
                      setActiveMenu(null);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                             text-red-400 hover:text-red-300 hover:bg-red-500/10
                             transition-all duration-200"
                  >
                    <FiLogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSidebar;
