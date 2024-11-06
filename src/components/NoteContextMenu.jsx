import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiArchive, FiTrash2, FiFolder } from 'react-icons/fi';

const NoteContextMenu = ({ x, y, note, folders, onClose, onAction }) => {
  // Prevent the menu from going off-screen
  const menuRef = React.useRef(null);
  const [position, setPosition] = React.useState({ x, y });

  React.useEffect(() => {
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const newPosition = { x, y };

      if (rect.right > window.innerWidth) {
        newPosition.x = window.innerWidth - rect.width;
      }
      if (rect.bottom > window.innerHeight) {
        newPosition.y = window.innerHeight - rect.height;
      }

      setPosition(newPosition);
    }
  }, [x, y]);

  return (
    <motion.div
      ref={menuRef}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed z-[100] w-56 bg-[#1E1E2E] border border-white/10 rounded-lg
                 shadow-lg overflow-hidden backdrop-blur-xl"
      style={{
        left: position.x,
        top: position.y,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="py-1">
        <button
          onClick={() => onAction('toggleFavorite')}
          className="w-full px-3 py-2 flex items-center gap-2 text-sm text-white/70
                    hover:bg-white/5 hover:text-white/90 transition-colors"
        >
          <FiStar className={`w-4 h-4 ${note.is_favorite ? 'text-violet-400' : ''}`} />
          {note.is_favorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>

        <button
          onClick={() => onAction('toggleArchive')}
          className="w-full px-3 py-2 flex items-center gap-2 text-sm text-white/70
                    hover:bg-white/5 hover:text-white/90 transition-colors"
        >
          <FiArchive className={`w-4 h-4 ${note.is_archived ? 'text-violet-400' : ''}`} />
          {note.is_archived ? 'Unarchive' : 'Archive'}
        </button>

        {folders.length > 0 && (
          <>
            <div className="border-t border-white/5 my-1" />
            <div className="px-3 py-1">
              <p className="text-xs text-white/40">Move to folder</p>
            </div>
            <div className="max-h-48 overflow-y-auto">
              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => onAction('moveToFolder', folder.id)}
                  className="w-full px-3 py-2 flex items-center gap-2 text-sm text-white/70
                            hover:bg-white/5 hover:text-white/90 transition-colors"
                >
                  <FiFolder className="w-4 h-4" />
                  {folder.name}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="border-t border-white/5 my-1" />
        <button
          onClick={() => onAction('moveToTrash')}
          className="w-full px-3 py-2 flex items-center gap-2 text-sm text-red-400
                    hover:bg-red-500/10 transition-colors"
        >
          <FiTrash2 className="w-4 h-4" />
          Move to Trash
        </button>
      </div>
    </motion.div>
  );
};

export default NoteContextMenu;
