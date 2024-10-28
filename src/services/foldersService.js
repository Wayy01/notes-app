import { supabase } from '@/lib/supabase';

class FoldersService {
  constructor() {
    this.supabase = supabase;
  }

  async getAllFolders(userId) {
    const { data, error } = await this.supabase
      .from('folders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  }

  async createFolder({ name, user_id }) {
    const { data, error } = await this.supabase
      .from('folders')
      .insert([
        {
          name,
          user_id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateFolder(id, updates) {
    const { data, error } = await this.supabase
      .from('folders')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async deleteFolder(folderId) {
    const { error } = await this.supabase
      .from('folders')
      .delete()
      .eq('id', folderId);

    if (error) throw error;
    return true;
  }
}

export const foldersService = new FoldersService();
