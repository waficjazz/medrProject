import React, { useState } from "react";
import "./ClinicalVisit.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { Typography, Checkbox, FormControlLabel, Link as MuiLink } from "@mui/material";
import VisitLabs from "../VisitLabs/VisitLabs";
import VisitImagings from "../VisitImagings/VisitImagings";
import VisitSurgeries from "../VisitSurgeries/VisitSurgeries";
import VisitPrescriptions from "../VisitPrescriptions/VisitPrescriptions";
const ClinicalVisit = ({ visit, visitc }) => {
  const [testShow, setTestShow] = useState("");
  return (
    <StyledEngineProvider injectFirst>
      {testShow == "" && (
        <div className="hospitalVisit">
          <Typography className="smheaders">Doctor Information</Typography>
          <hr />
          <div className="hospitalInfo">
            <div>
              <Typography className="internalText">
                Doctor's Name:
                <span className="internalData">{visit.firstName || visit.name}</span>
              </Typography>
              <Typography className="internalText">
                Proficiency:
                <span className="internalData">{visit.proficiency[0]}</span>
              </Typography>
              <Typography className="internalText">
                Phone Number:
                <span className="internalData">{visit.phoneNumber}</span>
              </Typography>
              <Typography className="internalText">
                Email:
                <span className="internalData">{visit.email}</span>
              </Typography>
              <Typography className="internalText address">
                Clinic Address:
                <span className="internalData">{visit.clinicAddress}</span>
              </Typography>
            </div>
          </div>
          <Typography className="smheaders">Visit Information</Typography>
          <hr />
          <div className="hospitalInfo">
            <div>
              <Typography className="internalText">
                Cause:
                <span className="internalData">{visitc.cause}</span>
              </Typography>
              <Typography className="internalText">
                Date:
                <span className="internalData">{visitc.visitDate?.toString().slice(0, 10)}</span>
              </Typography>

              <Typography className="internalText address">
                Description:
                <span className="internalData">{visitc.description}</span>
              </Typography>
              <MuiLink className="internalLink " variant="button" onClick={() => setTestShow("prescriptions")}>
                Prescriptions
              </MuiLink>
              <MuiLink className="internalLink " variant="button" onClick={() => setTestShow("imagings")}>
                Imagings
              </MuiLink>
              <MuiLink className="internalLink " variant="button" onClick={() => setTestShow("labs")}>
                Lab Tests
              </MuiLink>
            </div>
          </div>
        </div>
      )}
      {testShow == "prescriptions" && <VisitPrescriptions visitId={visitc._id} close={() => setTestShow("")} />}
      {testShow == "imagings" && <VisitImagings visitId={visitc._id} close={() => setTestShow("")} />}
      {testShow == "labs" && <VisitLabs visitId={visitc._id} close={() => setTestShow("")} />}
    </StyledEngineProvider>
  );
};

export default ClinicalVisit;
