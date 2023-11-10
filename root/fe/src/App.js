import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Login from "./pages/login";
import Home from './pages/home';
import Register from './pages/register';
import {useDispatch, useSelector} from "react-redux";
import { logout } from "./features/userSlice";




function App() {
  const dispatch = useDispatch();
const { user } = useSelector((state) => state.user);
console.log(user);
console.log(user);

  console.log(user);
  return (
    <div className="App">

      <button onClick={()=>{
        dispatch(logout());
      }}>Logout</button>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
