import React, { useState } from "react";
import "./NoteList.css";
import sendIconInactive from "../assets/icons8-send-24.png";
import sendIconActive from "../assets/icons8-sent-24.png";

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
      <div className="group-header">
        <h2 className="group-name">{group.name}</h2>
      </div>
      <div className="notes-container">
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
      <div className="note-input-container">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your note..."
        />
        <button
          className="add-note-btn"
          onClick={handleAddNote}
          disabled={!noteText.trim()}
        >
          <img
            src={noteText.trim() ? sendIconActive : sendIconInactive}
            alt="Send"
          />
        </button>
      </div>
    </div>
  );
}

export default NoteList;
