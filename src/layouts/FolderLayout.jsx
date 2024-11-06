import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiStar } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { useNotes } from '@/contexts/NotesContext';
import NoteContextMenu from '@/components/NoteContextMenu';

const FolderLayout = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const navigate = useNavigate();
  const { folderId } = useParams();
  const { notes, folders } = useNotes();

  // Convert folderId to match the type in notes (likely UUID)
  const currentFolderId = folderId || null;

  // Filter notes for the current folder
  const folderNotes = useMemo(() => {
    return notes.filter(note => {
      // Debug log to check values
      console.log('Note:', {
        noteId: note.id,
        noteFolderId: note.folder_id,
        currentFolderId,
        isMatch: String(note.folder_id) === String(currentFolderId)
      });

      return String(note.folder_id) === String(currentFolderId) &&
             !note.is_deleted &&
             !note.is_archived;
    });
  }, [notes, currentFolderId]);

  // Get current folder details
  const currentFolder = folders.find(f => String(f.id) === String(currentFolderId));

  // Clear selected note when changing folders
  useEffect(() => {
    setSelectedNote(null);
  }, [currentFolderId]);

  const handleContextMenu = (e, note) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    setContextMenu({
      x: pageX,
      y: pageY,
      note
    });
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)]">
      {/* Notes List */}
      <div className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-white/10
                    overflow-y-auto bg-[--bg-primary]/80 backdrop-blur-lg">
        <div className="sticky top-0 p-4 bg-[--bg-primary] border-b border-white/10">
          <h1 className="text-lg font-semibold text-white">
            {currentFolder?.name || 'Folder'}
          </h1>
          <p className="text-sm text-white/50">
            {folderNotes.length} {folderNotes.length === 1 ? 'note' : 'notes'}
          </p>
        </div>

        <div className="p-4 space-y-2">
          <AnimatePresence mode="popLayout">
            {folderNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onClick={() => setSelectedNote(note)}
                onDoubleClick={() => navigate(`/dashboard/notes/${note.id}`)}
                onContextMenu={(e) => handleContextMenu(e, note)}
                className={`p-4 rounded-lg cursor-pointer
                          ${selectedNote?.id === note.id
                            ? 'bg-white/10'
                            : 'bg-white/[0.02] hover:bg-white/[0.05]'}
                          border border-white/[0.05] transition-colors`}
              >
                {/* Note content */}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-medium text-white/90">
                    {note.title || 'Untitled'}
                  </h3>
                  {note.is_favorite && (
                    <FiStar className="w-4 h-4 text-violet-400" />
                  )}
                </div>
                {/* ... rest of note content ... */}
              </motion.div>
            ))}
          </AnimatePresence>

          {folderNotes.length === 0 && (
            <div className="text-center py-8 text-white/40">
              <p>No notes in this folder</p>
            </div>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex-1 p-4 overflow-auto">
        {selectedNote ? (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-semibold text-white mb-4">
              {selectedNote.title || 'Untitled'}
            </h1>
            <div className="prose prose-invert">
              {selectedNote.content || 'No content'}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-white/40">
            Select a note to preview
          </div>
        )}
      </div>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu && (
          <NoteContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            note={contextMenu.note}
            folders={folders}
            onClose={() => setContextMenu(null)}
            onAction={(action, value) => {
              handleNoteAction(contextMenu.note.id, action, value);
              setContextMenu(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FolderLayout;
