const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const verifiedDoctorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  proficiency: { type: [String], required: true },
  hospital: { type: [String], required: false },
  clinicAddress: { type: String, required: false },
  emailVerified: { type: Boolean, required: true, default: false },
  validationCode: { type: String, required: true },
});

verifiedDoctorSchema.plugin(uniqueValidtor);

module.exports = mongoose.model("verifiedDoctor", verifiedDoctorSchema);
