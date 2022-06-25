const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const surgerySchema = new Schema({
  patientId: { type: mongoose.Types.ObjectId, required: true, red: "Patient" },
  HopitalVisit: { type: mongoose.Types.ObjectId, required: false, red: "HospitalVisit" },
  date: { type: Date, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  cause: { type: String, required: true },
  doctors: { type: [String], required: false },
  // imaging: { type: mongoose.Types.ObjectId, required: false, red: "Radio" },
});

module.exports = mongoose.model("Surgery", surgerySchema);
