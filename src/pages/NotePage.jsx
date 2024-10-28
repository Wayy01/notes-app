import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotes } from '@/contexts/NotesContext';
import { FiArrowLeft, FiStar, FiTrash2, FiArchive } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const NotePage = () => {
  const { noteId } = useParams();
  const navigate = useNavigate();
  const { notes, updateNote, moveToTrash, deleteNotePermanently } = useNotes();
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const currentNote = notes.find(n => n.id === noteId);
    if (currentNote) {
      setNote(currentNote);
      setTitle(currentNote.title || '');
      setContent(currentNote.content || '');
    }
  }, [noteId, notes]);

  const handleSave = async () => {
    try {
      await updateNote(noteId, {
        title: title.trim() || 'Untitled',
        content,
        updated_at: new Date().toISOString()
      });
      toast.success('Note saved');
    } catch (error) {
      console.error('Error saving note:', error);
      toast.error('Failed to save note');
    }
  };

  // Auto-save when title or content changes
  useEffect(() => {
    if (note && (title !== note.title || content !== note.content)) {
      const timeoutId = setTimeout(handleSave, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [title, content]);

  if (!note) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[--bg-primary] border-b border-white/10">
        <div className="p-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => updateNote(note.id, { is_favorite: !note.is_favorite })}
              className={`p-2 rounded-lg transition-colors
                       ${note.is_favorite ? 'text-violet-400' : 'text-white/50 hover:text-white/70'}`}
            >
              <FiStar className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => updateNote(note.id, { is_deleted: !note.is_deleted })}
              className={`p-2 rounded-lg transition-colors
                       ${note.is_deleted ? 'text-blue-400' : 'text-white/50 hover:text-white/70'}`}
            >
              <FiArchive className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (note.is_deleted) {
                  deleteNotePermanently(note.id);
                } else {
                  moveToTrash(note.id);
                }
                navigate(-1);
              }}
              className="p-2 text-red-400 hover:text-red-300 rounded-lg transition-colors"
            >
              <FiTrash2 className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Note Content */}
      <div className="flex-1 p-4 space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Untitled"
          className="w-full bg-transparent text-2xl font-semibold text-white/90
                   placeholder:text-white/30 focus:outline-none"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing..."
          className="w-full h-[calc(100vh-250px)] bg-transparent text-white/70
                   placeholder:text-white/30 focus:outline-none resize-none"
        />
      </div>
    </div>
  );
};

export default NotePage;
