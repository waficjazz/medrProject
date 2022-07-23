import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";
import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingContext } from "../../context";
import { useSelector, useDispatch } from "react-redux";

const ClinicalVisitForm = (props) => {
  const doctorState = useSelector((state) => state.doctor.value);
  const hospitalState = useSelector((state) => state.hospital.value);
  let issuer;
  let issuerId;
  const testNames = (name) => {
    return /[A-Za-z]{3,}/.test(name);
  };

  const loadingc = useContext(LoadingContext);
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
    if (highStoredData.type === "doctor") {
      issuer = doctorState.firstName;
      issuerId = doctorState._id;
    }
    if (highStoredData.type === "hospital") {
      issuer = hospitalState.hospitalName;
      issuerId = hospitalState._id;
    }
  }

  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const [tabValue, setTabValue] = useState("0");
  const [doctorName, setDoctorName] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [doctors, setDoctors] = React.useState([]);
  const [visitCause, setVisitCause] = useState("");
  const [visitDescription, setVisitDescription] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [verifiedDoctor, setVerifiedDoctor] = useState(true);
  const doctorId = useRef();
  const [open, setOpen] = React.useState(false);
  const loading = open && doctors.length === 0;
  const [validPhone, setValidPhone] = useState(false);
  const [validEmail, setValidEmail] = useState(false);

  useEffect(() => {
    // validPhone.current = /^\d{7}$/.test(phoneNumber);
    setValidPhone(/^\d{8}$/.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    setValidEmail(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email));
  }, [email]);
  useEffect(() => {
    if (props.type === "edit") {
      loadingc.setIsLoading(true);
      const getOneVisit = async () => {
        try {
          const res = await axios.get(process.env.REACT_APP_URL + `/clinical/one/${props.id}`);
          const data = await res.data[0];
          console.log(data);
          setVisitCause(data.cause);
          setVisitDescription(data.description);
          setVisitDate(data.visitDate?.toString().slice(0, 10));
          doctorId.current = data.doctorId;
          // setSurgeryDate(data.date?.toString().slice(0, 10));
          // setSurgeryName(data.name);
          // setSurgeryDescription(data.description);
          // visitId.current = data.HospitalVisit;
          let i = data.doctorId;
          if (data.verifiedDoctor == false) {
            setTabValue("1");
            const res1 = await axios.get(process.env.REACT_APP_URL + `/doctor/one/${i}`);
            const data = await res1.data;
            console.log(data);
            setProficiency(data.proficiency[0]);
            setDoctorName(data.name);
            setClinicAddress(data.clinicAddress);
            setEmail(data.email);
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
    setVisitCause("");
    setVisitDescription("");
    setVisitDate("");
    setDoctorName("");
    setClinicAddress("");
    setProficiency("");
    setEmail("");
    setPhoneNumber("");
    doctorId.current = "";
    loadingc.setIsLoading(false);
  }, [props]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const getDoctors = async () => {
      try {
        loadingc.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/doctor/verified/all`);

        setDoctors(response.data);
        loadingc.setIsLoading(false);
      } catch (err) {
        loadingc.setIsLoading(false);
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getDoctors();
      loadingc.setIsLoading(false);
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
      setDoctors([]);
    }
  }, [open]);

  const handleChange = (event, newValue) => {
    setVerifiedDoctor(!verifiedDoctor);
    setTabValue(newValue);
  };

  const submit = async () => {
    let doctor = { clinicAddress: clinicAddress, email: email, name: doctorName, phoneNumber: phoneNumber, proficiency: proficiency };

    try {
      loadingc.setIsLoading(true);
      if (tabValue === "1") {
        const res = await axios.post(process.env.REACT_APP_URL + "/doctor/add", doctor, { headers: { authorization: `Bearer ${token}` } });
        let id = await res.data._id;
        let doc = await res.data;
        doctorId.current = id;
      }

      let visit = {
        patientId,
        verifiedDoctor,
        doctorId: doctorId.current,
        doctorName: doctorName,
        email: email,
        phoneNumber: phoneNumber,
        visitDate: visitDate,
        description: visitDescription,
        cause: visitCause,
        clinicAddress,
        doctorName,
      };
      let notfi = {
        patientId,
        action: "Add",
        item: "clinical visit",
        issuer,
        issuerId,
      };
      const resp = await axios.post(process.env.REACT_APP_URL + "/clinical/visits/add", visit, { headers: { authorization: `Bearer ${token}` } });
      const notificatin = await axios.post(process.env.REACT_APP_URL + "/notifications/add", notfi);

      if (resp.statusText === "Created") {
        props.close();
        loadingc.setIsLoading(false);
      }
      loadingc.setIsLoading(false);
    } catch (err) {
      loadingc.setIsLoading(false);

      console.log(err.message);
    }
  };

  const handleEdit = async () => {
    let visit = {
      patientId,
      doctorId: doctorId.current,
      doctorName: doctorName,
      email: email,
      phoneNumber: phoneNumber,
      visitDate: visitDate,
      description: visitDescription,
      cause: visitCause,
      clinicAddress,
      id: props.id,
    };
    console.log(visit.doctorId);
    try {
      loadingc.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/clinical/visit/update", visit, { headers: { authorization: `Bearer ${token}` } });
      if (tabValue === "1") {
        let doctor = { id: doctorId.current, clinicAddress: clinicAddress, email: email, name: doctorName, phoneNumber: phoneNumber, proficiency: proficiency };
        const res1 = await axios.post(process.env.REACT_APP_URL + "/doctor/update", doctor, { headers: { authorization: `Bearer ${token}` } });

        if (res1.statusText === "OK" && res.statusText === "OK") {
          props.close();
        }
      } else if (res.statusText === "OK") {
        props.close();
        loadingc.setIsLoading(false);
      }
      loadingc.setIsLoading(false);
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
              <Tab value="0" label="Choose A Doctor" />
              <Tab value="1" label="Add A Doctor" />
            </Tabs>
          </div>
          <div className="hopitalForm">
            {tabValue === "1" && (
              <>
                <TextField
                  required
                  value={doctorName}
                  size="small"
                  label="Doctor's Name"
                  variant="standard"
                  className="hospitalInputs"
                  onChange={(e) => setDoctorName(e.target.value)}
                />
                <TextField
                  required
                  value={proficiency}
                  size="small"
                  label="Doctor's proficiency"
                  variant="standard"
                  className="hospitalInputs"
                  onChange={(e) => setProficiency(e.target.value)}
                />
                <TextField
                  required
                  value={phoneNumber}
                  error={!validPhone}
                  size="small"
                  label="Phone number"
                  variant="standard"
                  className="hospitalInputs"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <TextField
                  required
                  error={!validEmail}
                  value={email}
                  size="small"
                  label="Email"
                  variant="standard"
                  className="hospitalInputs"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField required value={clinicAddress} size="small" label="Clinic Address" variant="standard" fullWidth onChange={(e) => setClinicAddress(e.target.value)} />
              </>
            )}
            {tabValue === "0" && (
              <>
                {/* <Autocomplete
                  className="hospitalInputs"
                  size="small"
                  disablePortal
                  sx={{ marginTop: "10px" }}
                  id="bloodGroup"
                  hopitals={["hammoud", "labib"]}
                  renderInput={(params) => <TextField {...params} label="Clinics" variant="standard" />}
                /> */}
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
                  noOptionsText="No Such Doctor"
                  isOptionEqualToValue={(option, value) => option.firstName === value.firstName}
                  getOptionLabel={(option) => option.firstName}
                  options={doctors}
                  loading={loading}
                  onChange={(event, newValue) => {
                    doctorId.current = newValue._id;
                    setPhoneNumber(newValue.phoneNumber);
                    setClinicAddress(newValue.clinicAddress);
                    setEmail(newValue.email);
                    setDoctorName(`${newValue.firstName} ${newValue.lastName}`);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Doctors"
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
            <TextField value={visitCause} size="small" label="Cause" variant="standard" className="hospitalInputs" onChange={(e) => setVisitCause(e.target.value)} />
            <TextField
              required
              value={visitDate}
              size="small"
              label="Visit Date"
              variant="standard"
              type="date"
              focused
              className="hospitalInputs"
              onChange={(e) => setVisitDate(e.target.value)}
            />

            <TextField
              required
              value={visitDescription}
              size="small"
              label="Description"
              variant="standard"
              fullWidth
              multiline
              maxRows={3}
              onChange={(e) => setVisitDescription(e.target.value)}
            />
          </div>
          {props.type === "add" && (
            <Button
              variant="contained"
              sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }}
              className="submitHospital"
              onClick={submit}
              disabled={
                (tabValue == "0" && (!testNames(visitCause) || !testNames(visitDescription) || visitDate == "")) ||
                (tabValue == "1" && (!validPhone || !validEmail || !testNames(proficiency) || !testNames(clinicAddress) || !testNames(doctorName)))
              }>
              Submit
            </Button>
          )}
          {props.type === "edit" && (
            <Button
              variant="contained"
              sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }}
              className="submitHospital"
              onClick={handleEdit}
              disabled={
                (tabValue == "0" && (!testNames(visitCause) || !testNames(visitDescription) || visitDate == "")) ||
                (tabValue == "1" && (!validPhone || !validEmail || !testNames(proficiency) || !testNames(clinicAddress) || !testNames(doctorName)))
              }>
              Submit
            </Button>
          )}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default ClinicalVisitForm;
