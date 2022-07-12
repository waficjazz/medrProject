import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { StyledEngineProvider } from "@mui/material/styles";
const Loading = () => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="loading">
        <CircularProgress sx={{ color: "var(--second-blue)" }} size="50px" />
      </div>
    </StyledEngineProvider>
  );
};

export default Loading;
