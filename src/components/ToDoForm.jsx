import React, { useState } from "react";

// This component renders a form to add new todos
// It takes an `addTodo` function as a prop to handle the submission
const ToDoForm = ({ addToDo }) => {
    // State to hold the text input for the new todo
  const [text, setText] = useState("");

    // Function to handle form submission
  const handleSubmit = (e) => {
    // Prevent the default form submission behavior
    // This stops the page from reloading
    // when the form is submitted
    // This is important for single-page applications
    e.preventDefault();
    // If the input is not empty, call addTodo and reset the input field
    if (text.trim()) {
      addToDo(text);
      setText("");
    }
  };

    // Render the form with an input field and a submit button
  return (
    <form name="todo-form" onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="New task..."
      />
      <button>Add</button>
    </form>
  );
};

export default ToDoForm;