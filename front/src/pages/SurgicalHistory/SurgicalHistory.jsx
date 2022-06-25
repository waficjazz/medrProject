import { Table, TableContainer, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import AddIcon from "@mui/icons-material/Add";
import SurgeryForm from "../../components/SurgeryForm/SurgeryForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Surgery from "../../components/Surgery/Surgery";
const SurgicalHistory = () => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const [surgeries, setSurgeries] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const [reload, setReload] = useState(false);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/surgery/delete/${id}`);

      setReload(!reload);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getSurgeries = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/surgery/all/${patientId}`);
        setSurgeries(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getSurgeries();
      // if (visits.length === 0) {
      //   setEmpty(true);
      // }

      console.log(surgeries);
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [reload]);

  const DataModel = (props) => {
    const [open, setOpen] = React.useState(false);
    const { row } = props;
    const [hospital, setHospital] = useState([]);
    const getHospital = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hospital/${id}`);
        let hospital = await response.data;
        setHospital(hospital);
      } catch (err) {
        console.log(err.message);
      }
    };
    const getVerfiedHospital = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hospital/verified/${id}`);
        let hospital = await response.data;
        setHospital(hospital);
      } catch (err) {
        console.log(err.message);
      }
    };
    useEffect(() => {
      let isApiSubscribed = true;
      if (isApiSubscribed) {
        if (!row.verifiedHospital) {
          getHospital(row.hospitalId);
        } else {
          getVerfiedHospital(row.hospitalId);
        }
      }
      return () => {
        isApiSubscribed = false;
      };
    }, []);
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
            <Typography className="tableContents">{row.cause}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.date?.toString().slice(0, 10)}</Typography>
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
        <TableRow>
          <TableCell className="moreData" colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Surgery surgery={row} hospital={hospital} />
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
          <SurgeryForm
            isOpen={openForm}
            close={() => {
              setOpenForm(false);
              setReload(!reload);
            }}
          />
          {empty ? (
            <EmptyData txt="No Surgeries  yet" />
          ) : (
            <>
              <h1 className="headTitle">Surgeries</h1>
              <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px" }} onClick={() => setOpenForm(true)}>
                <AddIcon fontSize="large" />
              </IconButton>
              <div className="tables">
                <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "5px" }}></TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Name</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Cause</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Hospital</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Date</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="tableHeaders"></Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {surgeries.map((item, index) => {
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

export default SurgicalHistory;
