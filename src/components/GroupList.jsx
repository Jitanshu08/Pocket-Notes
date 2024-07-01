import React, { useState, useEffect } from "react";
import "./GroupList.css";

function GroupList({ groups, selectGroup, selectedGroupId }) {
  const generateSymbol = (name) => {
    const words = name.split(" ");
    if (words.length === 1) {
      return name[Math.floor(Math.random() * name.length)].toUpperCase();
    } else {
      const randomWord1Index = Math.floor(Math.random() * words.length);
      let randomWord2Index;
      do {
        randomWord2Index = Math.floor(Math.random() * words.length);
      } while (randomWord1Index === randomWord2Index);

      const randomLetter1Index = Math.floor(
        Math.random() * words[randomWord1Index].length
      );
      const randomLetter2Index = Math.floor(
        Math.random() * words[randomWord2Index].length
      );

      const randomLetter1 =
        words[randomWord1Index][randomLetter1Index]?.toUpperCase();
      const randomLetter2 =
        words[randomWord2Index][randomLetter2Index]?.toUpperCase();

      if (!randomLetter1 || !randomLetter2) {
        return "";
      }

      return randomLetter1 + randomLetter2;
    }
  };

  const [groupSymbols, setGroupSymbols] = useState({});

  useEffect(() => {
    const storedSymbols =
      JSON.parse(localStorage.getItem("groupSymbols")) || {};
    const symbols = { ...storedSymbols };

    groups.forEach((group) => {
      if (!symbols[group.id]) {
        symbols[group.id] = generateSymbol(group.name);
      }
    });

    setGroupSymbols(symbols);
    localStorage.setItem("groupSymbols", JSON.stringify(symbols));
  }, [groups]);

  return (
    <div className="group-list">
      {groups.map((group) => (
        <div
          key={group.id}
          className={`group-item ${
            selectedGroupId === group.id ? "active" : ""
          }`}
          onClick={() => selectGroup(group.id)}
        >
          <span
            className="group-symbol"
            style={{ backgroundColor: group.color }}
          >
            {groupSymbols[group.id]}{" "}
          </span>
          {group.name}
        </div>
      ))}
    </div>
  );
}

export default GroupList;
