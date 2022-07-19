import React, { useState, useEffect } from "react";
import classes from "./LeftContainer.module.css";
import { Link, useNavigate } from "react-router-dom";
const LeftContainer = ({ setNote, notes, setNotes }) => {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [addNew, setAddNew] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedNotes, setSearchedNotes] = useState([]);
  const navigate = useNavigate();

  const notessort = notes.sort((a, b) => b.id - a.id);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleAddNew = (e) => {
    setAddNew(e.target.value);
  };

  const onAddTitle = (e) => {
    e.preventDefault();

    if (title?.length < 1 || category?.length < 1) return;
    const id = Date.now();

    setNotes([
      ...notessort,
      { title: title, id: id, category: category, addNew: addNew },
    ]);
    setSearchedNotes([
      ...notessort,
      { title: title, id: id, category: category, addNew: addNew },
    ]);
    setNote({ id, category, addNew, title });
    setTitle("");
    setCategory("");
    setAddNew("");
    navigate(`/notes/${id}`, { replace: true });
  };
  const handleDelete = (id) => {
    setNotes((prevState) => prevState.filter((note) => note.id !== id));
    if (notes.length <= 1) navigate(`/`, { replace: true });
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const searchedNotes = notes.filter((item) =>
      item.category.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    setSearchedNotes(searchedNotes);
  };
  useEffect(() => {
    setSearchedNotes(notes);
  }, [notes]);
  return (
    <div className={classes.leftcontainer}>
      <form onSubmit={handleSearch} className={classes.searchcontainer}>
        <input
          type="text"
          className={classes.searchinput}
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={classes.searchbutton}>Search</button>
      </form>
      <div className={classes.allnotestitle}>All Notes</div>
      <div className={classes.notestitlecontainer}>
        {searchedNotes.length > 0 ? (
          searchedNotes.map((note, index) => {
            return (
              <div
                onClick={() => setNote(note)}
                onDoubleClick={() => handleDelete(note.id)}
                key={note.id}
              >
                <Link
                  key={note.id}
                  to={`/notes/${note.id}`}
                  title={note.title}
                  state={note}
                  className={classes.notestitle}
                >
                  {note.title}
                </Link>
              </div>
            );
          })
        ) : (
          <div style={{ color: "white" }}>
            No notes! To add new note write below and then click button Add
            Note!
          </div>
        )}
      </div>

      <div className={classes.addnewnotetitle}>Add New Note</div>
      <form onSubmit={onAddTitle} className={classes.addnewnoteinputscontainer}>
        <input
          type="text"
          className={classes.addnotetitle}
          placeholder="Title:"
          value={title}
          onChange={handleTitle}
        />
        <input
          type="text"
          className={classes.categoryinput}
          placeholder="Category:"
          value={category}
          onChange={handleCategory}
        />
        <textarea
          className={classes.addnewnote}
          name="addnewnote"
          rows="4"
          cols="50"
          placeholder="Write your note here..."
          value={addNew}
          onChange={handleAddNew}
        />
        <button type="submit" className={classes.addnewnotebutton}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default React.memo(LeftContainer);
