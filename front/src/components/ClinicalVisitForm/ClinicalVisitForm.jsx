import React, { useState, useRef } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";
import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton } from "@mui/material";
const ClinicalVisitForm = (props) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const [tabValue, setTabValue] = useState("0");
  const [doctorName, setDoctorName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  // const [doctorId, setDoctorlId] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitCause, setVisitCause] = useState("");
  const [visitDescription, setVisitDescription] = useState("");
  const doctorId = useRef();
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const submit = async () => {
    try {
      let visit = {
        patientId,
        doctorName: doctorName,
        email: email,
        phoneNumber: phoneNumber,
        visitDate: visitDate,
        description: visitDescription,
        cause: visitCause,
        clinicAddress,
        doctorName,
      };
      const resp = await axios.post("http://localhost:5000/api/clinical/visits/add", visit);
      if (resp.statusText === "Created") {
        props.close();
      }
    } catch (err) {
      console.log(err.message);
    }
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
                <TextField size="small" label="Phone number" variant="standard" className="hospitalInputs" onChange={(e) => setPhoneNumber(e.target.value)} />
                <TextField size="small" label="Email" variant="standard" className="hospitalInputs" onChange={(e) => setEmail(e.target.value)} />
                <TextField size="small" label="Clinic Address" variant="standard" fullWidth onChange={(e) => setClinicAddress(e.target.value)} />
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
            <TextField size="small" label="Cause" variant="standard" className="hospitalInputs" onChange={(e) => setVisitCause(e.target.value)} />
            <TextField size="small" label="Visit Date" variant="standard" type="date" focused className="hospitalInputs" onChange={(e) => setVisitDate(e.target.value)} />

            <TextField size="small" label="Description" variant="standard" fullWidth multiline maxRows={3} onChange={(e) => setVisitDescription(e.target.value)} />
          </div>
          <Button variant="contained" sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }} className="submitHospital" onClick={submit}>
            Submit
          </Button>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default ClinicalVisitForm;
