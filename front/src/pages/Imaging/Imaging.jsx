import React, { useState, useEffect, useContext } from "react";
import { Table, TableSortLabel, TableHead, TableCell, TableRow, TextField, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import EmptyData from "../../components/EmpyData/EmptyData";
import ImagingForm from "../../components/ImagingForm/ImagingForm";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingContext } from "../../context";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useSelector } from "react-redux";
const Imaging = () => {
  const doctorState = useSelector((state) => state.doctor.value);
  const hospitalState = useSelector((state) => state.hospital.value);
  let issuer;
  let issuerId;
  const [input, setInput] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const loadingc = useContext(LoadingContext);
  const storedData = JSON.parse(localStorage.getItem("userData"));
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
  const patientId = storedData.uid;
  const [empty, setEmpty] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [imagings, setImagings] = useState([]);
  const [reload, setReload] = useState(false);
  const [direction, setDirection] = useState("");
  const [orderBy, setOrderBy] = useState("1");
  const sortByName = (prop) => {
    setDirection(direction === "desc" ? "asc" : "desc");
    if (prop === "date") {
      const sorted = [...imagings].sort((a, b) => {
        return direction === "desc" ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
      });
      setImagings(sorted);
    } else {
      const sorted = [...imagings].sort((a, b) => {
        if (a[prop] < b[prop]) {
          return direction === "desc" ? 1 : -1;
        }
        if (a[prop] > b[prop]) {
          return direction === "desc" ? -1 : 1;
        }
        return 0;
      });
      setImagings(sorted);
    }
  };

  useEffect(() => {
    const getImagings = async () => {
      try {
        loadingc.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/imaging/all/${patientId}`);
        setImagings(response.data);
        loadingc.setIsLoading(false);
      } catch (err) {
        loadingc.setIsLoading(false);
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getImagings();
      loadingc.setIsLoading(false);
      // if (visits.length === 0) {
      //   setEmpty(true);
      // }
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [reload]);

  const handleDelete = async (id) => {
    let notfi = {
      patientId,
      action: "deleted",
      item: "an imaging",
      issuer,
      issuerId,
    };
    try {
      loadingc.setIsLoading(true);
      const response = await axios.delete(process.env.REACT_APP_URL + `/imaging/delete/${id}`, { headers: { authorization: `Bearer ${token}` } });
      const notificatin = await axios.post(process.env.REACT_APP_URL + "/notifications/add", notfi);

      setReload(!reload);
      loadingc.setIsLoading(false);
    } catch (err) {
      loadingc.setIsLoading(false);
      console.log(err.message);
    }
  };

  const DataModel = (props) => {
    const { row } = props;
    return (
      <StyledEngineProvider injectFirst>
        <TableRow className="dataRow">
          <TableCell scope="row" style={{ paddingBottom: 8, paddingTop: 8 }}>
            <Typography className="tableContents">{row.name}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.date?.toString().slice(0, 10)}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">{row.location}</Typography>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <a href={row.report} target="__blank">
              <Typography className="tableContents">report</Typography>
            </a>
          </TableCell>
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <a href={row.images[0]} target="__blank">
              <Typography className="tableContents">imaging</Typography>
            </a>
          </TableCell>
          {token !== "" && (
            <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
              <Typography className="tableContents">
                {/* <IconButton>
                  <EditIcon fontSize="small" />
                </IconButton> */}
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
          <ImagingForm
            isOpen={openForm}
            close={() => {
              setOpenForm(false);
              setReload(!reload);
            }}
          />
          {empty ? (
            <EmptyData txt="No Images yet" />
          ) : (
            <>
              <h1 className="headTitle">Imaging</h1>
              {token !== "" && (
                <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px", marginBottom: "10px" }} onClick={() => setOpenForm(true)}>
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
                      <TableCell align="left" sx={{ width: "18%" }}>
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
                      <TableCell align="left" sx={{ width: "18%" }}>
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
                      <TableCell align="left" sx={{ width: "18%" }}>
                        <TableSortLabel
                          active={orderBy === "3"}
                          direction={direction}
                          onClick={() => {
                            setOrderBy("3");
                            sortByName("location");
                          }}>
                          <Typography className="tableHeaders">Location</Typography>
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "18%" }}>
                        <Typography className="tableHeaders">Report</Typography>
                      </TableCell>
                      <TableCell align="left" sx={{ width: "18%" }}>
                        <Typography className="tableHeaders">Image</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography className="tableHeaders"></Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {imagings
                      .filter((val) => {
                        if (input === "") {
                          return true;
                        }
                        return (
                          val.name.toLowerCase().includes(input.toLowerCase()) ||
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
export default Imaging;
