const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    patientId: { type: mongoose.Types.ObjectId, required: true, ref: "Patient" },
    issuerId: { type: mongoose.Types.ObjectId, required: false },
    issuerType: { type: String, required: false },
    issuer: { type: String, required: true },
    seenBy: { type: [mongoose.Types.ObjectId], required: false },
    action: { type: String, required: false },
    item: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", notificationSchema);
