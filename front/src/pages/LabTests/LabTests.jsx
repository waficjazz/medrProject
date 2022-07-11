import React, { useState, useEffect } from "react";
import { Table, TableHead, TableCell, TableRow, TableBody, Typography, IconButton } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import EmptyData from "../../components/EmpyData/EmptyData";
import "./LabTests.css";
import CustomPaper from "../../components/Paper/CustomPaper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import LabTestForm from "../../components/LabTestForn/LabTestForm";
import axios from "axios";
const LabTests = () => {
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
  }
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const [open, setOpen] = useState(false);
  const [labTests, setLabTests] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formType, setFormType] = useState("add");
  const [reload, setReload] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/labtest/delete/${id}`, { headers: { authorization: `Bearer ${token}` } });
      setReload(!reload);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getLabTests = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/labtest/getall/${patientId}`);

        setLabTests(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getLabTests();
      // if (visits.length === 0) {
      //   setEmpty(true);
      // }
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [reload]);
  const DataModel = (props) => {
    const { row } = props;
    return (
      <StyledEngineProvider injectFirst>
        <TableRow className="dataRow" onClick={() => setOpen(!open)}>
          <TableCell scope="row" style={{ paddingBottom: 8, paddingTop: 8 }}>
            <Typography className="tableContents">{row.date?.toString().slice(0, 10)}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.name}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.csv}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">
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
        {/* {open && <CustomPaper />} */}
        <div className="main">
          <LabTestForm
            isOpen={openForm}
            type={formType}
            close={() => {
              setOpenForm(false);
              setReload(!reload);
            }}
          />
          {empty ? (
            <EmptyData txt="No lab tests yet" />
          ) : (
            <>
              <h1 className="headTitle">Lab Tests</h1>
              <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px" }} onClick={() => setOpenForm(true)}>
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
