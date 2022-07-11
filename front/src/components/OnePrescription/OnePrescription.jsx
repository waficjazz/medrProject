import React, { useEffect, useState } from "react";
import "../HospitalVisit/HospitalVisit.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { Checkbox, FormControlLabel, Link as MuiLink } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Typography, Table, TableCell, TableRow, TableHead, TableBody, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import VisitLabs from "../VisitLabs/VisitLabs";
// import VisitImagings from "../VisitImagings/VisitImagings";
// import VisitSurgeries from "../VisitSurgeries/VisitSurgeries";
const OnePrescription = ({ presc, close }) => {
  const [testShow, setTestShow] = useState("");
  return (
    <StyledEngineProvider injectFirst>
      {testShow == "" && (
        <div className="hospitalVisit">
          {presc.description && (
            <>
              <Typography className="smheaders">Description</Typography>
              <hr />
              <Typography className="internalData">{presc.description}</Typography>
            </>
          )}
          <div className="prescList">
            <div>
              <Typography className="smheaders">Labs</Typography>
              <hr />
              <ul>
                {presc.labs.map((lab) => (
                  <li>{lab}</li>
                ))}
                {presc.labs.length === 0 && (
                  <>
                    <BarChartIcon sx={{ fontSize: "50px", color: "var(--third-blue)", marginLeft: "50%" }} />
                    <Typography className="internalData" sx={{ marginLeft: "50% !important" }}>
                      No Labs
                    </Typography>
                  </>
                )}
              </ul>
            </div>
            <div>
              <Typography className="smheaders">Medicaitons</Typography>
              <hr />
              <ul>
                {presc.medications.map((med) => (
                  <li>{med}</li>
                ))}
                {presc.medications.length === 0 && (
                  <>
                    <BarChartIcon sx={{ fontSize: "50px", color: "var(--third-blue)", marginLeft: "50%" }} />
                    <Typography className="internalData" sx={{ marginLeft: "50% !important" }}>
                      No Medications
                    </Typography>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
      {/* {testShow == "imagings" && <VisitImagings visitId={visit._id} close={() => setTestShow("")} />}
      {testShow == "labs" && <VisitLabs visitId={visit._id} close={() => setTestShow("")} />}
    {testShow == "surgeries" && <VisitSurgeries visitId={visit._id} close={() => setTestShow("")} />} */}
    </StyledEngineProvider>
  );
};

export default OnePrescription;
