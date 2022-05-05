import React from "react";
import "./HospitalVisit.css";
import { StyledEngineProvider } from "@mui/material/styles";

const HospitalVisit = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisit">HospitalVisit</div>
    </StyledEngineProvider>
  );
};

export default HospitalVisit;
