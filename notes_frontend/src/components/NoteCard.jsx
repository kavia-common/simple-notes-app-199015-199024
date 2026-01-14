import React, { useMemo, useState } from 'react';

function formatTimestamp(ts) {
  try {
    return new Date(ts).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

// PUBLIC_INTERFACE
function NoteCard({ note, onEdit, onDelete }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const metaText = useMemo(() => {
    const updated = note.updatedAt ? formatTimestamp(note.updatedAt) : '';
    const created = note.createdAt ? formatTimestamp(note.createdAt) : '';
    if (updated && note.updatedAt !== note.createdAt) return `Updated ${updated}`;
    if (created) return `Created ${created}`;
    return '';
  }, [note.createdAt, note.updatedAt]);

  const handleDelete = () => {
    if (!confirmingDelete) {
      setConfirmingDelete(true);
      return;
    }
    onDelete(note.id);
  };

  return (
    <article className="NoteCard Card" role="listitem" aria-label={`Note: ${note.title}`}>
      <div className="NoteTop">
        <h3 className="NoteTitle" title={note.title}>
          {note.title}
        </h3>
        {metaText ? <div className="NoteMeta">{metaText}</div> : null}
      </div>

      {note.content ? <p className="NoteContent">{note.content}</p> : <p className="NoteContent Muted">No content.</p>}

      <div className="NoteActions">
        <button type="button" className="Btn BtnSuccess" onClick={() => onEdit(note.id)}>
          Edit
        </button>

        <button
          type="button"
          className={`Btn ${confirmingDelete ? 'BtnDanger' : 'BtnSecondary'}`}
          onClick={handleDelete}
          onBlur={() => setConfirmingDelete(false)}
        >
          {confirmingDelete ? 'Confirm delete' : 'Delete'}
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
