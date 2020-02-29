module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
      // Giving the Author model a name of type STRING
      user_name: DataTypes.STRING,
      password: DataTypes.STRING
    });
  
    Author.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Author.hasMany(models.Dog, {
        onDelete: "cascade"
      });
    };
  
    return Author;
  };
  