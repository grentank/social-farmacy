const routerProduct = require("express").Router();
const ProductController = require("../controllers/ProductController");

routerProduct
  .get("/product", ProductController.getAll)
  .get("/product/:id", ProductController.getOne)
  .post("/product", ProductController.createProduct)
  .delete("/product/:id", ProductController.deleteProduct)
  .put("/product/:id", ProductController.updateProduct);

  module.exports = routerProduct