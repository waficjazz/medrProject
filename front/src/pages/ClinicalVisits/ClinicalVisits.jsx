import { Table, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import ClinicalVisit from "../../components/ClinicalVisit/ClinicalVisit";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import "./ClinicalVisits.css";
import AddIcon from "@mui/icons-material/Add";
import ClinicalVisitForm from "../../components/ClinicalVisitForm/ClinicalVisitForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { LoadingContext } from "../../context";

const ClinicalVisits = () => {
  const loading = useContext(LoadingContext);
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
  }
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const [visits, setVisits] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [visitId, setVisitId] = useState("");
  const [formType, setFormType] = useState("add");
  const [reload, setReload] = useState(false);

  const handleEdit = async (id) => {
    try {
      setFormType("edit");
      setVisitId(id);
      setOpenForm(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      loading.setIsLoading(true);
      const response = await axios.delete(process.env.REACT_APP_URL + `/clinical/delete/visit/${id}`, { headers: { authorization: `Bearer ${token}` } });

      loading.setIsLoading(false);
      setReload(!reload);
    } catch (err) {
      loading.setIsLoading(false);

      console.log(err.message);
    }
  };

  useEffect(() => {
    const getVisits = async () => {
      try {
        loading.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/clinical/visits/${patientId}`);
        setVisits(response.data);
        loading.setIsLoading(false);
      } catch (err) {
        loading.setIsLoading(false);
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
  }, [reload]);

  const DataModel = (props) => {
    const [open, setOpen] = React.useState(false);
    const { row } = props;
    const [doctor, setDoctor] = useState({});
    const getDoctor = async (id) => {
      try {
        loading.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/doctor/one/${id}`);
        let doctor = await response.data;
        setDoctor(doctor);
        loading.setIsLoading(false);
      } catch (err) {
        loading.setIsLoading(false);
        console.log(err.message);
      }
    };
    const getVerfiedDoctor = async (id) => {
      try {
        loading.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/doctor/verified/${id}`);
        let doctor = await response.data;
        setDoctor(doctor);
        loading.setIsLoading(false);
      } catch (err) {
        loading.setIsLoading(false);
        console.log(err.message);
      }
    };
    useEffect(() => {
      let isApiSubscribed = true;
      if (isApiSubscribed) {
        if (!row.verifiedDoctor) {
          getDoctor(row.doctorId);
          loading.setIsLoading(false);
        } else {
          getVerfiedDoctor(row.doctorId);
          loading.setIsLoading(false);
        }
      }
      return () => {
        isApiSubscribed = false;
      };
    }, []);
    return (
      <StyledEngineProvider injectFirst>
        <TableRow className="dataRow" onClick={() => setOpen(!open)}>
          <TableCell scope="row" style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{doctor.name || doctor.firstName}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.visitDate?.toString().slice(0, 10)}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.cause}</Typography>
          </TableCell>
          {token !== "" && (
            <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
              <Typography className="tableContents">
                <IconButton onClick={() => handleEdit(row._id)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton aria-label="delete row" sx={{ marginRight: "4px" }} onClick={() => handleDelete(row._id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Typography>
            </TableCell>
          )}
        </TableRow>
        <TableRow>
          <TableCell className="moreData" colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <ClinicalVisit visit={doctor} visitc={row} />
            </Collapse>
          </TableCell>
        </TableRow>
      </StyledEngineProvider>
    );
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisits">
        <div className="main">
          <ClinicalVisitForm
            isOpen={openForm}
            type={formType}
            id={visitId}
            close={() => {
              setOpenForm(false);
              setReload(!reload);
              setFormType("add");
            }}
          />
          {empty ? (
            <EmptyData txt="No Clinical visits yet" />
          ) : (
            <>
              <h1 className="headTitle">Clinical Visits</h1>
              {token !== "" && (
                <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px" }} onClick={() => setOpenForm(true)}>
                  <AddIcon fontSize="large" />
                </IconButton>
              )}
              <div className="tables">
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "5px" }}></TableCell>
                      <TableCell align="left" sx={{ width: "25%" }}>
                        <Typography className="tableHeaders">Doctor</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "25%" }}>
                        <Typography className="tableHeaders">Visit Date</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "30%" }}>
                        <Typography className="tableHeaders">Cause</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography className="tableHeaders"></Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {visits.map((item, index) => {
                      return <DataModel key={index} row={item} />;
                    })}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default ClinicalVisits;
