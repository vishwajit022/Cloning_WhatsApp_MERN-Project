import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import { CallIcon } from "./svg";
import Home from './pages/home';


function App() {
  return (
    <div className="App">
      <h1>HE;llo</h1>
      <CallIcon className="fill-red-600" />
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
