const express = require("express");
const mongoose = require("mongoose");
const driverRoutes = require("./routes/driverRoutes");

const app = express();
app.use(express.json());

if (process.env.NODE_ENV !== "test") {
  mongoose.connect("mongodb://localhost:27017/uber");
}

// Routes
driverRoutes(app);

app.use((err, req, res, next) => {
  res.status(400).send({ message: err.message });
});

module.exports = app;
