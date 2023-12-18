import React, { useState, useEffect } from "react";
import styles from "./StickyNotes.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import {
  getNotesById,
  createNote,
  updateNote,
  deleteNote
} from "../../api/note";

function Note({ note, updateNotes, removeNote }) {
  const [mode, setMode] = useState("view");

  if (!note) return null;

  function hanldeEditNote() {
    setMode("edit");
  }

  function handleUpdateNote() {
    const data = {
      name: document.getElementById("title").value,
      content: document.getElementById("content").value
    };
    updateNote(note.id, data)
      .then((res) => {
        if (res.code === 200) {
          setMode("view");
          updateNotes(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleRemoveNote(id) {
    setMode("view");
    removeNote(id);
  }

  if (mode === "view")
    return (
      <li key={note.id}>
        <a>
          <h2
            onClick={(e) => {
              if (e.detail === 2) hanldeEditNote();
            }}
          >
            {note.name}
          </h2>
          <p
            onClick={(e) => {
              if (e.detail === 2) hanldeEditNote();
            }}
          >
            {note.content}
          </p>
        </a>
      </li>
    );
  else if (mode === "edit")
    return (
      <InputNote
        mode={mode}
        note={note}
        addNote={handleUpdateNote}
        removeNote={handleRemoveNote}
      />
    );
}
function InputNote({ mode, note, addNote, removeNote }) {
  function handleDeleteNote() {
    if (note)
      deleteNote(note.id)
        .then((res) => {
          if (res.code === 200) {
            removeNote(note.id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  }
  return (
    <li className="new-note">
      <a>
        <label>Title</label>
        {mode === "edit" ? (
          <i onClick={handleDeleteNote}>
            <FontAwesomeIcon icon={faXmark} />
          </i>
        ) : null}

        <input id="title" type="text" defaultValue={note ? note.name : null} />
        <label>Content</label>
        <textarea id="content" defaultValue={note ? note.content : null} />
        <button onClick={addNote}>Save</button>
      </a>
    </li>
  );
}

export default function StickyNote({ id }) {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getNotesById(id);
      if (res.code === 200) setNotes(res.data);
    };
    fetchData();
  }, []);

  function handleAddNote() {
    const data = {
      name: document.getElementById("title").value,
      content: document.getElementById("content").value,
      goalBranchId: id
    };
    createNote(data)
      .then((res) => {
        if (res.code === 200) {
          document.getElementById("title").value = "";
          document.getElementById("content").value = "";
          setNotes(notes.concat(res.data));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateNote(data) {
    setNotes(notes.map((note) => (note.id === data.id ? data : note)));
  }

  function handleRemoveNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <section className="sticky-note-container">
      <ul>
        {notes.map((note) => (
          <Note
            note={note}
            updateNotes={handleUpdateNote}
            removeNote={handleRemoveNote}
          />
        ))}
        {notes.length < 9 ? <InputNote addNote={handleAddNote} /> : null}
      </ul>
    </section>
  );
}
