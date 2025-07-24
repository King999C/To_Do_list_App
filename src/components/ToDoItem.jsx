// ToDoItem.jsx
import React, { useState } from "react";

const ToDoItem = ({ task, onDelete, onToggle, onEdit, onUpdate }) => {
  const [editedText, setEditedText] = useState(task.text);

  const handleUpdate = () => {
    if (editedText.trim() === "") return;
    onUpdate(task.id, editedText);
  };

  return (
    <div className="task-item">
      <div className="left-section">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        {task.isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => {
              // Showing Limited for wordings after Editing

              const wordCount = e.target.value.trim().split(/\s+/).length;
              if (wordCount <= 50) setEditedText(e.target.value);
            }}
            placeholder="Max 50 words"
            className="edit-input"
          />
        ) : (
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "gray" : "black",
              flex: 1,
            }}
          >
            {task.text}
          </span>
        )}
      </div>

      {/* Button Section  */}

      <div className="right-section">
        {task.isEditing ? (
          <button onClick={handleUpdate}>Save</button>
        ) : (
          <button onClick={() => onEdit(task.id)}>Edit</button>
        )}
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ToDoItem;
