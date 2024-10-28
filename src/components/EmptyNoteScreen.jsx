import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiFileText } from 'react-icons/fi';

const EmptyNoteScreen = ({ onNewNote }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="col-span-full flex flex-col items-center justify-center
                 min-h-[400px] text-center p-8 rounded-xl border border-dashed
                 border-white/10 bg-[--bg-secondary]/50"
    >
      <div className="w-16 h-16 mb-6 rounded-full bg-violet-500/10
                    flex items-center justify-center">
        <FiFileText className="w-8 h-8 text-violet-400" />
      </div>

      <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-violet-400
                   to-fuchsia-400 bg-clip-text text-transparent">
        No Notes Yet
      </h2>

      <p className="text-gray-400 mb-6 max-w-sm">
        Create your first note to get started with organizing your thoughts.
      </p>

      <button
        onClick={onNewNote}
        className="flex items-center gap-2 px-4 py-2 bg-violet-600
                 hover:bg-violet-700 rounded-lg transition-colors duration-200"
      >
        <FiPlus className="w-5 h-5" />
        Create New Note
      </button>
    </motion.div>
  );
};

export default EmptyNoteScreen;
