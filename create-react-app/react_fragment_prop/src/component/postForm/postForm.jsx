import React, { useState } from "react";

export default function PostForm({ addPost }) {
  let [userInput, setUserInput] = useState("");
  let [stades, setStades] = useState("upcoming");

  let handel = (e) => {
    setUserInput(e.target.value);
  };
  let resectForm = () => {
    setUserInput("");
  };

  let upload_post = (e) => {
    e.preventDefault();

    //  for referenct
    //   id: 3,
    //   title: "Third List",
    let post = {
      id: Math.floor(Math.random() * 10000),
      title: userInput,
      stades: stades,
    };
    addPost(post);
  };

  return (
    <form method="post">
      <h1>Create Post</h1>
      <div className="userInput">
        <label htmlFor="">User Input</label>
        <input type="text" onChange={handel} value={userInput} />
        {/* <p>{userInput}</p> */}
      </div>
      <div className="userInput">
        <label htmlFor="">Selection </label>
        <select
          name=""
          id=""
          onChange={(e) => {
            setStades(e.target.value);
          }}
          value={stades}
        >
          <option value="dropped">Dropped</option>
          <option value="Ongoing">Ongoing</option>
          <option value="upcoming">Upcoming</option>
        </select>
      </div>
      <div className="formControl">
        {/* <button type="button" onClick={resectForm}>
          Resect Post
        </button> */}
        <button onClick={upload_post}>Create post</button>
      </div>
    </form>
  );
}
