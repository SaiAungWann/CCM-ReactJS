import React, { useState } from "react";
import useFirestore from "../hook/useFirestore";
import { useParams } from "react-router-dom";
import moment from "moment";
import trashIcon from "../assets/trash.svg";
import pencilIcon from "../assets/pancle.svg";
import NoteForm from "../components/NoteForm";
import ProfileImg from "/3rd_year.jpg";
import useTheme from "../hook/useTheme";

export default function NoteList() {
  let { id } = useParams();
  let { getCollection, deleteDocument } = useFirestore();
  let { data: notes } = getCollection("notes", ["bookUid", "==", id]);
  let [editNote, setEditnote] = useState(null);

  let deleteNote = async (id) => {
    await deleteDocument("notes", id);
  };
  let { isDark } = useTheme();

  return (
    !!notes.length &&
    notes.map((note) => (
      <div
        key={note.id}
        className={`border-2 shadow-md p-3 my-3 ${isDark ? "text-white" : ""}`}
      >
        <div className="flex space-x-3 justify-between">
          <div className=" flex space-x-3 items-start">
            <img src={ProfileImg} alt="" className="w-12 h-12 rounded-full" />
            <div>
              <h3>Sai Aung Wann</h3>
              <div className="text-gray-400">
                {moment(note?.date?.seconds * 1000).fromNow()}
              </div>
            </div>
          </div>
          <div className="flex justify-items-end">
            <img
              onClick={() => setEditnote(note)}
              className="cursor-pointer"
              src={pencilIcon}
              alt=""
            />
            <img
              onClick={() => deleteNote(note.id)}
              className="cursor-pointer"
              src={trashIcon}
              alt=""
            />
          </div>
        </div>
        <div className="mt-3">
          {editNote?.id !== note.id && note.body}
          {editNote?.id === note.id && (
            <NoteForm
              type="update"
              setEditnote={setEditnote}
              editNote={editNote}
            />
          )}
        </div>
      </div>
    ))
  );
}
