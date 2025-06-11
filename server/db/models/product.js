'use strict';
module.exports = (sequelize, DataTypes) => {
 const Product = sequelize.define('Product', {
 id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
 name: { type: DataTypes.TEXT, allowNull: false },
 description: { type: DataTypes.TEXT },
 img: { type: DataTypes.TEXT },
 price: { type: DataTypes.INTEGER, allowNull: false },
 stock: { type: DataTypes.BIGINT, allowNull: false }
 }, {
 tableName: 'Products',
 timestamps: true
 });
 Product.associate = function(models) {
 Product.hasMany(models.Bucket, { foreignKey: 'product_id' });
 Product.hasMany(models.Sale, { foreignKey: 'product_id' });
 };
 return Product;
};