const BucketService = require('../services/bucketService');

class BucketController {
    // Добавление товара в корзину
    static async addItem(req, res) {
        try {
            const { userId, productId } = req.body;
            if (!userId || !productId) {
                return res.status(400).json({ error: "Требуются userId и productId" });
            }

            const bucketItem = await BucketService.addToBucket(userId, productId);
            res.status(201).json(bucketItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Получение корзины пользователя
    static async getUserBucket(req, res) {
        try {
            const {id} = req.params
            const bucket = await BucketService.getUserBucket(id);
            
            if (!bucket || bucket.length === 0) {
                return res.status(404).json({ message: "Корзина пуста" });
            }
            
            res.status(200).json(bucket);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Удаление товара из корзины
    static async removeItem(req, res) {
        try {
            const {id} = req.params;
            const result = await BucketService.removeFromBucket(id);
            
            if (result === 0) {
                return res.status(404).json({ message: "Элемент корзины не найден" });
            }
            
            res.status(200).json({ message: "Товар удален из корзины" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }


    static async clearBucket(req, res) {
        try {
            const {id} = req.params;
            const result = await BucketService.clearUserBucket(id);
            
            if (result === 0) {
                return res.status(404).json({ message: "Корзина уже пуста" });
            }
            
            res.status(200).json({ message: "Корзина очищена" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = BucketController;
