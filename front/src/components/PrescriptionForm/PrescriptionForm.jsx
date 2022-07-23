import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";
import { LoadingContext } from "../../context";
import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton, Typography } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Description from "@mui/icons-material/Description";
import MiniForm from "../MiniForm/MiniForm";
import ClearIcon from "@mui/icons-material/Clear";
import CircularProgress from "@mui/material/CircularProgress";

const PrescForm = (props) => {
  const loadingc = useContext(LoadingContext);
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
  }
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
  const [visits, setVisits] = useState([]);
  const [labs, setLabs] = useState([]);
  const [lab, setLab] = useState("");
  const [open, setOpen] = useState(false);
  const loading = open && visits.length === 0;
  const visitId = useRef();
  const testNames = (name) => {
    return /[A-Za-z]{3,}/.test(name);
  };
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    const getVisits = async () => {
      try {
        loadingc.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/hospital/visits/${patientId}`);

        setVisits(response.data);
        loadingc.setIsLoading(false);
      } catch (err) {
        loadingc.setIsLoading(false);
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getVisits();
      loadingc.setIsLoading(false);
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
  useEffect(() => {
    if (props.type === "edit") {
      loadingc.setIsLoading(true);
      const getPrescription = async () => {
        try {
          const res = await axios.get(process.env.REACT_APP_URL + `/prescription/one/${props.id}`);
          const data = await res.data;
          setDescription(data.description);
          setLocation(data.location);
          setDate(data.date?.toString().slice(0, 10));
          setIssuer(data.issuer);
          setMedications(data.medications);
          setLabs(data.labs);
          loadingc.setIsLoading(false);
        } catch (err) {
          loadingc.setIsLoading(false);
          console.log(err.message);
        }
      };

      getPrescription();
    }
    loadingc.setIsLoading(false);
    setDescription("");
    setLocation("");
    setDate("");
    setIssuer("");
    setMedications([]);
    setLabs([]);
  }, [props]);

  const submit = async () => {
    let presc = {
      patientId,
      location,
      description,
      date,
      issuer,
      medications,
      labs,
      hospitalVisit: visitId.current,
    };
    try {
      loadingc.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/prescription/add", presc, { headers: { authorization: `Bearer ${token}` } });
      if (res.statusText === "Created") {
        props.close();
        loadingc.setIsLoading(false);
      }
      loadingc.setIsLoading(false);
      setDescription("");
      setLocation("");
      setDate("");
      setIssuer("");
      setMedications([]);
      setLabs([]);
    } catch (err) {
      loadingc.setIsLoading(false);
      console.log(err.message);
    }
  };

  const handleEdit = async () => {
    let presc = {
      patientId,
      medications,
      labs,
      issuer,
      description,
      date,
      location,
      hospitalVisit: visitId.current,
      id: props.id,
    };
    try {
      loadingc.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/prescription/update", presc, { headers: { authorization: `Bearer ${token}` } });
      if (res.statusText === "OK") {
        props.close();
        loadingc.setIsLoading(false);
      }
      setDescription("");
      setLocation("");
      setDate("");
      setIssuer("");
      setMedications([]);
      setLabs([]);
    } catch (err) {
      loadingc.setIsLoading(false);
      console.log(err.message);
    }
  };
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
              required
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
            <TextField required value={location} size="small" label="Location" variant="standard" className="hospitalInputs" onChange={(e) => setLocation(e.target.value)} />
            <TextField
              required
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
            <TextField required size="small" value={description} label="Description" variant="standard" onChange={(e) => setDescription(e.target.value)} />
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
              getOptionLabel={(option) => option.date?.toString().slice(0, 10)}
              options={visits}
              loading={loading}
              onChange={(event, newValue) => {
                visitId.current = newValue._id;
                console.log(visitId.current);
              }}
              renderInput={(params) => (
                <TextField
                  required
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
            <Button
              variant="contained"
              sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }}
              className="submitHospital"
              onClick={submit}
              disabled={!testNames(issuer) || !testNames(description) || !testNames(location) || date == "" || visitId.current == ""}>
              Submit
            </Button>
          )}
          {props.type === "edit" && (
            <Button
              variant="contained"
              sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }}
              className="submitHospital"
              onClick={handleEdit}
              disabled={!testNames(issuer) || !testNames(description) || !testNames(location) || date == "" || visitId.current == ""}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default PrescForm;
