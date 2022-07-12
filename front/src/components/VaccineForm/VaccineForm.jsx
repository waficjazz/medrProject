import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";
import { LoadingContext } from "../../context";
import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton, Typography } from "@mui/material";

const VaccineForm = (props) => {
  const loading = useContext(LoadingContext);
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
  const [shots, setShots] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [doses, setDoses] = useState("");
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const testNames = (name) => {
    return /[A-Za-z]{3,}/.test(name);
  };
  useEffect(() => {
    if (props.type === "edit") {
      loading.setIsLoading(true);
      const getVaccination = async () => {
        try {
          const res = await axios.get(process.env.REACT_APP_URL + `/vaccination/one/${props.id}`);
          const data = await res.data[0];
          setName(data.name);
          setLocation(data.location);
          setNotes(data.notes);
          setDate(data.date?.toString().slice(0, 10));
          setShots(data.shots);
          setDoses(data.doses);
          loading.setIsLoading(false);
        } catch (err) {
          loading.setIsLoading(false);
          console.log(err.message);
        }
      };

      getVaccination();
    }
    setName("");
    setLocation("");
    setNotes("");
    setDate("");
    setShots("");
    setDoses("");
    loading.setIsLoading(false);
  }, [props]);

  const submit = async () => {
    let vaccination = {
      patientId,
      name,
      notes,
      shots,
      doses,
      date,
      location,
    };
    try {
      loading.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/vaccination/add", vaccination, { headers: { authorization: `Bearer ${token}` } });
      if (res.statusText === "Created") {
        props.close();
        loading.setIsLoading(false);
      }
    } catch (err) {
      loading.setIsLoading(false);
      console.log(err.message);
    }
  };

  const handleEdit = async () => {
    let vaccination = {
      patientId,
      name,
      notes,
      shots,
      doses,
      date,
      location,
      id: props.id,
    };
    try {
      loading.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/vaccination/update", vaccination, { headers: { authorization: `Bearer ${token}` } });
      if (res.statusText === "OK") {
        props.close();
        loading.setIsLoading(false);
      }
    } catch (err) {
      loading.setIsLoading(false);
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
            ADD VACCINATION
          </Typography>
          <hr />
          <div className="hopitalForm">
            <TextField
              // defaultValue={name}
              required
              value={name}
              size="small"
              label="Name"
              variant="standard"
              className="hospitalInputs"
              onChange={(e) => {
                setName(e.target.value);
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
            <TextField size="small" value={notes} className="bg" label="Notes" fullWidth variant="standard" onChange={(e) => setNotes(e.target.value)} />
            <TextField
              required
              value={shots}
              size="small"
              type="number"
              label="Dose Number"
              variant="standard"
              className="hospitalInputs"
              onChange={(e) => setShots(e.target.value)}
            />
            <TextField
              required
              value={doses}
              type="number"
              size="small"
              label="Total Doses"
              variant="standard"
              className="hospitalInputs"
              onChange={(e) => setDoses(e.target.value)}
            />
          </div>
          {props.type === "add" && (
            <Button
              variant="contained"
              sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }}
              className="submitHospital"
              onClick={submit}
              disabled={doses == "" || shots == "" || !testNames(name) || date == "" || !testNames(location)}>
              Submit
            </Button>
          )}
          {props.type === "edit" && (
            <Button
              variant="contained"
              sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }}
              className="submitHospital"
              onClick={handleEdit}
              disabled={doses == "" || shots == "" || !testNames(name) || date == "" || !testNames(location)}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default VaccineForm;
