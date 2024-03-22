import React from "react";
import { useState } from "react";

export default function TodoForm({ addTodo }) {
  let [title, setTitle] = useState("");

  let handleSubbmit = (e) => {
    e.preventDefault();
    let todo = {
      id: Math.random,
      title,
      compltetd: false,
    };
    // add todo function
    addTodo(todo);
    // clear data
    setTitle("");
  };
  return (
    <div>
      <form action="#" onSubmit={handleSubbmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="What do you need to do?"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </form>
    </div>
  );
}
