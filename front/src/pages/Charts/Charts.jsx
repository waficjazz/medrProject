import { Table, TableSortLabel, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import HospitalVisit from "../../components/HospitalVisit/HospitalVisit";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import "../HospitalVisits/HospitalVisits.css";
import AddIcon from "@mui/icons-material/Add";
import HospitalVisitForm from "../../components/HopitalVisitForm/HospitalVisitForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Imaging from "../Imaging/Imaging";
import VisitImagings from "../../components/VisitImagings/VisitImagings";
import BChart from "../../components/charts/BChart";
import AChart from "../../components/charts/AChart";
import PChart from "../../components/charts/PChart";
const Charts = () => {
  const [hospitalVisits, setHospitalVisits] = useState([]);
  const [clinicalVisits, setClinicalVisits] = useState([]);
  const [vaccines, setVaccines] = useState([]);
  const [surgeries, setSurgeries] = useState([]);
  const [cd, setCd] = useState([]);
  const [allergies, setAllergies] = useState([]);

  useEffect(() => {
    const allergies = async () => {
      let obj = [];
      try {
        const response = await axios.get(process.env.REACT_APP_URL + `/analytics/allergies/Female`);
        const response1 = await axios.get(process.env.REACT_APP_URL + `/analytics/allergies/Male`);
        obj[0] = { name: "Female", value: response.data.count };
        obj[1] = { name: "Male", value: response1.data.count };

        setAllergies([...obj]);
      } catch (err) {
        console.log(err.message);
      }
    };
    const chronicDisease = async () => {
      let obj = [];
      try {
        const response = await axios.get(process.env.REACT_APP_URL + `/analytics/chronicDisease/Female`);
        const response1 = await axios.get(process.env.REACT_APP_URL + `/analytics/chronicDisease/Male`);
        obj[0] = { name: "Female", value: response.data.count };
        obj[1] = { name: "Male", value: response1.data.count };

        setCd([...obj]);
      } catch (err) {
        console.log(err.message);
      }
    };

    const clinicalVisits = async () => {
      let obj = [];
      try {
        const response = await axios.get(process.env.REACT_APP_URL + `/analytics/clinicalVisits/Female`);
        const response1 = await axios.get(process.env.REACT_APP_URL + `/analytics/clinicalVisits/Male`);
        obj[0] = { name: "Female", value: response.data.count };
        obj[1] = { name: "Male", value: response1.data.count };

        setClinicalVisits([...obj]);
      } catch (err) {
        console.log(err.message);
      }
    };
    const getSurgeries = async () => {
      let obj = [];
      try {
        const response = await axios.get(process.env.REACT_APP_URL + `/analytics/surgeries/Female`);
        const response1 = await axios.get(process.env.REACT_APP_URL + `/analytics/surgeries/Male`);
        obj[0] = { name: "Female", value: response.data.count };
        obj[1] = { name: "Male", value: response1.data.count };

        setSurgeries([...obj]);
      } catch (err) {
        console.log(err.message);
      }
    };
    const getVaccines = async () => {
      let obj = [];
      try {
        const response = await axios.get(process.env.REACT_APP_URL + `/analytics/vaccines/Female`);
        const response1 = await axios.get(process.env.REACT_APP_URL + `/analytics/vaccines/Male`);
        obj[0] = { name: "Female", value: response.data.count };
        obj[1] = { name: "Male", value: response1.data.count };

        setVaccines([...obj]);
      } catch (err) {
        console.log(err.message);
      }
    };
    const getHospitalVisits = async () => {
      let obj = [];
      try {
        const response = await axios.get(process.env.REACT_APP_URL + `/analytics/hospitalVisits/Female`);
        const response1 = await axios.get(process.env.REACT_APP_URL + `/analytics/hospitalVisits/Male`);
        obj[0] = { name: "Female", value: response.data.count };
        obj[1] = { name: "Male", value: response1.data.count };
        console.log(response1);
        setHospitalVisits([...obj]);
      } catch (err) {
        console.log(err.message);
      }
    };
    getHospitalVisits();
    getVaccines();
    getSurgeries();
    clinicalVisits();
    chronicDisease();
    allergies();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div className="chartPage">
        <div className="chartWrapper">
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%", color: "var(--third-blue)", fontWeight: "bold" }}>
            Hospital Visits
          </Typography>
          <PChart main={hospitalVisits} />
        </div>
        <div className="chartWrapper">
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%", color: "var(--third-blue)", fontWeight: "bold" }}>
            Vaccines
          </Typography>
          <PChart main={vaccines} />
        </div>
        <div className="chartWrapper">
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%", color: "var(--third-blue)", fontWeight: "bold" }}>
            Clinical Visits
          </Typography>
          <PChart main={clinicalVisits} />
        </div>
        <div className="chartWrapper">
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%", color: "var(--third-blue)", fontWeight: "bold" }}>
            Surgeries
          </Typography>
          <PChart main={surgeries} />
        </div>
        <div className="chartWrapper">
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%", color: "var(--third-blue)", fontWeight: "bold" }}>
            Chronic Disease
          </Typography>
          <PChart main={cd} />
        </div>
        <div className="chartWrapper">
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%", color: "var(--third-blue)", fontWeight: "bold" }}>
            Allergies
          </Typography>
          <PChart main={allergies} />
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default Charts;
