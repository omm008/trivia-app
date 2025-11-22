import React from "react";

const DifficulySelector = ({ value, onChange }) => {
  return (
    <div>
      <label>
        Difficulty:
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
    </div>
  );
};

export default DifficulySelector;
