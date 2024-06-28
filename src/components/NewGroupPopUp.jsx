import React, { useState } from "react";
import "./NewGroupPopUp.css";

function NewGroupPopup({ addGroup, closePopup, groups }) {
  const [groupName, setGroupName] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const handleAddGroup = () => {
    if (groupName.trim()) {
      const isUnique = !groups.some((group) => group.name === groupName.trim());
      if (isUnique) {
        addGroup(groupName);
        setGroupName("");
        setErrMessage("");
        closePopup();
      } else {
        setErrMessage("Group name must be unique.");
      }
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
        {errMessage && <p className="err-message">{errMessage}</p>}
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
