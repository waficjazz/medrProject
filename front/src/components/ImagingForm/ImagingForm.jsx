import React, { useState } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";
import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
const ImagingForm = (props) => {
  // const patient = useSelector((state) => state.patient.value);
  const [tabValue, setTabValue] = useState("0");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalEmail, setHospitalEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [visitCause, setVisitCause] = useState("");
  const [visitDescription, setVisitDescription] = useState("");
  const [doctors, setDoctors] = useState([]);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const submit = async () => {
    let hospital = { name: hospitalName, address: hospitalAddress, email: hospitalEmail, phoneNumber: phoneNumber };
    try {
      const res = await axios.post("http://localhost:5000/api/hospital/add", hospital);
      let id = await res.data._id;
      setHospitalId(id);
      console.log(id);

      let visit = {
        patientId: "6288751aaa211e70072bd262",
        hospitalId: "628fdb4cdee93c7dbf0fe84b",
        entryDate: visitDate,
        timeSpent: visitTime,
        cause: visitCause,
        doctors: doctors,
      };
      console.log(visit);
      const resp = await axios.post("http://localhost:5000/api/hospital/visits/add", visit);
      console.log(resp.data);
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
            <TextField size="small" label="Name" variant="standard" className="hospitalInputs" onChange={(e) => setVisitCause(e.target.value)} />
            <TextField size="small" label="Date" variant="standard" type="date" focused className="hospitalInputs" onChange={(e) => setVisitDate(e.target.value)} />
            <TextField size="small" label="Location" variant="standard" type="date" focused className="hospitalInputs" onChange={(e) => setVisitDate(e.target.value)} />
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
