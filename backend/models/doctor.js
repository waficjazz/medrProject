const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    proficiency: { type: [String], required: true },
    clinicAddress: { type: String, required: false },
    email: { type: String, required: false },
  },
  { timestamps: true }
);

doctorSchema.plugin(uniqueValidtor);

module.exports = mongoose.model("Doctor", doctorSchema);
