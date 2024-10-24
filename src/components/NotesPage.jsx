import React, { useEffect, useState, useCallback } from 'react';
import { createClient } from '@supabase/supabase-js';
import NoteEditor from './NoteEditor';
import { HiMenu, HiX } from 'react-icons/hi'; // Make sure to install react-icons


const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const fetchNotes = useCallback(async (email) => {
    try {
      const { data, error } = await supabase
        .from('notes-table')
        .select('*')
        .eq('email', email);

      if (error) throw error;
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error.message);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;

        if (session?.user) {
          setCurrentUser(session.user);
          sessionStorage.setItem('currentUser', JSON.stringify(session.user));
          await fetchNotes(session.user.email);
        } else {
          setCurrentUser(null);
          sessionStorage.removeItem('currentUser');
        }
      } catch (error) {
        console.error('Error fetching user session:', error.message);
      }
    };

    fetchUser();
  }, [fetchNotes]);

  const addNewNote = async () => {
    if (!currentUser) {
      console.error('No user logged in');
      return;
    }

    const newNote = {
      title: 'New Note',
      styledContent: '<p>Type here...</p>',
      email: currentUser.email
    };

    try {
      const { data, error } = await supabase
        .from('notes-table')
        .insert([newNote])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setNotes(prevNotes => [...prevNotes, data[0]]);
        loadNoteContent(data[0].id);  // Load the new note content immediately
      } else {
        console.error('No data returned after inserting new note');
      }
    } catch (error) {
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const { error } = await supabase
        .from('notes-table')
        .delete()
        .eq('id', noteId);

      if (error) throw error;

      setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
    } catch (error) {
      console.error('Error deleting note:', error.message);
    }
  };

  const saveNote = async (noteId, updatedFields) => {
    try {
      const { error } = await supabase
        .from('notes-table')
        .update(updatedFields)
        .eq('id', noteId);

      if (error) throw error;

      setNotes(prevNotes => prevNotes.map(note =>
        note.id === noteId ? { ...note, ...updatedFields } : note
      ));
    } catch (error) {
      console.error('Error saving note:', error.message);
    }
  };

  const handleNoteSelect = (noteId) => {
    const note = notes.find(note => note.id === noteId);
    setSelectedNote(note);
  };

  const renderNotes = useCallback(() => {
    return notes.map(note => (
      <li key={note.id} data-note-id={note.id} className="flex items-center justify-between rounded-sm">
        <a href="#" className="flex-grow p-3 rounded transition-colors duration-300 text-white" onClick={() => handleNoteSelect(note.id)}>
          <span className="note-title">{note.title}</span>
        </a>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteNote(note.id);
          }}
          className="text-red-500 hover:text-red-700 mr-2"
        >
          ✕
        </button>
      </li>
    ));
  }, [notes, deleteNote]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen h-full grid grid-cols-1 md:grid-cols-[auto_1fr] bg-[--MainColor] overflow-hidden">
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-[var(--base-color)] p-2 rounded-full"
      >
        {isSidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>
      <nav
        id="sidebar"
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed md:sticky top-0 left-0 h-screen w-64 md:w-[180px] p-5 bg-[var(--base-color)] border-r border-gray-600 transition-transform duration-300 z-40 overflow-y-auto`}
      >
        <div className="flex justify-start mb-4">
          <span className="font-semibold text-2xl logo text-white">Notes App</span>
        </div>
        <ul className="list-none" id="noteList">
          <li className="first-element mb-4">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-[5px] text-md px-5 py-2.5 text-center flex w-full items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={addNewNote}
            >
              New note
            </button>
          </li>
          {renderNotes()}
        </ul>
      </nav>
      <main
        id="mainContent"
        className="w-full h-screen md:overflow-y-auto flex flex-col outline-none"
      >
        {selectedNote && (
          <NoteEditor
            note={selectedNote}
            onSave={(updatedFields) => saveNote(selectedNote.id, updatedFields)}
          />
        )}
      </main>
    </div>
  );
};

export default NotesPage;
