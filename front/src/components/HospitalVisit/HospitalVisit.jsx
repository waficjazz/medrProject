import React, { useEffect, useState } from "react";
import "./HospitalVisit.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { Checkbox, FormControlLabel, Link as MuiLink } from "@mui/material";
import { Typography, Table, TableCell, TableRow, TableHead, TableBody, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisitLabs from "../VisitLabs/VisitLabs";
import VisitImagings from "../VisitImagings/VisitImagings";
import VisitSurgeries from "../VisitSurgeries/VisitSurgeries";
import VisitPrescriptions from "../VisitPrescriptions/VisitPrescriptions";
const HospitalVisit = ({ visit, hospital, close }) => {
  const [testShow, setTestShow] = useState("");
  return (
    <StyledEngineProvider injectFirst>
      {testShow == "" && (
        <div className="hospitalVisit">
          <Typography className="smheaders">Hospital Information</Typography>
          <hr />
          <div className="hospitalInfo">
            <div>
              <Typography className="internalText">
                Name:
                <span className="internalData">{hospital.hospitalName}</span>
              </Typography>
              <Typography className="internalText">
                Phone Number:
                <span className="internalData">{hospital.phoneNumber}</span>
              </Typography>
              <Typography className="internalText">
                Email:
                <span className="internalData">{hospital.email}</span>
              </Typography>
              <Typography className="internalText address">
                Address:
                <span className="internalData">{hospital.address}</span>
              </Typography>
            </div>
          </div>
          <Typography className="smheaders">Visit Information</Typography>
          <hr />
          <div className="hospitalInfo">
            <div>
              <Typography className="internalText">
                Cause:
                <span className="internalData">{visit.cause}</span>
              </Typography>
              <Typography className="internalText">
                Entry Date:
                <span className="internalData">{visit.entryDate?.toString().slice(0, 10)}</span>
              </Typography>
              <Typography className="internalText">
                Time Spent:
                <span className="internalData">{visit.timeSpent}</span>
              </Typography>
              <Typography className="internalText address">
                Description:
                <span className="internalData">asdf asdf asdfa dsgadfhfgjsf jdfghj rfg sdsfgds</span>
              </Typography>
              <Typography className="internalText address">
                Doctors:
                <span className="internalData">doctor1 , doctor2 </span>
              </Typography>
              <MuiLink className="internalLink " variant="button" onClick={() => setTestShow("prescriptions")}>
                Prescriptions
              </MuiLink>
              <MuiLink className="internalLink " variant="button" onClick={() => setTestShow("imagings")}>
                Imaging
              </MuiLink>
              <MuiLink className="internalLink " variant="button" onClick={() => setTestShow("labs")}>
                Lab Tests
              </MuiLink>
              <MuiLink className="internalLink " variant="button" onClick={() => setTestShow("surgeries")}>
                Surgeries
              </MuiLink>
            </div>
          </div>
        </div>
      )}
      {testShow == "prescriptions" && <VisitPrescriptions visitId={visit._id} close={() => setTestShow("")} />}
      {testShow == "imagings" && <VisitImagings visitId={visit._id} close={() => setTestShow("")} />}
      {testShow == "labs" && <VisitLabs visitId={visit._id} close={() => setTestShow("")} />}
      {testShow == "surgeries" && <VisitSurgeries visitId={visit._id} close={() => setTestShow("")} />}
    </StyledEngineProvider>
  );
};

export default HospitalVisit;
