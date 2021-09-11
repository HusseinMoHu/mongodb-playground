const assert = require("assert");
const request = require("supertest");
const app = require("../../app");
const Driver = require("../../models/driverModel");

describe("Drivers Controller", () => {
  it("Post to /api/drivers creates a new driver", (done) => {
    Driver.countDocuments().then((count) => {
      request(app)
        .post("/api/drivers")
        .send({ email: "test@test.com" })
        .end((err, response) => {
          Driver.countDocuments().then((newCount) => {
            assert(count + 1 === newCount);
            done();
          });
        });
    });
  });

  it("PUT /api/drivers/id Should update a record", (done) => {
    const driver = new Driver({ email: "t@t.com", driving: false });

    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: "t@t.com" }).then((driver) => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it("Delete to /api/drivers/:id can delete a record", (done) => {
    const driver = new Driver({ email: "test@test.com" });

    driver.save().then(() => {
      request(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.countDocuments().then((count) => {
            assert(count === 0);
            done();
          });
        });
    });
  });
});
