const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const affiliation = new Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  salesPersonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Affiliation", affiliation);
