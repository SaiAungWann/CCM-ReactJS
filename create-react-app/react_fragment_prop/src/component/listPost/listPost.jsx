import React from "react";
import "./listPost.css";
export default function PostList({ posts, lists }) {
  // parameter (prop) name must be the same name at the main file parameter
  return (
    <div className="postList">
      {posts.map((post) => (
        <div className="single-post" key={post.id}>
          <h2>{post.title}</h2>
          <h3>{post.stade}</h3>
          {/* to add the list useState */}
          {lists.map((list) => (
            <div className="single-list" key={list.id}>
              {list.title}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
