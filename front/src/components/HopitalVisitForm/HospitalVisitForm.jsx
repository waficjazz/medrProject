import React, { useState } from "react";
import "./HopitalVisitForm.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { Tab, Tabs, TextField, Input, Autocomplete, InputAdornment } from "@mui/material";
const HospitalVisitForm = () => {
  const [tabValue, setTabValue] = useState("0");
  const [hopitalName, setHopitalName] = useState("");
  const [hopitalAddress, setHopitalAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [visitCause, setVisitCause] = useState("");
  const [visitDescription, setVisitDescription] = useState("");
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <StyledEngineProvider injectFirst>
      <div className="hVisitForm">
        <div className="inside">
          <div>
            <Tabs onChange={handleChange} value={tabValue} sx={{ marginBottom: "10px" }} TabIndicatorProps={{ sx: { background: "var(--third-blue)" } }}>
              <Tab value="0" label="Choose A Hospital" />
              <Tab value="1" label="Add A Hospital" />
            </Tabs>
          </div>
          <div className="hopitalForm">
            {tabValue === "1" && (
              <>
                <TextField
                  size="small"
                  label="Hospital Name"
                  variant="standard"
                  className="hospitalInputs"
                  focused={hopitalName !== ""}
                  onChange={(e) => setHopitalName(e.target.value)}
                />
                <TextField size="small" label="Phone number" variant="standard" className="hospitalInputs" />
                <TextField size="small" label="Email" variant="standard" className="hospitalInputs" />
                <TextField size="small" label="Address" variant="standard" fullWidth />
              </>
            )}
            {tabValue === "0" && (
              <>
                <Autocomplete
                  className="hospitalInputs"
                  size="small"
                  disablePortal
                  sx={{ marginTop: "10px" }}
                  id="bloodType"
                  options={["hammoud", "labib"]}
                  renderInput={(params) => <TextField {...params} label="Hospitals" variant="standard" />}
                />
              </>
            )}
          </div>
          <hr />
          <div className="hopitalForm">
            <TextField size="small" label="Cause" variant="standard" className="hospitalInputs" />
            <TextField size="small" label="Entry Date" variant="standard" type="date" focused className="hospitalInputs" />
            <TextField
              size="small"
              label="Time Spent"
              variant="standard"
              type="number"
              focused
              className="hospitalInputs"
              InputProps={{
                startAdornment: <InputAdornment position="start">days</InputAdornment>,
              }}
            />
            <TextField size="small" label="Description" variant="standard" fullWidth multiline maxRows={3} />
          </div>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default HospitalVisitForm;
