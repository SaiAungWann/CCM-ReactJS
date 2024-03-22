import React from "react";
import Todo from "../component/todo.jsx";

export default function TodoList({ todos, deleteTodo }) {
  return (
    <ul className="todo-list">
      {todos.map((todo) => {
        return <Todo todo={todo} key={todo.id} deleteTodo={deleteTodo} />;
      })}
    </ul>
  );
}
