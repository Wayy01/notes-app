import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiPlus, FiInbox, FiStar, FiArchive, FiTrash2 } from 'react-icons/fi';
import { useNotes } from '@/contexts/NotesContext';
import FoldersList from './FoldersList';

const MobileSidebar = ({ onCreateNote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { notes } = useNotes();

  const systemFolders = [
    { id: 'inbox', icon: FiInbox, label: 'Inbox', path: '/dashboard/inbox' },
    { id: 'favorites', icon: FiStar, label: 'Favorites', path: '/dashboard/favorites' },
    { id: 'archive', icon: FiArchive, label: 'Archive', path: '/dashboard/archive' },
    { id: 'trash', icon: FiTrash2, label: 'Trash', path: '/dashboard/trash' }
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="lg:hidden">
      {/* Mobile Menu Button - Updated position */}
      <button
        onClick={toggleSidebar}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-violet-500
                 text-white shadow-lg hover:bg-violet-600 transition-colors
                 duration-200 flex items-center justify-center"
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />

            {/* Sidebar Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-[--bg-secondary]
                       border-r border-white/10 z-50 overflow-y-auto"
            >
              <div className="p-4 space-y-4">
                {/* New Note Button */}
                <motion.button
                  onClick={() => {
                    onCreateNote();
                    setIsOpen(false);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 rounded-lg bg-violet-500
                           hover:bg-violet-600 text-white font-medium
                           transition-colors duration-200 flex items-center
                           justify-center gap-2"
                >
                  <FiPlus className="w-5 h-5" />
                  New Note
                </motion.button>

                {/* System Folders */}
                <nav className="space-y-1">
                  {systemFolders.map((folder) => {
                    const Icon = folder.icon;
                    return (
                      <Link
                        key={folder.id}
                        to={folder.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                          w-full flex items-center px-3 py-2 rounded-lg text-sm
                          ${location.pathname === folder.path
                            ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                            : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                          }
                          transition-all duration-200
                        `}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        <span>{folder.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* User Folders */}
                <div className="pt-4 border-t border-white/10">
                  <h2 className="px-3 mb-2 text-xs font-medium text-white/50 uppercase">
                    Folders
                  </h2>
                  <FoldersList onFolderClick={() => setIsOpen(false)} />
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
