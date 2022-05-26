const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const clinicalVisitSchema = new Schema({
  patientId: { type: mongoose.Types.ObjectId, required: true, ref: "Patient" },
  doctorId: { type: mongoose.Types.ObjectId, required: false, ref: "Patient" },
  visitDate: { type: Date, required: true },
  description: { type: String, required: true },
  prescription: { type: String, required: false },
  cause: { type: String, required: true },
  clinicAddress: { type: String, required: true },
  clinicName: { type: String, required: true },
});

module.exports = mongoose.model("ClinicalVisit", clinicalVisitSchema);
