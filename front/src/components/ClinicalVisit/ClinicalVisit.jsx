import React from "react";
import "./ClinicalVisit.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { Typography, Checkbox, FormControlLabel, Link as MuiLink } from "@mui/material";

const ClinicalVisit = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisit">
        <Typography className="smheaders">Doctor Information</Typography>
        <hr />
        <div className="hospitalInfo">
          <div>
            <Typography className="internalText">
              Doctor's Name:
              <span className="internalData">hamooud</span>
            </Typography>
            <Typography className="internalText">
              Phone Number:
              <span className="internalData">76082698</span>
            </Typography>
            <Typography className="internalText">
              Email:
              <span className="internalData">hamooud@gmail.com</span>
            </Typography>
            <Typography className="internalText address">
              Clinic Address:
              <span className="internalData">hamooud</span>
            </Typography>
          </div>
        </div>
        <Typography className="smheaders">Visit Information</Typography>
        <hr />
        <div className="hospitalInfo">
          <div>
            <Typography className="internalText">
              Cause:
              <span className="internalData">Headache</span>
            </Typography>
            <Typography className="internalText">
              Date:
              <span className="internalData">7 october 2003</span>
            </Typography>
            <Typography className="internalText">
              Time Spent:
              <span className="internalData">7 days</span>
            </Typography>
            <Typography className="internalText address">
              Description:
              <span className="internalData">asdf asdf asdfa dsgadfhfgjsf jdfghj rfg sdsfgds</span>
            </Typography>
            <MuiLink className="internalLink " variant="button" onClick={() => console.log("clicked")}>
              Prescriptions
            </MuiLink>
            <MuiLink className="internalLink " variant="button" onClick={() => console.log("clicked")}>
              Echos
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
