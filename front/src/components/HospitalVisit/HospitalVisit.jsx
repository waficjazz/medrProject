import React, { useEffect, useState } from "react";
import "./HospitalVisit.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { Typography, Checkbox, FormControlLabel, Link as MuiLink } from "@mui/material";

const HospitalVisit = ({ visit, hospital }) => {
  return (
    <StyledEngineProvider injectFirst>
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
            <MuiLink className="internalLink " variant="button" onClick={() => console.log("clicked")}>
              Prescriptions
            </MuiLink>
            <MuiLink className="internalLink " variant="button" onClick={() => console.log("clicked")}>
              Radioliges
            </MuiLink>
            <MuiLink className="internalLink " variant="button" onClick={() => console.log("clicked")}>
              Lab Tests
            </MuiLink>
            <MuiLink className="internalLink " variant="button" onClick={() => console.log("clicked")}>
              Surgeries
            </MuiLink>
          </div>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default HospitalVisit;
