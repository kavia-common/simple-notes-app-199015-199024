import React, { useEffect, useMemo, useState } from 'react';

// PUBLIC_INTERFACE
function NoteForm({ mode, initialNote, onCreate, onUpdate, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [touched, setTouched] = useState(false);

  const isEditMode = mode === 'edit' && initialNote;

  useEffect(() => {
    if (isEditMode) {
      setTitle(initialNote.title || '');
      setContent(initialNote.content || '');
      setTouched(false);
      return;
    }
    setTitle('');
    setContent('');
    setTouched(false);
  }, [isEditMode, initialNote]);

  const titleError = useMemo(() => {
    if (!touched) return '';
    if (!title.trim()) return 'Title is required.';
    return '';
  }, [title, touched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);

    if (!title.trim()) return;

    const payload = { title, content };

    if (isEditMode) {
      onUpdate(initialNote.id, payload);
      return;
    }

    onCreate(payload);
    setTitle('');
    setContent('');
    setTouched(false);
  };

  const handleCancel = () => {
    onCancelEdit();
  };

  return (
    <div className="Card">
      <div className="CardHeader">
        <h2 className="CardTitle">{isEditMode ? 'Edit note' : 'Add a new note'}</h2>
        <p className="CardSubtitle">
          {isEditMode ? 'Update your note and save changes.' : 'Give it a title and optional details.'}
        </p>
      </div>

      <form className="Form" onSubmit={handleSubmit}>
        <div className="Field">
          <label className="Label" htmlFor="note-title">
            Title <span className="Required">*</span>
          </label>
          <input
            id="note-title"
            className={`Input ${titleError ? 'InputError' : ''}`}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="e.g., Grocery list"
            maxLength={80}
            autoComplete="off"
          />
          {titleError ? <div className="FieldError">{titleError}</div> : null}
        </div>

        <div className="Field">
          <label className="Label" htmlFor="note-content">
            Content
          </label>
          <textarea
            id="note-content"
            className="Textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write anything…"
            rows={5}
            maxLength={2000}
          />
          <div className="Hint">{content.length}/2000</div>
        </div>

        <div className="Actions">
          <button type="submit" className="Btn BtnPrimary">
            {isEditMode ? 'Save changes' : 'Add note'}
          </button>

          {isEditMode ? (
            <button type="button" className="Btn BtnGhost" onClick={handleCancel}>
              Cancel
            </button>
          ) : (
            <button
              type="button"
              className="Btn BtnGhost"
              onClick={() => {
                setTitle('');
                setContent('');
                setTouched(false);
              }}
              disabled={!title && !content}
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default NoteForm;
