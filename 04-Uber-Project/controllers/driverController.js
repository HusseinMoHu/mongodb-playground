const Driver = require("../models/driverModel");

module.exports = {
  greeting(req, res) {
    res.send({ hi: "there" });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.aggregate()
      .near({
        near: {
          type: "Point",
          coordinates: [parseFloat(lng), parseFloat(lat)],
        },
        spherical: true,
        maxDistance: 200000, // 200 km
        distanceField: "dist",
        // distanceField: "dist.location",
        // includeLocs: "dist.location",
        uniqueDocs: true,
      })
      .limit(5)
      .sort({ dist: 1 })
      .then((drivers) => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    Driver.create(req.body)
      .then((driver) => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const body = req.body;
    Driver.findByIdAndUpdate({ _id: driverId }, body)
      .then(() => Driver.findById(driverId))
      .then((driver) => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findByIdAndRemove({ _id: driverId })
      .then((driver) => res.status(204).send(driver))
      .catch(next);
  },
};
