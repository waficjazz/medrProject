import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { Checkbox, Typography, FormControlLabel } from "@mui/material";
import "./PersonalInfo.css";
import { StyledEngineProvider } from "@mui/material/styles";
import BarChartIcon from "@mui/icons-material/BarChart";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addInfo } from "../../reducers/patientReducer";
import { useParams } from "react-router-dom";
import { ShowContext, RegContext, LoadingContext } from "../../context";
import MiniForm from "../../components/MiniForm/MiniForm";
import Loading from "../../components/Loading";
const PersonalInfo = () => {
  const { id } = useParams();
  const [openMini, setOpenMini] = useState(false);
  const { show, setShow } = useContext(ShowContext);
  const auth = useContext(RegContext);
  const loading = useContext(LoadingContext);
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.value);
  const boolArr = ["Medications:", "Chronic Disease:", "Allergies:", "Surgical History:", "Problems:"];
  const [boolArrExist, setBoolArrExist] = useState(["permanentMeds", "chronicDisease", "allergies", "surgicalHistory", "healthProblems"]);
  const [props, setProps] = useState("");
  const diseases = ["dinoma ", "insuline", "sdfsdf", "dinoma ", "insuline", "sdfsdf"];
  const [localPatient, setLocalPatient] = useState("");

  useEffect(() => {
    console.log(process.env.REACT_APP_URL);
    let uid;
    if (!show) {
      const storedData = JSON.parse(localStorage.getItem("userData"));

      if (storedData != null) {
        uid = storedData.uid;
      } else {
        uid = id;
      }

      const getPatientInfo = async () => {
        try {
          loading.setIsLoading(true);
          const response = await axios.get(process.env.REACT_APP_URL + `/patient/info/${uid}`);
          setLocalPatient(response.data);
          dispatch(addInfo(response.data));
          loading.setIsLoading(false);
        } catch (err) {
          console.log(err.message);
        }
      };
      getPatientInfo();
    }
  }, [show, openMini]);

  const testCheck = (index) => {
    if (Object.keys(localPatient).length > 0) {
      if (localPatient[boolArrExist[index]].length > 0) {
        return true;
      }

      return false;
    }

    return false;
  };
  return (
    <>
      <StyledEngineProvider injectFirst>
        <div className="personalPage">
          {openMini && <MiniForm name={props} close={() => setOpenMini(false)} />}
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
                      <FormControlLabel control={<Checkbox checked={testCheck(index)} size="small" sx={{ padding: 0 }} disabled />} label="Yes" sx={{ marginX: "2px" }} />
                      <FormControlLabel control={<Checkbox size="small" checked={!testCheck(index)} disabled sx={{ padding: 0 }} />} label="No" sx={{ marginX: "2px" }} />
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
                  <div
                    className="medications"
                    key={index}
                    onClick={() => {
                      setOpenMini(true);
                      setProps(boolArrExist[index]);
                    }}>
                    <Typography className="smheaders">{item}</Typography>
                    <div className={patient[boolArrExist[index]].length > 0 ? "medicationsBody " : "medicationsBody empty"}>
                      {boolArrExist[index] && (
                        <>
                          <ul>
                            {patient[boolArrExist[index]].map((item, index) => {
                              return <li key={index}>{item}</li>;
                            })}
                          </ul>
                        </>
                      )}
                      {patient[boolArrExist[index]].length === 0 && (
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
