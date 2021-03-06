import { Table, TableHead, TableCell, TableRow, TableBody, Collapse, IconButton, Typography, TextField, TableSortLabel } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import "../HospitalVisits/HospitalVisits.css";
import AddIcon from "@mui/icons-material/Add";
import PrescForm from "../../components/PrescriptionForm/PrescriptionForm";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OnePrescription from "../../components/OnePrescription/OnePrescription";
import { LoadingContext } from "../../context";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

const Prescriptions = () => {
  const doctorState = useSelector((state) => state.doctor.value);
  const hospitalState = useSelector((state) => state.hospital.value);
  let issuern;
  let issuerId;
  const [input, setInput] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const loadingc = useContext(LoadingContext);
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
    if (highStoredData.type === "doctor") {
      issuern = doctorState.firstName;
      issuerId = doctorState._id;
    }
    if (highStoredData.type === "hospital") {
      issuern = hospitalState.hospitalName;
      issuerId = hospitalState._id;
    }
  }
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const [prescriptions, setPrescriptions] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [reload, setReload] = useState(false);
  const [formType, setFormType] = useState("add");
  const [prescId, setPrescId] = useState("");
  const [direction, setDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("1");
  const sortByName = (prop) => {
    setDirection(direction === "desc" ? "asc" : "desc");
    if (prop === "date") {
      const sorted = [...prescriptions].sort((a, b) => {
        return direction === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
      });
      setPrescriptions(sorted);
    } else {
      const sorted = [...prescriptions].sort((a, b) => {
        if (a[prop] < b[prop]) {
          return direction === "desc" ? 1 : -1;
        }
        if (a[prop] > b[prop]) {
          return direction === "desc" ? -1 : 1;
        }
        return 0;
      });
      setPrescriptions(sorted);
    }
  };

  const handleDelete = async (id) => {
    let notfi = {
      patientId,
      action: "deleted",
      item: "a prescription ",
      issuer: issuern,
      issuerId,
    };
    try {
      loadingc.setIsLoading(true);
      const response = await axios.delete(process.env.REACT_APP_URL + `/prescription/delete/${id}`, { headers: { authorization: `Bearer ${token}` } });
      const notificatin = await axios.post(process.env.REACT_APP_URL + "/notifications/add", notfi);

      setReload(!reload);
      loadingc.setIsLoading(false);
    } catch (err) {
      loadingc.setIsLoading(false);
      console.log(err.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      loadingc.setIsLoading(true);
      setFormType("edit");
      setPrescId(id);
      setOpenForm(true);
      loadingc.setIsLoading(false);
    } catch (err) {
      loadingc.setIsLoading(false);
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getPrescriptions = async () => {
      try {
        loadingc.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/prescription/all/${patientId}`);

        setPrescriptions(response.data);
        loadingc.setIsLoading(false);
      } catch (err) {
        loadingc.setIsLoading(false);
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getPrescriptions();
      loadingc.setIsLoading(false);
      // if (visits.length === 0) {
      //   setEmpty(true);
      // }
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [reload]);

  const DataModel = (props) => {
    const [open, setOpen] = useState(false);
    const { row } = props;
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
          <TableCell style={{ paddingBottom: 2, paddingTop: 2, height: "40px" }}>
            <Typography className="tableContents">{row.date?.toString().slice(0, 10)}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.location}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.issuer}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography noWrap={true} className="tableContents" sx={{ width: "200px" }}>
              {row.description}
            </Typography>
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
              <OnePrescription presc={row} />
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
          <PrescForm
            isOpen={openForm}
            type={formType}
            id={prescId}
            close={() => {
              setFormType("add");
              setOpenForm(false);
              setReload(!reload);
            }}
          />
          {empty ? (
            <EmptyData txt="No hospital visits yet" />
          ) : (
            <>
              <h1 className="headTitle">Prescriptions</h1>
              {token !== "" && (
                <IconButton
                  sx={{ marginLeft: "94%", width: "5px", height: "5px" }}
                  onClick={() => {
                    setOpenForm(true);
                    setFormType("add");
                  }}>
                  <AddIcon fontSize="large" />
                </IconButton>
              )}
              {!openFilter && (
                <IconButton onClick={() => setOpenFilter(true)} sx={{ marginLeft: "3%", width: "5px", height: "5px" }}>
                  <FilterListIcon />
                </IconButton>
              )}
              {openFilter && (
                <div className="filterDiv">
                  <TextField size="small" placeholder="Filter" variant="standard" sx={{ width: "90%" }} onChange={(e) => setInput(e.target.value)}></TextField>
                  <IconButton>
                    <CloseIcon
                      onClick={() => {
                        setOpenFilter(false);
                        setInput("");
                      }}
                    />
                  </IconButton>
                </div>
              )}
              <div className="tables">
                <Table sx={{ minWidth: 700, overflowY: "scroll" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "1px" }}></TableCell>
                      <TableCell align="left" sx={{ width: "18%" }} key="1">
                        <TableSortLabel
                          active={orderBy === "1"}
                          direction={direction}
                          onClick={() => {
                            setOrderBy("1");
                            sortByName("date");
                          }}>
                          {/* <Button onClick={sortByName}>sort</Button> */}
                          <Typography className="tableHeaders">Date</Typography>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "20%" }} key="2">
                        <TableSortLabel
                          active={orderBy === "2"}
                          direction={direction}
                          onClick={() => {
                            setOrderBy("2");
                            sortByName("date");
                          }}>
                          <Typography className="tableHeaders">Location</Typography>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "20%" }}>
                        <TableSortLabel
                          active={orderBy === "3"}
                          direction={direction}
                          onClick={() => {
                            setOrderBy("3");
                            sortByName("name");
                          }}>
                          <Typography className="tableHeaders">Isuser</Typography>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Description</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography className="tableHeaders"></Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {prescriptions
                      .filter((val) => {
                        if (input === "") {
                          return true;
                        }
                        return (
                          val.date.toLowerCase().includes(input.toLowerCase()) ||
                          val.location.toLowerCase().includes(input.toLowerCase()) ||
                          val.description.toLowerCase().includes(input.toLowerCase()) ||
                          val.medications.includes(input.toLowerCase()) ||
                          val.labs.includes(input.toLowerCase()) ||
                          val.issuer.toLowerCase().includes(input.toLowerCase()) ||
                          val._id.includes(input.toLowerCase()) ||
                          val.hospitalVisit.includes(input.toLowerCase())
                        );
                      })
                      .map((item, index) => {
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

export default Prescriptions;
