const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const verifiedHospitalSchema = new Schema(
  {
    hospitalName: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    emailVerified: { type: Boolean, required: true, default: false },
    validationCode: { type: String, required: true },
    // isValid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

verifiedHospitalSchema.plugin(uniqueValidtor);
module.exports = mongoose.model("verifiedHospital", verifiedHospitalSchema);
