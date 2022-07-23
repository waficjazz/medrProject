import React, { useContext, useState } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import { AppBar, Toolbar, InputBase, List, ListItemButton, IconButton, Badge, Typography, Collapse } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { ShowContext, RegContext } from "../../context";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReplayIcon from "@mui/icons-material/Replay";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Notification from "../Notification/Notification";
import PatientUpdate from "../PatientUpdate/PatientUpdate";
import DoctorUpdate from "../DoctorUpdate/DoctorUpdate";
import { useEffect } from "react";
import axios from "axios";
const Navbar = () => {
  let patientId = 0;
  const [badge, setBadge] = useState(0);
  const storedData = JSON.parse(localStorage.getItem("userData"));
  if (storedData) {
    patientId = storedData.uid;
  }
  const [notfications, setNotifications] = useState([]);
  const [computedNot, setComputedNot] = useState([]);
  let id = "";
  let token = "";
  let type = "";
  let uid = " ";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  id = patientId;
  if (highStoredData) {
    token = highStoredData.token;
    type = highStoredData.type;
    uid = highStoredData.uid;
    id = uid;
  }
  const getNotifications = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL + `/notifications/${patientId}`);
      setNotifications(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);
  useEffect(() => {
    getNotifications();
  }, [badge]);
  useEffect(() => {
    let inter = [];
    let arr = [...notfications];

    inter = arr.filter((a) => {
      return (a.issuerId != uid) & !a.seenBy.includes(id);
    });

    setComputedNot([...inter]);
    setBadge(computedNot.length);
  }, [notfications]);

  const navigate = useNavigate();
  const patient = useSelector((state) => state.patient.value);
  const [open, setOpen] = useState("");
  const { show, setShow } = useContext(ShowContext);
  const [openPatient, setOpenPatient] = useState(false);
  const [openDoctor, setOpenDoctor] = useState(false);

  const auth = useContext(RegContext);
  return (
    <>
      <StyledEngineProvider injectFirst>
        {openPatient && <PatientUpdate close={() => setOpenPatient(false)} />}
        {openDoctor && <DoctorUpdate close={() => setOpenDoctor(false)} />}
        <AppBar className="appbar" position="absolute">
          <Toolbar>
            <IconButton className="menuButton" onClick={() => setShow(!show)}>
              <MenuIcon />
            </IconButton>
            <Typography className="id">
              {patient.firstName} {patient.lastName}
            </Typography>
            <div className="tools">
              <div className="search">
                <SearchIcon fontSize="small" className="searchIcon" sx={{ marginLeft: "10px" }} />
                <InputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} sx={{ marginLeft: "10px", width: "80%" }} />
              </div>
              <div className="toolsicon">
                <IconButton
                  onClick={() => {
                    if (open === "notfications") {
                      setOpen("");
                    } else {
                      setOpen("notfications");
                    }
                  }}>
                  <Badge className="badge" badgeContent={badge} color="error" overlap="circular" />
                  <NotificationsIcon />
                </IconButton>
                <Collapse in={open === "notfications"}>
                  <div className="notifications">
                    <Typography variant="h5" fontWeight="bold" sx={{ marginLeft: "5px", marginTop: "5px" }}>
                      Notifications
                    </Typography>
                    <hr />
                    <div className="ntfContainer">
                      {notfications.map((notf) => {
                        return (
                          <>
                            <Notification not={notf} updateB={() => setBadge(badge - 1)} />
                          </>
                        );
                      })}
                    </div>
                  </div>
                </Collapse>
                <IconButton
                  // onClick={() => {
                  //   auth.logout();
                  //   navigate("/s");
                  // }}
                  onClick={() => {
                    if (open === "actions") {
                      setOpen("");
                    } else {
                      setOpen("actions");
                    }
                  }}>
                  <PersonIcon />
                </IconButton>
                <Collapse in={open === "actions"}>
                  <div className="userAction">
                    <List>
                      {token !== "" && (
                        <>
                          <IconButton
                            className="userButton"
                            sx={{ fontSize: "1rem", fontWeight: "bolder", color: "var(--third-blue)" }}
                            onClick={() => {
                              if (type == "doctor") {
                                setOpenDoctor(!openDoctor);
                              } else {
                                console.log("not doctor");
                              }
                            }}>
                            <PersonIcon sx={{ marginRight: "5px" }} fontSize="small" />
                            Account
                          </IconButton>
                          <hr />
                        </>
                      )}
                      <IconButton className="userButton" sx={{ fontSize: "1rem", fontWeight: "bolder", color: "var(--third-blue)" }} onClick={() => setOpenPatient(!openPatient)}>
                        <AssignmentIndIcon sx={{ marginRight: "5px" }} fontSize="small" />
                        Patient
                      </IconButton>
                      <hr />
                      {token !== "" && (
                        <>
                          <IconButton
                            className="userButton"
                            sx={{ fontSize: "1rem", fontWeight: "bolder", color: "var(--third-blue)" }}
                            onClick={() => {
                              auth.logout();
                              setOpen(!open);
                            }}>
                            <ReplayIcon sx={{ marginRight: "5px" }} fontSize="small" />
                            Switch Patient
                          </IconButton>
                          <hr />
                        </>
                      )}
                      <IconButton
                        className="userButton"
                        sx={{ fontSize: "1rem", fontWeight: "bolder", color: "var(--third-blue)" }}
                        onClick={() => {
                          auth.highLogout();
                          auth.logout();
                          setOpen(!open);
                        }}>
                        <LogoutIcon fontSize="small" sx={{ marginRight: "5px" }} />
                        Logout
                      </IconButton>
                    </List>
                  </div>
                </Collapse>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </StyledEngineProvider>
    </>
  );
};

export default Navbar;
