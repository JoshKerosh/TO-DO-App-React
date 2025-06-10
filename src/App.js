import React, { useState, useEffect, useContext} from "react";
import ToDoList from "./components/ToDoList";
import ToDoForm from "./components/ToDoForm";
import "./styles/App.css";
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

  // MENU BAR
  // Dropdown state for View menu
  // This state controls whether the dropdown menu is open or closed
  // It is initialized to false, meaning the dropdown is closed by default
  const [viewDropdownOpen, setViewDropdownOpen] = useState(false);

  // Close dropdown when clicking outside
  // This effect adds an event listener to the document to close the dropdown
  // when a click occurs outside of the dropdown menu
  // It uses the `useEffect` hook to set up and clean up the event listener
  React.useEffect(() => {
    const handleClick = (e) => {
      // If the click is outside the view menu, close the dropdown
      // The `closest` method checks if the clicked element is inside the view menu
      if (!e.target.closest('.view-menu')) 
        setViewDropdownOpen(false);
    };
    
    // If the dropdown is open, add the event listener to handle clicks outside
    if (viewDropdownOpen) {
      // Add the event listener to the document
      document.addEventListener('mousedown', handleClick);
    }

    // Cleanup function to remove the event listener when the component unmounts
    // This prevents memory leaks and ensures the event listener is not active when not needed
    // This is important for performance and to avoid unexpected behavior
    return () => document.removeEventListener('mousedown', handleClick);
  }, [viewDropdownOpen]);



  // Render the main application component
  return (
    <div className="app">
      <nav className="menu-bar">
      <ul>

        <li className="menu-item">File</li>

        <li className="menu-item view-menu"
            onClick={() => setViewDropdownOpen((open) => !open)}
            style={{ userSelect: "none" }}
        >
          View
          
          <ul className="dropdown" style={{ display: viewDropdownOpen ? "block" : "none" }}>
            <li>
              <button className="dark-mode-menu-btn" onClick={toggleDarkMode}>
                {dark ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </ul>
        </li>
        
        <li className="menu-item">About</li>
      </ul>
    </nav>
      <h1>My Tasks</h1>
      <ToDoForm addToDo={addToDo} />
      <ToDoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
