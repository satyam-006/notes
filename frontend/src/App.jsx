import { useState, useEffect } from "react";
import axios from "axios";
import { useRef } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const desRef = useRef(null);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes").then((res) => {
      setNotes(res.data.notes);
    });
  }
  useEffect(() => {
    fetchNotes();
  }, [notes]);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
      });

    title.value = "";
    description.value = "";
  }

  function handleUpdate(e) {
    e.preventDefault();
    const { description } = e.target.elements;
    axios
      .patch(`http://localhost:3000/api/notes/${updateId}`, {
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
      });

    setUpdateId(null);
    desRef.current.value = "";
  }

  function handleDeleteNote(noteId) {
    axios.delete(`http://localhost:3000/api/notes/${noteId}`).then((res) => {
      console.log(res.data);
    });
  }

  function handleUpdateNote(noteId, description) {
    setUpdateId(noteId);
    desRef.current.value = description;
  }

  return (
    <>
      <div className="note-create-form">
        <form onSubmit={updateId ? handleUpdate : handleSubmit}>
          <input
            className={`${updateId ? "hide" : "visible"}`}
            name="title"
            type="text"
            placeholder="Enter title"
          />
          <input
            ref={desRef}
            name="description"
            type="text"
            placeholder="Enter description"
          />
          <button>{updateId ? "Update" : "Create"} note</button>
        </form>
      </div>
      <div className="notes">
        {notes.map((note) => (
          <div className="note">
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button
              onClick={() => {
                handleDeleteNote(note._id);
              }}
            >
              Delete
            </button>
            <button
              className="update"
              onClick={() => {
                handleUpdateNote(note._id, note.description);
              }}
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
