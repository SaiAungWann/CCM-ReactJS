import "./reset.css";
import "./App.css";
import TodoForm from "./component/todoForm";
import TodoList from "./component/todoList";
import FitterButton from "./component/fitter_button";
import ClearButton from "./component/clear_button";
import CheckAllAndremaining from "./component/checkAllAndremaining";
import { useEffect, useState, useCallback } from "react";

function App() {
  let [todos, setTodos] = useState([]);
  let [FilterTodos, setFilterTodos] = useState(todos);

  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => res.json())
      .then((todos) => {
        setTodos(todos);
        setFilterTodos(todos);
      });
  }, []);

  let filterBy = useCallback(
    (filter) => {
      if (filter === "All") {
        setFilterTodos(todos);
      }
      if (filter === "Active") {
        setFilterTodos(todos.filter((t) => !t.complete));
      }
      if (filter === "Complete") {
        setFilterTodos(todos.filter((t) => t.complete));
      }
    },
    [todos],
  );

  // to add new data
  let addTodo = (todo) => {
    // server side data state
    fetch(`http://localhost:3001/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    // client side data state
    setTodos((prevState) => [...prevState, todo]);
  };

  // delete functon
  let deleteTodo = (todoId) => {
    fetch(`http://localhost:3001/todos/${todoId}`, {
      method: "DELETE",
    });
    setTodos((prevState) => {
      return prevState.filter((todo) => {
        return todo.id !== todoId;
      });
    });
  };

  // update list
  let updateSubmit = (todo) => {
    // server side
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });

    // client site
    setTodos((prevState) => {
      return prevState.map((t) => {
        if (t.id === todo.id) {
          return todo;
        }
        return t;
      });
    });
  };

  // Check all remaining
  let remainingCount = todos.filter((t) => !t.complete).length;
  let checkAll = () => {
    todos.forEach((t) => {
      t.complete = true;
      updateSubmit(t);
    });
  };

  // clearComplete
  let clearComplete = () => {
    // server site
    todos.forEach((t) => {
      if (t.complete) {
        deleteTodo(t.id);
      }
    });
    // client site
    setTodos((prevState) => {
      return prevState.filter((t) => !t.complete);
    });
  };
  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2> Todo App</h2>
        <TodoForm addTodo={addTodo} />
        <TodoList
          todos={FilterTodos}
          deleteTodo={deleteTodo}
          updateSubmit={updateSubmit}
        />
        <FitterButton filterBy={filterBy} />
        <ClearButton clearComplete={clearComplete} />
        <CheckAllAndremaining
          remainingCount={remainingCount}
          checkAll={checkAll}
        />
      </div>
    </div>
  );
}

export default App;
