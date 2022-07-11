import React from "react";
import "./ClinicalVisit.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { Typography, Checkbox, FormControlLabel, Link as MuiLink } from "@mui/material";

const ClinicalVisit = ({ visit }) => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisit">
        <Typography className="smheaders">Doctor Information</Typography>
        <hr />
        <div className="hospitalInfo">
          <div>
            <Typography className="internalText">
              Doctor's Name:
              <span className="internalData">{visit.firstName || visit.name}</span>
            </Typography>
            <Typography className="internalText">
              Proficiency:
              <span className="internalData">{visit.proficiency[0]}</span>
            </Typography>
            <Typography className="internalText">
              Phone Number:
              <span className="internalData">{visit.phoneNumber}</span>
            </Typography>
            <Typography className="internalText">
              Email:
              <span className="internalData">{visit.email}</span>
            </Typography>
            <Typography className="internalText address">
              Clinic Address:
              <span className="internalData">{visit.clinicAddress}</span>
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
              Date:
              <span className="internalData">{visit.visitDate?.toString().slice(0, 10)}</span>
            </Typography>

            <Typography className="internalText address">
              Description:
              <span className="internalData">{visit.description}</span>
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
          </div>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default ClinicalVisit;
