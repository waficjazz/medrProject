import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";

import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Description from "@mui/icons-material/Description";
import MiniForm from "../MiniForm/MiniForm";
import ClearIcon from "@mui/icons-material/Clear";

const PrescForm = (props) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  // const patient = useSelector((state) => state.patient.value);
  const [tabValue, setTabValue] = useState("0");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [issuer, setIssuer] = useState("");
  const [description, setDescription] = useState("");
  const [medications, setMedications] = useState([]);
  const [medication, setMedication] = useState("");
  const [labs, setLabs] = useState([]);
  const [lab, setLab] = useState("");
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDelete = (i, t) => {
    let tmp;
    if (t === "medications") {
      tmp = [...medications];
      tmp.splice(i, 1);
      setMedications(tmp);
      console.log(medications);
    }
    if (t === "labs") {
      tmp = [...labs];
      tmp.splice(i, 1);
      setLabs(tmp);
    }
  };
  // useEffect(() => {
  //   if (props.type === "edit") {
  //     const getPrescription = async () => {
  //       try {
  //         const res = await axios.get(`http://localhost:5000/api/vaccination/one/${props.id}`);
  //         const data = await res.data[0];
  //         setName(data.name);
  //         setLocation(data.location);
  //         setNotes(data.notes);
  //         setDate(data.date?.toString().slice(0, 10));
  //         setShots(data.shots);
  //         setDoses(data.doses);
  //       } catch (err) {
  //         console.log(err.message);
  //       }
  //     };

  //     getPrescription();
  //   }
  //   setLocation("");
  //   setDate("");
  // }, [props]);

  const submit = async () => {
    let presc = {
      patientId,
      location,
      description,
      date,
      issuer,
      medications,
      labs,
    };
    try {
      const res = await axios.post("http://localhost:5000/api/prescription/add", presc);
      if (res.statusText === "Created") {
        props.close();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  // const handleEdit = async () => {
  //   let vaccination = {
  //     patientId,
  //     name,
  //     notes,
  //     shots,
  //     doses,
  //     date,
  //     location,
  //     id: props.id,
  //   };
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/vaccination/update", vaccination);
  //     if (res.statusText === "OK") {
  //       props.close();
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  return (
    <StyledEngineProvider injectFirst>
      <div className={props.isOpen ? "hVisitForm" : "notOpen"}>
        <div className="inside">
          <IconButton sx={{ marginLeft: "95%", float: "left" }} onClick={props.close}>
            <CloseIcon fontSize="medium" />
          </IconButton>
          <Typography variant="body1" sx={{ marginBottom: "14px", marginLeft: "2px", color: "var(--main-blue)", fontWeight: "bolder", fontSize: "1.1rem", height: "10%" }}>
            ADD PRESCRIPTION
          </Typography>
          <hr />
          <div className="hopitalForm">
            <TextField
              // defaultValue={name}
              value={issuer}
              size="small"
              label="Issuer"
              variant="standard"
              className="hospitalInputs"
              onChange={(e) => {
                setIssuer(e.target.value);
              }}
            />
            <TextField value={location} size="small" label="Location" variant="standard" className="hospitalInputs" onChange={(e) => setLocation(e.target.value)} />
            <TextField
              size="small"
              value={date}
              label="Date"
              variant="standard"
              type="date"
              focused
              className="hospitalInputs"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <TextField size="small" value={description} className="bg" label="Description" fullWidth variant="standard" onChange={(e) => setDescription(e.target.value)} />
            <div className="addMedLab">
              <div style={{ width: "100%" }}>
                <Typography sx={{ marginBottom: "5px", color: "var(--third-blue)", fontWeight: "bold", fontSize: "1.15rem" }}>Mediactions</Typography>
                <ul style={{ marginBottom: "5px", boxShadow: "3px 0px 8px #888888", height: "200px", overflow: "auto", paddingBottom: "5px", width: "90%" }}>
                  {medications.length != 0 &&
                    medications.map((medication, index) => {
                      return (
                        <div className="listContainer">
                          <li key={index}>{medication}</li>
                          <IconButton onClick={() => handleDelete(index, "medications ")}>
                            <ClearIcon fontSize="small" className="deleteIcon" />
                          </IconButton>
                        </div>
                      );
                    })}
                </ul>
                <input value={medication} className="addInput" size="small" onChange={(e) => setMedication(e.target.value)} />
                <Button
                  className="btnadd"
                  sx={{ color: "white", backgroundColor: "var(--third-blue)", marginLeft: "5px" }}
                  onClick={() => {
                    if (medication !== "" && medication !== " ") {
                      setMedications([...medications, medication]);
                      setMedication("");
                    }
                  }}>
                  Add
                </Button>
              </div>
              <div style={{ width: "100%" }}>
                <Typography sx={{ marginBottom: "5px", color: "var(--third-blue)", fontWeight: "bold", fontSize: "1.15rem" }}>Labs</Typography>
                <ul style={{ marginBottom: "5px", boxShadow: "3px 0px 8px #888888", height: "200px", overflow: "auto", paddingBottom: "5px", width: "90%" }}>
                  {labs.length !== 0 &&
                    labs.map((lab, index) => {
                      return (
                        <div className="listContainer">
                          <li key={index}>{lab}</li>
                          <IconButton onClick={() => handleDelete(index, "labs")}>
                            <ClearIcon fontSize="small" className="deleteIcon" />
                          </IconButton>
                        </div>
                      );
                    })}
                </ul>
                <input value={lab} className="addInput" size="small" onChange={(e) => setLab(e.target.value)} />
                <Button
                  className="btnadd"
                  sx={{ color: "white", backgroundColor: "var(--third-blue)", marginLeft: "5px" }}
                  onClick={() => {
                    if (lab !== "" && lab !== " ") {
                      setLabs([...labs, lab]);
                      setLab("");
                    }
                  }}>
                  Add
                </Button>
              </div>
            </div>
          </div>
          {props.type === "add" && (
            <Button variant="contained" sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }} className="submitHospital" onClick={submit}>
              Submit
            </Button>
          )}
          {/* {props.type === "edit" && (
            <Button variant="contained" sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }} className="submitHospital" onClick={handleEdit}>
              Submit
            </Button>
          )} */}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default PrescForm;
