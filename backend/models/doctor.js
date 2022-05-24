const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  gender: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  proficiency: { type: [String], required: true },
});

doctorSchema.plugin(uniqueValidtor);

module.exports = mongoose.model("Doctor", doctorSchema);
