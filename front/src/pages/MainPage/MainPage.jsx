import React from "react";
import SideBar from "../../components/Navbar/SideBar/SideBar";
import SignUp from "../../components/Navbar/SignUpForm/SignUp";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./MainPage.css";
const MainPage = () => {
  return (
    <>
      <div className="mainPage">
        <SideBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<div></div>} />
            <Route path="/h" element={<div></div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default MainPage;
