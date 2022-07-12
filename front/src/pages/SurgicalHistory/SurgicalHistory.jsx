import { Table, TableSortLabel, TableHead, TableCell, TableRow, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import EmptyData from "../../components/EmpyData/EmptyData";
import AddIcon from "@mui/icons-material/Add";
import SurgeryForm from "../../components/SurgeryForm/SurgeryForm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Surgery from "../../components/Surgery/Surgery";
import { LoadingContext } from "../../context";
const SurgicalHistory = () => {
  const loadingc = useContext(LoadingContext);
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
  }
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const patientId = storedData.uid;
  const [surgeries, setSurgeries] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [direction, setDirection] = useState("asc");
  const [orderBy, setOrderBy] = useState("1");
  const [reload, setReload] = useState(false);
  const [surgeryId, setSurgeryId] = useState("");
  const [formType, setFormType] = useState("add");
  const sortByName = (prop) => {
    setDirection(direction === "desc" ? "asc" : "desc");
    if (prop === "date") {
      const sorted = [...surgeries].sort((a, b) => {
        return direction === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
      });
      setSurgeries(sorted);
    } else {
      const sorted = [...surgeries].sort((a, b) => {
        if (a[prop] < b[prop]) {
          return direction === "desc" ? 1 : -1;
        }
        if (a[prop] > b[prop]) {
          return direction === "desc" ? -1 : 1;
        }
        return 0;
      });
      setSurgeries(sorted);
    }
  };

  const handleEdit = async (id) => {
    try {
      setFormType("edit");
      setSurgeryId(id);
      setOpenForm(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      loadingc.setIsLoading(true);
      const response = await axios.delete(process.env.REACT_APP_URL + `/surgery/delete/${id}`, { headers: { authorization: `Bearer ${token}` } });

      setReload(!reload);
      loadingc.setIsLoading(false);
    } catch (err) {
      loadingc.setIsLoading(false);
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getSurgeries = async () => {
      try {
        loadingc.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/surgery/all/${patientId}`);
        setSurgeries(response.data);
        loadingc.setIsLoading(false);
      } catch (err) {
        loadingc.setIsLoading(false);
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getSurgeries();
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
    const [open, setOpen] = React.useState(false);
    const { row } = props;
    const [hospital, setHospital] = useState([]);
    const getHospital = async (id) => {
      try {
        loadingc.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/hospital/${id}`);
        let hospital = await response.data;
        setHospital(hospital);
        loadingc.setIsLoading(false);
      } catch (err) {
        loadingc.setIsLoading(false);
        console.log(err.message);
      }
    };
    const getVerfiedHospital = async (id) => {
      try {
        loadingc.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/hospital/verified/${id}`);
        let hospital = await response.data;
        setHospital(hospital);
        loadingc.setIsLoading(false);
      } catch (err) {
        loadingc.setIsLoading(false);
        console.log(err.message);
      }
    };
    useEffect(() => {
      let isApiSubscribed = true;
      if (isApiSubscribed) {
        if (!row.verifiedHospital) {
          getHospital(row.hospitalId);
          loadingc.setIsLoading(false);
        } else {
          getVerfiedHospital(row.hospitalId);
          loadingc.setIsLoading(false);
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
            <Typography className="tableContents">{row.name}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.cause}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{hospital.hospitalName}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.date?.toString().slice(0, 10)}</Typography>
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
              <Surgery surgery={row} hospital={hospital} />
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
          <SurgeryForm
            isOpen={openForm}
            type={formType}
            id={surgeryId}
            close={() => {
              setOpenForm(false);
              setReload(!reload);
              setFormType("add");
            }}
          />
          {empty ? (
            <EmptyData txt="No Surgeries  yet" />
          ) : (
            <>
              <h1 className="headTitle">Surgeries</h1>
              {token !== "" && (
                <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px" }} onClick={() => setOpenForm(true)}>
                  <AddIcon fontSize="large" />
                </IconButton>
              )}
              <div className="tables">
                <Table sx={{ minWidth: "100%" }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left" sx={{ width: "5px" }}></TableCell>
                      <TableCell align="left" sx={{ width: "20%" }}>
                        <TableSortLabel
                          active={orderBy === "1"}
                          direction={direction}
                          onClick={() => {
                            setOrderBy("1");
                            sortByName("name");
                          }}>
                          <Typography className="tableHeaders">Name</Typography>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "20%" }}>
                        <Typography className="tableHeaders">Cause</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "20%" }}>
                        <Typography className="tableHeaders">Hospital</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "20%" }}>
                        <TableSortLabel
                          active={orderBy === "2"}
                          direction={direction}
                          onClick={() => {
                            setOrderBy("2");
                            sortByName("date");
                          }}>
                          <Typography className="tableHeaders">Date</Typography>
                        </TableSortLabel>
                      </TableCell>

                      <TableCell>
                        <Typography className="tableHeaders"></Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {surgeries.map((item, index) => {
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

export default SurgicalHistory;
