
// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the dogs
  app.get("/api/dog", function(req, res) {
    // var query = {};
    // if (req.query.user_id) {
    //   query.UserId = req.query.user_id;
    // }
    console.log("helluuu")
    console.log(req)
    console.log(res)
    

    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    // db.Dog.findAll({
    //   where: query,
    //   include: [db.User]
    // }).then(function(dbDog) {
    //   res.json(dbDog);
    // });
  });

  // Get route for retrieving a single post
  app.get("/api/dog/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Dog.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbDog) {
      res.json(dbDog);
    });
  });

  // POST route for saving a new post
  app.post("/api/dog", function(req, res) {
  
    db.Dog.create(req.body).then(function(dbDog) {
      res.json(dbDog);
    }).catch(function(err){
console.log(err)
res.send("error message here" + JSON.stringify(err))
    })
  });

  // DELETE route for deleting dogs- id of dog
  app.delete("/api/dog/:id", function(req, res) {
    db.Dog.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbDog) {
      res.json(dbDog);
    });
  });

  // PUT route for updating dogs - give id of dog- not userid
  app.put("/api/dog", function(req, res) {
    db.Dog.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbDog) {
      res.json(dbDog);
    });
  });
};
