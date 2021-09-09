const mongoose = require("mongoose");

before((done) => {
  mongoose.connect("mongodb://localhost:27017/uber-test");
  mongoose.connection
    .once("open", () => done())
    .on("error", (err) => {
      console.warn("Warning", error);
    });
});

beforeEach((done) => {
  // Find a collection
  const { drivers } = mongoose.connection.collections;

  drivers
    .drop()
    .then(() => done())
    .catch(() => done());
});
