import React from "react";
import { useState, useEffect } from "react";
import { Checkbox, Typography, FormControlLabel, FormGroup } from "@mui/material";
import "./PersonalInfo.css";
import { StyledEngineProvider } from "@mui/material/styles";
import BarChartIcon from "@mui/icons-material/BarChart";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addInfo } from "../../reducers/patientReducer";
const PersonalInfo = () => {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.value);
  const boolArr = ["Medications:", "Chronic Disease:", "Allergies:", "Surgical History:", "Problems:"];
  const [boolArrExist, setBoolArrExist] = useState(["permanentMeds", "permanentMeds", "permanentMeds", "permanentMeds", "permanentMeds"]);
  const diseases = ["dinoma ", "insuline", "sdfsdf", "dinoma ", "insuline", "sdfsdf"];

  useEffect(() => {
    const getPatientInfo = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/patient/info/6288751aaa211e70072bd262");

        dispatch(addInfo(response.data));
      } catch (err) {
        console.log(err.message);
      }
    };
    getPatientInfo();
  }, []);
  return (
    <>
      <StyledEngineProvider injectFirst>
        <div className="personalPage">
          <div className="personalInfo">
            <Typography sx={{ fontWeight: "bold", fontSize: "1.35rem", color: "var(--main-blue)" }}>Personal Information</Typography>
            <hr />
            <div className="personalInfoBody">
              <Typography className="internalText">
                First Name:<span className="internalData">{patient.firstName}</span>
              </Typography>
              <Typography className="internalText">
                Last Name:<span className="internalData">{patient.lastName}</span>
              </Typography>
              <Typography className="internalText">
                Father's Name:<span className="internalData">{patient.fatherName}</span>
              </Typography>
              <Typography className="internalText">
                Mother's Name:<span className="internalData">{patient.motherName}</span>
              </Typography>
              <Typography className="internalText">
                Email:<span className="internalData">{patient.email}</span>
              </Typography>
              <Typography className="internalText">
                Phone Number:<span className="internalData">{patient.phoneNumber}</span>
              </Typography>
              <Typography className="internalText">
                Governate:<span className="internalData">{patient.region}</span>
              </Typography>
              <Typography className="internalText">
                City:<span className="internalData">{patient.city}</span>
              </Typography>
              <Typography className="internalText address">
                Address:<span className="internalData">{patient.address}</span>
              </Typography>
            </div>
          </div>
          <div className="medicalInfo">
            <Typography sx={{ fontWeight: "bold", fontSize: "1.35rem", color: "var(--main-blue)" }}>Medical Information</Typography>
            <hr />
            <div className="medicalInfoBody">
              <Typography className="internalText ">
                Gender:<span className="internalData">{patient.gender}</span>
              </Typography>
              <Typography className="internalText ">
                Weight:<span className="internalData">{patient.weight}kg</span>
              </Typography>
              <Typography className="internalText ">
                Height:<span className="internalData">{patient.height}cm</span>
              </Typography>
              <Typography className="internalText ">
                Blood Group:<span className="internalData">{patient.bloodGroup}</span>
              </Typography>
              <Typography className="internalText ">
                Birth Date:<span className="internalData">{patient.birthDate?.toString().slice(0, 10)}</span>
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
              if (Object.keys(patient).length !== 0) {
                // console.log(patient[boolArrExist[0]].length);
                return (
                  <div className="medications" key={index}>
                    <Typography className="smheaders">{item}</Typography>
                    <div className={patient[boolArrExist[0]].length > 0 ? "medicationsBody " : "medicationsBody empty"}>
                      {boolArrExist[index] && (
                        <>
                          <ul>
                            {patient[boolArrExist[0]].map((item, index) => {
                              return <li key={index}>{item}</li>;
                            })}
                          </ul>
                        </>
                      )}
                      {patient[boolArrExist[0]].length === 0 && (
                        <>
                          <BarChartIcon sx={{ fontSize: "50px", color: "var(--third-blue)" }} />
                          <Typography className="internalData">No data</Typography>
                        </>
                      )}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </StyledEngineProvider>
    </>
  );
};

export default PersonalInfo;
