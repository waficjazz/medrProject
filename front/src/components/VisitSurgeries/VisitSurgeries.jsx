import React, { useEffect, useState } from "react";
import "../HospitalVisit/HospitalVisit.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { Typography, Checkbox, FormControlLabel, Link as MuiLink, Table, TableCell, TableRow, TableHead, TableBody, IconButton } from "@mui/material";
import HospitalVisit from "../HospitalVisit/HospitalVisit";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const VisitSurgeries = ({ visitId, close }) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  let token = "";
  token = highStoredData?.token;
  const patientId = storedData.uid;
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [surgeries, setSurgeries] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getVisitSurgeries = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/surgery/visit/${patientId}/${visitId}`);
        setSurgeries(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getVisitSurgeries();
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
        <TableRow className="dataRow" sx={{ height: "40px" }}>
          <TableCell scope="row" style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents"></Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.name}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.cause}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{hospital.hospitalName}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.date?.toString().slice(0, 10)}</Typography>
          </TableCell>
          {/* <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}> */}
          {/* <Typography className="tableContents">
              <IconButton>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="delete row" sx={{ marginRight: "4px" }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Typography> */}
          {/* </TableCell> */}
        </TableRow>
        <TableRow>
          {/* <TableCell className="moreData" colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              {/* <ClinicalVisit visit={row} /> */}
          {/* </Collapse>
          </TableCell> */}{" "}
        </TableRow>
      </StyledEngineProvider>
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisit">
        <Typography className="smheaders">
          <IconButton>
            <ArrowBackIcon fontSize="small" onClick={close} />
          </IconButton>
          Visit Surgeries
        </Typography>
        <hr />
        <div className="hospitalInfo">
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
                  {/* <TableCell>
                    <Typography className="tableHeaders"></Typography>
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {surgeries.map((item, index) => {
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

export default VisitSurgeries;
