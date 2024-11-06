import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNotes } from '@/contexts/NotesContext';

const NewFolderButton = ({ onCreateClick }) => {
  return (
    <motion.button
      onClick={onCreateClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-1.5 text-sm
                bg-violet-500/10 hover:bg-violet-500/20
                text-violet-400 rounded-lg transition-colors"
    >
      <FiPlus className="w-4 h-4" />
      New Folder
    </motion.button>
  );
};

export default NewFolderButton;
