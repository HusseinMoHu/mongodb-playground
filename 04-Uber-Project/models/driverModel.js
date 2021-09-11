const mongoose = require("mongoose");

const pointSchema = mongoose.Schema({
  type: { type: String, default: "Point" },
  coordinates: { type: [Number], index: "2dsphere" }, // coordinate: [lng, lat]
});

const driverSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  driving: {
    type: Boolean,
    default: false,
  },
  location: pointSchema,
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
