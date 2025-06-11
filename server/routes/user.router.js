const router = require("express").Router();

const path = require("path");

const { checkBody, checkId } = require("../middlewares/checkBody");

const UserController = require("../controllers/User.controller");

// router.get("/register", (req, res) => {
//   console.log(req.query);
//   res.status(200).sendFile(path.resolve(__dirname, "../registerForm.html"));
// });

router
  .get("/", UserController.getAll)
  .delete("/:id", checkId, UserController.delete)
  .get("/:id", UserController.getOne)
  .put("/:id", UserController.update);

module.exports = router;