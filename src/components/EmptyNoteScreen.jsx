import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiFileText } from 'react-icons/fi';

const EmptyNoteScreen = ({ onNewNote }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col items-center justify-center h-full text-center p-8 space-y-6 bg-[#0B1221]/50 rounded-lg border border-gray-800/40"
    >
      <FiFileText className="w-16 h-16 text-violet-500/70" />

      <h2 className="text-2xl font-semibold text-gray-100">
        Welcome to Your Notes
      </h2>

      <p className="text-gray-400 max-w-md">
        You haven't created any notes yet. Click the button below to create your first note and start organizing your thoughts.
      </p>

      <button
        onClick={onNewNote}
        className="flex items-center gap-2 px-6 py-3 bg-violet-600/90 hover:bg-violet-600 text-white font-medium rounded-md transition-colors duration-200"
      >
        <FiPlus className="w-5 h-5" />
        Create Your First Note
      </button>
    </motion.div>
  );
};

export default EmptyNoteScreen;
