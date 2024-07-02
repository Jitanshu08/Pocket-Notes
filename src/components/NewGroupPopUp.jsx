import React, { useState } from "react";
import "./NewGroupPopUp.css";

const colors = [
  "rgba(179, 139, 250, 1)",
  "rgba(255, 121, 242, 1)",
  "rgba(67, 230, 252, 1)",
  "rgba(241, 149, 118, 1)",
  "rgba(0, 71, 255, 1)",
  "rgba(102, 145, 255, 1)",
];

function NewGroupPopUp({ addGroup, closePopup, groups }) {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [errMessage, setErrMessage] = useState("");

  const handleAddGroup = () => {
    if (groupName.trim()) {
      const isUnique = !groups.some((group) => group.name === groupName.trim());
      if (isUnique) {
        addGroup(groupName, selectedColor);
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
        <h3>Create New Group</h3>
        <div className="input-group">
          <label>Group Name </label>
          <input
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter group name"
          />
        </div>
        {errMessage && <p className="err-message">{errMessage}</p>}
        <div className="color-selection">
          <label>Choose a Color </label>
          <div className="color-options">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`color-circle ${
                  selectedColor === color ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>
        <div className="button-group">
          <button className="create-btn" onClick={handleAddGroup}>
            Create
          </button>
          <button className="cancel-btn" onClick={closePopup}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewGroupPopUp;
