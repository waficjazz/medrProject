import React from "react";
import { StyledEngineProvider } from "@mui/material";
import "./CustomPaper.css";
const CustomPaper = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="paperMain">
        <a href="http://www.africau.edu/images/default/sample.pdf"> test pdf</a>
      </div>
    </StyledEngineProvider>
  );
};

export default CustomPaper;
