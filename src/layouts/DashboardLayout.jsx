import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiFolder, FiStar, FiArchive, FiTrash2, FiInbox } from 'react-icons/fi';
import { useNavigate, useLocation } from 'react-router-dom';
import NavItem from '@/components/NavItem';
import NewFolderButton from '@/components/NewFolderButton';
import FoldersList from '@/components/FoldersList';
import { useNotes } from '@/contexts/NotesContext';
import UserMenu from '@/components/UserMenu';
import NotesGrid from '@/components/NotesGrid';
import NotePreview from '@/components/NotePreview';
import MobileSidebar from '@/components/MobileSidebar';

const DashboardLayout = () => {
  const [selectedNote, setSelectedNote] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { notes, folders } = useNotes();

  // System folders configuration
  const systemFolders = [
    { id: 'inbox', icon: FiInbox, label: 'Inbox', path: '/dashboard/inbox' },
    { id: 'favorites', icon: FiStar, label: 'Favorites', path: '/dashboard/favorites' },
    { id: 'archive', icon: FiArchive, label: 'Archive', path: '/dashboard/archive' },
    { id: 'trash', icon: FiTrash2, label: 'Trash', path: '/dashboard/trash' }
  ];

  const getFilter = () => {
    const path = location.pathname;
    if (path.includes('/inbox')) return 'inbox';
    if (path.includes('/favorites')) return 'favorites';
    if (path.includes('/archive')) return 'archive';
    if (path.includes('/trash')) return 'trash';
    if (path.includes('/folders')) return 'folder';
    return 'all';
  };

  const filter = getFilter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSelectedNote(null);
  }, [location.pathname]);

  // Handle sidebar opening
  const handleSidebarOpen = () => {
    setIsNavOpen(false); // Close navigation when sidebar opens
  };

  return (
    <div className="h-screen flex flex-col bg-[--bg-primary]">
      {/* Remove the header since we'll integrate UserMenu into sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-64 border-r border-white/10 flex-shrink-0 hidden lg:flex flex-col bg-[--bg-secondary]">
          {/* User Menu at top of sidebar */}
          <div className="p-4 border-b border-white/10">
            <UserMenu />
          </div>

          {/* New Note Button */}
          <div className="p-4">
            <button
              onClick={() => navigate('/dashboard/new')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2
                       bg-violet-500 hover:bg-violet-600 rounded-lg transition-colors"
            >
              <FiPlus />
              <span>New Note</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-2">
            {/* System Folders */}
            <div className="space-y-1">
              {systemFolders.map((folder) => (
                <NavItem
                  key={folder.id}
                  icon={<folder.icon className="w-4 h-4" />}
                  label={folder.label}
                  active={location.pathname === folder.path}
                  onClick={() => navigate(folder.path)}
                  count={
                    notes?.filter(note => {
                      if (folder.id === 'inbox') return !note.is_deleted && !note.is_archived && !note.folder_id;
                      if (folder.id === 'favorites') return note.is_favorite && !note.is_deleted;
                      if (folder.id === 'archive') return note.is_archived && !note.is_deleted;
                      if (folder.id === 'trash') return note.is_deleted;
                      return false;
                    }).length
                  }
                />
              ))}
            </div>

            {/* Folders Section */}
            <div className="mt-8">
              <div className="flex items-center justify-between px-3 mb-2">
                <h2 className="text-sm font-medium text-white/50">Folders</h2>
                <NewFolderButton />
              </div>
              <FoldersList />
            </div>
          </nav>
        </aside>

        {/* Mobile Sidebar */}
        <MobileSidebar
          onCreateNote={() => navigate('/dashboard/new')}
          onSidebarOpen={handleSidebarOpen}
        />

        {/* Main Content */}
        <div className={`
          flex-1 flex ${isMobile ? 'flex-col' : 'flex-row'}
          overflow-hidden bg-[--bg-primary]
        `}>
          {/* Notes Grid */}
          <div className={`
            ${isMobile ? 'flex-1' : 'w-1/2'}
            overflow-y-auto
          `}>
            <NotesGrid
              filter={filter}
              onNoteSelect={setSelectedNote}
              selectedNoteId={selectedNote?.id}
            />
          </div>

          {/* Note Preview */}
          <div className={`
            ${isMobile ? 'h-[300px] border-t' : 'w-1/2'}
            border-white/10 flex-shrink-0
          `}>
            <NotePreview
              note={selectedNote}
              isMobile={isMobile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
