const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imagingSchema = new Schema({
  patientId: { type: mongoose.Types.ObjectId, required: true, red: "Patient" },
  clinicalVisit: { type: mongoose.Types.ObjectId, required: false, red: "ClinicalVisit" },
  HopitalVisit: { type: mongoose.Types.ObjectId, required: false, red: "HospitalVisit" },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  name: { type: String, required: true },
  report: { type: String, required: false },
  images: { type: [String], required: false },
});

module.exports = mongoose.model("Imaging", imagingSchema);
