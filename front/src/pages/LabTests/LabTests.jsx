import React, { useState } from "react";
import { Table, TableContainer, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import EmptyData from "../../components/EmpyData/EmptyData";
const DataModel = (props) => {
  const [open, setOpen] = useState(false);

  const { row } = props;
  return (
    <StyledEngineProvider injectFirst>
      <TableRow className="dataRow" onClick={() => setOpen(!open)}>
        <TableCell scope="row" style={{ paddingBottom: 8, paddingTop: 8 }}>
          <Typography className="tableContents">ss</Typography>
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

const LabTests = () => {
  const [labTests, setLabTests] = useState([{ name: "aasasd" }, { name: "aasasd" }]);
  const [empty, setEmpty] = useState(false);
  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisits">
        <div className="main">
          {empty ? (
            <EmptyData txt="No hospital visits yet" />
          ) : (
            <>
              <h1 className="headTitle">Lab Tests</h1>
              <div className="tables">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "25%" }}>
                        <Typography className="tableHeaders">Name</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Date</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Location</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {labTests.map((item, index) => {
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

export default LabTests;
