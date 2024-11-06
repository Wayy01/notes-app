import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiInbox, FiStar, FiArchive, FiTrash2, FiFolder, FiX, FiCheck } from 'react-icons/fi';
import { useNotes } from '@/contexts/NotesContext';

const MobileSidebar = ({ onCreateNote, onClose }) => {
  const location = useLocation();
  const { folders, notes, createFolder } = useNotes();
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  // Calculate counts for system folders and custom folders
  const getCounts = {
    inbox: notes.filter(note => !note.folder_id && !note.is_deleted).length,
    favorites: notes.filter(note => note.is_favorite && !note.is_deleted).length,
    archive: notes.filter(note => note.is_archived && !note.is_deleted).length,
    trash: notes.filter(note => note.is_deleted).length,
  };

  const handleCreateFolder = async (e) => {
    e?.preventDefault();
    if (!newFolderName.trim()) {
      setIsCreatingFolder(false);
      setNewFolderName('');
      return;
    }

    try {
      await createFolder({ name: newFolderName.trim() });
      setNewFolderName('');
      setIsCreatingFolder(false);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#12121E]/95">
      {/* Close button - visible only on mobile */}
      <div className="lg:hidden flex justify-end p-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="p-2 text-white/70 hover:text-white/90 hover:bg-white/[0.05] rounded-lg"
        >
          <FiX className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Create Note Button */}
      <div className="p-4 border-b border-white/[0.05]">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onCreateNote}
          className="w-full group relative px-4 py-3 bg-[#1E1E2E] hover:bg-[#2A2A3A]
                    border border-white/[0.05] rounded-lg overflow-hidden transition-colors duration-200"
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10" />
          </div>
          <span className="relative flex items-center justify-center gap-2 text-white/70 group-hover:text-white/90">
            <FiPlus className="w-5 h-5" />
            Create Note
          </span>
        </motion.button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        {/* System Folders */}
        <nav className="p-4 space-y-2">
          {/* System Folders */}
          {[
            { icon: FiInbox, label: 'Inbox', path: '/dashboard/inbox', count: getCounts.inbox },
            { icon: FiStar, label: 'Favorites', path: '/dashboard/favorites', count: getCounts.favorites },
            { icon: FiArchive, label: 'Archive', path: '/dashboard/archive', count: getCounts.archive },
            { icon: FiTrash2, label: 'Trash', path: '/dashboard/trash', count: getCounts.trash }
          ].map(({ icon: Icon, label, path, count }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
                ${location.pathname === path
                  ? 'bg-[#2A2A3A] text-violet-400 border border-violet-500/20'
                  : 'text-white/70 hover:text-white/90 hover:bg-[#1E1E2E]'}`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1">{label}</span>
              {count > 0 && (
                <span className="px-2 py-0.5 rounded-full text-xs bg-white/[0.05]">
                  {count}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Custom Folders Section */}
        <div className="p-4 border-t border-white/[0.05]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-white/70">Folders</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsCreatingFolder(true)}
              className="p-1.5 rounded-lg text-white/50 hover:text-white/70 hover:bg-white/[0.05] transition-colors"
            >
              <FiPlus className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Folder Creation Form */}
          <AnimatePresence>
            {isCreatingFolder && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mb-3"
              >
                <form onSubmit={handleCreateFolder}>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
                      <FiFolder className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={newFolderName}
                      onChange={(e) => setNewFolderName(e.target.value)}
                      placeholder="New folder name"
                      className="w-full pl-10 pr-20 py-2 bg-[#0A0A0F]/50 border border-white/10 rounded-lg
                               text-sm text-white/90 placeholder-white/30
                               focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/20
                               transition-all duration-200"
                      autoFocus
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                          setIsCreatingFolder(false);
                          setNewFolderName('');
                        }}
                        className="p-1.5 rounded-md text-white/40 hover:text-white/60 hover:bg-white/10"
                      >
                        <FiX className="w-3.5 h-3.5" />
                      </motion.button>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={!newFolderName.trim()}
                        className={`p-1.5 rounded-md transition-colors duration-200
                                  ${newFolderName.trim()
                                    ? 'text-violet-400 hover:text-violet-300 hover:bg-violet-400/10'
                                    : 'text-white/20 cursor-not-allowed'}`}
                      >
                        <FiCheck className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Folders List */}
          <div className="space-y-1">
            <AnimatePresence>
              {folders && folders.map(folder => {
                const folderNoteCount = notes.filter(note =>
                  note.folder_id === folder.id && !note.is_deleted
                ).length;

                return (
                  <motion.div
                    key={folder.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to={`/dashboard/folders/${folder.id}`}
                      className={`group flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200
                        ${location.pathname === `/dashboard/folders/${folder.id}`
                          ? 'bg-[#2A2A3A] text-violet-400 border border-violet-500/20'
                          : 'text-white/70 hover:text-white/90 hover:bg-[#1E1E2E]'}`}
                    >
                      <FiFolder className="w-4 h-4" />
                      <span className="flex-1 truncate">{folder.name}</span>
                      {folderNoteCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-xs bg-white/[0.05] group-hover:bg-white/10">
                          {folderNoteCount}
                        </span>
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {folders?.length === 0 && !isCreatingFolder && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-4"
            >
              <p className="text-sm text-white/40">No folders yet</p>
              <button
                onClick={() => setIsCreatingFolder(true)}
                className="mt-2 text-sm text-violet-400 hover:text-violet-300 transition-colors"
              >
                Create your first folder
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
