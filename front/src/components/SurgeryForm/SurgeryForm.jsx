import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { StyledEngineProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton } from "@mui/material";
const SurgeryForm = (props) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const patient = useSelector((state) => state.patient.value);
  const [tabValue, setTabValue] = useState("0");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalEmail, setHospitalEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [hospitalId, setHospitalId] = useState("");
  const hospitalId = useRef();
  const [surgeryCause, setSurgeryCause] = useState("");
  const [surgeryName, setSurgeryName] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [surgeryDescription, setSurgeryDescription] = useState("");
  const [doctors, setDoctors] = useState([]);
  const visitId = useRef();
  const [visits, setVisits] = useState([]);
  const [open, setOpen] = React.useState(false);
  const loading = open && visits.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const getVisits = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hospital/visits/${patientId}`);

        setVisits(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getVisits();
      // if (visits.length === 0) {
      //   setEmpty(true);
      // }
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setVisits([]);
    }
  }, [open]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const submit = async () => {
    let hospital = { name: hospitalName, address: hospitalAddress, email: hospitalEmail, phoneNumber: phoneNumber };
    try {
      const res = await axios.post("http://localhost:5000/api/hospital/add", hospital);
      let id = await res.data._id;
      hospitalId.current = id;

      let surgery = {
        patientId,
        date: surgeryDate,
        description: surgeryDescription,
        cause: surgeryCause,
        name: surgeryName,
      };

      const resp = await axios.post("http://localhost:5000/api/surgery/add", surgery);
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
                  hopitals={["hammoud", "labib"]}
                  renderInput={(params) => <TextField {...params} label="Hospitals" variant="standard" />}
                />
              </>
            )}
          </div>
          <hr />
          <div className="hopitalForm">
            <TextField size="small" label="Name" variant="standard" focused className="hospitalInputs" onChange={(e) => setSurgeryName(e.target.value)} />
            <TextField size="small" label="Cause" variant="standard" className="hospitalInputs" onChange={(e) => setSurgeryCause(e.target.value)} />
            <TextField size="small" label="Date" variant="standard" type="date" focused className="hospitalInputs" onChange={(e) => setSurgeryDate(e.target.value)} />
            <TextField size="small" label="Description" variant="standard" fullWidth multiline maxRows={3} onChange={(e) => setSurgeryDescription(e.target.value)} />
            <Autocomplete
              className="hospitalInputs"
              size="small"
              // disablePortal
              sx={{ marginTop: "10px" }}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              noOptionsText="No Such Hospital"
              isOptionEqualToValue={(option, value) => option.entryDate === value.entryDate}
              getOptionLabel={(option) => option.entryDate?.toString().slice(0, 10)}
              options={visits}
              loading={loading}
              onChange={(event, newValue) => {
                visitId.current = newValue._id;
                console.log(visitId.current);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hospital Visit"
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
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

export default SurgeryForm;
