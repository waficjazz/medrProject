import React from "react";

import SideBar from "../../components/SideBar/SideBar";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import ClinicalVisits from "../ClinicalVisits/ClinicalVisits";
import HospitalVisits from "../HospitalVisits/HospitalVisits";
import LabTests from "../LabTests/LabTests";
import Imaging from "../Imaging/Imaging";
import { Routes, Route } from "react-router-dom";
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
          <Route path="/lab" element={<LabTests />} />
          <Route path="/imaging" element={<Imaging />} />
        </Routes>
      </div>
    </>
  );
};

export default MainPage;
