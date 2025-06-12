'use strict';
module.exports = (sequelize, DataTypes) => {
 const Sale = sequelize.define('Sale', {
 id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
 user_id: { type: DataTypes.BIGINT, allowNull: false },
 product_id: { type: DataTypes.BIGINT, allowNull: false },
 date_start: { type: DataTypes.DATE, allowNull: false },
 date_end: { type: DataTypes.DATE }
 }, {
 tableName: 'Sales',
 timestamps: false
 });
 Sale.associate = function(models) {
 Sale.belongsTo(models.User, { foreignKey: 'user_id' });
 Sale.belongsTo(models.Product, { foreignKey: 'product_id' });
 };
 return Sale;
};

