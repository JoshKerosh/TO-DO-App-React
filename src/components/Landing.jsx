import React, { useState } from "react";

const Landing = ({ taskLists, createTaskList, openTaskList }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      createTaskList(name.trim());
      setName("");
    }
  };

  return (
    <section className="landing">
      <h1>My Task Lists</h1>

      {/* Crear nuevo Task List */}
      <form onSubmit={handleSubmit} className="list-form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New name…"
        />
        <button>Create</button>
      </form>

      {/* Listado existente */}
      <ul className="list-grid">
        {taskLists.map((list) => (
          <li key={list.id} onClick={() => openTaskList(list.id)}>
            <strong>{list.name}</strong>
            <small>{list.todos.length} tareas</small>
          </li>
        ))}
        {taskLists.length === 0 && <p>No task lists yet.</p>}
      </ul>
    </section>
  );
};

export default Landing;