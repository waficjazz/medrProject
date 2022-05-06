import React from "react";
import { useEffect } from "react";
import SideBar from "../../components/SideBar/SideBar";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import ClinicalVisits from "../ClinicalVisits/ClinicalVisits";
import HospitalVisits from "../HospitalVisits/HospitalVisits";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./MainPage.css";
// import { useNavigate } from "react-router-dom";
const MainPage = () => {
  return (
    <>
      <div className="mainPage">
        <SideBar />
        <Routes>
          <Route path="/" element={<PersonalInfo />} />
          <Route path="/hospital" element={<HospitalVisits />} />
          <Route path="/clinic" element={<ClinicalVisits />} />
        </Routes>
      </div>
    </>
  );
};

export default MainPage;
