'use strict';
module.exports = (sequelize, DataTypes) => {
 const Bucket = sequelize.define('Bucket', {
 id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
 user_id: { type: DataTypes.BIGINT, allowNull: false },
 product_id: { type: DataTypes.BIGINT, allowNull: false },
 status: { type: DataTypes.BOOLEAN, allowNull: false }
 }, {
 tableName: 'Buckets',
 timestamps: false
 });
 Bucket.associate = function(models) {
 Bucket.belongsTo(models.User, { foreignKey: 'user_id' });
 Bucket.belongsTo(models.Product, { foreignKey: 'product_id' });
 };
 return Bucket;
};