const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const radioSchema = new Schema({
  patientId: { type: mongoose.Types.ObjectId, required: true, red: "Patient" },
  clinicalVisit: { type: mongoose.Types.ObjectId, required: false, red: "ClinicalVisit" },
  HopitalVisit: { type: mongoose.Types.ObjectId, required: false, red: "HospitalVisit" },
  date: { type: Date, required: true },
  report: { type: String, required: false },
  image: { type: [String], required: false },
});

module.exports = mongoose.model("Radio", radioSchema);
