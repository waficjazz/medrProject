import React from "react";
import { useState, useRef, useEffect } from "react";
import "./SignUp.css";
import { Step, Stepper, StepLabel, TextField, FormControl, InputLabel, Input, Box, IconButton, InputAdornment, Autocomplete } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "@mui/material";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [swipe, setSwipe] = useState([true, false, false, false]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("dsafasdfasd123");
  const [confirmPassword, setConfirmPassword] = useState("dsafasdfasd123");
  const [phoneNumber, setPhoneNumber] = useState("6223223");
  const [address, setAddress] = useState("");
  const validEmail = useRef(true);
  const validPassword = useRef(true);
  const validPhone = useRef(true);
  useEffect(() => {
    validPassword.current = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  }, [password]);

  useEffect(() => {
    validPhone.current = /^[0-9]{7}$/.test(phoneNumber);
  }, [phoneNumber]);

  useEffect(() => {
    validEmail.current = /^\S+@\S+\.\S+$/.test(email);
  }, [email]);

  const regions = ["Akkar", "Baalbeck - Hermel", "Beirut", "Bekaa", "Mount Lebanon", "North Lebanon", "Nabatiyeh", "South Lebanon"];
  const bloodType = ["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"];
  const idType = ["National ID", "Passport"];
  // const [fade, setFade] = useState({ step0: true, step1: false, step2: false });
  const handleClickShowPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleNext = (event) => {
    event.preventDefault();
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

  return (
    <>
      <StyledEngineProvider injectFirst>
        <div className="curtain"></div>
        <div className="mainForm">
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
          <Box id="step0" className={swipe[0] ? "signform slide" : "signform fade"} component="form" noValidate>
            <TextField className="sm" label="First Name" variant="standard" size="small" required onChange={(e) => setFirstName(e.target.value)} />
            <TextField className="sm" label="Last Name" variant="standard" size="small" required onChange={(e) => setLastName(e.target.value)} />
            <TextField className="sm" label="Father Name" variant="standard" size="small" required onChange={(e) => setFatherName(e.target.value)} />
            <TextField className="sm" label="Mother Name" variant="standard" size="small" onChange={(e) => setMotherName(e.target.value)} required />
            <TextField type="email" className="bg" label="Email" variant="standard" size="small" fullWidth error={!validEmail.current} onChange={(e) => setEmail(e.target.value)} />
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
            </FormControl>
            <FormControl className="sm" variant="standard" error={confirmPassword !== password}>
              <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
              <Input
                onChange={(e) => setConfirmPassword(e.target.value)}
                id="standard-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl className="bg" variant="standard" error={!validPhone.current}>
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
                !validPassword ||
                !validPhone ||
                password !== confirmPassword ||
                firstName.length < 2 ||
                lastName.length < 2 ||
                motherName.length < 2 ||
                fatherName.length < 2
              }>
              Next
            </Button>
          </Box>
          <Box id="step2" className={swipe[1] ? "signform slide" : "signform fade"} component="form" noValidate={false}>
            <FormControl className="bg" fullWidth>
              {/* <InputLabel htmlFor="standard-adornment-password">Birth Date</InputLabel> */}
              <Input id="standard-adornment-password" type="date" />
            </FormControl>
            <Autocomplete className="sm" size="small" disablePortal id="region" options={regions} renderInput={(params) => <TextField {...params} label="region" />} />
            <Autocomplete className="sm" size="small" disablePortal id="region" options={regions} renderInput={(params) => <TextField {...params} label="City" />} />
            <TextField className="bg " label="Address" fullWidth multiline size="small" maxRows={3} />
            <Autocomplete className="sm" size="small" disablePortal id="idDocument" options={idType} renderInput={(params) => <TextField {...params} label="ID Document" />} />
            <TextField className="bg" label="ID Number" size="small" />
            <Button className="nextIcon" variant="contained" endIcon={<SendIcon fontSize="large" />} onClick={handleNext}>
              Next
            </Button>
            <Button className="previousIcon" variant="contained" onClick={handlePrevious}>
              Previous
            </Button>
          </Box>
          <Box id="step2" className={swipe[2] ? "signform slide" : "signform fade"} component="form" noValidate={false}>
            <TextField
              className="sm"
              type="number"
              label="Weight"
              variant="standard"
              size="small"
              InputProps={{ startAdornment: <InputAdornment position="start">kg</InputAdornment> }}
            />
            <TextField
              className="sm"
              label="Height"
              variant="standard"
              size="small"
              type="number"
              InputProps={{ startAdornment: <InputAdornment position="start">cm</InputAdornment> }}
            />
            <Autocomplete className="sm" size="small" disablePortal id="bloodType" options={bloodType} renderInput={(params) => <TextField {...params} label="Blood Type" />} />
            <Button className="nextIcon" variant="contained" endIcon={<SendIcon fontSize="large" />} onClick={handleNext}>
              Next
            </Button>
            <Button className="previousIcon" variant="contained" onClick={handlePrevious}>
              Previous
            </Button>
          </Box>
          <Box id="step2" className={swipe[3] ? "signform slide" : "signform fade"} component="form" noValidate={false}>
            <TextField label="code" size="small" />
          </Box>
        </div>
      </StyledEngineProvider>
    </>
  );
};

export default SignUp;
