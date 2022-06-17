import React, { useState } from "react";
import { Table, TableHead, TableCell, TableRow, TableBody, Typography, IconButton } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import EmptyData from "../../components/EmpyData/EmptyData";
import "./LabTests.css";
import CustomPaper from "../../components/Paper/CustomPaper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
const LabTests = () => {
  const [open, setOpen] = useState(false);
  const [labTests, setLabTests] = useState([{ name: "aasasd" }, { name: "aasasd" }]);
  const [empty, setEmpty] = useState(false);
  const DataModel = (props) => {
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
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">
              <IconButton aria-label="delete row" sx={{ marginRight: "4px" }}>
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
        {open && <CustomPaper />}
        <div className="main">
          {empty ? (
            <EmptyData txt="No hospital visits yet" />
          ) : (
            <>
              <h1 className="headTitle">Lab Tests</h1>
              <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px" }}>
                <AddIcon fontSize="large" />
              </IconButton>
              <div className="tables">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "25%" }}>
                        <Typography className="tableHeaders">Date</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Location</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">CSV</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="tableHeaders"></Typography>
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
