import React, { useEffect, useState } from 'react';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Load notes from localStorage
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  useEffect(() => {
    // Save notes to localStorage whenever they change
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  const addNewNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'New Note',
      content: 'Type here...',
      styledContent: '<p>Type here...</p>',
      email: currentUser.email
    };
    setNotes(prevNotes => {
      const updatedNotes = [...prevNotes, newNote];
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const deleteNote = (noteId) => {
    setNotes(prevNotes => {
      const updatedNotes = prevNotes.filter(note => note.id !== noteId);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };


  const loadNoteContent = (noteId) => {
    const note = notes.find(note => note.id === noteId);
    if (note) {
      const mainContent = document.getElementById('mainContent');
      mainContent.innerHTML = `
        <div class="toolbar text-white border-b-[1px] border-b-gray-600">
          <button class="" onclick="document.execCommand('bold');" title="Bold">B</button>
          <button onclick="document.execCommand('italic');" title="Italic">I</button>
          <button onclick="document.execCommand('underline');" title="Underline">U</button>
          <button onclick="document.execCommand('strikeThrough');" title="Strike">S</button>
          <button onclick="document.execCommand('justifyLeft');" title="Align Left">Left</button>
          <button onclick="document.execCommand('justifyCenter');" title="Align Center">Center</button>
          <button onclick="document.execCommand('justifyRight');" title="Align Right">Right</button>
          <button onclick="document.execCommand('insertOrderedList')"; title="Ordered List">OL</button>
          <button onclick="document.execCommand('insertUnorderedList');" title="Unordered List">UL</button>
          <button onclick="document.execCommand('fontSize', false, '5');" title="Font Size 5">H1</button>
          <button onclick="document.execCommand('fontSize', false, '4');" title="Font Size 4">H2</button>
          <button onclick="document.execCommand('fontSize', false, '3');" title="Font Size 4">H3</button>
          <button onclick="document.execCommand('fontSize', false, '2');" title="Font Size 2">P</button>
          <button onclick="document.execCommand('fontName', false, 'Arial');" title="Font Arial">Arial</button>
          <button onclick="document.execCommand('fontName', false, 'Times New Roman');" title="Font Times New Roman">Times</button>
        </div>
        <div class="note-content w-full overflow-hidden text-wrap text-white">
          <h2 contenteditable="true" class="note-title outline-none text-2xl font-bold" data-note-id="${note.id}">${note.title}</h2>
          <div contenteditable="true" onKeyDown={handleKeyDown} class="note-content-editable mt-4 w-full h-full resize-none outline-none" data-note-id="${note.id}">${note.styledContent}</div>
        </div>
      `;
      const titleElement = mainContent.querySelector('.note-title');
      const contentElement = mainContent.querySelector('.note-content-editable');

      titleElement.addEventListener('input', () => {
        setNotes(prevNotes => {
          const updatedNotes = prevNotes.map(n =>
            n.id === note.id ? { ...n, title: titleElement.textContent } : n
          );
          localStorage.setItem('notes', JSON.stringify(updatedNotes));
          return updatedNotes;
        });
        updateNoteTitleInSidebar(noteId, titleElement.textContent);
      });

      contentElement.addEventListener('input', () => {
        setNotes(prevNotes => {
          const updatedNotes = prevNotes.map(n =>
            n.id === note.id ? { ...n, styledContent: contentElement.innerHTML } : n
          );
          localStorage.setItem('notes', JSON.stringify(updatedNotes));
          return updatedNotes;
        });
      });
    }
  };

  const updateNoteTitleInSidebar = (noteId, newTitle) => {
    const noteElement = document.querySelector(`[data-note-id="${noteId}"] .note-title`);
    if (noteElement) {
      noteElement.textContent = newTitle;
    }
  };

  const renderNotes = () => {
    const notesForCurrentUser = notes.filter(note => note.email === currentUser?.email);
    return notesForCurrentUser.map(note => (
      <li key={note.id} data-note-id={note.id} className="flex items-center justify-between  rounded-sm">
        <a href="#" className="flex-grow p-3 rounded transition-colors duration-300 text-white" onClick={() => loadNoteContent(note.id)}>
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
  };

  return (
    <div className="min-h-screen grid grid-cols-[auto_1fr] bg-[--MainColor]">
      <nav id="sidebar" className="h-screen w-[180px] p-5 bg-[var(--base-color)] border-r border-gray-600 sticky top-0 transition-all duration-300 overflow-hidden">
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
      <main id="mainContent" className="w-full h-full flex-col pl-10 pt-6 outline-none text-wrap">
      </main>
      <style jsx>{`
      .note-content-editable{
        ol,ul {
            padding-left: 40px;
        }
      }
        .toolbar {
          display: flex;
          gap: 10px;
          padding-bottom: 1rem;
        }
        .toolbar button {
          padding: 5px 10px;
          background-color: var(--base-color);
          color: var(--text-color);
          border: none;
          border-radius: 3px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .toolbar button:hover, .toolbar button:focus, .toolbar button:active {
          background-color: #2E2F2F;
        }
          ul {
    list-style: disc !important
}
ol {
    list-style: decimal !important
}

      `}</style>
    </div>
  );
};

export default NotesPage;
