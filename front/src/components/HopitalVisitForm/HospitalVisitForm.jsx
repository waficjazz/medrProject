import React, { useState } from "react";
import "./HopitalVisitForm.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { TextField, Input } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const HospitalVisitForm = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <StyledEngineProvider injectFirst>
      <div className="hVisitForm">
        <div className="inside">
          <div>
            <Tabs onChange={handleChange} value={tabValue} className="customTabs" TabIndicatorProps={{ sx: { background: "white", color: "red" } }}>
              <Tab value="0" label="Choose A Hospital" />
              <Tab value="1" label="Add A Hospital" />
            </Tabs>
          </div>
          <div className="hopitalForm">
            <TextField size="small" label="Hospital Name" variant="standard" className="hospitalInputs" />
          </div>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default HospitalVisitForm;
