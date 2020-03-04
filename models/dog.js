module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define("Dog", {
    dog_name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dog_breed: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dog_height: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    favorite_activiy: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    dog_age: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    // UserId: {
    //   type: DataTypes.UUID,
    //   references: {
    //     model: 'User',
    //     key: 'id',
    //   },
    //   onDelete: "CASCADE",
    //   allowNull: false
    // },
  
   
  });

  Dog.associate = function(models) {
    // We're saying that a Dog should belong to an Author
    // A Dog can't be created without an Author due to the foreign key constraint
    Dog.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      },
      onDelete: 'CASCADE'
    });
  };

  return Dog;
};

// {
// 	"dog_name": "frufru",
// 	"UserId": "19b32b41-ccb8-4dad-99bd-de56ce93797a"
// }
