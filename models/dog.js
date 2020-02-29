module.exports = function(sequelize, DataTypes) {
  var Dog = sequelize.define("Dog", {
    dog: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  });

  Dog.associate = function(models) {
    // We're saying that a Dog should belong to an Author
    // A Dog can't be created without an Author due to the foreign key constraint
    Dog.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Dog;
};
