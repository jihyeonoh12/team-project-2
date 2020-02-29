var db = require("../models");

module.exports = function(app) {
  // Get all Dogs
  app.get("/api/Dogs", function(req, res) {
    db.Dog.findAll({}).then(function(dbDog) {
      res.json(dbDog);
    });
  });

  // Create a new Dog
  app.post("/api/Dogs", function(req, res) {
    db.Dog.create(req.body).then(function(dbDog) {
      res.json(dbDog);
    });
  });

  // Delete an Dog by id
  app.delete("/api/Dogs/:id", function(req, res) {
    db.Dog.destroy({ where: { id: req.params.id } }).then(function(dbDog) {
      res.json(dbDog);
    });
  });
};
