import { Table, TableHead, TableCell, TableRow, TableBody, IconButton, Typography, TextField, TableSortLabel } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import "../HospitalVisits/HospitalVisits.css";
import AddIcon from "@mui/icons-material/Add";
import { LoadingContext } from "../../context";
import axios from "axios";
import VaccineForm from "../../components/VaccineForm/VaccineForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

const Vaccines = () => {
  const doctorState = useSelector((state) => state.doctor.value);
  const hospitalState = useSelector((state) => state.hospital.value);
  let issuer;
  let issuerId;
  const [input, setInput] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const loading = useContext(LoadingContext);
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
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
  const [vaccinations, setVaccinations] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [reload, setReload] = useState(false);
  const [formType, setFormType] = useState("add");
  const [vaccId, setVaccId] = useState("");
  const [direction, setDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("1");
  const sortByName = (prop) => {
    setDirection(direction === "desc" ? "asc" : "desc");
    if (prop === "date") {
      const sorted = [...vaccinations].sort((a, b) => {
        return direction === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
      });
      setVaccinations(sorted);
    } else {
      const sorted = [...vaccinations].sort((a, b) => {
        if (a[prop] < b[prop]) {
          return direction === "desc" ? 1 : -1;
        }
        if (a[prop] > b[prop]) {
          return direction === "desc" ? -1 : 1;
        }
        return 0;
      });
      setVaccinations(sorted);
    }
  };

  const handleDelete = async (id) => {
    let notfi = {
      patientId,
      action: "deleted",
      item: "a vaccination ",
      issuer,
      issuerId,
    };
    try {
      loading.setIsLoading(true);
      const response = await axios.delete(process.env.REACT_APP_URL + `/vaccination/delete/${id}`, { headers: { authorization: `Bearer ${token}` } });
      const notificatin = await axios.post(process.env.REACT_APP_URL + "/notifications/add", notfi);

      setReload(!reload);
    } catch (err) {
      loading.setIsLoading(false);
      console.log(err.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      setFormType("edit");
      setVaccId(id);
      setOpenForm(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getVaccinations = async () => {
      try {
        loading.setIsLoading(true);

        const response = await axios.get(process.env.REACT_APP_URL + `/vaccination/all/${patientId}`);

        setVaccinations(response.data);
        loading.setIsLoading(false);
      } catch (err) {
        loading.setIsLoading(false);

        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getVaccinations();
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
        <TableRow className="dataRow">
          <TableCell style={{ paddingBottom: 2, paddingTop: 2, height: "40px" }}>
            <Typography className="tableContents">{row.name}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.date?.toString().slice(0, 10)}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">
              {row.shots}/{row.doses}
            </Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.notes}</Typography>
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
        <div className="main">
          <VaccineForm
            isOpen={openForm}
            type={formType}
            id={vaccId}
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
              <h1 className="headTitle">Vaccines</h1>
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
                      <TableCell align="left" sx={{ width: "25%" }} key="1">
                        <TableSortLabel
                          active={orderBy === "1"}
                          direction={direction}
                          onClick={() => {
                            setOrderBy("1");
                            sortByName("name");
                          }}>
                          {/* <Button onClick={sortByName}>sort</Button> */}
                          <Typography className="tableHeaders">Vaccine Name</Typography>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }} key="2">
                        <TableSortLabel
                          active={orderBy === "2"}
                          direction={direction}
                          onClick={() => {
                            setOrderBy("2");
                            sortByName("date");
                          }}>
                          <Typography className="tableHeaders">Vaccination Date</Typography>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "15%" }}>
                        <TableSortLabel
                          active={orderBy === "3"}
                          direction={direction}
                          onClick={() => {
                            setOrderBy("3");
                            sortByName("name");
                          }}>
                          <Typography className="tableHeaders">Shots</Typography>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "22%" }}>
                        <Typography className="tableHeaders">Notes</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography className="tableHeaders"></Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {vaccinations
                      .filter((val) => {
                        if (input === "") {
                          return true;
                        }
                        return (
                          val.date.toLowerCase().includes(input.toLowerCase()) ||
                          val.notes.toLowerCase().includes(input.toLowerCase()) ||
                          val.location.toLowerCase().includes(input.toLowerCase()) ||
                          val.name.toLowerCase().includes(input.toLowerCase()) ||
                          val.shots.toString().toLowerCase().includes(input.toLowerCase()) ||
                          val.doses.toString().toLowerCase().includes(input.toLowerCase())
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

export default Vaccines;
