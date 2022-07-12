import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import { StyledEngineProvider } from "@mui/material/styles";
import DownloadIcon from "@mui/icons-material/Download";
import { LoadingContext } from "../../context";
import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton, Typography } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

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
  const inputName = useRef("");
  const [namePreview, setNamePreview] = useState("");
  const [selectedPDF, setSelectedPDF] = useState();
  const loadingc = useContext(LoadingContext);
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

  useEffect(() => {
    if (props.type === "edit") {
      loadingc.setIsLoading(true);
      const getVaccination = async () => {
        try {
          const res = await axios.get(process.env.REACT_APP_URL + `/labtest/one/${props.id}`);
          const data = await res.data;
          setCsv(data.csv);
          setName(data.name);
          setLocation(data.location);
          setNotes(data.notes);
          setDate(data.date?.toString().slice(0, 10));
          visitId.current = data.HospitalVisit;
          loadingc.setIsLoading(false);
        } catch (err) {
          loadingc.setIsLoading(false);
          console.log(err.message);
        }
      };

      getVaccination();
    }
    setName("");
    setLocation("");
    setNotes("");
    setDate("");
    visitId.current = "";
    loadingc.setIsLoading(false);
  }, [props]);

  // const submit = async () => {
  //   let labTest = {
  //     patientId,
  //     name,
  //     notes,
  //     csv,
  //     date,
  //     location,
  //     HospitalVisit: visitId.current,
  //   };
  //   try {
  //     const res = await axios.post(process.env.REACT_APP_URL + "/labtest/add", labTest, { headers: { authorization: `Bearer ${token}` } });
  //     if (res.statusText === "Created") {
  //       props.close();
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };
  const onSelectPDF = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedPDF(undefined);
      return;
    }
    setNamePreview(e.target.files[0].name);
    inputName.current = e.target.files[0].name;
    console.log(inputName.current);
    setSelectedPDF(e.target.files[0]);
  };

  const submit = async () => {
    // let imaging = { name, date, location, patientId };

    try {
      loadingc.setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date);
      formData.append("notes", notes);
      formData.append("location", location);
      formData.append("patientId", patientId);
      if (visitId != undefined) formData.append("HospitalVisit", visitId.current);
      formData.append("report", selectedPDF);

      const res = await axios.post(process.env.REACT_APP_URL + "/labtest/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${token}`,
        },
      });

      if (res.statusText === "Created") {
        loadingc.setIsLoading(false);
        props.close();
      }
      loadingc.setIsLoading(false);
    } catch (err) {
      loadingc.setIsLoading(false);
      console.log(err.message);
    }
  };
  const handleEdit = async () => {
    let lab = {
      patientId,
      name,
      notes,
      date,
      location,
      csv,
      id: props.id,
    };
    try {
      loadingc.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/labtest/update", lab, { headers: { authorization: `Bearer ${token}` } });

      if (res.statusText === "OK") {
        props.close();
        loadingc.setIsLoading(false);
      }
      loadingc.setIsLoading(false);
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
            {/* <TextField size="small" value={csv} className="bg" label="CSV" fullWidth variant="standard" onChange={(e) => setCsv(e.target.value)} /> */}
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
                // console.log(visitId.current);
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
          {props.type === "add" && (
            <div className="imgPreviewDiv">
              <Button variant="contained" sx={{ backgroundColor: "var(--third-blue)", color: "white", width: "50%" }} component="label" className="submitHospital">
                Upload Labs
                <input
                  type="file"
                  accept="pdf/*"
                  hidden
                  onChange={
                    onSelectPDF
                    // setImage(e.target.files[0]);
                  }
                />
                <DownloadIcon fontSize="small" />
              </Button>
              {selectedPDF && <h5>{namePreview}</h5>}
            </div>
          )}
          {props.type === "add" && (
            <Button
              variant="contained"
              sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }}
              className="submitHospital"
              onClick={submit}
              disabled={!testNames(location) || date == "" || namePreview == ""}>
              Submit
            </Button>
          )}
          {props.type === "edit" && (
            <Button
              variant="contained"
              sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }}
              className="submitHospital"
              onClick={handleEdit}
              disabled={!testNames(location) || date == "" || namePreview == ""}>
              Submit
            </Button>
          )}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default LabTestForm;
