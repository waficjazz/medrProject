import { Table, TableContainer, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import ClinicalVisit from "../../components/ClinicalVisit/ClinicalVisit";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import "./ClinicalVisits.css";
import AddIcon from "@mui/icons-material/Add";
import ClinicalVisitForm from "../../components/ClinicalVisitForm/ClinicalVisitForm";

const DataModel = (props) => {
  const [open, setOpen] = React.useState(false);
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
            <ClinicalVisit />
          </Collapse>
        </TableCell>
      </TableRow>
    </StyledEngineProvider>
  );
};

const ClinicalVisits = () => {
  const [visits, setVisits] = useState([{ name: "aasasd" }, { name: "aasasd" }]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisits">
        <div className="main">
          <ClinicalVisitForm isOpen={openForm} close={() => setOpenForm(false)} />
          {empty ? (
            <EmptyData txt="No Clinical visits yet" />
          ) : (
            <>
              <h1 className="headTitle">Clinical Visits</h1>
              <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px" }}>
                <AddIcon fontSize="large" onClick={() => setOpenForm(true)} />
              </IconButton>
              <div className="tables">
                <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "5px" }}></TableCell>
                      <TableCell align="left" sx={{ width: "30%" }}>
                        <Typography className="tableHeaders">Visit Id</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "30%" }}>
                        <Typography className="tableHeaders">Visit Date</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "50%" }}>
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

export default ClinicalVisits;
