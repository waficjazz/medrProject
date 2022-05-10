import React from "react";
import "./HopitalVisitForm.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { TextField, Input } from "@mui/material";
const HospitalVisitForm = () => {
  return (
    <StyledEngineProvider>
      <div className="hVisitForm">
        <div className="inside">
          <Input size="small" datatype="dsd" />
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default HospitalVisitForm;
