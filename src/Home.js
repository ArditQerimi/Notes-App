import "./App.css";
import LeftContainer from "./components/LeftContainer";
import RightContainer from "./components/RightContainer";
import { useState } from "react";
import { useParams } from "react-router-dom";
const dummy_notes = [
  {
    title: "Title 1",
    id: 1,
    category: "Books",
    addNew: "DUMMY NOTE",
  },
  {
    title: "Title 2",
    id: 2,
    category: "Sports",
    addNew: "DUMMY NOTE",
  },
  {
    title: "Title 3",
    id: 3,
    category: "Math",
    addNew: "DUMMY NOTE",
  },
];

function Home() {
  const [notes, setNotes] = useState(dummy_notes);
  const [note, setNote] = useState({});

  const params = useParams();
  const id = params.notesId ?? 1;
  return (
    <div className="containers">
      <LeftContainer notes={notes} setNotes={setNotes} setNote={setNote} />
      <RightContainer
        id={id}
        note={note}
        setNote={setNote}
        setNotes={setNotes}
        notes={notes}
      />
    </div>
  );
}

export default Home;
