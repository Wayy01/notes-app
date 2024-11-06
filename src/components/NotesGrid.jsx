import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { FiStar } from 'react-icons/fi';

const NotesGrid = ({ notes, onNoteSelect, selectedNoteId }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map(note => (
        <motion.div
          key={note.id}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNoteSelect(note)}
          className={`group relative p-4 rounded-xl cursor-pointer transition-all duration-200
            ${selectedNoteId === note.id
              ? 'bg-[#1E1E2E] border-violet-500/20 shadow-[0_0_24px_-4px_rgba(139,92,246,0.1)]'
              : 'bg-[#12121E]/50 hover:bg-[#16162A]/50 border-white/[0.02]'}
            border backdrop-blur-sm`}
        >
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.02] to-cyan-500/[0.02] rounded-xl" />
          </div>

          <div className="relative">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-medium text-white/80 group-hover:text-white/90 truncate">
                {note.title || 'Untitled'}
              </h3>
              {note.is_favorite && (
                <FiStar className="w-5 h-5 text-violet-400/70 group-hover:text-violet-400" />
              )}
            </div>
            <p className="text-sm text-white/40 group-hover:text-white/50 line-clamp-3 mb-4">
              {note.content || 'No content'}
            </p>
            <div className="text-xs text-white/30 group-hover:text-white/40">
              {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NotesGrid;
