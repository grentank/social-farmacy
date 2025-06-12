const { Result } = require("pg");
const formatResponse = require("../utils/formatResponse");
const SaleService = require("../services/SaleService");

class SaleController {
  static async getAll(req, res) {
    try {
      const result = await SaleService.getAllSale();
      res.status(201).json(
        formatResponse({
          statusCode: 201,
          message: "Скидки получены",
          data: result,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(401).json(
        formatResponse({
          statusCode: 401,
          message: "Скидки не найдены",
          error: error.message,
        })
      );
    }
  }

  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const sale = await SaleService.getOneSale(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Одна акция",
          data: sale,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(500).json(
        formatResponse({
          statusCode: 500,
          message: "Не удалось получить пользователя",
          error: error.message,
        })
      );
    }
  }

  static async delete(req, res) {
    try {
        const { id } = req.params
        console.log("id:", id);
        const result = await SaleService.DeleteSale(id)
        res.status(200).json(formatResponse({
            statusCode: 200,
          message: "Скидка успешно удалён",
          data: result,
        }))
        
        
    } catch (error) {
         console.log(error);
              res.status(500).json(
                formatResponse({
                  statusCode: 500,
                  message: "Не удалось удалить пользователя",
                  error: error.message,
                    })
      );
    }
  }

  static async update(req, res) {
    try {
        const { id } = req.params;
        const { data_start, date_end } = req.body;
        const updateSale = await SaleService.UpdateSale(id, {
            data_start,
            date_end
        });
        res.status(200).json(
            formatResponse({
                statusCode: 200,
                message: "Акция обновлена",
                data: updateSale
            })
        )
        
    } catch (error) {
          res.status(500).json(
                formatResponse({
                  statusCode: 500,
                  message: "Не удалось обновить пользователя",
                  error: error.message,
                })
              );
    }
  }
}

module.exports = SaleController;
