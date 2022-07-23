import React, { useContext, useEffect, useState } from "react";
import SignUp from "../../components/SignUpForm/SignUp";
import SideBar from "../../components/SideBar/SideBar";
import PersonalInfo from "../PersonalInfo/PersonalInfo";
import ClinicalVisits from "../ClinicalVisits/ClinicalVisits";
import HospitalVisits from "../HospitalVisits/HospitalVisits";
import SurgicalHistory from "../SurgicalHistory/SurgicalHistory";
import Vaccines from "../Vaccines/Vaccines";
import LabTests from "../LabTests/LabTests";
import Imaging from "../Imaging/Imaging";
import Charts from "../Charts/Charts";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AreaCharts from "../Charts/AreaCharts";
import BChart from "../../components/charts/BChart";
import { addInfo } from "../../reducers/patientReducer";
import { addDoctor } from "../../reducers/doctorReducer";
import { addHospital } from "../../reducers/hospitalReducer";
import { Routes, Route } from "react-router-dom";
import { ShowContext, RegContext, LoadingContext } from "../../context";
import "./MainPage.css";
import Prescriptions from "../Prescriptions/Presrciptions";
import Loading from "../../components/Loading";

const MainPage = () => {
  const { show, setShow } = useContext(ShowContext);
  const dispatch = useDispatch();
  const loading = useContext(LoadingContext);
  let id = 0;
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  useEffect(() => {
    console.log(process.env.REACT_APP_URL);
    let uid;
    if (!show) {
      const storedData = JSON.parse(localStorage.getItem("userData"));

      if (storedData != null) {
        uid = storedData.uid;
      } else {
        uid = id;
      }

      const getDoctor = async () => {
        let uid = highStoredData.uid;
        try {
          loading.setIsLoading(true);
          const response = await axios.get(process.env.REACT_APP_URL + `/doctor/verified/${uid}`);
          dispatch(addDoctor(response.data));
          loading.setIsLoading(false);
        } catch (err) {
          console.log(err.message);
        }
      };

      const getHospital = async () => {
        let uid = highStoredData.uid;
        try {
          loading.setIsLoading(true);
          const response = await axios.get(process.env.REACT_APP_URL + `/hospital/verified/${uid}`);
          dispatch(addHospital(response.data));
          loading.setIsLoading(false);
        } catch (err) {
          console.log(err.message);
        }
      };
      const getPatientInfo = async () => {
        try {
          loading.setIsLoading(true);
          const response = await axios.get(process.env.REACT_APP_URL + `/patient/info/${uid}`);

          dispatch(addInfo(response.data));
          loading.setIsLoading(false);
        } catch (err) {
          console.log(err.message);
        }
      };
      if (highStoredData) {
        if (highStoredData.type === "hospital") {
          getHospital();
        }
        if (highStoredData.type === "doctor") {
          getDoctor();
        }
      }

      getPatientInfo();
    }
  }, [show]);

  return (
    <>
      <div className="mainPage">
        <SideBar />

        <Routes>
          <Route path="/:id" element={<PersonalInfo />} />
          <Route path="/" element={<PersonalInfo />} />
          <Route path="/bs" element={<BChart />} />
          <Route path="/hospital" element={<HospitalVisits />} />
          <Route path="/clinic" element={<ClinicalVisits />} />
          <Route path="/lab" element={<LabTests />} />
          <Route path="/imaging" element={<Imaging />} />
          <Route path="/vaccines" element={<Vaccines />} />
          <Route path="/surgical" element={<SurgicalHistory />} />
          <Route path="/gendercharts" element={<Charts />} />
          <Route path="/monthscharts" element={<AreaCharts />} />
          <Route path="/presc" element={<Prescriptions />} />
        </Routes>
      </div>
    </>
  );
};

export default MainPage;
