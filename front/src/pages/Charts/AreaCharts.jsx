import { Typography } from "@mui/material";
import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { StyledEngineProvider } from "@mui/material/styles";
import React from "react";
import "../HospitalVisits/HospitalVisits.css";
import BChart from "../../components/charts/BChart";
import { LoadingContext } from "../../context";
const AreaCharts = () => {
  const loading = useContext(LoadingContext);

  let token = "";
  const highStoredData = JSON.parse(localStorage.getItem("high"));
  if (highStoredData) {
    token = highStoredData.token;
  }
  const storedData = JSON.parse(localStorage.getItem("userData"));
  const [a, setA] = useState([]);
  const [hospitalVisits, setHospitalVisits] = useState([]);

  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
  const obj = useRef();
  const obj1 = useRef();
  let data;
  useEffect(() => {
    const surgeriesMonth = async () => {
      try {
        loading.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/analytics/months/surgery/:2022`);
        data = await response.data;
      } catch (err) {
        console.log(err.message);
      }

      months.map((month) => {
        obj.current = {};
        obj.current["name"] = month;
        obj.current["Surgeries"] = data[month];
        setA((prev) => [...prev, obj.current]);
      });
    };
    const hospitalMonths = async () => {
      try {
        loading.setIsLoading(true);
        const response = await axios.get(process.env.REACT_APP_URL + `/analytics/months/hospitalVisit/:2022`);
        data = await response.data;
      } catch (err) {
        console.log(err.message);
      }

      months.map((month) => {
        obj1.current = {};
        obj1.current["name"] = month;
        obj1.current["Hospital-Visits"] = data[month];
        setHospitalVisits((prev) => [...prev, obj1.current]);
      });
      loading.setIsLoading(false);
    };
    hospitalMonths();
    surgeriesMonth();
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div className="chartPage">
        <div className="AChartWarpper">
          <Typography sx={{ textAlign: "center", width: "100%", color: "var(--third-blue)", fontWeight: "bold" }}>Surgeries in 2022</Typography>
          <BChart data={a} k="Surgeries" />
        </div>
        <div className="AChartWarpper">
          <Typography sx={{ textAlign: "center", width: "100%", color: "var(--third-blue)", fontWeight: "bold" }}>Hospital Visits in 2022</Typography>
          <BChart data={hospitalVisits} k="Hospital-Visits" />
        </div>
        <div className="AChartWarpper">
          <BChart data={a} />
        </div>
        <div className="AChartWarpper">
          <BChart data={a} />
        </div>
      </div>
    </StyledEngineProvider>
  );
};

export default AreaCharts;
