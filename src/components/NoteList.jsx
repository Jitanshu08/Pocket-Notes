import React, { useState } from "react";
import "./NoteList.css";
import sendIcon from "../assets/icons8-sent-24.png";

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

  const getGroupSymbol = (name) => {
    const words = name.split(" ");
    if (words.length > 1) {
      return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    } else {
      return name[0].toUpperCase();
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${day} ${month} ${year} \u2022 ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  return (
    <div className="note-list">
      <div className="group-header">
        <div className="group-symbol" style={{ backgroundColor: group.color }}>
          {getGroupSymbol(group.name)}
        </div>
        <h2 className="group-name">{group.name}</h2>
      </div>
      <div className="notes-container">
        <ul>
          {group.notes.map((note) => (
            <li key={note.id}>
              <div className="note-content">{note.text}</div>
              <small className="note-date">{formatDate(note.createdAt)}</small>
            </li>
          ))}
        </ul>
      </div>
      <div className="note-input-container">
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your text here..."
        />
        <button
          className="add-note-btn"
          onClick={handleAddNote}
          disabled={!noteText.trim()}
        >
          <img
            src={sendIcon}
            alt="Send"
            className={noteText.trim() ? "active" : "inactive"}
          />
        </button>
      </div>
    </div>
  );
}

export default NoteList;
