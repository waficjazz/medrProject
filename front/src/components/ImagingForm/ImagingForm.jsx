import React, { useState } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";
import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
const ImagingForm = (props) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const patientId = storedData.uid;

  const submit = async () => {
    let imaging = { name, date, location, patientId };
    try {
      const res = await axios.post("http://localhost:5000/api/imaging/add", imaging);
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
          <IconButton sx={{ marginLeft: "95%" }} onClick={props.close}>
            <CloseIcon fontSize="medium" />
          </IconButton>
          <hr />
          <div className="hopitalForm">
            <TextField size="small" label="Name" variant="standard" className="hospitalInputs" onChange={(e) => setName(e.target.value)} />
            <TextField size="small" label="Location" variant="standard" className="hospitalInputs" onChange={(e) => setLocation(e.target.value)} />
            <TextField size="small" label="Date" variant="standard" type="date" focused className="hospitalInputs" onChange={(e) => setDate(e.target.value)} />
            <IconButton color="primary" component="label">
              ADD REPORT
              <input type="file" accept="image/*" hidden />
              <AttachFileIcon fontSize="medium" />
            </IconButton>
          </div>
          <Button variant="contained" sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }} className="submitHospital" onClick={submit}>
            Submit
          </Button>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default ImagingForm;
