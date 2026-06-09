'use client';

import React, { useState, useEffect, useRef } from 'react';

// Helper to sanitize and normalize pasted HTML content
const cleanHTMLPaste = (htmlString) => {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const body = doc.body;

    const sanitizeNode = (node) => {
      if (node.nodeType === 3) return; // Text node
      
      if (node.nodeType === 1) { // Element node
        const attrs = Array.from(node.attributes);
        attrs.forEach(attr => {
          if (node.tagName.toLowerCase() === 'a' && (attr.name === 'href' || attr.name === 'target')) {
            // Keep links intact
          } else {
            node.removeAttribute(attr.name);
          }
        });

        // Clean child nodes first
        Array.from(node.childNodes).forEach(child => sanitizeNode(child));

        const tagName = node.tagName.toLowerCase();
        // Remove style-heavy wrapper elements but preserve children content
        const stripTags = ['span', 'font', 'style', 'meta', 'link', 'o:p', 'xml'];
        if (stripTags.includes(tagName)) {
          const parent = node.parentNode;
          if (parent) {
            while (node.firstChild) {
              parent.insertBefore(node.firstChild, node);
            }
            parent.removeChild(node);
          }
        }
      }
    };

    // Sanitize tree
    Array.from(body.childNodes).forEach(child => sanitizeNode(child));

    // Remove empty paragraph tags
    const blocks = body.querySelectorAll('p, div, h1, h2, h3, h4, blockquote');
    blocks.forEach(block => {
      if (!block.textContent.trim() && !block.querySelector('br') && !block.querySelector('img')) {
        block.remove();
      }
    });

    return body.innerHTML;
  } catch (err) {
    console.error('Error cleaning pasted HTML:', err);
    return htmlString;
  }
};

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

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    const html = e.clipboardData.getData('text/html');

    if (html) {
      const cleaned = cleanHTMLPaste(html);
      executeCommand('insertHTML', cleaned);
    } else if (text) {
      // Plain text paste: convert double newlines to paragraph blocks
      const paragraphs = text
        .split(/\n{2,}/)
        .map(p => p.trim())
        .filter(Boolean)
        .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
        .join('');
      executeCommand('insertHTML', paragraphs);
    }
  };

  const handleSmartFormat = () => {
    if (!editorRef.current) return;
    
    const content = editorRef.current.innerHTML;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const body = doc.body;

    const sanitizeNode = (node) => {
      if (node.nodeType === 3) return;
      if (node.nodeType === 1) {
        const attrs = Array.from(node.attributes);
        attrs.forEach(attr => {
          if (node.tagName.toLowerCase() === 'a' && (attr.name === 'href' || attr.name === 'target')) {
            // Keep
          } else {
            node.removeAttribute(attr.name);
          }
        });

        Array.from(node.childNodes).forEach(child => sanitizeNode(child));

        const tagName = node.tagName.toLowerCase();
        if (['span', 'font', 'style', 'meta', 'link', 'o:p', 'xml'].includes(tagName)) {
          const parent = node.parentNode;
          if (parent) {
            while (node.firstChild) {
              parent.insertBefore(node.firstChild, node);
            }
            parent.removeChild(node);
          }
        }
      }
    };

    // Clean all nodes first
    Array.from(body.childNodes).forEach(child => sanitizeNode(child));

    // Reconstruct list structure, paragraphs, headings and blockquotes based on context
    const childNodes = Array.from(body.childNodes);
    const newBlocks = [];

    childNodes.forEach(node => {
      if (node.nodeType === 3) {
        const text = node.textContent.trim();
        if (text) {
          const p = document.createElement('p');
          p.textContent = text;
          newBlocks.push(p);
        }
        return;
      }

      if (node.nodeType === 1) {
        const tagName = node.tagName.toLowerCase();
        let text = node.textContent.trim();

        if (!text && tagName !== 'br' && tagName !== 'hr') {
          return;
        }

        // Markdown Heading Conversion
        if (text.startsWith('# ') || text.startsWith('## ') || text.startsWith('### ') || text.startsWith('#### ')) {
          let headingTag = 'h2';
          let cleanText = text;
          if (text.startsWith('# ') || text.startsWith('## ')) {
            headingTag = 'h2';
            cleanText = text.replace(/^#+\s+/, '');
          } else if (text.startsWith('### ')) {
            headingTag = 'h3';
            cleanText = text.substring(4);
          } else if (text.startsWith('#### ')) {
            headingTag = 'h4';
            cleanText = text.substring(5);
          }

          const h = document.createElement(headingTag);
          h.textContent = cleanText.trim();
          newBlocks.push(h);
          return;
        }

        // Contextual Heading (e.g. capitalized text, or text ending with a colon)
        const isShort = text.length < 70;
        const endsWithColon = text.endsWith(':') && text.length > 2;
        const isAllCaps = text === text.toUpperCase() && text.match(/[A-Z]/);

        if (isShort && (endsWithColon || isAllCaps) && tagName === 'p') {
          const headingTag = isAllCaps ? 'h3' : 'h4';
          const h = document.createElement(headingTag);
          h.textContent = text;
          newBlocks.push(h);
          return;
        }

        // Blockquotes
        if (text.startsWith('>') || text.startsWith('"') || text.startsWith('“')) {
          let cleanText = text;
          if (text.startsWith('>')) {
            cleanText = text.substring(1).trim();
          } else if (text.startsWith('"') && text.endsWith('"')) {
            cleanText = text.slice(1, -1).trim();
          } else if (text.startsWith('“') && text.endsWith('”')) {
            cleanText = text.slice(1, -1).trim();
          }

          const bq = document.createElement('blockquote');
          bq.textContent = cleanText;
          newBlocks.push(bq);
          return;
        }

        newBlocks.push(node);
      }
    });

    body.innerHTML = '';
    newBlocks.forEach(block => body.appendChild(block));

    isLocalChange.current = true;
    editorRef.current.innerHTML = body.innerHTML;
    onChange(body.innerHTML);
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
        <span style={{ width: '1px', height: '18px', backgroundColor: 'var(--admin-border)', margin: '0 4px' }}></span>
        <button
          type="button"
          onMouseDown={preventFocusLoss}
          onClick={handleSmartFormat}
          style={{
            background: 'rgba(187, 227, 57, 0.1)',
            border: '1px solid rgba(187, 227, 57, 0.2)',
            color: 'var(--admin-accent)',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(187, 227, 57, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(187, 227, 57, 0.1)';
          }}
          title="Clean paste styles and auto-format headings/quotes"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          Smart Format
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px', alignItems: 'center' }}>
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
              fontSize: '12px'
            }}
            title="Clear Format"
          >
            Tx (Clear)
          </button>
          
          <span style={{ width: '1px', height: '18px', backgroundColor: 'var(--admin-border)' }}></span>

          {/* Help Tooltip Button */}
          <div className="editor-tooltip-trigger" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
            <button
              type="button"
              onMouseDown={preventFocusLoss}
              style={{
                background: 'transparent',
                border: '1px solid var(--admin-border)',
                color: 'var(--admin-text-secondary)',
                padding: '5px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--admin-accent)';
                e.currentTarget.style.color = 'var(--admin-text-primary)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--admin-border)';
                e.currentTarget.style.color = 'var(--admin-text-secondary)';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Help
            </button>
            <div 
              className="editor-tooltip-card" 
              style={{
                position: 'absolute',
                right: '0',
                bottom: '100%',
                marginBottom: '10px',
                width: '290px',
                backgroundColor: 'rgba(18, 18, 21, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--admin-border)',
                borderRadius: '8px',
                padding: '16px',
                boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
                zIndex: 10000,
                opacity: 0,
                transform: 'translateY(8px) scale(0.95)',
                transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: 'none',
                textAlign: 'left'
              }}
            >
              <div style={{ fontWeight: '700', fontSize: '13px', color: '#FFF', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--admin-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                Formatting Instructions
              </div>
              <ul style={{ paddingLeft: '14px', margin: 0, fontSize: '11px', color: 'var(--admin-text-secondary)', lineHeight: '1.6', display: 'flex', flexDirection: 'column', gap: '6px', listStyleType: 'disc' }}>
                <li><strong>Inline Menu:</strong> Highlight text inside the editor to open a floating formatting menu (Bold, Italic, H2, H3, Blockquote).</li>
                <li><strong>Toolbar:</strong> Click H2, H3, or H4 to toggle heading styles on the active paragraph.</li>
                <li><strong>Smart Format (✨):</strong> Cleans up messy inline styles and automatically structures headers and blockquotes based on content context.</li>
                <li><strong>Clear Format (Tx):</strong> Removes style overrides from your selection.</li>
              </ul>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: '10px', paddingTop: '8px', fontSize: '10px', color: 'var(--admin-accent)', textAlign: 'right', fontWeight: '500' }}>
                Hover to dismiss
              </div>
            </div>
          </div>
        </div>
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
        onPaste={handlePaste}
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

      {/* CSS injector for custom hover tooltips and placeholders */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: var(--admin-text-secondary) !important;
          opacity: 0.5;
          cursor: text;
        }
        .editor-tooltip-trigger:hover .editor-tooltip-card {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
          pointer-events: auto !important;
        }
      `}</style>
    </div>
  );
}
