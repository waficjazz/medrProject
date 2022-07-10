const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const prescirptionSchema = new Schema({
  patientId: { type: mongoose.Types.ObjectId, required: true, ref: "Patient" },
  clinicalVisit: { type: mongoose.Types.ObjectId, required: false, red: "ClinicalVisit" },
  HospitalVisit: { type: mongoose.Types.ObjectId, required: false, red: "HospitalVisit" },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  notes: { type: String, required: false },
  medications: { type: [String], required: false },
  createdAt: Date,
  updatedAt: Date,
});

module.exports = mongoose.model("Prescriptions", prescirptionSchema);
