// File: ToDoList.jsx
import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ tasks, onDelete, onToggle, onEdit, onUpdate }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="no-task">Please Add Tasks, No tasks added yet.</p>
      ) : (
        tasks.map((task) => (
          <ToDoItem
            key={task.id}
            task={task}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
            onUpdate={onUpdate}
          />
        ))
      )}
    </div>
  );
};

export default ToDoList;
