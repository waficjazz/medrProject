import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import "./HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector } from "react-redux";
import { LoadingContext } from "../../context";

import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton } from "@mui/material";
const HospitalVisitForm = (props) => {
  const loadingc = useContext(LoadingContext);
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
  }
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const patient = useSelector((state) => state.patient.value);
  const [tabValue, setTabValue] = useState("0");
  const [hName, setHName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalEmail, setHospitalEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [test, setTest] = useState("");
  // const [hospitalId, setHospitalId] = useState("");
  const hospitalId = useRef();
  const [verifiedHospital, setVerifiedHospital] = useState(true);
  const [visitDate, setVisitDate] = useState("");
  const [visitTime, setVisitTime] = useState("");
  const [visitCause, setVisitCause] = useState("");
  const [visitDescription, setVisitDescription] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [hospitals, setHospitals] = React.useState([]);
  const loading = open && hospitals.length === 0;

  useEffect(() => {
    if (props.type === "edit") {
      loadingc.setIsLoading(true);
      const getOneVisit = async () => {
        try {
          const res = await axios.get(process.env.REACT_APP_URL + `/hospital/visit/one/${props.id}`);
          const data = await res.data[0];
          setVisitDescription(data.description);
          setVisitDate(data.entryDate?.toString().slice(0, 10));
          setVisitCause(data.cause);
          setVisitTime(data.timeSpent);

          let i = data.hospitalId;
          if (data.verifiedHospital == false) {
            setTabValue("1");
            const res1 = await axios.get(process.env.REACT_APP_URL + `/hospital/${i}`);
            const data = await res1.data;
            setHospitalAddress(data.address);
            setHospitalEmail(data.email);
            setHName(data.hospitalName);
            setPhoneNumber(data.phoneNumber);
          }
          loadingc.setIsLoading(false);
        } catch (err) {
          loadingc.setIsLoading(false);
          console.log(err.message);
        }
      };

      getOneVisit();
    }
    setHospitalAddress("");
    setHospitalEmail("");
    setVisitCause("");
    setVisitDescription("");
    setVisitDate("");
    setVisitTime("");
    setHName("");
    setPhoneNumber("");
    setDoctors([]);
    loadingc.setIsLoading(false);
  }, [props]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const getHospitals = async () => {
      try {
        loadingc.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/hospital/vhospitals/all`);

        setHospitals(response.data);
        loadingc.setIsLoading(false);
      } catch (err) {
        loadingc.setIsLoading(false);
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getHospitals();
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
      setHospitals([]);
    }
  }, [open]);

  const handleChange = (event, newValue) => {
    setVerifiedHospital(!verifiedHospital);
    setTabValue(newValue);
  };

  const handleEdit = async () => {
    let visit = {
      patientId,
      verifiedHospital,
      hospitalId: hospitalId.current,
      entryDate: visitDate,
      timeSpent: visitTime,
      cause: visitCause,
      doctors: doctors,
      description: visitDescription,
      id: props.id,
    };
    try {
      loadingc.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/hospital/visit/update", visit, { headers: { authorization: `Bearer ${token}` } });
      if (tabValue === "1") {
        let hospital = { hospitalName: hName, address: hospitalAddress, email: hospitalEmail, phoneNumber: phoneNumber, id: hospitalId.current };
        const res1 = await axios.post(process.env.REACT_APP_URL + "/hospital/update", hospital, { headers: { authorization: `Bearer ${token}` } });

        if (res1.statusText === "OK" && res.statusText === "OK") {
          props.close();
        }
      } else if (res.statusText === "OK") {
        props.close();
      }
      loadingc.setIsLoading(false);
    } catch (err) {
      loadingc.setIsLoading(false);
      console.log(err.message);
    }
  };

  const submit = async () => {
    let hospital = { hospitalName: hName, address: hospitalAddress, email: hospitalEmail, phoneNumber: phoneNumber };

    try {
      loadingc.setIsLoading(true);
      if (tabValue === "1") {
        const res = await axios.post(process.env.REACT_APP_URL + "/hospital/add", hospital, { headers: { authorization: `Bearer ${token}` } });
        console.log(res.data);
        let id = await res.data._id;
        hospitalId.current = id;
      }
      let visit = {
        patientId,
        verifiedHospital,
        hospitalId: hospitalId.current,
        entryDate: visitDate,
        timeSpent: visitTime,
        cause: visitCause,
        doctors: doctors,
        description: visitDescription,
      };

      const resp = await axios.post(process.env.REACT_APP_URL + "/hospital/visits/add", visit, { headers: { authorization: `Bearer ${token}` } });
      if (resp.statusText === "Created") {
        props.close();
      }
      loadingc.setIsLoading(false);
    } catch (err) {
      loadingc.setIsLoading(false);
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
                <TextField size="small" value={hName} label="Hospital Name" variant="standard" className="hospitalInputs" onChange={(e) => setHName(e.target.value)} />
                <TextField size="small" value={phoneNumber} label="Phone number" variant="standard" className="hospitalInputs" onChange={(e) => setPhoneNumber(e.target.value)} />
                <TextField size="small" value={hospitalEmail} label="Email" variant="standard" className="hospitalInputs" onChange={(e) => setHospitalEmail(e.target.value)} />
                <TextField size="small" value={hospitalAddress} label="Address" variant="standard" fullWidth onChange={(e) => setHospitalAddress(e.target.value)} />
              </>
            )}
            {tabValue === "0" && (
              <>
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
                  isOptionEqualToValue={(option, value) => option.hospitalName === value.hospitalName}
                  getOptionLabel={(option) => option.hospitalName}
                  options={hospitals}
                  loading={loading}
                  onChange={(event, newValue) => {
                    hospitalId.current = newValue._id;
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Hospitals"
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
              </>
            )}
          </div>
          <hr />
          <div className="hopitalForm">
            <TextField size="small" value={visitCause} label="Cause" variant="standard" className="hospitalInputs" onChange={(e) => setVisitCause(e.target.value)} />
            <TextField
              size="small"
              value={visitDate}
              label="Entry Date"
              variant="standard"
              type="date"
              focused
              className="hospitalInputs"
              onChange={(e) => setVisitDate(e.target.value)}
            />
            <TextField
              size="small"
              label="Time Spent"
              variant="standard"
              type="number"
              focused
              value={visitTime}
              className="hospitalInputs"
              InputProps={{
                startAdornment: <InputAdornment position="start">days</InputAdornment>,
              }}
              onChange={(e) => setVisitTime(e.target.value)}
            />
            <TextField
              size="small"
              value={visitDescription}
              label="Description"
              variant="standard"
              fullWidth
              multiline
              maxRows={3}
              onChange={(e) => setVisitDescription(e.target.value)}
            />
            <TextField size="small" label="Doctors" variant="standard" className="hospitalInputs" onChange={(e) => setDoctors(e.target.value)} />
          </div>
          {props.type === "add" && (
            <Button variant="contained" sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }} className="submitHospital" onClick={submit}>
              Submit
            </Button>
          )}
          {props.type === "edit" && (
            <Button variant="contained" sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }} className="submitHospital" onClick={handleEdit}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default HospitalVisitForm;
