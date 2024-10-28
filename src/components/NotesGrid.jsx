import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiStar, FiMaximize2, FiFolder, FiEdit3, FiExternalLink, FiArchive, FiArrowLeft } from 'react-icons/fi';
import { formatDistanceToNow, format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '@/contexts/NotesContext';
import NoteContextMenu from './NoteContextMenu';

const NotesGrid = ({ filter }) => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [isMobilePreview, setIsMobilePreview] = useState(false);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const [contextNote, setContextNote] = useState(null);
  const navigate = useNavigate();
  const {
    notes,
    moveToTrash,
    deleteNotePermanently,
    restoreFromTrash,
    updateNote,
    archiveNote,
    unarchiveNote
  } = useNotes();
  const { folderId } = useParams();

  // Filter notes based on the current view
  const filteredNotes = useMemo(() => {
    if (!notes) return [];

    if (filter === 'inbox') {
      return notes.filter(note => !note.is_deleted && !note.is_archived && !note.folder_id);
    }
    if (filter === 'favorites') {
      return notes.filter(note => note.is_favorite && !note.is_deleted);
    }
    if (filter === 'archive') {
      return notes.filter(note => note.is_archived && !note.is_deleted);
    }
    if (filter === 'trash') {
      return notes.filter(note => note.is_deleted);
    }
    if (folderId) {
      return notes.filter(note => note.folder_id === folderId && !note.is_deleted);
    }
    return notes.filter(note => !note.is_deleted && !note.folder_id);
  }, [notes, filter, folderId]);

  console.log('Current notes:', notes);
  console.log('Filtered notes:', filteredNotes);
  console.log('Current filter:', filter);
  console.log('Current folderId:', folderId);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    // Only set mobile preview on small screens
    if (window.innerWidth < 1024) {
      setIsMobilePreview(true);
    }
  };

  const handleContextMenu = (e, note) => {
    e.preventDefault();
    setContextMenu({ show: true, x: e.pageX, y: e.pageY });
    setContextNote(note);
  };

  const handleDoubleClick = (note) => {
    navigate(`/dashboard/notes/${note.id}`);
  };

  const handleBackClick = () => {
    setIsMobilePreview(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden">
      {/* Notes List */}
      <div className={`
        w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-white/10
        overflow-y-auto bg-[--bg-primary]/80 backdrop-blur-lg
        shrink-0
        ${isMobilePreview ? 'hidden lg:block' : 'block'}
      `}>
        <div className="p-4 space-y-2">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-8 text-white/40">
              <p>No notes found</p>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onClick={() => handleNoteClick(note)}
                  onDoubleClick={() => handleDoubleClick(note)}
                  onContextMenu={(e) => handleContextMenu(e, note)}
                  className={`
                    p-3 rounded-lg cursor-pointer transition-all
                    backdrop-blur-md shadow-lg
                    ${selectedNote?.id === note.id
                      ? 'bg-violet-500/20 border-violet-500'
                      : 'hover:bg-white/5 bg-white/5'
                    }
                    ${note.is_deleted ? 'border-red-500/30' : 'border-transparent hover:border-white/10'}
                    border
                  `}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium text-white/90 truncate">
                      {note.title || 'Untitled'}
                    </h3>
                    {note.is_favorite && (
                      <FiStar className="w-4 h-4 text-violet-400 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-white/50 mt-1 line-clamp-2">
                    {note.content || 'No content'}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-white/40">
                    <FiClock className="w-3 h-3" />
                    <span>
                      {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      <div className={`
        flex-1 overflow-y-auto relative bg-[--bg-primary]
        ${isMobilePreview ? 'block' : 'hidden lg:block'}
      `}>
        {/* Mobile Back Button */}
        {isMobilePreview && (
          <div className="sticky top-0 left-0 right-0 z-30 p-4 bg-[--bg-primary] border-b border-white/10">
            <button
              onClick={handleBackClick}
              className="p-2 rounded-lg bg-[--bg-secondary] text-white/80 hover:text-white
                       border border-white/10 shadow-lg backdrop-blur-lg
                       flex items-center gap-2"
            >
              <FiArrowLeft size={20} />
              <span>Back to notes</span>
            </button>
          </div>
        )}

        <div className="p-4">
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
      </div>

      {/* Context Menu */}
      <NoteContextMenu
        isOpen={contextMenu.show}
        x={contextMenu.x}
        y={contextMenu.y}
        note={contextNote}
        onClose={() => setContextMenu({ show: false, x: 0, y: 0 })}
        onDelete={(noteId) => {
          if (contextNote?.is_deleted) {
            deleteNotePermanently(noteId);
          } else {
            moveToTrash(noteId);
          }
          setIsMobilePreview(false);
        }}
        onToggleFavorite={(noteId) =>
          updateNote(noteId, { is_favorite: !contextNote?.is_favorite })
        }
        onRestore={restoreFromTrash}
      />
    </div>
  );
};

export default NotesGrid;
