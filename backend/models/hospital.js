const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  hospitalName: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  isValid: { type: Boolean, default: false },
});

hospitalSchema.plugin(uniqueValidtor);
module.exports = mongoose.model("Hospital", hospitalSchema);
