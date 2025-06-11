const express = require('express');
const backetRouter = express.Router();
const BucketController = require('../controllers/BucketController');


backetRouter.post("/add", BucketController.addItem);
backetRouter.get("/:id", BucketController.getUserBucket);
backetRouter.delete("/:id", BucketController.removeItem);
backetRouter.delete("/all/:id", BucketController.clearBucket);

module.exports = backetRouter;