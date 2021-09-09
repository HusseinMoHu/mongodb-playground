const Driver = require("../models/driverModel");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  create(req, res, next) {
    Driver.create(req.body)
      .then((driver) => res.send(driver))
      .catch(next);
  },
};
