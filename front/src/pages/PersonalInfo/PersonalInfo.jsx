import React from "react";
import { useState } from "react";
import { Checkbox, Typography, FormControlLabel, FormGroup } from "@mui/material";
import "./PersonalInfo.css";
import { StyledEngineProvider } from "@mui/material/styles";
import BarChartIcon from "@mui/icons-material/BarChart";
const PersonalInfo = () => {
  const boolArr = ["Medications:", "Chronic Disease:", "Allergies:", "Surgical History:", "Problems:"];
  const [boolArrExist, setBoolArrExist] = useState([true, false, false, false, false]);
  const diseases = ["dinoma ", "insuline", "sdfsdf", "dinoma ", "insuline", "sdfsdf"];
  return (
    <>
      <StyledEngineProvider injectFirst>
        <div className="personalPage">
          <div className="personalInfo">
            <Typography sx={{ fontWeight: "bold", fontSize: "1.35rem", color: "var(--main-blue)" }}>Personal Information</Typography>
            <hr />
            <div className="personalInfoBody">
              <Typography className="internalText">
                First Name:<span className="internalData">wafic</span>
              </Typography>
              <Typography className="internalText">
                Last Name:<span className="internalData">wafic</span>
              </Typography>
              <Typography className="internalText">
                Father's Name:<span className="internalData">wafic</span>
              </Typography>
              <Typography className="internalText">
                Mother's Name:<span className="internalData">wafic</span>
              </Typography>
              <Typography className="internalText">
                Email:<span className="internalData">waficojazzaro@gmail.com</span>
              </Typography>
              <Typography className="internalText">
                Phone Number:<span className="internalData">76099876</span>
              </Typography>
              <Typography className="internalText">
                Governate:<span className="internalData">Mount-Lebanon</span>
              </Typography>
              <Typography className="internalText">
                City:<span className="internalData">Daraya</span>
              </Typography>
              <Typography className="internalText address">
                Address:<span className="internalData">Daraya Main street 1st floor</span>
              </Typography>
            </div>
          </div>
          <div className="medicalInfo">
            <Typography sx={{ fontWeight: "bold", fontSize: "1.35rem", color: "var(--main-blue)" }}>Medical Information</Typography>
            <hr />
            <div className="medicalInfoBody">
              <Typography className="internalText ">
                Gender:<span className="internalData">Male</span>
              </Typography>
              <Typography className="internalText ">
                Weight:<span className="internalData">70kg</span>
              </Typography>
              <Typography className="internalText ">
                Height:<span className="internalData">170cm</span>
              </Typography>
              <Typography className="internalText ">
                Blood Group:<span className="internalData">AB+</span>
              </Typography>
              <Typography className="internalText ">
                Birth Date:<span className="internalData">13 october 2001</span>
              </Typography>
              {boolArr.map((item, index) => {
                return (
                  <Typography className="internalText " key={index}>
                    {item}
                    <span className="internalData">
                      <FormControlLabel control={<Checkbox defaultChecked size="small" sx={{ padding: 0 }} disabled />} label="Yes" sx={{ marginX: "2px" }} />
                      <FormControlLabel control={<Checkbox size="small" checked={false} disabled sx={{ padding: 0 }} />} label="No" sx={{ marginX: "2px" }} />
                    </span>
                  </Typography>
                );
              })}
            </div>
          </div>
          <div className="smallParts">
            {boolArr.map((item, index) => {
              return (
                <div className="medications" key={index}>
                  <Typography className="smheaders">{item}</Typography>
                  <div className={boolArrExist[index] ? "medicationsBody " : "medicationsBody empty"}>
                    {boolArrExist[index] && (
                      <>
                        <ul>
                          {diseases.map((item, index) => {
                            return <li key={index}>{item}</li>;
                          })}
                        </ul>
                      </>
                    )}
                    <BarChartIcon sx={{ fontSize: "50px", color: "var(--third-blue)" }} />
                    <Typography className="internalData">No data</Typography>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </StyledEngineProvider>
    </>
  );
};

export default PersonalInfo;
