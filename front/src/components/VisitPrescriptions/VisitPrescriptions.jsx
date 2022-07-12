import { Table, TableContainer, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography, Button, TableSortLabel } from "@mui/material";
import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import HospitalVisit from "../HospitalVisit/HospitalVisit";

import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import PrescForm from "../../components/PrescriptionForm/PrescriptionForm";
import axios from "axios";
import VaccineForm from "../../components/VaccineForm/VaccineForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OnePrescription from "../../components/OnePrescription/OnePrescription";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const VisitPrescriptions = ({ visitId, close }) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const [prescriptions, setPrescriptions] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [reload, setReload] = useState(false);
  const [formType, setFormType] = useState("add");
  const [prescId, setPrescId] = useState("");
  const [direction, setDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("1");
  const sortByName = (prop) => {
    setDirection(direction === "desc" ? "asc" : "desc");
    if (prop === "date") {
      const sorted = [...prescriptions].sort((a, b) => {
        return direction === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
      });
      setPrescriptions(sorted);
    } else {
      const sorted = [...prescriptions].sort((a, b) => {
        if (a[prop] < b[prop]) {
          return direction === "desc" ? 1 : -1;
        }
        if (a[prop] > b[prop]) {
          return direction === "desc" ? -1 : 1;
        }
        return 0;
      });
      setPrescriptions(sorted);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(process.env.REACT_APP_URL + `/prescription/delete/${id}`);

      setReload(!reload);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      setFormType("edit");
      setPrescId(id);
      setOpenForm(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getPrescriptions = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_URL + `/prescription/all/${patientId}`);

        setPrescriptions(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getPrescriptions();
      // if (visits.length === 0) {
      //   setEmpty(true);
      // }
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [reload]);

  const DataModel = (props) => {
    const [open, setOpen] = useState(false);
    const { row } = props;
    return (
      <StyledEngineProvider injectFirst>
        <TableRow className="dataRow">
          <TableCell style={{ paddingBottom: 2, paddingTop: 2, height: "40px" }}>
            <Typography className="tableContents">{row.date?.toString().slice(0, 10)}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.location}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.issuer}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography noWrap={true} className="tableContents" sx={{ width: "200px" }}>
              {row.description}
            </Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">
              <IconButton onClick={() => handleEdit(row._id)}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="delete row" sx={{ marginRight: "4px" }} onClick={() => handleDelete(row._id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Typography>
          </TableCell>
        </TableRow>
      </StyledEngineProvider>
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisit">
        <Typography className="smheaders">
          <IconButton>
            <ArrowBackIcon fontSize="small" onClick={close} />
          </IconButton>
          Visit Prescriptions
        </Typography>
        <hr />
        <div className="hospitalInfo">
          <div className="tables">
            <Table sx={{ minWidth: 700, overflowY: "scroll" }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" sx={{ width: "18%" }} key="1">
                    <Typography className="tableHeaders">Date</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ width: "20%" }} key="2">
                    <Typography className="tableHeaders">Location</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ width: "20%" }}>
                    <Typography className="tableHeaders">Isuser</Typography>
                  </TableCell>
                  <TableCell align="left" sx={{ width: "22%" }}>
                    <Typography className="tableHeaders">Description</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="tableHeaders"></Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {prescriptions.map((item, index) => {
                  return <DataModel key={index} row={item} />;
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default VisitPrescriptions;
