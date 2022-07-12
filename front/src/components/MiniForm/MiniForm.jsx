import React, { useState, useContext } from "react";
import "./MiniForm.css";
import { LoadingContext } from "../../context";

import { Typography, IconButton, TextField, Button, Input } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { addInfo } from "../../reducers/patientReducer";
import { StyledEngineProvider } from "@mui/material/styles";
import { alpha, styled } from "@mui/material/styles";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const MiniForm = (props) => {
  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
  }
  const storedData = JSON.parse(localStorage.getItem("high"));
  const dispatch = useDispatch();
  const patient = useSelector((state) => state.patient.value);
  const data = patient[props.name];
  const [newData, setNewData] = useState("");
  const navigate = useNavigate();
  const loading = useContext(LoadingContext);

  // useEffect(() => {
  //   console.log(patient);
  // }, []);
  const handleAdd = async () => {
    // const set = [...data, newData];\
    if (newData !== "") {
      const obj = { ...patient };
      obj[props.name] = [...obj[props.name], newData];
      dispatch(addInfo(obj));
      try {
        loading.setIsLoading(true);
        const res = await axios.post(process.env.REACT_APP_URL + "/patient/update", obj, { headers: { authorization: `Bearer ${token}` } });
        //   if (res.statusText === "OK") {
        //     props.close();
        //   }
        setNewData("");
        loading.setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        loading.setIsLoading(false);
      }
    }
  };

  const handleDelete = async (i) => {
    // const set = [...data, newData];\
    let tmp = [...patient[props.name]];
    tmp.splice(i, 1);
    let obj = { ...patient };
    obj[props.name] = tmp;
    dispatch(addInfo(obj));
    try {
      loading.setIsLoading(true);
      const res = await axios.post(process.env.REACT_APP_URL + "/patient/update", obj, { headers: { authorization: `Bearer ${token}` } });
      //   if (res.statusText === "OK") {
      //     props.close();
      //   }
      setNewData("");
      loading.setIsLoading(false);
    } catch (err) {
      loading.setIsLoading(false);
      console.log(err.message);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <div className="MiniFormW">
        <div className="MiniForm">
          <IconButton
            sx={{ marginLeft: "95%", float: "left" }}
            onClick={() => {
              props.close();
            }}>
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
              return (
                <div className="listContainer">
                  <li key={index}>{item}</li>
                  {token !== "" && (
                    <IconButton onClick={() => handleDelete(index)}>
                      <ClearIcon fontSize="small" className="deleteIcon" />
                    </IconButton>
                  )}
                </div>
              );
            })}
          </ul>
          {token !== "" && (
            <>
              <input value={newData} className="addInput" size="small" onChange={(e) => setNewData(e.target.value)} />
              <Button className="btnadd" sx={{ color: "white", backgroundColor: "var(--third-blue)", marginLeft: "5px" }} onClick={handleAdd}>
                Add
              </Button>
            </>
          )}
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default MiniForm;
