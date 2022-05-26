const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hospitalVisitSchema = new Schema({
  patientId: { type: mongoose.Types.ObjectId, required: true, ref: "Patient" },
  entryDate: { type: Date, required: false },
  timeSpent: { type: Number, required: false },
  description: { type: String, required: true },
  prescription: { type: String, required: false },
  cause: { type: String, required: true },
  doctors: { type: [String], required: true },
  hospitalId: { type: mongoose.Types.ObjectId, required: true, ref: "Hospital" },
});

module.exports = mongoose.model("HospitalVisit", hospitalVisitSchema);
