import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NotesSidebar from '@/components/NotesSidebar';
import NoteEditor from '@/components/NoteEditor';
import { FiEdit3, FiPlus } from 'react-icons/fi';
import useNotesStore from '@/stores/useNotesStore';

const Dashboard = () => {
  const {
    notes,
    selectedNoteId,
    selectedFolderId,
    createNote,
    updateNote,
    deleteNote,
    starNote,
    selectNote
  } = useNotesStore();

  const selectedNote = notes.find(note => note.id === selectedNoteId);

  const handleNoteChange = useCallback((noteId, updates) => {
    if (noteId) {
      updateNote(noteId, updates);
    }
  }, [updateNote]);

  const handleCreateNote = useCallback(async () => {
    if (selectedFolderId) {
      await createNote(selectedFolderId);
    }
  }, [selectedFolderId, createNote]);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <NotesSidebar onCreateNote={handleCreateNote} />

      <main className="flex-1 overflow-hidden bg-[--bg-primary]">
        <AnimatePresence mode="wait">
          {selectedNote ? (
            <NoteEditor
              key={selectedNote.id}
              note={selectedNote}
              onUpdate={handleNoteChange}
              onDelete={deleteNote}
              onStar={starNote}
            />
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center p-6"
            >
              <FiEdit3 className="w-16 h-16 text-white/20 mb-4" />
              <h2 className="text-2xl font-bold text-white/90 mb-2">No Note Selected</h2>
              <p className="text-white/50 mb-6">
                Select a note from the sidebar or create a new one to get started
              </p>
              <button
                onClick={handleCreateNote}
                disabled={!selectedFolderId}
                className="flex items-center gap-2 px-4 py-2 bg-violet-500
                         hover:bg-violet-600 disabled:opacity-50
                         disabled:hover:bg-violet-500 rounded-lg
                         text-white transition-colors"
              >
                <FiPlus />
                Create Note
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
