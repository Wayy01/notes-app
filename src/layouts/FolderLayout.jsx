import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiStar } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '@/contexts/NotesContext';

const FolderLayout = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const navigate = useNavigate();
  const { folderId } = useParams();
  const { notes, folders } = useNotes();

  // Filter notes for the current folder
  const folderNotes = notes.filter(note => note.folder_id === folderId);
  const currentFolder = folders.find(f => f.id === folderId);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const handleNoteDoubleClick = (note) => {
    navigate(`/dashboard/notes/${note.id}`);
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
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={() => handleNoteClick(note)}
                onDoubleClick={() => handleNoteDoubleClick(note)}
                whileHover={{ x: 4, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`p-3 rounded-lg cursor-pointer transition-all
                         backdrop-blur-md shadow-lg
                         ${selectedNote?.id === note.id
                           ? 'bg-violet-500/20 border-violet-500 shadow-violet-500/20'
                           : 'hover:bg-white/5 bg-white/5'}
                         border border-transparent hover:border-white/10`}
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
    </div>
  );
};

export default FolderLayout;
