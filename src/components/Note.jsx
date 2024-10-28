import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { FiStar, FiTrash2, FiArchive, FiMove, FiEdit2, FiShare2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '@/contexts/NotesContext';

const Note = ({
  note,
  onEdit,
  onDelete,
  onToggleFavorite,
  onArchive
}) => {
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPos, setContextMenuPos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const { updateNote, moveToTrash, deleteNotePermanently } = useNotes();

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({
      show: true,
      x: e.clientX,
      y: e.clientY
    });
  };

  const handleDoubleClick = () => {
    navigate(`/dashboard/notes/${note.id}`);
  };

  const getNoteMenuItems = () => [
    {
      icon: <FiEdit2 className="w-4 h-4" />,
      label: 'Edit',
      onClick: () => onEdit(note),
    },
    {
      icon: <FiStar className="w-4 h-4" />,
      label: note.is_favorite ? 'Remove from Favorites' : 'Add to Favorites',
      onClick: () => onToggleFavorite(note.id),
      divider: true,
    },
    {
      icon: <FiArchive className="w-4 h-4" />,
      label: 'Archive',
      onClick: () => onArchive(note.id),
    },
    {
      icon: <FiShare2 className="w-4 h-4" />,
      label: 'Share',
      onClick: () => {/* Implement share */},
      divider: true,
    },
    {
      icon: <FiTrash2 className="w-4 h-4" />,
      label: 'Delete',
      onClick: () => setShowDeleteDialog(true),
      danger: true,
    },
  ];

  return (
    <>
      <motion.div
        onContextMenu={handleContextMenu}
        onDoubleClick={handleDoubleClick}
        className={`h-full bg-[--bg-secondary] rounded-lg p-4 border
                ${isDragging
                  ? 'border-violet-500 shadow-lg shadow-violet-500/20'
                  : 'border-white/10 hover:border-violet-500/50'}
                transition-colors duration-200 cursor-pointer group relative`}
      >
        {/* Drag Handle */}
        <div
          {...dragHandleProps}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100
                   transition-opacity duration-200 cursor-move z-10"
        >
          <FiMove className="w-4 h-4 text-white/50" />
        </div>

        {/* Note Content */}
        <div
          className="space-y-2"
          onClick={() => !isDragging && onEdit(note)}
        >
          <h3 className="font-medium text-lg text-white/90">
            {note.title || 'Untitled'}
          </h3>
          <p className="text-sm text-white/70 line-clamp-3">
            {note.content || 'No content'}
          </p>
        </div>

        {/* Note Footer */}
        <div className="mt-4 flex items-center justify-between text-xs text-white/50">
          <time dateTime={note.updated_at}>
            {formatDistanceToNow(new Date(note.updated_at), { addSuffix: true })}
          </time>

          {/* Actions */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100
                        transition-opacity duration-200"
               onClick={e => e.stopPropagation()}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleAction(e, onToggleFavorite)}
              className={`p-1.5 rounded-full hover:bg-white/5 transition-colors
                       ${note.is_favorite ? 'text-violet-400' : 'text-white/50'}`}
            >
              <FiStar className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleAction(e, onArchive)}
              className="p-1.5 rounded-full hover:bg-white/5 transition-colors"
            >
              <FiArchive className="w-4 h-4" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => handleAction(e, onDelete)}
              className="p-1.5 rounded-full hover:bg-white/5 transition-colors
                       hover:text-red-400"
            >
              <FiTrash2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <ContextMenu
        isOpen={contextMenu.show}
        x={contextMenu.x}
        y={contextMenu.y}
        items={getNoteMenuItems()}
        onClose={() => setContextMenu({ show: false, x: 0, y: 0 })}
      />

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={() => onDelete(note.id)}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        type="danger"
      />

      <NoteContextMenu
        isOpen={showContextMenu}
        onClose={() => setShowContextMenu(false)}
        x={contextMenuPos.x}
        y={contextMenuPos.y}
        note={note}
        onEdit={() => {/* Implement edit */}}
        onDelete={() => note.is_deleted ? deleteNotePermanently(note.id) : moveToTrash(note.id)}
        onToggleFavorite={() => updateNote(note.id, { is_favorite: !note.is_favorite })}
        onArchive={() => updateNote(note.id, { is_archived: !note.is_archived })}
      />
    </>
  );
};

export default Note;
