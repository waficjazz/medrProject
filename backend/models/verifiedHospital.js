const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const verifiedHospitalSchema = new Schema({
  hospitalName: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  region: { type: String, required: true },
  city: { type: String, required: true },
  // isValid: { type: Boolean, default: false },
});

verifiedHospitalSchema.plugin(uniqueValidtor);
module.exports = mongoose.model("verifiedHospital", verifiedHospitalSchema);
