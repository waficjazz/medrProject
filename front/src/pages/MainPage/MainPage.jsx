import React from "react";

import SideBar from "../../components/SideBar/SideBar";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import ClinicalVisits from "../ClinicalVisits/ClinicalVisits";
import HospitalVisits from "../HospitalVisits/HospitalVisits";
import Vaccines from "../Vaccines/Vaccines";
import LabTests from "../LabTests/LabTests";
import Imaging from "../Imaging/Imaging";
import BChart from "../../components/charts/BChart";
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
          <Route path="/bs" element={<BChart />} />
          <Route path="/hospital" element={<HospitalVisits />} />
          <Route path="/clinic" element={<ClinicalVisits />} />
          <Route path="/lab" element={<LabTests />} />
          <Route path="/imaging" element={<Imaging />} />
          <Route path="/vaccines" element={<Vaccines />} />
        </Routes>
      </div>
    </>
  );
};

export default MainPage;
