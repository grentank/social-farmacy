const { User } = require("../db/models");

class UserService {
  // * получение всех пользователей
  static async getAllUsers() {
    const users = await User.findAll();
    const result = users.map((el) => el.get({ plain: true }));
    return result;
  }
  // * Получение одного пользователя
  static async getOneUser(id) {
    const user = await User.findByPk(id);
    const result = user.get({ plain: true });
    return result;
  }
  // * создание пользователя
  static async registerUser({ name, email, password }) {
    const user = await User.create({
      name,
      email,
      password,
    });
    const result = user.get({ plain: true });
    return result;
  }
  // * удаление
  static async deleteUser(id) {
    const user = await User.findByPk(id);
    user.destroy();
    return id;
  }
  // * обновление
  static async updateUser(id, data) {
    // { login: 'sdsad', mail, password }
    const user = await User.update(data, { where: { id } });
    if (user) {
      return user;
    } else {
      return false;
    }
  }
  // * Получение юзера по почте
  static async getByEmail(email) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return null;
    } else {
      const result = user.get({ plain: true });
      return result;
    }
  }
}

module.exports = UserService;
