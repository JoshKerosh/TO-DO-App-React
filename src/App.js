import React, { useState, useEffect } from "react";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";
import "./styles/App.css";
import { useContext } from "react";
import { ThemeContext } from "./themes/ThemeContext";

function App() {
  // Initialize todos from localStorage or set to an empty array
    const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  // Update localStorage whenever todos change
  useEffect(() => {
    // Save the current todos to localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Function to add todos
  const addToDo = (text) => {
    setTodos([...todos, { text, completed: false, id: Date.now() }]);
  };

  // Toggle the completion status of a todo
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo by its id
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Use the ThemeContext to access dark mode functionality
  const { toggleDarkMode, dark } = useContext(ThemeContext);

  // Render the main application component
  return (
    <div className="app">
      <h1>My Tasks</h1>
      <button onClick={toggleDarkMode}>{dark ? "Modo Claro" : "Modo Oscuro"}</button>
      <ToDoForm addToDo={addToDo} />
      <ToDoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
