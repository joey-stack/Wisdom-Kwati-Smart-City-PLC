'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function RichTextEditor({ value, onChange, placeholder = 'Write the full content of the article here...' }) {
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const isLocalChange = useRef(false);
  
  const [showFloatingMenu, setShowFloatingMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    h2: false,
    h3: false,
    h4: false,
    blockquote: false
  });

  // Sync external value updates (like initial Firestore load)
  useEffect(() => {
    if (editorRef.current && value !== undefined && value !== null) {
      if (!isLocalChange.current) {
        editorRef.current.innerHTML = value;
      }
      isLocalChange.current = false;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      isLocalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  // Run a document formatting command
  const executeCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    handleInput();
    updateActiveFormats();
  };

  // Format paragraph block types
  const formatBlock = (tag) => {
    // If we are already in this block format, toggle it back to paragraph (Normal)
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      let parent = selection.getRangeAt(0).commonAncestorContainer;
      if (parent.nodeType === 3) {
        parent = parent.parentNode;
      }
      
      const isCurrentlyTag = parent.closest(tag);
      if (isCurrentlyTag) {
        executeCommand('formatBlock', '<p>');
      } else {
        executeCommand('formatBlock', `<${tag}>`);
      }
    } else {
      executeCommand('formatBlock', `<${tag}>`);
    }
  };

  const updateActiveFormats = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    let parent = selection.getRangeAt(0).commonAncestorContainer;
    if (parent.nodeType === 3) {
      parent = parent.parentNode;
    }

    setActiveFormats({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      h2: !!parent.closest('h2'),
      h3: !!parent.closest('h3'),
      h4: !!parent.closest('h4'),
      blockquote: !!parent.closest('blockquote')
    });
  };

  const handleSelectionChange = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || selection.toString().trim() === '') {
      setShowFloatingMenu(false);
      return;
    }

    const range = selection.getRangeAt(0);
    const editorEl = editorRef.current;
    const containerEl = containerRef.current;

    if (editorEl && containerEl && editorEl.contains(range.commonAncestorContainer)) {
      const rect = range.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();

      // Position menu about 48px above the center of selection rect
      setMenuPosition({
        top: rect.top - containerRect.top - 52 + containerEl.scrollTop,
        left: rect.left - containerRect.left + (rect.width / 2) - 100 // Center the 200px menu
      });
      setShowFloatingMenu(true);
      updateActiveFormats();
    } else {
      setShowFloatingMenu(false);
    }
  };

  // Prevent losing selection on click of toolbar buttons
  const preventFocusLoss = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      ref={containerRef} 
      className="rich-text-editor-container" 
      style={{
        position: 'relative',
        border: '1px solid var(--admin-border)',
        borderRadius: '4px',
        backgroundColor: 'var(--admin-surface)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '350px'
      }}
    >
      {/* Top Toolbar */}
      <div 
        className="editor-toolbar" 
        style={{
          display: 'flex',
          gap: '8px',
          padding: '10px 16px',
          borderBottom: '1px solid var(--admin-border)',
          backgroundColor: 'var(--admin-surface-light)',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}
      >
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={() => formatBlock('h2')}
          style={{
            background: activeFormats.h2 ? 'rgba(187, 227, 57, 0.2)' : 'transparent',
            border: 'none',
            color: activeFormats.h2 ? 'var(--admin-accent)' : 'var(--admin-text-secondary)',
            fontWeight: 'bold',
            padding: '6px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={() => formatBlock('h3')}
          style={{
            background: activeFormats.h3 ? 'rgba(187, 227, 57, 0.2)' : 'transparent',
            border: 'none',
            color: activeFormats.h3 ? 'var(--admin-accent)' : 'var(--admin-text-secondary)',
            fontWeight: 'bold',
            padding: '6px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
          title="Heading 3"
        >
          H3
        </button>
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={() => formatBlock('h4')}
          style={{
            background: activeFormats.h4 ? 'rgba(187, 227, 57, 0.2)' : 'transparent',
            border: 'none',
            color: activeFormats.h4 ? 'var(--admin-accent)' : 'var(--admin-text-secondary)',
            fontWeight: 'bold',
            padding: '6px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
          title="Heading 4"
        >
          H4
        </button>
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={() => executeCommand('formatBlock', '<p>')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--admin-text-secondary)',
            padding: '6px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
          title="Normal Paragraph"
        >
          Normal
        </button>
        <span style={{ width: '1px', height: '18px', backgroundColor: 'var(--admin-border)', margin: '0 4px' }}></span>
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={() => executeCommand('bold')}
          style={{
            background: activeFormats.bold ? 'rgba(187, 227, 57, 0.2)' : 'transparent',
            border: 'none',
            color: activeFormats.bold ? 'var(--admin-accent)' : 'var(--admin-text-secondary)',
            fontWeight: 'bold',
            padding: '6px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
          title="Bold Selection"
        >
          B
        </button>
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={() => executeCommand('italic')}
          style={{
            background: activeFormats.italic ? 'rgba(187, 227, 57, 0.2)' : 'transparent',
            border: 'none',
            color: activeFormats.italic ? 'var(--admin-accent)' : 'var(--admin-text-secondary)',
            fontStyle: 'italic',
            padding: '6px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
          title="Italicize Selection"
        >
          I
        </button>
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={() => formatBlock('blockquote')}
          style={{
            background: activeFormats.blockquote ? 'rgba(187, 227, 57, 0.2)' : 'transparent',
            border: 'none',
            color: activeFormats.blockquote ? 'var(--admin-accent)' : 'var(--admin-text-secondary)',
            padding: '6px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '13px'
          }}
          title="Quote Block"
        >
          Quote
        </button>
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={() => executeCommand('removeFormat')}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--admin-danger)',
            padding: '6px 10px',
            borderRadius: '3px',
            cursor: 'pointer',
            fontSize: '12px',
            marginLeft: 'auto'
          }}
          title="Clear Format"
        >
          Tx (Clear)
        </button>
      </div>

      {/* Floating Formatting Toolbar Menu (Medium style popup) */}
      {showFloatingMenu && (
        <div
          className="floating-editor-menu"
          style={{
            position: 'absolute',
            top: `${menuPosition.top}px`,
            left: `${menuPosition.left}px`,
            width: '240px',
            height: '38px',
            background: 'rgba(18, 18, 21, 0.9)',
            backdropFilter: 'blur(12px)',
            border: '1px solid var(--admin-border)',
            borderRadius: '6px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6), 0 0 1px 1px rgba(255,255,255,0.05) inset',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            zIndex: 9999,
            padding: '0 6px',
            transition: 'opacity 0.2s ease',
            pointerEvents: 'auto'
          }}
        >
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => executeCommand('bold')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeFormats.bold ? 'var(--admin-accent)' : '#FFF',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '13px',
              padding: '6px'
            }}
          >
            B
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => executeCommand('italic')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeFormats.italic ? 'var(--admin-accent)' : '#FFF',
              fontStyle: 'italic',
              cursor: 'pointer',
              fontSize: '13px',
              padding: '6px'
            }}
          >
            I
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => formatBlock('h2')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeFormats.h2 ? 'var(--admin-accent)' : '#FFF',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '6px'
            }}
          >
            H2
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => formatBlock('h3')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeFormats.h3 ? 'var(--admin-accent)' : '#FFF',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '6px'
            }}
          >
            H3
          </button>
          <button
            type="button"
            onMouseDown={preventFocusLoss}
            onClick={() => formatBlock('blockquote')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeFormats.blockquote ? 'var(--admin-accent)' : '#FFF',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '11px',
              padding: '6px'
            }}
          >
            Quote
          </button>
        </div>
      )}

      {/* Editing Workspace */}
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onMouseUp={handleSelectionChange}
        onKeyUp={handleSelectionChange}
        onFocus={() => updateActiveFormats()}
        style={{
          flex: 1,
          padding: '20px 24px',
          color: 'var(--admin-text-primary)',
          fontSize: '14px',
          lineHeight: '1.6',
          outline: 'none',
          minHeight: '290px',
          overflowY: 'auto',
          backgroundColor: 'var(--admin-bg)',
          borderRadius: '0 0 4px 4px'
        }}
        data-placeholder={placeholder}
      />

      {/* Placeholder CSS injector */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: var(--admin-text-secondary) !important;
          opacity: 0.5;
          cursor: text;
        }
      `}</style>
    </div>
  );
}
