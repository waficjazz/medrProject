import { Table, TableContainer, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import HospitalVisit from "../../components/HospitalVisit/HospitalVisit";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import "../HospitalVisits/HospitalVisits.css";
import AddIcon from "@mui/icons-material/Add";
import HospitalVisitForm from "../../components/HopitalVisitForm/HospitalVisitForm";

const Vaccines = () => {
  const [visits, setVisits] = useState([{ name: "aasasd" }, { name: "aasasd" }]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
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
              <h1 className="headTitle">Vaccines</h1>
              <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px" }}>
                <AddIcon fontSize="large" onClick={() => setOpenForm(true)} />
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

export default Vaccines;