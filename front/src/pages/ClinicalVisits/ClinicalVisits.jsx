import { Table, TableContainer, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import ClinicalVisit from "../../components/ClinicalVisit/ClinicalVisit";
import React from "react";
import "./ClinicalVisits.css";

const DataModel = (props) => {
  const [open, setOpen] = React.useState(false);
  const { row } = props;
  return (
    <StyledEngineProvider injectFirst>
      <TableRow className="dataRow">
        <TableCell scope="row" style={{ paddingBottom: 2, paddingTop: 2 }}>
          <Typography className="tableContents">
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            ss
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
  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisits">
        <div className="main">
          <h1 className="headTitle">Hospital Visits</h1>
          <div className="tables">
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography className="tableHeaders">Hospital Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="tableHeaders">Cause</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="tableHeaders">Entry Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="tableHeaders">Time Spent</Typography>
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
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default ClinicalVisits;