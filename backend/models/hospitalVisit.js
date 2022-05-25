const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hospitalVisitSchema = new Schema({
  patientId: { type: mongoose.Types.ObjectId, required: true, red: "Patient" },
  entryDate: { type: Date, required: true },
  timeSpent: { type: Number, required: false },
  description: { type: String, required: true },
  prescription: { type: String, required: true },
  cause: { type: String, required: true },
  doctors: { type: [String], required: true },
  hospitalId: { type: mongoose.Types.ObjectId, required: true, red: "Hospital" },
});

module.exports = mongoose.model("HospitalVisit", hospitalVisitSchema);