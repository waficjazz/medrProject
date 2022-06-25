const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const labTestSchema = new Schema({
  patientId: { type: mongoose.Types.ObjectId, required: true, ref: "Patient" },
  HospitalVisit: { type: mongoose.Types.ObjectId, required: false, ref: "HospitalVisit" },
  date: { type: Date, required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  notes: { type: String, required: false },
  csv: { type: String, required: true },
});

module.exports = mongoose.model("LabTest", labTestSchema);
