import About from "./Components/About";
import Home from "./Components/Home";
import Nav from "./Components/Nav";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoteState from "./Contexts/NoteState";
import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import AlertState from "./Contexts/AlertState";
import Alert from "./Components/Alert"




function App() {


  return (
    
      <Router>
        <AlertState>
        <NoteState>
        <Nav />
        <Alert />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={< Login/>} />
          <Route path="/signup" element={< Signup/>} />
        </Routes>
        </NoteState>
        </AlertState>
      </Router>
    
  );

}
export default App;

