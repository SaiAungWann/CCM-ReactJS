import React, { useState } from "react";

function TodoForm({ addTodo }) {
  let [title, setTitle] = useState("");

  let submitHandle = (e) => {
    e.preventDefault();
    // to add data into Json server
    let todo = {
      id: Math.random,
      title,
      complete: false,
    };

    // addTodo function
    addTodo(todo);
    // clear after enter
    setTitle("");
  };

  return (
    <form action="#" onSubmit={submitHandle}>
      <input
        type="text"
        className="todo-input"
        placeholder="What do you need to do?"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
    </form>
  );
}

export default TodoForm;
