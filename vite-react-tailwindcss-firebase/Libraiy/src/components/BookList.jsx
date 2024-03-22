import React, { useContext, useEffect, useState } from "react";
import book from "../assets/book-1.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useTheme from "../hook/useTheme";
import { db } from "../firebase";
import { doc } from "firebase/firestore";
import trash from "../assets/trash.svg";
import pancle from "../assets/pancle.svg";
import useFirestore from "../hook/useFirestore";
import { AuthContext } from "../contexts/AuthContext";

export default function BookList() {
  let location = useLocation();
  let navigate = useNavigate();

  let params = new URLSearchParams(location.search);
  let search = params.get("search");

  // for normal firestore
  // useEffect(function () {
  //   setLoading(true);

  //   let ref = collection(db, "books");
  //   let q = query(ref, orderBy("date", "desc"));
  //   getDocs(q).then((docs) => {
  //     if (docs.empty) {
  //       setError("no document found");
  //     } else {
  //       let books = [];
  //       docs.forEach((doc) => {
  //         let book = { id: doc.id, ...doc.data() };
  //         books.push(book);
  //       });
  //       setBooks(books);
  //       setError("");
  //       setLoading(false);
  //     }
  //   });
  // }, []);

  // for realtime firestore

  let { getCollection, deleteDocument } = useFirestore();

  let { user } = useContext(AuthContext);
  let {
    error,
    data: books,
    loading,
  } = getCollection("books", ["uid", "==", user.uid], {
    field: "title",
    value: search,
  });

  if (error) {
    <p>{error}</p>;
  }
  let { isDark } = useTheme();

  // delete book form frie store

  let deleteBook = async (e, id) => {
    e.preventDefault();
    let ref = doc(db, "books", id);
    // for data at firestore
    // await deleteDoc(ref);
    // // for UI
    // setBooks((prev) => prev.filter((b) => b.id !== id));

    await deleteDocument("books", id);
  };
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
                  className={`p-4 border border-1 min-h-[500px] ${
                    isDark ? "text-white" : ""
                  } `}
                >
                  <img src={b.cover} alt="" className="m-auto" />
                  <div className="text-center space-y-2 mt-3">
                    <h1>{b.title}</h1>
                    <p>{b.description}</p>

                    {/* genres */}
                    <div
                      className="flex justify-between items-center"
                      key={book.id}
                    >
                      <div className={`flex flex-wrap`}>
                        {b.categories.map((c) => (
                          <span
                            className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-blue-500"
                            key={c}
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                      <div className="flex space-x-5 justify-end items-center w-40">
                        <button>
                          <img
                            src={pancle}
                            alt=""
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(`/edit/${b.id}`);
                            }}
                          />
                        </button>
                        <img
                          src={trash}
                          alt=""
                          onClick={(e) => deleteBook(e, b.id)}
                        />
                      </div>
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
