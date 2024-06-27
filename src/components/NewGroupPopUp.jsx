import React, { useState } from "react";
import "./NewGroupPopUp.css";

function NewGroupPopup({ addGroup, closePopup }) {
  const [groupName, setGroupName] = useState("");

  const handleAddGroup = () => {
    if (groupName.trim()) {
      addGroup(groupName);
      setGroupName("");
      closePopup();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleAddGroup();
    }
  };

  return (
    <div className="new-group-popup" onClick={closePopup}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h3>Create New Notes group</h3>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="create-btn" onClick={handleAddGroup}>
          Create
        </button>
        <button className="cancel-btn" onClick={closePopup}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default NewGroupPopup;
