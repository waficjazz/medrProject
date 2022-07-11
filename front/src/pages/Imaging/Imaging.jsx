import React, { useState, useEffect } from "react";
import { Table, TableSortLabel, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import EmptyData from "../../components/EmpyData/EmptyData";
import ImagingForm from "../../components/ImagingForm/ImagingForm";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
const Imaging = () => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
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
        const response = await axios.get(`http://localhost:5000/api/imaging/all/${patientId}`);
        setImagings(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    let isApiSubscribed = true;
    if (isApiSubscribed) {
      getImagings();
      // if (visits.length === 0) {
      //   setEmpty(true);
      // }
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [reload]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/imaging/delete/${id}`, { headers: { authorization: `Bearer ${token}` } });

      setReload(!reload);
    } catch (err) {
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
          <TableCell style={{ paddingBottom: 2, paddingTop: 2 }}>
            <Typography className="tableContents">
              <IconButton>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton aria-label="delete row" sx={{ marginRight: "4px" }} onClick={() => handleDelete(row._id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Typography>
          </TableCell>
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
              <IconButton sx={{ marginLeft: "94%", width: "5px", height: "5px", marginBottom: "10px" }} onClick={() => setOpenForm(true)}>
                <AddIcon fontSize="large" />
              </IconButton>
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
                    {imagings.map((item, index) => {
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
