import React from "react";
import "./SignUp.css";
import { Step, Stepper, StepLabel, StepIcon, StepButton, Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import BadgeIcon from "@mui/icons-material/Badge";

function testIcon() {
  return <div className="QontoStepIcon-circle" />;
}

const SignUp = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <div className="curtain"></div>
        <div className="mainForm">
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
      </StyledEngineProvider>
    </>
  );
};

export default SignUp;
