const BucketService = require('./services/BucketService');

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
            const userId = req.params.userId;
            const bucket = await BucketService.getUserBucket(userId);
            
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
            const bucketId = req.params.bucketId;
            const result = await BucketService.removeFromBucket(bucketId);
            
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
            const userId = req.params.userId;
            const result = await BucketService.clearUserBucket(userId);
            
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