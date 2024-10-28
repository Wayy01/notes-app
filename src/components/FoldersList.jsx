import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiFolder } from 'react-icons/fi';
import { useNotes } from '@/contexts/NotesContext';

const FoldersList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { folders, notes } = useNotes(); // Add notes from useNotes hook

  const getFolderCount = (folderId) => {
    return notes.filter(note =>
      note.folder_id === folderId && !note.is_deleted
    ).length;
  };

  return (
    <div className="space-y-1">
      {folders.map((folder) => (
        <button
          key={folder.id}
          onClick={() => navigate(`/dashboard/folders/${folder.id}`)}
          className={`
            w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm
            ${location.pathname === `/dashboard/folders/${folder.id}`
              ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
              : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
            }
            transition-all duration-200
          `}
        >
          <div className="flex items-center">
            <FiFolder className="w-4 h-4 mr-2" />
            <span className="truncate">{folder.name}</span>
          </div>
          <span className="text-xs text-white/50">{getFolderCount(folder.id)}</span>
        </button>
      ))}
    </div>
  );
};

export default FoldersList;
