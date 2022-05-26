const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const patientRoutes = require("./routes/patient-routes");
const hospitalRoutes = require("./routes/hospital-routes");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET , POST , PATCH , DELETE");
  next();
});

app.use("/api/patient", patientRoutes);
app.use("/api/hospital", hospitalRoutes);

mongoose
  .connect(`mongodb://localhost:27017/medrecord`)
  .then(() => {
    console.log("connected");
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
