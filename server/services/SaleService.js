const { where, and } = require("sequelize");
const { Sale } = require("../db/models")

class SaleService {
  static async getAllSale() {
   try {
     const sale = await Sale.findAll();
     const result = sale.map((el) => el.get({ plain:true}))
     return result
   } catch (error) {
    throw new Error(`Ошибка получения акционных товаров: ${error.message}`);
   }
  }

    static async getOneSale(id) {
   try {
     const sale = await Sale.findByPk(id);
     const result = sale.get({ plain:true })
     return result
   } catch (error) {
     throw new Error(`Ошибка получения акционного товара: ${error.message}`);
   }
  }

  static async UpdateSale(user_id, product_id, data) {

    try {
        return await Sale.update(data, {
  where: {
    user_id: user_id,
    product_id: product_id
  },
  returning: true, // Для PostgreSQL - возвращать обновленную запись
  plain: true       
});
    } catch (error) {
     console.log(error);
     
      throw new Error(`Ошибка обновления акционного товара: ${error.message}`);
    }
  }

  static async DeleteSale(id) {
    try {
        const sale = await Sale.findByPk(id)
        sale.destroy()
        return id
        
    } catch (error) {
             throw new Error(`Ошибка обновления акционного товара: ${error.message}`);
    }
  }

}

module.exports = SaleService