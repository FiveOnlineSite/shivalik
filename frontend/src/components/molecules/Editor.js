import React, { useEffect } from "react";
import * as LexKit from "lexkit";

const { createEditorSystem, boldExtension, italicExtension, listExtension, linkExtension, historyExtension, RichText } = LexKit;


// Define extensions
const extensions = [
  boldExtension,
  italicExtension,
  listExtension,
  linkExtension,
  historyExtension,
];

// Create editor system
const { Provider, useEditor } = createEditorSystem(extensions);

// Toolbar component
function Toolbar() {
  const { commands, activeStates } = useEditor();

  return (
    <div className="basic-toolbar">
      <button
        onClick={() => commands.toggleBold()}
        className={activeStates.bold ? "active" : ""}
        title="Bold (Ctrl+B)"
      >
        Bold
      </button>
      <button
        onClick={() => commands.toggleItalic()}
        className={activeStates.italic ? "active" : ""}
        title="Italic (Ctrl+I)"
      >
        Italic
      </button>
      <button
        onClick={() => commands.toggleUnorderedList()}
        className={activeStates.unorderedList ? "active" : ""}
        title="Bullet List"
      >
        • List
      </button>
      <button
        onClick={() => commands.toggleOrderedList()}
        className={activeStates.orderedList ? "active" : ""}
        title="Numbered List"
      >
        1. List
      </button>
      <button
        onClick={() => commands.undo()}
        disabled={!activeStates.canUndo}
        className={!activeStates.canUndo ? "disabled" : ""}
        title="Undo (Ctrl+Z)"
      >
        ↶ Undo
      </button>
      <button
        onClick={() => commands.redo()}
        disabled={!activeStates.canRedo}
        className={!activeStates.canRedo ? "disabled" : ""}
        title="Redo (Ctrl+Y)"
      >
        ↷ Redo
      </button>
    </div>
  );
}

// Editor component with value/onChange support
function Editor({ value, onChange }) {
  const { editor } = useEditor();

  useEffect(() => {
    // Initialize editor with value from parent
    if (value) {
      editor.setHTML(value);
    }
  }, [editor, value]);

  useEffect(() => {
    // Listen for editor changes and propagate to parent
    const removeListener = editor.registerUpdateListener(() => {
      const html = editor.getHTML();
      onChange(html);
    });

    return () => removeListener();
  }, [editor, onChange]);

  return (
    <div className="basic-editor">
      <Toolbar />
      <RichText
        classNames={{
          container: "basic-editor-container",
          contentEditable: "basic-content",
          placeholder: "basic-placeholder",
        }}
        placeholder="Start writing your content here..."
      />
    </div>
  );
}

// Main component for export
export const BasicEditorExample = (props) => {
  return (
    <Provider extensions={extensions}>
      <Editor {...props} />
    </Provider>
  );
};
