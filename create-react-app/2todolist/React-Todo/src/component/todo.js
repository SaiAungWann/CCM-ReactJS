import React, { useState } from "react";

function Todo({ todo, deleteTodo, updateSubmit }) {
  let [isEdit, setIsEdit] = useState(false);
  let [title, setTitle] = useState(todo.title);

  let updateSubmitHandle = (e) => {
    e.preventDefault();

    let updateTodo = {
      id: todo.id,
      title,
      complete: todo.complete,
    };

    updateSubmit(updateTodo);
    setIsEdit(false);
  };
  let handleCheckBox = () => {
    let updateTodo = {
      id: todo.id,
      title,
      complete: !todo.complete,
    };

    updateSubmit(updateTodo);
  };

  return (
    <li className="todo-item-container" key={todo.id}>
      <div className="todo-item">
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={handleCheckBox}
        />
        {!isEdit && (
          <span
            onDoubleClick={() => {
              setIsEdit(true);
            }}
            className={`todo-item-label ${todo.complete ? "line-through" : ""}`}
          >
            {todo.title}
          </span>
        )}
        {isEdit && (
          <form onSubmit={updateSubmitHandle}>
            <input
              type="text"
              className="todo-item-input"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </form>
        )}
      </div>
      <button className="x-button" onClick={() => deleteTodo(todo.id)}>
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  );
}

export default Todo;
