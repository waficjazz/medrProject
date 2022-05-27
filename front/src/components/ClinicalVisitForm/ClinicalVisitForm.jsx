import React, { useState } from "react";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";
import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton } from "@mui/material";
const ClinicalVisitForm = (props) => {
  const [tabValue, setTabValue] = useState("0");
  const [doctorName, setDoctorName] = useState("");
  const [hopitalAddress, setHopitalAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doctorId, setDoctorlId] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [visitCause, setVisitCause] = useState("");
  const [visitDescription, setVisitDescription] = useState("");
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <StyledEngineProvider injectFirst>
      <div className={props.isOpen ? "hVisitForm" : "notOpen"}>
        <div className="inside">
          <IconButton sx={{ marginLeft: "95%" }} onClick={props.close}>
            <CloseIcon fontSize="medium" />
          </IconButton>
          <div>
            <Tabs onChange={handleChange} value={tabValue} sx={{ marginBottom: "10px" }} TabIndicatorProps={{ sx: { background: "var(--third-blue)" } }}>
              <Tab value="0" label="Choose A Clinic" />
              <Tab value="1" label="Add A Clinic" />
            </Tabs>
          </div>
          <div className="hopitalForm">
            {tabValue === "1" && (
              <>
                <TextField size="small" label="Doctor's Name" variant="standard" className="hospitalInputs" onChange={(e) => setDoctorName(e.target.value)} />
                <TextField size="small" label="Phone number" variant="standard" className="hospitalInputs" />
                <TextField size="small" label="Email" variant="standard" className="hospitalInputs" />
                <TextField size="small" label="Clinic Address" variant="standard" fullWidth />
              </>
            )}
            {tabValue === "0" && (
              <>
                <Autocomplete
                  className="hospitalInputs"
                  size="small"
                  disablePortal
                  sx={{ marginTop: "10px" }}
                  id="bloodGroup"
                  options={["hammoud", "labib"]}
                  renderInput={(params) => <TextField {...params} label="Clinics" variant="standard" />}
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
            <TextField size="small" label="Doctors" variant="standard" className="hospitalInputs" />
          </div>
          <Button variant="contained" sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }} className="submitHospital">
            Submit
          </Button>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default ClinicalVisitForm;
