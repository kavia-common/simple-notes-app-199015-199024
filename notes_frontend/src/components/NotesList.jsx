import React from 'react';
import NoteCard from './NoteCard';

// PUBLIC_INTERFACE
function NotesList({ notes, onEdit, onDelete }) {
  if (!notes || notes.length === 0) {
    return (
      <div className="EmptyState Card">
        <h2 className="CardTitle">No notes yet</h2>
        <p className="CardSubtitle">Add your first note above. It will persist after refresh.</p>
      </div>
    );
  }

  return (
    <div className="NotesSection">
      <div className="SectionHeader">
        <h2 className="SectionTitle">Your notes</h2>
        <p className="SectionSubtitle">Newest notes appear first.</p>
      </div>

      <div className="NotesGrid" role="list">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default NotesList;
