import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFolder, FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import { useNotes } from '@/contexts/NotesContext';

const FoldersList = ({ onFolderClick }) => {
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const [selectedFolder, setSelectedFolder] = useState(null);
  const { folders, deleteFolder } = useNotes();
  const location = useLocation();

  const handleContextMenu = (e, folder) => {
    e.preventDefault();
    setContextMenu({ show: true, x: e.clientX, y: e.clientY });
    setSelectedFolder(folder);
  };

  const handleClickOutside = () => {
    setContextMenu({ show: false, x: 0, y: 0 });
    setSelectedFolder(null);
  };

  useEffect(() => {
    if (contextMenu.show) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [contextMenu.show]);

  return (
    <div className="space-y-1">
      {folders.map((folder) => (
        <button
          key={folder.id}
          onClick={() => onFolderClick(folder.id)}
          onContextMenu={(e) => handleContextMenu(e, folder)}
          className={`
            w-full flex items-center px-3 py-2 rounded-lg text-sm
            ${location.pathname === `/dashboard/folders/${folder.id}`
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
              : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
            }
            transition-all duration-200
          `}
        >
          <FiFolder className="w-4 h-4 mr-2" />
          <span className="truncate">{folder.name}</span>
        </button>
      ))}

      {/* Context Menu */}
      {contextMenu.show && selectedFolder && (
        <div
          className="fixed z-50 w-48 bg-[--bg-secondary] border border-white/10
                   rounded-lg shadow-lg py-1 text-sm text-white/70"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            onClick={() => {
              deleteFolder(selectedFolder.id);
              setContextMenu({ show: false, x: 0, y: 0 });
            }}
            className="w-full px-4 py-2 text-left hover:bg-white/5 text-red-400
                     hover:text-red-300 transition-colors flex items-center gap-2"
          >
            <FiTrash2 className="w-4 h-4" />
            Delete Folder
          </button>
        </div>
      )}
    </div>
  );
};

export default FoldersList;
