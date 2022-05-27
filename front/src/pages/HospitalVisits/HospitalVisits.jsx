import { Table, TableContainer, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import HospitalVisit from "../../components/HospitalVisit/HospitalVisit";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import "./HospitalVisits.css";
import AddIcon from "@mui/icons-material/Add";
import HospitalVisitForm from "../../components/HopitalVisitForm/HospitalVisitForm";

const HospitalVisits = () => {
  const [visits, setVisits] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    const getVisits = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/hospital/visits/6288751aaa211e70072bd262");
        setVisits(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getVisits();
  }, []);
  const DataModel = (props) => {
    const [open, setOpen] = useState(false);
    const { row } = props;
    return (
      <StyledEngineProvider injectFirst>
        <TableRow className="dataRow" onClick={() => setOpen(!open)}>
          <TableCell scope="row" style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.cause}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.name}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.name}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.name}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="moreData" colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <HospitalVisit />
            </Collapse>
          </TableCell>
        </TableRow>
      </StyledEngineProvider>
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisits">
        <div className="main">
          <HospitalVisitForm isOpen={openForm} close={() => setOpenForm(false)} />
          {empty ? (
            <EmptyData txt="No hospital visits yet" />
          ) : (
            <>
              <h1 className="headTitle">Hospital Visits</h1>
              <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px" }}>
                <AddIcon fontSize="large" onClick={() => setOpenForm(true)} />
              </IconButton>
              <div className="tables">
                <Table sx={{ minWidth: 700, overflowY: "scroll" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "5px" }}></TableCell>
                      <TableCell align="left" sx={{ width: "25%" }}>
                        <Typography className="tableHeaders">Hospital Name</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Entry Date</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Time Spent</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="tableHeaders">Cause</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {visits.map((item, index) => {
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

export default HospitalVisits;
