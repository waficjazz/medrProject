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

const Navbar = () => {
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
  }
  const navigate = useNavigate();
  const patient = useSelector((state) => state.patient.value);
  const [open, setOpen] = useState(false);
  const { show, setShow } = useContext(ShowContext);
  const auth = useContext(RegContext);
  return (
    <>
      <StyledEngineProvider injectFirst>
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
                <IconButton>
                  <Badge className="badge" badgeContent={1} color="error" overlap="circular" />
                  <NotificationsIcon />
                </IconButton>
                <IconButton
                  // onClick={() => {
                  //   auth.logout();
                  //   navigate("/s");
                  // }}
                  onClick={() => setOpen(!open)}>
                  <PersonIcon />
                </IconButton>
                <Collapse in={open}>
                  <div className="userAction">
                    <List>
                      {token !== "" && (
                        <>
                          <IconButton className="userButton" sx={{ fontSize: "1rem", fontWeight: "bolder", color: "var(--third-blue)" }}>
                            <PersonIcon sx={{ marginRight: "5px" }} fontSize="small" />
                            Account
                          </IconButton>
                          <hr />
                        </>
                      )}
                      <IconButton className="userButton" sx={{ fontSize: "1rem", fontWeight: "bolder", color: "var(--third-blue)" }}>
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
