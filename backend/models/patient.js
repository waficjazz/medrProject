const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  bloodGroup: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  adddress: { type: String, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  idType: { type: String, required: true },
  idNumber: { type: Number, required: true },
  gender: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  permanentMeds: { type: [String], required: false, default: ["asspe", "asspe"] },
  chronicDisease: { type: [String], required: false },
  healthProblems: { type: [String], required: false },
  allergies: { type: [String], required: false },
  surgicalHistory: [{ type: mongoose.Types.ObjectId, required: false, red: "Surgery" }],
  hospitalVisits: [{ type: mongoose.Types.ObjectId, required: false, red: "HospitalVisit" }],
  clinicalVisits: [{ type: mongoose.Types.ObjectId, required: false, red: "ClinicalVisit" }],
  createdAt: Date,
});

patientSchema.plugin(uniqueValidtor);

module.exports = mongoose.model("Patient", patientSchema);
