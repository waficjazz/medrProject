import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { StyledEngineProvider } from "@mui/material/styles";

import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const LabTestForm = (props) => {
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
  }
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  // const patient = useSelector((state) => state.patient.value);
  const [tabValue, setTabValue] = useState("0");
  const [notes, setNotes] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [csv, setCsv] = useState("");
  const [visits, setVisits] = useState([]);
  const [open, setOpen] = React.useState(false);
  const loading = open && visits.length === 0;
  const visitId = useRef();

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const getVisits = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/hospital/visits/${patientId}`);

        setVisits(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getVisits();
      // if (visits.length === 0) {
      //   setEmpty(true);
      // }
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setVisits([]);
    }
  }, [open]);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // useEffect(() => {
  //   if (props.type === "edit") {
  //     const getVaccination = async () => {
  //       try {
  //         const res = await axios.get(`http://localhost:5000/api/vaccination/one/${props.id}`);
  //         const data = await res.data[0];
  //         setName(data.name);
  //         setLocation(data.location);
  //         setNotes(data.notes);
  //         setDate(data.date?.toString().slice(0, 10));
  //         setShots(data.shots);
  //       } catch (err) {
  //         console.log(err.message);
  //       }
  //     };

  //     getVaccination();
  //   }
  //   setName("");
  //   setLocation("");
  //   setNotes("");
  //   setDate("");
  //   setShots("");
  // }, [props]);

  const submit = async () => {
    let labTest = {
      patientId,
      name,
      notes,
      csv,
      date,
      location,
      HospitalVisit: visitId.current,
    };
    try {
      const res = await axios.post("http://localhost:5000/api/labtest/add", labTest, { headers: { authorization: `Bearer ${token}` } });
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
  //     date,
  //     location,
  //     id: props.id,
  //   };
  //   try {
  //     const res = await axios.post("http://localhost:5000/api/vaccination/update", vaccination);
  //     if (res.statusText === "ok") {
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
            ADD Lab Tests
          </Typography>
          <hr />
          <div className="hopitalForm">
            <TextField
              // defaultValue={name}
              value={name}
              size="small"
              label="Name"
              variant="standard"
              className="hospitalInputs"
              onChange={(e) => {
                setName(e.target.value);
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
            <TextField size="small" value={notes} className="bg" label="Notes" fullWidth variant="standard" onChange={(e) => setNotes(e.target.value)} />
            <TextField size="small" value={csv} className="bg" label="CSV" fullWidth variant="standard" onChange={(e) => setCsv(e.target.value)} />
            <Autocomplete
              className="hospitalInputs"
              size="small"
              // disablePortal
              sx={{ marginTop: "10px" }}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              noOptionsText="No Such Hospital"
              isOptionEqualToValue={(option, value) => option.entryDate === value.entryDate}
              getOptionLabel={(option) => option.entryDate?.toString().slice(0, 10)}
              options={visits}
              loading={loading}
              onChange={(event, newValue) => {
                visitId.current = newValue._id;
                console.log(visitId.current);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Hospital Visit"
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </div>
          {/* {props.type === "add" && ( */}
          <Button variant="contained" sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }} className="submitHospital" onClick={submit}>
            Submit
          </Button>
          {/* // )} */}
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

export default LabTestForm;
