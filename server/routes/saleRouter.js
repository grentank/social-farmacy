const SaleRouter = require("express").Router();

const path = require("path");

const { checkBody, checkId } = require("../middleware/checkBody");

const SaleController = require("../controllers/SaleConctoller");

// router.get("/register", (req, res) => {
//   console.log(req.query);
//   res.status(200).sendFile(path.resolve(__dirname, "../registerForm.html"));
// });

SaleRouter
  .get("/", SaleController.getAll)
  .delete("/:id", checkId, SaleController.delete)
  .get("/:id", SaleController.getOne)
  .put("/:id", SaleController.update);

module.exports = SaleRouter;