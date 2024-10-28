import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const NoteModal = ({ isOpen, onClose, note, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave({ title, content });
      onClose();
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

          {/* Modal */}
          <div className="flex min-h-screen items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="relative w-full max-w-2xl rounded-lg bg-[--bg-secondary]
                       shadow-lg border border-white/10"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-1 text-white/50
                         hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-6">
                <Dialog.Title className="text-lg font-medium mb-4">
                  {note ? 'Edit Note' : 'Create Note'}
                </Dialog.Title>

                <div className="space-y-4">
                  {/* Title Input */}
                  <div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Note title"
                      className="w-full bg-[--bg-primary] border border-white/10
                               rounded-lg px-4 py-2 focus:outline-none
                               focus:border-violet-500 transition-colors"
                    />
                  </div>

                  {/* Content Textarea */}
                  <div>
                    <textarea
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your note..."
                      rows={8}
                      className="w-full bg-[--bg-primary] border border-white/10
                               rounded-lg px-4 py-2 focus:outline-none
                               focus:border-violet-500 transition-colors
                               resize-none"
                    />
                  </div>

                  {/* Updated Actions */}
                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 text-white/70 hover:text-white
                               transition-colors rounded-lg hover:bg-white/5"
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSaving}
                      className="px-4 py-2 bg-violet-600 hover:bg-violet-700
                             rounded-lg transition-colors relative"
                    >
                      {isSaving ? (
                        <>
                          <span className="opacity-0">Save Changes</span>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white/20
                                        border-t-white rounded-full animate-spin" />
                          </div>
                        </>
                      ) : (
                        note ? 'Save Changes' : 'Create Note'
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default NoteModal;
