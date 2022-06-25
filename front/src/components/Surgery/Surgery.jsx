import React, { useEffect, useState } from "react";
import "../HospitalVisit/HospitalVisit";
import { StyledEngineProvider } from "@mui/material/styles";
import { Checkbox, FormControlLabel, Link as MuiLink } from "@mui/material";
import { Typography, Table, TableCell, TableRow, TableHead, TableBody, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisitLabs from "../VisitLabs/VisitLabs";
import VisitImagings from "../VisitImagings/VisitImagings";
import VisitSurgeries from "../VisitSurgeries/VisitSurgeries";
const Surgery = ({ surgery, hospital, close }) => {
  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisit">
        <Typography className="smheaders">Hospital Information</Typography>
        <hr />
        <div className="hospitalInfo">
          <div>
            <Typography className="internalText">
              Name:
              <span className="internalData">{hospital.hospitalName}</span>
            </Typography>
            <Typography className="internalText">
              Phone Number:
              <span className="internalData">{hospital.phoneNumber}</span>
            </Typography>
            <Typography className="internalText">
              Email:
              <span className="internalData">{hospital.email}</span>
            </Typography>
            <Typography className="internalText address">
              Address:
              <span className="internalData">{hospital.address}</span>
            </Typography>
          </div>
        </div>
        <Typography className="smheaders">Surgery Information</Typography>
        <hr />
        <div className="hospitalInfo">
          <div>
            <Typography className="internalText">
              Name:
              <span className="internalData">{surgery.name}</span>
            </Typography>
            <Typography className="internalText">
              Cause:
              <span className="internalData">{surgery.cause}</span>
            </Typography>
            <Typography className="internalText">
              Surgery Date:
              <span className="internalData">{surgery.date?.toString().slice(0, 10)}</span>
            </Typography>
            <Typography className="internalText address">
              Description:
              <span className="internalData">{surgery.description}</span>
            </Typography>
            <Typography className="internalText address">
              Doctors:
              <span className="internalData">doctor1 , doctor2 </span>
            </Typography>
          </div>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default Surgery;
