import { Table, TableSortLabel, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import HospitalVisit from "../../components/HospitalVisit/HospitalVisit";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import "./HospitalVisits.css";
import AddIcon from "@mui/icons-material/Add";
import HospitalVisitForm from "../../components/HopitalVisitForm/HospitalVisitForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Imaging from "../Imaging/Imaging";
import VisitImagings from "../../components/VisitImagings/VisitImagings";
import { LoadingContext } from "../../context";

const HospitalVisits = () => {
  const loading = useContext(LoadingContext);

  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
  }
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const [visits, setVisits] = useState([]);
  const [visitId, setVisitId] = useState("");
  const [formType, setFormType] = useState("add");
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [reload, setReload] = useState(false);
  const [direction, setDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("1");
  const [show, setShow] = useState("");

  const handleEdit = async (id) => {
    try {
      setFormType("edit");
      setVisitId(id);
      setOpenForm(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const sortByName = (prop) => {
    setDirection(direction === "desc" ? "asc" : "desc");
    if (prop === "date") {
      const sorted = [...visits].sort((a, b) => {
        return direction === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
      });
      setVisits(sorted);
    } else {
      const sorted = [...visits].sort((a, b) => {
        if (a[prop] < b[prop]) {
          return direction === "desc" ? 1 : -1;
        }
        if (a[prop] > b[prop]) {
          return direction === "desc" ? -1 : 1;
        }
        return 0;
      });
      console.log(sorted);
      setVisits(sorted);
    }
  };

  const handleDelete = async (id) => {
    try {
      loading.setIsLoading(true);
      const response = await axios.delete(process.env.REACT_APP_URL + `/hospital/delete/visit/${id}`, { headers: { authorization: `Bearer ${token}` } });

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
        const response = await axios.get(process.env.REACT_APP_URL + `/hospital/visits/${patientId}`);
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
      loading.setIsLoading(false);
      // if (visits.length === 0) {
      //   setEmpty(true);
      // }
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [reload]);

  const DataModel = (props) => {
    const openRef = useRef(false);
    const [open, setOpen] = useState(false);
    const [hospital, setHospital] = useState({});
    const { row } = props;
    const getHospital = async (id) => {
      try {
        loading.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/hospital/${id}`);
        let hospital = await response.data;
        setHospital(hospital);
        loading.setIsLoading(false);
      } catch (err) {
        loading.setIsLoading(false);
        console.log(err.message);
      }
    };
    const getVerfiedHospital = async (id) => {
      try {
        loading.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/hospital/verified/${id}`);
        let hospital = await response.data;
        setHospital(hospital);
        loading.setIsLoading(false);
      } catch (err) {
        loading.setIsLoading(false);
        console.log(err.message);
      }
    };
    useEffect(() => {
      let isApiSubscribed = true;
      if (isApiSubscribed) {
        if (!row.verifiedHospital) {
          getHospital(row.hospitalId);
          loading.setIsLoading(false);
        } else {
          getVerfiedHospital(row.hospitalId);
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
            <Typography className="tableContents">{hospital.hospitalName}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.entryDate?.toString().slice(0, 10)}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.timeSpent}</Typography>
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
            <Collapse in={open} timeout="auto" unmountOnExit={false}>
              <HospitalVisit visit={row} hospital={hospital} />
              {/* {show == "imagings" && <VisitImagings visitId={row._id} close={() => setShow("")} />} */}
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
          <HospitalVisitForm
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
            <EmptyData txt="No hospital visits yet" />
          ) : (
            <>
              <h1 className="headTitle">Hospital Visits</h1>
              {token !== "" && (
                <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px" }} onClick={() => setOpenForm(true)}>
                  <AddIcon fontSize="large" />
                </IconButton>
              )}
              <div className="tables">
                <Table sx={{ minWidth: 700, overflowY: "scroll" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "5px" }}></TableCell>
                      <TableCell align="left" sx={{ width: "25%" }}>
                        <TableSortLabel
                          active={orderBy === "1"}
                          direction={direction}
                          onClick={() => {
                            setOrderBy("1");
                            sortByName("name");
                          }}>
                          <Typography className="tableHeaders">Hospital Name</Typography>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <TableSortLabel
                          active={orderBy === "2"}
                          direction={direction}
                          onClick={() => {
                            setOrderBy("2");
                            sortByName("entryDate");
                          }}>
                          <Typography className="tableHeaders">Entry Date</Typography>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "18%" }}>
                        <TableSortLabel
                          active={orderBy === "2"}
                          direction={direction}
                          onClick={() => {
                            setOrderBy("3");
                            sortByName("timeSpent");
                          }}>
                          <Typography className="tableHeaders">Time Spent</Typography>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
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

export default HospitalVisits;
