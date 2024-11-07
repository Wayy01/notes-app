import React, { useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Highlight from '@tiptap/extension-highlight';
import { motion } from 'framer-motion';
import {
  FiSave,
  FiClock,
  FiMoreVertical,
  FiTrash2,
  FiStar,
  FiShare2,
  FiBold,
  FiItalic,
  FiList,
  FiCode
} from 'react-icons/fi';
import { format as formatDate } from 'date-fns';
import { Menu } from '@headlessui/react';
import { useDebounce } from '@/hooks/useDebounce';

function NoteEditor({ note, onUpdate, onDelete, onStar }) {
  const debouncedUpdate = useDebounce((updates) => {
    onUpdate(note.id, updates);
  }, 1000);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing...',
      }),
      Highlight,
    ],
    content: note.content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      debouncedUpdate({ content: html });
    },
  });

  const handleTitleChange = useCallback((e) => {
    const newTitle = e.target.value;
    debouncedUpdate({ title: newTitle });
  }, [debouncedUpdate]);

  if (!note) return null;

  const lastUpdated = formatDate(new Date(note.updated_at), 'MMM d, yyyy h:mm a');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col bg-[--bg-primary]"
    >
      {/* Editor Header */}
      <div className="border-b border-white/10 bg-[--bg-secondary]">
        <div className="p-4 flex items-center justify-between">
          <div className="flex-1">
            <input
              type="text"
              value={note.title}
              onChange={handleTitleChange}
              className="w-full bg-transparent text-xl font-medium text-white/90
                       focus:outline-none focus:ring-1 focus:ring-violet-500/30
                       rounded-md px-2 py-1"
              placeholder="Untitled Note"
            />
            <div className="flex items-center gap-2 mt-2 text-xs text-white/50">
              <FiClock className="w-3 h-3" />
              <span>Last updated: {lastUpdated}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onStar(note.id)}
              className={`p-2 rounded-lg hover:bg-white/[0.08] transition-colors
                       ${note.is_starred ? 'text-yellow-400' : 'text-white/50'}`}
            >
              <FiStar className="w-4 h-4" />
            </button>

            <Menu as="div" className="relative">
              <Menu.Button
                className="p-2 rounded-lg hover:bg-white/[0.08] text-white/50
                         hover:text-white/90 transition-colors"
              >
                <FiMoreVertical className="w-4 h-4" />
              </Menu.Button>
              <Menu.Items
                className="absolute right-0 mt-1 w-48 rounded-lg bg-[#1E1E2D]
                        border border-white/10 shadow-lg focus:outline-none z-50"
              >
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onDelete(note.id)}
                      className={`${
                        active ? 'bg-white/[0.08]' : ''
                      } group flex w-full items-center px-4 py-2.5 text-sm text-red-400`}
                    >
                      <FiTrash2 className="w-4 h-4 mr-2" />
                      Delete Note
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        {/* Editor Toolbar */}
        <div className="px-4 py-2 border-t border-white/10 flex gap-1">
          <button
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-white/[0.08] transition-colors
                     ${editor?.isActive('bold') ? 'text-white' : 'text-white/50'}`}
          >
            <FiBold className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-white/[0.08] transition-colors
                     ${editor?.isActive('italic') ? 'text-white' : 'text-white/50'}`}
          >
            <FiItalic className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-white/[0.08] transition-colors
                     ${editor?.isActive('bulletList') ? 'text-white' : 'text-white/50'}`}
          >
            <FiList className="w-4 h-4" />
          </button>
          <button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded hover:bg-white/[0.08] transition-colors
                     ${editor?.isActive('codeBlock') ? 'text-white' : 'text-white/50'}`}
          >
            <FiCode className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 p-4 overflow-auto">
        <EditorContent
          editor={editor}
          className="prose prose-invert max-w-none h-full"
        />
      </div>
    </motion.div>
  );
}

export default NoteEditor;
