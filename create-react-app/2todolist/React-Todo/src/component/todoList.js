import React from "react";
import Todo from "./todo";

function TodoList({ todos, deleteTodo, updateSubmit }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        return (
          <Todo
            todo={todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            updateSubmit={updateSubmit}
          />
        );
      })}
    </ul>
  );
}

export default TodoList;
