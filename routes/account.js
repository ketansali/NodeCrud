const router = require("express").Router();
const accountController = require("../controllers/accountController");
const {
  registerValidation,
  loginValidation,
} = require("../validators/accountValidator");
router.post("/register", registerValidation, (req, res) => {
  return accountController.account.register(req, res);
});
router.post("/login", loginValidation, (req, res) => {
  return accountController.account.login(req, res);
});

module.exports = router;
