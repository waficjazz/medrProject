import React from "react";
import SideBar from "../../components/Navbar/SideBar/SideBar";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./MainPage.css";
const MainPage = () => {
  return (
    <>
      <div className="mainPage">
        <SideBar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PersonalInfo />} />
            <Route path="/h" element={<div></div>} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default MainPage;
