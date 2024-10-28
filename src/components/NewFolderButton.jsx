import React, { useState } from 'react';
import { FiPlus, FiFolder } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotes } from '@/contexts/NotesContext';
import { toast } from 'react-hot-toast';

const NewFolderButton = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [folderName, setFolderName] = useState('');
  const { createFolder } = useNotes();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!folderName.trim()) return;

    try {
      await createFolder(folderName.trim());
      setFolderName('');
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  return (
    <div className="relative">
      {!isCreating ? (
        <motion.button
          onClick={() => setIsCreating(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-3 py-1.5 text-sm
                   bg-violet-500/10 hover:bg-violet-500/20
                   text-violet-400 rounded-lg transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          New Folder
        </motion.button>
      ) : (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          onSubmit={handleSubmit}
          className="flex items-center gap-2 bg-[--bg-secondary]
                   border border-white/10 rounded-lg p-2 shadow-lg"
        >
          <FiFolder className="w-4 h-4 text-violet-400" />
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="Folder name"
            autoFocus
            className="flex-1 bg-transparent text-sm text-white/90
                     placeholder:text-white/30 focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setIsCreating(false);
                setFolderName('');
              }
            }}
            onBlur={() => {
              if (!folderName.trim()) {
                setIsCreating(false);
              }
            }}
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 rounded-md hover:bg-white/5
                     text-violet-400 transition-colors"
          >
            <FiPlus className="w-4 h-4" />
          </motion.button>
        </motion.form>
      )}
    </div>
  );
};

export default NewFolderButton;
