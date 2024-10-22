import React, { useEffect, useRef, useState } from 'react';

const NoteEditor = ({ note, onSave }) => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [activeStyles, setActiveStyles] = useState({});

  useEffect(() => {
    if (titleRef.current) titleRef.current.textContent = note.title;
    if (contentRef.current) contentRef.current.innerHTML = note.styledContent;
  }, [note]);

  const handleTitleBlur = () => {
    if (titleRef.current) {
      onSave({ title: titleRef.current.textContent });
    }
  };

  const handleContentBlur = () => {
    if (contentRef.current) {
      onSave({ styledContent: contentRef.current.innerHTML });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertHTML', false, '&emsp;');
    }
  };

  const handleSelectAll = (e) => {
    if (e.ctrlKey && e.key === 'a') {
      e.preventDefault();
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(e.target);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const execCommand = (command, arg = null) => {
    document.execCommand(command, false, arg);
    contentRef.current.focus();
    updateActiveStyles();
  };

  const updateActiveStyles = () => {
    setActiveStyles({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
      strikeThrough: document.queryCommandState('strikeThrough'),
      justifyLeft: document.queryCommandState('justifyLeft'),
      justifyCenter: document.queryCommandState('justifyCenter'),
      justifyRight: document.queryCommandState('justifyRight'),
      insertOrderedList: document.queryCommandState('insertOrderedList'),
      insertUnorderedList: document.queryCommandState('insertUnorderedList'),
    });
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      updateActiveStyles();
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

  const ToolbarButton = ({ command, arg, children }) => (
    <button
      onClick={() => execCommand(command, arg)}
      className={`toolbar-btn ${activeStyles[command] ? 'active' : ''}`}
    >
      {children}
    </button>
  );

  return (
    <div className="note-editor h-full flex flex-col">
      <div className="toolbar hidden md:flex text-white border-b border-gray-600 gap-2 p-2 overflow-x-auto bg-[var(--base-color)] sticky top-0 z-10">
        <ToolbarButton command="bold">B</ToolbarButton>
        <ToolbarButton command="italic">I</ToolbarButton>
        <ToolbarButton command="underline">U</ToolbarButton>
        <ToolbarButton command="strikeThrough">S</ToolbarButton>
        <ToolbarButton command="justifyLeft">Left</ToolbarButton>
        <ToolbarButton command="justifyCenter">Center</ToolbarButton>
        <ToolbarButton command="justifyRight">Right</ToolbarButton>
        <ToolbarButton command="insertOrderedList">OL</ToolbarButton>
        <ToolbarButton command="insertUnorderedList">UL</ToolbarButton>
        <ToolbarButton command="fontSize" arg="5">H1</ToolbarButton>
        <ToolbarButton command="fontSize" arg="3">H3</ToolbarButton>
        <button onClick={() => execCommand('removeFormat')} className="toolbar-btn">Clear</button>
      </div>
      <h2
        ref={titleRef}
        contentEditable
        onBlur={handleTitleBlur}
        onKeyDown={handleSelectAll}
        className="note-title outline-none text-2xl font-bold text-white mb-4 px-4 md:px-0 mt-4 md:mt-0"
      />
      <div
        ref={contentRef}
        contentEditable
        onBlur={handleContentBlur}
        onKeyDown={(e) => {
          handleKeyDown(e);
          handleSelectAll(e);
        }}
        onMouseUp={updateActiveStyles}
        onKeyUp={updateActiveStyles}
        className="note-content-editable flex-grow w-full resize-none outline-none text-white whitespace-pre-wrap overflow-y-auto px-4 md:px-0 pb-20 md:pb-4"
      />
      <div className="toolbar md:hidden fixed bottom-0 left-0 right-0 text-white border-t border-gray-600 flex gap-2 p-2 overflow-x-auto bg-[var(--base-color)]">
        <ToolbarButton command="bold">B</ToolbarButton>
        <ToolbarButton command="italic">I</ToolbarButton>
        <ToolbarButton command="underline">U</ToolbarButton>
        <ToolbarButton command="strikeThrough">S</ToolbarButton>
        <ToolbarButton command="justifyLeft">Left</ToolbarButton>
        <ToolbarButton command="justifyCenter">Center</ToolbarButton>
        <ToolbarButton command="justifyRight">Right</ToolbarButton>
        <ToolbarButton command="insertOrderedList">OL</ToolbarButton>
        <ToolbarButton command="insertUnorderedList">UL</ToolbarButton>
        <ToolbarButton command="fontSize" arg="5">H1</ToolbarButton>
        <ToolbarButton command="fontSize" arg="3">H3</ToolbarButton>
        <button onClick={() => execCommand('removeFormat')} className="toolbar-btn">Clear</button>
      </div>
    </div>
  );
};

export default NoteEditor;
