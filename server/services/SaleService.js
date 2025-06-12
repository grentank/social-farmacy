const { where } = require("sequelize");
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

  static async UpdateSale(id, data) {

    try {
        return await Sale.update(data, {where:{id}});      
        
    } catch (error) {
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