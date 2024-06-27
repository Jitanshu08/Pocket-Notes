import React, { useState } from "react";
import "./NoteList.css";

function NoteList({ group, addNote }) {
  const [noteText, setNoteText] = useState("");

  const handleAddNote = () => {
    if (noteText.trim()) {
      addNote(group.id, noteText);
      setNoteText("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddNote();
    }
  };

  return (
    <div className="note-list">
      <h2>{group.name}</h2>
      <div className="note-input-container">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your note..."
        />
        <button
          className={`add-note-btn ${noteText.trim() ? "active" : "inactive"}`}
          onClick={handleAddNote}
        >
          Add Note
        </button>
      </div>
      <ul>
        {group.notes.map((note) => (
          <li key={note.id}>
            {note.text} <br />
            <small>Created: {note.createdAt}</small>
            <br />
            <small>Updated: {note.updatedAt}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NoteList;
