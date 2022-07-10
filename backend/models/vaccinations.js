const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const vaccinationSchema = new Schema({
  patientId: { type: mongoose.Types.ObjectId, required: true, ref: "Patient" },
  date: { type: Date, required: true },
  shots: { type: String, required: true },
  doses: { type: String, required: true },
  name: { type: String, required: true },
  notes: { type: String, required: false },
  location: { type: String, required: true },
});

module.exports = mongoose.model("Vaccinations", vaccinationSchema);
