import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import { Step, Stepper, StepLabel, TextField, FormControl, InputLabel, Input, Box, IconButton, InputAdornment, Autocomplete, Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import axios from "axios";
import { RegContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";

const PatientUpdate = ({ close }) => {
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
  }
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.value);
  const auth = useContext(RegContext);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("patient");
  const [role, setRole] = useState("unset");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [swipe, setSwipe] = useState([true, false, false, false]);
  const [firstName, setFirstName] = useState(patient.firstName);
  const [lastName, setLastName] = useState(patient.lastName);
  const [fatherName, setFatherName] = useState(patient.lastName);
  const [motherName, setMotherName] = useState(patient.motherName);
  const [email, setEmail] = useState(patient.email);
  const [password, setPassword] = useState("dsafasdfasd123");
  const [confirmPassword, setConfirmPassword] = useState("dsafasdfasd123");
  const [phoneNumber, setPhoneNumber] = useState("6223223");
  const [address, setAddress] = useState(patient.address);
  const [birthDate, setBirthDate] = useState(patient.birthDate);
  const [region, setRegion] = useState(patient.region);
  const [city, setCity] = useState(patient.city);
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState(patient.bloodGroup);
  const [gender, setGender] = useState(patient.gender);
  const [weight, setWeight] = useState(patient.weight);
  const [height, setHeight] = useState(100);
  const [lisOfHospitals, setLisOfHospitals] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const validEmail = useRef(true);
  const validPassword = useRef(true);
  // const validPhone = useRef(false);
  const [validPhone, setValidPhone] = useState(false);

  const regions = ["Akkar", "Baalbeck - Hermel", "Beirut", "Bekaa", "Mount Lebanon", "North Lebanon", "Nabatiyeh", "South Lebanon"];
  const bloodGroups = ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"];
  const idTypes = ["National ID", "Passport"];
  const userTypes = ["patient", "doctor", "hospital"];
  const navigate = useNavigate();
  const updatePatient = async () => {
    let obj = {
      _id: patient._id,
      firstName,
      lastName,
      fatherName,
      motherName,
      birthDate,
      bloodGroup,
      address,
      city,
      region,
      gender,
      weight,
      height,
    };
    try {
      const res = await axios.post("http://localhost:5000/api/patient/update", obj, { headers: { authorization: `Bearer ${token}` } });
      close();
      navigate("/a");
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    console.log(birthDate);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div className="curtain"></div>
      <div className="mainForm">
        <Box className="updateform" component="form" noValidate>
          <TextField value={firstName} className="sm" label="First Name" variant="standard" size="small" required onChange={(e) => setFirstName(e.target.value)} />
          <TextField value={lastName} className="sm" label="Last Name" variant="standard" size="small" required onChange={(e) => setLastName(e.target.value)} />
          <TextField value={fatherName} className="sm" label="Father Name" variant="standard" size="small" required onChange={(e) => setFatherName(e.target.value)} />
          <TextField value={motherName} className="sm" label="Mother Name" variant="standard" size="small" onChange={(e) => setMotherName(e.target.value)} required />

          {/* 
          <IconButton className="finishStep" onClick={() => setRole("unset")}>
            <CloseIcon />
          </IconButton> */}
          <div style={{ width: "100%" }}>
            <InputLabel htmlFor="bd">Birth Date</InputLabel>
            <FormControl className="bg" fullWidth>
              <Input
                id="bd"
                type="date"
                defaultValue={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                }}
              />
            </FormControl>
          </div>
          <Autocomplete
            className="sm"
            size="small"
            disablePortal
            id="region"
            options={regions}
            defaultValue={region}
            onChange={(e, newValue) => setRegion(newValue)}
            renderInput={(params) => <TextField {...params} label="region" />}
          />
          <TextField value={city} className="sm" label="City" variant="standard" size="small" required onChange={(e) => setCity(e.target.value)} />
          <TextField value={address} className="bg " label="Address" fullWidth multiline size="small" maxRows={3} onChange={(e) => setAddress(e.target.value)} />
          <TextField
            className="sm"
            type="number"
            label="Weight"
            variant="standard"
            value={weight}
            size="small"
            error={weight < 10 || weight > 200}
            onChange={(e) => setWeight(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start">kg</InputAdornment> }}
          />
          <TextField
            className="sm"
            label="Height"
            variant="standard"
            size="small"
            type="number"
            value={height}
            error={height < 90 || height > 220}
            onChange={(e) => setHeight(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start">cm</InputAdornment> }}
          />
          <Autocomplete
            className="sm"
            size="small"
            disablePortal
            id="bloodGroup"
            value={bloodGroup}
            onChange={(e, val) => setBloodGroup(val)}
            options={bloodGroups}
            renderInput={(params) => <TextField {...params} label="Blood Type" />}
          />
          <Autocomplete
            className="sm"
            size="small"
            disablePortal
            id="gender"
            value={gender}
            onChange={(e, val) => setGender(val)}
            options={["Male", "Female"]}
            renderInput={(params) => <TextField {...params} label="Gender" />}
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

export default PatientUpdate;
