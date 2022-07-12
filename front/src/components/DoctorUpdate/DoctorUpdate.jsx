import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { IconButton, Stepper, StepLabel, TextField, Box, Autocomplete, Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import axios from "axios";
import { RegContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoadingContext } from "../../context";
const DoctorUpdate = ({ close }) => {
  const loading = useContext(LoadingContext);
  let token = "";
  let did = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
    did = highStoredData.uid;
  }
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.value);
  const auth = useContext(RegContext);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [hospital, setHospital] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const validEmail = useRef(true);
  const validPassword = useRef(true);
  // const validPhone = useRef(false);
  const [validPhone, setValidPhone] = useState(false);

  const regions = ["Akkar", "Baalbeck - Hermel", "Beirut", "Bekaa", "Mount Lebanon", "North Lebanon", "Nabatiyeh", "South Lebanon"];
  const bloodGroups = ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"];
  const idTypes = ["National ID", "Passport"];
  const userTypes = ["patient", "doctor", "hospital"];
  const navigate = useNavigate();

  const getDoctor = async () => {
    try {
      loading.setIsLoading(true);
      const res = await axios.get(process.env.REACT_APP_URL + `/doctor/verified/${did}`);
      const data = await res.data;
      console.log(data);
      setClinicAddress(data.clinicAddress);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setProficiency(data.proficiency[0]);
      setFatherName(data.fatherName);
      setMotherName(data.motherName);
      setHospital(data.hospital[0]);
      setDoctorId(data._id);
      loading.setIsLoading(false);
    } catch (err) {
      loading.setIsLoading(false);
      console.log(err.message);
    }
  };

  useEffect(() => {
    getDoctor();
  }, []);
  const updatePatient = async () => {
    let obj = {
      id: doctorId,
      clinicAddress,
      firstName,
      lastName,
      fatherName,
      motherName,
      hospital: [hospital],
      proficiency: [proficiency],
    };
    try {
      loading.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/doctor/verified/update", obj, { headers: { authorization: `Bearer ${token}` } });
      close();
      navigate("/a");
      navigate("/");
      loading.setIsLoading(false);
    } catch (err) {
      loading.setIsLoading(false);
      console.log(err.message);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className="curtain"></div>
      <div className="mainForm">
        <Box className="updateform" component="form" noValidate>
          <IconButton className="exitSignIn" onClick={close}>
            <CloseIcon sx={{ marginLeft: "90px" }} />
          </IconButton>
          <TextField value={firstName} className="sm" label="First Name" variant="standard" size="small" required onChange={(e) => setFirstName(e.target.value)} />
          <TextField value={lastName} className="sm" label="Last Name" variant="standard" size="small" required onChange={(e) => setLastName(e.target.value)} />
          <TextField value={fatherName} className="sm" label="Father Name" variant="standard" size="small" required onChange={(e) => setFatherName(e.target.value)} />
          <TextField value={motherName} className="sm" label="Mother Name" variant="standard" size="small" onChange={(e) => setMotherName(e.target.value)} required />
          <TextField value={proficiency} className="sm" label="Proficiency" variant="standard" size="small" onChange={(e) => setProficiency(e.target.value)} required />
          <TextField value={hospital} className="sm" label="Hospital" variant="standard" size="small" onChange={(e) => setHospital(e.target.value)} required />
          <TextField
            value={clinicAddress}
            className="bg"
            fullWidth
            label="Clinic Address"
            variant="standard"
            size="small"
            onChange={(e) => setClinicAddress(e.target.value)}
            required
          />
          {isError && (
            <Typography color="red" sx={{ marginBottom: "20px" }}>
              {error}
            </Typography>
          )}

          <Button className="nextIcon" variant="contained" onClick={updatePatient}>
            Update
          </Button>
        </Box>
      </div>
    </StyledEngineProvider>
  );
};

export default DoctorUpdate;
