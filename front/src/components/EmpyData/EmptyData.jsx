import React from "react";
import { Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import "./EmptyData.css";
const EmptyData = (props) => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="empty">
        <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 108.67 122.88">
          <defs>
            <style>.cls-1{`fill-rule:evenodd;`}</style>
          </defs>
          <title>no-data</title>
          <path
            class="cls-1"
            fill="#00587a"
            d="M25.14,53.37a2.77,2.77,0,0,0,0,5.54H45.25a2.77,2.77,0,0,0,0-5.54Zm60.48-36.9,6.66,6.69-8,8.14,8,8.14L85.61,46.1l-8-8.09-8,8.1L63,39.43l8-8.14-8-8.15,6.67-6.65,8,8.08,8-8.1ZM77.77,0A30.91,30.91,0,0,1,91,58.82v57.69a6.38,6.38,0,0,1-6.37,6.37H6.37A6.38,6.38,0,0,1,0,116.51V22.4A6.38,6.38,0,0,1,6.37,16h44.3A30.89,30.89,0,0,1,77.77,0Zm7.78,60.81A30.92,30.92,0,0,1,48.32,21.52H6.37a.9.9,0,0,0-.63.26.92.92,0,0,0-.26.63V116.5a.89.89,0,0,0,.89.89H84.65a.9.9,0,0,0,.63-.26.92.92,0,0,0,.26-.63V60.81ZM25.14,92.22a2.74,2.74,0,0,0,0,5.48H63.61a2.74,2.74,0,1,0,0-5.48Zm0-19.41a2.74,2.74,0,0,0,0,5.48H63.61a2.74,2.74,0,0,0,0-5.48Z"
          />
        </svg>
        <Typography className="em"> {props.txt}</Typography>
      </div>
    </StyledEngineProvider>
  );
};

export default EmptyData;