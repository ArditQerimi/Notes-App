import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/notes/:notesId" element={<Home />} />
    </Routes>
  );
}

export default App;
