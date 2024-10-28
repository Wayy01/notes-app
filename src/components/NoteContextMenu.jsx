import React from 'react';
import { FiEdit2, FiStar, FiArchive, FiTrash2, FiShare2, FiRefreshCw } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const NoteContextMenu = ({
  isOpen,
  x,
  y,
  note,
  onClose,
  onDelete,
  onToggleFavorite,
  onArchive,
  onUnarchive,
  onRestore
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed z-50 w-48 bg-[--bg-secondary] border border-white/10
                 rounded-lg shadow-lg py-1 text-sm text-white/70"
      style={{ top: y, left: x }}
    >
      {note.is_deleted ? (
        <>
          <button
            onClick={() => {
              onRestore(note.id);
              onClose();
            }}
            className="w-full px-4 py-2 text-left hover:bg-white/5
                     flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
          >
            <FiRefreshCw className="w-4 h-4" />
            Restore Note
          </button>
          <button
            onClick={() => {
              if (window.confirm('This action cannot be undone. Are you sure?')) {
                onDelete(note.id);
                onClose();
              }
            }}
            className="w-full px-4 py-2 text-left hover:bg-white/5
                     flex items-center gap-2 text-red-400 hover:text-red-300"
          >
            <FiTrash2 className="w-4 h-4" />
            Delete Permanently
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => {
              onToggleFavorite(note.id);
              onClose();
            }}
            className="w-full px-4 py-2 text-left hover:bg-white/5
                     flex items-center gap-2"
          >
            <FiStar className="w-4 h-4" />
            {note.is_favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>

          <button
            onClick={() => {
              note.is_archived ? onUnarchive(note.id) : onArchive(note.id);
              onClose();
            }}
            className="w-full px-4 py-2 text-left hover:bg-white/5
                     flex items-center gap-2"
          >
            <FiArchive className="w-4 h-4" />
            {note.is_archived ? 'Unarchive Note' : 'Archive Note'}
          </button>

          <button
            onClick={() => {
              onDelete(note.id);
              onClose();
            }}
            className="w-full px-4 py-2 text-left hover:bg-white/5
                     flex items-center gap-2 text-red-400 hover:text-red-300"
          >
            <FiTrash2 className="w-4 h-4" />
            Move to Trash
          </button>
        </>
      )}
    </motion.div>
  );
};

export default NoteContextMenu;
