import { Table, TableContainer, TableHead, TableCell, TableRow, Paper, TableBody, Collapse, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledEngineProvider } from "@mui/material/styles";
import HospitalVisit from "../../components/Navbar/HospitalVisit/HospitalVisit";
import React from "react";
import "./HospitalVisits.css";
const HospitalVisits = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <StyledEngineProvider injectFirst>
      <div className="hospitalVisits">
        <div className="main">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography className="tableHeaders">Hospital Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="tableHeaders">Entry Date</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="tableHeaders">Cause</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className="tableHeaders">Time Spent</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell scope="row">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    Brownie
                  </TableCell>
                  <TableCell>
                    <Typography>12/12/2020</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>test</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>2 days</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      <HospitalVisit />
                    </Collapse>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default HospitalVisits;
