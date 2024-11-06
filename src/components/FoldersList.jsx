import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiPlus, FiFolder } from 'react-icons/fi';
import { useNotes } from '@/contexts/NotesContext';

const FoldersList = () => {
  const location = useLocation();
  const { folders, createFolder, notes } = useNotes();
  const [newFolderName, setNewFolderName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const handleAddFolder = () => {
    const folderName = prompt('Enter folder name');
    if (folderName && folderName.trim()) {
      createFolder(folderName.trim());
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-gray-400">Your Folders</h2>
        <button
          onClick={handleAddFolder}
          className="p-1 hover:bg-gray-700 rounded-lg transition-colors duration-200"
        >
          <FiPlus className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      <div className="space-y-1">
        {folders.map(folder => (
          <Link
            key={folder.id}
            to={`/dashboard/folders/${folder.id}`}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg
              ${
                location.pathname === `/dashboard/folders/${folder.id}`
                  ? 'bg-violet-500/20 text-violet-300'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }
              transition-colors duration-200
            `}
          >
            <FiFolder className="w-5 h-5" />
            {folder.name}
            <span className="ml-auto text-xs bg-gray-700 rounded-full px-2 py-0.5">
              {notes.filter(note => note.folder_id === folder.id && !note.is_deleted).length}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FoldersList;
