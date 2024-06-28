import React, { useState, useEffect } from "react";
import GroupList from "./components/GroupList";
import NoteList from "./components/NoteList";
import NewGroupPopup from "./components/NewGroupPopUp";
import "./App.css";

function App() {
  const [groups, setGroups] = useState(
    JSON.parse(localStorage.getItem("groups")) || []
  );
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem("groups", JSON.stringify(groups));
  }, [groups]);

  const addGroup = (groupName) => {
    const isUnique = !groups.some((group) => group.name === groupName);
    if (isUnique) {
      const newGroup = { id: Date.now(), name: groupName, notes: [] };
      setGroups([...groups, newGroup]);
    } else {
      alert("Group name must be unique. Please choose a different name.");
    }
  };

  const addNote = (groupId, noteText) => {
    const newNote = {
      id: Date.now(),
      text: noteText,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
    };
    setGroups(
      groups.map((group) =>
        group.id === groupId
          ? { ...group, notes: [...group.notes, newNote] }
          : group
      )
    );
  };

  const selectGroup = (groupId) => {
    setSelectedGroup(groups.find((group) => groupId === group.id));
  };

  return (
    <div className="app">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 style={{ font: "31.52px" }}>Pocket Notes</h1>
        </div>
        <div className="sidebar-content">
          <GroupList groups={groups} selectGroup={selectGroup} />
        </div>
        <button
          className="create-new-grp-btn"
          onClick={() => setShowPopup(true)}
        >
          +
        </button>
      </div>
      <div className="main-content">
        {selectedGroup ? (
          <NoteList group={selectedGroup} addNote={addNote} />
        ) : (
          <div className="placeholder">
            <h1>Pocket Notes</h1>
            <p>
              Send and receive messages without keeping your phone online. Use
              Pocket Notes on up to 4 linked devices and 1 mobile phone.
            </p>
            <p>end-to-end encrypted</p>
          </div>
        )}
      </div>
      {showPopup && (
        <NewGroupPopup
          addGroup={addGroup}
          closePopup={() => setShowPopup(false)}
          groups={groups} // Pass groups here
        />
      )}
    </div>
  );
}

export default App;
