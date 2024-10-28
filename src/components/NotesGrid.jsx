import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiStar, FiMaximize2, FiFolder, FiEdit3, FiExternalLink, FiArchive, FiArrowLeft, FiTrash2, FiChevronRight, FiPaperclip, FiMoreVertical, FiRefreshCw } from 'react-icons/fi';
import { formatDistanceToNow, format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { useNotes } from '@/contexts/NotesContext';
import NoteContextMenu from './NoteContextMenu';

const NotesGrid = ({ filter, onNoteSelect, selectedNoteId }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });
  const [contextNote, setContextNote] = useState(null);
  const [showFolders, setShowFolders] = useState(false);
  const menuRef = useRef(null); // Add this for click outside handling
  const navigate = useNavigate();
  const {
    notes,
    moveToTrash,
    deleteNotePermanently,
    restoreFromTrash,
    updateNote,
    archiveNote,
    unarchiveNote,
    folders
  } = useNotes();
  const { folderId } = useParams();

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close folders menu when context menu closes
  useEffect(() => {
    if (!contextMenu.show) {
      setShowFolders(false);
    }
  }, [contextMenu.show]);

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
    onNoteSelect(note);
  };

  const handleContextMenu = (e, note) => {
    e.preventDefault();
    setContextMenu({ show: true, x: e.clientX, y: e.clientY });
    setContextNote(note);
  };

  // Add long press handler for mobile
  const handleLongPress = (e, note) => {
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    setContextMenu({
      show: true,
      x: rect.left,
      y: rect.bottom
    });
    setContextNote(note);
  };

  const handleNoteDoubleClick = (note) => {
    navigate(`/dashboard/notes/${note.id}`);
  };

  const getNoteClassName = (note) => `
    bg-[--bg-secondary] p-3 rounded-lg border h-[160px]
    ${note.is_deleted ? 'border-red-500/50' : 'border-white/10 hover:border-white/20'}
    ${selectedNoteId === note.id ? 'border-violet-500' : ''}
    transition-colors cursor-pointer flex flex-col
    ${!isMobile ? 'hover-glow' : ''}
  `;

  // Click outside handler for desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setContextMenu({ show: false, x: 0, y: 0 });
        setShowFolders(false);
      }
    };

    if (contextMenu.show && !isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu.show, isMobile]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 auto-rows-fr">
      {isMobile ? (
        // Mobile version
        <>
          {filteredNotes.map((note) => (
            <div key={note.id} className="relative group">
              <div
                onClick={() => onNoteSelect(note)}
                className={getNoteClassName(note)}
              >
                {/* Note Header with Status Icons and Menu */}
                <div className="flex items-center justify-between gap-2 mb-2 flex-shrink-0">
                  <div className="flex items-center gap-2">
                    {note.is_favorite && <FiStar className="text-yellow-400 w-4 h-4" />}
                    {note.is_archived && <FiArchive className="text-blue-400 w-4 h-4" />}
                    {note.attachment && <FiPaperclip className="text-gray-400 w-4 h-4" />}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const rect = e.target.getBoundingClientRect();
                      setContextMenu({
                        show: true,
                        x: rect.left,
                        y: rect.bottom
                      });
                      setContextNote(note);
                    }}
                    className="p-1 hover:bg-white/5 rounded"
                  >
                    <FiMoreVertical className="w-4 h-4 text-white/50" />
                  </button>
                </div>

                {/* Note Content */}
                <div className="flex-1 overflow-hidden">
                  <h3 className="font-medium mb-2 truncate text-sm">
                    {note.title || 'Untitled'}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-3">
                    {note.content || 'No content'}
                  </p>
                </div>

                {/* Note Footer */}
                <div className="pt-3 flex items-center justify-between text-xs text-white/50 flex-shrink-0">
                  <span>{format(new Date(note.updated_at), 'MMM d, yyyy')}</span>
                  {note.folder_id && <span className="text-violet-400">In Folder</span>}
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        // Desktop version
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              layout="position"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="relative group"
            >
              <div
                onClick={() => onNoteSelect(note)}
                onContextMenu={(e) => handleContextMenu(e, note)}
                className={getNoteClassName(note)}
              >
                {/* Same content structure as mobile */}
                <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                  {note.is_favorite && <FiStar className="text-yellow-400 w-4 h-4" />}
                  {note.is_archived && <FiArchive className="text-blue-400 w-4 h-4" />}
                  {note.attachment && <FiPaperclip className="text-gray-400 w-4 h-4" />}
                </div>

                <div className="flex-1 overflow-hidden">
                  <h3 className="font-medium mb-2 truncate text-sm">
                    {note.title || 'Untitled'}
                  </h3>
                  <p className="text-xs text-white/70 line-clamp-3">
                    {note.content || 'No content'}
                  </p>
                </div>

                <div className="pt-3 flex items-center justify-between text-xs text-white/50 flex-shrink-0">
                  <span>{format(new Date(note.updated_at), 'MMM d, yyyy')}</span>
                  {note.folder_id && <span className="text-violet-400">In Folder</span>}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu.show && contextNote && (
          <>
            {/* Backdrop for mobile */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setContextMenu({ show: false, x: 0, y: 0 })}
              />
            )}

            <motion.div
              ref={menuRef}
              className={`
                fixed z-50 bg-[--bg-secondary] border border-white/10
                rounded-lg shadow-lg
                ${isMobile ? 'bottom-0 left-0 right-0 rounded-t-xl' : 'w-48'}
              `}
              style={isMobile ? {} : {
                top: contextMenu.y,
                left: contextMenu.x
              }}
              {...(isMobile ? {
                initial: { y: "100%" },
                animate: { y: 0 },
                exit: { y: "100%" },
                transition: { type: "spring", damping: 25, stiffness: 300 },
                drag: "y",
                dragConstraints: { top: 0 },
                dragElastic: 0.2,
                onDragEnd: (e, { offset, velocity }) => {
                  if (offset.y > 50 || velocity.y > 500) {
                    setContextMenu({ show: false, x: 0, y: 0 });
                  }
                }
              } : {
                initial: { scale: 0.8, opacity: 0 },
                animate: { scale: 1, opacity: 1 },
                exit: { scale: 0.8, opacity: 0 },
                transition: { duration: 0.15 }
              })}
            >
              {/* Mobile Header with drag handle */}
              {isMobile && (
                <motion.div
                  className="px-4 py-3 border-b border-white/10 cursor-grab active:cursor-grabbing"
                  onTouchStart={(e) => e.preventDefault()}
                >
                  <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-3" />
                  <h3 className="font-medium">Note Options</h3>
                </motion.div>
              )}

              {/* Menu Items */}
              <div className={isMobile ? 'p-2 space-y-1' : ''}>
                {/* Favorite Toggle */}
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    updateNote(contextNote.id, { is_favorite: !contextNote.is_favorite });
                    setContextMenu({ show: false, x: 0, y: 0 });
                  }}
                  className={`
                    w-full px-4 py-2 text-left flex items-center gap-2
                    rounded-lg transition-colors
                    ${contextNote.is_favorite ? 'text-yellow-400' : 'text-white/70'}
                  `}
                >
                  <FiStar className="w-4 h-4" />
                  {contextNote.is_favorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </motion.button>

                {/* Archive Toggle */}
                <motion.button
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    updateNote(contextNote.id, { is_archived: !contextNote.is_archived });
                    setContextMenu({ show: false, x: 0, y: 0 });
                  }}
                  className={`
                    w-full px-4 py-2 text-left flex items-center gap-2
                    rounded-lg transition-colors
                    ${contextNote.is_archived ? 'text-blue-400' : 'text-white/70'}
                  `}
                >
                  <FiArchive className="w-4 h-4" />
                  {contextNote.is_archived ? 'Unarchive' : 'Archive'}
                </motion.button>

                {/* Move to Folder */}
                <div className="relative">
                  <button
                    onClick={() => setShowFolders(!showFolders)}
                    className={`
                      w-full px-4 py-2 text-left hover:bg-white/5
                      flex items-center justify-between rounded-lg
                      ${showFolders ? 'bg-white/5' : ''}
                    `}
                  >
                    <span className="flex items-center gap-2">
                      <FiFolder className="w-4 h-4" />
                      Move to Folder
                    </span>
                    <FiChevronRight className={`
                      w-4 h-4 transition-transform
                      ${showFolders ? 'rotate-90' : ''}
                    `} />
                  </button>

                  {/* Folders Submenu */}
                  {showFolders && (
                    <div className={`
                      ${isMobile
                        ? 'mt-1 mx-2 bg-white/5 rounded-lg'
                        : 'absolute top-0 left-full ml-2 w-48 bg-[--bg-secondary] border border-white/10 rounded-lg shadow-lg'
                      }
                    `}>
                      {folders.map(folder => (
                        <button
                          key={folder.id}
                          onClick={() => {
                            updateNote(contextNote.id, { folder_id: folder.id });
                            setContextMenu({ show: false, x: 0, y: 0 });
                            setShowFolders(false);
                          }}
                          className="w-full px-4 py-2 text-left hover:bg-white/5
                                   flex items-center gap-2 rounded-lg"
                        >
                          <FiFolder className="w-4 h-4" />
                          <span className="truncate">{folder.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {!contextNote.is_deleted && (
                  <>
                    {/* Divider */}
                    <div className={`
                      border-t border-white/10
                      ${isMobile ? 'my-2' : 'my-1'}
                    `} />

                    {/* Move to Trash */}
                    <button
                      onClick={() => {
                        moveToTrash(contextNote.id);
                        setContextMenu({ show: false, x: 0, y: 0 });
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-white/5
                               text-red-400 flex items-center gap-2 rounded-lg"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      Move to Trash
                    </button>
                  </>
                )}

                {contextNote.is_deleted && (
                  <>
                    {/* Divider */}
                    <div className={`
                      border-t border-white/10
                      ${isMobile ? 'my-2' : 'my-1'}
                    `} />

                    {/* Restore */}
                    <button
                      onClick={() => {
                        restoreFromTrash(contextNote.id);
                        setContextMenu({ show: false, x: 0, y: 0 });
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-white/5
                               text-emerald-400 flex items-center gap-2 rounded-lg"
                    >
                      <FiRefreshCw className="w-4 h-4" />
                      Restore Note
                    </button>

                    {/* Delete Permanently */}
                    <button
                      onClick={() => {
                        deleteNotePermanently(contextNote.id);
                        setContextMenu({ show: false, x: 0, y: 0 });
                      }}
                      className="w-full px-4 py-2 text-left hover:bg-white/5
                               text-red-400 flex items-center gap-2 rounded-lg"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      Delete Permanently
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Safe Area */}
              {isMobile && <div className="h-6" />}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Note Preview Modal for Mobile */}
      {isMobile && selectedNoteId && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedNoteId(null)}
        >
          <div
            className="bg-[--bg-secondary] w-full max-w-md rounded-lg p-4"
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">{selectedNoteId.title || 'Untitled'}</h2>
            <p className="text-white/70">{selectedNoteId.content || 'No content'}</p>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => navigate(`/dashboard/notes/${selectedNoteId.id}`)}
                className="px-4 py-2 bg-violet-500 rounded-lg text-white"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Separate component for context menu items
const ContextMenuItems = ({ note, onClose, isMobile }) => {
  const { folders } = useNotes();

  return (
    <>
      <button className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2">
        <FiStar className="w-4 h-4" />
        {note.is_favorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
      <button className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center gap-2">
        <FiArchive className="w-4 h-4" />
        {note.is_archived ? 'Unarchive' : 'Archive'}
      </button>
      <div className="border-t border-white/10 my-1" />
      {folders.length > 0 && (
        <div className="relative group">
          <button className="w-full px-4 py-2 text-left hover:bg-white/5 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiFolder className="w-4 h-4" />
              Move to Folder
            </span>
            <FiChevronRight className="w-4 h-4" />
          </button>
          {/* Folder submenu */}
        </div>
      )}
      <div className="border-t border-white/10 my-1" />
      <button className="w-full px-4 py-2 text-left hover:bg-white/5 text-red-400 flex items-center gap-2">
        <FiTrash2 className="w-4 h-4" />
        {note.is_deleted ? 'Delete Permanently' : 'Move to Trash'}
      </button>
    </>
  );
};

export default NotesGrid;
