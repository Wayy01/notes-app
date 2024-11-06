const handleCreateNote = async () => {
  try {
    const newNote = await createNote({
      title: newNoteTitle,
      folder_id: currentFolderId, // Make sure this is passed
    });
    // ... rest of the handler
  } catch (error) {
    console.error('Error creating note:', error);
  }
};
