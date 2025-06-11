const routerProduct = require("express").Router();
const ProductController = require("../controllers/ProductController");

routerProduct
  .get("/", ProductController.getAll)
  .get("/:id", ProductController.getOne)
  .post("/", ProductController.createProduct)
  .delete("/:id", ProductController.deleteProduct)
  .put("/:id", ProductController.updateProduct);

  module.exports = routerProduct