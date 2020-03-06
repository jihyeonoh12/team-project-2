var db = require("../models");

module.exports = function(app) {

      
    app.get("/api/users", function(req, res) {
  
      // Here we add an "include" property to our options in our findAll query
      // We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.Dog
      db.User.findAll({

        include: [db.Dog]
      }).then(function(dbUser) {
        res.json(dbUser);
      });
  
   
    });

    app.get('/api/user', function(req, res){
      console.log(JSON.stringify(req.body.user_email ) + "req.body")
      db.User.findOne({
        where: {
          user_email: req.body.email
        },
        include: [db.Dog]
      }).then(function(dbUser) {
       
        res.json(dbUser); 
      });
    })
  
    app.post("/api/users", function(req, res) {
      // console.log("helluuuu")
      // Here we add an "include" property to our options in our findOne query
      // We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.Dog
      console.log(JSON.stringify(req.body )+"req.body")

      db.User.findOne({
        where: {
          user_email: req.body.email
        },
         
      }).then(function(dbUser) {
       
        res.json(dbUser);
      });
    });



    app.get("/api/user/:id", function(req, res) {
      // console.log("helluuuu")
      // Here we add an "include" property to our options in our findOne query
      // We set the value to an array of the models we want to include in a left outer join
      // In this case, just db.Dog
      db.User.findOne({
        where: {
          id: req.params.id
        },
        include: [db.Dog]
      }).then(function(dbUser) {
        res.json(dbUser);
      });
    });





app.post("/api/user", function(req, res) {
  //if email already exsists then dont let create a profile. 
  db.User.create(req.body).then(function(dbUser) {
    res.json(dbUser);
    
  })
});

app.delete("/api/user/:id", function(req, res) {
  db.User.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});
};








