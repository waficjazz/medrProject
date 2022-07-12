require("dotenv").config();
const express = require("express");
const HttpError = require("./models/http-error");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const patientRoutes = require("./routes/patient-routes");
const hospitalRoutes = require("./routes/hospital-routes");
const clinicalRoutes = require("./routes/clinical-routes");
const imagingRoutes = require("./routes/imaging-routes");
const vaccinationRoutes = require("./routes/vaccination-routes");
const doctorRoutes = require("./routes/doctor-routes");
const labTestRoutes = require("./routes/labTest-routes");
const surgeryRoutes = require("./routes/surgery-routes");
const prescriptionRoutes = require("./routes/prescription-routes");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET , POST , PATCH , DELETE");
  res.setHeader("Content-Type", "application/json");
  next();
});

app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/clinical", clinicalRoutes);
app.use("/api/imaging", imagingRoutes);
app.use("/api/vaccination", vaccinationRoutes);
app.use("/api/labtest", labTestRoutes);
app.use("/api/surgery", surgeryRoutes);
app.use("/api/prescription", prescriptionRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.send({ message: error.message || "An unknown error occurred!" });
});
mongoose
  // .connect(`mongodb://localhost:27017/medrecord`)
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected");
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });
