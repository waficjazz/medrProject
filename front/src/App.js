import React, { useState } from "react";
import MainPage from "./pages/MainPage/MainPage";
import SideBar from "./components/SideBar/SideBar";
import Navbar from "./components/Navbar/Navbar";
import SignUp from "./components/SignUpForm/SignUp";
import { ShowContext } from "./context";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  const [show, setShow] = useState(false);
  return (
    <ShowContext.Provider value={{ show, setShow }}>
      <BrowserRouter>
        {/* <SignUp /> */}
        <Navbar />
        <MainPage />
      </BrowserRouter>
    </ShowContext.Provider>
  );
}

export default App;
