module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
    
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
      },
     
      username: {
        type: DataTypes.STRING,
        required: true
      },
      user_email: {
        type: DataTypes.STRING,
        required: true
      }, 
      user_Password: {
        type: DataTypes.STRING,
        required: true
      }, 
    });
  
    User.associate = function(models) {
      // Associating User with Posts
      // When an User is deleted, also delete any associated Posts
      User.hasMany(models.Dog, {
        onDelete: "cascade"
      });
    };
  
    return User;
  };
  