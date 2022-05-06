import React from "react";
import "./HospitalVisit.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";

const HospitalVisit = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisit">
        <Typography className="smheaders">Hopital Information</Typography>
        <hr />
        <div className="hospitalInfo">
          <div>
            <Typography className="internalText">
              Name:
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
              Address:
              <span className="internalData">hamooud</span>
            </Typography>
          </div>
        </div>
        <Typography className="smheaders">Visit Information</Typography>
        <hr />
        <div className="hospitalInfo">
          <div>
            <Typography className="internalText">
              Entry Date:
              <span className="internalData">7 october 2003</span>
            </Typography>
            <Typography className="internalText">
              Time Spent:
              <span className="internalData">7 days</span>
            </Typography>
          </div>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default HospitalVisit;
