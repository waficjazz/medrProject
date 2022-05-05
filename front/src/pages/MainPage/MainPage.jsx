import React from "react";
import SideBar from "../../components/Navbar/SideBar/SideBar";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import HospitalVisits from "../HospitalVisit/HospitalVisits";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./MainPage.css";
const MainPage = () => {
  return (
    <>
      <div className="mainPage">
        <BrowserRouter>
          <SideBar />
          <Routes>
            <Route path="/" element={<PersonalInfo />} />
            <Route path="/hospital" element={<HospitalVisits />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default MainPage;
