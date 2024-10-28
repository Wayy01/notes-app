import { supabase } from '@/lib/supabase';

class NotesService {
  constructor() {
    this.supabase = supabase;
  }

  async getAllNotes(userId) {
    const { data, error } = await this.supabase
      .from('notes')
      .select('*')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async createNote(noteData) {
    const { data, error } = await this.supabase
      .from('notes')
      .insert([{
        ...noteData,
        is_favorite: false,
        is_archived: false,
        is_deleted: false
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateNote(noteId, updates) {
    const { data, error } = await this.supabase
      .from('notes')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', noteId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteNote(noteId) {
    const { error } = await this.supabase
      .from('notes')
      .delete()
      .eq('id', noteId);

    if (error) throw error;
    return true;
  }

  async getNotesByFolder(folderId) {
    const { data, error } = await this.supabase
      .from('notes')
      .select('*')
      .eq('folder_id', folderId)
      .order('updated_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  async moveToTrash(noteId) {
    return this.updateNote(noteId, { is_deleted: true });
  }

  async restoreFromTrash(noteId) {
    return this.updateNote(noteId, { is_deleted: false });
  }

  async toggleFavorite(noteId, isFavorite) {
    return this.updateNote(noteId, { is_favorite: isFavorite });
  }

  async toggleArchive(noteId, isArchived) {
    return this.updateNote(noteId, { is_archived: isArchived });
  }
}

export const notesService = new NotesService();
