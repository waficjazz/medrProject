import React, { useEffect, useState } from "react";
import "../HospitalVisit/HospitalVisit.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { Typography, Checkbox, FormControlLabel, Link as MuiLink, Table, TableCell, TableRow, TableHead, TableBody, IconButton } from "@mui/material";
import HospitalVisit from "../HospitalVisit/HospitalVisit";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const VisitImagings = ({ visitId, close }) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  let token = "";
  token = highStoredData?.token;
  const patientId = storedData.uid;
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [imagings, setImagings] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const getVisitImagings = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_URL + `/imaging/visit/${patientId}/${visitId}`);
        setImagings(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getVisitImagings();
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
        <TableRow className="dataRow">
          <TableCell scope="row" style={{ paddingBottom: 8, paddingTop: 8 }}>
            <Typography className="tableContents">{row.name}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.date?.toString().slice(0, 10)}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.location}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <a href={row.report} target="__blank">
              <Typography className="tableContents">report</Typography>
            </a>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <a href={row.images[0]} target="__blank">
              <Typography className="tableContents">imaging</Typography>
            </a>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">
              <IconButton>
                <EditIcon fontSize="small" />
              </IconButton>
              {/* onClick={() => handleDelete(row._id)} */}
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
      <div className="hospitalVisit">
        <Typography className="smheaders">
          <IconButton>
            <ArrowBackIcon fontSize="small" onClick={close} />
          </IconButton>
          Visit Imagings
        </Typography>
        <hr />
        <div className="hospitalInfo">
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
                {imagings.map((item, index) => {
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

export default VisitImagings;
