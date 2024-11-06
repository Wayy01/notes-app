import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';

const NotesContext = createContext();

export function NotesProvider({ children }) {
  const [folders, setFolders] = useState([]);
  const [notes, setNotes] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const [activeView, setActiveView] = useState('all');
  const { user, reauthenticateUser } = useAuth();

  // Add handleFolderClick function
  const handleFolderClick = (folderId) => {
    setActiveFolder(folderId);
    setActiveView('folder');
  };

  // Add clearActiveFolder function
  const clearActiveFolder = () => {
    setActiveFolder(null);
    setActiveView('all');
  };

  // Fetch notes when user changes
  useEffect(() => {
    const fetchNotes = async () => {
      if (!user) return;

      try {
        const { data: fetchedNotes, error } = await supabase
          .from('notes')
          .select('*')
          .eq('user_id', user.id)
          .order('updated_at', { ascending: false });

        if (error) throw error;

        console.log('Fetched notes:', fetchedNotes);
        setNotes(fetchedNotes || []);
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast.error('Failed to load notes');
      }
    };

    fetchNotes();
  }, [user]);

  // Fetch folders when user changes
  useEffect(() => {
    const fetchFolders = async () => {
      if (!user) return;

      try {
        const { data: fetchedFolders, error } = await supabase
          .from('folders')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: true });

        if (error) throw error;

        setFolders(fetchedFolders || []);
      } catch (error) {
        console.error('Error fetching folders:', error);
        toast.error('Failed to load folders');
      }
    };

    fetchFolders();
  }, [user]);

  const createFolder = async (name) => {
    if (!user) return;

    try {
      const { data: newFolder, error } = await supabase
        .from('folders')
        .insert([{
          name,
          user_id: user.id,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      setFolders(prev => [...prev, newFolder]);
      toast.success('Folder created');
      return newFolder;
    } catch (error) {
      console.error('Error creating folder:', error);
      toast.error('Failed to create folder');
      throw error;
    }
  };

  const deleteFolder = async (folderId) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('folders')
        .delete()
        .eq('id', folderId);

      if (error) throw error;

      setFolders(prev => prev.filter(folder => folder.id !== folderId));
      if (activeFolder === folderId) {
        clearActiveFolder();
      }
      toast.success('Folder deleted');
    } catch (error) {
      console.error('Error deleting folder:', error);
      toast.error('Failed to delete folder');
    }
  };

  const createNote = async (noteData) => {
    if (!user) return;

    try {
      const newNote = {
        user_id: user.id,
        title: noteData.title || 'Untitled',
        content: noteData.content || '',
        folder_id: noteData.folder_id || null,
        is_favorite: false,
        is_archived: false,
        is_deleted: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('notes')
        .insert([newNote])
        .select()
        .single();

      if (error) throw error;

      setNotes(prev => [data, ...prev]);
      toast.success('Note created successfully');
      return data;
    } catch (error) {
      console.error('Error creating note:', error);
      toast.error('Failed to create note');
      throw error;
    }
  };

  const updateNote = async (noteId, updates) => {
    if (!user) return;

    try {
      const { data: updatedNote, error } = await supabase
        .from('notes')
        .update(updates)
        .eq('id', noteId)
        .select()
        .single();

      if (error) throw error;

      setNotes(prev => prev.map(note =>
        note.id === noteId ? updatedNote : note
      ));

      return updatedNote;
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('Failed to update note');
      throw error;
    }
  };

  const moveToTrash = async (noteId) => {
    if (!user) return;

    try {
      const { data: updatedNote, error } = await supabase
        .from('notes')
        .update({
          is_deleted: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', noteId)
        .select()
        .single();

      if (error) throw error;

      setNotes(prev => prev.map(note =>
        note.id === noteId ? updatedNote : note
      ));
      toast.success('Note moved to trash');
      return updatedNote;
    } catch (error) {
      console.error('Error moving note to trash:', error);
      toast.error('Failed to move note to trash');
      throw error;
    }
  };

  const deleteNotePermanently = async (noteId) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);

      if (error) {
        if (error.message.includes('Invalid Refresh Token')) {
          await reauthenticateUser();
        }
        throw error;
      }

      setNotes(prev => prev.filter(note => note.id !== noteId));
      toast.success('Note deleted permanently');
    } catch (error) {
      console.error('Error deleting note permanently:', error);
      toast.error('Failed to delete note');
    }
  };

  const restoreFromTrash = async (noteId) => {
    if (!user) return;

    try {
      const { data: updatedNote, error } = await supabase
        .from('notes')
        .update({
          is_deleted: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', noteId)
        .select()
        .single();

      if (error) throw error;

      setNotes(prev => prev.map(note =>
        note.id === noteId ? updatedNote : note
      ));
      toast.success('Note restored from trash');
      return updatedNote;
    } catch (error) {
      console.error('Error restoring note:', error);
      toast.error('Failed to restore note');
      throw error;
    }
  };

  const getFilteredNotes = (folderId) => {
    if (!notes) return [];

    return notes.filter(note => {
      // If we're in a folder, only show notes from that folder that aren't deleted
      if (folderId) {
        return note.folder_id === folderId && !note.is_deleted;
      }

      // Default inbox view: show notes without a folder that aren't deleted
      return !note.folder_id && !note.is_deleted;
    });
  };

  const archiveNote = async (noteId) => {
    if (!user) return;

    try {
      const { data: updatedNote, error } = await supabase
        .from('notes')
        .update({
          is_archived: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', noteId)
        .select()
        .single();

      if (error) throw error;

      setNotes(prev => prev.map(note =>
        note.id === noteId ? updatedNote : note
      ));
      toast.success('Note archived');
      return updatedNote;
    } catch (error) {
      console.error('Error archiving note:', error);
      toast.error('Failed to archive note');
      throw error;
    }
  };

  const unarchiveNote = async (noteId) => {
    if (!user) return;

    try {
      const { data: updatedNote, error } = await supabase
        .from('notes')
        .update({
          is_archived: false,
          updated_at: new Date().toISOString()
        })
        .eq('id', noteId)
        .select()
        .single();

      if (error) throw error;

      setNotes(prev => prev.map(note =>
        note.id === noteId ? updatedNote : note
      ));
      toast.success('Note unarchived');
      return updatedNote;
    } catch (error) {
      console.error('Error unarchiving note:', error);
      toast.error('Failed to unarchive note');
      throw error;
    }
  };

  const handleNoteAction = async (noteId, action, value) => {
    try {
      let updates = {};

      switch (action) {
        case 'toggleFavorite':
          const note = notes.find(n => n.id === noteId);
          updates = { is_favorite: !note.is_favorite };
          break;
        case 'toggleArchive':
          const archiveNote = notes.find(n => n.id === noteId);
          updates = {
            is_archived: !archiveNote.is_archived,
            folder_id: null
          };
          break;
        case 'moveToFolder':
          updates = {
            folder_id: value || null,
            is_archived: false,
            is_deleted: false
          };
          break;
        case 'moveToTrash':
          updates = {
            is_deleted: true,
            folder_id: null
          };
          break;
      }

      const { data: updatedNote, error } = await supabase
        .from('notes')
        .update(updates)
        .eq('id', noteId)
        .select()
        .single();

      if (error) throw error;

      setNotes(prev => prev.map(note =>
        note.id === noteId ? updatedNote : note
      ));

      toast.success('Note updated successfully');
    } catch (error) {
      console.error('Error updating note:', error);
      toast.error('Failed to update note');
    }
  };

  useEffect(() => {
    console.log('Current notes state:', notes);
  }, [notes]);

  const value = {
    notes,
    folders,
    createNote,
    handleNoteAction,
    // ... other context values
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}

export const useNotes = () => useContext(NotesContext);
