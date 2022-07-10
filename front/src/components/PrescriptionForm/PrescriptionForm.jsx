import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";

import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Description from "@mui/icons-material/Description";

const PrescForm = (props) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  // const patient = useSelector((state) => state.patient.value);
  const [tabValue, setTabValue] = useState("0");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [issuer, setIssuer] = useState("");
  const [description, setDescription] = useState("");
  const [medication, setMedication] = useState([]);
  const [labTests, setLabTests] = useState([]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
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
            <TextField size="small" value={description} className="bg" label="Notes" fullWidth variant="standard" onChange={(e) => setDescription(e.target.value)} />
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
