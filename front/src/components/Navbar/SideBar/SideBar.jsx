import React from "react";
import { useState } from "react";
import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import BadgeIcon from "@mui/icons-material/Badge";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import BiotechOutlinedIcon from "@mui/icons-material/BiotechOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import CropPortraitIcon from "@mui/icons-material/CropPortrait";
import { StyledEngineProvider } from "@mui/material/styles";
import "./SideBar.css";
const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [active, setActive] = useState(true);
  const handleSelect = (event, index) => {
    event.preventDefault();
    setSelectedIndex(index);
  };
  return (
    <StyledEngineProvider injectFirst>
      <button
        id="transButton"
        onClick={() => {
          setActive(false);
          console.log("pressed");
        }}></button>
      <div className={active ? "drawer active" : "drawer"}>
        <List>
          <ListItemButton selected={selectedIndex === 0} onClick={(e) => handleSelect(e, 0)}>
            <ListItemIcon>
              <BadgeIcon className="icon" />
            </ListItemIcon>
            Personal Info
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 1} onClick={(e) => handleSelect(e, 1)}>
            <ListItemIcon>
              <VaccinesIcon className="icon" />
            </ListItemIcon>
            Vaccines
          </ListItemButton>

          <ListItemButton selected={selectedIndex === 2} onClick={(e) => handleSelect(e, 2)}>
            <ListItemIcon>
              <ApartmentIcon className="icon" />
            </ListItemIcon>
            Hospital Visits
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 3} onClick={(e) => handleSelect(e, 3)}>
            <ListItemIcon>
              <LocalConvenienceStoreIcon className="icon" />
            </ListItemIcon>
            Clinical Visits
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 4} onClick={(e) => handleSelect(e, 4)}>
            <ListItemIcon>
              <DescriptionIcon className="icon" />
            </ListItemIcon>
            Prescriptions
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 5} onClick={(e) => handleSelect(e, 5)}>
            <ListItemIcon>
              <BiotechOutlinedIcon className="icon" />
            </ListItemIcon>
            Lab Tests
          </ListItemButton>
          <ListItemButton selected={selectedIndex === 6} onClick={(e) => handleSelect(e, 6)}>
            <ListItemIcon>
              <CropPortraitIcon className="icon" />
            </ListItemIcon>
            Imaging
          </ListItemButton>
        </List>
      </div>
    </StyledEngineProvider>
  );
};

export default SideBar;
