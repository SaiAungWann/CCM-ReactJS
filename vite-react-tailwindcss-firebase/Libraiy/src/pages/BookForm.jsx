import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useTheme from "../hook/useTheme";
import { doc, getDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import useFirestore from "../hook/useFirestore";
import { AuthContext } from "../contexts/AuthContext";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Create() {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [newCategory, setNewCategory] = useState("");
  let [categories, setCategories] = useState([]);
  let [loading, setLoading] = useState(false);
  let { id } = useParams();
  let [isEdit, setIsEdit] = useState(false);
  let [file, setFile] = useState(null);
  let [preview, setPreview] = useState("");
  let { user } = useContext(AuthContext);

  let navigate = useNavigate();

  let { updateDocument, addCollection } = useFirestore();

  let addCategory = (e) => {
    if (newCategory && categories.includes(newCategory)) {
      setNewCategory("");
      return;
    }
    setCategories((prev) => [newCategory, ...prev]);
    setNewCategory("");
  };

  // upload book's cover photo to firebase

  let uploadToFirebase = async (file) => {
    let uniqueFileName = Date.now().toString() + "_" + file.name;
    let path = "/cover_photos/" + user.uid + "/" + uniqueFileName;
    let storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  };

  // to edit / update book

  let submitForm = async (e) => {
    e.preventDefault();
    let url = await uploadToFirebase(file);
    let data = {
      title,
      description,
      categories,
      uid: user.uid,
      cover: url,
    };
    if (isEdit) {
      await updateDocument("books", id, data);
      // let ref = doc(db, "books", id);
      // await updateDoc(ref, data);
    } else {
      await addCollection("books", data);
      // let ref = collection(db, "books");
      // await addDoc(ref, data);
    }
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      let ref = doc(db, "books", id);
      getDoc(ref).then((doc) => {
        if (doc.exists) {
          let { title, description, categories } = doc.data();
          setTitle(title);
          setCategories(categories);
          setDescription(description);
        } else {
          setIsEdit(false);
          setCategories([]);
          setDescription("");
          setTitle("");
        }
      });
    }
  }, [id]);

  // preivew photo
  let handlePhotoChange = (e) => {
    setFile(e.target.files[0]);
  };

  let handlePreviewImage = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setPreview(reader.result);
    };
  };
  useEffect(() => {
    if (file) {
      handlePreviewImage(file);
    }
  }, [file]);

  let { isDark } = useTheme();
  // let loadingFun = () => {
  //   useEffect(() => {
  //     setLoading(false);
  //   });
  // };
  return (
    <>
      <form
        className={`w-full max-w-lg mx-auto mt-5 h-screen`}
        onSubmit={submitForm}
      >
        <div className={`flex flex-wrap -mx-3 mb-6`}>
          <div className={`w-full px-3 `}>
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
              htmlFor="grid-password"
            >
              Book Title
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="text"
              placeholder="Book Title"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
              htmlFor="grid-password"
            >
              Book Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-password"
              type="password"
              placeholder="Book Description"
            />
            <p
              className={`text-gray-600 text-xs italic ${
                isDark ? "text-white" : ""
              }`}
            >
              Make it as long and as crazy as you'd like
            </p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className={`w-full px-3 `}>
            <label
              className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 ${
                isDark ? "text-white" : ""
              }`}
              htmlFor="grid-password"
            >
              Categories
            </label>
            <div className={`flex items-center space-x-2`}>
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-password"
                type="text"
                placeholder="Book Category"
              />
              <button
                type="button"
                onClick={addCategory}
                className="bg-primary p-1 rounded-lg mb-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 p-1 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap">
            {categories.map((c) => (
              <span
                key={c}
                className="mx-1 my-1 text-white rounded-full px-2 py-1 text-sm bg-primary"
              >
                {" "}
                {c}
              </span>
            ))}
          </div>
        </div>
        {/* preview */}
        <div className="w-full px-3 my-3">
          <label
            className={`block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password ${
              isDark ? "text-white" : ""
            }`}
          >
            Book Title
          </label>
          <input
            type="file"
            name=""
            id=""
            onChange={handlePhotoChange}
            className={`${
              isDark ? "text-white" : ""
            } flex justify-center items-center`}
          />
          {!!preview && (
            <img src={preview} alt="" className="my-3 w-56 h-56 " />
          )}
        </div>
        {/* create book */}
        <button
          type="submit"
          // onClick={loadingFun}
          className="text-white bg-primary px-3 py-2 rounded-2xl flex justify-center items-center gap-1 w-full"
        >
          {/* {loading && <p>Loading ...</p>} */}
          {/* {!loading &&  */}
          <div className="text-white bg-primary px-3 py-2 rounded-2xl flex justify-center items-center gap-1 w-full ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="hidden md:block">
              {isEdit ? "Update" : "Create"} book
            </span>
          </div>
        </button>
      </form>
    </>
  );
}
