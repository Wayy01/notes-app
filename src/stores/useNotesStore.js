import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

const useNotesStore = create((set, get) => ({
  notes: [],
  folders: [],
  selectedNoteId: null,
  selectedFolderId: null,
  isLoading: false,
  error: null,

  checkAuth: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      toast.error('Please sign in to access your notes');
      return false;
    }
    return true;
  },

  initializeRootFolders: async () => {
    if (!await get().checkAuth()) return;

    const { data: { session } } = await supabase.auth.getSession();
    const userId = session.user.id;

    const rootFolders = [
      { name: 'All Notes', icon: 'FiInbox', is_root: true },
      { name: 'Favorites', icon: 'FiStar', is_root: true },
      { name: 'Archived', icon: 'FiArchive', is_root: true },
      { name: 'Trash', icon: 'FiTrash2', is_root: true }
    ];

    try {
      const { data: existingFolders, error: fetchError } = await supabase
        .from('folders')
        .select('*')
        .eq('user_id', userId)
        .eq('is_root', true);

      if (fetchError) throw fetchError;

      if (!existingFolders?.length) {
        const foldersWithUserId = rootFolders.map(folder => ({
          ...folder,
          user_id: userId
        }));

        const { error: insertError } = await supabase
          .from('folders')
          .insert(foldersWithUserId);

        if (insertError) throw insertError;

        await get().fetchFolders();
      }
    } catch (error) {
      console.error('Error initializing root folders:', error);
      toast.error('Failed to initialize folders');
    }
  },

  fetchFolders: async () => {
    if (!await get().checkAuth()) return;

    set({ isLoading: true });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { data: folders, error } = await supabase
        .from('folders')
        .select('*')
        .eq('user_id', session.user.id)
        .order('is_root', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) throw error;
      set({ folders: folders || [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Failed to fetch folders');
    }
  },

  createFolder: async (name, parentId = null) => {
    if (!await get().checkAuth()) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { data: folder, error } = await supabase
        .from('folders')
        .insert([{
          name,
          parent_id: parentId,
          user_id: session.user.id
        }])
        .select()
        .single();

      if (error) throw error;

      set(state => ({ folders: [...state.folders, folder] }));
      toast.success('Folder created');
      return folder;
    } catch (error) {
      toast.error('Failed to create folder');
      set({ error: error.message });
      return null;
    }
  },

  createNote: async (folderId) => {
    if (!await get().checkAuth()) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { data: note, error } = await supabase
        .from('notes')
        .insert([{
          title: 'Untitled Note',
          content: '',
          folder_id: folderId,
          user_id: session.user.id
        }])
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        notes: [...state.notes, note],
        selectedNoteId: note.id
      }));

      toast.success('Note created');
      return note;
    } catch (error) {
      toast.error('Failed to create note');
      set({ error: error.message });
      return null;
    }
  },

  selectFolder: async (folderId) => {
    if (!await get().checkAuth()) return;

    set({ selectedFolderId: folderId, isLoading: true });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const { data: notes, error } = await supabase
        .from('notes')
        .select('*')
        .eq('folder_id', folderId)
        .eq('user_id', session.user.id)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      set({ notes: notes || [], isLoading: false });
    } catch (error) {
      set({ error: error.message, isLoading: false });
      toast.error('Failed to fetch notes');
    }
  },

  selectNote: (noteId) => {
    set({ selectedNoteId: noteId });
  },

  deleteFolder: async (folderId) => {
    if (!await get().checkAuth()) return;

    try {
      // First delete all notes in the folder
      const { error: notesError } = await supabase
        .from('notes')
        .delete()
        .eq('folder_id', folderId);

      if (notesError) throw notesError;

      // Then delete the folder
      const { error: folderError } = await supabase
        .from('folders')
        .delete()
        .eq('id', folderId);

      if (folderError) throw folderError;

      set(state => ({
        folders: state.folders.filter(f => f.id !== folderId),
        notes: state.notes.filter(n => n.folder_id !== folderId),
        selectedFolderId: state.selectedFolderId === folderId ? null : state.selectedFolderId,
        selectedNoteId: state.selectedNoteId
      }));

      toast.success('Folder deleted');
    } catch (error) {
      toast.error('Failed to delete folder');
      set({ error: error.message });
    }
  },

  renameFolder: async (folderId, newName) => {
    if (!await get().checkAuth()) return;

    try {
      const { data: folder, error } = await supabase
        .from('folders')
        .update({ name: newName })
        .eq('id', folderId)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        folders: state.folders.map(f =>
          f.id === folderId ? { ...f, name: newName } : f
        )
      }));

      toast.success('Folder renamed');
      return folder;
    } catch (error) {
      toast.error('Failed to rename folder');
      set({ error: error.message });
      return null;
    }
  },

  updateNote: async (noteId, updates) => {
    // Optimistically update the UI
    set(state => ({
      notes: state.notes.map(note =>
        note.id === noteId
          ? { ...note, ...updates, updated_at: new Date().toISOString() }
          : note
      )
    }));

    try {
      const { data: updatedNote, error } = await supabase
        .from('notes')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', noteId)
        .select()
        .single();

      if (error) throw error;

      // Update with server response if needed
      set(state => ({
        notes: state.notes.map(note =>
          note.id === noteId ? updatedNote : note
        )
      }));

      return updatedNote;
    } catch (error) {
      // Revert on error
      toast.error('Failed to save note');
      set(state => ({
        notes: state.notes.map(note =>
          note.id === noteId
            ? { ...note, ...state.notes.find(n => n.id === noteId) }
            : note
        )
      }));
      return null;
    }
  },

  deleteNote: async (noteId) => {
    if (!await get().checkAuth()) return;

    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);

      if (error) throw error;

      set(state => ({
        notes: state.notes.filter(n => n.id !== noteId),
        selectedNoteId: state.selectedNoteId === noteId ? null : state.selectedNoteId
      }));

      toast.success('Note deleted');
    } catch (error) {
      toast.error('Failed to delete note');
      set({ error: error.message });
    }
  },

  starNote: async (noteId) => {
    if (!await get().checkAuth()) return;

    try {
      const note = get().notes.find(n => n.id === noteId);
      const { data: updatedNote, error } = await supabase
        .from('notes')
        .update({ is_starred: !note.is_starred })
        .eq('id', noteId)
        .select()
        .single();

      if (error) throw error;

      set(state => ({
        notes: state.notes.map(n =>
          n.id === noteId ? { ...n, is_starred: !n.is_starred } : n
        )
      }));

      return updatedNote;
    } catch (error) {
      toast.error('Failed to update note');
      set({ error: error.message });
      return null;
    }
  }
}));

export default useNotesStore;
