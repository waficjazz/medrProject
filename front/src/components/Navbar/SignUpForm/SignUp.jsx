import React from "react";
import "./SignUp.css";
import { Step, Stepper, StepLabel, TextField, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";

function testIcon() {
  return <div className="QontoStepIcon-circle" />;
}

const SignUp = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <div className="curtain"></div>
        <div className="mainForm">
          <div className="stepper">
            <Stepper activeStep={3}>
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
              <Step>
                <StepLabel></StepLabel>
              </Step>
            </Stepper>
          </div>
          <div className="signform">
            <TextField className="sm" label="First Name" variant="standard" size="small" margin="normal" />
            <TextField className="sm" label="Last Name" variant="standard" size="small" margin="normal" />
            <TextField className="bg" label="Last Name" variant="standard" size="small" fullWidth margin="normal" />
          </div>
        </div>
      </StyledEngineProvider>
    </>
  );
};

export default SignUp;
