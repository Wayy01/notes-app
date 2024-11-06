import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useNotes } from '@/contexts/NotesContext';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import NotesGrid from '@/components/NotesGrid';
import NotePreview from '@/components/NotePreview';
import EmptyNoteScreen from '@/components/EmptyNoteScreen';
import MobileSidebar from '@/components/MobileSidebar';
import { FiPlus, FiMenu, FiX } from 'react-icons/fi';

const DashboardLayout = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { createNote, notes } = useNotes();
  const [showDialog, setShowDialog] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setSelectedNote(null);
  }, [location.pathname]);

  const handleCreateNote = async () => {
    if (!newNoteTitle.trim()) {
      toast.error('Please enter a title');
      return;
    }

    try {
      await createNote({
        title: newNoteTitle.trim(),
        content: '',
      });

      setNewNoteTitle('');
      setShowDialog(false);
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note');
    }
  };

  return (
    <div className="h-screen flex bg-[#0A0A14] text-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)]
                      bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />

        {/* Ambient Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] animate-pulse delay-1000" />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        initial={false}
        animate={{
          x: isSidebarOpen ? 0 : -280,
          width: isSidebarOpen ? 280 : 0
        }}
        className="fixed lg:relative lg:block h-full bg-[#12121E]/95 border-r border-white/[0.05]
                  backdrop-blur-xl z-50 lg:translate-x-0 lg:w-[280px]"
      >
        <MobileSidebar
          onCreateNote={() => setShowDialog(true)}
          onClose={() => setIsSidebarOpen(false)}
          isSidebarOpen={isSidebarOpen}
        />
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <header className="bg-[#12121E]/80 border-b border-white/[0.02] backdrop-blur-xl p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 text-white/70 hover:text-white/90 hover:bg-white/[0.05] rounded-lg"
              >
                <FiMenu className="w-6 h-6" />
              </motion.button>
              <h1 className="text-xl font-medium text-white/80">
                Dashboard
              </h1>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDialog(true)}
              className="group relative px-4 py-2 bg-[#1E1E2E] hover:bg-[#2A2A3A]
                        border border-white/[0.05] rounded-lg overflow-hidden transition-colors duration-200"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 blur-xl" />
              </div>
              <span className="relative flex items-center gap-2 text-white/70 group-hover:text-white/90">
                <FiPlus className="w-5 h-5" />
                Create Note
              </span>
            </motion.button>
          </div>
        </header>

        {/* Content Area with Responsive Grid */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Notes Grid */}
          <div className="flex-1 overflow-auto bg-[#0C0C16]/50 p-4 lg:p-6">
            <div className="max-w-7xl mx-auto">
              {notes && notes.length > 0 ? (
                <NotesGrid
                  onNoteSelect={setSelectedNote}
                  selectedNoteId={selectedNote?.id}
                  notes={notes}
                />
              ) : (
                <EmptyNoteScreen onNewNote={() => setShowDialog(true)} />
              )}
            </div>
          </div>

          {/* Note Preview - Hidden on mobile unless note is selected */}
          {selectedNote && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="fixed inset-0 lg:relative lg:w-1/3 bg-[#12121E]/95 backdrop-blur-xl
                        border-l border-white/[0.02] z-30 lg:z-0"
            >
              <div className="flex lg:hidden justify-end p-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedNote(null)}
                  className="p-2 text-white/70 hover:text-white/90 hover:bg-white/[0.05] rounded-lg"
                >
                  <FiX className="w-6 h-6" />
                </motion.button>
              </div>
              <NotePreview note={selectedNote} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Create Note Dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-[#12121E]/95 border border-white/[0.05] p-6 rounded-xl w-[400px]
                        shadow-[0_0_32px_-4px_rgba(139,92,246,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.02] to-cyan-500/[0.02] rounded-xl" />
              <div className="relative">
                <h2 className="text-xl font-medium text-white/90 mb-4">Create New Note</h2>
                <input
                  type="text"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Note title"
                  className="w-full p-3 rounded-lg bg-[#0A0A14] border border-white/[0.05]
                           focus:border-violet-500/30 focus:ring-1 focus:ring-violet-500/20
                           outline-none mb-4 text-white/90 placeholder-white/20"
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setShowDialog(false);
                      setNewNoteTitle('');
                    }}
                    className="px-4 py-2 text-sm text-white/50 hover:text-white/70 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCreateNote}
                    className="px-4 py-2 bg-[#1E1E2E] hover:bg-[#2A2A3A]
                             border border-white/[0.05] rounded-lg text-white/90
                             transition-colors duration-200"
                  >
                    Create
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardLayout;
