import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { StyledEngineProvider } from "@mui/material/styles";
import { Tab, Tabs, TextField, Button, Autocomplete, IconButton } from "@mui/material";
import { LoadingContext } from "../../context";
import { useSelector } from "react-redux";

const SurgeryForm = (props) => {
  const doctorState = useSelector((state) => state.doctor.value);
  const hospitalState = useSelector((state) => state.hospital.value);
  let issuer;
  let issuerId;
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
  const loadingc = useContext(LoadingContext);
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  // const patient = useSelector((state) => state.patient.value);
  const [tabValue, setTabValue] = useState("0");
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [hospitalEmail, setHospitalEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [hospitalId, setHospitalId] = useState("");
  const hospitalId = useRef();
  const [surgeryCause, setSurgeryCause] = useState("");
  const [verifiedHospital, setVerifiedHospital] = useState(true);
  const [surgeryName, setSurgeryName] = useState("");
  const [surgeryDate, setSurgeryDate] = useState("");
  const [surgeryDescription, setSurgeryDescription] = useState("");
  const [doctors, setDoctors] = useState([]);
  const visitId = useRef();
  const [visits, setVisits] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openHo, setOpenHo] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const loading = open && visits.length === 0;
  const loadingHo = openHo && hospitals.length === 0;
  const [validPhone, setValidPhone] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const testNames = (name) => {
    return /[A-Za-z]{3,}/.test(name);
  };

  useEffect(() => {
    // validPhone.current = /^\d{7}$/.test(phoneNumber);
    setValidPhone(/^\d{8}$/.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    setValidEmail(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(hospitalEmail));
  }, [hospitalEmail]);

  const handleEdit = async () => {
    let notfi = {
      patientId,
      action: "updated",
      item: "a surgery",
      issuer,
      issuerId,
    };
    let surgery = {
      patientId,
      verifiedHospital,
      HospitalVisit: visitId.current,
      hospitalId: hospitalId.current,
      date: surgeryDate,
      description: surgeryDescription,
      cause: surgeryCause,
      name: surgeryName,
      id: props.id,
    };
    try {
      loadingc.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/surgery/update", surgery, { headers: { authorization: `Bearer ${token}` } });
      const notificatin = await axios.post(process.env.REACT_APP_URL + "/notifications/add", notfi);
      if (tabValue === "1") {
        let hospital = { hospitalName: hospitalName, address: hospitalAddress, email: hospitalEmail, phoneNumber: phoneNumber, id: hospitalId.current };
        const res1 = await axios.post(process.env.REACT_APP_URL + "/hospital/update", hospital, { headers: { authorization: `Bearer ${token}` } });

        if (res1.statusText === "OK" && res.statusText === "OK") {
          props.close();
        }
      } else if (res.statusText === "OK") {
        props.close();
        loadingc.setIsLoading(false);
      }
      loadingc.setIsLoading(false);
    } catch (err) {
      loadingc.setIsLoading(false);
      console.log(err.message);
    }
  };

  useEffect(() => {
    if (props.type === "edit") {
      const getOneSurgery = async () => {
        try {
          loadingc.setIsLoading(true);
          const res = await axios.get(process.env.REACT_APP_URL + `/surgery/one/${props.id}`);
          const data = await res.data[0];
          console.log(data);
          setSurgeryCause(data.cause);
          setSurgeryDate(data.date?.toString().slice(0, 10));
          setSurgeryName(data.name);
          setSurgeryDescription(data.description);
          visitId.current = data.HospitalVisit;
          let i = data.hospitalId;
          if (data.verifiedHospital == false) {
            setTabValue("1");
            const res1 = await axios.get(process.env.REACT_APP_URL + `/hospital/${i}`);
            const data = await res1.data;
            setHospitalAddress(data.address);
            setHospitalEmail(data.email);
            setHospitalName(data.hospitalName);
            setPhoneNumber(data.phoneNumber);
          }
          loadingc.setIsLoading(false);
        } catch (err) {
          loadingc.setIsLoading(false);
          console.log(err.message);
        }
      };

      getOneSurgery();
    }
    setSurgeryCause("");
    setSurgeryDate("");
    setSurgeryName("");
    setSurgeryDescription("");
    setHospitalAddress("");
    setHospitalEmail("");
    setHospitalName("");
    setPhoneNumber("");
    loadingc.setIsLoading(false);
  }, [props]);

  useEffect(() => {
    let active = true;

    if (!loadingHo) {
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
      loadingc.setIsLoading(false);
      // if (visits.length === 0) {
      //   setEmpty(true);
      // }
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [loadingHo]);

  useEffect(() => {
    if (!openHo) {
      setHospitals([]);
    }
  }, [openHo]);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const getVisits = async () => {
      try {
        loadingc.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/hospital/visits/${patientId}`);
        setVisits(response.data);
        loadingc.setIsLoading(false);
      } catch (err) {
        loadingc.setIsLoading(false);
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getVisits();
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
      setVisits([]);
    }
  }, [open]);

  const handleChange = (event, newValue) => {
    setVerifiedHospital(!verifiedHospital);
    setTabValue(newValue);
  };

  const submit = async () => {
    let notfi = {
      patientId,
      action: "added",
      item: "a surgery",
      issuer,
      issuerId,
    };
    let hospital = { hospitalName: hospitalName, address: hospitalAddress, email: hospitalEmail, phoneNumber: phoneNumber };
    try {
      loadingc.setIsLoading(true);
      if (tabValue === "1") {
        const res = await axios.post(process.env.REACT_APP_URL + "/hospital/add", hospital, { headers: { authorization: `Bearer ${token}` } });
        let id = await res.data._id;
        hospitalId.current = id;
      }
      let surgery = {
        patientId,
        verifiedHospital,
        HospitalVisit: visitId.current,
        hospitalId: hospitalId.current,
        date: surgeryDate,
        description: surgeryDescription,
        cause: surgeryCause,
        name: surgeryName,
      };

      const resp = await axios.post(process.env.REACT_APP_URL + "/surgery/add", surgery, { headers: { authorization: `Bearer ${token}` } });
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
                <TextField
                  required
                  size="small"
                  value={hospitalName}
                  label="Hospital Name"
                  variant="standard"
                  className="hospitalInputs"
                  onChange={(e) => setHospitalName(e.target.value)}
                />
                <TextField
                  required
                  error={!validPhone}
                  value={phoneNumber}
                  size="small"
                  label="Phone number"
                  variant="standard"
                  className="hospitalInputs"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <TextField
                  required
                  error={!validEmail}
                  value={hospitalEmail}
                  size="small"
                  label="Email"
                  variant="standard"
                  className="hospitalInputs"
                  onChange={(e) => setHospitalEmail(e.target.value)}
                />
                <TextField required value={hospitalAddress} size="small" label="Address" variant="standard" fullWidth onChange={(e) => setHospitalAddress(e.target.value)} />
              </>
            )}
            {tabValue === "0" && (
              <>
                <Autocomplete
                  className="hospitalInputs"
                  size="small"
                  // disablePortal
                  sx={{ marginTop: "10px" }}
                  open={openHo}
                  onOpen={() => {
                    setOpenHo(true);
                  }}
                  onClose={() => {
                    setOpenHo(false);
                  }}
                  noOptionsText="No Such Hospital"
                  isOptionEqualToValue={(option, value) => option.hospitalName === value.hospitalName}
                  getOptionLabel={(option) => option.hospitalName}
                  options={hospitals}
                  loading={loadingHo}
                  onChange={(event, newValue) => {
                    hospitalId.current = newValue._id;
                  }}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Hospitals"
                      variant="standard"
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <React.Fragment>
                            {loadingHo ? <CircularProgress color="inherit" size={20} /> : null}
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
            <TextField
              required
              size="small"
              value={surgeryName}
              label="Name"
              variant="standard"
              focused
              className="hospitalInputs"
              onChange={(e) => setSurgeryName(e.target.value)}
            />
            <TextField required size="small" value={surgeryCause} label="Cause" variant="standard" className="hospitalInputs" onChange={(e) => setSurgeryCause(e.target.value)} />
            <TextField
              size="small"
              required
              value={surgeryDate}
              label="Date"
              variant="standard"
              type="date"
              focused
              className="hospitalInputs"
              onChange={(e) => setSurgeryDate(e.target.value)}
            />
            <TextField
              size="small"
              required
              value={surgeryDescription}
              label="Description"
              variant="standard"
              fullWidth
              multiline
              maxRows={3}
              onChange={(e) => setSurgeryDescription(e.target.value)}
            />
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
              noOptionsText="No Such Hospital Visit"
              isOptionEqualToValue={(option, value) => option.entryDate === value.entryDate}
              getOptionLabel={(option) => option.date?.toString().slice(0, 10)}
              options={visits}
              loading={loading}
              onChange={(event, newValue) => {
                visitId.current = newValue._id;
                console.log(visitId.current);
              }}
              renderInput={(params) => (
                <TextField
                  required
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
          {props.type === "add" && (
            <Button
              disabled={
                (tabValue == "0" && (!testNames(surgeryCause) || !testNames(surgeryDescription) || !testNames(surgeryName) || surgeryDate == "")) ||
                (tabValue == "1" &&
                  (!testNames(surgeryCause) ||
                    !testNames(surgeryDescription) ||
                    !testNames(surgeryName) ||
                    surgeryDate == "" ||
                    !validPhone ||
                    !testNames(hospitalName) ||
                    !testNames(hospitalAddress) ||
                    !validEmail))
              }
              variant="contained"
              sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }}
              className="submitHospital"
              onClick={submit}>
              Submit
            </Button>
          )}
          {props.type === "edit" && (
            <Button
              disabled={
                (tabValue == "0" && (!testNames(surgeryCause) || !testNames(surgeryDescription) || !testNames(surgeryName) || surgeryDate == "")) ||
                (tabValue == "1" &&
                  (!testNames(surgeryCause) ||
                    !testNames(surgeryDescription) ||
                    !testNames(surgeryName) ||
                    surgeryDate == "" ||
                    !validPhone ||
                    !testNames(hospitalName) ||
                    !testNames(hospitalAddress) ||
                    !validEmail))
              }
              variant="contained"
              sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }}
              className="submitHospital"
              onClick={handleEdit}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default SurgeryForm;
