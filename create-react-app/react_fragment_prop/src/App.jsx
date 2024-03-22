import "./App.css";
import { useState } from "react";
import NavBar from "./component/navBar/navBar";
import PostList from "./component/listPost/listPost";
import PostForm from "./component/postForm/postForm";
import Model from "./component/model/model";

function App() {
  let [showModel, setShowModel] = useState(false);

  let [posts, setPosts] = useState([
    {
      id: 1,
      title: "Frist Post",
      stades: "Dropped",
    },
    {
      id: 2,
      title: "Second Post",
      stades: "Onging",
    },
  ]);
  let [lists, setLists] = useState([
    {
      id: 1,
      title: "Frist List",
    },
    {
      id: 2,
      title: "Second List",
    },
  ]);

  let addPost = (post) => {
    setPosts((prevState) => [...prevState, post]);
    setShowModel(false);
  };

  return (
    <>
      <NavBar setShowModel={setShowModel} />
      {/* this posts to export the data to components and receive as parameter (prop) at the components file */}
      <PostList posts={posts} lists={lists} />
      {/* this model is statically impact due to using children prop */}
      {showModel && (
        <Model setShowModel={setShowModel}>
          {/* using postForm components  */}
          <PostForm addPost={addPost} />
          {/* <h1>Using Children Prop</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
            vitae maiores, aliquid ex harum eligendi asperiores voluptate ipsam
            iusto. Eum?
          </p> */}
        </Model>
      )}
    </>
  );
}

export default App;
