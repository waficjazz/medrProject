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
  address: { type: String, required: true },
  city: { type: String, required: true },
  region: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  idType: { type: String, required: false },
  idNumber: { type: Number, required: true },
  gender: { type: String, required: true },
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  permanentMeds: { type: [String], required: false, default: ["asspe", "asspe"] },
  chronicDisease: { type: [String], required: false },
  healthProblems: { type: [String], required: false },
  allergies: { type: [String], required: false },
  surgicalHistory: [{ type: mongoose.Types.ObjectId, required: false, ref: "Surgery" }],
  hospitalVisits: [{ type: mongoose.Types.ObjectId, required: false, ref: "HospitalVisit" }],
  clinicalVisits: [{ type: mongoose.Types.ObjectId, required: false, ref: "ClinicalVisit" }],
  createdAt: Date,
  updatedAt: Date,
  emailVerified: { type: Boolean, required: true, default: false },
  validationCode: { type: String, required: true },
});

patientSchema.plugin(uniqueValidtor);

module.exports = mongoose.model("Patient", patientSchema);
