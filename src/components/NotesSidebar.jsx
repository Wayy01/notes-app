import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiFolder,
  FiPlus,
  FiChevronRight,
  FiFile,
  FiX,
  FiFolderPlus,
  FiInbox,
  FiStar,
  FiArchive,
  FiTrash2
} from 'react-icons/fi';
import useNotesStore from '@/stores/useNotesStore';
import { useAuth } from '@/contexts/AuthContext';

function NotesSidebar({ onCreateNote }) {
  const { user } = useAuth();
  const {
    folders,
    notes,
    fetchFolders,
    createFolder,
    deleteFolder,
    renameFolder,
    selectedFolderId,
    selectedNoteId,
    selectFolder,
    selectNote,
    isLoading
  } = useNotesStore();

  const [expandedFolder, setExpandedFolder] = useState(null);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    fetchFolders();
  }, [fetchFolders]);

  const handleCreateFolder = async (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const folder = await createFolder(newFolderName);
    if (folder) {
      setNewFolderName('');
      setIsCreatingFolder(false);
      setExpandedFolder(folder.id);
    }
  };

  const handleFolderSelect = (folderId) => {
    selectFolder(folderId);
  };

  const handleFolderToggle = (folderId) => {
    setExpandedFolder(prev => (prev === folderId ? null : folderId));
  };

  const rootFolders = folders.filter(f => f.is_root);
  const userFolders = folders.filter(f => !f.is_root);

  return (
    <div className="w-72 h-full bg-[#0F0F13] flex flex-col border-r border-white/[0.08]">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-cabinet-grotesk font-bold text-white/90">Notes</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCreatingFolder(true)}
              className="p-1.5 rounded-lg hover:bg-white/[0.08] text-white/70
                       hover:text-white/90 transition-all duration-200"
            >
              <FiFolderPlus size={17} />
            </button>
            <button
              onClick={onCreateNote}
              className="p-1.5 rounded-lg hover:bg-white/[0.08] text-white/70
                       hover:text-white/90 transition-all duration-200"
              disabled={!selectedFolderId}
            >
              <FiPlus size={17} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-2">
        <AnimatePresence>
          {isCreatingFolder && (
            <motion.form
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleCreateFolder}
              className="mt-3 mb-2"
            >
              <div className="relative">
                <input
                  type="text"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="New Folder"
                  className="w-full p-2 pr-8 bg-white/[0.05] border border-white/[0.08]
                         rounded-lg text-white/90 text-sm focus:outline-none
                         focus:border-purple-400/30 placeholder-white/30
                         font-cabinet-grotesk"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsCreatingFolder(false)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1
                         text-white/40 hover:text-white/90
                         rounded-md hover:bg-white/[0.08] transition-all duration-200"
                >
                  <FiX size={14} />
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="space-y-0.5">
          {rootFolders.map(folder => (
            <FolderItem
              key={folder.id}
              folder={folder}
              notes={notes.filter(note => note.folder_id === folder.id)}
              isExpanded={expandedFolder === folder.id}
              isSelected={selectedFolderId === folder.id}
              selectedNoteId={selectedNoteId}
              onSelect={handleFolderSelect}
              onToggle={handleFolderToggle}
              onSelectNote={selectNote}
            />
          ))}
        </div>

        {userFolders.length > 0 && (
          <div className="mt-4 space-y-0.5">
            <div className="px-2 py-2 text-xs font-medium text-white/40">
              FOLDERS
            </div>
            {userFolders.map(folder => (
              <FolderItem
                key={folder.id}
                folder={folder}
                notes={notes.filter(note => note.folder_id === folder.id)}
                isExpanded={expandedFolder === folder.id}
                isSelected={selectedFolderId === folder.id}
                selectedNoteId={selectedNoteId}
                onSelect={handleFolderSelect}
                onToggle={handleFolderToggle}
                onSelectNote={selectNote}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FolderItem({ folder, notes, isExpanded, isSelected, selectedNoteId, onSelect, onToggle, onSelectNote }) {
  const handleFolderClick = () => {
    onSelect(folder.id);
    onToggle(folder.id);
  };

  return (
    <div className="select-none">
      <div
        onClick={handleFolderClick}
        className={`flex items-center px-2 py-1.5 rounded-lg cursor-pointer
                   hover:bg-white/[0.04] transition-colors duration-150
                   ${isSelected ? 'text-white/90' : 'text-white/70'}`}
      >
        <div className="flex items-center gap-2">
          <motion.div
            initial={false}
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center"
          >
            <FiChevronRight
              className={`w-3.5 h-3.5 text-white/40
                       transition-colors duration-150
                       ${isExpanded ? 'text-white/60' : ''}`}
            />
          </motion.div>
          {getIconComponent(folder.icon)}
          <span className="text-sm font-medium">{folder.name}</span>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-9 py-1 space-y-0.5">
              {notes.map(note => (
                <div
                  key={note.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectNote(note.id);
                  }}
                  className={`flex items-center px-2 py-1.5 rounded-lg cursor-pointer
                             hover:bg-white/[0.04] transition-colors duration-150
                             ${selectedNoteId === note.id ? 'text-white/90' : 'text-white/70'}`}
                >
                  <FiFile size={14} className="mr-2" />
                  <span className="text-sm">{note.title || 'Untitled Note'}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getIconComponent(iconName) {
  const icons = {
    FiInbox: <FiInbox className="w-4 h-4 text-violet-400" />,
    FiStar: <FiStar className="w-4 h-4 text-yellow-400" />,
    FiArchive: <FiArchive className="w-4 h-4 text-blue-400" />,
    FiTrash2: <FiTrash2 className="w-4 h-4 text-red-400" />
  };
  return icons[iconName] || <FiFolder className="w-4 h-4 text-violet-400" />;
}

export default NotesSidebar;
