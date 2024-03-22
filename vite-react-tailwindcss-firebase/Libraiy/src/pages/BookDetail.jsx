import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useTheme from "../hook/useTheme";
import useFirestore from "../hook/useFirestore";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";

export default function BookDetail() {
  let { id } = useParams();

  // let [error, setError] = useState("");
  // let [loading, setLoading] = useState(false);
  // let [book, setBook] = useState(null);

  // useEffect(() => {
  //   setLoading(true);

  // for normal firestore
  //   let ref = doc(db, "books", id);
  //   getDoc(ref).then((doc) => {
  //     if (doc.exists()) {
  //       let book = { id: doc.id, ...doc.data() };
  //       setBook(book);
  //       setError("");
  //       setLoading(false);
  //     } else {
  //       setError("No result found");
  //       setLoading(false);
  //     }
  //   });
  // }, [id]);

  // for realtime firestore

  let { getDocument } = useFirestore();

  let { error, loading, data: book } = getDocument("books", id);

  let { isDark } = useTheme();

  return (
    <>
      {error && <p>{error}</p>}
      {loading && <p>loading ....</p>}
      {book && (
        <div className={`grid grid-cols-2 ${isDark ? "text-white" : ""}`}>
          <div>
            <img src={book.cover} alt="" className="w-[70%] " />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <div className="space-x-3">
              {book.categories.map((cateogry) => (
                <span
                  className="bg-blue-500 text-white rounded-full text-sm px-2 py-1"
                  key={cateogry}
                >
                  {cateogry}
                </span>
              ))}
            </div>
            <p>{book.description}</p>
          </div>
        </div>
      )}
      <div className=" w-full p-[30px]">
        <h3 className="font-bold text-xl text-primary my-3 text-center w-full">
          My Notes
        </h3>
        <NoteForm />
        <NoteList />
      </div>
    </>
  );
}
