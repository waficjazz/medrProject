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
            <Route path="/" element={<div>hello</div>} />
            <Route path="/h" element={<div>hello11</div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default MainPage;
