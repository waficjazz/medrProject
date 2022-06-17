import React, { useState } from "react";
import { Table, TableContainer, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import EmptyData from "../../components/EmpyData/EmptyData";
import ImagingForm from "../../components/ImagingForm/ImagingForm";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const Imaging = () => {
  const [labTests, setLabTests] = useState([{ name: "aasasd" }, { name: "aasasd" }]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const DataModel = (props) => {
    const { row } = props;
    return (
      <StyledEngineProvider injectFirst>
        <TableRow className="dataRow">
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
            <a href="http://www.africau.edu/images/default/sample.pdf" target="__blank">
              <Typography className="tableContents">{row.name}</Typography>
            </a>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <a href="http://www.africau.edu/images/default/sample.pdf" target="__blank">
              <Typography className="tableContents">{row.name}</Typography>
            </a>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">
              <IconButton>
                <EditIcon fontSize="small" />
              </IconButton>
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
        <div className="main">
          <ImagingForm isOpen={openForm} close={() => setOpenForm(false)} />
          {empty ? (
            <EmptyData txt="No Images yet" />
          ) : (
            <>
              <h1 className="headTitle">Imaging</h1>
              <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px", marginBottom: "10px" }} onClick={() => setOpenForm(true)}>
                <AddIcon fontSize="large" />
              </IconButton>
              <div className="tables">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "18%" }}>
                        <Typography className="tableHeaders">Name</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "18%" }}>
                        <Typography className="tableHeaders">Date</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "18%" }}>
                        <Typography className="tableHeaders">Location</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "18%" }}>
                        <Typography className="tableHeaders">Report</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "18%" }}>
                        <Typography className="tableHeaders">Image</Typography>
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
export default Imaging;
