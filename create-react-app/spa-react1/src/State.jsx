import "./App.css";
import { useState } from "react";

function State() {
  // to use state hook
  // useState(default value) => [getter date , setter function] mean useState return the array data of get-data and set-function
  // use the set-function to change or update the get-data
  // useState will auto return the data set-functin to get-data so need to create the variable with array destructuring method to store the return data

  let [name, setName] = useState("Sai Aung Wann"); // set-function munt name setGet-data

  //   let name = "Sai Aung Wann";
  function changeName() {
    // name = "Aung Aung"
    setName("Aung Aung"); // use set-function in the event halding function
    console.log(setName);
  }

  // working-with-list
  // to create the posts by using dynamic li
  // create useState with array data
  let [posts, setPosts] = useState([
    {
      id: 1,
      title: "Frist Post",
    },
    {
      id: 2,
      title: "Second Post",
    },
    {
      id: 3,
      title: "Third Post",
    },
  ]);

  // create function to delete post
  let deletePost = (id) => {
    setPosts((prevState) => prevState.filter((posts) => posts.id !== id));
  };

  // to create react components
  // let create the functin when click the button and increate 1 for counting
  //this counter function can only use by +1 increment only because useState function is a Async functin
  let [count, setCount] = useState(0);
  let increment = () => {
    setCount(count + 1); // not working due to Async function
    setCount(count + 1); // not working due to Async function
    setCount(count + 1); // not working due to Async function
    setCount(count + 1); // 0+1 = 1
  };
  // to create the previous state of the useState function
  // use prevState => prevState is a callback function that can provide the previrous state of the use state
  let [count1, setCount1] = useState(0);
  let increment1 = () => {
    setCount1((preState) => preState + 1); // 0+1 = 1
    setCount1((preState) => preState + 1); // 1+1 = 2
    setCount1((preState) => preState + 1); // 2+1 = 3
    setCount1((preState) => preState + 1); // 3+1 = 4
  };
  return (
    <div>
      <h1>Hello {name}</h1>
      {/* onclick function cannot without useState hook */}
      <button onClick={changeName}>Change Name</button>

      {/* working-with-list */}
      <div>
        <ul>
          <p>Posts</p>
          {!!posts.length &&
            posts.map((post) => (
              <li key={post.id}>
                {post.title}
                <button onClick={() => deletePost(post.id)}>Delete Post</button>
              </li>
            ))}
          {!posts.length && <h3>No Post Avalible</h3>}
        </ul>
      </div>

      {/* to create react components */}
      {/* this counter function can only use by +1 increment only because setCount is a Async functin */}
      <div>
        <h2>Counter</h2>
        <h3>Count - {count}</h3>
        <button onClick={increment}>Click to Count</button>
      </div>
      {/* this counter function can only use by no. of code due to call back function */}
      <div>
        <h2>Counter</h2>
        <h3>Count - {count1}</h3>
        <button onClick={increment1}>Click to Count</button>
      </div>
    </div>
  );
}

export default State;
