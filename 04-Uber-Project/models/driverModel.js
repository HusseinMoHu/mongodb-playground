const mongoose = require("mongoose");

const driverSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  driving: {
    type: Boolean,
    default: false,
  },
});

const Driver = mongoose.model("Driver", driverSchema);

module.exports = Driver;
