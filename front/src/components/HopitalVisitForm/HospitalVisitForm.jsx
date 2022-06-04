import React, { useRef, useState } from "react";
import axios from "axios";
import "./HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton } from "@mui/material";
const HospitalVisitForm = (props) => {
  const patient = useSelector((state) => state.patient.value);
  const [tabValue, setTabValue] = useState("0");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalEmail, setHospitalEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [hospitalId, setHospitalId] = useState("");
  const hospitalId = useRef();
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
      hospitalId.current = id;

      let visit = {
        patientId: "6288751aaa211e70072bd262",
        hospitalId: hospitalId.current,
        entryDate: visitDate,
        timeSpent: visitTime,
        cause: visitCause,
        doctors: doctors,
      };

      const resp = await axios.post("http://localhost:5000/api/hospital/visits/add", visit);
      if (resp.statusText === "Created") {
        props.close();
      }
      console.log(resp);
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
              <Tab value="0" label="Choose A Hospital" />
              <Tab value="1" label="Add A Hospital" />
            </Tabs>
          </div>
          <div className="hopitalForm">
            {tabValue === "1" && (
              <>
                <TextField size="small" label="Hospital Name" variant="standard" className="hospitalInputs" onChange={(e) => setHospitalName(e.target.value)} />
                <TextField size="small" label="Phone number" variant="standard" className="hospitalInputs" onChange={(e) => setPhoneNumber(e.target.value)} />
                <TextField size="small" label="Email" variant="standard" className="hospitalInputs" onChange={(e) => setHospitalEmail(e.target.value)} />
                <TextField size="small" label="Address" variant="standard" fullWidth onChange={(e) => setHospitalAddress(e.target.value)} />
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
                  renderInput={(params) => <TextField {...params} label="Hospitals" variant="standard" />}
                />
              </>
            )}
          </div>
          <hr />
          <div className="hopitalForm">
            <TextField size="small" label="Cause" variant="standard" className="hospitalInputs" onChange={(e) => setVisitCause(e.target.value)} />
            <TextField size="small" label="Entry Date" variant="standard" type="date" focused className="hospitalInputs" onChange={(e) => setVisitDate(e.target.value)} />
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
              onChange={(e) => setVisitTime(e.target.value)}
            />
            <TextField size="small" label="Description" variant="standard" fullWidth multiline maxRows={3} onChange={(e) => setVisitDescription(e.target.value)} />
            <TextField size="small" label="Doctors" variant="standard" className="hospitalInputs" onChange={(e) => setDoctors(e.target.value)} />
          </div>
          <Button variant="contained" sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }} className="submitHospital" onClick={submit}>
            Submit
          </Button>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default HospitalVisitForm;
