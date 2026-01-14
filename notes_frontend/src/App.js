import React, { useMemo, useState } from 'react';
import './App.css';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import useLocalStorageNotes from './hooks/useLocalStorageNotes';

// PUBLIC_INTERFACE
function App() {
  /**
   * App holds the single source of truth for:
   * - notes (persisted to localStorage)
   * - which note is currently being edited
   */
  const { notes, addNote, updateNote, deleteNote, clearAllNotes } = useLocalStorageNotes();
  const [editingId, setEditingId] = useState(null);

  const editingNote = useMemo(
    () => notes.find((n) => n.id === editingId) || null,
    [notes, editingId]
  );

  const handleCreate = (payload) => {
    addNote(payload);
  };

  const handleUpdate = (id, payload) => {
    updateNote(id, payload);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    // If deleting the currently edited note, reset the form to add mode.
    if (id === editingId) setEditingId(null);
    deleteNote(id);
  };

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  return (
    <div className="App">
      <header className="AppHeader">
        <div className="HeaderInner">
          <div className="HeaderTitleGroup">
            <h1 className="HeaderTitle">Simple Notes</h1>
            <p className="HeaderSubtitle">Create, edit, and keep notes in your browser.</p>
          </div>

          <div className="HeaderMeta" aria-label="Notes summary">
            <div className="Badge" title="Total notes">
              {notes.length} {notes.length === 1 ? 'note' : 'notes'}
            </div>

            <button
              type="button"
              className="Btn BtnSecondary"
              onClick={clearAllNotes}
              disabled={notes.length === 0}
            >
              Clear all
            </button>
          </div>
        </div>
      </header>

      <main className="Main">
        <section className="Section">
          <NoteForm
            mode={editingNote ? 'edit' : 'create'}
            initialNote={editingNote}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancelEdit={handleCancelEdit}
          />
        </section>

        <section className="Section">
          <NotesList notes={notes} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
      </main>

      <footer className="Footer">
        <span>Stored locally in your browser (localStorage).</span>
      </footer>
    </div>
  );
}

export default App;
