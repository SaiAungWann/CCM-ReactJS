import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useEffect } from "react";

function BlogDetail() {
  // to receive the path name from router
  let params = useParams();
  let url = "http://localhost:3002/blogs/" + params.id; // params.name from router
  let { data: blog, loading, error } = useFetch(url);

  // useNavigate is for redirect the error page to the page which no error
  let navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/"); // this navigate is sent home page
      }, 2000);
    }
  }, [error, navigate]);

  return (
    <div>
      {error && <div>{error}</div>}
      {loading && <div>loading...</div>}
      {blog && (
        <div>
          <h2>{blog.title}</h2>
          <p>Posted by - {blog.author}</p>
          <p>{blog.body}</p>
        </div>
      )}
    </div>
  );
}

export default BlogDetail;
