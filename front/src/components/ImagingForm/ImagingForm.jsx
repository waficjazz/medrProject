import React, { useState } from "react";
import axios from "axios";
import "./HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";
const ImagingForm = (props) => {
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

export default ImagingForm;
