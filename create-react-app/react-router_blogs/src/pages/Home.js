import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./Home.css";

function Home() {
  let url = "http://localhost:3002/blogs";
  let { data: blogs, loading, error } = useFetch(url);

  return (
    <div className="Home">
      {error && <div>{error}</div>}
      {loading && <div>loading...</div>}

      {blogs &&
        blogs.map((blog) => (
          <div key={blog.id} className="card">
            <h3>{blog.title}</h3>
            <p> posted by - {blog.author}</p>
            <Link to={`/blogs/${blog.id}`}>Read More</Link>
          </div>
        ))}
    </div>
  );
}

export default Home;

/*blogs.map cannot not run directly without blogs && because the default value of data output form hooks is define as null*/
