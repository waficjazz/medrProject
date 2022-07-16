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
import PieChart from "../../components/charts/PieChart";
const Charts = () => {
  const hospitalVisits = useRef([
    {
      name: "Male",
      value: 0,
    },
    {
      name: "Female",
      value: 0,
    },
  ]);
  const vaccines = useRef([
    {
      name: "Male",
      value: 1,
    },
    {
      name: "Female",
      value: 1,
    },
  ]);

  const getHospitalVisits = async () => {
    let obj = [];
    try {
      const response = await axios.get(process.env.REACT_APP_URL + `/analytics/hospitalVisitsMale`);
      const response1 = await axios.get(process.env.REACT_APP_URL + `/analytics/hospitalVisitsFemale`);
      obj[0] = { name: "Male", value: response.data.countMale };
      obj[1] = { name: "Female", value: response1.data.countFemale };

      hospitalVisits.current = [...obj];
      console.log(hospitalVisits.current);
      console.log(obj);
    } catch (err) {
      console.log(err.message);
      console.log(obj);
    }
    console.log(hospitalVisits.current);
  };

  const getVaccines = async () => {
    let obj;
    try {
      const response = await axios.get(process.env.REACT_APP_URL + `/analytics/vaccines/Female`);
      const response1 = await axios.get(process.env.REACT_APP_URL + `/analytics/vaccines/Male`);
      obj[0]["name"] = "Male";
      obj[0]["value"] = response1.data.countMale;
      obj[1]["name"] = "Female";
      obj[1]["value"] = response.data.count;
      vaccines.current = obj;
      console.log(hospitalVisits);
      console.log(obj);
    } catch (err) {
      console.log(err.message);
    }
    console.log(hospitalVisits);
  };

  useEffect(() => {
    getHospitalVisits();
    getVaccines();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div className="chartPage">
        <div className="chartWrapper">
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%", color: "var(--third-blue)", fontWeight: "bold" }}>
            Hospital Visits
          </Typography>
          <PieChart main={hospitalVisits.current} />
        </div>
        <div className="chartWrapper">
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%", color: "var(--third-blue)", fontWeight: "bold" }}>
            Vaccines
          </Typography>
          <PieChart main={vaccines.current} />
        </div>
        {/* <div className="chartWrapper">
          <PieChart />
        </div>
        <div className="chartWrapper">
          <PieChart />
        </div> */}
      </div>
    </StyledEngineProvider>
  );
};

export default Charts;
