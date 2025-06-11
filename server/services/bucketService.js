const { Bucket, Product, User } = require('../db/models')

class BucketServive {
  static async addToBucket(userId, productId, status = true) {
    try {
      return await Bucket.create(
        {
          user_id: userId,
          product_id: productId,
          status,
        },
        // {
        //   returning: true, // Важно для PostgreSQL!
        // }
      );
    } catch (error) {
      throw new Error(`Ошибка добавления в корзину: ${error.message}`);
    }
  }

  static async getUserBucket(userId) {
    try {
      return await Bucket.findAll({
        where: { user_id: userId },
        include: [
          {
            model: Product,
            attributes: ["id", "name", "price", "description"],
          },
        ],
      });
    } catch (error) {
      throw new Error(`Ошибка при загрузке корзины: ${error.message}`);
    }
  }

  static async removeFromBucket(bucketId) {
    try {
      return await Bucket.destroy({
        where: { id: bucketId },
      });
    } catch (error) {
      throw new Error(`Ошибка удаления из корзины: ${error.message}`);
    }
  }

  static async clearUserBucket(userId) {
    try {
      return await Bucket.destroy({
        where: { user_id: userId },
      });
    } catch (error) {
      throw new Error(`Ошибка очистки корзины: ${error.message}`);
    }
  }
}

module.exports = BucketServive