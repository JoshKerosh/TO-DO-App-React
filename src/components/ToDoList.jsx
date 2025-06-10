import React from "react";
import ToDoItem from "./ToDoItem";

const ToDoList = ({ todos, toggleComplete, deleteTodo }) => (
  <ul className="todo-list">
    {todos.map((todo) => (
      <ToDoItem
        key={todo.id}
        todo={todo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />
    ))}
  </ul>
);

export default ToDoList;