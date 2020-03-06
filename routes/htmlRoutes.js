var db = require("../models");
var path = require("path");


module.exports = function (app) {
  // Load index page

  // Serve static content for the app from the "public" directory in the application directory.
 

  app.get("/", function (req, res) {
    res.render(path.join(__dirname, "../views/index.handlebars"));
  });
  app.get("/login", function (req, res) {
    res.render(path.join(__dirname, "../views/login.handlebars"));
  });

  // Load example page and pass in an example by id
  app.get("/user", function (req, res) {

    res.render(path.join(__dirname, "../views/dogfile.handlebars"));
  });
  app.get("/map", function (req, res) {

    res.render(path.join(__dirname, "../views/map.handlebars"));
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
