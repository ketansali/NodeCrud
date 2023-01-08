const router = require("express").Router();
const { ensureAuthorized } = require("../middleware/auth");
const accountRouter = require("./account");
const employeeRouter = require("./employee");

router.use("/account", accountRouter);
router.use("/employee", ensureAuthorized, employeeRouter);

module.exports = router;
