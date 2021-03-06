import React from "react";
import { useState, useRef, useEffect, useContext } from "react";
import "./SignUp.css";
import { Step, Stepper, StepLabel, TextField, FormControl, InputLabel, FormHelperText, Input, Box, IconButton, InputAdornment, Autocomplete, Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";
import mySvg from "./hospital.svg";
import doctorSvg from "./stethoscope.svg";
import patientSvg from "./patient.svg";
import axios from "axios";
import { RegContext } from "../../context";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { LoadingContext } from "../../context";

const SignUp = () => {
  const loading = useContext(LoadingContext);
  const auth = useContext(RegContext);
  // const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState("patient");
  const [role, setRole] = useState("unset");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);
  const [swipe, setSwipe] = useState([true, false, false, false]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [email, setEmail] = useState("wafic@gmail.com");
  const [password, setPassword] = useState("dsafasdfasd123");
  const [confirmPassword, setConfirmPassword] = useState("dsafasdfasd123");
  const [phoneNumber, setPhoneNumber] = useState("62232232");
  const [address, setAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [region, setRegion] = useState("");
  const [city, setCity] = useState("");
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState(10);
  const [height, setHeight] = useState(100);
  const [lisOfHospitals, setLisOfHospitals] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const validEmail = useRef(true);
  const validPassword = useRef(true);
  // const validPhone = useRef(false);
  const [validPhone, setValidPhone] = useState(false);
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  const navigate = useNavigate();
  const testNames = (name) => {
    return /[A-Za-z]{3,}/.test(name);
  };
  const reset = () => {
    setEmail("");
    setPassword("");
    setCity("");
    setRegion("");
    setAddress("");
    setActiveStep(0);
    setSwipe([true, false, false, false]);
    setRole("unset");
  };
  useEffect(() => {
    if (highStoredData && highStoredData.token) {
      setRole("choosePatient");
    }
  }, []);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    validPassword.current = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }, [password]);

  useEffect(() => {
    // validPhone.current = /^\d{7}$/.test(phoneNumber);
    setValidPhone(/^\d{8}$/.test(phoneNumber));
  }, [phoneNumber]);

  useEffect(() => {
    validEmail.current = /^\S+@\S+\.\S+$/.test(email);
  }, [email]);

  const regions = ["Akkar", "Baalbeck - Hermel", "Beirut", "Bekaa", "Mount Lebanon", "North Lebanon", "Nabatiyeh", "South Lebanon"];
  const bloodGroups = ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"];
  const idTypes = ["National ID", "Passport"];
  const userTypes = ["patient", "doctor", "hospital"];
  // const [fade, setFade] = useState({ step0: true, step1: false, step2: false });
  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleNext = () => {
    // event.preventDefault();
    setActiveStep(activeStep + 1);
    const newarr = swipe.map((index, i) => {
      if (i === activeStep + 1) {
        return true;
      }
      return false;
    });
    setSwipe(newarr);
  };
  const handlePrevious = (event) => {
    event.preventDefault();
    setActiveStep(activeStep - 1);
    const newarr = swipe.map((index, i) => {
      if (i === activeStep - 1) {
        return true;
      }
      return false;
    });
    setSwipe(newarr);
  };
  const handleSignIn = async (type) => {
    let data = {
      email,
      password,
    };
    try {
      loading.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + `/${type}/signin`, data);

      if (res.status != 201) {
        loading.setIsLoading(false);
        console.log(res.message);
      }
      const reponse = await res.data;

      if (type == "patient") {
        console.log(reponse);
        navigate(`/${reponse.userId}`);
        loading.setIsLoading(false);
        auth.login(reponse.userId, reponse.token);
        navigate("/");
      } else if (type == "doctor") {
        navigate("/");
        loading.setIsLoading(false);
        auth.highLogin(reponse.userId, reponse.token, "doctor");
        setRole("choosePatient");
      } else {
        navigate("/");
        loading.setIsLoading(false);
        auth.highLogin(reponse.userId, reponse.token, "hospital");
        setRole("choosePatient");
      }
      loading.setIsLoading(false);
    } catch (err) {
      loading.setIsLoading(false);
      setIsError(true);
      // setError(err.response.data.message);
    }
  };

  const submitVerficationCode = async (type) => {
    let data = {
      email,
      code,
    };

    try {
      loading.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + `/${type}/verifyCode`, data);

      if (res.status != 201) {
        loading.setIsLoading(false);
        console.log("error with verification code ");
      }
      const reponse = await res.data;
      if (type == "doctor") {
        navigate("/");
        loading.setIsLoading(false);
        auth.highLogin(reponse.user._id, reponse.token, "doctor");
        setRole("choosePatient");
      } else if (type == "hospital") {
        // navigate("/personalinfo");
        loading.setIsLoading(false);
        auth.highLogin(reponse.user._id, reponse.token, "hospital");
        setRole("choosePatient");
      } else {
        // navigate("/personalinfo");
        loading.setIsLoading(false);
        auth.login(reponse.user._id, reponse.token);
        navigate(`/${reponse.user._id}`);
      }
      loading.setIsLoading(false);
    } catch (err) {
      loading.setIsLoading(false);
      console.log(err.message);
    }
  };

  const submit = async () => {
    let data = {
      firstName,
      lastName,
      fatherName,
      motherName,
      birthDate,
      bloodGroup,
      email,
      address,
      city,
      region,
      password,
      phoneNumber,
      idType,
      idNumber,
      gender,
      weight,
      height,
    };
    try {
      loading.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/patient/signup", data);

      if (res.status !== 201) {
        loading.setIsLoading(false);
        console.log("error signin up");
      }

      // auth.login(reponse.user._id, reponse.token);
      // navigate("/");

      loading.setIsLoading(false);
      handleNext();
    } catch (err) {
      loading.setIsLoading(false);
      setIsError(true);
      setError(err.response.data.message);
      console.log(err.response.data.message);
    }
  };

  const submitDoctor = async () => {
    let data = {
      firstName,
      lastName,
      fatherName,
      motherName,
      birthDate,
      bloodGroup,
      email,
      clinicAddress: address,
      city,
      region,
      password,
      phoneNumber,
      idType,
      idNumber,
      gender,
      proficiency,
      lisOfHospitals,
    };
    try {
      loading.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/doctor/signup", data);

      if (res.status != 201) {
        loading.setIsLoading(false);
        console.log("error signin up");
      }
      const reponse = await res.data;
      // auth.highLogin(reponse.userId, reponse.token);
      // setRole("choosePatient");
      loading.setIsLoading(false);
      handleNext();
    } catch (err) {
      loading.setIsLoading(false);
      console.log(err.message);
    }
  };

  const submitHospital = async () => {
    let data = {
      email,
      hospitalName,
      city,
      region,
      address,
      password,
      phoneNumber,
    };
    try {
      loading.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/hospital/signup", data);

      if (res.status != 201) {
        loading.setIsLoading(false);
        console.log("error signin up");
      }
      const reponse = await res.data;
      // auth.highLogin(reponse.userId, reponse.token);
      // setRole("choosePatient");
      loading.setIsLoading(false);
      handleNext();
    } catch (err) {
      loading.setIsLoading(false);
      console.log(err.message);
    }
  };

  // const testlocal = () => {
  //   console.log("sss");
  //   auth.login("aa", "aa");
  // };
  return (
    <>
      <StyledEngineProvider injectFirst>
        <div className={auth.token ? " hidef" : "curtain"}></div>
        <div className={auth.token ? "hidef" : "mainForm"}>
          {/* <button
            className="close"
            onClick={() => {
              setHide(true);
              console.log(hide);
            }}>
            close
          </button> */}
          {role === "unset" && (
            <div className="selectRole">
              <Typography sx={{ color: "var(--main-blue)", fontWeight: "bold", fontSize: "x-large" }}>SIGN UP AS</Typography>
              <Typography className="signInLink" onClick={() => setRole("singIn")}>
                SignIn
              </Typography>
              <div className="roles">
                <div onClick={() => setRole("patient")}>
                  <img src={patientSvg} alt="logo" style={{ width: "50%" }} />
                </div>
                <div onClick={() => setRole("hospital")}>
                  <img src={mySvg} alt="logo" style={{ width: "40%" }} />
                </div>
                <div onClick={() => setRole("doctor")}>
                  <img src={doctorSvg} alt="logo" style={{ width: "40%" }} />
                </div>
              </div>
            </div>
          )}

          {role === "choosePatient" && (
            <>
              <div className="signInform">
                {/* <IconButton className="exitSignIn" onClick={reset}>
                  <CloseIcon sx={{ marginLeft: "90px" }} />
                </IconButton> */}
                <Typography sx={{ color: "var(--main-blue)", fontWeight: "bold", fontSize: "x-large" }}>Enter A patient creds</Typography>
                <hr style={{ width: "100%", marginBottom: "30px" }} />
                <div className="signInInputs">
                  <TextField className="bg " label="Email" variant="standard" size="small" required fullWidth onChange={(e) => setEmail(e.target.value)} />
                  <TextField className="bg " label="Password" variant="standard" size="small" fullWidth required onChange={(e) => setPassword(e.target.value)} />
                  {isError && (
                    <Typography variant="body1" color="red">
                      {error}
                    </Typography>
                  )}
                  <Button variant="contained" sx={{ width: "30%", left: "70%" }} onClick={() => handleSignIn("patient")}>
                    Sign In
                  </Button>
                </div>
              </div>
            </>
          )}

          {role === "singIn" && (
            <>
              <div className="signInform">
                <IconButton className="exitSignIn" onClick={reset}>
                  <CloseIcon sx={{ marginLeft: "90px" }} />
                </IconButton>
                <Typography sx={{ color: "var(--main-blue)", fontWeight: "bold", fontSize: "x-large" }}>SIGN IN</Typography>
                <hr style={{ width: "100%", marginBottom: "30px" }} />
                <div className="signInInputs">
                  <TextField className="bg " label="Email" variant="standard" size="small" required fullWidth onChange={(e) => setEmail(e.target.value)} />
                  <TextField className="bg " label="Password" variant="standard" size="small" fullWidth required onChange={(e) => setPassword(e.target.value)} />
                  <Autocomplete
                    fullWidth
                    className="bg "
                    size="small"
                    disablePortal
                    id="singInAs"
                    options={userTypes}
                    onChange={(e, newValue) => setUserType(newValue)}
                    renderInput={(params) => <TextField {...params} label="Sign As" />}
                  />
                  {isError && (
                    <Typography variant="body1" color="red">
                      {error}
                    </Typography>
                  )}
                  <Button variant="contained" sx={{ width: "30%", left: "70%" }} onClick={() => handleSignIn(userType)}>
                    Sign In
                  </Button>
                </div>
              </div>
            </>
          )}
          {role === "doctor" && (
            <>
              <div className="stepper">
                <Stepper activeStep={activeStep}>
                  <Step>
                    <StepLabel></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                  </Step>
                </Stepper>
              </div>
              <Box className={swipe[0] ? "signform slide" : "signform fade"} component="form" noValidate>
                <TextField className="sm" label="First Name" variant="standard" size="small" required onChange={(e) => setFirstName(e.target.value)} />
                <TextField className="sm" label="Last Name" variant="standard" size="small" required onChange={(e) => setLastName(e.target.value)} />
                <TextField className="sm" label="Father Name" variant="standard" size="small" required onChange={(e) => setFatherName(e.target.value)} />
                <TextField className="sm" label="Mother Name" variant="standard" size="small" onChange={(e) => setMotherName(e.target.value)} required />
                <TextField
                  type="email"
                  className="bg"
                  label="Email"
                  variant="standard"
                  size="small"
                  fullWidth
                  error={!validEmail.current}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl className="sm" variant="standard" error={!validPassword.current}>
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={(a) => setPassword(a.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {!validPassword.current && (
                    <Typography variant="body1" color="red" sx={{ fontSize: ".9rem" }}>
                      At least 8 charachters with numbers
                    </Typography>
                  )}
                </FormControl>
                <FormControl className="sm" variant="standard" error={confirmPassword !== password}>
                  <InputLabel htmlFor="standard-adornment-confirmpassword">Confirm Password</InputLabel>
                  <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="standard-adornment-confirmpassword"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {confirmPassword !== password && (
                    <Typography variant="body1" color="red" sx={{ fontSize: ".9rem" }}>
                      Password should match
                    </Typography>
                  )}
                </FormControl>
                <FormControl className="bg" variant="standard" error={!validPhone}>
                  <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
                  <Input type="text" id="phone-number" startAdornment={<InputAdornment position="start">+961</InputAdornment>} onChange={(e) => setPhoneNumber(e.target.value)} />
                </FormControl>
                <Button
                  className="nextIcon"
                  variant="contained"
                  endIcon={<SendIcon fontSize="large" />}
                  onClick={handleNext}
                  disabled={
                    !validEmail.current ||
                    !validPassword.current ||
                    !validPhone ||
                    password !== confirmPassword ||
                    !testNames(firstName) ||
                    !testNames(lastName) ||
                    !testNames(motherName) ||
                    !testNames(fatherName)
                  }>
                  Next
                </Button>
              </Box>
              <IconButton className="finishStep" onClick={reset}>
                <CloseIcon />
              </IconButton>
              <Box className={swipe[1] ? "signform slide" : "signform fade"} component="form" noValidate={false}>
                <InputLabel htmlFor="bd">Birth Date</InputLabel>
                <FormControl className="bg" fullWidth>
                  <Input
                    id="bd"
                    type="date"
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                    }}
                  />
                </FormControl>

                <Autocomplete
                  className="sm"
                  size="small"
                  disablePortal
                  id="region"
                  options={regions}
                  onChange={(e, newValue) => setRegion(newValue)}
                  renderInput={(params) => <TextField {...params} label="region" />}
                />
                <TextField className="sm" label="City" variant="standard" size="small" required onChange={(e) => setCity(e.target.value)} />
                {/* <Autocomplete className="sm" size="small" disablePortal id="region" hopitals={regions} renderInput={(params) => <TextField {...params} label="City" />} /> */}
                <TextField className="bg " label="Clinic Address" fullWidth multiline size="small" maxRows={3} onChange={(e) => setAddress(e.target.value)} />
                <Autocomplete
                  className="sm"
                  size="small"
                  disablePortal
                  id="idDocument"
                  options={idTypes}
                  onChange={(e, evalue) => setIdType(evalue)}
                  renderInput={(params) => <TextField {...params} label="ID Document" />}
                />
                <TextField className="bg" type="number" label="ID Number" size="small" onChange={(e) => setIdNumber(e.target.value)} />
                <Button
                  className="nextIcon"
                  variant="contained"
                  endIcon={<SendIcon fontSize="large" />}
                  onClick={handleNext}
                  disabled={birthDate == "" || region == "" || city == "" || idNumber == "" || idType == "" || address == ""}>
                  Next
                </Button>
                <Button className="previousIcon" variant="contained" onClick={handlePrevious}>
                  Previous
                </Button>
              </Box>
              <Box className={swipe[2] ? "signform slide" : "signform fade"} component="form" noValidate={false}>
                <TextField className="bg" fullWidth label="Proficiency" variant="standard" size="small" required onChange={(e) => setProficiency(e.target.value)} />
                <TextField className="bg" fullWidth label="Hopitals" variant="standard" size="small" required onChange={(e) => setLisOfHospitals(e.target.value)} />
                <Autocomplete
                  className="sm"
                  size="small"
                  disablePortal
                  id="bloodGroup"
                  onChange={(e, val) => setBloodGroup(val)}
                  options={bloodGroups}
                  renderInput={(params) => <TextField {...params} label="Blood Type" />}
                />
                <Autocomplete
                  className="sm"
                  size="small"
                  disablePortal
                  id="gender"
                  onChange={(e, val) => setGender(val)}
                  options={["Male", "Female"]}
                  renderInput={(params) => <TextField {...params} label="Gender" />}
                />
                <Button className="nextIcon" variant="contained" endIcon={<SendIcon fontSize="large" />} onClick={submitDoctor} disabled={gender === "" || bloodGroup === ""}>
                  Next
                </Button>
                <Button className="previousIcon" variant="contained" onClick={handlePrevious}>
                  Previous
                </Button>
              </Box>
              <Box className={swipe[3] ? "signform slide" : "signform fade"} component="form" noValidate={false}>
                <Typography sx={{ color: "var(--main-blue)", fontWeight: "bold", marginBottom: "50px" }} variant="h6">
                  An verification code has been sent to your email.
                </Typography>
                <TextField label="code" size="small" onChange={(e) => setCode(e.target.value)} />
                <Button
                  className="nextIcon"
                  variant="contained"
                  onClick={() => {
                    submitVerficationCode("doctor");
                  }}>
                  Submit
                </Button>
              </Box>
            </>
          )}
          {/* ################################################################### */}
          {role === "hospital" && (
            <>
              <div className="stepper">
                <Stepper activeStep={activeStep}>
                  <Step>
                    <StepLabel></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                  </Step>
                </Stepper>
              </div>
              <Box className={swipe[0] ? "signform slide" : "signform fade"} component="form" noValidate>
                <TextField className="sm" label="Hospital Name" variant="standard" size="small" required onChange={(e) => setHospitalName(e.target.value)} />
                <FormControl className="bg" variant="standard" error={!validPhone.current}>
                  <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
                  <Input type="text" id="phone-number" startAdornment={<InputAdornment position="start">+961</InputAdornment>} onChange={(e) => setPhoneNumber(e.target.value)} />
                </FormControl>
                <TextField
                  type="email"
                  className="bg"
                  label="Email"
                  variant="standard"
                  size="small"
                  fullWidth
                  error={!validEmail.current}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl className="sm" variant="standard" error={!validPassword.current}>
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={(a) => setPassword(a.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {!validPassword.current && (
                    <Typography variant="body1" color="red" sx={{ fontSize: ".9rem" }}>
                      At least 8 charachters with numbers
                    </Typography>
                  )}
                </FormControl>
                <FormControl className="sm" variant="standard" error={confirmPassword !== password}>
                  <InputLabel htmlFor="standard-adornment-confirmpassword">Confirm Password</InputLabel>
                  <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="standard-adornment-confirmpassword"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {confirmPassword !== password && (
                    <Typography variant="body1" color="red" sx={{ fontSize: ".9rem" }}>
                      Passwords should match
                    </Typography>
                  )}
                </FormControl>
                <Autocomplete
                  className="sm"
                  size="small"
                  disablePortal
                  id="region"
                  options={regions}
                  onChange={(e, newValue) => setRegion(newValue)}
                  renderInput={(params) => <TextField {...params} label="region" />}
                />
                <TextField className="sm" label="City" variant="standard" size="small" required onChange={(e) => setCity(e.target.value)} />
                <TextField className="bg " label="Address" fullWidth multiline size="small" maxRows={3} onChange={(e) => setAddress(e.target.value)} />
                <Button
                  className="nextIcon"
                  variant="contained"
                  endIcon={<SendIcon fontSize="large" />}
                  // onClick={handleNext}
                  onClick={submitHospital}
                  disabled={
                    !validEmail.current ||
                    !validPassword ||
                    !validPhone ||
                    password !== confirmPassword ||
                    !testNames(hospitalName) ||
                    !testNames(region) ||
                    !testNames(city) ||
                    !testNames(address)
                  }>
                  Next
                </Button>
              </Box>
              <IconButton className="finishStep" onClick={reset}>
                <CloseIcon />
              </IconButton>
              {/* <Box className={swipe[1] ? "signform slide" : "signform fade"} component="form" noValidate={false}>
                <Typography variant="h3"> Identity proof</Typography>
                <TextField className="bg" label="ID Number" size="small" onChange={(e) => setIdNumber(e.target.value)} />
                <Button className="nextIcon" variant="contained" endIcon={<SendIcon fontSize="large" />} onClick={handleNext}>
                  Next
                </Button>
                <Button className="previousIcon" variant="contained" onClick={handlePrevious}>
                  Previous
                </Button>
              </Box> */}
              {/* <Box className={swipe[1] ? "signform slide" : "signform fade"} component="form" noValidate={false}>
                <TextField className="bg" fullWidth label="Proficiency" variant="standard" size="small" required onChange={(e) => setProficiency(e.target.value)} />
                <Button className="nextIcon" variant="contained" endIcon={<SendIcon fontSize="large" />} onClick={submitDoctor} disabled={gender === "" || bloodGroup === ""}>
                  Next
                </Button>
                <Button className="previousIcon" variant="contained" onClick={handlePrevious}>
                  Previous
                </Button>
              </Box> */}
              <Box className={swipe[1] ? "signform slide" : "signform fade"} component="form" noValidate={false}>
                <Typography sx={{ color: "var(--main-blue)", fontWeight: "bold", marginBottom: "50px" }} variant="h6">
                  A verification code has been sent to your email.
                </Typography>
                <TextField label="code" size="small" onChange={(e) => setCode(e.target.value)} sx={{ marginBottom: "50px" }} />
                <Button
                  className="nextIcon"
                  variant="contained"
                  onClick={() => {
                    submitVerficationCode("hospital");
                  }}>
                  Submit
                </Button>
              </Box>
            </>
          )}

          {role === "patient" && (
            <>
              <div className="stepper">
                <Stepper activeStep={activeStep}>
                  <Step>
                    <StepLabel></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                  </Step>
                  <Step>
                    <StepLabel></StepLabel>
                  </Step>
                </Stepper>
              </div>

              <Box className={swipe[0] ? "signform slide" : "signform fade"} component="form" noValidate>
                <TextField className="sm" label="First Name" variant="standard" size="small" required onChange={(e) => setFirstName(e.target.value)} />
                <TextField className="sm" label="Last Name" variant="standard" size="small" required onChange={(e) => setLastName(e.target.value)} />
                <TextField className="sm" label="Father Name" variant="standard" size="small" required onChange={(e) => setFatherName(e.target.value)} />
                <TextField className="sm" label="Mother Name" variant="standard" size="small" onChange={(e) => setMotherName(e.target.value)} required />
                <TextField
                  type="email"
                  className="bg"
                  label="Email"
                  variant="standard"
                  size="small"
                  fullWidth
                  error={!validEmail.current}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormControl className="sm" variant="standard" error={!validPassword.current}>
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? "text" : "password"}
                    onChange={(a) => setPassword(a.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {!validPassword.current && (
                    <Typography variant="body1" color="red" sx={{ fontSize: ".9rem" }}>
                      At least 8 charachters with numbers
                    </Typography>
                  )}
                </FormControl>
                <FormControl className="sm" variant="standard" error={confirmPassword !== password}>
                  <InputLabel htmlFor="standard-adornment-confirmpassword">Confirm Password</InputLabel>
                  <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    id="standard-adornment-confirmpassword"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {confirmPassword !== password && (
                    <Typography variant="body1" color="red" sx={{ fontSize: ".9rem" }}>
                      Password should match
                    </Typography>
                  )}
                </FormControl>
                <FormControl className="bg" variant="standard" error={!validPhone}>
                  <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
                  <Input type="text" id="phone-number" startAdornment={<InputAdornment position="start">+961</InputAdornment>} onChange={(e) => setPhoneNumber(e.target.value)} />
                </FormControl>

                <Button
                  className="nextIcon"
                  variant="contained"
                  endIcon={<SendIcon fontSize="large" />}
                  onClick={handleNext}
                  disabled={
                    !validEmail.current ||
                    !validPassword.current ||
                    !validPhone ||
                    password !== confirmPassword ||
                    !testNames(firstName) ||
                    !testNames(lastName) ||
                    !testNames(motherName) ||
                    !testNames(fatherName)
                  }>
                  Next
                </Button>
              </Box>
              <IconButton className="finishStep" onClick={reset}>
                <CloseIcon />
              </IconButton>
              <Box className={swipe[1] ? "signform slide" : "signform fade"} component="form" noValidate={false}>
                <InputLabel htmlFor="bd">Birth Date</InputLabel>
                <FormControl className="bg" fullWidth>
                  <Input
                    id="bd"
                    type="date"
                    onChange={(e) => {
                      setBirthDate(e.target.value);
                    }}
                  />
                </FormControl>
                <Autocomplete
                  className="sm"
                  size="small"
                  disablePortal
                  id="region"
                  options={regions}
                  onChange={(e, newValue) => setRegion(newValue)}
                  renderInput={(params) => <TextField {...params} label="region" />}
                />
                <TextField className="sm" label="City" variant="standard" size="small" required onChange={(e) => setCity(e.target.value)} />
                {/* <Autocomplete className="sm" size="small" disablePortal id="region" hopitals={regions} renderInput={(params) => <TextField {...params} label="City" />} /> */}
                <TextField className="bg " label="Address" fullWidth multiline size="small" maxRows={3} onChange={(e) => setAddress(e.target.value)} />
                <Autocomplete
                  className="sm"
                  size="small"
                  disablePortal
                  id="idDocument"
                  options={idTypes}
                  onChange={(e, evalue) => setIdType(evalue)}
                  renderInput={(params) => <TextField {...params} label="ID Document" />}
                />
                <TextField className="bg" type="number" label="ID Number" size="small" onChange={(e) => setIdNumber(e.target.value)} />
                <Button
                  className="nextIcon"
                  variant="contained"
                  endIcon={<SendIcon fontSize="large" />}
                  onClick={handleNext}
                  disabled={birthDate == "" || region == "" || city == "" || idNumber == "" || idType == "" || address == ""}>
                  Next
                </Button>
                <Button className="previousIcon" variant="contained" onClick={handlePrevious}>
                  Previous
                </Button>
              </Box>
              <Box className={swipe[2] ? "signform slide" : "signform fade"} component="form" noValidate={false}>
                <TextField
                  className="sm"
                  type="number"
                  label="Weight"
                  variant="standard"
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
                  error={height < 30 || height > 220}
                  onChange={(e) => setHeight(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start">cm</InputAdornment> }}
                />
                <Autocomplete
                  className="sm"
                  size="small"
                  disablePortal
                  id="bloodGroup"
                  onChange={(e, val) => setBloodGroup(val)}
                  options={bloodGroups}
                  renderInput={(params) => <TextField {...params} label="Blood Type" />}
                />
                <Autocomplete
                  className="sm"
                  size="small"
                  disablePortal
                  id="gender"
                  onChange={(e, val) => setGender(val)}
                  options={["Male", "Female"]}
                  renderInput={(params) => <TextField {...params} label="Gender" />}
                />
                {isError && (
                  <Typography color="red" sx={{ marginBottom: "20px" }}>
                    {error}
                  </Typography>
                )}
                <Button
                  className="nextIcon"
                  variant="contained"
                  endIcon={<SendIcon fontSize="large" />}
                  onClick={submit}
                  disabled={weight > 250 || weight < 20 || height > 220 || height < 90 || gender === "" || bloodGroup === ""}>
                  Next
                </Button>
                <Button className="previousIcon" variant="contained" onClick={handlePrevious}>
                  Previous
                </Button>
              </Box>
              <Box className={swipe[3] ? "signform slide" : "signform fade"} component="form" noValidate={false}>
                <Typography sx={{ color: "var(--main-blue)", fontWeight: "bold", marginBottom: "50px" }} variant="h6">
                  A verification code has been sent to your email.
                </Typography>
                <TextField label="code" size="small" onChange={(e) => setCode(e.target.value)} sx={{ marginBottom: "50px" }} />
                <Button
                  className="nextIcon"
                  variant="contained"
                  onClick={() => {
                    submitVerficationCode("patient");
                  }}>
                  Submit
                </Button>
              </Box>
            </>
          )}
        </div>
      </StyledEngineProvider>
    </>
  );
};

export default SignUp;
