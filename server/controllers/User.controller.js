const UserService = require("../services/User.service");
const { formatResponse } = require("../utils/formatResponse");

class UserController {
  // * контроллер на получение всех
  static async getAll(req, res) {
    try {
      const result = await UserService.getAllUsers();
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Все пользователи",
          data: result,
        })
      );
    } catch (error) {
      console.log(error);
      res.status(401).json(
        formatResponse({
          statusCode: 401,
          message: "У тебя нет прав",
          error: error.message,
        })
      );
    }
  }
  // * контроллер на получение одного
  static async getOne(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getOneUser(id);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Один пользователь",
          data: user,
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
      const { id } = req.params;
      console.log(" id:", id);
      const result = await UserService.deleteUser(id);
      console.log(" result:", result);
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Пользователь успешно удалён",
          data: result,
        })
      );
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
  // * обновление
  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const updatedUser = await UserService.updateUser(id, {
        name,
        email,
        password,
      });
      res.status(200).json(
        formatResponse({
          statusCode: 200,
          message: "Пользователь успешно обновлён",
          data: updatedUser,
        })
      );
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

module.exports = UserController;
