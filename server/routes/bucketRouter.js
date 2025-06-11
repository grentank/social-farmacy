const express = require('express');
const router = express.Router();
const BucketController = require('./controllers/BucketController');


router.post('/add', BucketController.addItem);
router.get('/:userId', BucketController.getUserBucket);
router.delete('/remove/:bucketId', BucketController.removeItem);
router.delete('/clear/:userId', BucketController.clearBucket);

module.exports = router;