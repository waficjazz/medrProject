import React from "react";
import "./SignUp.css";
import { Step, Stepper, StepLabel } from "@mui/material";
const SignUp = () => {
  return (
    <>
      <div className="curtain"></div>
      <div className="mainForm">
        <Stepper>
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
    </>
  );
};

export default SignUp;
