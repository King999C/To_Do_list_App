import React, { useState, useEffect } from "react";
import Header from "./Components/header";
import ToDoList from "./Components/todolist";
import "./style.css";
// Data at Local Storage 
function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

// Validation for Empty Addition

  const addTask = () => {
    if (input.trim() === "") {
      setError("You cannot set empty schedules.`Your Day Should be Busy`");
      return;
    }
// Input Wording till 50 Charactor

    if (input.trim().length > 50) {
      setError("Task must be under 50 characters.");
      return;
    }
// Set New Task
    const newTask = {
      id: Date.now(),
      text: input.trim(),
      completed: false,
      isEditing: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
    setError("");
  };

// Deleting the Records from the Task List

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const startEditing = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, isEditing: true }
          : { ...task, isEditing: false }
      )
    );
  };

// Update the task

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, text: newText.trim().slice(0, 50), isEditing: false }
          : task
      )
    );
  };

  return (
    <div className="app-container">
      <Header />
      <div className="input-section">
        <input
          type="text"
          placeholder="Set Your Schedules.. Like @ I want to Travel on Monday"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(""); // reset error when typing
          }}
        />
        <button onClick={addTask}>Add</button>
      </div>
      {error && <p className="error">{error}</p>}

      <ToDoList
        tasks={tasks}
        onDelete={deleteTask}
        onToggle={toggleComplete}
        onEdit={startEditing}
        onUpdate={updateTask}
      />
    </div>
  );
}

export default App;
