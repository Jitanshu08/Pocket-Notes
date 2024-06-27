import React from "react";
import "./GroupList.css";

function GroupList({ groups, selectGroup }) {
  return (
    <div className="group-list">
      {groups.map((group) => (
        <div key={group.id} onClick={() => selectGroup(group.id)}>
          {group.name}
        </div>
      ))}
    </div>
  );
}

export default GroupList;
