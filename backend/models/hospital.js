const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const hospitalSchema = new Schema(
  {
    hospitalName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    isValid: { type: Boolean, default: false },
  },
  { timestamps: true }
);

hospitalSchema.plugin(uniqueValidtor);
module.exports = mongoose.model("Hospital", hospitalSchema);
