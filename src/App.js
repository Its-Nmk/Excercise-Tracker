import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import "font-awesome/css/font-awesome.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar";
import ExcerciseList from "./Components/ExcerciseList";
import AddExcercise from "./Components/AddExcercise";
import AddUser from "./Components/AddUser";
import EditExercise from "./Components/EditExercise";

import TestComponent from "./testComponent";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<ExcerciseList />} />
          <Route path="/create" element={<AddExcercise />} />
          <Route path="/user" element={<AddUser />} />
          <Route path="/edit/:id" element={<EditExercise />} />
        </Routes>
        {/* <TestComponent /> */}
      </div>
    </Router>
  );
}

export default App;
