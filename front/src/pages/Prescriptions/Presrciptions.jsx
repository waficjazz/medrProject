import { Table, TableContainer, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography, Button, TableSortLabel } from "@mui/material";
import { useState, useEffect } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import HospitalVisit from "../../components/HospitalVisit/HospitalVisit";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import "../HospitalVisits/HospitalVisits.css";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
import PrescForm from "../../components/PrescriptionForm/PrescriptionForm";
import axios from "axios";
import VaccineForm from "../../components/VaccineForm/VaccineForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import OnePrescription from "../../components/OnePrescription/OnePrescription";

const Prescriptions = () => {
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
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
    try {
      const response = await axios.delete(`http://localhost:5000/api/prescription/delete/${id}`, { headers: { authorization: `Bearer ${token}` } });

      setReload(!reload);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      setFormType("edit");
      setPrescId(id);
      setOpenForm(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/prescription/all/${patientId}`);

        setPrescriptions(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getPrescriptions();
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
              <IconButton
                sx={{ marginLeft: "94%", width: "5px", height: "5px" }}
                onClick={() => {
                  setOpenForm(true);
                  setFormType("add");
                }}>
                <AddIcon fontSize="large" />
              </IconButton>
              <div className="tables">
                <Table sx={{ minWidth: 700, overflowY: "scroll" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "5px" }}></TableCell>
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
                    {prescriptions.map((item, index) => {
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
