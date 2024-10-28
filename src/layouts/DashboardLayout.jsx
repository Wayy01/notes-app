import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiFolder, FiStar, FiArchive, FiTrash2, FiEdit3, FiX, FiMenu, FiArrowLeft, FiInbox } from 'react-icons/fi';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import NavItem from '@/components/NavItem';
import NewFolderButton from '@/components/NewFolderButton';
import FoldersList from '@/components/FoldersList'; // Update this import if needed
import { useNotes } from '@/contexts/NotesContext';
import { toast } from 'react-hot-toast';
import UserMenu from '@/components/UserMenu';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import MobileSidebar from '@/components/MobileSidebar';

const DashboardLayout = () => {
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { activeFolder, handleFolderClick } = useNotes();
  const { notes, createNote } = useNotes();
  const [counts, setCounts] = useState({
    inbox: 0,
    starred: 0,
    archive: 0,
    trash: 0
  });

  // Calculate counts whenever notes change
  useEffect(() => {
    if (!notes) return;

    const newCounts = {
      inbox: notes.filter(note => note.status === 'active').length,
      starred: notes.filter(note => note.is_favorite).length,
      archive: notes.filter(note => note.status === 'archived').length,
      trash: notes.filter(note => note.status === 'deleted').length
    };

    setCounts(newCounts);
  }, [notes]);

  const handleViewChange = (view) => {
    setActiveView(view);
    clearActiveFolder();
    navigate('/dashboard');
  };

  const handleCreateNote = async () => {
    try {
      const newNote = await createNote({
        title: 'Untitled',
        content: '',
        folder_id: activeFolder,
        is_favorite: false,
        is_deleted: false
      });

      if (newNote) {
        navigate(`/dashboard/notes/${newNote.id}`);
      }
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note');
    }
  };

  const mainNavItems = [
    {
      icon: <FiFolder className="w-5 h-5" />,
      label: 'All Notes',
      view: 'all',
      count: counts?.all || 0
    },
    {
      icon: <FiStar className="w-5 h-5" />,
      label: 'Favorites',
      view: 'favorites',
      count: counts?.favorites || 0
    },
    {
      icon: <FiArchive className="w-5 h-5" />,
      label: 'Archive',
      view: 'archived',
      count: counts?.archived || 0
    },
    {
      icon: <FiTrash2 className="w-5 h-5" />,
      label: 'Trash',
      view: 'trash',
      count: counts?.trash || 0
    }
  ];

  const isNoteOpen = location.pathname.includes('/notes/');

  // Update the systemFolders array
  const systemFolders = [
    { id: 'inbox', name: 'Inbox', icon: FiInbox, count: counts.inbox },
    { id: 'favorites', name: 'Favorites', icon: FiStar, count: counts.favorites }, // Changed from 'starred'
    { id: 'archive', name: 'Archive', icon: FiArchive, count: counts.archive },
    { id: 'trash', name: 'Trash', icon: FiTrash2, count: counts.trash }
  ];

  const handleSystemFolderClick = (folderId) => {
    navigate(`/dashboard/${folderId}`);
  };

  const handleFolderSelect = (folderId) => {
    handleFolderClick(folderId);
    navigate(`/dashboard/folders/${folderId}`);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r
                     border-white/10 bg-[--bg-secondary] shrink-0">
        {/* User Menu */}
        <div className="p-4 border-b border-white/10">
          <UserMenu />
        </div>

        {/* Scrollable Navigation Area */}
        <nav className="flex-1 overflow-y-auto">
          <div className="space-y-6 p-4">
            {/* New Note Button */}
            <div>
              <motion.button
                onClick={handleCreateNote}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-2 rounded-lg bg-violet-500
                         hover:bg-violet-600 text-white font-medium
                         transition-colors duration-200 flex items-center
                         justify-center gap-2"
              >
                <FiPlus className="w-5 h-5" />
                New Note
              </motion.button>
            </div>

            {/* System Folders */}
            <div>
              <h2 className="px-3 text-xs font-semibold text-white/40 uppercase mb-2">
                Important
              </h2>
              <div className="space-y-1">
                {systemFolders.map((folder) => {
                  const Icon = folder.icon;
                  return (
                    <button
                      key={folder.id}
                      onClick={() => handleSystemFolderClick(folder.id)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm
                        ${location.pathname === `/dashboard/${folder.id}`
                          ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30'
                          : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
                        }
                        transition-all duration-200
                      `}
                    >
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 mr-2" />
                        <span>{folder.name}</span>
                      </div>
                      {folder.count > 0 && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-white/10">
                          {folder.count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* User Folders */}
            <div>
              <div className="px-3 flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold text-white/40 uppercase">
                  Folders
                </h2>
                <NewFolderButton />
              </div>
              <FoldersList onFolderClick={handleFolderSelect} />
            </div>
          </div>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <MobileSidebar onCreateNote={handleCreateNote} />

      {/* Main Content */}
      <main className="flex-1 h-full overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
