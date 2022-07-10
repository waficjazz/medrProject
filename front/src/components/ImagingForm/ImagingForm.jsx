import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../HopitalVisitForm/HopitalVisitForm.css";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { StyledEngineProvider } from "@mui/material/styles";
import { Tab, Tabs, TextField, Button, Autocomplete, InputAdornment, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import AttachFileIcon from "@mui/icons-material/AttachFile";
const ImagingForm = (props) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const patientId = storedData.uid;
  const inputName = useRef("");
  const [visits, setVisits] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [preview, setPreview] = useState();
  const [namePreview, setNamePreview] = useState();
  const [open, setOpen] = React.useState(false);
  const [selectedPDF, setSelectedPDF] = useState();
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

  useEffect(() => {
    if (!selectedImage) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedImage);
    setPreview(objectUrl);
    console.log(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedImage]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedImage(undefined);
      return;
    }
    setImage(e.target.files[0]);
    setSelectedImage(e.target.files[0]);
  };

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
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date);
      formData.append("location", location);
      formData.append("patientId", patientId);
      if (visitId != undefined) formData.append("HospitalVisit", visitId.current);
      formData.append("image", image);
      formData.append("report", selectedPDF);
      const res = await axios.post("http://localhost:5000/api/imaging/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.statusText);
      if (res.statusText === "Created") {
        props.close();
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <StyledEngineProvider injectFirst>
      <div className={props.isOpen ? "hVisitForm" : "notOpen"}>
        <div className="inside">
          <IconButton sx={{ marginLeft: "95%" }} onClick={props.close}>
            <CloseIcon fontSize="medium" />
          </IconButton>
          <hr />
          <div className="hopitalForm">
            <TextField size="small" label="Name" variant="standard" className="hospitalInputs" onChange={(e) => setName(e.target.value)} />
            <TextField size="small" label="Location" variant="standard" className="hospitalInputs" onChange={(e) => setLocation(e.target.value)} />
            <TextField size="small" label="Date" variant="standard" type="date" focused className="hospitalInputs" onChange={(e) => setDate(e.target.value)} />
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
          <div className="uploads">
            <div className="imgPreviewDiv">
              <Button sx={{ backgroundColor: "var(--third-blue)", color: "white", width: "50%" }} component="label" className="submitHospital">
                Upload imaging
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={
                    onSelectFile
                    // setImage(e.target.files[0]);
                  }
                />
                <DownloadIcon fontSize="small" />
              </Button>
              {selectedImage && <img src={preview} className="imgPreview" />}
            </div>
            <div className="imgPreviewDiv">
              <Button variant="contained" sx={{ backgroundColor: "var(--third-blue)", color: "white", width: "50%" }} component="label" className="submitHospital">
                Upload report
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
          </div>
          <Button variant="contained" sx={{ marginLeft: "85%", backgroundColor: "var(--third-blue)" }} className="submitHospital" onClick={submit}>
            Submit
          </Button>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default ImagingForm;
