import React from "react";
import { useState } from "react";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import BadgeIcon from "@mui/icons-material/Badge";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalConvenienceStoreIcon from "@mui/icons-material/LocalConvenienceStore";
import { StyledEngineProvider } from "@mui/material/styles";
import "./SideBar.css";
const SideBar = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleSelect = (event, index) => {
    event.preventDefault();
    setSelectedIndex(index);
  };
  return (
    <StyledEngineProvider injectFirst>
      <div className="drawer">
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
        </List>
      </div>
    </StyledEngineProvider>
  );
};

export default SideBar;
