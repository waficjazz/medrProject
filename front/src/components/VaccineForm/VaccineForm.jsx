import React, { useState } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";

import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
const VaccineForm = (props) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  // const patient = useSelector((state) => state.patient.value);
  const [tabValue, setTabValue] = useState("0");
  const [notes, setNotes] = useState("");
  const [shots, setShots] = useState("1");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState();
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const submit = async () => {
    let vaccination = {
      patientId,
      name,
      notes,
      shots,
      date,
      location,
    };
    try {
      const res = await axios.post("http://localhost:5000/api/vaccination/add", vaccination);
      if (res.statusText === "Created") {
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
          <IconButton sx={{ marginLeft: "95%", float: "left" }} onClick={props.close}>
            <CloseIcon fontSize="medium" />
          </IconButton>
          <Typography variant="body1" sx={{ marginBottom: "14px", marginLeft: "2px", color: "var(--main-blue)", fontWeight: "bolder", fontSize: "1.1rem", height: "10%" }}>
            ADD VACCINATION
          </Typography>
          <hr />
          <div className="hopitalForm">
            <TextField size="small" label="Name" variant="standard" className="hospitalInputs" onChange={(e) => setName(e.target.value)} />
            <TextField size="small" label="Date" variant="standard" type="date" focused className="hospitalInputs" onChange={(e) => setDate(e.target.value)} />
            <TextField size="small" label="Location" variant="standard" focused className="hospitalInputs" onChange={(e) => setLocation(e.target.value)} />
            <TextField size="small" label="Location" variant="standard" className="hospitalInputs" onChange={(e) => setNotes(e.target.value)} />
          </div>
          <Button variant="contained" sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }} className="submitHospital" onClick={submit}>
            Submit
          </Button>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default VaccineForm;
