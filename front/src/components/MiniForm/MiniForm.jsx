import React, { useState } from "react";
import "./MiniForm.css";
import { Typography, IconButton, TextField, Button, Input } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { addInfo } from "../../reducers/patientReducer";
import { StyledEngineProvider } from "@mui/material/styles";
import { alpha, styled } from "@mui/material/styles";

import axios from "axios";
const MiniForm = (props) => {
  const storedData = JSON.parse(localStorage.getItem("userData"));
  let token = storedData.token;
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.value);
  const data = patient[props.name];
  const [newData, setNewData] = useState("");
  useEffect(() => {
    console.log(patient);
  }, []);
  const handleAdd = async () => {
    // const set = [...data, newData];\
    if (newData !== "") {
      const obj = { ...patient };
      obj[props.name] = [...obj[props.name], newData];
      dispatch(addInfo(obj));
      try {
        console.log(token);
        const res = await axios.post("http://localhost:5000/api/patient/update", obj, { headers: { authorization: `Bearer ${token}` } });
        //   if (res.statusText === "OK") {
        //     props.close();
        //   }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className="MiniFormW">
        <div className="MiniForm">
          <IconButton sx={{ marginLeft: "95%", float: "left" }} onClick={props.close}>
            <CloseIcon fontSize="medium" />
          </IconButton>
          <Typography
            variant="body1"
            sx={{ marginTop: "10px", marginBottom: "14px", marginLeft: "2px", color: "var(--main-blue)", fontWeight: "bolder", fontSize: "1.1rem", height: "10%" }}>
            ADD {props.name}
          </Typography>
          <hr />
          <ul className="ulMini">
            {data.map((item, index) => {
              return <li key={index}>{item}</li>;
            })}
          </ul>
          <input className="addInput" size="small" onChange={(e) => setNewData(e.target.value)} />
          <Button className="btnadd" sx={{ color: "white", backgroundColor: "var(--third-blue)", marginLeft: "5px" }} onClick={handleAdd}>
            Add
          </Button>
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default MiniForm;