import { Typography } from "@mui/material";
import React from "react";
import "./PersonalInfo.css";
import { StyledEngineProvider } from "@mui/material/styles";
const PersonalInfo = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <div className="personalPage">
          <div className="personalInfo">
            <Typography sx={{ fontWeight: "bold", fontSize: "1.35rem", color: "var(--main-blue)" }}>Personal Information</Typography>
            <hr />
            <div className="personalInfoBody">
              <Typography className="internalText">
                First Name:<span className="internalData">wafic</span>
              </Typography>
              <Typography className="internalText">
                Last Name:<span className="internalData">wafic</span>
              </Typography>
              <Typography className="internalText">
                Father's Name:<span className="internalData">wafic</span>
              </Typography>
              <Typography className="internalText">
                Mother's Name:<span className="internalData">wafic</span>
              </Typography>
              <Typography className="internalText">
                Email:<span className="internalData">waficojazzaro@gmail.com</span>
              </Typography>
              <Typography className="internalText">
                Phone Number:<span className="internalData">76099876</span>
              </Typography>
              <Typography className="internalText">
                Governate:<span className="internalData">Mount-Lebanon</span>
              </Typography>
              <Typography className="internalText">
                City:<span className="internalData">Daraya</span>
              </Typography>
              <Typography className="internalText address">
                Address:<span className="internalData">Daraya Main street 1st floor</span>
              </Typography>
            </div>
          </div>
          <div className="medicalInfo">
            <Typography sx={{ fontWeight: "bold", fontSize: "1.35rem", color: "var(--main-blue)" }}>Medical Information</Typography>
            <hr />
          </div>
        </div>
      </StyledEngineProvider>
    </>
  );
};

export default PersonalInfo;
