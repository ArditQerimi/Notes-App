import React, { memo, useEffect, useState } from "react";
import classes from "./RightContainer.module.css";
import { useNavigate } from "react-router-dom";

const RightContainer = ({ id, note, setNote, setNotes, notes }) => {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const onEdit = () => {
    setEdit(true);
  };

  const onSave = (e) => {
    setEdit(false);
    e.preventDefault();
    setNotes((prev) =>
      prev.map((item) =>
        item.id === note.id
          ? {
              title: note.title,
              id: note.id,
              category: note.category,
              addNew: note.addNew,
            }
          : item
      )
    );
    navigate(`/notes/${id}`, { replace: true });
  };
  useEffect(() => {
    setNote(
      notes.find((note) => {
        return note.id === +id;
      })
    );
  }, []);
  return (
    <>
      {notes.length <= 0 ? (
        <div className={classes.rightcontainer}>
          <div className={classes.nonotes}>
            <div className={classes.nonotestext}>
              <div>You have deleted all notes!</div>
            </div>
          </div>
        </div>
      ) : (
        <div className={classes.rightcontainer}>
          {edit === false ? (
            <>
              <div className={classes.head}>
                <div className={classes.mynotetitle}>Title: {note?.title}</div>
                <button onClick={onEdit} className={classes.editbutton}>
                  Edit
                </button>
              </div>
              <div className={classes.categorydate}>
                <div className={classes.category}>
                  <i className={classes.span}>Category :</i> {note?.category}{" "}
                </div>
                <div> • </div>
                <div className={classes.date}>
                  <i className={classes.span}>Date: </i>
                  {new Date().toLocaleString("en-GB")}{" "}
                </div>
              </div>
              <div className={classes.mynote}>{note?.addNew}</div>
            </>
          ) : (
            <form
              onSubmit={onSave}
              className={classes.addnewnoteinputscontainer}
            >
              <div className={classes.edittitle}>
                <div className={classes.edittitletext}>
                  <div className={classes.mynotetitle}>
                    <span>Title: </span>
                    <input
                      type="text"
                      className={classes.addnewnoteinput}
                      placeholder="Title:"
                      value={note.title}
                      onChange={(e) =>
                        setNote((prev) => ({ ...prev, title: e.target.value }))
                      }
                    />
                  </div>
                </div>
                <button type="submit" className={classes.savebutton}>
                  Save Changes
                </button>
              </div>
              <div className={classes.editcategory}>
                <div className={classes.category}>
                  <i className={classes.span}>Category :</i>{" "}
                </div>
                <input
                  type="text"
                  className={classes.categoryinput}
                  placeholder="Category:"
                  value={note.category}
                  onChange={(e) =>
                    setNote((prev) => ({ ...prev, category: e.target.value }))
                  }
                />{" "}
              </div>

              <textarea
                className={classes.mynoteinput}
                name="addnewnote"
                rows="4"
                cols="50"
                placeholder="Write your note here..."
                value={note.addNew}
                onChange={(e) =>
                  setNote((prev) => ({ ...prev, addNew: e.target.value }))
                }
              />
            </form>
          )}
        </div>
      )}
    </>
  );
};

export default memo(RightContainer);
