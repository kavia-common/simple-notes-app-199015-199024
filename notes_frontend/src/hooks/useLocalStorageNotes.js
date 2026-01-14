import { useEffect, useState } from 'react';

const STORAGE_KEY = 'simple_notes_app__notes_v1';

// PUBLIC_INTERFACE
function useLocalStorageNotes() {
  /**
   * Notes are stored as:
   * [{ id: string, title: string, content: string, createdAt: number, updatedAt: number }]
   */
  const [notes, setNotes] = useState(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {
      // If localStorage is unavailable (rare), we simply keep state in-memory.
    }
  }, [notes]);

  const addNote = ({ title, content }) => {
    const now = Date.now();
    const newNote = {
      id: `${now}-${Math.random().toString(16).slice(2)}`,
      title: title.trim(),
      content: (content || '').trim(),
      createdAt: now,
      updatedAt: now,
    };

    setNotes((prev) => [newNote, ...prev]);
  };

  const updateNote = (id, { title, content }) => {
    const now = Date.now();
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, title: title.trim(), content: (content || '').trim(), updatedAt: now }
          : n
      )
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAllNotes = () => {
    setNotes([]);
  };

  return { notes, addNote, updateNote, deleteNote, clearAllNotes };
}

export default useLocalStorageNotes;
