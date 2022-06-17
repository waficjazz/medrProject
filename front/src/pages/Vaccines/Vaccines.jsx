import { Table, TableContainer, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import HospitalVisit from "../../components/HospitalVisit/HospitalVisit";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import "../HospitalVisits/HospitalVisits.css";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import axios from "axios";
import VaccineForm from "../../components/VaccineForm/VaccineForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Vaccines = () => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const [vaccinations, setVaccinations] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [reload, setReload] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/vaccination/delete/${id}`);

      setReload(!reload);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    const getVaccinations = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/vaccination/all/${patientId}`);

        setVaccinations(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getVaccinations();
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
            <Typography className="tableContents">{row.name}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.name}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.name}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">
              <IconButton>
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
      <div className="hospitalVisits">
        <div className="main">
          <VaccineForm
            isOpen={openForm}
            close={() => {
              setOpenForm(false);
              setReload(!reload);
            }}
          />
          {empty ? (
            <EmptyData txt="No hospital visits yet" />
          ) : (
            <>
              <h1 className="headTitle">Vaccines</h1>
              <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px" }} onClick={() => setOpenForm(true)}>
                <AddIcon fontSize="large" />
              </IconButton>
              <div className="tables">
                <Table sx={{ minWidth: 700, overflowY: "scroll" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "25%" }}>
                        <Typography className="tableHeaders">Vaccine</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Vaccination Date</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Shots</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="tableHeaders"></Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vaccinations.map((item, index) => {
                      return <DataModel key={index} row={item} />;
                    })}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default Vaccines;
