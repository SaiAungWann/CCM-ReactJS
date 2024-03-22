import React from "react";
import useFetch from "../hook/useFetch";
import book from "../assets/book-1.jpg";
import { Link, useLocation } from "react-router-dom";
import useTheme from "../hook/useTheme";

export default function BookList() {
  let location = useLocation();

  let params = new URLSearchParams(location.search);
  let search = params.get("search");

  let {
    data: books,
    loading,
    error,
  } = useFetch(`http://localhost:3001/books${search ? `?q=${search}` : ""}`);

  if (error) {
    <p>{error}</p>;
  }
  let { isDark } = useTheme();
  return (
    <div>
      {loading && <p>Loading ... </p>}

      {
        //to check if the data is available !! to change boolean
        !!books && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-3">
            {books.map((b) => (
              <Link to={`/books/${b.id}`} key={b.id}>
                <div
                  className={`p-4 border border-1 ${
                    isDark ? "text-white" : ""
                  }`}
                >
                  <img src={book} alt="" className="m-auto" />
                  <div className="text-center space-y-2 mt-3">
                    <h1>{b.title}</h1>
                    <p>{b.description}</p>

                    {/* genres */}
                    <div className="flex flex-wrap" key={book.id}>
                      {b.categories.map((c) => (
                        <span className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500">
                          {" "}
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )
      }
      {books && !books.length && (
        <p className="text-center text-xl text-gray-500">
          No search result found
        </p>
      )}
    </div>
  );
}
