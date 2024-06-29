import React from "react";
import "./GroupList.css";

function GroupList({ groups, selectGroup }) {
  const getGroupSymbol = (name) => {
    const words = name.split(" ");
    if (words.length === 1) {
      const randomIndex = Math.floor(Math.random() * name.length);
      const randomLetter = name[randomIndex].toUpperCase();
      return randomLetter;
    } else {
      return words[0][0].toUpperCase() + words[1][0].toUpperCase();
    }
  };

  return (
    <div className="group-list">
      {groups.map((group, index) => (
        <div key={index} onClick={() => selectGroup(group.id)}>
          <span className="group-symbol" style={{ backgroundColor: group.color }}>
            {getGroupSymbol(group.name)}
          </span>
          {group.name}
        </div>
      ))}
    </div>
  );
}

export default GroupList;
