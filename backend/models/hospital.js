const mongoose = require("mongoose");
const uniqueValidtor = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const hospitalSchema = new Schema({
  name: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
});

hospitalSchema.plugin(uniqueValidtor);
module.exports = mongoose.model("Hospital", hospitalSchema);
