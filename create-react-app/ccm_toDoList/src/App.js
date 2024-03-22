import "./reset.css";
import "./App.css";
import TodoForm from "./component/todoForm.jsx";
import TodoList from "./component/TodoList.jsx";
import CheckAllAndRemaining from "./component/CheckAllAndRemaining.jsx";
import FilterButton from "./component/filterButton.jsx";
import ClearButton from "./component/ClearButton.jsx";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        console.log(todos);
      });
  }, []);

  let addTodo = (todo) => {
    // server site data state
    fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    // Client site data state
    setTodos((prevState) => [...prevState, todo]);
  };

  let deleteTodo = (todoId) => {
    // server site data state
    fetch(`http://localhost:3001/todos/${todoId}`, {
      method: "DELETE",
    });
    // client site data state
    setTodos((prevState) => {
      return prevState.filter((todo) => {
        return todo.id !== todoId;
      });
    });
  };
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList todos={todos} deleteTodo={deleteTodo} />
        <CheckAllAndRemaining />
        <FilterButton />
        <ClearButton />
      </div>
    </div>
  );
}

export default App;
