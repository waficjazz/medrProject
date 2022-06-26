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

const Charts = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="chartPage">
        <BChart />
        <AChart />
        <AChart />
        <AChart />
        <AChart />
        <AChart />
      </div>
    </StyledEngineProvider>
  );
};

export default Charts;
