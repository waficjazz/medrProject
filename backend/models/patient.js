const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  birthDate: { type: Date, required: false },
  bloodGroup: { type: String, required: false },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: false },
  adddress: { type: String, required: false },
  city: { type: String, required: false },
  region: { type: String, required: false },
  phoneNumber: { type: String, required: false },
  idType: { type: String, required: false },
  idNumber: { type: Number, required: false },
  gender: { type: String, required: false },
  weight: { type: Number, required: false },
  height: { type: Number, required: false },
  createdAt: Date,
});

patientSchema.plugin(uniqueValidtor);

module.exports = mongoose.model("Patient", patientSchema);
