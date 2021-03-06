import React, { useState, useEffect, useContext } from "react";
import { Table, TableHead, TableCell, TableRow, TableBody, Typography, IconButton, TextField } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import EmptyData from "../../components/EmpyData/EmptyData";
import "./LabTests.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import LabTestForm from "../../components/LabTestForn/LabTestForm";
import axios from "axios";
import { LoadingContext } from "../../context";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

const LabTests = () => {
  const doctorState = useSelector((state) => state.doctor.value);
  const hospitalState = useSelector((state) => state.hospital.value);
  let issuer;
  let issuerId;
  const [input, setInput] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const loadingc = useContext(LoadingContext);
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
    token = highStoredData.token;
    if (highStoredData.type === "doctor") {
      issuer = doctorState.firstName;
      issuerId = doctorState._id;
    }
    if (highStoredData.type === "hospital") {
      issuer = hospitalState.hospitalName;
      issuerId = hospitalState._id;
    }
  }
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const [open, setOpen] = useState(false);
  const [labTests, setLabTests] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [formType, setFormType] = useState("add");
  const [reload, setReload] = useState(false);
  const [labId, setLabId] = useState("");
  // const [change, setChange] = useState(false);
  const handleEdit = async (id) => {
    try {
      setFormType("edit");
      setLabId(id);
      setOpenForm(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    let notfi = {
      patientId,
      action: "deleted",
      item: "a lab test",
      issuer,
      issuerId,
    };
    try {
      loadingc.setIsLoading(true);
      const response = await axios.delete(process.env.REACT_APP_URL + `/labtest/delete/${id}`, { headers: { authorization: `Bearer ${token}` } });
      const notificatin = await axios.post(process.env.REACT_APP_URL + "/notifications/add", notfi);
      setReload(!reload);
      loadingc.setIsLoading(false);
    } catch (err) {
      loadingc.setIsLoading(false);
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getLabTests = async () => {
      try {
        loadingc.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/labtest/getall/${patientId}`);

        setLabTests(response.data);
        loadingc.setIsLoading(false);
        // setChange(!change);
      } catch (err) {
        loadingc.setIsLoading(false);
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getLabTests();
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
    const { row } = props;
    return (
      <StyledEngineProvider injectFirst>
        <TableRow className="dataRow" onClick={() => setOpen(!open)}>
          <TableCell scope="row" style={{ paddingBottom: 8, paddingTop: 8 }}>
            <Typography className="tableContents">{row.date?.toString().slice(0, 10)}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.location}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">
              <a href={row.csv} target="__blank">
                <Typography className="tableContents">Lab</Typography>
              </a>
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
      </StyledEngineProvider>
    );
  };
  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisits">
        {/* {open && <CustomPaper />} */}
        <div className="main">
          <LabTestForm
            isOpen={openForm}
            type={formType}
            id={labId}
            close={() => {
              setOpenForm(false);
              setReload(!reload);
              setFormType("add");
            }}
          />
          {empty ? (
            <EmptyData txt="No lab tests yet" />
          ) : (
            <>
              <h1 className="headTitle">Lab Tests</h1>
              {token !== "" && (
                <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px" }} onClick={() => setOpenForm(true)}>
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
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "25%" }}>
                        <Typography className="tableHeaders">Date</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Location</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">CSV</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography className="tableHeaders"></Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {labTests
                      .filter((val) => {
                        if (input === "") {
                          return true;
                        }
                        return (
                          val.date.toLowerCase().includes(input.toLowerCase()) ||
                          val.location.toLowerCase().includes(input.toLowerCase()) ||
                          val._id.includes(input.toLowerCase()) ||
                          val.HospitalVisit.includes(input.toLowerCase())
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

export default LabTests;
