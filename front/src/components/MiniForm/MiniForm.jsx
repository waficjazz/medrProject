import React, { useState } from "react";
import "./MiniForm.css";
import { Typography, IconButton, TextField, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { addInfo } from "../../reducers/patientReducer";
import axios from "axios";
const MiniForm = (props) => {
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.value);
  const data = patient[props.name];
  const [newData, setNewData] = useState("");
  useEffect(() => {
    console.log(patient);
  }, []);
  const handleAdd = async () => {
    // const set = [...data, newData];
    const obj = { ...patient };
    obj.permanentMeds = [...obj.permanentMeds, newData];
    dispatch(addInfo(obj));
    try {
      const res = await axios.post("http://localhost:5000/api/patient/update", obj);
      //   if (res.statusText === "OK") {
      //     props.close();
      //   }
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
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
          <TextField size="small" onChange={(e) => setNewData(e.target.value)} />
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </div>
    </>
  );
};

export default MiniForm;
