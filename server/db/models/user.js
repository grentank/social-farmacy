"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.TEXT, allowNull: false },
      email: { type: DataTypes.TEXT, allowNull: false, unique: true },
      password: { type: DataTypes.TEXT, allowNull: false },
      admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
    },
    {
      tableName: "Users",
      timestamps: true,
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Bucket, { foreignKey: "user_id" });
    User.hasMany(models.Sale, { foreignKey: "user_id" });
  };
  return User;
};
//!
//!